/**
 *
 *  Base64 encode / decode
 *  http://www.webtoolkit.info/
 *
 */
/* eslint-disable */
var Base64 = {

    // private property
    keyStr: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=',

    // public method for encoding
    encode: function(input:string) {
        var output = '',
            chr1, chr2, chr3, enc1, enc2, enc3, enc4,
            i = 0,
            inputStr = Base64.utf8_encode(input);
        while (i < inputStr.length) {
            chr1 = inputStr.charCodeAt(i++);
            chr2 = inputStr.charCodeAt(i++);
            chr3 = inputStr.charCodeAt(i++);
            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;
            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            } else if (isNaN(chr3)) {
                enc4 = 64;
            }
            output = output +
                this.keyStr.charAt(enc1) + this.keyStr.charAt(enc2) +
                this.keyStr.charAt(enc3) + this.keyStr.charAt(enc4);
        }
        return output;
    },

    // public method for decoding
    decode: function(input:string) {
        var output = '',
            chr1, chr2, chr3,
            enc1, enc2, enc3, enc4,
            i = 0,
            inputStr = input.replace(/[^A-Za-z0-9+/=]/g, '');
        while (i < inputStr.length) {
            enc1 = this.keyStr.indexOf(inputStr.charAt(i++));
            enc2 = this.keyStr.indexOf(inputStr.charAt(i++));
            enc3 = this.keyStr.indexOf(inputStr.charAt(i++));
            enc4 = this.keyStr.indexOf(inputStr.charAt(i++));
            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;
            output += String.fromCharCode(chr1);
            if (enc3 !== 64) {
                output += String.fromCharCode(chr2);
            }
            if (enc4 !== 64) {
                output += String.fromCharCode(chr3);
            }
        }
        output = Base64.utf8_decode(output);
        return output;
    },

    // private method for UTF-8 encoding
    utf8_encode: function(strEnc:string) {
        var utftext = '',
            n, c,
            str = strEnc.replace(/\r\n/g, '\n');
        for (n = 0; n < str.length; n++) {
            c = str.charCodeAt(n);
            if (c < 128) {
                utftext += String.fromCharCode(c);
            } else if ((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            } else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }
        }
        return utftext;
    },
    // private method for UTF-8 decoding
    utf8_decode: function(utftext:string) {
        var string = '',
            i = 0,
            c = 0,
            c2 = 0,
            c3 = 0;
        while (i < utftext.length) {
            c = utftext.charCodeAt(i);
            if (c < 128) {
                string += String.fromCharCode(c);
                i++;
            } else if ((c > 191) && (c < 224)) {
                c2 = utftext.charCodeAt(i + 1);
                string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                i += 2;
            } else {
                c2 = utftext.charCodeAt(i + 1);
                c3 = utftext.charCodeAt(i + 2);
                string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                i += 3;
            }
        }
        return string;
    }
};
export default {
    Base64
}
