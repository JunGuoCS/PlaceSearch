webpackJsonp(["main"],{

/***/ "./src/$$_lazy_route_resource lazy recursive":
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/app.component.css":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/app.component.html":
/***/ (function(module, exports) {

module.exports = "<!--The content below is only a placeholder and can be replaced.-->\r\n\r\n\r\n<app-form (submit)=\"submitForm($event)\" (resetReq)=\"clearOpr($event)\" ></app-form>\r\n\r\n<div class=\"container\" style=\"margin-bottom:5%\">\r\n    <ul class=\"nav nav-pills justify-content-center\" role=\"tablist\">\r\n        <li class=\"nav-item\">\r\n            <a class=\"nav-link active\" data-toggle=\"pill\" href=\"javascript:void(0);\" (click)=\"ResTab='placList'\" id=\"ResLink\" >Results</a>\r\n        </li>\r\n        <li class=\"nav-item\">\r\n            <a class=\"nav-link\" data-toggle=\"pill\" href=\"javascript:void(0);\" (click)=\"ResTab='favList'\">Favorites</a>\r\n        </li>\r\n    </ul>\r\n</div>\r\n\r\n<div class=\"container\">\r\n\r\n<div [ngSwitch]=\"ResTab\" [@move]=\"ResTab\">\r\n    <app-plac-list #child_placlist *ngSwitchCase=\"'placList'\" [place_list_data]=\"placeList\" (pageChange)=\"retrievePage($event)\" (detailReq)=\"turnToDetail($event)\" (enterDeReq)=\"enterDetail($event)\" ></app-plac-list>\r\n    <app-fav-list *ngSwitchCase=\"'favList'\" (detailReq1)=\"turnToDetail($event)\" (enterDeReq1)=\"enterDetail($event)\" ></app-fav-list>\r\n    <app-plac-detail *ngSwitchCase=\"'placDetail'\" [place_info]=\"placeInfo\" (turnEvent)=\"returnList($event)\" ></app-plac-detail>\r\n</div>\r\n\r\n</div>\r\n\r\n<!-- <progress  class=\"progress progress-striped progress-animated\" value=\"50\" max=\"100\">50%</progress> -->\r\n<div *ngIf=\"isReqing\" class=\"progress\">\r\n    <div class=\"progress-bar progress-bar-striped progress-bar-animated\" style=\"width: 50%\"></div>\r\n</div>\r\n\r\n\r\n<div style=\"margin:10% 0\" *ngIf=\"errorStr\">\r\n    <ngb-alert [dismissible]=\"false\">\r\n        No records.\r\n    </ngb-alert>\r\n</div>\r\n<!-- <div style=\"margin:10% 0\" *ngIf=\"api_error\">\r\n    <ngb-alert type=\"danger\" [dismissible]=\"false\">\r\n        Failed to get results.\r\n    </ngb-alert>\r\n</div> -->\r\n    \r\n\r\n"

/***/ }),

/***/ "./src/app/app.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common_http__ = __webpack_require__("./node_modules/@angular/common/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__plac_list_plac_list_component__ = __webpack_require__("./src/app/plac-list/plac-list.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__data_service__ = __webpack_require__("./src/app/data.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_animations__ = __webpack_require__("./node_modules/@angular/animations/esm5/animations.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var AppComponent = /** @class */ (function () {
    function AppComponent(http, _data) {
        this.http = http;
        this._data = _data;
        this.title = 'app';
        //determine show which tab
        this.ResTab = "";
        this.testStr = "HaHa";
        this.errorStr = "";
        this.api_error = "";
        this.isReqing = false;
        ////////////////////////////////////////////////////////
        //  page operation
        ////////////////////////////////////////////////////////
        this.cur_page_no = 0;
        this.detailAva = false;
    }
    AppComponent.prototype.submitForm = function ($event) {
        var _this = this;
        if (typeof ($event.keyword) != "undefined")
            this.formData = JSON.parse(JSON.stringify($event));
        console.dir(JSON.stringify(this.formData));
        this.isReqing = true;
        this.errorStr = undefined;
        this._data.place_id = undefined;
        this.cur_page_no = 0;
        document.getElementById("ResLink").click();
        // this.placlistC.clearPage();
        if (this.placlistC)
            this.clearAll();
        this.http.post(this._data.hostURL + '/api/placelist', $event).subscribe(function (data) {
            console.dir(data);
            //cannot get result
            if (typeof (data['Error']) != "undefined") {
                _this.errorStr = data['Error'];
            }
            else {
                _this.placeList = data;
            }
        }, function (err) {
            console.error(err);
            _this.api_error = "Error";
            _this.isReqing = false;
        }, function () {
            // console.dir(JSON.stringify(this.placeList));
            if (_this.placeList.curlat) {
                _this._data.curLat = _this.placeList.curlat;
                _this._data.curLng = _this.placeList.curlng;
            }
            else {
                _this._data.curLat = _this.formData.lat;
                _this._data.curLng = _this.formData.lng;
            }
            _this.isReqing = false;
            _this.ResTab = "placList";
            _this.api_error = undefined;
        });
    };
    AppComponent.prototype.retrievePage = function ($event) {
        var _this = this;
        this.pageInfo = $event;
        console.log("pageInfo: " + this.pageInfo.page_no);
        console.log("curPage: " + this.cur_page_no);
        //get origin page
        if (this.pageInfo.page_no == 0) {
            this.http.post(this._data.hostURL + '/api/placelist', this.formData).subscribe(function (data) { _this.placeList = data; }, function (err) {
                console.error(err);
                _this.api_error = "Error";
            }, function () {
                // console.dir(JSON.stringify(this.placeList));
                console.log("Send zero page request");
                _this.cur_page_no = 0;
                _this.placlistC.redPageNo();
                _this.placlistC.isReqing = false;
                _this.api_error = undefined;
            });
        }
        else {
            this.http.post(this._data.hostURL + '/api/nextpage', { page_token: this.pageInfo.page_token }).subscribe(function (data) { _this.placeList = data; }, function (err) {
                console.error(err);
                _this.api_error = "Error";
            }, function () {
                console.log("Send next page request");
                // console.dir(JSON.stringify(this.placeList));     
                if (_this.pageInfo.page_no > _this.cur_page_no) {
                    _this.cur_page_no++;
                    _this.placlistC.addPageNo();
                    _this.placlistC.isReqing = false;
                }
                else {
                    _this.cur_page_no--;
                    _this.placlistC.redPageNo();
                    _this.placlistC.isReqing = false;
                }
                _this.api_error = undefined;
            });
        }
    };
    AppComponent.prototype.getDetail = function ($event) {
        if (typeof ($event.place_id) == "undefined") {
            return;
        }
        this.placeMap = new google.maps.Map(document.getElementById('gmap'), {
            center: { lat: $event.lat, lng: $event.lng },
            zoom: 15
        });
        this.detailService = new google.maps.places.PlacesService(this.placeMap);
        this.detailService.getDetails({
            placeId: $event.place_id
        }, function (place, status) {
            if (status === google.maps.places.PlacesServiceStatus.OK) {
                console.dir(place);
                return place;
            }
        });
    };
    AppComponent.prototype.turnToDetail = function ($event) {
        if (typeof ($event.place_id) == "undefined") {
            return;
        }
        // console.dir($event);
        this.prevTab = this.ResTab;
        this.placeInfo = $event;
        // console.dir(JSON.stringify(this.placeInfo));
        this.ResTab = "placDetail";
        this.detailAva = true;
    };
    AppComponent.prototype.returnList = function ($event) {
        this.ResTab = this.prevTab;
    };
    AppComponent.prototype.enterDetail = function ($event) {
        this.prevTab = $event;
        this.ResTab = "placDetail";
    };
    ////////////////////////////////////////////////////////
    //  clear operation
    ////////////////////////////////////////////////////////
    AppComponent.prototype.clearOpr = function ($event) {
        this.clearAll();
    };
    AppComponent.prototype.clearAll = function () {
        this.isReqing = false;
        this.errorStr = undefined;
        this.api_error = undefined;
        this._data.place_id = undefined;
        this.cur_page_no = 0;
        this.ResTab = "placList";
        this.placlistC.clearPage();
        this.ResTab = "";
        this.placeList = undefined;
        document.getElementById("ResLink").click();
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_6" /* ViewChild */])('child_placlist'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_2__plac_list_plac_list_component__["a" /* PlacListComponent */])
    ], AppComponent.prototype, "placlistC", void 0);
    AppComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'app-root',
            template: __webpack_require__("./src/app/app.component.html"),
            styles: [__webpack_require__("./src/app/app.component.css")],
            animations: [
                Object(__WEBPACK_IMPORTED_MODULE_4__angular_animations__["j" /* trigger */])('move', [
                    // state('placList', style({ offset:0 })),
                    // state('placDetail', style({ offset:0 })),
                    Object(__WEBPACK_IMPORTED_MODULE_4__angular_animations__["i" /* transition */])('placList=>placDetail', Object(__WEBPACK_IMPORTED_MODULE_4__angular_animations__["e" /* animate */])(1000, Object(__WEBPACK_IMPORTED_MODULE_4__angular_animations__["f" /* keyframes */])([
                        Object(__WEBPACK_IMPORTED_MODULE_4__angular_animations__["h" /* style */])({ transform: "translateX(-75%)" }),
                        Object(__WEBPACK_IMPORTED_MODULE_4__angular_animations__["h" /* style */])({ transform: "translateX(0)" })
                    ]))),
                    Object(__WEBPACK_IMPORTED_MODULE_4__angular_animations__["i" /* transition */])('placDetail=>placList', Object(__WEBPACK_IMPORTED_MODULE_4__angular_animations__["e" /* animate */])(1000, Object(__WEBPACK_IMPORTED_MODULE_4__angular_animations__["f" /* keyframes */])([
                        Object(__WEBPACK_IMPORTED_MODULE_4__angular_animations__["h" /* style */])({ transform: "translateX(75%)" }),
                        Object(__WEBPACK_IMPORTED_MODULE_4__angular_animations__["h" /* style */])({ transform: "translateX(0)" })
                    ]))),
                    Object(__WEBPACK_IMPORTED_MODULE_4__angular_animations__["i" /* transition */])('favList=>placDetail', Object(__WEBPACK_IMPORTED_MODULE_4__angular_animations__["e" /* animate */])(1000, Object(__WEBPACK_IMPORTED_MODULE_4__angular_animations__["f" /* keyframes */])([
                        Object(__WEBPACK_IMPORTED_MODULE_4__angular_animations__["h" /* style */])({ transform: "translateX(-75%)" }),
                        Object(__WEBPACK_IMPORTED_MODULE_4__angular_animations__["h" /* style */])({ transform: "translateX(0)" })
                    ]))),
                    Object(__WEBPACK_IMPORTED_MODULE_4__angular_animations__["i" /* transition */])('placDetail=>favList', Object(__WEBPACK_IMPORTED_MODULE_4__angular_animations__["e" /* animate */])(1000, Object(__WEBPACK_IMPORTED_MODULE_4__angular_animations__["f" /* keyframes */])([
                        Object(__WEBPACK_IMPORTED_MODULE_4__angular_animations__["h" /* style */])({ transform: "translateX(75%)" }),
                        Object(__WEBPACK_IMPORTED_MODULE_4__angular_animations__["h" /* style */])({ transform: "translateX(0)" })
                    ])))
                ])
            ]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_3__data_service__["a" /* DataService */]])
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./src/app/app.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__("./node_modules/@angular/platform-browser/esm5/platform-browser.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_component__ = __webpack_require__("./src/app/app.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ng_bootstrap_ng_bootstrap__ = __webpack_require__("./node_modules/@ng-bootstrap/ng-bootstrap/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__form_form_component__ = __webpack_require__("./src/app/form/form.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_common_http__ = __webpack_require__("./node_modules/@angular/common/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__plac_list_plac_list_component__ = __webpack_require__("./src/app/plac-list/plac-list.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__plac_detail_plac_detail_component__ = __webpack_require__("./src/app/plac-detail/plac-detail.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__fav_list_fav_list_component__ = __webpack_require__("./src/app/fav-list/fav-list.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__info_tab_info_tab_component__ = __webpack_require__("./src/app/info-tab/info-tab.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__photo_tab_photo_tab_component__ = __webpack_require__("./src/app/photo-tab/photo-tab.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__map_tab_map_tab_component__ = __webpack_require__("./src/app/map-tab/map-tab.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__data_service__ = __webpack_require__("./src/app/data.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__reviews_tab_reviews_tab_component__ = __webpack_require__("./src/app/reviews-tab/reviews-tab.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__angular_platform_browser_animations__ = __webpack_require__("./node_modules/@angular/platform-browser/esm5/animations.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






 // replaces previous Http service









var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["G" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__app_component__["a" /* AppComponent */],
                __WEBPACK_IMPORTED_MODULE_5__form_form_component__["a" /* FormComponent */],
                __WEBPACK_IMPORTED_MODULE_7__plac_list_plac_list_component__["a" /* PlacListComponent */],
                __WEBPACK_IMPORTED_MODULE_8__plac_detail_plac_detail_component__["a" /* PlacDetailComponent */],
                __WEBPACK_IMPORTED_MODULE_9__fav_list_fav_list_component__["a" /* FavListComponent */],
                __WEBPACK_IMPORTED_MODULE_10__info_tab_info_tab_component__["a" /* InfoTabComponent */],
                __WEBPACK_IMPORTED_MODULE_11__photo_tab_photo_tab_component__["a" /* PhotoTabComponent */],
                __WEBPACK_IMPORTED_MODULE_12__map_tab_map_tab_component__["a" /* MapTabComponent */],
                __WEBPACK_IMPORTED_MODULE_14__reviews_tab_reviews_tab_component__["a" /* ReviewsTabComponent */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_3__ng_bootstrap_ng_bootstrap__["a" /* NgbModule */].forRoot(),
                __WEBPACK_IMPORTED_MODULE_4__angular_forms__["a" /* FormsModule */],
                __WEBPACK_IMPORTED_MODULE_6__angular_common_http__["b" /* HttpClientModule */],
                __WEBPACK_IMPORTED_MODULE_15__angular_platform_browser_animations__["a" /* BrowserAnimationsModule */]
            ],
            providers: [__WEBPACK_IMPORTED_MODULE_13__data_service__["a" /* DataService */]],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2__app_component__["a" /* AppComponent */]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/app/data.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DataService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var DataService = /** @class */ (function () {
    function DataService() {
        this.hostURL = "http://web8-env.us-east-2.elasticbeanstalk.com";
    }
    DataService.prototype.setLatLng = function (lat, lng) {
        this.curLat = lat;
        this.curLng = lng;
    };
    DataService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["y" /* Injectable */])(),
        __metadata("design:paramtypes", [])
    ], DataService);
    return DataService;
}());



/***/ }),

/***/ "./src/app/fav-list/fav-list.component.css":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/fav-list/fav-list.component.html":
/***/ (function(module, exports) {

module.exports = "\n<div *ngIf=\"hasEle()\">\n    <button type=\"button\" class=\"btn btn-sm btn-outline-secondary\" style=\"float:right\" (click)=\"enterDetail()\" [disabled]=\"!detailAva()\" >Details<span class=\"oi oi-chevron-right\"></span></button>\n    <div style=\"clear: both;\"></div>\n</div>\n\n\n<div class=\"table-responsive\">\n<table class=\"table\" *ngIf=\"hasEle()\">\n    <thead >\n      <tr>\n        <th>#</th>\n        <th>Category</th>\n        <th>Name</th>\n        <th>Address</th>\n        <th>Favorite</th>\n        <th>Details</th>\n      </tr>\n    </thead>\n    <tbody>\n      <tr *ngFor=\"let place of sub_places; let i = index\" [class]=\"highlight(place.place_id)\">\n        <th scope=\"row\">{{20*page_no+i+1}}</th>\n        <td><img [src]=\"place.icon\" width=\"30px\" height=\"30px\"></td>\n        <td>{{place.name}}</td>\n        <td>{{place.vicinity}}</td>\n        <td><button type=\"button\" class=\"btn btn-sm btn-outline-secondary\" (click)=\"removeFav(place.place_id,i)\" ><span class=\"oi oi-trash\"></span></button></td>\n        <td><button type=\"button\" class=\"btn btn-sm btn-outline-secondary\" (click)=\"showDetail(place)\"><span class=\"oi oi-chevron-right\"></span></button></td>\n      </tr>\n  \n    </tbody>\n  \n  </table>\n</div>\n\n    <ul class=\"pagination justify-content-center\" *ngIf=\"hasEle()\" >\n      <li class=\"page-item\" *ngIf=\"page_no>0\"><a class=\"page-link\" (click)=\"getPrevPage()\">Previous</a></li>\n      <li class=\"page-item\" *ngIf=\"hasNext()\"><a class=\"page-link\" (click)=\"getNextPage()\">Next</a></li>\n    </ul>\n\n\n\n  <div style=\"margin:20% 0\" *ngIf=\"!hasEle()\">\n    <ngb-alert [dismissible]=\"false\">\n          No records.\n    </ngb-alert>\n  </div>"

/***/ }),

/***/ "./src/app/fav-list/fav-list.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FavListComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__data_service__ = __webpack_require__("./src/app/data.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var FavListComponent = /** @class */ (function () {
    function FavListComponent(_data) {
        this._data = _data;
        this.places = [];
        this.sub_places = [];
        this.page_no = 0;
        this.end_index = 0;
        ////////////////////////////////////////////////////
        // place detail operation
        ////////////////////////////////////////////////////
        this.detailReq1 = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* EventEmitter */]();
        this.enterDeReq1 = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* EventEmitter */]();
    }
    FavListComponent.prototype.ngOnInit = function () {
        for (var i = 0; i < localStorage.length; i++) {
            var place_id = localStorage.key(i);
            this.places.push(JSON.parse(localStorage.getItem(place_id)));
        }
        this.take_part();
    };
    FavListComponent.prototype.hasEle = function () {
        if (localStorage.length > 0)
            return true;
        else
            return false;
    };
    FavListComponent.prototype.hasNext = function () {
        if (this.end_index >= localStorage.length) {
            return false;
        }
        else
            return true;
    };
    FavListComponent.prototype.take_part = function () {
        if (20 * this.page_no + 20 > localStorage.length) {
            this.sub_places = this.places.slice(20 * this.page_no, localStorage.length);
            this.end_index = localStorage.length;
        }
        else {
            this.sub_places = this.places.slice(20 * this.page_no, 20 * this.page_no + 20);
            this.end_index = 20 * this.page_no + 20;
        }
    };
    FavListComponent.prototype.getPrevPage = function () {
        this.page_no--;
        this.take_part();
    };
    FavListComponent.prototype.getNextPage = function () {
        this.page_no++;
        this.take_part();
    };
    FavListComponent.prototype.removeFav = function (place_id, i) {
        localStorage.removeItem(place_id);
        this.places.splice(20 * this.page_no + i, 1);
        this.take_part();
    };
    FavListComponent.prototype.showDetail = function (place) {
        // console.log("Enter showDetail");
        // console.dir(place);
        this._data.place_id = place.place_id;
        this.detailReq1.emit(place);
    };
    FavListComponent.prototype.highlight = function (id) {
        if (this._data.place_id == id)
            return "table-warning";
        else
            return "";
    };
    FavListComponent.prototype.enterDetail = function () {
        this.enterDeReq1.emit("favList");
    };
    FavListComponent.prototype.detailAva = function () {
        if (this._data.place_id)
            return true;
        else
            return false;
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* Output */])(),
        __metadata("design:type", Object)
    ], FavListComponent.prototype, "detailReq1", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* Output */])(),
        __metadata("design:type", Object)
    ], FavListComponent.prototype, "enterDeReq1", void 0);
    FavListComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'app-fav-list',
            template: __webpack_require__("./src/app/fav-list/fav-list.component.html"),
            styles: [__webpack_require__("./src/app/fav-list/fav-list.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__data_service__["a" /* DataService */]])
    ], FavListComponent);
    return FavListComponent;
}());



