webpackJsonp([10],{125:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={methods:{back:function(){this.$router.go(-1)}}}},13:function(e,t,i){i(205);var n=i(4)(i(125),i(243),"data-v-584d9993",null);e.exports=n.exports},187:function(e,t,i){t=e.exports=i(23)(),t.push([e.i,".warp[data-v-584d9993]{padding:20px 0;min-height:100%;background:#fff;position:relative;-webkit-box-align:center;-webkit-align-items:center;align-items:center;overflow-y:auto;font-size:16px}.content[data-v-584d9993],.warp[data-v-584d9993]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column}.content[data-v-584d9993]{width:300px}.zh[data-v-584d9993]{background:#f4f4f4;border-radius:10px;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column;padding:15px 30px;margin-top:30px}.cell[data-v-584d9993],.zh[data-v-584d9993]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center}.cell[data-v-584d9993]{height:30px;width:100%}.l[data-v-584d9993]{width:90px;-webkit-flex-shrink:0;flex-shrink:0;font-size:14px}.r[data-v-584d9993]{width:100%;-webkit-flex-shrink:1;flex-shrink:1;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between;font-size:14px}.btn[data-v-584d9993],.r[data-v-584d9993]{display:-webkit-box;display:-webkit-flex;display:flex}.btn[data-v-584d9993]{border:1px solid #999;height:40px;width:100px;font-size:18px;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-align-self:center;align-self:center;margin-top:40px}","",{version:3,sources:["C:/vue/mobile/src/components/Prompt.vue"],names:[],mappings:"AACA,uBACE,eAAgB,AAChB,gBAAiB,AACjB,gBAAiB,AACjB,kBAAmB,AAQnB,yBAA0B,AAC1B,2BAA4B,AACpB,mBAAoB,AAC5B,gBAAiB,AACjB,cAAgB,CACjB,AACD,iDAbE,oBAAqB,AACrB,qBAAsB,AACtB,aAAc,AACd,4BAA6B,AAC7B,6BAA8B,AAC9B,8BAA+B,AACvB,qBAAuB,CAgBhC,AATD,0BACE,WAAa,CAQd,AACD,qBACE,mBAAoB,AACpB,mBAAoB,AAIpB,4BAA6B,AAC7B,6BAA8B,AAC9B,8BAA+B,AACvB,sBAAuB,AAI/B,kBAAmB,AACnB,eAAiB,CAClB,AACD,4CAbE,oBAAqB,AACrB,qBAAsB,AACtB,aAAc,AAKd,yBAA0B,AAC1B,2BAA4B,AACpB,kBAAoB,CAa7B,AATD,uBAIE,YAAa,AAIb,UAAY,CACb,AACD,oBACE,WAAY,AACZ,sBAAuB,AACf,cAAe,AACvB,cAAgB,CACjB,AACD,oBACE,WAAY,AACZ,sBAAuB,AACf,cAAe,AAIvB,yBAA0B,AAC1B,sCAAuC,AAC/B,8BAA+B,AACvC,cAAgB,CACjB,AACD,0CARE,oBAAqB,AACrB,qBAAsB,AACtB,YAAc,CAuBf,AAjBD,sBACE,sBAAuB,AACvB,YAAa,AACb,YAAa,AACb,eAAgB,AAIhB,wBAAyB,AACzB,+BAAgC,AACxB,uBAAwB,AAChC,yBAA0B,AAC1B,2BAA4B,AACpB,mBAAoB,AAC5B,0BAA2B,AACnB,kBAAmB,AAC3B,eAAiB,CAClB",file:"Prompt.vue",sourcesContent:["\n.warp[data-v-584d9993] {\n  padding: 20px 0;\n  min-height: 100%;\n  background: #fff;\n  position: relative;\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n  -webkit-flex-direction: column;\n          flex-direction: column;\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n          align-items: center;\n  overflow-y: auto;\n  font-size: 16px;\n}\n.content[data-v-584d9993] {\n  width: 300px;\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n  -webkit-flex-direction: column;\n          flex-direction: column;\n}\n.zh[data-v-584d9993] {\n  background: #f4f4f4;\n  border-radius: 10px;\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n  -webkit-flex-direction: column;\n          flex-direction: column;\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n          align-items: center;\n  padding: 15px 30px;\n  margin-top: 30px;\n}\n.cell[data-v-584d9993] {\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: flex;\n  height: 30px;\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n          align-items: center;\n  width: 100%;\n}\n.l[data-v-584d9993] {\n  width: 90px;\n  -webkit-flex-shrink: 0;\n          flex-shrink: 0;\n  font-size: 14px;\n}\n.r[data-v-584d9993] {\n  width: 100%;\n  -webkit-flex-shrink: 1;\n          flex-shrink: 1;\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: flex;\n  -webkit-box-pack: justify;\n  -webkit-justify-content: space-between;\n          justify-content: space-between;\n  font-size: 14px;\n}\n.btn[data-v-584d9993] {\n  border: 1px solid #999;\n  height: 40px;\n  width: 100px;\n  font-size: 18px;\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: flex;\n  -webkit-box-pack: center;\n  -webkit-justify-content: center;\n          justify-content: center;\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n          align-items: center;\n  -webkit-align-self: center;\n          align-self: center;\n  margin-top: 40px;\n}\n"],sourceRoot:""}])},205:function(e,t,i){var n=i(187);"string"==typeof n&&(n=[[e.i,n,""]]),n.locals&&(e.exports=n.locals);i(24)("70901679",n,!0)},243:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"warp"},[i("div",{staticClass:"content"},[i("div",{staticStyle:{"font-size":"18px","font-weight":"600"}},[e._v("如何操作？")]),e._v(" "),i("div",{staticStyle:{"margin-top":"10px"}},[e._v("— 请贵公司财务人员向该账户打款")]),e._v(" "),i("div",{staticStyle:{"margin-top":"5px"}},[e._v("— 并告知猴小胖客服人员")]),e._v(" "),e._m(0),e._v(" "),i("div",{staticStyle:{"font-size":"14px","margin-top":"40px",color:"#2570ff"}},[e._v("如有任何问题")]),e._v(" "),i("div",{staticStyle:{"font-size":"14px","margin-top":"5px"}},[e._v("— 致电0571-28121302")]),e._v(" "),i("div",{staticClass:"btn",on:{click:e.back}},[e._v("返回")])])])},staticRenderFns:[function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"zh"},[i("div",{staticClass:"cell"},[i("div",{staticClass:"l"},[e._v("银行账户：")]),e._v(" "),i("div",{staticClass:"r"},[e._v("杭州求否科技有限公司")])]),e._v(" "),i("div",{staticClass:"cell"},[i("div",{staticClass:"l"},[e._v("账　　户：")]),e._v(" "),i("div",{staticClass:"r"},[e._v("201000166793054")])]),e._v(" "),i("div",{staticClass:"cell"},[i("div",{staticClass:"l"},[e._v("开 户 行 ：")]),e._v(" "),i("div",{staticClass:"r"},[e._v("杭州联合银行三墩支行")])])])}]}}});
//# sourceMappingURL=10.cca0b5d7363a7009e027.js.map