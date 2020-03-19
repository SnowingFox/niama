"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var loader_utils_1 = tslib_1.__importDefault(require("loader-utils"));
var lodash_1 = require("lodash");
var pug_1 = tslib_1.__importDefault(require("pug"));
function default_1(source) {
    var _this = this;
    var loaderO = loader_utils_1.default.getOptions(this);
    var compilerO = {
        filename: this.resourcePath,
        doctype: 'html',
        plugins: [{ preLex: function (content) { return preLex(content, loaderO); }, postLex: function (tokens) { return postLex(tokens, loaderO); } }],
        compileDebug: this.debug || false,
    };
    var template = pug_1.default.compile(source, compilerO);
    template.dependencies.forEach(function (file) { return _this.addDependency(file); });
    return template(loaderO.data || {});
}
exports.default = default_1;
// PRELEX PLUGIN ===========================================================================================================================
var preLex = function (content, opts) {
    var _a = opts.separatorM, separatorM = _a === void 0 ? '--' : _a;
    var reg = {
        BEM: /\.@-(\w+)--(\w+)/g,
        BE: /\.@-(\w+)/g,
        BM: /\.@(\w+)--(\w+)/g,
        B: /\.@(\w+)/g,
        EM: /\.-(\w+)--(\w+)/g,
        E: /\.-(\w+)/g,
    };
    var repl = {
        BEM: ".BE_$1.BE_$1" + separatorM + "$2",
        BE: ".BE_$1",
        BM: ".B_$1.B_$1" + separatorM + "$2",
        B: ".B_$1",
        EM: ".E_$1.E_$1" + separatorM + "$2",
        E: ".E_$1",
    };
    return Object.keys(reg).reduce(function (r, k) { return r.replace(reg[k], repl[k]); }, content);
};
// POSTLEX PLUGIN ==========================================================================================================================
var postLex = function (tokens, opts) {
    // OPTS ==================================================================================================================================
    var _a = opts.casingB, casingB = _a === void 0 ? 'pascal' : _a, _b = opts.casingE, casingE = _b === void 0 ? 'camel' : _b, _c = opts.casingM, casingM = _c === void 0 ? 'camel' : _c, _d = opts.separatorE, separatorE = _d === void 0 ? '-' : _d, _e = opts.separatorM, separatorM = _e === void 0 ? '--' : _e;
    var format = function (_a) {
        var casing = _a.casing, val = _a.val;
        return casing === 'camel' ? lodash_1.camelCase(val) : casing === 'kebab' ? lodash_1.kebabCase(val) : lodash_1.upperFirst(lodash_1.camelCase(val));
    };
    var modifier = function (_a) {
        var casing = _a.casing, _b = _a.prefix, prefix = _b === void 0 ? '' : _b, val = _a.val;
        var vals = val.split(separatorM);
        var main = prefix + format({ casing: casing, val: vals[0] });
        return { main: main, val: main + (vals.length > 1 ? " " + main + separatorM + format({ casing: casingM, val: vals[1] }) : '') };
    };
    // DEPTHS ================================================================================================================================
    var depths = { component: 0, line: 0 };
    var depth = function () { return depths.line + depths.component; };
    var updateDepths = function (token) {
        if (token.type === 'indent')
            depths = { line: depths.line + 1, component: 0 };
        if (token.type === ':')
            depths.component++;
        if (token.type === 'outdent')
            depths = { line: depths.line - 1, component: 0 };
        if (token.type === 'newline')
            depths.component = 0;
    };
    // BLOCKS ================================================================================================================================
    var blocks = [];
    var block = function () {
        return blocks
            .slice(0, depth())
            .filter(function (v) { return v !== null; })
            .pop() || '';
    };
    var updateBlocks = function (value) { return (blocks[depth()] = value); };
    // BLOCK TOKENS ==========================================================================================================================
    var isTokenB = function (token) { return token.type === 'class' && token.val.startsWith('B_'); };
    var tokenB = function (token) {
        var _a = modifier({ casing: casingB, val: token.val.replace('B_', '') }), main = _a.main, val = _a.val;
        updateBlocks(main);
        return tslib_1.__assign(tslib_1.__assign({}, token), { val: val });
    };
    // BLOCK ELEMENT TOKENS ==================================================================================================================
    var isTokenBE = function (token) { return token.type === 'class' && token.val.startsWith('BE_'); };
    var tokenBE = function (token) {
        var _a = modifier({ casing: casingB, val: token.val.replace('BE_', '') }), main = _a.main, val = _a.val;
        updateBlocks(main);
        var valE = format({ casing: casingE, val: main });
        return tslib_1.__assign(tslib_1.__assign({}, token), { val: "" + block() + separatorE + valE + " " + val });
    };
    // ELEMENT TOKENS ========================================================================================================================
    var isTokenE = function (token) { return token.type === 'class' && token.val.startsWith('E_'); };
    var tokenE = function (token) {
        var val = modifier({ casing: casingE, prefix: block() + separatorE, val: token.val.replace('E_', '') }).val;
        return tslib_1.__assign(tslib_1.__assign({}, token), { val: val });
    };
    return tokens.map(function (token) {
        updateDepths(token);
        return isTokenB(token) ? tokenB(token) : isTokenBE(token) ? tokenBE(token) : isTokenE(token) ? tokenE(token) : token;
    });
};