/***/ }),

/***/ "./src/app/form/form.component.css":
/***/ (function(module, exports) {

module.exports = ".plac_form{\r\n    display: table;\r\n    /* width: 500px; */\r\n    /* margin:50px auto 0 auto; */\r\n    margin:5% auto;\r\n\r\n    background-color:rgb(223, 223, 223);\r\n    padding:2% 7%;\r\n}\r\n\r\n\r\n.title{\r\n    text-align: center;\r\n    margin:2%;\r\n\r\n    font-size: 16px;\r\n    font-weight: 600;\r\n}\r\n\r\n\r\n.errorInfo{\r\n    font-size:12px;\r\n    color:red;\r\n}\r\n\r\n\r\n\r\n"

/***/ }),

/***/ "./src/app/form/form.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"container\">\r\n  <div class=\"col-xs-6 col-md-6 plac_form\">\r\n    <form #loginForm=\"ngForm\" (ngSubmit)=\"onSubmit(loginForm)\" >\r\n\r\n      <div class=\"title\">Travel and Entertainment Search</div>\r\n      <div class=\"form-group row\">\r\n        <label for=\"keyword\" class=\"col-form-label col-form-label-sm col-sm-3\" >Keyword<span style=\"color:red\">*</span></label>\r\n        <div class=\"col-sm-9\">\r\n          <input type=\"text\" class=\"form-control form-control-sm\" [style.border-color]=\"kwErrStyle\" id=\"keyword\" name=\"keyword\" (blur)=\"checkKeyword(keyword.valid)\" (input)=\"checkKeyword(keyword.valid)\" [(ngModel)]=\"data.keyword\" ng-required=\"true\" #keyword=\"ngModel\" pattern=\".*[^\\s]+.*\" required>\r\n          <span *ngIf=\"keywordInfo\" class=\"errorInfo\">{{keywordInfo}}</span>\r\n        </div>\r\n      </div>\r\n\r\n      <div class=\"form-group row\">\r\n        <label for=\"category\" class=\"col-form-label col-form-label-sm col-sm-3\">Category</label>\r\n        <div class=\"col-sm-6\">\r\n            <select class=\"form-control form-control-sm\" name=\"category\"  [(ngModel)]=\"data.category\">\r\n              <option value=\"default\">Default</option>\r\n              <option value=\"airport\">Airport</option>\r\n              <option value=\"amusement_park\">Amusement Park</option>\r\n              <option value=\"aquarium\">Aquarium</option>\r\n              <option value=\"art_gallery\">Art Gallery</option>\r\n              <option value=\"bakery\">Bakery</option>\r\n              <option value=\"bar\">Bar</option>\r\n              <option value=\"beauty_salon\">Beauty Salon</option>\r\n              <option value=\"bowling_alley\">Bowling Alley</option>\r\n              <option value=\"bus_station\">Bus Station</option>\r\n              <option value=\"cafe\">Cafe</option>\r\n              <option value=\"campground\">Campground</option>\r\n              <option value=\"car_rental\">Car Rental</option>\r\n              <option value=\"casino\">Casino</option>\r\n              <option value=\"lodging\">Lodging</option>\r\n              <option value=\"movie_theater\">Movie Theater</option>\r\n              <option value=\"museum\">Museum</option>\r\n              <option value=\"night_club\">Night Club</option>\r\n              <option value=\"park\">Park</option>\r\n              <option value=\"parking\">Parking</option>\r\n              <option value=\"restaurant\">Restaurant</option>\r\n              <option value=\"shopping_mall\">Shopping Mall</option>\r\n              <option value=\"stadium\">Stadium</option>\r\n              <option value=\"subway_station\">Subway Station</option>\r\n              <option value=\"taxi_stand\">Taxi Stand</option>\r\n              <option value=\"train_station\">Train Station</option>\r\n              <option value=\"transit_station\">Transit Station</option>\r\n              <option value=\"travel_agency\">Travel Agency</option>\r\n              <option value=\"zoo\">Zoo</option>\r\n            </select>\r\n        </div>\r\n      </div>\r\n\r\n      <div class=\"form-group row\">\r\n        <label for=\"distance\" class=\"col-form-label col-form-label-sm col-sm-3\">Distance</label>\r\n        <div class=\"col-sm-6\">\r\n          <input type=\"text\" class=\"form-control form-control-sm\" id=\"distance\" name=\"distance\" placeholder=\"10\" (ngModelChange)=\"data.distance=$event\">\r\n        </div>\r\n      </div>\r\n\r\n      <fieldset class=\"form-group\">\r\n        <div class=\"row\">\r\n          <legend class=\"col-form-label col-form-label-sm col-sm-3 pt-0\">From<span style=\"color:red\">*</span></legend>\r\n          <div class=\"col-sm-9\">\r\n            <div class=\"form-check\">\r\n              <input class=\"form-check-input\" type=\"radio\" name=\"loc_select\" id=\"cur_loc\" value=\"cur_loc\" (change)=\"isCurLoc=true\" checked >\r\n              <label class=\"form-check-label form-check-label-sm\" for=\"cur_loc\">\r\n                Current Location\r\n              </label>\r\n            </div>\r\n            <div class=\"form-check\">\r\n              <input class=\"form-check-input\" type=\"radio\" name=\"loc_select\" id=\"oth_loc\" value=\"oth_loc\" (change)=\"isCurLoc=false\">\r\n              <label class=\"form-check-label form-check-label-sm\" for=\"oth_loc\">\r\n                  Other, Please specify:\r\n                </label>\r\n\r\n              <input type=\"text\" class=\"form-control form-control-sm\" id=\"oth_loc_val\" name=\"oth_loc_val\" [style.border-color]=\"lcErrStyle\" [disabled]=\"isCurLoc\" [(ngModel)]=\"data.locName\" #locName=\"ngModel\" required pattern=\".*[^\\s]+.*\" (blur)=\"checkLocName(locName.valid)\" (input)=\"checkLocName(locName.valid)\">\r\n              <span *ngIf=\"locNameInfo\" class=\"errorInfo\">{{locNameInfo}}</span>\r\n            </div>\r\n            \r\n\r\n\r\n          </div>\r\n        </div>\r\n      </fieldset>\r\n      \r\n\r\n      <button type=\"submit\" class=\"btn btn-primary\" [disabled]=\"!isLoadCurLoc||!keywordAva||(!locNameAva&&!isCurLoc)\"><i class=\"fas fa-search fa-sm\"></i>&nbsp;Search</button>\r\n      <!-- <input type=\"submit\" class=\"btn btn-primary\" value=\"Submit\"> -->\r\n      <button type=\"reset\" class=\"btn btn-light\" (click)=\"resetComp()\" >Clear</button>\r\n    </form>\r\n  </div>\r\n</div>\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n"

