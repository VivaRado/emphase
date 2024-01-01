var lang = {
    name: "java",
    fnam: "Java",
    kwds: [
        "abstract",
        "continue",
        "for",
        "new",
        "switch",
        "assert",
        "default",
        "goto",
        "package",
        "synchronized",
        "boolean",
        "do",
        "if",
        "private",
        "this",
        "break",
        "double",
        "implements",
        "protected",
        "throw",
        "byte",
        "else",
        "public",
        "throws",
        "case",
        "enum",
        "instanceof",
        "return",
        "transient",
        "catch",
        "extends",
        "int",
        "short",
        "try",
        "char",
        "final",
        "interface",
        "static",
        "void",
        "class",
        "finally",
        "long",
        "strictfp",
        "volatile",
        "const",
        "float",
        "native",
        "super",
        "while"    
    ],
    dcvn: [],
    dcvs: [
        "import",
    ],
    lval: [
        "false",
        "true",
        "null"
    ],
    cmts: "//",
    cmtb: [
        {init: "/*", term: "*/", esc: "*"}
    ],
    strl: ["\"", "'"],
    strb: [
        {init: '"""', term: '"""', esc: ""}
    ]
};
if (typeof window !== "undefined") { null==window._em_la_&&(window._em_la_={}),lang.name in Object.keys(window._em_la_)||(window._em_la_[lang.name]=lang); } else { module.exports = lang }