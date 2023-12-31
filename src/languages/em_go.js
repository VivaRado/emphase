var lang = {
    name: "go",
    friendlyName: "Go",
    keywords: [
        "break",
        "default",
        "func",
        "interface",
        "select",
        "case",
        "defer",
        "go",
        "map",
        "struct",
        "chan",
        "else",
        "goto",
        "switch",
        "const",
        "fallthrough",
        "if",
        "range",
        "type",
        "continue",
        "for",
        "return",
        "var"     
    ],
    directives: [],
    directives_s: [
        "package",
        "import"
    ],
    dcv_symbol: "",
    comment: "//",
    multiLineComment: [
        {init: "/*", term: "*/", esc: "*"}
    ],
    values: [
        "false",
        "true",
        "null"
    ],
    stringLiterals: ["\"", "'"],
    multiLineString: [
        {init: "`", term: "`", esc: ""}
    ]
};
if (typeof window !== "undefined") { null==window._em_la_&&(window._em_la_={}),lang.name in Object.keys(window._em_la_)||(window._em_la_[lang.name]=lang); } else { module.exports = lang }