/***/ }),

/***/ "./src/app/form/form.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FormComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common_http__ = __webpack_require__("./node_modules/@angular/common/esm5/http.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var FormComponent = /** @class */ (function () {
    function FormComponent(http, _ngZone) {
        this.http = http;
        this._ngZone = _ngZone;
        this.isCurLoc = true;
        this.isLoadCurLoc = false;
        this.data = {
            keyword: "",
            category: "default",
            distance: 10,
            lat: 0,
            lng: 0,
            locName: "",
            isCurLoc: true
        };
        //send submit event to parent component
        this.submit = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* EventEmitter */]();
        this.keywordAva = false;
        this.locNameAva = false;
        this.resetReq = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* EventEmitter */]();
    }
    FormComponent.prototype.ngOnInit = function () {
        this.getCurLoc();
        this.initInputAC();
    };
    FormComponent.prototype.getCurLoc = function () {
        var _this = this;
        this.http.get('http://ip-api.com/json').subscribe(function (data) { _this.data.lat = data["lat"]; _this.data.lng = data["lon"]; }, function (err) { return console.error(err); }, function () { _this.isLoadCurLoc = true; });
    };
    FormComponent.prototype.initInputAC = function () {
        this.inputAC = new google.maps.places.Autocomplete((document.getElementById('oth_loc_val')), { types: ['geocode'] });
        // When the user selects an address from the dropdown, populate the address
        // fields in the form.
        this.inputAC.addListener('place_changed', function () {
            window['FormComponent'].zone.run(function () {
                window['FormComponent'].component.setOthLocInput();
            });
        });
    };
    FormComponent.prototype.setOthLocInput = function () {
        var place = this.inputAC.getPlace();
        this.data.locName = place.formatted_address;
    };
    FormComponent.prototype.onSubmit = function (value) {
        this.data.isCurLoc = this.isCurLoc;
        this.submit.emit(this.data);
        // return false;
    };
    FormComponent.prototype.checkKeyword = function (_valid) {
        if (_valid) {
            this.keywordInfo = undefined;
            this.kwErrStyle = undefined;
            this.keywordAva = true;
        }
        else {
            this.keywordInfo = "Please enter a keyword.";
            this.kwErrStyle = "red";
            this.keywordAva = false;
        }
    };
    FormComponent.prototype.checkLocName = function (_valid) {
        if (_valid) {
            this.locNameInfo = undefined;
            this.lcErrStyle = undefined;
            this.locNameAva = true;
        }
        else {
            this.locNameInfo = "Please enter a location.";
            this.lcErrStyle = "red";
            this.locNameAva = false;
        }
    };
    FormComponent.prototype.resetComp = function () {
        this.isCurLoc = true;
        this.data = {
            keyword: "",
            category: "default",
            distance: 10,
            lat: 0,
            lng: 0,
            locName: "",
            isCurLoc: true
        };
        // this.ngOnInit();
        this.getCurLoc();
        this.initInputAC();
        this.keywordInfo = undefined;
        this.kwErrStyle = undefined;
        this.keywordAva = false;
        this.locNameInfo = undefined;
        this.lcErrStyle = undefined;
        this.locNameAva = false;
        this.resetReq.emit("reset");
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* Output */])(),
        __metadata("design:type", Object)
    ], FormComponent.prototype, "submit", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* Output */])(),
        __metadata("design:type", Object)
    ], FormComponent.prototype, "resetReq", void 0);
    FormComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'app-form',
            template: __webpack_require__("./src/app/form/form.component.html"),
            styles: [__webpack_require__("./src/app/form/form.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["K" /* NgZone */]])
    ], FormComponent);
    return FormComponent;
}());



/***/ }),

/***/ "./src/app/info-tab/info-tab.component.css":
/***/ (function(module, exports) {

module.exports = "\r\n\r\n  .rating {\r\n    display: inline-block;\r\n    font-family: Wingdings;\r\n    font-size: 20px;\r\n    color:transparent;\r\n    /* opacity:0; */\r\n    position: relative;\r\n  }\r\n  .rating::before,\r\n  .rating span::before{\r\n    content: \"\\2605\\2605\\2605\\2605\\2605\";\r\n    display: block;\r\n  }\r\n  .rating span {\r\n    color: gold;\r\n    position: absolute;\r\n    top: 0;\r\n    left: 0;\r\n    overflow: hidden;\r\n  }\r\n"

/***/ }),

