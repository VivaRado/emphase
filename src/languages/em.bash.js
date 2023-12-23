var lang = {
    name: "bash",
    friendlyName: "Bash",
    keywords: [
        "if",
        "then",
        "elif",
        "else",
        "fi",
        "time",
        "for",
        "in",
        "until",
        "while",
        "do",
        "done",
        "case",
        "esac",
        "coproc",
        "select",
        "function",
        "return"
    ],
    keywords_b: [
        "command",
        "echo",
        "local"
    ],
    directives: [
    ],
    directives_s: [
    ],
    values: [
        "false",
        "true"
    ],
    comment: "#",
    dcv_symbol: "$",
    multiLineComment: [
        {init: ": '", term: "'", esc: ""},
        {init: "(: \<\<|: )('|w+)", term: "(\\n\\2)", esc: "<>w"}
    ],
    stringLiterals: ["\"", "'"],
    multiLineString: []
};
if (typeof window !== "undefined") { null==window._em_la_&&(window._em_la_={}),lang.name in Object.keys(window._em_la_)||(window._em_la_[lang.name]=lang);} else {module.exports = lang;}