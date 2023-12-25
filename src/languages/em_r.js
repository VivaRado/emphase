var lang = {
    name: "r",
    friendlyName: "R",
    keywords: [
        "if",
        "else",
        "repeat",
        "while",
        "function",
        "for",
        "in",
        "next",
        "break",
        "Inf",
        "NaN",
        "NA",
        "NA_integer_",
        "NA_real_",
        "NA_complex_",
        "NA_character_",
        "return"
    ],
    values: [
        "TRUE",
        "FALSE",
        "NULL"
    ],
    comment: "#",
    stringLiterals: ["\"", "'"],
    multiLineComment: [],
    multiLineString: [],
    directives: [],
    directives_s: []
};
if (typeof window !== "undefined") { null==window._em_la_&&(window._em_la_={}),lang.name in Object.keys(window._em_la_)||(window._em_la_[lang.name]=lang); } else { module.exports = lang }