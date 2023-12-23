var lang = {
    name: "javascript",
    friendlyName: "JavaScript",
    keywords: [
        "abstract",
        "arguments",
        "await",
        "boolean",
        "break",
        "byte",
        "case",
        "catch",
        "char",
        "class",
        "const",
        "continue",
        "debugger",
        "default",
        "delete",
        "do",
        "double",
        "else",
        "enum",
        "eval",
        "export",
        "extends",
        "final",
        "finally",
        "float",
        "for",
        "function",
        "goto",
        "if",
        "implements",
        "in",
        "instanceof",
        "int",
        "interface",
        "let",
        "long",
        "native",
        "new",
        "package",
        "private",
        "protected",
        "public",
        "return",
        "short",
        "static",
        "super",
        "switch",
        "synchronized",
        "this",
        "throw",
        "throws",
        "transient",
        "try",
        "typeof",
        "var",
        "void",
        "volatile",
        "while",
        "with",
        "yield"
    ],
    directives: [
    ],
    directives_s: [
        "import",
        "export"
    ],
    values: [
        "false",
        "true",
        "null"
    ],
    dcv_symbol: "",
    comment: "//",
    multiLineComment: [
        {init: "/*", term: "*/", esc: "*"}
    ],
    stringLiterals: ["\"", "'", "`"],
    multiLineString: [
        {init: "`", term: "`", esc: ""}
    ]
}
if (typeof window !== "undefined") { null==window._em_la_&&(window._em_la_={}),lang.name in Object.keys(window._em_la_)||(window._em_la_[lang.name]=lang); } else { module.exports = lang }