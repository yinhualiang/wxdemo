<template>
	<div style="overflow: auto;height: 100%;background: #eee;text-align: left;">

		<div class="my-cells" style="margin-top: 0px;">

      <div class="weui-cell weui-cell_select myCell" >
        <div class="weui-cell__hd"><span>项目名称</span><span style="color:red">*</span></div>
        <div class="weui-cell__bd">
          <div class="weui-cell__bd myCell-bd" style="padding-top: 5px;padding-right: 10px;" @click="cations()" >
            <span>{{cation.qiyige.payeename}}</span>
          </div>
        </div>
      </div>
			<div class="weui-cell myCell">
				<div class="weui-cell__hd"><span>施工单位</span></div>
				<div class="weui-cell__bd">
          <div class="weui-cell__bd myCell-bd" style="padding-top: 5px;padding-right: 10px;" @click="chooseSGDW()" >
            <span>{{sgdw.qiyige.sgdw}}</span>
          </div>
				<!--	<input class="weui-input" :readonly="isReadOnly"  style="text-align: right;" v-model="mainData.sgdw" type="text">-->
				</div>
			</div>
			<div class="weui-cell myCell">
				<div class="weui-cell__hd"><span>检查人</span></div>
				<div class="weui-cell__bd">
          <span>{{mainData.jcr}}</span>
			<!--		<input class="weui-input" :readonly="isReadOnly"  style="text-align: right;" v-model="userName" type="text">-->
				</div>
			</div>

      <div class="weui-cell myCell">
        <div class="weui-cell__hd"><span>检查时间</span></div>
        <div class="weui-cell__bd">
          <!--<span>{{userName}}</span>-->
          <datetime title="" class="be-check no-line"  :readonly="isReadOnly" v-model="mainData.jcrq" style="padding:0px;padding-right:0px;height:100%;line-height:44px;" default-selected-value="date" format="YYYY-MM-DD" placeholder="请选择日期"></datetime>
          <!--		<input class="weui-input" :readonly="isReadOnly"  style="text-align: right;" v-model="userName" type="text">-->
        </div>
      </div>
		</div>

    <!--<div class="my-cells">
    <div class="weui-cell  weui-cell_select  myCell">
      <div class="weui-cell__hd"><span>检查项</span></div>
      <div class="weui-cell__bd">
        <select class="weui-select" :readonly="isReadOnly" v-model="checkItem.itemName"  @click="chioseCheckquestion()"  name="select1">
          <option v-for="shopitem in checkItems" :value="shopitem">{{shopitem}}</option>
        </select>
      </div>
    </div>
    </div>-->

    <div v-for="check in checkData" >
      <div class="weui-panel__bd" style="text-align: left; border-top-width: 1px; border-top-style: solid; border-top-color: rgb(238, 238, 238);background-color: white" @click="showCheckDetailList(check)">
        <div class="weui-media-box weui-media-box_appmsg" style="padding: 5px;">
          {{check.mc}} - {{check.bzmc}}
        </div>
      </div>
      <div v-show='check.show' style="background-color: white">
        <div class="details " style="padding:0px 3px;background:#eee">
          <div class="details-title">
            <div style="padding-top: 8px;">
              <!-- <p v-if="!isReadOnly" style="color:#f00;float:right" @click.stop="remove(xiala)">-删除</p>-->
            </div>
          </div>
        </div>
        <div class="weui-cell">
          <div class="weui-cell__bd" ><span>检查关键点：</span></div>
          <div class="weui-cell__bd" >
            {{check.bzms}}
          </div>
        </div>
        <div   class="weui-cell myCell" >
          <div class="weui-cell__hd" ><span>是否合格：</span></div>
          <div class="weui-cell__bd" >
            <check-icon :value.sync="check.qualified"> </check-icon>
          </div>
        </div>
        <div class="weui-cell myCell" style="border-bottom: 1px solid darkgray">
          <div class="weui-cell__hd" ><span>说明：</span><span style="color:red">*</span></div>
          <div class="weui-cell__bd" >
            <input class="weui-input" :readonly="isReadOnly"  style="text-align: right;width:90%;" v-model="check.desc" type="text">
          </div>
        </div>
        <div class="my-cells">
          <Attachment :model="attachmentModel"></Attachment>
        </div>
      </div>
    </div>

		<!-- <VoiceRecognition :model="voiceRecognition"></VoiceRecognition> -->
		<!--<div class="my-cells" style="padding-left: 6px;">
			<Attachment :model="attachmentModel"></Attachment>
		</div>-->
		<mt-popup v-model="selectProjModel.selectProjVisible" position="right" popup-transition="popup-fade" style="width:100%;height:100%">
			<SelectProj :mess="selectProjModel" @selectProjCallback="selectProjCallback($event)"></SelectProj>
		</mt-popup>
		 <mt-popup v-model="addressObj.addressVisible" position="right" popup-transition="popup-fade" style="width:100%;height:100%">
			<ChooseAddress :address="addressObj" ref="addressfile" @chooseAddress="chooseAddress($event)"></ChooseAddress>
		</mt-popup>
		<mt-popup v-model="userModel.visible" position="right" popup-transition="popup-fade" style="width:100%;height:100%">
			<SelectUser :userModel="userModel" ref="profile" ></SelectUser>
		</mt-popup>
		<mt-popup v-model="departModel.visible" position="right" popup-transition="popup-fade" style="width:100%;height:100%">
			<selectQuarters :orgModel="departModel" ref="departSel"></selectQuarters>
		</mt-popup>

    <mt-popup position="right" v-model="cation.visible" popup-transition="popup-fade" style="width:100%;height:100%">
      <ConstructionUser  :caModel="cation"  ></ConstructionUser>
    </mt-popup>

    <mt-popup position="right" v-model="sgdw.visible" popup-transition="popup-fade" style="width:100%;height:100%">
      <applicationforconstruction :appModel="sgdw" :userId="userModel.userUid"></applicationforconstruction>
    </mt-popup>

		<div class="footer">
			<p style="padding:0 5px;">
				  <button  @click="saveData(1)" class="weui-btn weui-btn_mini weui-btn_default cancelBtn">取消</button>
				  <button  @click="saveData()" class="weui-btn weui-btn_mini weui-btn_primary submitBtn">确定</button>
			</p>
		</div>

	</div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import { Datetime, CheckIcon} from 'vux';
