webpackJsonp([43],{222:function(t,e,n){n(705);var i=n(11)(n(581),n(788),"data-v-2422ac85",null);t.exports=i.exports},247:function(t,e,n){"use strict";e.__esModule=!0;var i=n(43),s=function(t){return t&&t.__esModule?t:{default:t}}(i);e.default=s.default||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var i in n)Object.prototype.hasOwnProperty.call(n,i)&&(t[i]=n[i])}return t}},449:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"swipeout-button",props:{text:String,backgroundColor:String,type:String,width:{type:Number,default:80}},methods:{onButtonClick:function(){"swipeout-item"===this.$parent.$options._componentTag&&this.$parent.onItemClick(this.text)}}}},450:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(87),s=n.n(i);e.default={name:"swipeout-item",props:{sensitivity:{type:Number,default:0},autoCloseOnButtonClick:{type:Boolean,default:!0},disabled:Boolean,threshold:{type:Number,default:.3},underlayColor:String,transitionMode:{type:String,default:"reveal"}},mounted:function(){var t=this;this.$nextTick(function(){t.render()})},methods:{render:function(){this.target=this.$refs.content,this.$slots["left-menu"]&&(this.hasLeftMenu=!0,this.caculateMenuWidth("left")),this.$slots["right-menu"]&&(this.hasRightMenu=!0,this.caculateMenuWidth("right"))},caculateMenuWidth:function(t){var e=this.$slots[t+"-menu"][0].children.filter(function(t){return t.tag}),n=0;e.forEach(function(t){var e=t.componentOptions?t.componentOptions.propsData:{};n+=e.width||80}),this[t+"MenuWidth"]=n},onContentClick:function(){-1===this.styles.transform.indexOf("(0px, 0, 0)")&&this._setClose(200)},onItemClick:function(){this.autoCloseOnButtonClick&&this._setClose()},start:function(t){if(!this.disabled&&!this.isOpen&&"button"!==t.target.nodeName.toLowerCase()){if("swipeout"===this.$parent.$options._componentTag){var e=this.$parent.$children.filter(function(t){return-1===t.$data.styles.transform.indexOf("(0px, 0, 0)")});if(e.length>0)return e.forEach(function(t){t.setOffset(0,!0)}),void t.preventDefault()}var n=t.touches?t.touches[0]:t;this.pageX=n.pageX,this.pageY=n.pageY}},move:function(t){if(!this.disabled){if("button"===t.target.nodeName.toLowerCase())return void t.preventDefault();if(void 0===this.pageX)return void t.preventDefault();var e=t.touches?t.touches[0]:t;if(this.distX=e.pageX-this.pageX,this.distY=e.pageY-this.pageY,this.direction||(this.direction=this.distX>0?"left":"right"),("right"===this.direction&&this.distX>0&&this.hasRightMenu||"left"===this.direction&&this.distX<0&&this.hasLeftMenu)&&(this.valid=!0,t.preventDefault()),void 0===this.valid&&(this.distX>0&&!1===this.hasLeftMenu?this.valid=!1:this.distX<0&&!1===this.hasRightMenu?this.valid=!1:Math.abs(this.distX)>this.sensitivity||Math.abs(this.distY)>this.sensitivity?this.valid=Math.abs(this.distX)>Math.abs(this.distY):t.preventDefault()),!0===this.valid){if(Math.abs(this.distX)<=this.menuWidth)this.setOffset(this.distX,!1);else{var n=.5*(Math.abs(this.distX)-this.menuWidth),i=(this.menuWidth+n)*(this.distX<0?-1:1);this.setOffset(i,!1)}t.preventDefault()}}},end:function(t){if(!this.disabled&&"button"!==t.target.nodeName.toLowerCase()){if(!0===this.valid){if(this.distX<0&&"right"===this.direction){var e=this.threshold<=1?this.rightMenuWidth*this.threshold:this.threshold;this.distX<-e?(this.setOffset(-this.rightMenuWidth,!0),this.$emit("on-open"),this.isOpen=!0):this._setClose()}else if(this.distX>0&&"left"===this.direction){var n=this.threshold<=1?this.leftMenuWidth*this.threshold:this.threshold;this.distX>n?(this.setOffset(this.leftMenuWidth,!0),this.$emit("on-open"),this.isOpen=!0):this._setClose()}}else this.pageX;this.pageX=this.pageY=this.valid=void 0,this.direction=""}},setOffset:function(t){var e=this,n=arguments.length>1&&void 0!==arguments[1]&&arguments[1],i=arguments[2];if(this.isAnimated=n,!this.disabled||i){if(("right"===this.direction&&t>0||"left"===this.direction&&t<0)&&(t=0),0===t&&setTimeout(function(){e.isOpen=!1},300),t<0&&Math.abs(t)===this.rightMenuWidth?this.distX=-this.rightMenuWidth:t>0&&Math.abs(t)===this.leftMenuWidth&&(this.distX=this.leftMenuWidth),n&&this.target){this.target&&this.target.classList.add("vux-swipeout-content-animated");var s=function(t,e){return function(){e.classList.remove("vux-swipeout-content-animated"),t.isAnimated=!1,e.removeEventListener("webkitTransitionEnd",s),e.removeEventListener("transitionend",s)}}(this,this.target);this.target.addEventListener("webkitTransitionEnd",s),this.target.addEventListener("transitionend",s)}this.styles.transform="translate3d("+t+"px, 0, 0)"}},_setClose:function(){var t=this,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0;this.setOffset(0,!0),this.$emit("on-close"),e?setTimeout(function(){t.isOpen=!1},e):this.isOpen=!1,this.distX=0},open:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"right";this.setOffset("right"===t?-this.rightMenuWidth:this.leftMenuWidth,!0,!0)},close:function(){this.setOffset(0,!0,!0)}},computed:{menuWidth:function(){return!this.hasLeftMenu&&this.hasRightMenu?this.rightMenuWidth:this.hasLeftMenu&&!this.hasRightMenu?this.leftMenuWidth:this.hasLeftMenu&&this.hasRightMenu?this.distX<0?this.rightMenuWidth:this.leftMenuWidth:void 0},buttonBoxStyle:function(){return{backgroundColor:this.underlayColor}},leftButtonBoxStyle:function(){var t=JSON.parse(s()(this.buttonBoxStyle));if("follow"===this.transitionMode){var e=-1===this.styles.transform.indexOf("(0px, 0, 0)")?this.leftMenuWidth-this.distX:this.leftMenuWidth;t.transform="translate3d(-"+e+"px, 0, 0)"}return t},rightButtonBoxStyle:function(){var t=JSON.parse(s()(this.buttonBoxStyle));if("follow"===this.transitionMode){var e=-1===this.styles.transform.indexOf("(0px, 0, 0)")?this.rightMenuWidth-Math.abs(this.distX):this.rightMenuWidth;e<0&&(e=0),this.isAnimated&&(t.transition="transform 0.2s"),t.transform="translate3d("+e+"px, 0, 0)"}return t}},data:function(){return{pageX:void 0,pageY:void 0,distX:0,distY:0,hasLeftMenu:!1,hasRightMenu:!1,animated:!1,isAnimated:!1,isOpen:!1,styles:{transform:"translate3d(0px, 0, 0)"},direction:"",leftMenuWidth:160,rightMenuWidth:160}},watch:{disabled:function(t,e){!0!==t||e||this.setOffset(0,!0,!0)}}}},451:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"swipeout"}},464:function(t,e,n){e=t.exports=n(188)(!0),e.push([t.i,".vux-swipeout{width:100%;overflow:hidden}.vux-swipeout-item{position:relative}.vux-swipeout-button-box{position:absolute;top:0;right:0;bottom:0;left:0;font-size:0;text-align:right}.vux-swipeout-button-box-left{text-align:left}.vux-swipeout-button-box>div{height:100%}.vux-swipeout-button{height:100%;text-align:center;font-size:14px;color:#fff;border:none}.vux-swipeout-content{position:relative;background:#fff}.vux-swipeout-content.vux-swipeout-content-animated{transition:-webkit-transform .2s;transition:transform .2s;transition:transform .2s,-webkit-transform .2s}.vux-swipeout-button-primary{background-color:#1aad19}.vux-swipeout-button-warn{background-color:#e64340}.vux-swipeout-button-default{background-color:#c8c7cd}","",{version:3,sources:["D:/vueProject/wxdemo/node_modules/vux/src/components/swipeout/swipeout.vue"],names:[],mappings:"AA0GA,cACE,WAAY,AACZ,eAAiB,CAClB,AACD,mBACE,iBAAmB,CACpB,AACD,yBACE,kBAAmB,AACnB,MAAO,AACP,QAAS,AACT,SAAU,AACV,OAAQ,AACR,YAAa,AACb,gBAAkB,CACnB,AACD,8BACE,eAAiB,CAClB,AACD,6BACE,WAAa,CACd,AACD,qBACE,YAAa,AACb,kBAAmB,AACnB,eAAgB,AAChB,WAAY,AACZ,WAAa,CACd,AACD,sBACE,kBAAmB,AACnB,eAAiB,CAClB,AACD,oDACE,iCAAmC,AACnC,yBAA2B,AAC3B,8CAAmD,CACpD,AACD,6BACE,wBAA0B,CAC3B,AACD,0BACE,wBAA0B,CAC3B,AACD,6BACE,wBAA0B,CAC3B",file:"swipeout.vue",sourcesContent:["/**\n* actionsheet\n*/\n/**\n* datetime\n*/\n/**\n* tabbar\n*/\n/**\n* tab\n*/\n/**\n* dialog\n*/\n/**\n* x-number\n*/\n/**\n* checkbox\n*/\n/**\n* check-icon\n*/\n/**\n* Cell\n*/\n/**\n* Mask\n*/\n/**\n* Range\n*/\n/**\n* Tabbar\n*/\n/**\n* Header\n*/\n/**\n* Timeline\n*/\n/**\n* Switch\n*/\n/**\n* Button\n*/\n/**\n* swipeout\n*/\n/**\n* Cell\n*/\n/**\n* Badge\n*/\n/**\n* Popover\n*/\n/**\n* Button tab\n*/\n/* alias */\n/**\n* Swiper\n*/\n/**\n* checklist\n*/\n/**\n* popup-picker\n*/\n/**\n* popup\n*/\n/**\n* popup-header\n*/\n/**\n* form-preview\n*/\n/**\n* load-more\n*/\n/**\n* sticky\n*/\n/**\n* group\n*/\n/**\n* toast\n*/\n/**\n* icon\n*/\n/**\n* calendar\n*/\n/**\n* search\n*/\n/**\n* radio\n*/\n.vux-swipeout {\n  width: 100%;\n  overflow: hidden;\n}\n.vux-swipeout-item {\n  position: relative;\n}\n.vux-swipeout-button-box {\n  position: absolute;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  font-size: 0;\n  text-align: right;\n}\n.vux-swipeout-button-box-left {\n  text-align: left;\n}\n.vux-swipeout-button-box > div {\n  height: 100%;\n}\n.vux-swipeout-button {\n  height: 100%;\n  text-align: center;\n  font-size: 14px;\n  color: #FFF;\n  border: none;\n}\n.vux-swipeout-content {\n  position: relative;\n  background: #FFF;\n}\n.vux-swipeout-content.vux-swipeout-content-animated {\n  transition: -webkit-transform 0.2s;\n  transition: transform 0.2s;\n  transition: transform 0.2s, -webkit-transform 0.2s;\n}\n.vux-swipeout-button-primary {\n  background-color: #1AAD19;\n}\n.vux-swipeout-button-warn {\n  background-color: #E64340;\n}\n.vux-swipeout-button-default {\n  background-color: #c8c7cd;\n}\n"],sourceRoot:""}])},473:function(t,e,n){var i=n(464);"string"==typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);n(189)("32bf9cb6",i,!0)},477:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"vux-swipeout-item",on:{touchstart:t.start,mousedown:t.start,touchmove:t.move,mousemove:t.move,touchend:t.end,mouseup:t.end,touchcancel:t.end}},[n("div",{directives:[{name:"show",rawName:"v-show",value:t.distX>=0,expression:"distX >= 0"}],staticClass:"vux-swipeout-button-box vux-swipeout-button-box-left",style:t.leftButtonBoxStyle},[t._t("left-menu")],2),t._v(" "),n("div",{directives:[{name:"show",rawName:"v-show",value:t.distX<=0,expression:"distX <= 0"}],staticClass:"vux-swipeout-button-box",style:t.rightButtonBoxStyle},[t._t("right-menu")],2),t._v(" "),n("div",{ref:"content",staticClass:"vux-swipeout-content",style:t.styles,on:{mousedown:t.onContentClick,touchstart:t.onContentClick}},[t._t("content")],2)])},staticRenderFns:[]}},482:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement;return(t._self._c||e)("button",{staticClass:"vux-swipeout-button",class:{"vux-swipeout-button-primary":"primary"===t.type,"vux-swipeout-button-warn":"warn"===t.type,"vux-swipeout-button-default":"default"===t.type},style:{width:t.width+"px",backgroundColor:t.backgroundColor},attrs:{type:"button"},on:{click:t.onButtonClick}},[t._t("default",[t._v(t._s(t.text))])],2)},staticRenderFns:[]}},484:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement;return(t._self._c||e)("div",{staticClass:"vux-swipeout"},[t._t("default")],2)},staticRenderFns:[]}},492:function(t,e,n){var i=n(11)(n(449),n(482),null,null);t.exports=i.exports},493:function(t,e,n){var i=n(11)(n(450),n(477),null,null);t.exports=i.exports},494:function(t,e,n){n(473);var i=n(11)(n(451),n(484),null,null);t.exports=i.exports},581:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(247),s=n.n(i),o=n(88),a=n(492),r=n.n(a),u=n(494),d=n.n(u),h=n(493),l=n.n(h);e.default={name:"legwork",data:function(){return{classDatas:[],items:{textAlign:"left",padding:"10px 10px",alignItems:"center"}}},watch:{temp:function(t){t.indexOf("loadClass")>=0&&this.loadData()}},components:{SwipeoutButton:r.a,Swipeout:d.a,SwipeoutItem:l.a},computed:s()({},n.i(o.b)({temp:function(t){return t.temp}})),created:function(){this.loadData()},methods:{loadData:function(){var t={operateType:"getClassLists"};this.util.mask();var e=this;this.util.post("/admin/appAgentAction!runAgent.action?agentId=Agent_WeChat_CheckWork&appId=WeChat",t,function(t){e.util.unmask(),200==t.status&&(e.classDatas=t.data)})},addClass:function(){var t={name:"默认班次",timeFrameName:"默认时段",signTime:"08:00",signOutTime:"18:00",checkDayName:"工作日",memberStr:"",memberArr:[],pointName:"",pointId:"",monday:!0,tuesday:!0,wednesday:!0,thursday:!0,friday:!0,Sat:!1,weekday:!1};this.$router.push({name:"classEdit",query:{classData:t}})},gotoClassEdit:function(t){t.memberArr=void 0==t.member?[]:t.member.split(","),t.memberStr=this.util.isNotEmpty(t.memberStr)?t.memberStr:"",t.monday=1==t.monday,t.tuesday=1==t.tuesday,t.wednesday=1==t.wednesday,t.thursday=1==t.thursday,t.friday=1==t.friday,t.sat=1==t.sat,t.weekday=1==t.weekday,this.$router.push({name:"classEdit",query:{classData:t}})},deleteClass:function(t){var e=this;this.util.confirm("确定要删除此班次?",function(){e.util.mask("正在删除..."),e.util.post("/wx/register/deleteClass",{classId:t.id},function(n){n.status?(e.util.unmask(),e.classDatas=e.classDatas.filter(function(e){return e!=t})):(e.util.unmask(),e.util.alert("删除失败！"))})})}}}},630:function(t,e,n){e=t.exports=n(188)(!0),e.push([t.i,".anyidian[data-v-2422ac85]{color:#9f9f9f}.demo-content[data-v-2422ac85]{border-bottom:1px solid #eee}","",{version:3,sources:["D:/vueProject/wxdemo/src/components/sign/SetClassList.vue"],names:[],mappings:"AACA,2BACE,aAAe,CAChB,AACD,+BACE,4BAA8B,CAC/B",file:"SetClassList.vue",sourcesContent:["\n.anyidian[data-v-2422ac85] {\n  color: #9f9f9f;\n}\n.demo-content[data-v-2422ac85] {\n  border-bottom: 1px solid #eee;\n}\n"],sourceRoot:""}])},705:function(t,e,n){var i=n(630);"string"==typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);n(189)("71583d78",i,!0)},788:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"page__hd"},[n("swipeout",[n("div",{staticClass:"row",staticStyle:{margin:"0",overflow:"auto"}},t._l(t.classDatas,function(e,i){return n("swipeout-item",{key:i,attrs:{threshold:.5,"underlay-color":"#ccc"}},[n("div",{slot:"right-menu"},[n("swipeout-button",{attrs:{type:"warn"},nativeOn:{click:function(n){t.deleteClass(e)}}},[t._v("删除")])],1),t._v(" "),n("div",{staticClass:"demo-content vux-1px-t",staticStyle:{"text-align":"left",padding:"5px 10px 5px 5px"},on:{click:function(n){t.gotoClassEdit(e)}},slot:"content"},[n("div",[n("div",{},[n("span",{staticClass:"anyidian"},[t._v("班次名称:")]),t._v(" "),n("span",{staticStyle:{"font-size":"14px",color:"#101001"}},[t._v(t._s(e.name))])]),t._v(" "),n("div",{},[n("span",{staticClass:"anyidian"},[t._v("考勤时段:")]),t._v(" "),n("span",{staticStyle:{"font-size":"14px",color:"#101001"}},[t._v(t._s(e.signTime.substring(0,5))+"-"+t._s(e.signOutTime.substring(0,5)))])])])])])}))]),t._v(" "),n("div",{staticClass:"navbar navbar-default navbar-fixed-bottom",staticStyle:{background:"#336699"}},[n("p",{staticStyle:{"margin-top":"15px",color:"#fff"},on:{click:t.addClass}},[n("i",{staticClass:"glyphicon glyphicon-edit",staticStyle:{"padding-right":"5px","font-size":"16px"}}),t._v("添加班次")])])],1)},staticRenderFns:[]}}});
//# sourceMappingURL=43.33fe0d54fc3aba8e1c94.js.map