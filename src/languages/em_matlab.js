var lang = {
    name: "matlab",
    friendlyName: "Matlab",
    keywords: [
        "break",
        "case",
        "catch",
        "classdef",
        "continue",
        "else",
        "elseif",
        "end",
        "for",
        "function",
        "global",
        "if",
        "otherwise",
        "parfor",
        "persistent",
        "return",
        "spmd",
        "switch",
        "try",
        "while"
    ],
    directives: [],
    directives_s: [],
    values: [
        "false",
        "true",
        "null"
    ],
    dcv_symbol: "",
    comment: "%",
    multiLineComment: [
        {init: "%{", term: "%}", esc: "%"}
    ],
    stringLiterals: ["\"", "'"],
    multiLineString: []
};
if (typeof window !== "undefined") { null==window._em_la_&&(window._em_la_={}),lang.name in Object.keys(window._em_la_)||(window._em_la_[lang.name]=lang); } else { module.exports = lang }