// { "framework": "Vue" }

/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _App = __webpack_require__(1);

	var _App2 = _interopRequireDefault(_App);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	_App2.default.el = '#root';
	new Vue(_App2.default);

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = []

	/* script */
	__vue_exports__ = __webpack_require__(2)

	/* template */
	var __vue_template__ = __webpack_require__(19)
	__vue_options__ = __vue_exports__ = __vue_exports__ || {}
	if (
	  typeof __vue_exports__.default === "object" ||
	  typeof __vue_exports__.default === "function"
	) {
	if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
	__vue_options__ = __vue_exports__ = __vue_exports__.default
	}
	if (typeof __vue_options__ === "function") {
	  __vue_options__ = __vue_options__.options
	}
	__vue_options__.__file = "/Users/Hanks/Codes/work/weex-vue-examples/src/App.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
	__vue_options__.style = __vue_options__.style || {}
	__vue_styles__.forEach(function (module) {
	  for (var name in module) {
	    __vue_options__.style[name] = module[name]
	  }
	})
	if (typeof __register_static_styles__ === "function") {
	  __register_static_styles__(__vue_options__._scopeId, __vue_styles__)
	}

	module.exports = __vue_exports__


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _benchmark = __webpack_require__(3);

	var _benchmark2 = _interopRequireDefault(_benchmark);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	  components: { Example: _benchmark2.default }
	}; //
	//
	//
	//

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = []

	/* styles */
	__vue_styles__.push(__webpack_require__(4)
	)

	/* script */
	__vue_exports__ = __webpack_require__(5)

	/* template */
	var __vue_template__ = __webpack_require__(18)
	__vue_options__ = __vue_exports__ = __vue_exports__ || {}
	if (
	  typeof __vue_exports__.default === "object" ||
	  typeof __vue_exports__.default === "function"
	) {
	if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
	__vue_options__ = __vue_exports__ = __vue_exports__.default
	}
	if (typeof __vue_options__ === "function") {
	  __vue_options__ = __vue_options__.options
	}
	__vue_options__.__file = "/Users/Hanks/Codes/work/weex-vue-examples/src/directive/native/benchmark.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
	__vue_options__._scopeId = "data-v-143d1cde"
	__vue_options__.style = __vue_options__.style || {}
	__vue_styles__.forEach(function (module) {
	  for (var name in module) {
	    __vue_options__.style[name] = module[name]
	  }
	})
	if (typeof __register_static_styles__ === "function") {
	  __register_static_styles__(__vue_options__._scopeId, __vue_styles__)
	}

	module.exports = __vue_exports__