/***/ "./src/app/info-tab/info-tab.component.html":
/***/ (function(module, exports) {

module.exports = "\n<div class=\"table-responsive\">\n<table class=\"table table-striped\" *ngIf=\"placeDetail\">\n    <tbody>\n      <tr *ngIf=\"placeDetail.formatted_address\">\n        <th scope=\"row\">Address</th>\n        <td><div >{{placeDetail.formatted_address}}</div></td>\n      </tr>\n      <tr  *ngIf=\"placeDetail.international_phone_number\">\n        <th scope=\"row\">Phone Number</th>\n        <td><div>{{placeDetail.international_phone_number}}</div></td>\n      </tr>\n      <tr *ngIf=\"placeDetail.price_level\">\n        <th scope=\"row\">Price\tLevel</th>\n        <td>{{showPriceLevel(placeDetail.price_level)}}</td>\n      </tr>\n      <tr *ngIf=\"placeDetail.rating\">\n        <th scope=\"row\">Rating</th>\n        <td>\n          {{placeDetail.rating}}\n          <span class=\"rating\"><span [style.width]=\"getRatingRatio(placeDetail.rating)\"></span></span>\n        </td>\n      </tr>\n      <tr *ngIf=\"placeDetail.url\">\n        <th scope=\"row\">Google\tPage</th>\n        <td><a [href]=\"placeDetail.url\" target=\"_blank\" >{{placeDetail.url}}</a></td>\n      </tr>\n      <tr *ngIf=\"placeDetail.website\">\n        <th scope=\"row\">Website</th>\n        <td><a [href]=\"placeDetail.website\" target=\"_blank\">{{placeDetail.website}}</a></td>\n      </tr>\n      <tr *ngIf=\"placeDetail.opening_hours\">\n        <th scope=\"row\">Hours</th>\n        <td>\n          <div type=\"display:none;\">{{reorderWeekday()}}</div>\n          <span *ngIf=\"placeDetail.opening_hours.open_now\">Open now: {{getTodayOpenTime()}} </span>\n          <span *ngIf=\"!placeDetail.opening_hours.open_now\">Closed</span>\n          <a href=\"#\" data-toggle=\"modal\" data-target=\"#myModal\" >Daily open hours</a>\n        </td>\n      </tr>\n    </tbody>\n  </table>\n</div>\n  \n  \n  <div class=\"modal fade\" id=\"myModal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModalLabel\" aria-hidden=\"true\" *ngIf=\"placeDetail&&placeDetail.opening_hours\">\n      <div class=\"modal-dialog\">\n          <div class=\"modal-content\">\n              <div class=\"modal-header\">\n                  <h4 class=\"modal-title\" id=\"myModalLabel\">Open hours</h4>\n                  <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\">&times;</button>                  \n              </div>\n              <div class=\"modal-body\">\n                  <div class=\"table-responsive\">\n\n                  <table class=\"table\">\n                    <tbody>\n                      <tr>\n                        <th>{{reorderWeekdayText[0]}}</th>\n                      </tr>\n                      <tr *ngFor=\"let day_str of getReorderWeekdayText(1); let i= index\">\n                        <td>{{day_str}}</td>\n                      </tr>\n                    </tbody>\n                  </table>\n\n                  </div>\n              </div>\n              <div class=\"modal-footer\">\n                  <button type=\"button\" class=\"btn btn-secondary\" data-dismiss=\"modal\">Close</button>\n              </div>\n          </div><!-- /.modal-content -->\n      </div><!-- /.modal -->\n  </div>"

/***/ }),

/***/ "./src/app/info-tab/info-tab.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return InfoTabComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var InfoTabComponent = /** @class */ (function () {
    function InfoTabComponent() {
        this.reorderWeekdayText = [];
    }
    InfoTabComponent.prototype.ngOnInit = function () {
    };
    InfoTabComponent.prototype.getTodayOpenTime = function () {
        var week_day_time = this.placeDetail.opening_hours.weekday_text;
        // this.reorderWeekday();
        //start by Sunday
        if (week_day_time[0].charAt(0) == 'S') {
            var tmp = week_day_time[this.curDay].split(': ');
            return tmp[1];
        }
        else {
            var tmp;
            if (this.curDay == 0)
                tmp = week_day_time[6].split(': ');
            else
                tmp = week_day_time[this.curDay - 1].split(': ');
            return tmp[1];
        }
    };
    InfoTabComponent.prototype.reorderWeekday = function () {
        this.reorderWeekdayText.length = 0;
        var week_day_time = this.placeDetail.opening_hours.weekday_text;
        //start by Sunday
        if (week_day_time[0].charAt(0) == 'S') {
            for (var i = this.curDay; i < 7; i++) {
                this.reorderWeekdayText.push(week_day_time[i]);
            }
            for (i = 0; i < this.curDay; i++) {
                this.reorderWeekdayText.push(week_day_time[i]);
            }
        }
        else {
            var tmp_day;
            if (this.curDay == 0)
                tmp_day = 6;
            else
                tmp_day = this.curDay - 1;
            for (i = tmp_day; i < 7; i++) {
                this.reorderWeekdayText.push(week_day_time[i]);
            }
            for (i = 0; i < tmp_day; i++) {
                this.reorderWeekdayText.push(week_day_time[i]);
            }
        }
    };
    InfoTabComponent.prototype.getReorderWeekdayText = function (i) {
        return this.reorderWeekdayText.slice(1);
    };
    //show symbol
    InfoTabComponent.prototype.showPriceLevel = function (pl) {
        if (pl == 0)
            return 0;
        var res = "";
        for (var i = 0; i < pl; i++) {
            res += '$';
        }
        return res;
    };
    InfoTabComponent.prototype.getRatingRatio = function (ra) {
        return (ra * 1.0 / 5) * 100 + '%';
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Input */])(),
        __metadata("design:type", Object)
    ], InfoTabComponent.prototype, "placeDetail", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Input */])(),
        __metadata("design:type", Object)
    ], InfoTabComponent.prototype, "curDay", void 0);
    InfoTabComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'app-info-tab',
            template: __webpack_require__("./src/app/info-tab/info-tab.component.html"),
            styles: [__webpack_require__("./src/app/info-tab/info-tab.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], InfoTabComponent);
    return InfoTabComponent;
}());



/***/ }),

/***/ "./src/app/map-tab/map-tab.component.css":
/***/ (function(module, exports) {

module.exports = ".errorInfo{\r\n    font-size:12px;\r\n    color:red;\r\n}\r\n"

/***/ }),

/***/ "./src/app/map-tab/map-tab.component.html":
/***/ (function(module, exports) {

module.exports = "\r\n\r\n<form class=\"row\">\r\n\r\n  <fieldset class=\"form-group col-sm-4\">\r\n    <label for=\"FromInput\" class=\"col-form-label col-form-label-sm\"><strong>From</strong></label>\r\n    <input type=\"text\" class=\"form-control form-control-sm\" id=\"FromInput\" [(ngModel)]=\"FromInputStr\" #FromInput=\"ngModel\" required pattern=\".*[^\\s]+.*\" (blur)=\"checkFromInput(FromInput.valid)\" (input)=\"checkFromInput(FromInput.valid)\" [style.border-color]=\"fiErrStyle\" (input)=\"clearInput()\" name=\"FromInput\">\r\n    <span *ngIf=\"fromInputInfo\" class=\"errorInfo\">{{fromInputInfo}}</span>\r\n  </fieldset>\r\n  <fieldset class=\"form-group col-sm-4\">\r\n    <label for=\"ToInput\" class=\"col-form-label col-form-label-sm\" ><strong>To</strong></label>\r\n    <input type=\"text\" class=\"form-control form-control-sm\" id=\"ToInput\" [value]=\"mapInfo.address\" disabled>\r\n  </fieldset>\r\n\r\n  <div class=\"form-group col-sm-2\">\r\n    <label for=\"ModeInput\" class=\"col-form-label col-form-label-sm\"><strong>Travel Mode</strong></label>\r\n    <!-- <div class=\"col-sm-6\"> -->\r\n        <select class=\"form-control form-control-sm\" name=\"ModeInput\" [(ngModel)]=\"travelMode\">\r\n          <option value=\"DRIVING\">Driving</option>\r\n          <option value=\"BICYCLING\">Bicycling</option>\r\n          <option value=\"TRANSIT\">Transit</option>\r\n          <option value=\"WALKING\">Walking</option>\r\n        </select>\r\n    <!-- </div -->\r\n  </div>\r\n\r\n  <div class=\"form-group col-sm-2\">\r\n    <label class=\" col-form-label col-form-label-sm\" for=\"GetD\">&nbsp;</label>    \r\n    <input type=\"button\" class=\"btn btn-primary btn-sm form-control\" id=\"GetD\" value=\"Get Directions\" (click)=\"getRoute()\"  [disabled]=\"!fromInputAva\" >\r\n  </div>\r\n\r\n  <!-- <button class=\"btn btn-primary btn-sm col-sm-2\" id=\"GD\">Get Directions</button> -->\r\n  \r\n</form>\r\n\r\n<!-- <button class=\"btn btn-primary\" (click)=\"changeMapType()\" >Street</button> -->\r\n\r\n<a  (click)=\"changeMapType()\"><img with=\"40px\" height=\"40px\" [src]=\"MapTypeIcon\"></a>\r\n\r\n<div id=\"gmap\" style=\"width:100%;height:400px;\" >\r\n\r\n</div>\r\n  \r\n\r\n\r\n<div id=\"panel\"></div>"

/***/ }),

