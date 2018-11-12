type map = {
    [key: string]: { [key: string]: any }
};
const maps: map = {
    'section-type': {
        0: '混合',
        1: '文档',
        2: '图文'
    },
};
const mapsFun = (key:string, value:string) => {
    if (value === undefined) {
        return maps[key];
    } else if (maps[key]) {
        return maps[key][value] || '';
    }

    return '';
};
export { mapsFun as default };

