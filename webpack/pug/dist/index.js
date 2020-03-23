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
// CONSTANTS ===============================================================================================================================
exports.B = 'B_';
exports.BE = 'BE_';
exports.E = 'E_';
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
        BEM: "." + exports.BE + "$1." + exports.B + "$1" + separatorM + "$2",
        BE: "." + exports.BE + "$1",
        BM: "." + exports.B + "$1." + exports.B + "$1" + separatorM + "$2",
        B: "." + exports.B + "$1",
        EM: "." + exports.E + "$1." + exports.E + "$1" + separatorM + "$2",
        E: "." + exports.E + "$1",
    };
    return Object.keys(reg).reduce(function (r, k) { return r.replace(reg[k], repl[k]); }, content);
};
// POSTLEX PLUGIN ==========================================================================================================================
var postLex = function (tokens, loaderO) {
    var defaultO = { casingB: 'raw', casingE: 'camel', casingM: 'camel', data: {}, separatorE: '_', separatorM: '--' };
    var opts = tslib_1.__assign(tslib_1.__assign(tslib_1.__assign({}, defaultO), loaderO), { blocks: [], depths: { extras: [0], tab: 0 } });
    return tokens.map(function (token) {
        updateDepths({ opts: opts, token: token });
        if (['outdent', 'newline'].includes(token.type))
            opts.blocks.fill(null, depth(opts));
        if (isBEM(token, exports.B))
            return tokenB({ opts: opts, token: token });
        if (isBEM(token, exports.BE))
            return tokenBE({ opts: opts, token: token });
        if (isBEM(token, exports.E))
            return tokenE({ opts: opts, token: token });
        return token;
    });
};
// OPTS ====================================================================================================================================
var format = function (_a) {
    var casing = _a.casing, val = _a.val;
    return casing === 'camel' ? lodash_1.camelCase(val) : casing === 'kebab' ? lodash_1.kebabCase(val) : casing === 'pascal' ? lodash_1.upperFirst(lodash_1.camelCase(val)) : val;
};
var modifier = function (_a) {
    var casing = _a.casing, _b = _a.opts, _c = _b.casingM, casingM = _c === void 0 ? 'camel' : _c, _d = _b.separatorM, separatorM = _d === void 0 ? '--' : _d, _e = _a.prefix, prefix = _e === void 0 ? '' : _e, val = _a.val;
    var vals = val.split(separatorM);
    var main = prefix + format({ casing: casing, val: vals[0] });
    return { main: main, val: main + (vals.length > 1 ? "" + separatorM + format({ casing: casingM, val: vals[1] }) : '') };
};
// DEPTHS ==================================================================================================================================
var depth = function (_a) {
    var depths = _a.depths;
    return depths.extras.reduce(function (r, e) { return r + e; }, 0) + depths.tab;
};
var updateDepths = function (_a) {
    var depths = _a.opts.depths, token = _a.token;
    if (token.type === 'indent')
        depths = { extras: tslib_1.__spreadArrays(depths.extras, [0]), tab: depths.tab + 1 };
    if (token.type === ':')
        depths.extras[depths.tab]++;
    if (token.type === 'outdent')
        depths = { extras: tslib_1.__spreadArrays(depths.extras.slice(0, -2), [0]), tab: depths.tab - 1 };
    if (token.type === 'newline')
        depths.extras[depths.tab] = 0;
};
// BLOCKS ==================================================================================================================================
var block = function (opts) {
    return opts.blocks
        .slice(0, depth(opts))
        .filter(function (v) { return v !== null; })
        .pop() || '';
};
var updateBlocks = function (_a) {
    var opts = _a.opts, val = _a.val;
    return (opts.blocks[depth(opts)] = val);
};
// TOKENS =================================================================================================================================
var isBEM = function (token, prefix) { return token.type === 'class' && token.val.startsWith(prefix); };
var tokenB = function (_a) {
    var opts = _a.opts, token = _a.token;
    var _b = modifier({ opts: opts, casing: opts.casingB, val: token.val.replace(exports.B, '') }), main = _b.main, val = _b.val;
    updateBlocks({ opts: opts, val: main });
    return tslib_1.__assign(tslib_1.__assign({}, token), { val: val });
};
var tokenBE = function (_a) {
    var opts = _a.opts, token = _a.token;
    var _b = modifier({ opts: opts, casing: opts.casingB, val: token.val.replace(exports.BE, '') }), main = _b.main, val = _b.val;
    updateBlocks({ opts: opts, val: main });
    var valE = format({ casing: opts.casingE, val: main });
    return tslib_1.__assign(tslib_1.__assign({}, token), { val: "" + block(opts) + opts.separatorE + valE + " " + val });
};
var tokenE = function (_a) {
    var opts = _a.opts, token = _a.token;
    var val = modifier({ opts: opts, casing: opts.casingE, prefix: block(opts) + opts.separatorE, val: token.val.replace(exports.E, '') }).val;
    return tslib_1.__assign(tslib_1.__assign({}, token), { val: val });
};
