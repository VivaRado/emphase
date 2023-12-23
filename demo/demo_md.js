let textArea = document.getElementById('markdown')
let output = document.getElementById('preview')
var codeblocks = output.querySelectorAll("code");

var em = new Emphase({
            hl_dcv: true, // directives
            hl_cmt: true, // comments
            hl_str: true, // strings
            hl_val: true, // values
            hl_kwd: true, // keywords
            showNumbersTab: true,
            showCopyButton: true,
            copyButtonText: 'Copy',
            headless: false
        });

function process_codeblocks(codeblocks){
    for (var i = 0; i < codeblocks.length; i++) {
        var pnode = codeblocks[i].parentNode;
        if (pnode.tagName == 'PRE') {
            pnode.classList.add("syntax-highlight-wrap");
            var prefx = 'lang-';
            var lang = Array.from(codeblocks[i].classList).map( (s) => s.startsWith(prefx) && s.split(prefx)[1] )[0];
            var data_headless = em.emphasize(codeblocks[i], lang)
        }
    }
}

function reload_highlights(val, output){
    output.innerHTML = marked.parse(val)
    process_codeblocks(output.querySelectorAll("code"))
}

textArea.addEventListener('input', function(e){
    reload_highlights(e.target.value, document.getElementById('preview'))
});

reload_highlights(textArea.value, output)
