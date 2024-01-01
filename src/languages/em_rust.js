var lang = {
    name: "rust",
    fnam: "Rust",
    kwds: [
        "as",
        "async",
        "await",
        "break",
        "const",
        "continue",
        "crate",
        "dyn",
        "else",
        "enum",
        "extern",
        "fn",
        "for",
        "if",
        "impl",
        "in",
        "let",
        "loop",
        "match",
        "mod",
        "move",
        "mut",
        "pub",
        "ref",
        "return",
        "Self",
        "self",
        "static",
        "struct",
        "super",
        "trait",
        "type",
        "union",
        "unsafe",
        "use",
        "where",
        "while"  
    ],
    lval: [
        "false",
        "true"
    ],
    cmts: "//",
    cmtb: [{init: "/*", term: "*/", esc: "*"}],
    strb: [],
    dcvn: [],
    dcvs: []
};
if (typeof window !== "undefined") { null==window._em_la_&&(window._em_la_={}),lang.name in Object.keys(window._em_la_)||(window._em_la_[lang.name]=lang); } else { module.exports = lang }