import Attachment from '../common/Attachment.vue'
 import ChooseAddress from '../common/ChooseAddress.vue'
import SelectUser from '../common/SelectUser.vue'
import selectQuarters from '../common/selectQuarters.vue'
import VoiceRecognition from '../common/VoiceRecognition.vue'
import SelectProj from '../common/SelectProj.vue'
import ConstructionUser from '../common/ConstructionUser.vue'
import Applicationforconstruction from '../common/Applicationforconstruction.vue'
export default {
	name: 'movebx',
	data() {
		return {
			selectProjModel:{projUid:"",selectProjVisible:false,xmmc:''},
			addressObj:{
				addressVisible:false,
			},
			symbol:'sn,CCSQ',
			formId:"DForm_XM008_sggl_xcjc",
			sqlTableName:"G006_sggl_xcjc",
			mainData:{
				SN_:'',
				SUBJECT_:'现场检查',
				ENABLE_:1,
        xmmc: '',
        jcr: '',
        jcrq: '',
        sgdw: '',
        xmbh: '',
        xmid: ''
			},
			mainData1:{
        gjjcd: '',
        sfhg: false,
        sm: '',
        lb: '',
        jcx: ''
			},
			userModel:{
				visible:false,
				sqr:'',
				userUid:'1',
				users:[]
			},
			children:[],
			departModel: {
				departName: this.sessionUtil.getDepartName(this),
				departUid: this.sessionUtil.getDepartUid(this),
				visible: false
			},
			attachmentModel: {
				isReadOnly: false,
				xtype:'file',
				title: '附件',
				fileList: [],
				deleteFilesList: []
			},
			assignee: '',
			isReadOnly: true,//是否只读
			isNewFlag: true,//是否是新增
			id: '',
			voiceRecognition: {
				title: '备注',
				allowBlank: false,
				isReadOnly: false,
				placeholder: '请输入详情...',
				content: ''
			},
      cation:{
        visible:false,
        qiyige:{
          name:'',

        },
        xinxi:{
          xmdd:'',
          xxdz:'',
          xgdw:'',
          sjs:'',
          htmj:'',
          jcrq:'',
          xmid:'',
          xmbh:'',
          jgrq:'',
          kgrq:''
        },
        id:'',
        item:{},
        list:{}

      },
      sgdw:{
          visible: false,
          qiyige: {
            sgdw: ''
          }
      },
      checkData: [],
      checkItemList: []
		}
	},
	created() {
		// this.util.initWxJsSdk(this);
    this.feileiData();
    this.selectCheckItems();
	},
	activated() {
		this.util.init(this);
		this.mainData={czy:this.sqr,SUBJECT_:'',ENABLE_:1};
		this.userModel.sqr = '';
		this.userModel.userUid = '';
		this.departModel.departName= this.sessionUtil.getDepartName(this);
		this.departModel.departUid= this.sessionUtil.getDepartUid(this);
		var id = this.util.getUrlParam("id");
		var isReadOnlyParam = this.util.getUrlParam("isReadOnly");
		this.isReadOnly = (this.validUtil.isNotEmpty(isReadOnlyParam) && isReadOnlyParam == "true") ? true : false;
		this.isNewFlag = (this.validUtil.isNotEmpty(id)) ? false : true;
		this.attachmentModel.isReadOnly = this.isReadOnly;
		this.id = id;
		this.loadData();
    this.mainData.jcrq=new Date().format("yyyy-MM-dd");
	},
	components: {
		// 名字
    ChooseAddress,Attachment,SelectUser,Datetime,selectQuarters,VoiceRecognition,SelectProj,ConstructionUser,Applicationforconstruction,CheckIcon
	},
	computed: {
		...mapState({
			userName: state => state.userName
		})

	},
	methods: {

    feileiData(){
      var param ={};
        this.util.post('/admin/appAgentAction!runAgent.action?agentId=Agent_XM008_xmb&type=getInfo&sqlWhere=&node=root', param, (res)=> {
        this.util.unmask();
        this.cation.list=res;
      });
    },
		remove(child) {
			this.children = this.children.filter((item) => {
				return item != child;
			});
			this.totalamount();
		},
		add() {
			for (var i in this.children) {
				this.children[i].show = false;
			}
			this.children.push({
				code: '',
				selectNum:0,
				name: '',
				specs: '',
				unit: '',
				DATA_TYPE_: "add",
				cbmc: "1321513215",
				show: true
			});
		},
		...mapActions([
			'selectProj'
		]),
		hide(child) {
			child.show = false;
		}, show(child) {
			for (var i in this.children) {
				this.children[i].show = false;
			}
			child.show = true;
		},
		selectProjCallback(){
			this.mainData.SUBJECT_=this.selectProjModel.xmmc+"_"+new Date().format("yyyyMMdd")+"采购订单";
		},
		selectOutWorker(){
			this.userModel.visible=true;
			this.$refs.profile.postMsg({singer:true,radioCheckedArr:[]});
		},
		chooseAddress(data){
			this.mainData.dd=data.address;

		},
		selectAddress(){
			this.locationAgain();
			this.addressObj.addressVisible=true;

		},
		selectDepart() {
			this.$refs.departSel.postMsg({ singer: true, radioCheckedArr: [] })
			this.departModel.visible = true;
		},
		locationAgain(){
			if(this.validUtil.isNotEmpty(this.mainData.ADDR_LOCATION_)){
				this.$refs.addressfile.locationAgain(this.mainData.ADDR_LOCATION_);
				return;
			}
			var _this = this;
			this.wx.getLocation({
				type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
				success: function (res) {
					var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
					var longitude = res.longitude ; // 经度，浮点数，范围为180 ~ -180。
					var speed = res.speed; // 速度，以米/每秒计
					var accuracy = res.accuracy; // 位置精度
					var lnglat = new AMap.LngLat(longitude,latitude);
					AMap.convertFrom(lnglat,"gps",function(status,result){

							var latlng = result.locations[0];
							//保存坐标
							var curLat = latlng.getLat();//当前高德维度
							var curLng = latlng.getLng();//当前高德经度

							_this.location=curLng+","+curLat;
							_this.$refs.addressfile.locationAgain(_this.location)
						}
					);


				}

			});
		},
		loadData() {
			var _this = this;
			if (!this.isNewFlag) {
				this.util.mask("正在加载...");
        this.util.initData({id:this.id ,sqlTableName:this.sqlTableName},function(data){
          _this.util.unmask();
          _this.userModel.sqr = data.sqr;
          _this.userModel.userUid = data.userid;
          _this.departModel.departName = _this.mainData.depart;
          _this.mainData = data;
          _this.sgdw.qiyige.sgdw =  _this.mainData.sgdw
          _this.cation.qiyige.payeename=data.xmmc;
          });
        /*查询检查明细数据*/
        var operateType;
        var pid;
        var param ={operateType: "xcjcInfo",pid: _this.id};
        this.util.post('/admin/appAgentAction!runAgent.action?agentId=Agent_WeChat_MobileDetailsInfo&type=getInfo&sqlWhere=&node=root', param, (res)=> {
          this.util.unmask();
          this.checkData = []
          console.log("res.data: " ,res.data)
          var data = res.data
          var flag = false
          for (var i in data) {
              if (this.checkData != null) {
                  for (var j in  this.checkData) {
                    if (this.checkData.bzmc === data.jcx) {
                        flag = true
                        break
                    }
                  }
              }
              var d  = {}
              d.mc = data[i].lb
              d.bzmc = data[i].jcx
              d.bzms = data[i].gjjcd
              if (data[i].sfhg === "true") {
                d.qualified = true
              } else {
                d.qualified = false
              }
              d.show = false
              d.desc = data[i].sm
              this.checkData.push(d)
          }
        });
			} else {
        _this.mainData.jcr = _this.userName
        _this.cation.qiyige.payeename = ''
        _this.mainData.xmmc = ''
        _this.mainData.sgdw = ''
        _this.sgdw.qiyige.sgdw = ''
      }
		},
		checkValid() {
			// if(!this.validUtil.isNotEmpty(this.userModel.userUid)){
			// 	this.util.failueToast('请选择出差人');
			// 	return false;
			// }
			// if(!this.validUtil.isNotEmpty(this.departModel.departName)){
			// 	this.util.failueToast('请输入部门');
			// 	return false;
			// }

			// if(!this.validUtil.isNotEmpty(this.mainData.ccts)){
			// 	this.util.failueToast('请输入出差天数');
			// 	return false;
			// }
			return true;
		},
		saveData(flag){
			if (flag == 1) {
				history.back();
				return;
			}
			if(!this.checkValid()){
				return;
			}
   /*   this.mainData.xmid = this.cation.xinxi.xmid
      this.mainData.xmmc = this.cation.qiyige.payeename
      this.mainData.jcr = this.userName
      this.mainData.sgdw = this.sgdw.qiyige.xmmc
      this.mainData.xmbh = this.cation.xinxi.xmbh*/
      this.mainData.sgdw = this.sgdw.qiyige.sgdw
      this.mainData.xmmc = this.cation.qiyige.payeename
			var filesData = new Array();
			for (var i=0;i< this.attachmentModel.fileList.length;i++) {
				var file = this.attachmentModel.fileList[i];
				if (file.isNewFlag) {
					filesData.push(file);
				}
			}

			for (var i in this.checkData) {
			    if (this.checkData[i].qualified ||this.checkData[i].desc) {
			        var mainData1 = {}
			        mainData1.gjjcd = this.checkData[i].bzms
              mainData1.xmid  =  this.cation.xinxi.xmid
              mainData1.sfhg = this.checkData[i].qualified
              mainData1.sm = this.checkData[i].desc
              mainData1.lb = this.checkData[i].mc
              mainData1.jcx =  this.checkData[i].bzmc
			        this.checkItemList.push(mainData1);
          }
      }
			var subForm = { subFormId: 'subForm1', subFormForeignKey: 'pid', subFormTable: 'G006_sggl_xcjcdet' ,fsrq:'2015-05-18'};
			var detData = this.checkItemList;
			subForm.data = JSON.stringify(detData);
			var subFormData = new Array();
			subFormData.push(subForm);

			var _this=this;
			this.util.mask('正在保存...');
			var params = { sqlTableName: "G006_sggl_xcjc",subFormData: JSON.stringify(subFormData), mainFormData: JSON.stringify(this.mainData), filesData: JSON.stringify(filesData), deleteFilesData: _this.attachmentModel.deleteFilesList.join(",") };
			if (this.validUtil.isNotEmpty(this.id)) {
				params['id'] = this.id;
				params['businessKey'] = this.id;
			}
			params['symbol'] = this.symbol;
			params['formId'] = this.formId;
			params['subject'] = "现场检查";
			this.util.post("/admin/appDefaultFormAction!saveData.action",params,function(result){
					if(result.success){
						_this.util.unmask();
						_this.util.setTemp(_this,"loadOutWorkList"+Math.random().toString(36).substr(2));
						history.back();
					}else{
						if(status!=1){
							_this.util.unmask();
						}
						_this.util.alert(result.msg);
					}
				});
				return params;
		},
    cations(){
      this.cation.visible=true;
      // this.$r(efs.classcation.postMsg({selectCation:{}});
    },
    chooseSGDW() {
        this.sgdw.visible = true
    },
    //查询检查项
    selectCheckItems(){
      var param ={operateType:'xcjcInfo'};
      this.util.post('/admin/appAgentAction!runAgent.action?agentId=Agent_WeChat_Mobile&type=getInfo&sqlWhere=&node=root', param, (res)=> {
        this.util.unmask();
        console.log("res:",res)
        for (var i in   res.data) {
          var data = {}
          data.bzmc = res.data[i].bzmc
          data.mc  = res.data[i].mc
          data.bzms = res.data[i].bzms
          data.show = false
          data.qualified = false
          data.desc = ''
          this.checkData.push(data)
        }
        console.log("res.data : ", this.checkData)
      });
    },
    showCheckDetailList (check) {
        for (var i in this.checkData) {
            if (this.checkData[i].bzmc !== check.bzmc) {
              this.checkData[i].show = false
            } else if (this.checkData[i].bzmc === check.bzmc) {
              this.checkData[i].show = true
            }
        }
    }
	}
}
</script>

