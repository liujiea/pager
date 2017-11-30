(function ( global, factory ) {
	typeof exports === "object" && typeof module !== "nudefined" ? module.exports = factory() : typeof define === "function" && define.amd ? define( factory ) : ( global.Pager = factory());
})(this, ( function(){
	var doT = require("./doT"),
        l_defaults = {
            containerSelector: null,
            id: null,
            msgTemplate: '<tr class="{{=it.cssClass}}"><td colspan="{{=it.colspan}}">{{=it.msg}}</td></tr>',
            itemSource: null,
            itemCompile: null,
            itemTemplate: null,
            it: null,
            attachData: !1,
            cssClass: {
                error: 'ui-tablecell-error',
                warning: "ui-tablecell-warning",
                info: "ui-tablecell-info"
            }
        }
    
    
	var listrender = function ( options ) {
		this.renderCompile = options;
		this._listrender_init();
	}
	listrender.prototype.__listrender_init = function() {
		if( this.renderCompile = $.extend(!0, {}, l_defaults, this.renderCompile ), this.renderCompile.containerSelector ) {
            this.renderCompile.containerSelector = $(this.renderCompile.containerSelector);
            !this.renderCompile.itemCompile && this.renderCompile.itemTemplate && ( this.renderCompile.itemCompile = doT.template( this.renderCompile.itemTemplate ) );
            this.renderCompile.msgTemplate && (this.renderCompile.msgTemplate = doT.template(this.renderCompile.msgTemplate ));
            var attachData = this.renderCompile.attaceData;
            attachData && "boolean" == typeof attachData && ( this.renderCompile.attachData = "info" );
        }
        this._idx = -1;
        this._pageSize = 0;
        this._pageNumber = 1;
	};


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
    Pager.prtotype.initUI = function () {
        this.initUI = 2 == this.cfg.compileType ? 
            function() {
                var compile = Pager.Compile2(this.cfg);
                this.pager.html( compile );
            } : 1 == this.cfg.compileType ?
            function() {
                this.pager.addClass("ucpager");
                var compile = Pager.Compile1( this.cfg );
                this.pager.append( compile );
            } : 
            function () {
                var compile = doT.template( this.cfg.compileTpl )( this.cfg );
                this.pager.html( compile );
            }
        this.initUI();
    }
    Pager.prototype.init = function() {
        function a( elem, c ) {
            "disabled" !== $( elem ).attr( "disabled" ) && b.GoTo( c );
        }
        if( 0 !== this.pager.length ) {
            this.initUI();
        } 
    }
}))
