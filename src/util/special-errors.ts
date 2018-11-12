const specialCodes = [
    900005
];
const alterCodes = [
    30207
];

const specialHasCode = (code:number) => {
    const codeStr = specialCodes.join(',');
    return codeStr.indexOf(code.toString()) > -1;
};

const alertHasCode = (code:number) => {
    const result = alterCodes.join(',').indexOf(code.toString()) > -1;
    return result;
};
export {
    specialHasCode,
    alertHasCode
};