/***/ "./src/app/map-tab/map-tab.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MapTabComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__data_service__ = __webpack_require__("./src/app/data.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var MapTabComponent = /** @class */ (function () {
    function MapTabComponent(_ngZone, _data) {
        this._ngZone = _ngZone;
        this._data = _data;
        //////////////////////////////////////////////////////////////////////////
        // calculate route
        //////////////////////////////////////////////////////////////////////////
        this.FromInputStr = "Your location";
        this.travelMode = "DRIVING";
        this.MapTypeIcon = "http://cs-server.usc.edu:45678/hw/hw8/images/Pegman.png";
        this.fromInputAva = true;
        window['MapTabComponent'] = { component: this, zone: _ngZone };
    }
    MapTabComponent.prototype.ngOnInit = function () {
        // this.testLatLng();
        this.buildMap();
        this.initInputAC();
        // console.dir(this.inputAC);
        // alert(this._data.curLat+"::"+this._data.curLng);
    };
    MapTabComponent.prototype.testLatLng = function () {
        console.log("Lat1: " + this.mapInfo.lat);
        console.log("Lng1: " + this.mapInfo.lng);
    };
    MapTabComponent.prototype.buildMap = function () {
        console.log("Lat2: " + this.mapInfo.lat);
        console.log("Lng2: " + this.mapInfo.lng);
        this.directionsDisplay = new google.maps.DirectionsRenderer;
        this.directionsService = new google.maps.DirectionsService;
        this.placeMap = new google.maps.Map(document.getElementById('gmap'), {
            center: { lat: this.mapInfo.lat, lng: this.mapInfo.lng },
            zoom: 15,
            streetViewControl: true
        });
        this.marker = new google.maps.Marker({
            position: { lat: this.mapInfo.lat, lng: this.mapInfo.lng },
            map: this.placeMap
        });
        //show route
        this.directionsDisplay.setMap(this.placeMap);
        this.directionsDisplay.setPanel(document.getElementById('panel'));
        //street view
        this.panorama = this.placeMap.getStreetView();
        this.panorama.setPosition({ lat: this.mapInfo.lat, lng: this.mapInfo.lng });
        this.panorama.setPov(({
            heading: 265,
            pitch: 0
        }));
        //   this.panorama = new google.maps.StreetViewPanorama(
        //     document.getElementById('gmap'), {
        //       position: {lat: 34, lng: 35},
        //       pov: {
        //         heading: 270,
        //         pitch: 0
        //       },
        //       visible: false
        // });
        // this.placeMap.setStreetView(this.panorama);
    };
    MapTabComponent.prototype.initInputAC = function () {
        this.inputAC = new google.maps.places.Autocomplete((document.getElementById('FromInput')), { types: ['geocode'] });
        // When the user selects an address from the dropdown, populate the address
        // fields in the form.
        this.inputAC.addListener('place_changed', function () {
            window['MapTabComponent'].zone.run(function () {
                window['MapTabComponent'].component.setFromInput();
            });
        });
    };
    MapTabComponent.prototype.setFromInput = function () {
        var place = this.inputAC.getPlace();
        this.fromPlaceId = place.place_id;
        console.log(this.fromPlaceId);
    };
    MapTabComponent.prototype.getRoute = function () {
        if (this.FromInputStr == "Your location" || this.FromInputStr == "My location" || typeof (this.fromPlaceId) != "undefined") {
            this.calculateAndDisplayRoute({ lat: this._data.curLat, lng: this._data.curLng });
        }
        else {
            console.log("Input String: " + this.FromInputStr);
            var geocoder = new google.maps.Geocoder();
            geocoder.geocode({ 'address': this.FromInputStr }, function (results, status) {
                if (status === 'OK') {
                    window['MapTabComponent'].zone.run(function () {
                        window['MapTabComponent'].component.calculateAndDisplayRoute(results[0].geometry.location);
                    });
                }
                else {
                    alert('Geocode was not successful for the following reason: ' + status);
                }
            });
        }
        this.marker.setMap(null);
    };
    MapTabComponent.prototype.calculateAndDisplayRoute = function (_loc) {
        var start;
        if (this.FromInputStr == "Your location" || this.FromInputStr == "My location" || typeof (this.fromPlaceId) == "undefined") {
            // console.dir(_loc);
            start = _loc;
        }
        else {
            start = { placeId: this.fromPlaceId };
        }
        this.directionsService.route({
            origin: start,
            destination: { lat: this.mapInfo.lat, lng: this.mapInfo.lng },
            travelMode: this.travelMode,
            provideRouteAlternatives: true
        }, function (response, status) {
            if (status === 'OK') {
                console.dir(response);
                window['MapTabComponent'].zone.run(function () {
                    window['MapTabComponent'].component.directionsDisplay.setDirections(response);
                });
            }
            else {
                window.alert('Directions request failed due to ' + status);
            }
        });
    };
    MapTabComponent.prototype.clearInput = function () {
        this.fromPlaceId = undefined;
    };
    MapTabComponent.prototype.changeMapType = function () {
        var toggle = this.panorama.getVisible();
        if (toggle == false) {
            this.MapTypeIcon = "http://cs-server.usc.edu:45678/hw/hw8/images/Map.png";
            this.panorama.setVisible(true);
        }
        else {
            this.MapTypeIcon = "http://cs-server.usc.edu:45678/hw/hw8/images/Pegman.png";
            this.panorama.setVisible(false);
        }
    };
    MapTabComponent.prototype.checkFromInput = function (_valid) {
        if (_valid) {
            this.fromInputInfo = undefined;
            this.fiErrStyle = undefined;
            this.fromInputAva = true;
        }
        else {
            this.fromInputInfo = "Please enter a location.";
            this.fiErrStyle = "red";
            this.fromInputAva = false;
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Input */])(),
        __metadata("design:type", Object)
    ], MapTabComponent.prototype, "mapInfo", void 0);
    MapTabComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'app-map-tab',
            template: __webpack_require__("./src/app/map-tab/map-tab.component.html"),
            styles: [__webpack_require__("./src/app/map-tab/map-tab.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_core__["K" /* NgZone */], __WEBPACK_IMPORTED_MODULE_1__data_service__["a" /* DataService */]])
    ], MapTabComponent);
    return MapTabComponent;
}());



/***/ }),

/***/ "./src/app/photo-tab/photo-tab.component.css":
/***/ (function(module, exports) {

module.exports = "@media (min-width: 576px) {\r\n    .card-columns {\r\n        -webkit-column-count: 2;\r\n                column-count: 2;\r\n    }\r\n}\r\n\r\n@media (min-width: 768px) {\r\n    .card-columns {\r\n        -webkit-column-count: 3;\r\n                column-count: 3;\r\n    }\r\n}\r\n\r\n@media (min-width: 992px) {\r\n    .card-columns {\r\n        -webkit-column-count: 4;\r\n                column-count: 4;\r\n    }\r\n}\r\n\r\n@media (min-width: 1200px) {\r\n    .card-columns {\r\n        -webkit-column-count: 4;\r\n                column-count: 4;\r\n    }\r\n}"

/***/ }),

/***/ "./src/app/photo-tab/photo-tab.component.html":
/***/ (function(module, exports) {

module.exports = "<!-- <div style=\"display:none\" *ngIf=\"placePhoto\">{{getPhotos()}}</div> -->\r\n\r\n<!-- <div *ngIf=\"placePhoto\">\r\n  <span *ngFor=\"let url of photoUrl\">\r\n    <img [src]=\"url\" class=\"img-thumbnail pull-left col-sm-3\">\r\n  </span>\r\n</div> -->\r\n\r\n<!-- <div *ngIf=\"placePhoto\" class=\"card-columns\">\r\n  <span *ngFor=\"let url of photoUrl\">\r\n    <div class=\"card\">\r\n      <a [href]=\"url\" target=\"_blank\"><img [src]=\"url\" class=\"img-thumbnail\"></a>\r\n    </div>\r\n  </span>\r\n</div> -->\r\n\r\n\r\n<div *ngIf=\"placePhoto\">\r\n  <div class=\"row\">\r\n    <div class=\"col-xl-3 col-lg-3 col-md-6 col-sm-12\" >\r\n      <div class=\"card\" style=\"margin:1% 0\" *ngFor=\"let url of photoUrl1\">\r\n        <a [href]=\"url\" target=\"_blank\"><img [src]=\"url\" class=\"img-thumbnail\"></a>\r\n      </div>\r\n    </div>\r\n    \r\n    <div class=\"col-xl-3 col-lg-3 col-md-6 col-sm-12\" >\r\n      <div class=\"card\" style=\"margin:1% 0\" *ngFor=\"let url of photoUrl2\">\r\n        <a [href]=\"url\" target=\"_blank\"><img [src]=\"url\" class=\"img-thumbnail\"></a>\r\n      </div>\r\n    </div>\r\n\r\n    <div class=\"col-xl-3 col-lg-3 col-md-6 col-sm-12\" >\r\n      <div class=\"card\" style=\"margin:1% 0\" *ngFor=\"let url of photoUrl3\">\r\n        <a [href]=\"url\" target=\"_blank\"><img [src]=\"url\" class=\"img-thumbnail\"></a>\r\n      </div>\r\n    </div>\r\n\r\n    <div class=\"col-xl-3 col-lg-3 col-md-6 col-sm-12\" >\r\n      <div class=\"card\" style=\"margin:1% 0\" *ngFor=\"let url of photoUrl4\">\r\n        <a [href]=\"url\" target=\"_blank\"><img [src]=\"url\" class=\"img-thumbnail\"></a>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n\r\n\r\n\r\n<div style=\"margin:20% 0\" *ngIf=\"!photoUrl||photoUrl.length==0\">\r\n    <ngb-alert [dismissible]=\"false\">\r\n        No records.\r\n    </ngb-alert>\r\n</div>"

/***/ }),

/***/ "./src/app/photo-tab/photo-tab.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PhotoTabComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var PhotoTabComponent = /** @class */ (function () {
    function PhotoTabComponent() {
    }
    PhotoTabComponent.prototype.ngOnInit = function () {
        this.getPhotos();
    };
    PhotoTabComponent.prototype.getPhotos = function () {
        if (typeof (this.placePhoto) == "undefined")
            return;
        console.dir(this.placePhoto);
        // console.log("Enter 1");
        this.photoUrl = [];
        this.photoUrl1 = [];
        this.photoUrl2 = [];
        this.photoUrl3 = [];
        this.photoUrl4 = [];
        for (var i = 0; i < this.placePhoto.length; i++) {
            var url = this.placePhoto[i].getUrl({ 'maxWidth': this.placePhoto[i].width });
            this.photoUrl.push(url);
            if (i % 4 == 0) {
                this.photoUrl1.push(url);
            }
            if (i % 4 == 1) {
                this.photoUrl2.push(url);
            }
            if (i % 4 == 2) {
                this.photoUrl3.push(url);
            }
            if (i % 4 == 3) {
                this.photoUrl4.push(url);
            }
        }
    };
    PhotoTabComponent.prototype.hasPhoto = function () {
        if (this.photoUrl.length > 0)
            return true;
        else
            return false;
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Input */])(),
        __metadata("design:type", Object)
    ], PhotoTabComponent.prototype, "placePhoto", void 0);
    PhotoTabComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'app-photo-tab',
            template: __webpack_require__("./src/app/photo-tab/photo-tab.component.html"),
            styles: [__webpack_require__("./src/app/photo-tab/photo-tab.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], PhotoTabComponent);
    return PhotoTabComponent;
}());



