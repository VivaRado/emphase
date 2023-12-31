var lang = {
    name: "perl",
    friendlyName: "Perl",
    keywords: [
        "__DATA__",
        "__END__",
        "__FILE__",
        "__LINE__",
        "__PACKAGE__",
        "else",
        "lock",
        "qw",
        "elsif",
        "lt",
        "qx",
        "eq",
        "m",
        "sv",
        "exp",
        "ne",
        "sub",
        "for",
        "no",
        "tr",
        "and",
        "foreach",
        "or",
        "unless",
        "cmp",
        "ge",
        "package",
        "until",
        "continue",
        "gt",
        "q",
        "while",
        "CORE",
        "if",
        "qq",
        "xor",
        "do",
        "le",
        "qr",
        "y",
        "my",
        "return"
    ],
    comment: "#",
    multiLineComment: [
        {init: "=pod", term: "=cut"},
        {init: "/*", term: "*/", esc: "*"} // Acme::Comment
    ],
    stringLiterals: ["\"", "'"],
    multiLineString: [
        {init: "<<END", term: "END", esc: "<"}
    ],
    values: [
        "True",
        "False"
    ],
    directives: [],
    directives_s: []
};
if (typeof window !== "undefined") { null==window._em_la_&&(window._em_la_={}),lang.name in Object.keys(window._em_la_)||(window._em_la_[lang.name]=lang); } else { module.exports = lang }