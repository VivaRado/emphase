import {Utils} from "./Utils.js";

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

						/////////////////////////////////////////
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
						/////////////////////////////////////////

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
			/////////////////////////////////////////
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
			/////////////////////////////////////////
		}
	}
	cacheReplace(em, cache) { 
		for (var v in em._cached[cache]) em.result = em.result.replace(v, em._cached[cache][v]) 
	}
};
export {CacheManager}