/***/ }),

/***/ "./src/app/plac-detail/plac-detail.component.css":
/***/ (function(module, exports) {

module.exports = ".shopName{\r\n    margin: 3% 0;\r\n}\r\n\r\n.btn-star{\r\n    border-color:rgb(192,192,192);\r\n}\r\n\r\n.btn-star .star-style{\r\n    color:black;\r\n}\r\n\r\n.btn-star-clicked{\r\n    border-color:rgb(192,192,192);    \r\n}\r\n\r\n.btn-star-clicked .star-style{\r\n    color: yellow;\r\n}\r\n"

/***/ }),

/***/ "./src/app/plac-detail/plac-detail.component.html":
/***/ (function(module, exports) {

module.exports = "\r\n<h4 *ngIf=\"placeDetail\" class=\"text-center shopName\">{{placeDetail.name}}</h4>\r\n\r\n<div  *ngIf=\"placeDetail\">\r\n    <button type=\"button\" class=\"btn btn-sm btn-outline-secondary\" style=\"float:left\" (click)=\"turnList()\" ><span class=\"oi oi-chevron-left\"></span>List</button>\r\n    <a [href]=\"tweetContent\" style=\"float:right\"><img style=\"width:30px;height:30px\" src=\"http://cs-server.usc.edu:45678/hw/hw8/images/Twitter.png\"></a>    \r\n\r\n    <button *ngIf=\"!checkFav()\" type=\"button\" class=\"btn btn-sm btn-light btn-star\" style=\"float:right\" (click)=\"storeOremvPlace()\" ><i class=\"far fa-star star-style\"></i></button>\r\n    <button *ngIf=\"checkFav()\" type=\"button\" class=\"btn btn-sm btn-light btn-star-clicked\" style=\"float:right\" (click)=\"storeOremvPlace()\" ><i class=\"fas fa-star star-style\"></i></button>\r\n</div>\r\n\r\n<div style=\"clear: both;\"></div>\r\n\r\n<div class=\"container\">\r\n  <ul class=\"nav nav-tabs justify-content-end\">\r\n    <li class=\"nav-item\">\r\n      <a class=\"nav-link active\" data-toggle=\"tab\" href=\"javascript:void(0);\" (click)=\"changeTab('InfoTab')\" >Info</a>\r\n    </li>\r\n    <li class=\"nav-item\">\r\n      <a class=\"nav-link\" data-toggle=\"tab\" href=\"javascript:void(0);\" (click)=\"changeTab('PhotoTab')\">Photos</a>\r\n    </li>\r\n    <li class=\"nav-item\">\r\n      <a class=\"nav-link\" data-toggle=\"tab\" href=\"javascript:void(0);\" (click)=\"changeTab('MapTab')\">Map</a>\r\n    </li>\r\n    <li class=\"nav-item\">\r\n      <a class=\"nav-link\" data-toggle=\"tab\" href=\"javascript:void(0);\" (click)=\"changeTab('ReviewsTab')\">Reviews</a>\r\n    </li>\r\n  </ul>\r\n</div>\r\n\r\n\r\n<div [ngSwitch]=\"DetailTab\" >\r\n  <app-info-tab *ngSwitchCase=\"'InfoTab'\" [placeDetail]=\"placeDetail\" [curDay]=\"curDay\"></app-info-tab>\r\n  <app-photo-tab *ngSwitchCase=\"'PhotoTab'\" [placePhoto]=\"placePhoto\" ></app-photo-tab>\r\n  <app-map-tab *ngSwitchCase=\"'MapTab'\" [mapInfo]=\"getMapInfo()\"></app-map-tab>\r\n  <app-reviews-tab *ngSwitchCase=\"'ReviewsTab'\" [googleReviews]=\"getGoogleReviews()\" [addressInfo]=\"getYelpParam()\" ></app-reviews-tab>\r\n</div>\r\n\r\n<div id=\"hidemap\" style=\"width:100px;height:100px;display:none\" ></div>\r\n\r\n\r\n\r\n    "

/***/ }),

/***/ "./src/app/plac-detail/plac-detail.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PlacDetailComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var PlacDetailComponent = /** @class */ (function () {
    function PlacDetailComponent(_ngZone) {
        this._ngZone = _ngZone;
        this.DetailTab = "InfoTab";
        this.turnEvent = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* EventEmitter */]();
        this.tweetContent = "https://twitter.com/intent/tweet";
        window['PlacDetailComponent'] = { component: this, zone: _ngZone };
    }
    PlacDetailComponent.prototype.ngOnInit = function () {
        this.getDetail(this.place_info);
    };
    ////////////////////////////////////////////////////////
    //  detail operation
    ////////////////////////////////////////////////////////
    PlacDetailComponent.prototype.setDetail = function (place) {
        this.placeDetail = place;
        // this.testStr=JSON.stringify(this.placeDetail);
    };
    PlacDetailComponent.prototype.getDetail = function ($event) {
        if (typeof ($event.place_id) == "undefined") {
            return;
        }
        this.curLat = $event.lat;
        this.curLng = $event.lng;
        this.placeMap = new google.maps.Map(document.getElementById('hidemap'), {
            center: { lat: this.curLat, lng: this.curLng },
            zoom: 15
        });
        this.detailService = new google.maps.places.PlacesService(this.placeMap);
        this.detailService.getDetails({
            placeId: $event.place_id
        }, function (place, status) {
            if (status === google.maps.places.PlacesServiceStatus.OK) {
                console.dir(place);
                window['PlacDetailComponent'].zone.run(function () {
                    window['PlacDetailComponent'].component.setDetail(place);
                    window['PlacDetailComponent'].component.getPlaceTime();
                    window['PlacDetailComponent'].component.getPhoto();
                    window['PlacDetailComponent'].component.initTweet();
                });
                return place;
            }
        });
    };
    PlacDetailComponent.prototype.getPlaceTime = function () {
        if (typeof (this.placeDetail.utc_offset) == "undefined")
            return;
        var curDate = new Date();
        var curTimeDiff = -curDate.getTimezoneOffset();
        var placeDate = new Date(curDate.getTime() - curTimeDiff + this.placeDetail.utc_offset);
        this.curDay = placeDate.getDay();
        // this.testDate=placeDate.toDateString();
    };
    PlacDetailComponent.prototype.getPhoto = function () {
        if (this.placeDetail.photos) {
            this.placePhoto = this.placeDetail.photos;
        }
    };
    PlacDetailComponent.prototype.changeTab = function (tabName) {
        this.DetailTab = tabName;
    };
    PlacDetailComponent.prototype.getMapInfo = function () {
        return { lat: this.curLat, lng: this.curLng, address: this.placeDetail.formatted_address, place_id: this.placeDetail.place_id };
    };
    ////////////////////////////////////////////////////////
    //  get review params
    ////////////////////////////////////////////////////////
    PlacDetailComponent.prototype.getGoogleReviews = function () {
        return this.placeDetail.reviews;
    };
    PlacDetailComponent.prototype.getYelpParam = function () {
        // console.log("Yelp Param");
        // console.dir(this.placeDetail);
        var res = { name: this.placeDetail.name };
        var add_part = this.placeDetail.address_components;
        for (var i = 0; i < add_part.length; i++) {
            for (var j = 0; j < add_part[i].types.length; j++) {
                if (add_part[i].types[j] == "country") {
                    res['country'] = add_part[i].short_name;
                }
                else if (add_part[i].types[j] == "administrative_area_level_1") {
                    res['state'] = add_part[i].short_name;
                }
                else if (add_part[i].types[j] == "locality") {
                    res['city'] = add_part[i].short_name;
                }
                else if (add_part[i].types[j] == "route") {
                    res['address1'] = add_part[i].short_name;
                }
            }
        }
        return res;
    };
    ////////////////////////////////////////////////////
    // favorite operation
    ////////////////////////////////////////////////////
    PlacDetailComponent.prototype.checkFav = function () {
        //not find
        if (localStorage.getItem(this.placeDetail.place_id) == null)
            return false;
        else
            return true;
    };
    PlacDetailComponent.prototype.storeOremvPlace = function () {
        if (localStorage.getItem(this.placeDetail.place_id) != null) {
            localStorage.removeItem(this.placeDetail.place_id);
        }
        else {
            var tmp = {
                place_id: this.placeDetail.place_id,
                icon: this.placeDetail.icon,
                name: this.placeDetail.name,
                vicinity: this.placeDetail.vicinity,
                lat: this.placeDetail.geometry.location.lat,
                lng: this.placeDetail.geometry.location.lng
            };
            localStorage.setItem(this.placeDetail.place_id, JSON.stringify(tmp));
        }
        // console.log(localStorage.length);
        // console.dir(JSON.stringify(localStorage));
    };
    PlacDetailComponent.prototype.turnList = function () {
        this.turnEvent.emit("Back");
    };
    PlacDetailComponent.prototype.initTweet = function () {
        var shopURL;
        if (this.placeDetail.website)
            shopURL = this.placeDetail.website;
        else
            shopURL = this.placeDetail.url;
        // shopURL+="#TravelAndEntertainmentSearch";
        var text = encodeURI("Check out " + this.placeDetail.name + " located at " + this.placeDetail.formatted_address + ". Website:" + shopURL) + "  %23TravelAndEntertainmentSearch";
        console.log(text);
        this.tweetContent += "?text=" + text;
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Input */])(),
        __metadata("design:type", Object)
    ], PlacDetailComponent.prototype, "place_info", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* Output */])(),
        __metadata("design:type", Object)
    ], PlacDetailComponent.prototype, "turnEvent", void 0);
    PlacDetailComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'app-plac-detail',
            template: __webpack_require__("./src/app/plac-detail/plac-detail.component.html"),
            styles: [__webpack_require__("./src/app/plac-detail/plac-detail.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_core__["K" /* NgZone */]])
    ], PlacDetailComponent);
    return PlacDetailComponent;
}());



/***/ }),

