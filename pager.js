/*
* @Author: Marte
* @Date:   2017-09-30 11:24:45
* @Last Modified by:   Marte
* @Last Modified time: 2017-11-30 11:22:03
*/
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global.Pager = factory());
})(this, (function () {
    var compile1 = '<span class="fn-unselectable"> \n    <span> \n        {{?!it.noRecordCount}}\n        <span>共\n            <span class="" pager-record>{{=it.recordCount}}</span>\n            条记录</span>\n        {{?}}\n        <span style="padding-left:6px;">当前为第<span class="" pager-num>{{=it.pageNumber}}</span>{{?!it.noRecordCount}}/<span pager-count>{{=it.pageCount}}</span>{{?}}页</span> \n        <span style="padding-left:6px;"> \n            <select pager-select> \n            {{~it.pageSizeOptions :item:idx}} \n                <option value="{{=item}}"{{if(item===it.pageSize){}} selected="selected"{{}}}>{{=item}}</option> \n         {{~}}\n         </select>条记录 /页 \n        </span>\n    </span>\n    <span class="ucpager-links" style="padding-left:6px;" pager-btns>  \n        <a style="margin-right:5px;cursor:pointer;" pager-first pager-btn>首页</a>\n        <a style="margin-right:5px;cursor:pointer;" pager-prev pager-btn>上一页</a>\n        <a style="margin-right:5px;cursor:pointer;" pager-next pager-btn>下一页</a>\n        {{?!it.noRecordCount}}\n        <a style="margin-right:5px;cursor:pointer;" pager-last pager-btn>尾页</a>\n        {{?}}\n    </span>\n    <input type="text" style="width:22px;padding:0px 2px;margin-bottom:0px;" pager-input/>\n    <button class="ui-button ui-button-mini" style="padding: 2px 5px;height: 24px;line-height: 16px;outline: 0;" pager-go>Go</button>\n<span>';
    var compile2 = '<div class="ui-paging fn-unselectable"> \n{{? it.pageNumber==1}}\n   <span class="ui-paging-prev">\n       <i class="iconfont" title="左三角形">&#xf0d9;</i> 上一页\n   </span>\n{{??}}\n   <a class="ui-paging-prev fn-pointer" pager-prev>\n       <i class="iconfont" title="左三角形">&#xf0d9;</i> 上一页\n   </a>\n{{?}}\n{{? it.pageItemCount<1}}\n   <span class="ui-paging-ellipsis">...</span> \n{{??}}\n{{ \n       var afterCnt=parseInt((it.pageItemCount-1)/2);\n        var beforeCnt=it.pageItemCount-1-afterCnt;\n        var startNum=it.pageNumber-beforeCnt;\n     var endNum=it.pageNumber+afterCnt;\n\n      var hasStartEcl=(startNum>=2);  /* 起始... */\n       if(startNum<=1){  /* 把第一页除去 */\n            endNum=1-startNum+endNum;\n         startNum=2;\n           }\n     else if(startNum>=2){ \n            startNum+=1;\n            }\n           if(endNum<it.pageCount){  /*把最后一页除去*/\n               endNum-=1;\n      }\n           var hasEndEcl=(endNum<it.pageCount);  /* 终止... */\n           /*末尾多出，加到前面去*/\n        if(endNum>=it.pageCount){\n     }}\n        {{? hasStartEcl}}\n     {{\n            startNum-=(endNum-it.pageCount);\n          if(startNum<=2){\n              hasStartEcl=false;\n                startNum=2;\n               }\n             }}\n            {{?}}\n    {{\n         endNum=it.pageCount-1;\n            }\n         }} \n               {{?it.pageCount!=0}}\n                  <a class="ui-paging-item {{=(1==it.pageNumber?"ui-paging-current":"fn-pointer")}}" pager-item="{{=1}}">{{=1}}</a>\n                {{?}}\n{{? hasStartEcl}}\n<span class="ui-paging-ellipsis">...</span> \n{{?}}\n\n{{for(var i=startNum,len=endNum+1;i<len;i++){}}  \n<a class="ui-paging-item {{=(i==it.pageNumber?"ui-paging-current":"fn-pointer")}}" pager-item="{{=i}}">{{=i}}</a>\n {{}}}\n\n{{? hasEndEcl}}\n<span class="ui-paging-ellipsis">...</span> \n{{?}}\n{{?it.pageCount>1}}\n  <a class="ui-paging-item {{=(it.pageCount==it.pageNumber?"ui-paging-current":"fn-pointer")}}" pager-item="{{=it.pageCount}}">{{=it.pageCount}}</a> \n{{?}}\n{{?}}\n    {{? it.pageNumber>=it.pageCount}}\n       <span class="ui-paging-next">\n           下一页 <i class="iconfont" title="右三角形">&#xf0da;</i>\n       </span>\n{{??}}\n   <a class="ui-paging-next fn-pointer" pager-next>\n       下一页 <i class="iconfont" title="右三角形">&#xf0da;</i>\n   </a>\n{{?}}\n   <span class="ui-paging-info fn-pointer">\n       <span class="ui-paging-bold"><span pager-num>{{=it.pageNumber}}</span>/<span pager-count>{{=it.pageCount}}</span></span>页\n   </span>\n   <span class="ui-paging-which">\n       <input type="text" pager-input>\n   </span>\n   <a class="ui-paging-info ui-paging-goto fn-pointer" pager-go>跳转</a>\n</div> \n';
    var d = require("../doT/doT"),
        c = {
            containerSelector: null,
            id: null,
            colspan: 100,
            msgTemplate: '<tr class="{{=it.cssClass}}"><td colspan="{{=it.colspan}}">{{=it.msg}}</td></tr>',
            itemSource: null,
            itemCompile: null,
            itemTemplate: null,
            it: null,
            attachData: !1,
            cssClass: {
                error: "ui-tablecell-error",
                warning: "ui-tablecell-warning",
                info: "ui-tablecell-info"
            }
        },
    listrender = function (a) {
        this.renderCompile = a,
        this._listrender_init();
    };
    listrender.prototype._listrender_init = function () {
        if (this.renderCompile = $.extend(!0, {},
        c, this.renderCompile), this.renderCompile.containerSelector) {
            this.renderCompile.containerSelector = $(this.renderCompile.containerSelector),
            !this.renderCompile.itemCompile && this.renderCompile.itemTemplate && (this.renderCompile.itemCompile = d.template(this.renderCompile.itemTemplate)),
            this.renderCompile.msgTemplate && (this.renderCompile.msgTemplate = d.template(this.renderCompile.msgTemplate));
            var a = this.renderCompile.attachData;
            a && "boolean" == typeof a && (this.renderCompile.attachData = "info")
        }
        this._idx = -1,
        this._pageSize = 0,
        this._pageNumber = 1
    };
    listrender.prototype.showTip = function (a, b) {
        this._idx = -1;
        var c = this.renderCompile;
        if (c.containerSelector && c.msgTemplate) {
            var d = c.msgTemplate({
                cssClass: c.cssClass[b],
                colspan: c.colspan,
                msg: a
            },
            c.it);
            c.containerSelector.html(""),
            this.tipTr = $(d).appendTo(c.containerSelector)
        }
    };
    listrender.prototype._removeTip = function () {
        return this.tipTr ? (this.tipTr.remove(), this.tipTr = null, !0) : !1
    };
    listrender.prototype.render = function (a) {
        var b = this.renderCompile;
        if (b.containerSelector) {
            if (null == a || 0 === a.length) return this.showTip("没有数据", "warning"),
            void 0;
            if (b.itemCompile) {
                b.containerSelector.html("");
                for (var c = b.attachData,
                d = [], e = document.createDocumentFragment(), f = 0, g = a.length; g > f; f++) {
                    var h = this.renderItem(a[f], null, f, !0);
                    if (c) {
                        var i = $(h);
                        i.data(c, a[f]),
                        i.appendTo(e)
                    } else d.push(h)
                }
                this._idx = g - 1,
                c ? b.containerSelector.append(e) : b.containerSelector.append(d.join(""))
            }
        }
    };
    listrender.prototype._itemResult = function (a, b) {
        return a._no || (null == b && (this._idx++, b = this._idx), a._no = (this._pageNumber - 1) * this._pageSize + b + 1),
        this.renderCompile.itemSource && (a = this.renderCompile.itemSource.call(this, a, b, a._no, this._pageNumber)),
        a
    };
    listrender.prototype.renderItem = function (a, b, c, d) {
        var e = this.renderCompile;
        if (a = this._itemResult(a, c), this._removeTip(), e.itemCompile) {
            var f = e.itemCompile(a, e.it);
            if (f = f.replace(/(^\s*)/g, ""), d) return f;
            var g = $(f),
            h = e.attachData;
            return h && g.data(h, a),
            b ? b.replaceWith(g) : g.appendTo(e.containerSelector),
            g
        }
        return null
    };
    listrender.prototype.AddItem = function (a) {
        return this.renderItem(a)
    };
    listrender.prototype._RefreshAddItems = function (a, b, c) {
        var d = {},
        e = this,
        f = 0;
        if (null == b && (b = this.renderCompile.id, !b)) throw new Error("_RefreshAddItems(newDataList),配置项renderCompile.id需设值");
        for (var g = 0,
        h = a.length; h > g; g++) d[a[g][b]] = a[g];
        var i = this.renderCompile.attachData;
        if (!i) throw new Error("_RefreshAddItems(newDataList,_keyName),配置项renderCompile.attachData需设为true");
        if (this.renderCompile.containerSelector.children().each(function () {
            var a = $(this),
            c = a.data(i),
            g = c[b],
            h = d[g];
            h && (f++, $.extend(!0, c, h), e.renderItem(c, a), delete d[g] || (d[g] = void 0))
        }), c) return f;
        if (f < a.length) for (var j in d) {
            var k = d[j];
            k && (f++, e.AddItem(k))
        }
        return f
    };
    listrender.prototype.RefreshAddItems = function (a, b) {
        return this._RefreshAddItems(a, b)
    };
    listrender.prototype.RefreshItems = function (a, b) {
        this._RefreshAddItems(a, b, !0)
    };
    listrender.prototype.RefreshAddItem = function (a, b) {
        var c = this.RefreshItem(a, b);
        return null == c && (c = this.AddItem(a)),
        c
    };
    listrender.prototype.GetItem = function (a, b) {
        if (null == b && (b = this.renderCompile.id, !b)) throw new Error("ListRender.GetItem(itemData)时,配置项renderCompile.id需设值");
        var c = a[b],
        d = this.renderCompile.attachData,
        e = null;
        if (!d) throw new Error("ListRender.GetItem(newData)时,配置项renderCompile.attachData需设为true");
        return this.renderCompile.containerSelector.children().each(function () {
            var a = $(this),
            f = a.data(d),
            g = f[b];
            return g == c ? (e = a, !1) : void 0
        }),
        e
    };
    listrender.prototype.RefreshItem = function (a, b) {
        var c = b;
        if ((null == b || "string" == typeof b) && (c = this.GetItem(a, b)), c) {
            var d = c.data(this.renderCompile.attachData);
            return d && ($.extend(!0, d, a), a = d),
            this.renderItem(a, c)
        }
        return null
    };
    listrender.setDefault = function (a) {
        $.extend(!0, c, a)
    };
    var f = function (a) {
        this.cfg = {},
        this.cfg = 2 === arguments.length ? $.extend(!0, {},
        h, arguments[1]) : $.extend(!0, {},
        h, {
            action: arguments[1],
            renderCallback: arguments[2]
        }),
        this.renderCompile = this.cfg.renderCompile,
        this._listrender_init(),
        this.pager = $(a),
        this.init(),
        this.cfg.initLazy || this.GoTo(this.cfg.pageNumber, !0)
    },
    g = listrender;
    f.prototype = new g,
    f.prototype.constructor = g,
    f.prototype.ChangeSource = function (a) {
        $.extend(this.cfg, {
            pageCount: 0,
            pageNumber: 1
        },
        a),
        this.GoTo(this.cfg.pageNumber, !0)
    },
    f.prototype.RefreshData = function (a, b) {
        return 0 === arguments.length ? (this.GoTo(this.cfg.pageNumber, !0), void 0) : (this.GoTo(a, b), void 0)
    },
    f.prototype.initUI = function () {
        this.initUI = 2 == this.cfg.compileType ?
        function () {
            var a = f.Compile2(this.cfg);
            this.pager.html(a)
        } : 1 == this.cfg.compileType ?
        function () {
            this.pager.addClass("ucpager");
            var a = f.Compile1(this.cfg);
            this.pager.append(a)
        } : function () {
            var a = d.template(this.cfg.compileTpl)(this.cfg);
            this.pager.html(a)
        },
        this.initUI()
    },
    f.prototype.init = function () {
        function a(a, c) {
            "disabled" !== $(a).attr("disabled") && b.GoTo(c)
        }
        if (0 !== this.pager.length) {
            this.initUI();
            var b = this,
            c = b.cfg;
            this.pager.on("change", "[pager-select]",
            function () {
                var a = $(this).children(":selected");
                a.length > 0 && (c.pageSize = parseInt(a.val(), 10)),
                b.GoTo(1)
            }).on("click", "[pager-first]",
            function () {
                a(this, 1)
            }).on("click", "[pager-prev]",
            function () {
                a(this, c.pageNumber - 1)
            }).on("click", "[pager-next]",
            function () {
                a(this, c.pageNumber + 1)
            }).on("click", "[pager-last]",
            function () {
                a(this, c.pageCount)
            }).on("click", "[pager-item]",
            function () {
                var b = parseInt($(this).attr("pager-item"), 10);
                a(this, b)
            }).on("click", "[pager-go]",
            function () {
                var a = b.pager.find("[pager-input]"),
                d = a.val();
                d = parseInt(d, 10),
                isNaN(d) ? a.val(c.pageNumber) : b.GoTo(d)
            })
        }
    },
    f.prototype.changeState = function () {
        return this.changeState = 1 == this.cfg.compileType ?
        function () {
            this.pager.find("[pager-input]").val(this.cfg.pageNumber),
            this.pager.find("[pager-num]").text(this.cfg.pageNumber),
            this.pager.find("[pager-record]").text(this.cfg.recordCount),
            this.pager.find("[pager-count]").text(this.cfg.pageCount),
            this.pager.find("[pager-btns]").find("[pager-btn]").removeAttr("disabled"),
            this.cfg.pageNumber <= 1 && (this.pager.find("[pager-first]").attr("disabled", "disabled"), this.pager.find("[pager-prev]").attr("disabled", "disabled")),
            this.cfg.pageNumber >= this.cfg.pageCount && (this.pager.find("[pager-last]").attr("disabled", "disabled"), this.pager.find("[pager-next]").attr("disabled", "disabled"))
        } : function () {
            this.initUI()
        },
        this.changeState()
    },
    f.prototype.GoTo = function (a, b) {
        var c = this,
        d = this.cfg;
        if (d.noRecordCount || b || !(1 > a || a > d.pageCount)) {
            var e = c.pager.find("[pager-size]:eq(0)").children(":selected");
            e.length > 0 && (d.pageSize = parseInt(e.val(), 10)),
            this.gopage = a;
            var f = this.getRequest();
            d.beforeCallback && d.beforeCallback.call(this, f),
            this.showTip("正在请求数据...", "info"),
            $.ajax(d.requestUrl, {
                type: "POST",
                dataType: d.jsonp ? "jsonp" : "json",
                data: f,
                success: function (a, b) {
                    c.ajaxSuccess(a, b, this, f)
                },
                error: function () {
                    c.ajaxError("请求数据出错", "error", this)
                },
                complete: function (a, b) {
                    d.afterCallback && d.afterCallback.call(c, a, b),
                    c.changeState()
                }
            })
        } else c.changeState()
    },
    f.prototype.ajaxError = function (a, b, c) {
        var d = this.cfg;
        d.errorCallback ? d.errorCallback.call(this, a, b, c) : d.renderCompile && d.renderCompile.containerSelector ? this.showTip(a, "error") : this.showTip(a, "error");
    },
    f.prototype.result = function (a) {
        var b = {};
        return a.ResultCode ? (b.error = a.ResultCode, b.data = a.ResultText) : a.ERROR ? (b.error = a.ERROR.ERR_CODE, b.data = a.ERROR.ERR_MSG) : (b.error = !1, a.Content.DATA && (b.data = a.Content.DATA || [], b.count = a.Content.TOTAL), a.ROOT && (b.data = a.ROOT.ITEMS || [], b.count = a.ROOT.TOTAL)),
        b;
    },
    f.prototype.ajaxSuccess = function (a, b, c, d) {
        var e = this.cfg,

        f = this.result(a);
        if (f.error) return this.ajaxError(f.data, "success", c),
        void 0;
        var g = f.data;
        if (e.noRecordCount) g.length < e.pageSize ? (e.recordCount = (this.gopage - 1) * e.pageSize + g.length, e.pageCount = this.gopage) : (e.recordCount = this.gopage * e.pageSize + 1, e.pageCount = this.gopage + 1);
        else {
            var h = f.count;
            e.recordCount = h,
            e.pageCount = Math.ceil(h / e.pageSize)
        }
        e.pageNumber = this.gopage,
        this._pageSize = e.pageSize,
        this._pageNumber = this.gopage,
        this.render(g, f, this.gopage),
        null != e.renderCallback && e.renderCallback.call(this, g, this.gopage, e.pageSize, d, a)
    },
    f.prototype.getRequest = function () {
        var a, b = this.cfg,
        c = b.requestData,
        d = ["pageindex", "pagenum", "pagesize", "action", "__page_request_id"];
        if ("function" == typeof c) a = b.requestData(this, this.gopage, b.pageSize, b.action);
        else {
            a = {},
            d = [c.pageindex || d[0], c.pagenum || d[1], c.pagesize || d[2], c.action || d[3] || d[4]];
            for (var e in c) if (e) {
                var f = c[e];
                switch (e) {
                    case "pageindex":
                    case "pagenum":
                    case "pagesize":
                    case "action":
                    case "__page_request_id":
                        break;
                    default:
                        a[e] = f
                }
            }
        }
        return null == a[i.pageindex] && (a[i.pageindex] = this.gopage),
        null == a[i.pagenum] && (a[i.pagenum] = this.gopage),
        null == a[i.pagesize] && (a[i.pagesize] = b.pageSize),
        null == a[i.action] && (a[i.action] = b.action),
        null == a[i.noRecordCount] && (a[i.noRecordCount] = b.noRecordCount ? 1 : 0),
        null == a[i.__page_request_id] && (a[i.__page_request_id] = (new Date()).getTime()),
        //null == a.t && (a.t),//应用于webpack + MVC5时，需要注释掉   2017.11.7
        a
    };
    var h = {
        //action: "", //应用于webpack + MVC5时，需要注释掉   2017.11.7
        requestUrl: "Handler/Pager.ashx",
        renderCallback: null,
        jsonp: !1,
        initLazy: !1,
        noRecordCount: !1,
        beforeCallback: null,
        afterCallback: null,
        errorCallback: null,
        recordCount: 0,
        pageCount: 0,
        pageNumber: 1,
        compileType: 1,
        compileTpl: null,
        pageItemCount: 5,
        pageSizeOptions: [10, 50, 100],
        pageSize: 10,
        requestData: {
            //t: "pager"  //应用于webpack + MVC5时，需要注释掉   2017.11.7
        }
    },
    i = {
        action: "action",
        pageindex: "pageindex",
        pagenum: "pagenum",
        pagesize: "pagesize",
        noRecordCount: "noRecordCount",
        __page_request_id: "__page_request_id"
    };
    f.setDefaultRequestKey = function (a) {
        $.extend(i, a)
    };
    f.setDefault = function (a) {
        a.renderCompile && (g.setDefault(a.renderCompile), delete a.renderCompile),
        $.extend(!0, h, a)
    };
    f.Compile1 = function (b) {
        var c = compile1;
        return f.Compile1 = d.template(c),
        f.Compile1(b)
    };
    f.Compile2 = function (b) {
        var c = compile2;
        return f.Compile2 = d.template(c),
        f.Compile2(b)
    }

    f.ListRender = g;

    return f;
}))


//////////////////
// WEBPACK FOOTER
// ./app/Pager/pager.js
// module id = 10
// module chunks = 0
