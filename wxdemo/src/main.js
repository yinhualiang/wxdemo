// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import '@/public/scss/jrstyle.scss'
import '@/public/css/jrstyle.css'
import '@/public/css/mystyle.css'
import '@/public/js/jrmain.js'
import aliIcons from '@/public/js/iconfont1.js';
import Vue from 'vue'
import App from './App'
import router from './router'
import mint from './mint'
//import ele from './ele'
import store from './store'

//import $ from 'jquery'
//import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css'
//import 'bootstrap/dist/js/bootstrap.min.js'
import 'weui/dist/style/weui.min.css'
import aliIcon from './public/js/iconfont.js';

import { AlertPlugin } from 'vux'
import { LoadingPlugin } from 'vux'
import { ToastPlugin } from 'vux'
import { ConfirmPlugin } from 'vux'
import { util, validUtil, cookieUtil, sessionUtil } from '@/utils/utils.js'
//import wx from 'weixin-js-sdk'
// import '../node_modules/weixin-js-sdk/index.js'
//import FastClick from 'fastclick' 导入fastclick 解决移动端点击事件延迟问题
// FastClick.attach(document.body);
Vue.config.productionTip = false
Vue.use(require('vue-wechat-title'))
var wx = require('weixin-js-sdk');
//var weui =require('./src/assets/js/weui.min.js')
Vue.prototype.wx = wx;
Vue.use(AlertPlugin);
Vue.use(LoadingPlugin);
Vue.use(ToastPlugin);
Vue.use(ConfirmPlugin)
Vue.prototype.util = util;
Vue.prototype.validUtil = validUtil;
Vue.prototype.baseUrl = util.getBaseUrl();
Vue.prototype.sessionUtil = sessionUtil;
/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    mint,
    //ele,
    store,
    template: '<App/>',
    created() {
        //this.$store.state.session = new Object();
        //cookieUtil.clear("chesijian");
        /**/
        window.suite_id = util.getUrlParam("suite_id");
        window.corp_id = util.getUrlParam("corp_id");
        window.agent_id = util.getUrlParam("agent_id");
        window.company_id = util.getUrlParam("company_id");
        window.access_code = util.getUrlParam("code");
        window.access_securt = util.getUrlParam("access_securt");

        // window.corp_id = "ww2e3b75e2789fb4ec";
        // window.company_id = "00002";
        // window.agent_id = "1000002";
        // window.access_securt = "00002001";

        window.corp_id = "wxf1d14bbc39dd630b";
        window.company_id = "00012";
        window.agent_id = "1000002";
        window.access_securt = "00012039";

        // window.corp_id = "ww4a63604e45553356";
        // //window.company_id = "00005";
        // window.company_id = "000051301";
        // window.agent_id = "1000004";
        // window.access_securt = "00005123";


        // window.corp_id = "ww9c2329d6cf24147c";
        // window.company_id = "00005";
        // window.agent_id = "1000024";
        // window.access_securt = "00005001";

        // window.corp_id = "ww9c2329d6cf24147c";
        // window.company_id = "00005";
        // window.agent_id = "1000024";
        // window.access_securt = "00005001";

        //cookieUtil.set("access_securt", "18922748551", 24 * 60 * 60);
        //cookieUtil.set("access_securt", "slx", 24 * 60 * 60);
        this.$store.state.session = this.util.getSessionData();
        var session = this.$store.state.session;
        console.debug(session);     
        window.session = session;
        this.$store.state.userName = session.user.userName;
        //this.util.alert("当前登录人是："+this.$store.state.userName);
        this.$store.state.userUid = session.user.id;
        this.$store.state.userId = session.user.userId;
        this.$store.state.companyUid = session.company.id;
        this.$store.state.avatar = session.user.picture;
        
        // console.info(this.$store.state.session);
        //this.$store.state.session.code = this.util.getUrlParam("code");
        //console.info("this.$store.state.session.code" + this.$store.state.session.code);
    },
    components: { App }
})