const path = require('path');
const execa = require('execa');
const moment = require('moment');
const ffmpeg = require('@ffmpeg-installer/ffmpeg');
const util = require('electron-util');
const PCancelable = require('p-cancelable');

const ffmpegPath = util.fixPathForAsarUnpack(ffmpeg.path);
const durationRegex = /Duration: (\d\d:\d\d:\d\d.\d\d)/gm;
const frameRegex = /frame=\s+(\d+)/gm;

// https://trac.ffmpeg.org/ticket/309
const makeEven = (n:number) => { return 2 * Math.round(n / 2); };

const convert = (outputPath:string, opts:any, args:any) => {
    return new PCancelable((resolve:any, reject:any, onCancel:any) => {
        const converter = execa(ffmpegPath, args);
        let amountOfFrames:number;

        onCancel(() => {
            console.log('file/export/convert/canceled');
            converter.kill();
        });

        let stderr = '';
        converter.stderr.setEncoding('utf8');
        converter.stderr.on('data', (da:any) => {
            let data = da;
            stderr += data;

            data = data.trim();
            const matchesDuration = durationRegex.exec(data);
            const matchesFrame = frameRegex.exec(data);

            if (matchesDuration) {
                amountOfFrames = Math.ceil(moment.duration(matchesDuration[1]).asSeconds() * 30);
            } else if (matchesFrame) {
                const currentFrame:number = Number(matchesFrame[1]);
                opts.onProgress(currentFrame / amountOfFrames);
            }
        });

        converter.on('error', reject);

        converter.on('exit', (code:any) => {
            if (code === 0) {
                console.log('file/export/convert/completed');
                resolve(outputPath);
            } else {
                console.log('file/export/convert/failed');
                reject(new Error(`ffmpeg exited with code: ${code}\n\n${stderr}`));
            }
        });

        converter.catch(reject);
    });
};

const convertToMp4 = (opts:any) => {
    return convert(opts.outputPath, opts, [
        '-i', opts.inputPath,
        opts.outputPath
    ]);
    // return convert(opts.outputPath, opts, [
    //     '-i', opts.inputPath,
    //     '-r', opts.fps,
    //     '-s', `${makeEven(opts.width)}x${makeEven(opts.height)}`,
    //     '-ss', opts.startTime,
    //     '-to', opts.endTime,
    //     opts.outputPath
    // ]);
};


const converters = new Map([
    ['mp4', convertToMp4],
]);

const convertTo = (opts:any, format:string) => {
    // const outputPath = path.join(tempy.directory(), opts.defaultFileName);
    const outputPath = path.join(opts.outputPath, opts.defaultFileName);
    const converter: any = converters.get(format);
    opts.onProgress(0);
    console.log(`file/export/format/${format}`);
    return converter({ ...opts, outputPath, });
};

module.exports = {
    convertTo,
    converters
};
