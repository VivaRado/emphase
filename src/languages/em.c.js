var lang = {
    name: "c",
    friendlyName: "C",
    keywords: [
        "auto",
        "break",
        "case",
        "char",
        "const",
        "continue",
        "default",
        "do",
        "double",
        "else",
        "enum",
        "extern",
        "float",
        "for",
        "goto",
        "if",
        "int",
        "long",
        "register",
        "return",
        "short",
        "signed",
        "sizeof",
        "static",
        "struct",
        "switch",
        "typedef",
        "union",
        "unsigned",
        "void",
        "volatile",
        "while"
    ],
    functions: [
        "printf"
    ],
    directives: [
        "#define",
        "#undef",
        "#if",
        "#ifdef",
        "#ifndef",
        "#else",
        "#elseif",
        "#elif",
        "#endif",
        "#error",
    ],
    directives_s: [
        "#include"
    ],
    comment: "//",
    dcv_symbol: "#",
    multiLineComment: [
        {init: "/*", term: "*/", esc: "*"}
    ],
    stringLiterals: ["\"", "'"],
    values: [
        "TRUE",
        "FALSE"
    ],
};
if (typeof window !== "undefined") { null==window._em_la_&&(window._em_la_={}),lang.name in Object.keys(window._em_la_)||(window._em_la_[lang.name]=lang); } else { module.exports = lang }