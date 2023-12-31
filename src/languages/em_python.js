var lang = {
    name: "python",
    friendlyName: "Python",
    keywords: [
        "await",
        "else",
        //"import",
        "pass",
        "break",
        "except",
        "in",
        "raise",
        "class",
        "finally",
        "is",
        "return",
        "and",
        "continue",
        "for",
        "lambda",
        "try",
        "as",
        "def",
        //"from",
        "nonlocal",
        "while",
        "assert",
        "del",
        "global",
        "not",
        "with",
        "async",
        "elif",
        "if",
        "or",
        "yield"      
    ],
    values: [
        "False",
        "True",
        "None"
    ],
    directives: [],
    directives_s: [
        "import",
        "from"
    ],
    dcv_symbol: "",
    comment: "#",
    multiLineComment: [
        {init: "'''", term: "'''", esc: ""},
        {init: "\"\"\"", term: "\"\"\"", esc: ""}
    ],
    stringLiterals: ["\"", "'"],
    multiLineString: [
        {init: "'''", term: "'''", esc: "", pre: "=\\s*"},
        {init: "\"\"\"", term: "\"\"\"", esc: "", pre: "=\\s*"}
    ],
    values: [
        "True",
        "False"
    ]
};
if (typeof window !== "undefined") { null==window._em_la_&&(window._em_la_={}),lang.name in Object.keys(window._em_la_)||(window._em_la_[lang.name]=lang); } else { module.exports = lang }