/***/ "./src/app/plac-list/plac-list.component.css":
/***/ (function(module, exports) {

module.exports = "\r\n.btn-star{\r\n    border-color:rgb(192,192,192);\r\n}\r\n\r\n.btn-star .star-style{\r\n    color:black;\r\n}\r\n\r\n.btn-star-clicked{\r\n    border-color:rgb(192,192,192);    \r\n}\r\n\r\n.btn-star-clicked .star-style{\r\n    color: yellow;\r\n}\r\n"

/***/ }),

/***/ "./src/app/plac-list/plac-list.component.html":
/***/ (function(module, exports) {

module.exports = "<!-- \r\n<div *ngIf=\"!isReqing\"> -->\r\n\r\n\r\n\r\n<div *ngIf=\"place_list_data&&place_list_data.data.length>0\">\r\n    <button type=\"button\" class=\"btn btn-sm btn-outline-secondary\" style=\"float:right\" (click)=\"enterDetail()\" [disabled]=\"!detailAva()\" >Details<span class=\"oi oi-chevron-right\"></span></button>\r\n    <div style=\"clear: both;\"></div>\r\n</div>\r\n\r\n\r\n<div class=\"table-responsive\">\r\n<table class=\"table\" *ngIf=\"place_list_data&&place_list_data.data.length>0\">\r\n  <thead >\r\n    <tr>\r\n      <th>#</th>\r\n      <th>Category</th>\r\n      <th>Name</th>\r\n      <th>Address</th>\r\n      <th>Favorite</th>\r\n      <th>Details</th>\r\n    </tr>\r\n  </thead>\r\n  <tbody>\r\n    <tr *ngFor=\"let place of place_list_data.data; let i = index\" [class]=\"highlight(place.place_id)\">\r\n      <!-- <th scope=\"row\">{{20*page_no+i+1}}</th> -->\r\n      <th scope=\"row\">{{i+1}}</th>\r\n      <td><img [src]=\"place.icon\" width=\"30px\" height=\"30px\"></td>\r\n      <td>{{place.name}}</td>\r\n      <td>{{place.vicinity}}</td>\r\n      \r\n      <td *ngIf=\"!checkFav(place.place_id)\"><button type=\"button\" class=\"btn btn-sm btn-light btn-star\" (click)=\"storeOremvPlace(place)\" ><i class=\"far fa-star star-style\"></i></button></td>\r\n      <td *ngIf=\"checkFav(place.place_id)\"><button type=\"button\" class=\"btn btn-sm btn-light btn-star-clicked\" (click)=\"storeOremvPlace(place)\" ><i class=\"fas fa-star star-style\"></i></button></td>\r\n      \r\n      \r\n      <td><button type=\"button\" class=\"btn btn-sm btn-outline-secondary\" (click)=\"showDetail(place)\" ><span class=\"oi oi-chevron-right\"></span></button></td>\r\n    </tr>\r\n\r\n  </tbody>\r\n\r\n</table>\r\n</div>\r\n\r\n\r\n  <ul class=\"pagination justify-content-center\" *ngIf=\"place_list_data\" >\r\n    <li class=\"page-item\" *ngIf=\"page_no>0\"><a class=\"page-link\" (click)=\"getPrevPage()\" style=\"margin:0 4%\">Previous</a></li>\r\n    <!-- <li *ngIf=\"place_list_data.next_page_token\"><a (click)=\"getNextPage()\">Next</a></li> -->\r\n    <li class=\"page-item\" *ngIf=\"place_list_data.next_page_token\"><a class=\"page-link\" (click)=\"getNextPage()\" style=\"margin:0 4%\">Next</a></li>\r\n  </ul>\r\n\r\n\r\n<div style=\"margin:10% 0\" *ngIf=\"place_list_data&&(place_list_data.data.length == '0')\">\r\n  <ngb-alert [dismissible]=\"false\">\r\n       No records.\r\n  </ngb-alert>\r\n</div>\r\n\r\n\r\n<!-- \r\n</div> -->\r\n\r\n<div *ngIf=\"isReqing\" class=\"progress\">\r\n    <div class=\"progress-bar progress-bar-striped progress-bar-animated\" style=\"width: 50%\"></div>\r\n</div>"

/***/ }),

/***/ "./src/app/plac-list/plac-list.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PlacListComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__data_service__ = __webpack_require__("./src/app/data.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var PlacListComponent = /** @class */ (function () {
    function PlacListComponent(_data) {
        this._data = _data;
        this.isReqing = false;
        ////////////////////////////////////////////////////
        // page operation
        ////////////////////////////////////////////////////
        this.pages = []; //all pages that has been visited
        this.page_no = 0;
        this.pageChange = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* EventEmitter */]();
        ////////////////////////////////////////////////////
        // place detail operation
        ////////////////////////////////////////////////////
        this.detailReq = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* EventEmitter */]();
        this.enterDeReq = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* EventEmitter */]();
    }
    PlacListComponent.prototype.ngOnInit = function () {
    };
    PlacListComponent.prototype.getNextPage = function () {
        this.isReqing = true;
        if (this.page_no + 1 <= this.pages.length) {
            if (this.page_no + 1 != 0) {
                this.page_token = this.pages[this.page_no];
            }
        }
        else {
            this.page_token = this.place_list_data.next_page_token;
            this.pages.push(this.page_token);
        }
        // this.place_list_data.data.length=0;
        // console.dir(this.place_list_data);
        this.place_list_data = undefined;
        console.log("call retrieve next");
        //inform farther component to retrieve page
        this.pageChange.emit({ page_token: this.page_token, page_no: this.page_no + 1 });
    };
    PlacListComponent.prototype.getPrevPage = function () {
        this.isReqing = true;
        if (this.page_no - 1 > 0)
            this.page_token = this.pages[this.page_no - 2];
        // this.place_list_data.data.length=0;    
        this.place_list_data = undefined;
        console.log("call retrieve prev");
        //inform farther component to retrieve page
        this.pageChange.emit({ page_token: this.page_token, page_no: this.page_no - 1 });
    };
    PlacListComponent.prototype.addPageNo = function () {
        this.page_no++;
    };
    PlacListComponent.prototype.redPageNo = function () {
        this.page_no--;
    };
    PlacListComponent.prototype.clearPage = function () {
        this.pages = [];
        this.page_no = 0;
        this.page_token = undefined;
    };
    ////////////////////////////////////////////////////
    // favorite operation
    ////////////////////////////////////////////////////
    PlacListComponent.prototype.checkFav = function (place_id) {
        //not find
        if (localStorage.getItem(place_id) == null)
            return false;
        else
            return true;
    };
    PlacListComponent.prototype.storeOremvPlace = function (place) {
        if (localStorage.getItem(place.place_id) != null) {
            localStorage.removeItem(place.place_id);
        }
        else
            localStorage.setItem(place.place_id, JSON.stringify(place));
        // console.log(localStorage.length);
        // console.dir(JSON.stringify(localStorage));
    };
    PlacListComponent.prototype.showDetail = function (place) {
        this._data.place_id = place.place_id;
        this.detailReq.emit(place);
    };
    PlacListComponent.prototype.highlight = function (id) {
        if (this._data.place_id == id)
            return "table-warning";
        else
            return "";
    };
    PlacListComponent.prototype.enterDetail = function () {
        this.enterDeReq.emit("placList");
    };
    PlacListComponent.prototype.detailAva = function () {
        if (this._data.place_id)
            return true;
        else
            return false;
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Input */])(),
        __metadata("design:type", Object)
    ], PlacListComponent.prototype, "place_list_data", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* Output */])(),
        __metadata("design:type", Object)
    ], PlacListComponent.prototype, "pageChange", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* Output */])(),
        __metadata("design:type", Object)
    ], PlacListComponent.prototype, "detailReq", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* Output */])(),
        __metadata("design:type", Object)
    ], PlacListComponent.prototype, "enterDeReq", void 0);
    PlacListComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'app-plac-list',
            template: __webpack_require__("./src/app/plac-list/plac-list.component.html"),
            styles: [__webpack_require__("./src/app/plac-list/plac-list.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__data_service__["a" /* DataService */]])
    ], PlacListComponent);
    return PlacListComponent;
}());



/***/ }),

/***/ "./src/app/reviews-tab/reviews-tab.component.css":
/***/ (function(module, exports) {

module.exports = ".img-container{\r\n    width: 70px;\r\n    height: 0px;\r\n    padding-bottom: 70px;\r\n    overflow:hidden;\r\n    margin: 0;\r\n    position:relative;\r\n}\r\n\r\n.img-wrap img{\r\n    position:absolute;\r\n    width: 100%;\r\n    height: 100%;\r\n}\r\n\r\n@media (min-width: 200px) {\r\n    .resWidth1{\r\n        width:40%;\r\n    }\r\n    .resWidth2{\r\n        width:60%;\r\n    }\r\n}\r\n\r\n@media (min-width: 300px) {\r\n    .resWidth1{\r\n        width:35%;\r\n    }\r\n    .resWidth2{\r\n        width:65%;\r\n    }\r\n}\r\n\r\n@media (min-width: 400px) {\r\n    .resWidth1{\r\n        width:30%;\r\n    }\r\n    .resWidth2{\r\n        width:70%;\r\n    }\r\n}\r\n\r\n@media (min-width: 576px) {\r\n    .resWidth1{\r\n        width:25%;\r\n    }\r\n    .resWidth2{\r\n        width:75%;\r\n    }\r\n}\r\n\r\n@media (min-width: 768px) {\r\n    .resWidth1{\r\n        width:20%;\r\n    }\r\n    .resWidth2{\r\n        width:80%;\r\n    }\r\n}\r\n\r\n@media (min-width: 992px) {\r\n    .resWidth1{\r\n        width:20%;        \r\n    }\r\n    .resWidth2{\r\n        width:80%;\r\n    }\r\n}\r\n\r\n@media (min-width: 1200px) {\r\n    .resWidth1{\r\n        width:10%;\r\n    }\r\n    .resWidth2{\r\n        width:90%;\r\n    }\r\n}"

/***/ }),

