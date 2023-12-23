(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const Utils = require("./Utils.js");

class CacheManager {
	constructor() {
		this.special = '~';
		return this
	}
	cacheSetChunk( em, mltarr, nam, clet) {
		var self = this;
		var add_pre = '', _prep = '';
		if (em._cached[clet] == undefined) em._cached[clet] = {};
		if (mltarr !== undefined && mltarr.length) {
			for (var x = 0; x < mltarr.length; x++) {
				if (mltarr[x].pre) add_pre = mltarr[x].pre;
				var mltr = Utils.multilineRegex(mltarr[x]);
				var rstr = new RegExp(add_pre+mltr, 'g');
				var pt = em.result.match(rstr);
				if (pt != null) {
					for (var y = 0; y < pt.length; y++) {
						var sminx = em.result.indexOf(pt[y]);
						var spl_cmt = pt[y].split(em._string.newLine);
						var rep_arr = Utils.genRepArr(spl_cmt.length, `${clet}:${x}:${y}`, self.special);
						for (var z = 0; z < rep_arr.length; z++) {
							var _ps = Utils.encMarkup(spl_cmt[z]);
							if (spl_cmt[z].length == 0) _ps = '<br>';
							if (add_pre.length > 0) {
								if (_ps.match(new RegExp(add_pre, 'g'))) {
									_prep = _ps.match(new RegExp(add_pre, 'g'))[0].split(mltarr[x].init)[0];
								}
								_ps = _ps.replace( new RegExp(add_pre, 'g'), '')
							}
							em._cached[clet][rep_arr[z]] = `${_prep}<em data-em="${nam}_mul">${_ps}</em>`;
							_prep = '';
						}
						em.result = Utils.splice(em.result, sminx, pt[y].length, rep_arr.join('\n') );
					}
				}
			}
		}
	}
	cacheSetWord(em, reg, ctype, clet){
		var self = this;
		var reg_str = new RegExp(reg, 'g'),
			pt = em.result.match(reg_str);
		if (em._cached[clet] == undefined) em._cached[clet] = {};
		var t_init = '', t_term = '', t_mid = '', cmul = '', dcv_val = '', dcv_str = '', add_w = '', add_n = '';
		if (pt != null) {
			var rep_arr = Utils.genRepArr(pt.length, `${clet}`, self.special);
			for (var x = 0; x < rep_arr.length; x++) {
				var chunk = pt[x], sminx = em.result.indexOf(chunk);
				t_mid = chunk;
				if (em._lang_.isMarkUp !== undefined && em._lang_.isMarkUp ) {
					var tagname = chunk.replace(/[<|!|>]/g, '').split(em._string.space)[0],
						tag_wrap = pt[x].split(tagname);
					t_init = Utils.encMarkup(tag_wrap[0]);
					t_term = Utils.encMarkup(tag_wrap[1]);
					t_mid = tagname;
				}
				if (clet == 'D') {
					var ptb = Array.from( pt[x].matchAll(reg_str))[0];
					if (ptb != null || ptb[1] !== undefined) {
						t_mid = ptb[1];
						if (ptb[2] !== undefined) {
							dcv_val = Utils.encMarkup(ptb[2]);
							if (em._lang_.directives_s.includes(ptb[1])) {
								dcv_str = `<em data-em="${ctype}_str">${dcv_val}</em>`;
							} else {
								dcv_str = dcv_val;
							}
							if (dcv_val.length == 0 || ptb[0].includes('\n') ) { add_n = '\n', add_w = ''; } else { add_w = ' '; }
						}
					}
				}
				if (sminx != -1 ) {
					em._cached[clet][rep_arr[x]] = `${t_init}<em data-em="${ctype}${cmul}">${t_mid}</em>${t_term}${add_n}${add_w}${dcv_str}`;
					em.result = Utils.splice(em.result, sminx, chunk.length, rep_arr[x]);
				}
			}
		}
	}
	cacheReplace(em, cache) { 
		for (var v in em._cached[cache]) em.result = em.result.replace(v, em._cached[cache][v]) 
	}
};
module.exports = CacheManager
},{"./Utils.js":4}],2:[function(require,module,exports){
const Utils = require("./Utils.js");

function makeButtons(em) {
	var header = classElement("div", "header");
	var lbl_lang = classElement("div", "label");
	lbl_lang.innerHTML = em._lang_.friendlyName;
	header.prepend(lbl_lang);
	em._code.parentNode.appendChild(header);
	if (em._cfg.showCopyButton) {
		var copyButton = classElement("div", "button");
		copyButton.innerHTML = em._cfg.copyButtonText;
		header.appendChild(copyButton);
		copyButton.addEventListener('click',function(e){
			var tid = e.currentTarget.parentNode.parentNode.id;
			var elem = em._elements[tid];
			Utils.toClipboard(elem);
		});
	}
}
function classElement(type, className) { 
	var result = document.createElement(type);
	className && (result.className = className);
	return result; 
}
function scrollSync(trg) { 
	trg.querySelector('.numbers').style.transform = `translateY(${ -parseInt(trg.scrollTop) }px)`; 
}
function makeNumberTab(em) {
	em._code.classList.add('show_numbers');
	em._numbtab = classElement("div", "number_tab");
	em._numblst = classElement("div", "numbers");
	em._code.prepend(em._numbtab)
	em._numbtab.appendChild(em._numblst);
	var syntax_elem = em._code.getElementsByClassName('syntax')[0];
	var nstyle = window.getComputedStyle(em._numblst);
	var numbers_padding = ((parseInt(nstyle.paddingLeft) || 0) + parseInt(nstyle.paddingRight) || 0) / 2;
	syntax_elem.style.marginLeft = `${em._numblst.offsetWidth + numbers_padding}px`;
	em._numbtab.style.width = `${em._numblst.offsetWidth + numbers_padding}px`;
	em._code.addEventListener('scroll', function(e) {
		scrollSync(e.target)
	});
	em._code.addEventListener('resize', function(e) {
		scrollSync(e.target)
	});
}
function createElements(em) {
	em._element.classList.add("syntax-highlight");
	em._element.innerHTML = em._string.empty;
	em._code = classElement("div", "code");
	em._element.appendChild(em._code);
	em._syntax = classElement("div", "syntax");
	em._code.appendChild(em._syntax);
	makeButtons(em);
	if (em._cfg.showNumbersTab) makeNumberTab(em);

	return em
}
function createLines(em) {
	var lines = em.result.split(em._string.newLine),
		linesLength = lines.length,
		lineNumber = 1;
	for (var lineIndex = 0; lineIndex < linesLength; lineIndex++) {
		var line = lines[lineIndex];
		if ( em._numblst ) {
			var numberCode = ElementMaker.classElement("p");
			numberCode.innerHTML = lineNumber.toString();
			em._numblst.appendChild(numberCode);
			lineNumber++;
		}
		var syntaxCode = ElementMaker.classElement("p");
		syntaxCode.innerHTML = line.trim() === em._string.empty ? "<br>" : line;
		em._syntax.appendChild(syntaxCode);
	}
}

const ElementMaker = {
	makeButtons : makeButtons,
	createLines : createLines,
	classElement : classElement,
	scrollSync : scrollSync,
	makeNumberTab : makeNumberTab,
	createElements : createElements
};

module.exports = ElementMaker
},{"./Utils.js":4}],3:[function(require,module,exports){
class LanguageLoader {
	constructor() {
		this._lang_unknown = "unknown";
		this.current_language = this._lang_unknown;
		this._cached_languages = {};
		this._supported_languages = [
			'bash',			'c',
			'cpp',			'cs',
			'fs',			'go',
			'html',			'java',
			'javascript',	'kotlin',
			'matlab',		'perl',
			'python',		'r',
			'ruby',			'rust',
			'scala',		'sql',
			'swift',		'typescript',
			'vb'
		];
		return this
	}
	assignLanguages(lang) {
		var self = this;
		var lang_isloaded = false;
		if (lang && lang != self._lang_unknown) {
			self.current_language = lang;
			var lang_nonexist = !self._cached_languages.hasOwnProperty(lang);
			var lang_supports = self._supported_languages.includes(lang);
			if (typeof window !== "undefined") {
				lang_isloaded = window._em_la_[lang];
			} else {
				var _lang = require(`../languages/em.${lang}.js`);
				lang_isloaded = _lang;
			}
			console.log('lang_isloaded')
			console.log(lang_isloaded)
			if (lang_nonexist && lang_supports && lang_isloaded) {
				self._cached_languages[lang] = lang_isloaded
			}
		} else {
			self.current_language = self._lang_unknown;
		}
		return self
	}
	getLanguage(lang) {
		if ( lang == undefined) {
			lang = this.current_language
		}
		return this._cached_languages[lang]; 
	}
};
module.exports = LanguageLoader
},{}],4:[function(require,module,exports){
function genRepArr(len, type, special) { 
	return [...Array(len)].map((x, i) => `${special}\{${type}:${i}\}`);
}
function splice(string, start, length, replacement) { 
	return string.substr(0, start) + replacement + string.substr(start + length);
}
function makeGUID() { 
	var w = () => { return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1) }; 
	return `${w()}${w()}`; 
}
function encMarkup(data) {
	if (data!==undefined) data = ( data=data.replace(/</g,"&lt;"), data=data.replace(/>/g,"&gt;") );
	return data;
}
function escapeRegex(string, esc) { 
	return string.replace(new RegExp(`[${esc}]`, 'g'), '\\$&'); 
}
function multilineRegex(mlc) {
	var _esc = "";
	mlc.esc && (_esc = mlc.esc);
	return `${escapeRegex(`${ mlc.init }`, _esc)}([\\s\\S]*?)${escapeRegex(`${ mlc.term }`, _esc)}`;
}
function toClipboard(elem){	
	navigator.clipboard.writeText(elem.text);
}
const Utils = {
	splice: splice,
	makeGUID: makeGUID,
	genRepArr: genRepArr,
	encMarkup: encMarkup,
	toClipboard: toClipboard,
	escapeRegex: escapeRegex,
	multilineRegex: multilineRegex
};

module.exports = Utils;
},{}],5:[function(require,module,exports){
const LanguageLoader = require("./LanguageLoader.js");
const CacheManager = require("./CacheManager.js");
const ElementMaker = require("./ElementMaker.js");
const Utils = require("./Utils.js");

class Emphase {
	constructor(cfg) {
		var em = this;
		em._def = {
			hl_dcv: true, // directives
			hl_cmt: true, // comments
			hl_cmb: true, // comment blocks
			hl_str: true, // strings
			hl_stb: true, // string blocks
			hl_val: true, // values
			hl_kwd: true, // keywords
			showNumbersTab: true,
			showCopyButton: true,
			copyButtonText: 'Copy',
			headless: false
		};
		if (cfg == undefined) cfg = {}; em._cfg = {...em._def, ...cfg};
		if (typeof document == "undefined" && typeof window == "undefined" ) em._cfg.headless = true;
		if (typeof window != "undefined") {
			var _em_la_ = {};
		}
		em._syntax = null;
		em._elements = {};
		em._lang_ = null;
		em._string = { empty: "", space: " ", newLine: "\n" };
		em._cached = {};
		em.lalo = new LanguageLoader();
		em.cama = new CacheManager();
	}
	generateSyntax(){
		var em = this;
		if (em._lang_ !== em._lang_unknown) {
			// cache set
			if (em._cfg.hl_stb) em.cama.cacheSetChunk( em, em._lang_.multiLineString, 'str', 'SB');
			if (em._cfg.hl_cmb) em.cama.cacheSetChunk( em, em._lang_.multiLineComment, 'cmt', 'CB');
			var directives = [].concat(em._lang_.directives||[],em._lang_.directives_s||[]);
			if (em._cfg.hl_dcv && directives.length) {
				em.cama.cacheSetWord(em,`(${directives.join('|')})\\s([^\\n\\r]*)`, "dcv", `D`);
			}
			if (em._cfg.hl_str) {
				var reg_str = `([${em._lang_.stringLiterals.join('|')}])(?:(?!\\1|\\\\).|\\\\.)*\\1`;
				em.cama.cacheSetWord(em,reg_str, 'str', 'S');
			}
			if (em._cfg.hl_cmt) {
				var reg_str = em._lang_.comment + ".*";
				em.cama.cacheSetWord(em,reg_str, 'cmt', 'C');
			}
			if (em._lang_.isMarkUp) {
				var reg_str = /(<([^>]+)>)/;
				em.cama.cacheSetWord(em,reg_str, 'kwd', 'HK');
			} else {
				em.cama.cacheSetWord(em,`\\b(${em._lang_.keywords.join('|')})\\b`, 'kwd', 'K');
			}
			if (em._cfg.hl_val && em._lang_.values && em._lang_.values.length) {
				em.cama.cacheSetWord(em,`\\b(${em._lang_.values.join('|')})\\b`, 'val', 'VL');
			}
			// cache replace
			if (em._lang_.isMarkUp) {
				em.cama.cacheReplace(em, 'HK');
			} else {
				em.cama.cacheReplace(em, 'K');
			}
			if (em._cfg.hl_dcv) em.cama.cacheReplace(em, 'D');
			if (em._cfg.hl_val && em._lang_.values && em._lang_.values.length) em.cama.cacheReplace(em, 'VL');
			if (em._cfg.hl_cmt) em.cama.cacheReplace(em, 'C'); em.cama.cacheReplace(em, 'CB');
			if (em._cfg.hl_str) em.cama.cacheReplace(em, 'S'); em.cama.cacheReplace(em, 'SB');
		} else {
			em.result = Utils.encMarkup(em.result);
		}		
	}
	emphasize(input, lang) {
		var em = this, _init_data = '', guid = Utils.makeGUID();
		em.lalo.assignLanguages(lang);
		if ( typeof input === 'string' ){
			em._elements[guid] = {text:input};
			_init_data = input;
		} else {
			em._element = input;
			_init_data = em._element.childNodes[0].nodeValue;
			if (!em._cfg.headless) {
				if (typeof em._element.id !== undefined) em._element.id = guid;
				em._elements[em._element.id] = {text:input.textContent};
			}else {
				em._elements[guid] = {text:input.textContent};
			}
		}
		em._lang_ = em.lalo.getLanguage();
		em.result = _init_data;
		em.generateSyntax();
		if (!em._cfg.headless) {
			ElementMaker.createElements(em);
			ElementMaker.createLines(em);
			em._elements[em._element.id].html = em.result;
		}
		return em;
	}
}
module.exports = Emphase
},{"./CacheManager.js":1,"./ElementMaker.js":2,"./LanguageLoader.js":3,"./Utils.js":4}],6:[function(require,module,exports){
const Emphase = require("./cjs/emphase.js");
if (typeof window !== "undefined") {
	window.Emphase = Emphase;
} else {
	module.exports = Emphase
}
},{"./cjs/emphase.js":5}]},{},[6]);
