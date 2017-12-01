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
        function GoPage( elem, number, THIS ) {
            "disabled" !== $( elem ).attr( "disabled" ) && THIS.GoTo( number );
        }
        if( 0 !== this.pager.length ) {
            this.initUI();
	    	var This = this, ThisCfg = This.cfg;
	    	this.pager.on("change", "[pager-select]", function(){
				var option = $(this).children(":selected");
				option.lenght > 0 && (ThisCfg.pageSize = parseInt(option.val(), 10 ));
				This.GoTo(1);
			}).on("click", "[pager-first]", function(){
				GoPage(this, 1, This);
			}).on("click", "[pager-prev]", function(){
				GoPage(this, ThisCfg.pageNumber - 1, This )
			}).on("click", "[pager-last]", function(){
				GoPage(this, ThisCfg.pageCount, This )
			}).on("click", "[pager-item]", function() {
				var option = parseInt($(this).attr("pager-item"), 10 );
				GoPage( this, option, This );
			}).on("click", "[pager-go]", function(){
				var input = This.pager.find("pager-input"), inputVal = parseInt(input.val(), 10);
				isNaN( inputVal ) ? This.val( ThisCfg.pageNumber ) : This.GoTo( inputVal );
			})
        } 
    }
	Pager.prototype.GoTo = function( num, bool ) {
		var This = this, thisCfg = this.cfg;
		if( thisCfg.noRecordCount || bool || !(1 > num || num > thisCfg.pageCount ) ) {
			var pagerSize = This.pager.find("[pager-size]:eq(0)").children(":selected");
			pagerSize.length > 0 && (thisCfg.pageSize = parseInt(pagerSize.val(), 10));
			this.gopage = a;
			var getRequest = this.getRequest();
			
		}
	}
    Pager.prototype.getRequest = function() {
		var a, thisCfg = this.cfg, requestData = thisCfg.requestData, requestName = ["pageindex", "pagenum", "pagesize", "action"];
		if("function" == typeof requestData) {
			a = thisCfg.requestData(this, this.gopage, thisCfg.pageSize, thisCfg.action )
		}else {
			a = {}
			requestName = [requestData.pageindex || requestName[0], requestData.pagenum || requestName[1], requestData.pagesize || requestName[2], requestData.action || requestName[3] ];
			for( var item in requestData ) {
				if( item ) {
					var f = requestData[ item ];
					switch ( item ) {
						case "pageindex":
						case "pagenum":
						case "pagesize":
						case "action":
							break;
						default:
							a[ item ] = f;
					}
				}
			}
		}
	}
}))