/***/ "./src/app/reviews-tab/reviews-tab.component.html":
/***/ (function(module, exports) {

module.exports = "\r\n<div class=\"btn-group\">\r\n    <button type=\"button\" class=\"btn btn-dark btn-sm dropdown-toggle\" data-toggle=\"dropdown\">\r\n        {{curReviewsType}}\r\n    </button>\r\n    <div class=\"dropdown-menu\">\r\n      <a class=\"dropdown-item\" href=\"javascript:void(0);\" (click)=\"changeReviews('Google')\">Google Reviews</a>\r\n      <a class=\"dropdown-item\" href=\"javascript:void(0);\" (click)=\"changeReviews('Yelp')\">Yelp Reviews</a>\r\n    </div>\r\n\r\n  </div>\r\n\r\n  <div class=\"btn-group\">\r\n      <button type=\"button\" class=\"btn btn-dark btn-sm dropdown-toggle\" data-toggle=\"dropdown\">\r\n          {{curOrderType}}\r\n      </button>\r\n      <div class=\"dropdown-menu\">\r\n        <a class=\"dropdown-item\" href=\"javascript:void(0);\" (click)=\"sort('Default Order')\">Default\tOrder</a>\r\n        <a class=\"dropdown-item\" href=\"javascript:void(0);\" (click)=\"sort('Highest Rating')\">Highest\tRating</a>\r\n        <a class=\"dropdown-item\" href=\"javascript:void(0);\" (click)=\"sort('Lowest Rating')\">Lowest\tRating</a>\r\n        <a class=\"dropdown-item\" href=\"javascript:void(0);\" (click)=\"sort('Most Recent')\">Most\tRecent</a>\r\n        <a class=\"dropdown-item\" href=\"javascript:void(0);\" (click)=\"sort('Least Recent')\">Least\tRecent</a>\r\n      </div>\r\n  </div>\r\n\r\n\r\n\r\n<div *ngIf=\"reviews\">\r\n  <div class=\"card\" *ngFor=\"let review of reviews\" style=\"margin:1% 0;\">\r\n    <div class=\"card-body\">\r\n      <div class=\"row\">\r\n        <span class=\"resWidth1\"> \r\n        <!-- <span style=\"width:100px;position:relative\">  -->\r\n          <a [href]=\"review.author_url\" *ngIf=\"review.photo_url\" target=\"_blank\">\r\n            <div class=\"img-container rounded-circle\" style=\"margin:0 auto;text-align:center;\">\r\n              <img [src]=\"review.photo_url\" style=\"width:100%;height:auto;\">\r\n            </div>\r\n          </a>\r\n        </span>\r\n        <span class=\"resWidth2\">\r\n        <!-- <span style=\"position:relative\"> -->\r\n          <h4 class=\"card-title\"><a [href]=\"review.author_url\" target=\"_blank\">{{review.author_name}}</a></h4>\r\n          <p><i *ngFor=\"let ra of ratingArr(review.review_rating)\" class=\"fas fa-star fa-sm\" style='color:rgb(232,108,28)'></i>&nbsp;<span style=\"color:rgb(150,150,170)\">{{review.review_time}}</span></p>\r\n          <p class=\"card-text\">{{review.review_text}}</p>\r\n        </span>         \r\n\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n\r\n\r\n\r\n\r\n<div style=\"margin:10% 0\" *ngIf=\"isEmpty\">\r\n  <ngb-alert [dismissible]=\"false\">\r\n      No records.\r\n  </ngb-alert>\r\n</div>\r\n\r\n\r\n<!-- <div style=\"margin:10% 0\" *ngIf=\"api_error\">\r\n    <ngb-alert type=\"danger\" [dismissible]=\"false\">\r\n        Failed to get results.\r\n    </ngb-alert>\r\n</div> -->\r\n\r\n<div *ngIf=\"isReqing\" style=\"margin:10% 0\" class=\"progress\">\r\n    <div class=\"progress-bar progress-bar-striped progress-bar-animated\" style=\"width: 50%\"></div>\r\n</div>"

/***/ }),

/***/ "./src/app/reviews-tab/reviews-tab.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ReviewsTabComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common_http__ = __webpack_require__("./node_modules/@angular/common/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__data_service__ = __webpack_require__("./src/app/data.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ReviewsTabComponent = /** @class */ (function () {
    function ReviewsTabComponent(http, _data) {
        this.http = http;
        this._data = _data;
        this.isEmpty = false;
        this.api_error = false;
        this.isReqing = false;
        this.curReviewsType = "Google Reviews";
        ////////////////////////////////////////////////////////////////////////////
        //  sort operation
        ////////////////////////////////////////////////////////////////////////////
        this.curOrderType = "Default Order";
    }
    ReviewsTabComponent.prototype.ngOnInit = function () {
        this.setGoogleReviews();
    };
    // reviewDate=new Date();
    ReviewsTabComponent.prototype.getReviewTime = function (timeStamp) {
        var reviewDate = new Date(timeStamp * 1000);
        var res = reviewDate.getFullYear() + "-" + (reviewDate.getMonth() + 1) + "-" + reviewDate.getDate() + " " + reviewDate.getHours() + ":" + reviewDate.getMinutes() + ":" + reviewDate.getSeconds();
        return res;
    };
    ReviewsTabComponent.prototype.setGoogleReviews = function () {
        this.reviews = undefined; //reset reviews
        if (typeof (this.googleReviews) == "undefined" || this.googleReviews.length == 0) {
            this.isEmpty = true;
            return;
        }
        this.isEmpty = false;
        this.reviews = [];
        for (var i = 0; i < this.googleReviews.length; i++) {
            this.reviews.push({
                'photo_url': this.googleReviews[i].profile_photo_url,
                'author_name': this.googleReviews[i].author_name,
                'author_url': this.googleReviews[i].author_url,
                'review_rating': this.googleReviews[i].rating,
                'review_time': this.getReviewTime(this.googleReviews[i].time),
                'review_text': this.googleReviews[i].text
            });
        }
    };
    ReviewsTabComponent.prototype.setYelpReviews = function () {
        this.reviews = undefined;
        if (this.yelpReviews.length == 0 || this.yelpReviews.Error) {
            this.isEmpty = true;
            return;
        }
        this.isEmpty = false;
        this.reviews = [];
        console.dir(this.yelpReviews);
        for (var i = 0; i < this.yelpReviews.length; i++) {
            this.reviews.push({
                'photo_url': this.yelpReviews[i].user.image_url,
                'author_name': this.yelpReviews[i].user.name,
                'author_url': this.yelpReviews[i].url,
                'review_rating': this.yelpReviews[i].rating,
                'review_time': this.yelpReviews[i].time_created,
                'review_text': this.yelpReviews[i].text
            });
        }
    };
    ReviewsTabComponent.prototype.requestYelpReviews = function () {
        var _this = this;
        console.log("Enter Request");
        console.dir(this.addressInfo);
        this.reviews = undefined;
        if (typeof (this.addressInfo.country) == "undefined" ||
            typeof (this.addressInfo.state) == "undefined" ||
            typeof (this.addressInfo.city) == "undefined") {
            this.isEmpty = true;
            return;
        }
        this.isReqing = true;
        this.http.post(this._data.hostURL + '/api/yelpreview', this.addressInfo).subscribe(function (data) {
            _this.yelpReviews = data;
        }, function (err) {
            console.error(err);
            _this.api_error = true;
            _this.isReqing = false;
        }, function () {
            _this.isReqing = false;
            _this.api_error = false;
            _this.setYelpReviews();
        });
    };
    ReviewsTabComponent.prototype.changeReviews = function (Type) {
        if (Type == "Google") {
            this.setGoogleReviews();
            this.curReviewsType = "Google Reviews";
        }
        else {
            if (this.yelpReviews) {
                this.setYelpReviews();
            }
            else {
                this.requestYelpReviews();
            }
            this.curReviewsType = "Yelp Reviews";
        }
    };
    ReviewsTabComponent.prototype.sort = function (type) {
        if (type == 'Default Order') {
            if (this.curReviewsType == "Google Reviews") {
                this.setGoogleReviews();
            }
            else {
                this.setYelpReviews();
            }
            this.curOrderType = 'Default Order';
        }
        else if (type == 'Highest Rating') {
            this.reviews.sort(function (a, b) {
                return b.review_rating - a.review_rating;
            });
            this.curOrderType = 'Highest Rating';
        }
        else if (type == 'Lowest Rating') {
            this.reviews.sort(function (a, b) {
                return a.review_rating - b.review_rating;
            });
            this.curOrderType = 'Lowest Rating';
        }
        else if (type == 'Most Recent') {
            this.reviews.sort(function (a, b) {
                var aTime = a.review_time.replace(/-/g, '/');
                var bTime = b.review_time.replace(/-/g, '/');
                var val1 = new Date(aTime);
                var val2 = new Date(bTime);
                return val2.getTime() - val1.getTime();
                // return b-a;
            });
            this.curOrderType = 'Most Recent';
        }
        else {
            this.reviews.sort(function (a, b) {
                var aTime = a.review_time.replace(/-/g, '/');
                var bTime = b.review_time.replace(/-/g, '/');
                var val1 = new Date(aTime);
                var val2 = new Date(bTime);
                return val1.getTime() - val2.getTime();
                // return a-b;
            });
            this.curOrderType = 'Least Recent';
        }
    };
    ReviewsTabComponent.prototype.showRating = function (rating) {
        var res = "";
        for (var i = 0; i < rating; i++) {
            res += "<i class='fas fa-star fa-sm' style='color:yellow'></i>";
        }
        return res;
    };
    ReviewsTabComponent.prototype.ratingArr = function (rating) {
        return Array(rating);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Input */])(),
        __metadata("design:type", Object)
    ], ReviewsTabComponent.prototype, "googleReviews", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Input */])(),
        __metadata("design:type", Object)
    ], ReviewsTabComponent.prototype, "addressInfo", void 0);
    ReviewsTabComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'app-reviews-tab',
            template: __webpack_require__("./src/app/reviews-tab/reviews-tab.component.html"),
            styles: [__webpack_require__("./src/app/reviews-tab/reviews-tab.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_2__data_service__["a" /* DataService */]])
    ], ReviewsTabComponent);
    return ReviewsTabComponent;
}());



/***/ }),

/***/ "./src/environments/environment.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
var environment = {
    production: false
};


/***/ }),

/***/ "./src/main.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__("./node_modules/@angular/platform-browser-dynamic/esm5/platform-browser-dynamic.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__("./src/app/app.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__("./src/environments/environment.ts");




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_11" /* enableProdMode */])();
}
Object(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */])
    .catch(function (err) { return console.log(err); });


/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("./src/main.ts");


/***/ })

},[0]);
//# sourceMappingURL=main.bundle.js.map