<style lang="scss" scoped>

// .myCell-bd {
//     height: 100%;
//     padding-top: 4px;
//     padding-right: 5px;
// }
.pop{
	height: 48px;
	padding-left: 0px;
	line-height: 48px;
	border-top: 1px solid #eee; //
}

.pop {
	.daright {
		text-align: right;
	}
}
.pop>span{
	padding: 0 0 0 10px;
}

.cancelBtn {
	width:48%;
	height: 45px;
	border: 1px solid #ccc;
}
.submitBtn{
	width:48%;
	height: 45px;
}
.destination input{
	width: 90%;
	text-align: right;
}
.destination i{
	padding: 10px 0 10px 10px;
	position: absolute;
	top:-15px;
	right:36px;
	height: 48px;
	line-height: 48px;
}
.destination s{
	width: 10%;
	height: 41px;
	display: block;
	position: absolute;
	line-height: 41px;
	right:0px;
	text-decoration: none;
	padding-right: 19px;
}
.destination s::before{
	color:#2f7dcd;
}
.destination s:active{
	background: #ECECEC;
}


.footer {
	height: 70px;
	// padding-top: 10px;
	background: #eee;
	line-height: 42px;
}
.weui-select{
	height:100%;
	line-height:28px;
	direction: rtl;
	padding: 0 8px;
    box-sizing: border-box;
}
</style>
