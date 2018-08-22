(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common/http'), require('rxjs'), require('rxjs/operators'), require('marked'), require('@angular/common'), require('prismjs')) :
    typeof define === 'function' && define.amd ? define('ngx-md', ['exports', '@angular/core', '@angular/common/http', 'rxjs', 'rxjs/operators', 'marked', '@angular/common', 'prismjs'], factory) :
    (factory((global['ngx-md'] = {}),global.ng.core,global.ng.common.http,global.rxjs,global.rxjs.operators,null,global.ng.common,null));
}(this, (function (exports,i0,i1,rxjs,operators,marked,common,Prism) { 'use strict';

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var NgxMdService = (function () {
        function NgxMdService(_http) {
            this._http = _http;
            this._renderer = new marked.Renderer();
            this.extendRenderer();
            this.setMarkedOptions({});
        }
        // get the content from remote resource
        /**
         * @param {?} path
         * @return {?}
         */
        NgxMdService.prototype.getContent = /**
         * @param {?} path
         * @return {?}
         */
            function (path) {
                return this._http.get(path, { responseType: 'text' }).pipe(operators.map(function (res) { return res; }), operators.catchError(this.handleError));
            };
        Object.defineProperty(NgxMdService.prototype, "renderer", {
            get: /**
             * @return {?}
             */ function () {
                return this._renderer;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @param {?} res
         * @return {?}
         */
        NgxMdService.prototype.extractData = /**
         * @param {?} res
         * @return {?}
         */
            function (res) {
                return res.text() || '';
            };
        /**
         * @param {?} options
         * @return {?}
         */
        NgxMdService.prototype.setMarkedOptions = /**
         * @param {?} options
         * @return {?}
         */
            function (options) {
                options = Object.assign({
                    gfm: true,
                    tables: true,
                    breaks: false,
                    pedantic: false,
                    sanitize: false,
                    smartLists: true,
                    smartypants: false
                }, options);
                options.renderer = this._renderer;
                marked.setOptions(options);
            };
        /**
         * @param {?} data
         * @return {?}
         */
        NgxMdService.prototype.compile = /**
         * @param {?} data
         * @return {?}
         */
            function (data) {
                return marked.parse(data);
            };
        /**
         * @param {?} error
         * @return {?}
         */
        NgxMdService.prototype.handleError = /**
         * @param {?} error
         * @return {?}
         */
            function (error) {
                /** @type {?} */
                var errMsg;
                if (error instanceof fetch) {
                    /** @type {?} */
                    var body = error.json() || '';
                    /** @type {?} */
                    var err = body.error || JSON.stringify(body);
                    errMsg = error.status + " - " + (error.statusText || '') + " " + err;
                }
                else {
                    errMsg = error.message ? error.message : error.toString();
                }
                return rxjs.throwError(errMsg);
            };
        /**
         * @return {?}
         */
        NgxMdService.prototype.extendRenderer = /**
         * @return {?}
         */
            function () {
                this._renderer.listitem = function (text) {
                    if (/^\s*\[[x ]\]\s*/.test(text)) {
                        text = text
                            .replace(/^\s*\[ \]\s*/, '<input type="checkbox" style=" vertical-align: middle; margin: 0 0.2em 0.25em -1.6em; font-size: 16px; " disabled> ')
                            .replace(/^\s*\[x\]\s*/, '<input type="checkbox" style=" vertical-align: middle; margin: 0 0.2em 0.25em -1.6em; font-size: 16px; " checked disabled> ');
                        return '<li style="list-style: none">' + text + '</li>';
                    }
                    else {
                        return '<li>' + text + '</li>';
                    }
                };
            };
        NgxMdService.decorators = [
            { type: i0.Injectable, args: [{
                        providedIn: 'root'
                    },] },
        ];
        /** @nocollapse */
        NgxMdService.ctorParameters = function () {
            return [
                { type: i1.HttpClient }
            ];
        };
        /** @nocollapse */ NgxMdService.ngInjectableDef = i0.defineInjectable({ factory: function NgxMdService_Factory() { return new NgxMdService(i0.inject(i1.HttpClient)); }, token: NgxMdService, providedIn: "root" });
        return NgxMdService;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var NgxMdComponent = (function () {
        function NgxMdComponent(_mdService, _el, platformId) {
            this._mdService = _mdService;
            this._el = _el;
            this.platformId = platformId;
            this.changeLog = [];
        }
        Object.defineProperty(NgxMdComponent.prototype, "path", {
            set: /**
             * @param {?} value
             * @return {?}
             */ function (value) {
                if (value) {
                    this._path = value;
                    this.onPathChange();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NgxMdComponent.prototype, "data", {
            set: /**
             * @param {?} value
             * @return {?}
             */ function (value) {
                if (value) {
                    this._data = value;
                    this.onDataChange(value);
                }
            },
            enumerable: true,
            configurable: true
        });
        // on input
        /**
         * @param {?} data
         * @return {?}
         */
        NgxMdComponent.prototype.onDataChange = /**
         * @param {?} data
         * @return {?}
         */
            function (data) {
                if (data) {
                    this._el.nativeElement.innerHTML = this._mdService.compile(data);
                }
                else {
                    this._el.nativeElement.innerHTML = '';
                }
                this.highlightContent(false);
            };
        /**
         *  After view init
         */
        /**
         *  After view init
         * @return {?}
         */
        NgxMdComponent.prototype.ngAfterViewInit = /**
         *  After view init
         * @return {?}
         */
            function () {
                if (this._path) {
                    this.onPathChange();
                }
                else if (!this._data) {
                    this.processRaw();
                }
            };
        /**
         * @return {?}
         */
        NgxMdComponent.prototype.processRaw = /**
         * @return {?}
         */
            function () {
                this._md = this.prepare(decodeHtml(this._el.nativeElement.innerHTML));
                this._el.nativeElement.innerHTML = this._mdService.compile(this._md);
                this.highlightContent(false);
            };
        /**
         * get remote conent;
         */
        /**
         * get remote conent;
         * @return {?}
         */
        NgxMdComponent.prototype.onPathChange = /**
         * get remote conent;
         * @return {?}
         */
            function () {
                var _this = this;
                this._ext = this._path && this._path.split('.').splice(-1).join();
                this._mdService.getContent(this._path)
                    .subscribe(function (data) {
                    _this._md = _this._ext !== 'md' ? '```' + _this._ext + '\n' + data + '\n```' : data;
                    _this._el.nativeElement.innerHTML = _this._mdService.compile(_this.prepare(_this._md));
                    _this.highlightContent(false);
                }, function (err) { return _this.handleError; });
            };
        /**
         * catch http error
         * @param {?} error
         * @return {?}
         */
        NgxMdComponent.prototype.handleError = /**
         * catch http error
         * @param {?} error
         * @return {?}
         */
            function (error) {
                console.error('An error occurred', error); // for demo purposes only
                return Promise.reject(error.message || error);
            };
        /**
         * Prepare string
         */
        /**
         * Prepare string
         * @param {?} raw
         * @return {?}
         */
        NgxMdComponent.prototype.prepare = /**
         * Prepare string
         * @param {?} raw
         * @return {?}
         */
            function (raw) {
                var _this = this;
                if (!raw) {
                    return '';
                }
                if (this._ext === 'md' || !this.path) {
                    /** @type {?} */
                    var isCodeBlock_1 = false;
                    return raw.split('\n').map(function (line) {
                        if (_this.trimLeft(line).substring(0, 3) === '```') {
                            isCodeBlock_1 = !isCodeBlock_1;
                        }
                        return isCodeBlock_1 ? line : line.trim();
                    }).join('\n');
                }
                return raw.replace(/\"/g, '\'');
            };
        /**
         * Trim left whitespace
         * @param {?} line
         * @return {?}
         */
        NgxMdComponent.prototype.trimLeft = /**
         * Trim left whitespace
         * @param {?} line
         * @return {?}
         */
            function (line) {
                return line.replace(/^\s+|\s+$/g, '');
            };
        /**
         * Use Prism to highlight code snippets only on the browser
         * @param {?} async
         * @return {?}
         */
        NgxMdComponent.prototype.highlightContent = /**
         * Use Prism to highlight code snippets only on the browser
         * @param {?} async
         * @return {?}
         */
            function (async) {
                if (common.isPlatformBrowser(this.platformId)) {
                    Prism.highlightAll(async);
                }
            };
        NgxMdComponent.decorators = [
            { type: i0.Component, args: [{
                        selector: 'markdown,[Markdown],ngx-md,[NgxMd]',
                        template: '<ng-content></ng-content>',
                        styles: [
                            ".token.operator, .token.entity, .token.url, .language-css .token.string, .style .token.string {\n            background: none;\n        }"
                        ]
                    },] },
        ];
        /** @nocollapse */
        NgxMdComponent.ctorParameters = function () {
            return [
                { type: NgxMdService },
                { type: i0.ElementRef },
                { type: String, decorators: [{ type: i0.Inject, args: [i0.PLATFORM_ID,] }] }
            ];
        };
        NgxMdComponent.propDecorators = {
            path: [{ type: i0.Input }],
            data: [{ type: i0.Input }]
        };
        return NgxMdComponent;
    }());
    /**
     * @param {?} html
     * @return {?}
     */
    function decodeHtml(html) {
        /** @type {?} */
        var txt = document.createElement('textarea');
        txt.innerHTML = html;
        return txt.value;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var NgxMdConfig = (function () {
        function NgxMdConfig() {
        }
        NgxMdConfig.decorators = [
            { type: i0.Injectable },
        ];
        return NgxMdConfig;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var NgxMdModule = (function () {
        function NgxMdModule() {
        }
        /**
         * @return {?}
         */
        NgxMdModule.forRoot = /**
         * @return {?}
         */
            function () {
                return {
                    ngModule: NgxMdModule,
                    providers: [NgxMdConfig]
                };
            };
        NgxMdModule.decorators = [
            { type: i0.NgModule, args: [{
                        declarations: [NgxMdComponent],
                        providers: [NgxMdService],
                        exports: [NgxMdComponent],
                    },] },
        ];
        return NgxMdModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */

    exports.NgxMdService = NgxMdService;
    exports.NgxMdComponent = NgxMdComponent;
    exports.NgxMdModule = NgxMdModule;
    exports.ɵa = NgxMdConfig;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LW1kLnVtZC5qcy5tYXAiLCJzb3VyY2VzIjpbIm5nOi8vbmd4LW1kL2xpYi9uZ3gtbWQuc2VydmljZS50cyIsIm5nOi8vbmd4LW1kL2xpYi9uZ3gtbWQuY29tcG9uZW50LnRzIiwibmc6Ly9uZ3gtbWQvbGliL25neC1tZC5jb25maWcudHMiLCJuZzovL25neC1tZC9saWIvbmd4LW1kLm1vZHVsZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSdcclxuaW1wb3J0IHsgSHR0cENsaWVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcclxuaW1wb3J0IHsgdGhyb3dFcnJvciwgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnXHJcbmltcG9ydCB7IG1hcCwgY2F0Y2hFcnJvciB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuaW1wb3J0IHsgUmVuZGVyZXIsIHNldE9wdGlvbnMsIHBhcnNlIH0gZnJvbSAnbWFya2VkJztcclxuXHJcbkBJbmplY3RhYmxlKHtcclxuICBwcm92aWRlZEluOiAncm9vdCdcclxufSlcclxuZXhwb3J0IGNsYXNzIE5neE1kU2VydmljZSB7XHJcbiAgcHJpdmF0ZSBfcmVuZGVyZXI6IGFueSA9IG5ldyBSZW5kZXJlcigpO1xyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX2h0dHA6IEh0dHBDbGllbnQpIHtcclxuICAgIHRoaXMuZXh0ZW5kUmVuZGVyZXIoKTtcclxuICAgIHRoaXMuc2V0TWFya2VkT3B0aW9ucyh7fSk7XHJcbiAgfVxyXG5cclxuICAvLyBnZXQgdGhlIGNvbnRlbnQgZnJvbSByZW1vdGUgcmVzb3VyY2VcclxuICBnZXRDb250ZW50KHBhdGg6IHN0cmluZyk6IE9ic2VydmFibGU8YW55PiB7XHJcbiAgICAgIHJldHVybiB0aGlzLl9odHRwLmdldChwYXRoLCB7cmVzcG9uc2VUeXBlOiAndGV4dCd9KS5waXBlKG1hcChyZXMgPT4gcmVzKSwgY2F0Y2hFcnJvcih0aGlzLmhhbmRsZUVycm9yKSlcclxuICB9XHJcblxyXG4gICBwdWJsaWMgZ2V0IHJlbmRlcmVyKCkge1xyXG4gICAgIHJldHVybiB0aGlzLl9yZW5kZXJlcjtcclxuICAgfVxyXG5cclxuICAgLy8gaGFuZGxlIGRhdGFcclxuICAgcHVibGljIGV4dHJhY3REYXRhKHJlczogYW55KTogc3RyaW5nIHtcclxuICAgICByZXR1cm4gcmVzLnRleHQoKSB8fCAnJztcclxuICAgfVxyXG5cclxuICAgcHVibGljIHNldE1hcmtlZE9wdGlvbnMob3B0aW9uczogYW55KSB7XHJcbiAgICAgb3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oe1xyXG4gICAgICAgZ2ZtOiB0cnVlLFxyXG4gICAgICAgdGFibGVzOiB0cnVlLFxyXG4gICAgICAgYnJlYWtzOiBmYWxzZSxcclxuICAgICAgIHBlZGFudGljOiBmYWxzZSxcclxuICAgICAgIHNhbml0aXplOiBmYWxzZSxcclxuICAgICAgIHNtYXJ0TGlzdHM6IHRydWUsXHJcbiAgICAgICBzbWFydHlwYW50czogZmFsc2VcclxuICAgICB9LCBvcHRpb25zKTtcclxuICAgICBvcHRpb25zLnJlbmRlcmVyID0gdGhpcy5fcmVuZGVyZXI7XHJcbiAgICAgc2V0T3B0aW9ucyhvcHRpb25zKTtcclxuICAgfVxyXG5cclxuICAgLy8gY29tcGxlIG1hcmtkb3duIHRvIGh0bWxcclxuICAgcHVibGljIGNvbXBpbGUoZGF0YTogc3RyaW5nKSB7XHJcbiAgICAgIHJldHVybiBwYXJzZShkYXRhKTtcclxuICAgfVxyXG5cclxuICAgLy8gaGFuZGxlIGVycm9yXHJcbiAgIHByaXZhdGUgaGFuZGxlRXJyb3IoZXJyb3I6IGFueSk6IGFueSB7XHJcbiAgICAgbGV0IGVyck1zZzogc3RyaW5nO1xyXG4gICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIGZldGNoKSB7XHJcbiAgICAgICBjb25zdCBib2R5ID0gZXJyb3IuanNvbigpIHx8ICcnO1xyXG4gICAgICAgY29uc3QgZXJyID0gYm9keS5lcnJvciB8fCBKU09OLnN0cmluZ2lmeShib2R5KTtcclxuICAgICAgIGVyck1zZyA9IGAke2Vycm9yLnN0YXR1c30gLSAke2Vycm9yLnN0YXR1c1RleHQgfHwgJyd9ICR7ZXJyfWA7XHJcbiAgICAgfSBlbHNlIHtcclxuICAgICAgIGVyck1zZyA9IGVycm9yLm1lc3NhZ2UgPyBlcnJvci5tZXNzYWdlIDogZXJyb3IudG9TdHJpbmcoKTtcclxuICAgICB9XHJcbiAgICAgcmV0dXJuIHRocm93RXJyb3IoZXJyTXNnKTtcclxuICAgfVxyXG5cclxuICAgLy8gZXh0ZW5kIG1hcmtlZCByZW5kZXIgdG8gc3VwcG9ydCB0b2RvIGNoZWNrYm94XHJcbiAgIHByaXZhdGUgZXh0ZW5kUmVuZGVyZXIoKSB7XHJcbiAgICAgdGhpcy5fcmVuZGVyZXIubGlzdGl0ZW0gPSBmdW5jdGlvbih0ZXh0OiBzdHJpbmcpIHtcclxuICAgICAgaWYgKC9eXFxzKlxcW1t4IF1cXF1cXHMqLy50ZXN0KHRleHQpKSB7XHJcbiAgICAgIHRleHQgPSB0ZXh0XHJcbiAgICAgICAgLnJlcGxhY2UoL15cXHMqXFxbIFxcXVxccyovLCAnPGlucHV0IHR5cGU9XCJjaGVja2JveFwiIHN0eWxlPVwiIHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7IG1hcmdpbjogMCAwLjJlbSAwLjI1ZW0gLTEuNmVtOyBmb250LXNpemU6IDE2cHg7IFwiIGRpc2FibGVkPiAnKVxyXG4gICAgICAgIC5yZXBsYWNlKC9eXFxzKlxcW3hcXF1cXHMqLywgJzxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiBzdHlsZT1cIiB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlOyBtYXJnaW46IDAgMC4yZW0gMC4yNWVtIC0xLjZlbTsgZm9udC1zaXplOiAxNnB4OyBcIiBjaGVja2VkIGRpc2FibGVkPiAnKTtcclxuICAgICAgICAgIHJldHVybiAnPGxpIHN0eWxlPVwibGlzdC1zdHlsZTogbm9uZVwiPicgKyB0ZXh0ICsgJzwvbGk+JztcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgcmV0dXJuICc8bGk+JyArIHRleHQgKyAnPC9saT4nO1xyXG4gICAgICAgIH1cclxuICAgICAgfTtcclxuICAgfVxyXG59XHJcbiIsIlxyXG5pbXBvcnQgeyBDb21wb25lbnQsIEVsZW1lbnRSZWYsIE9uSW5pdCwgQWZ0ZXJWaWV3SW5pdCwgSW5wdXQsIFBMQVRGT1JNX0lELCBJbmplY3QgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgTmd4TWRTZXJ2aWNlIH0gZnJvbSAnLi9uZ3gtbWQuc2VydmljZSc7XHJcbmltcG9ydCB7IGlzUGxhdGZvcm1Ccm93c2VyIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuaW1wb3J0ICogYXMgUHJpc20gZnJvbSAncHJpc21qcyc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiAnbWFya2Rvd24sW01hcmtkb3duXSxuZ3gtbWQsW05neE1kXScsXHJcbiAgICB0ZW1wbGF0ZTogJzxuZy1jb250ZW50PjwvbmctY29udGVudD4nLFxyXG4gICAgc3R5bGVzOiBbXHJcbiAgICAgICAgYC50b2tlbi5vcGVyYXRvciwgLnRva2VuLmVudGl0eSwgLnRva2VuLnVybCwgLmxhbmd1YWdlLWNzcyAudG9rZW4uc3RyaW5nLCAuc3R5bGUgLnRva2VuLnN0cmluZyB7XHJcbiAgICAgICAgICAgIGJhY2tncm91bmQ6IG5vbmU7XHJcbiAgICAgICAgfWBcclxuICAgIF1cclxufSlcclxuZXhwb3J0IGNsYXNzIE5neE1kQ29tcG9uZW50IGltcGxlbWVudHMgIEFmdGVyVmlld0luaXQge1xyXG4gICAgcHJpdmF0ZSBfcGF0aDogc3RyaW5nO1xyXG4gICAgcHJpdmF0ZSBfZGF0YTogc3RyaW5nO1xyXG4gICAgcHJpdmF0ZSBfbWQ6IGFueTtcclxuICAgIHByaXZhdGUgX2V4dDogc3RyaW5nO1xyXG4gICAgY2hhbmdlTG9nOiBzdHJpbmdbXSA9IFtdO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIHByaXZhdGUgX21kU2VydmljZTogTmd4TWRTZXJ2aWNlLFxyXG4gICAgICAgIHByaXZhdGUgX2VsOiBFbGVtZW50UmVmLFxyXG4gICAgICAgIEBJbmplY3QoUExBVEZPUk1fSUQpIHByaXZhdGUgcGxhdGZvcm1JZDogc3RyaW5nXHJcbiAgICApIHsgfVxyXG5cclxuICAgXHJcblxyXG4gICAgQElucHV0KClcclxuICAgIHNldCBwYXRoKHZhbHVlOiBzdHJpbmcpIHtcclxuICAgICAgaWYgKHZhbHVlKSB7XHJcbiAgICAgICAgdGhpcy5fcGF0aCA9IHZhbHVlO1xyXG4gICAgICAgIHRoaXMub25QYXRoQ2hhbmdlKCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBASW5wdXQoKVxyXG4gICAgc2V0IGRhdGEodmFsdWU6IHN0cmluZykge1xyXG4gICAgICBpZiAodmFsdWUpIHtcclxuICAgICAgICB0aGlzLl9kYXRhID0gdmFsdWU7XHJcbiAgICAgICAgdGhpcy5vbkRhdGFDaGFuZ2UodmFsdWUpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8vIG9uIGlucHV0XHJcbiAgICBvbkRhdGFDaGFuZ2UoZGF0YTogc3RyaW5nKSB7XHJcbiAgICAgIGlmIChkYXRhKSB7XHJcbiAgICAgICAgdGhpcy5fZWwubmF0aXZlRWxlbWVudC5pbm5lckhUTUwgPSB0aGlzLl9tZFNlcnZpY2UuY29tcGlsZShkYXRhKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLl9lbC5uYXRpdmVFbGVtZW50LmlubmVySFRNTCA9ICcnO1xyXG4gICAgICB9XHJcbiAgICAgIHRoaXMuaGlnaGxpZ2h0Q29udGVudChmYWxzZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAgQWZ0ZXIgdmlldyBpbml0XHJcbiAgICAgKi9cclxuICAgIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcclxuICAgICAgaWYgKHRoaXMuX3BhdGgpIHtcclxuICAgICAgICB0aGlzLm9uUGF0aENoYW5nZSgpO1xyXG4gICAgICB9IGVsc2UgaWYgKCF0aGlzLl9kYXRhKSB7XHJcbiAgICAgICAgdGhpcy5wcm9jZXNzUmF3KCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcm9jZXNzUmF3KCkge1xyXG4gICAgICB0aGlzLl9tZCA9IHRoaXMucHJlcGFyZShkZWNvZGVIdG1sKHRoaXMuX2VsLm5hdGl2ZUVsZW1lbnQuaW5uZXJIVE1MKSk7XHJcbiAgICAgIHRoaXMuX2VsLm5hdGl2ZUVsZW1lbnQuaW5uZXJIVE1MID0gdGhpcy5fbWRTZXJ2aWNlLmNvbXBpbGUodGhpcy5fbWQpO1xyXG4gICAgICB0aGlzLmhpZ2hsaWdodENvbnRlbnQoZmFsc2UpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogZ2V0IHJlbW90ZSBjb25lbnQ7XHJcbiAgICAgKi9cclxuICAgIG9uUGF0aENoYW5nZSgpIHtcclxuICAgICAgICB0aGlzLl9leHQgPSB0aGlzLl9wYXRoICYmIHRoaXMuX3BhdGguc3BsaXQoJy4nKS5zcGxpY2UoLTEpLmpvaW4oKTtcclxuICAgICAgICB0aGlzLl9tZFNlcnZpY2UuZ2V0Q29udGVudCh0aGlzLl9wYXRoKVxyXG4gICAgICAgICAgICAuc3Vic2NyaWJlKGRhdGEgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fbWQgPSB0aGlzLl9leHQgIT09ICdtZCcgPyAnYGBgJyArIHRoaXMuX2V4dCArICdcXG4nICsgZGF0YSArICdcXG5gYGAnIDogZGF0YTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2VsLm5hdGl2ZUVsZW1lbnQuaW5uZXJIVE1MID0gdGhpcy5fbWRTZXJ2aWNlLmNvbXBpbGUodGhpcy5wcmVwYXJlKHRoaXMuX21kKSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmhpZ2hsaWdodENvbnRlbnQoZmFsc2UpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBlcnIgPT4gdGhpcy5oYW5kbGVFcnJvcik7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBjYXRjaCBodHRwIGVycm9yXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgaGFuZGxlRXJyb3IoZXJyb3I6IGFueSk6IFByb21pc2U8YW55PiB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcignQW4gZXJyb3Igb2NjdXJyZWQnLCBlcnJvcik7IC8vIGZvciBkZW1vIHB1cnBvc2VzIG9ubHlcclxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoZXJyb3IubWVzc2FnZSB8fCBlcnJvcik7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBQcmVwYXJlIHN0cmluZ1xyXG4gICAgICovXHJcbiAgICAgcHJlcGFyZShyYXc6IHN0cmluZykge1xyXG4gICAgICAgIGlmICghcmF3KSB7XHJcbiAgICAgICAgICAgIHJldHVybiAnJztcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuX2V4dCA9PT0gJ21kJyB8fCAhdGhpcy5wYXRoKSB7XHJcbiAgICAgICAgICAgIGxldCBpc0NvZGVCbG9jayA9IGZhbHNlO1xyXG4gICAgICAgICAgICByZXR1cm4gcmF3LnNwbGl0KCdcXG4nKS5tYXAoKGxpbmU6IHN0cmluZykgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMudHJpbUxlZnQobGluZSkuc3Vic3RyaW5nKDAsIDMpID09PSAnYGBgJykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlzQ29kZUJsb2NrID0gIWlzQ29kZUJsb2NrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGlzQ29kZUJsb2NrID8gbGluZSA6IGxpbmUudHJpbSgpO1xyXG4gICAgICAgICAgICB9KS5qb2luKCdcXG4nKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHJhdy5yZXBsYWNlKC9cXFwiL2csICdcXCcnKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRyaW0gbGVmdCB3aGl0ZXNwYWNlXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgdHJpbUxlZnQobGluZTogc3RyaW5nKSB7XHJcbiAgICAgICAgcmV0dXJuIGxpbmUucmVwbGFjZSgvXlxccyt8XFxzKyQvZywgJycpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVXNlIFByaXNtIHRvIGhpZ2hsaWdodCBjb2RlIHNuaXBwZXRzIG9ubHkgb24gdGhlIGJyb3dzZXJcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBoaWdobGlnaHRDb250ZW50KGFzeW5jOiBib29sZWFuKTogdm9pZCB7XHJcbiAgICAgIGlmIChpc1BsYXRmb3JtQnJvd3Nlcih0aGlzLnBsYXRmb3JtSWQpKSB7XHJcbiAgICAgICAgUHJpc20uaGlnaGxpZ2h0QWxsKGFzeW5jKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBkZWNvZGVIdG1sKGh0bWw6IHN0cmluZykgeyAvLyBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL2EvNzM5NDc4Ny81ODg1MjFcclxuICAgIGNvbnN0IHR4dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RleHRhcmVhJyk7XHJcbiAgICB0eHQuaW5uZXJIVE1MID0gaHRtbDtcclxuICAgIHJldHVybiB0eHQudmFsdWU7XHJcbn1cclxuXHJcbiIsImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIE5neE1kQ29uZmlnIHtcclxuICAvKiogY29uZmlnIG1vZHVlICovXHJcblxyXG59XHJcbiIsImltcG9ydCB7IE5nTW9kdWxlLCBNb2R1bGVXaXRoUHJvdmlkZXJzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IE5neE1kU2VydmljZSB9IGZyb20gJy4vbmd4LW1kLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBOZ3hNZENvbmZpZyB9IGZyb20gJy4vbmd4LW1kLmNvbmZpZyc7XHJcbmltcG9ydCB7IE5neE1kQ29tcG9uZW50IH0gZnJvbSAnLi9uZ3gtbWQuY29tcG9uZW50JztcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgZGVjbGFyYXRpb25zOiBbTmd4TWRDb21wb25lbnRdLFxyXG4gIHByb3ZpZGVyczogW05neE1kU2VydmljZV0sXHJcbiAgZXhwb3J0czogW05neE1kQ29tcG9uZW50XSxcclxufSlcclxuZXhwb3J0IGNsYXNzIE5neE1kTW9kdWxlIHtcclxuICBwdWJsaWMgc3RhdGljIGZvclJvb3QoKTogTW9kdWxlV2l0aFByb3ZpZGVycyB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBuZ01vZHVsZTogTmd4TWRNb2R1bGUsXHJcbiAgICAgIHByb3ZpZGVyczogW05neE1kQ29uZmlnXVxyXG4gICAgfTtcclxuICB9XHJcbn1cclxuIl0sIm5hbWVzIjpbIlJlbmRlcmVyIiwibWFwIiwiY2F0Y2hFcnJvciIsInNldE9wdGlvbnMiLCJwYXJzZSIsInRocm93RXJyb3IiLCJJbmplY3RhYmxlIiwiSHR0cENsaWVudCIsImlzUGxhdGZvcm1Ccm93c2VyIiwiUHJpc20uaGlnaGxpZ2h0QWxsIiwiQ29tcG9uZW50IiwiRWxlbWVudFJlZiIsIkluamVjdCIsIlBMQVRGT1JNX0lEIiwiSW5wdXQiLCJOZ01vZHVsZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBO1FBV0Usc0JBQW9CLEtBQWlCO1lBQWpCLFVBQUssR0FBTCxLQUFLLENBQVk7NkJBRFosSUFBSUEsZUFBUSxFQUFFO1lBRXJDLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztZQUN0QixJQUFJLENBQUMsZ0JBQWdCLENBQUMsRUFBRSxDQUFDLENBQUM7U0FDM0I7Ozs7OztRQUdELGlDQUFVOzs7O1lBQVYsVUFBVyxJQUFZO2dCQUNuQixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxFQUFDLFlBQVksRUFBRSxNQUFNLEVBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQ0MsYUFBRyxDQUFDLFVBQUEsR0FBRyxJQUFJLE9BQUEsR0FBRyxHQUFBLENBQUMsRUFBRUMs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