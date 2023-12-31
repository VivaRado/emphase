import {LanguageLoader} from "./LanguageLoader.js";
import {CacheManager} from "./CacheManager.js";
import {ElementMaker} from "./ElementMaker.js";
import {Utils} from "./Utils.js";

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
			var directives = [].concat(em._lang_.directives||[],em._lang_.directives_s||[]);
			var notMarkup = (!em._lang_.isMarkUp || em._lang_.isMarkUp == undefined);
			var reg_search = [
				['str', 'SB', em._lang_.multiLineString, em._cfg.hl_stb ],
				['cmt', 'CB', em._lang_.multiLineComment, em._cfg.hl_cmb ],
				['dcv', `D` , `(${directives.join('|')})\\s([^\\n\\r]*)`, (em._cfg.hl_dcv && directives.length)],
				['str', 'S' , `([${em._lang_.stringLiterals.join('|')}])(?:(?!\\1|\\\\).|\\\\.)*\\1`, em._cfg.hl_str],
				['cmt', 'C' , em._lang_.comment + ".*", em._cfg.hl_cmt],
				['kwd', 'HK', /(<([^>]+)>)/, !notMarkup],
				['kwd', 'K' , `\\b(${em._lang_.keywords.join('|')})\\b`, notMarkup],
				['val', 'VL', `\\b(${em._lang_.values.join('|')})\\b`, (em._cfg.hl_val && em._lang_.values.length)]
			];
			for (var i = 0; i < reg_search.length; i++) {
				if (reg_search[i][3]) {
					em.cama.cacheSetArea( em, reg_search[i][2], reg_search[i][0], reg_search[i][1])
				}
			}
			if (!notMarkup) em.cama.cacheReplace(em, 'HK');
			if ( notMarkup) em.cama.cacheReplace(em, 'K');
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
export {Emphase}