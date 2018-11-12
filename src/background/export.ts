const { ipcMain } = require('electron');
const convertIns = require('./convert');
const momentIns = require('moment');

let exporIns:any = null;

class Export {
    private convertProcess:any;
    constructor() {
        this.convertProcess = null;
    }
    /**
     * 调用ffmpeg转码视频
     * @param options
     * @param format
     */
    convert(options:any, format:string) {
        const now = momentIns();
        const fileName = `zxy_${now.format('YYYY-MM-DD')}at${now.format('H.mm.ss')}.${format}`;
        this.convertProcess = convertIns.convertTo(
            {
                ...options,
                defaultFileName: fileName
            },
            format
        );
        return this.convertProcess;
    }
    doListener() {
        ipcMain.on('do-convert', (event:any, opt:any) => {
            console.log('收到转码消息');
            const option = opt;
            option.onProgress = (percent:any) => {
                event.sender.send('do-convert-progress', percent);
            };
            exporIns.convert(opt, opt.format).then((re:any) => {
                console.log('输出路径:', re);
                event.sender.send('do-convert-success', re);
            }).catch((err:any) => {
                console.log('转码失败', err);
                event.sender.send('do-convert-failed', err);
            });
        });
        ipcMain.on('cancel-convert', (event:any, opt:any) => {
            if (this.convertProcess) {
                this.convertProcess.cancel();
                this.convertProcess = null;
            }
        });
    }
}

// ipc.answerRenderer('get-convert', async (opt: any) => {
//     console.log('收到转码消息');
//     const opath = await exporIns.convert(opt, opt.format);
//     return opath;
// });

module.exports = () => {
    exporIns = new Export();
    exporIns.doListener();
};
