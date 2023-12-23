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