/***/ }),
/* 4 */
/***/ (function(module, exports) {

	module.exports = {
	  "line": {
	    "fontSize": 50,
	    "textAlign": "center",
	    "paddingTop": 15,
	    "paddingBottom": 15,
	    "color": "#666666",
	    "backgroundColor": "#EEEEEE",
	    "marginBottom": 10
	  }
	}

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _Line = __webpack_require__(6);

	var _Line2 = _interopRequireDefault(_Line);

	var _Floor = __webpack_require__(10);

	var _Floor2 = _interopRequireDefault(_Floor);

	var _AppList = __webpack_require__(14);

	var _AppList2 = _interopRequireDefault(_AppList);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var lineData = [{ type: 'A', name: 'Tom', kind: 'cat' }, { type: 'A', name: 'Jerry', kind: 'mouse' }]; //
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//

	var floorData = [{
	  type: 'floor',
	  title: '就造专属感，给孩子寻个座椅好玩伴',
	  desc: '犹记得儿时的风筝带着斑斓的色彩在天空飘过；那小河里躲迷藏的鱼虾，还待着小伙伴们一起去捕捉，如今的孩童没有了这些简单且纯粹的娱乐项目，生活在高楼城市中的他们，该当怎样度过自己的童年才是美好的？',
	  pictures: ['https://gw.alicdn.com/tfscom/i3/48292642/TB29OtIakz_F1JjSZFkXXcCaXXa_!!48292642.jpg_250x250q90s200.jpg', 'https://gw.alicdn.com/imgextra/i4/706778912/TB2hvwSXBvBIuJjy1zeXXbGBpXa_!!706778912-0-beehive-scenes.jpg_250x250q90s200.jpg', 'https://gw.alicdn.com/imgextra/i3/706778912/TB2wX.fcxz9F1JjSZFsXXaCGVXa_!!706778912-0-beehive-scenes.jpg_250x250q90s200.jpg'],
	  count: 237
	}, {
	  type: 'floor',
	  title: '睡袍穿不对，脱光也不媚！',
	  desc: '“Ihatemynightgown（我讨厌我的睡袍）.”经典电影《罗马假日》中，赫本饰演的安妮公主躺在梦幻的宫廷大床上，抱怨她身上那华丽的大睡袍臃肿不便，为公主的浪漫逃逸埋下伏笔。想象一下，男朋友刚刚',
	  pictures: ['https://gw.alicdn.com/imgextra/i3/3044653839/TB2a_nAXgsSMeJjSspdXXXZ4pXa_!!3044653839-0-daren.jpg_250x250q90s200.jpg', 'https://gw.alicdn.com/imgextra/i1/3044653839/TB2qrPCXiERMeJjSspiXXbZLFXa_!!3044653839-0-daren.jpg_250x250q90s200.jpg', 'https://gw.alicdn.com/imgextra/i1/3044653839/TB2ySjuXgsSMeJjSspeXXa77VXa_!!3044653839-0-beehive-scenes.jpg_250x250q90s200.jpg'],
	  count: 876
	}, {
	  type: 'floor',
	  title: '上天入海？运动相机帮你搞定',
	  desc: '现如今相机好像成为了我们每个人必不可少的装备，不管是专业的相机还是我们可拍照的手机，我们使用到它的频率也越来越高。为了追求更好的拍摄质量，人们似乎也愿意花更多的钱去购买好的拍摄装备',
	  pictures: ['https://gw.alicdn.com/tfscom/i3/462856946/TB2VzQswB4lpuFjy1zjXXcAKpXa_!!462856946.jpg_250x250q90s200.jpg', 'https://gw.alicdn.com/tfscom/i2/2811920170/TB2rCqHpVXXXXcZXpXXXXXXXXXX_!!2811920170.png_250x250.jpg', 'https://gw.alicdn.com/imgextra/i4/836552381/TB2c1q3aZSfF1JjSsplXXbrKFXa_!!836552381-0-beehive-scenes.jpg_250x250q90s200.jpg'],
	  count: 59
	}, {
	  type: 'floor',
	  title: '关于培根的那些事，教你吃得门清',
	  desc: '培根一直被认为是早餐的头盘，早上烤两片面包，平底锅煎一片培根、一个鸡蛋，和生菜一起夹在面包中，有荤有素，就是一顿丰富美味的西式早餐。培根的英文名是“Bacon”，原意是烟熏的猪肋条肉，或烟熏背脊肉',
	  pictures: ['https://gw.alicdn.com/imgextra/i2/603964020/TB24zFbarwTMeJjSszfXXXbtFXa_!!603964020-0-daren.jpg_250x250q90s200.jpg', 'https://gw.alicdn.com/imgextra/i2/603964020/TB2txtdarsTMeJjy1zcXXXAgXXa_!!603964020-0-daren.jpg_250x250q90s200.jpg', 'https://gw.alicdn.com/tfscom/i3/1635378022/TB2plKDbFXXXXaTXpXXXXXXXXXX-1635378022.jpg_250x250q90s200.jpg'],
	  count: 3576
	}, {
	  type: 'floor',
	  title: '轻奢风来袭，皮艺床打造典雅居室',
	  desc: '对于追求生活高品质感的小伙伴来说，皮艺家具是展现其高格调的途径之一。想要营造出奢华质感的卧室环境，大气庄重的皮床当然是不错的选择。特别是简欧风或是美式古典风格的家居环境，如果配以皮艺床简直就是点睛之笔',
	  pictures: ['https://gw.alicdn.com/imgextra/i2/787557947/TB2erNKawoQMeJjy0FoXXcShVXa_!!787557947-0-beehive-scenes.jpg_250x250q90s200.jpg', 'https://gw.alicdn.com/imgextra/i1/787557947/TB2KANyaBUSMeJjy1zkXXaWmpXa_!!787557947-0-beehive-scenes.jpg_250x250q90s200.jpg', 'https://gw.alicdn.com/imgextra/i3/787557947/TB2lwdGayERMeJjy0FcXXc7opXa_!!787557947-0-beehive-scenes.jpg_250x250q90s200.jpg'],
	  count: 36
	}];
	var appListData = [{
	  type: 'app-list',
	  apps: [{
	    title: 'AAAA',
	    icon: 'http://img.alicdn.com/tfs/TB1sWLoRVXXXXbdXXXXXXXXXXXX-140-140.png'
	  }, {
	    title: 'BBBB',
	    icon: 'http://gw.alicdn.com/tfs/TB10.R_SpXXXXbtXXXXXXXXXXXX-140-140.png'
	  }, {
	    title: 'CCCC',
	    icon: 'http://img.alicdn.com/tfs/TB1fRVASpXXXXXdXXXXXXXXXXXX-140-140.png'
	  }, {
	    title: 'DDDD',
	    icon: 'http://img.alicdn.com/tfs/TB1_TkdPVXXXXcJXXXXXXXXXXXX-140-140.png'
	  }]
	}];
	// generate list data
	function createListData(count) {
	  var array = [];
	  var candidates = [lineData, floorData, appListData];
	  while (count--) {
	    candidates.forEach(function (dataType) {
	      var i = Math.floor(Math.random() * dataType.length);
	      array.push(dataType[i]);
	    });
	  }
	  return array;
	}

	exports.default = {
	  components: { Line: _Line2.default, Floor: _Floor2.default, AppList: _AppList2.default },
	  data: function data() {
	    return {
	      listData: createListData(80)
	    };
	  }
	};

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = []

	/* styles */
	__vue_styles__.push(__webpack_require__(7)
	)

	/* script */
	__vue_exports__ = __webpack_require__(8)

	/* template */
	var __vue_template__ = __webpack_require__(9)
	__vue_options__ = __vue_exports__ = __vue_exports__ || {}
	if (
	  typeof __vue_exports__.default === "object" ||
	  typeof __vue_exports__.default === "function"
	) {
	if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
	__vue_options__ = __vue_exports__ = __vue_exports__.default
	}
	if (typeof __vue_options__ === "function") {
	  __vue_options__ = __vue_options__.options
	}
	__vue_options__.__file = "/Users/Hanks/Codes/work/weex-vue-examples/src/directive/native/Line.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
	__vue_options__._scopeId = "data-v-8fe3f97a"
	__vue_options__.style = __vue_options__.style || {}
	__vue_styles__.forEach(function (module) {
	  for (var name in module) {
	    __vue_options__.style[name] = module[name]
	  }
	})
	if (typeof __register_static_styles__ === "function") {
	  __register_static_styles__(__vue_options__._scopeId, __vue_styles__)
	}

	module.exports = __vue_exports__


/***/ }),
/* 7 */
/***/ (function(module, exports) {

	module.exports = {
	  "line": {
	    "fontSize": 50,
	    "textAlign": "center",
	    "paddingTop": 15,
	    "paddingBottom": 15,
	    "color": "#666666",
	    "backgroundColor": "#EEEEEE",
	    "marginBottom": 10
	  }
	}

/***/ }),
/* 8 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//

	exports.default = {
	  props: ['name', 'kind']
	};

/***/ }),
/* 9 */
/***/ (function(module, exports) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('text', {
	    staticClass: ["line"]
	  }, [_vm._v(_vm._s(_vm.name) + " (" + _vm._s(_vm.kind) + ")")])
	},staticRenderFns: []}
	module.exports.render._withStripped = true

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = []

	/* styles */
	__vue_styles__.push(__webpack_require__(11)
	)

	/* script */
	__vue_exports__ = __webpack_require__(12)

	/* template */
	var __vue_template__ = __webpack_require__(13)
	__vue_options__ = __vue_exports__ = __vue_exports__ || {}
	if (
	  typeof __vue_exports__.default === "object" ||
	  typeof __vue_exports__.default === "function"
	) {
	if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
	__vue_options__ = __vue_exports__ = __vue_exports__.default
	}
	if (typeof __vue_options__ === "function") {
	  __vue_options__ = __vue_options__.options
	}
	__vue_options__.__file = "/Users/Hanks/Codes/work/weex-vue-examples/src/directive/native/Floor.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
	__vue_options__._scopeId = "data-v-514f8ccd"
	__vue_options__.style = __vue_options__.style || {}
	__vue_styles__.forEach(function (module) {
	  for (var name in module) {
	    __vue_options__.style[name] = module[name]
	  }
	})
	if (typeof __register_static_styles__ === "function") {
	  __register_static_styles__(__vue_options__._scopeId, __vue_styles__)
	}

	module.exports = __vue_exports__


