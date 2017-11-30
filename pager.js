(function ( global, factory ) {
	typeof exports === "object" && typeof module !== "nudefined" ? module.exports = factory() : typeof define === "function" && define.amd ? define( factory ) : ( global.Pager = factory());
})(this, ( function(){
	
	var listrender = function ( options ) {
		this.renderCompile = options;
		this._listrender_init();
	}
	


	var Pager = function( elem ) {
		this.cfg = {};
		this.cfg = 2 === arguments.length ? $.extend( !0, {}, defaults, arguments[1]) : $.extend( !0, {}, defaults, {
			action: arguments[1],
			renderCallback: arguments[2]
		});
		this.renderCompile = this.cfg.renderCompile;
		this._listrender_init();
		this.pager = $( elem );
		this.init();
		this.cfg.initLazy || this.GoTo( this.cfg.pageNumber, !0 )
	},
	listrender = listrender;
	Pager.prototype = new listrender;
	Pager.prototype.construcotr = listrender;
	Pager.prototype.ChangeSource = function ( options ) {
		$.extend( this.cfg, {
			pageCount: 0,
			pageNumber: 1
		}, options );
		this.GoTo( this.cfg.pageNumber, !0 );
	}
}))
