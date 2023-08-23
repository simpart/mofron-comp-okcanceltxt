/**
 * @file mofron-comp-okcanceltxt/index.js
 * @brief ok-cancel text component for mofron
 * @license MIT
 */
const Text      = require('mofron-comp-text');
const HrzCenter = require('mofron-layout-hrzcenter');
const HrzPos    = require('mofron-effect-hrzpos');
const Click     = require('mofron-event-click');
const Comp      = mofron.class.Component;
const ConfArg   = mofron.class.ConfArg;
const comutl    = mofron.util.common;

module.exports = class extends Comp {
    /**
     * initialize component
     * 
     * @param (mixed) 
     *                key-value: component config
     * @short 
     * @type private
     */
    constructor (p1) {
        try {
            super();
            this.modname('OkCancelTxt');
            
	    /* init config */
            this.confmng().add('clickEvent', { type:'event', list:true });

	    if (0 < arguments.length) {
                this.config(p1);
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    initDomConts () {
        try {
	    super.initDomConts();
            this.layout(new HrzCenter(80));
            
            let click_evt = (c1,c2,c3) => {
                try {
                    let is_ok = true;
		    if (c3.ok().id() !== c1.id()) {
		        is_ok = false;
		    }
		    let evt = c3.clickEvent();
		    for (let eidx in evt) {
                        evt[eidx][0](c3, is_ok, evt[eidx][1]);
		    }
                } catch (e) {
                    console.error(e.stack);
                    throw e;
                }
            }
            
            /* text config */
            this.cancel().config({
                text:'Cancel', size:'0.26rem',
                effect:new HrzPos(),
                event: new Click(new ConfArg(click_evt,this))
            });
            this.ok().config({
                text:'OK', size:'0.26rem',
                effect:new HrzPos(), event: new Click(new ConfArg(click_evt,this)),
                style:{ 'text-decoration':'underline' }
            });
            
            let wrap = new Comp({ style:{display:'flex;'} });
            wrap.child([
                 new Comp({ width:'50%', child:this.cancel() }),
                 new Comp({ width:'50%', child:this.ok() }),
            ]);
	    this.child(wrap);
            
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }

    ok (prm, cnf) {
        try {
            if ('string' === typeof prm) {
                this.ok().text(prm);
                this.ok().config(cnf);
                return;
            }
            return this.innerComp('ok', prm, Text);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    cancel (prm, cnf) {
        try {
            if ('string' === typeof prm) {
                this.cancel().text(prm);
                this.cancel().config(cnf);
                return;
            }
            return this.innerComp('cancel', prm, Text);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    size (prm) {
        try {
            if (undefined === prm) {
                return this.ok().size();
            }
            this.ok().size(prm);
            this.cancel().size(prm);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    clickEvent (fnc,prm) {
        try {
	    if (undefined === fnc) {
	        return this.confmng('clickEvent');
	    }
	    this.confmng('clickEvent', [fnc,prm]);
	} catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
/* end of file */