/***/ }),
/* 11 */
/***/ (function(module, exports) {

	module.exports = {
	  "list": {
	    "backgroundColor": "#F5F5F5"
	  },
	  "floor": {
	    "marginBottom": 15,
	    "backgroundColor": "#FFFFFF"
	  },
	  "A-title": {
	    "fontSize": 40,
	    "textAlign": "center",
	    "paddingTop": 35,
	    "paddingBottom": 25
	  },
	  "A-desc": {
	    "lines": 2,
	    "color": "#999999",
	    "fontSize": 30,
	    "paddingLeft": 30,
	    "paddingRight": 30
	  },
	  "A-image-box": {
	    "flexDirection": "row",
	    "justifyContent": "space-between",
	    "marginTop": 20
	  },
	  "A-image": {
	    "width": 245,
	    "height": 245
	  },
	  "A-comment": {
	    "color": "#52bfe6",
	    "fontSize": 32,
	    "textAlign": "right",
	    "paddingRight": 50,
	    "marginTop": 25,
	    "marginBottom": 20
	  }
	}

/***/ }),
/* 12 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//

	exports.default = {
	  props: ['floor']
	};

/***/ }),
/* 13 */
/***/ (function(module, exports) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', {
	    staticClass: ["floor"]
	  }, [_c('text', {
	    staticClass: ["A-title"]
	  }, [_vm._v(_vm._s(_vm.floor.title))]), _c('text', {
	    staticClass: ["A-desc"],
	    attrs: {
	      "lines": "2"
	    }
	  }, [_vm._v(_vm._s(_vm.floor.desc))]), _c('div', {
	    staticClass: ["A-image-box"]
	  }, _vm._l((_vm.floor.pictures), function(source, i) {
	    return _c('image', {
	      key: i,
	      staticClass: ["A-image"],
	      attrs: {
	        "src": source
	      }
	    })
	  })), _c('text', {
	    staticClass: ["A-comment"]
	  }, [_vm._v(_vm._s(_vm.floor.count) + " 人说好")])])
	},staticRenderFns: []}
	module.exports.render._withStripped = true

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = []

	/* styles */
	__vue_styles__.push(__webpack_require__(15)
	)

	/* script */
	__vue_exports__ = __webpack_require__(16)

	/* template */
	var __vue_template__ = __webpack_require__(17)
	__vue_options__ = __vue_exports__ = __vue_exports__ || {}
	if (
	  typeof __vue_exports__.default === "object" ||
	  typeof __vue_exports__.default === "function"
	) {
	if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
	__vue_options__ = __vue_exports__ = __vue_exports__.default
	}
	if (typeof __vue_options__ === "function") {
	  __vue_options__ = __vue_options__.options
	}
	__vue_options__.__file = "/Users/Hanks/Codes/work/weex-vue-examples/src/directive/native/AppList.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
	__vue_options__._scopeId = "data-v-1e334760"
	__vue_options__.style = __vue_options__.style || {}
	__vue_styles__.forEach(function (module) {
	  for (var name in module) {
	    __vue_options__.style[name] = module[name]
	  }
	})
	if (typeof __register_static_styles__ === "function") {
	  __register_static_styles__(__vue_options__._scopeId, __vue_styles__)
	}

	module.exports = __vue_exports__


