"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var vm = require("vm");

var JsFormatObject = {
    stringify: function (obj, replacer, spacing) {
        var space = '', numSpace = (spacing || 2);
        for (var i = 0; i < numSpace; i++) {
            space = space + ' ';
        }
        var prefix = 'module.exports' + space + '=' + space;
        var jsonStr = JSON.stringify(obj, replacer || null, numSpace);
        return prefix + jsonStr + ';';
    },
    parse: function (text) {
        var context = { module: { exports: {} } };
        vm.runInNewContext(text, context, {
            lineOffset: 0,
            displayErrors: true
        });
        var result = {};
        for (var key in context.module.exports) {
            result[key] = context.module.exports[key];
        }
        return result;
    }
}

exports.default = JsFormatObject;