/***/ }),
/* 15 */
/***/ (function(module, exports) {

	module.exports = {
	  "box": {
	    "width": 180,
	    "paddingTop": 15,
	    "paddingBottom": 15,
	    "paddingLeft": 15,
	    "paddingRight": 15
	  },
	  "title": {
	    "width": 180,
	    "fontSize": 30,
	    "textAlign": "center",
	    "paddingTop": 15,
	    "color": "#999999"
	  },
	  "icon": {
	    "width": 140,
	    "height": 140,
	    "marginLeft": 20
	  }
	}

/***/ }),
/* 16 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//

	exports.default = {
	  props: ['apps']
	};

/***/ }),
/* 17 */
/***/ (function(module, exports) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', {
	    staticStyle: {
	      flexDirection: "row"
	    }
	  }, _vm._l((_vm.apps), function(app, i) {
	    return _c('div', {
	      key: i,
	      staticClass: ["box"]
	    }, [_c('image', {
	      staticClass: ["icon"],
	      attrs: {
	        "src": app.icon
	      }
	    }), _c('text', {
	      staticClass: ["title"]
	    }, [_vm._v(_vm._s(app.title))])])
	  }))
	},staticRenderFns: []}
	module.exports.render._withStripped = true

/***/ }),
/* 18 */
/***/ (function(module, exports) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('list', {
	    staticStyle: {
	      backgroundColor: "#F5F5F5"
	    },
	    appendAsTree: true,
	    attrs: {
	      "append": "tree"
	    }
	  }, _vm._l((_vm.listData), function(item, index) {
	    return _c('cell', {
	      key: index,
	      appendAsTree: true,
	      attrs: {
	        "append": "tree"
	      }
	    }, [(item.type === 'A') ? _c('line', {
	      attrs: {
	        "name": item.name,
	        "kind": item.kind
	      }
	    }) : _vm._e(), (item.type === 'floor') ? _c('floor', {
	      attrs: {
	        "floor": item
	      }
	    }) : _vm._e(), (item.type === 'app-list') ? _c('app-list', {
	      attrs: {
	        "apps": item.apps
	      }
	    }) : _vm._e()], 1)
	  }))
	},staticRenderFns: []}
	module.exports.render._withStripped = true

/***/ }),
/* 19 */
/***/ (function(module, exports) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('example')
	},staticRenderFns: []}
	module.exports.render._withStripped = true

/***/ })
/******/ ]);