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
			<!-- <div class="weui-cell weui-cell_select myCell">
				<div class="weui-cell__hd"><span>申请人</span><span style="color:red">*</span></div>
				<div class="weui-cell__bd myCell-bd" style="line-height: 26px;" @click="selectOutWorker()">
					<span>{{userModel.sqr}}</span>
				</div>
			</div> -->
			<div class="weui-cell  myCell">
				<div class="weui-cell__hd"><span>工程区域</span><span style="color:red">*</span></div>
				<div class="weui-cell__bd" style="padding-right: 0px;">
					<span>{{cation.xinxi.xmdd}}</span>
				</div>
			</div>
			<div class="weui-cell  myCell">
				<div class="weui-cell__hd"><span>详细地址</span><span style="color:red">*</span></div>
				<div class="weui-cell__bd" style="padding-right: 0px;">
					<span>{{cation.xinxi.xxdz}}</span>
				</div>
			</div>
			<div class="weui-cell  myCell">
				<div class="weui-cell__hd"><span>施工单位</span><span style="color:red">*</span></div>
				<div class="weui-cell__bd" style="padding-right: 0px;">
					<input :readonly="isReadOnly" v-model="mainData.sgdw" type="text" style="text-align: right;">
				</div>
			</div>
			<div class="weui-cell  myCell">
				<div class="weui-cell__hd"><span>设计师</span><span style="color:red">*</span></div>
				<div class="weui-cell__bd" style="padding-right: 0px;">
					<span>{{cation.xinxi.sjs}}</span>
				</div>
			</div>
			
			<div class="weui-cell  myCell">
				<div class="weui-cell__hd"><span>合同面积</span><span style="color:red">*</span></div>
				<div class="weui-cell__bd" style="padding-right: 0px;">
					<span>{{cation.xinxi.htmj}}</span>
				</div>
			</div>
			<div class="weui-cell  myCell">
				<div class="weui-cell__hd"><span>交场日期</span><span style="color:red">*</span></div>
				<div class="weui-cell__bd" style="padding-right: 0px;">
					<span>{{cation.xinxi.jcrq}}</span>
				</div>
			</div>
			<!-- <div class="weui-cell weui-cell_select myCell">
				<div class="weui-cell__hd"><span>目的地</span><span style="color:red">*</span></div>
				<div class="weui-cell__bd" style="padding-right: 0px;">
					<input :readonly="isReadOnly" v-model="mainData.mdd" type="text" style="text-align: right;">
				</div>
			</div> -->
			
		</div>
		<div class="my-cells" >
			<div class="weui-cell  weui-cell_select  myCell">
				<div class="weui-cell__hd"><span>现场是否满足进场:</span></div>
				<div class="weui-cell__bd">
					<select class="weui-select" :readonly="isReadOnly" v-model="mainData.xctj" name="select1">
						<option  value="满足">满足</option>
						<option  value="不满足">不满足</option>
					</select>
				</div>
			</div>
			<div class="weui-cell  weui-cell_select  myCell">
				<div class="weui-cell__hd"><span>政府报批手续是否已满足进场条件:</span></div>
				<div class="weui-cell__bd">
					<select class="weui-select" :readonly="isReadOnly" v-model="mainData.zfbp" name="select1">
						<option  value="满足">满足</option>
						<option  value="不满足">不满足</option>
					</select>
				</div>
			</div>
			<div class="weui-cell  weui-cell_select  myCell">
				<div class="weui-cell__hd"><span>设计图纸是否满足开工条件:</span></div>
				<div class="weui-cell__bd">
					<select class="weui-select" :readonly="isReadOnly" v-model="mainData.sjtz" name="select1">
						<option  value="满足">满足</option>
						<option  value="不满足">不满足</option>
					</select>
				</div>
			</div>
			<!-- <a class="weui-cell weui-cell_access" href="javascript:;" style="height: 48px;">
				<div class="weui-cell__bd">
					<p style="margin: 0;">出发时间</p>
				</div>
				<div class="weui-cell__ft"><input class="weui-input" type="time" id="onDutyTime" :value="mainData.sj" /></div>
			</a>
			<div class="weui-cell myCell" >
				<div class="weui-cell__hd"><span>申请日期</span><span style="color:red">*</span></div>
				<div class="weui-cell__bd">
					<datetime title="" class="be-check no-line" :readonly="isReadOnly" v-model="mainData.fsrq" style="padding:0px;padding-right:0px;height:100%;line-height:44px;" default-selected-value="date" format="YYYY-MM-DD" placeholder="请选择日期"></datetime>
				</div>
			</div>
			<div class="weui-cell myCell" >
				<div class="weui-cell__hd"><span>出发日期</span><span style="color:red">*</span></div>
				<div class="weui-cell__bd">
					<datetime title="" class="be-check no-line" :readonly="isReadOnly" v-model="mainData.cfrq" style="padding:0px;padding-right:0px;height:100%;line-height:44px;" default-selected-value="date" format="YYYY-MM-DD" placeholder="请选择日期"></datetime>
				</div>
			</div> -->
			
			
		</div>
		
		
		<!-- <div class="my-cells" style="padding-left: 6px;">
			<Attachment :model="attachmentModel"></Attachment>	
		</div>
		<VoiceRecognition :model="voiceRecognition"></VoiceRecognition> -->
		
		<mt-popup v-model="addressObj.addressVisible" position="right" popup-transition="popup-fade" style="width:100%;height:100%">
			<ChooseAddress :address="addressObj" ref="addressfile" @chooseAddress="chooseAddress($event)"></ChooseAddress>
		</mt-popup>
		<mt-popup v-model="userModel.visible" position="right" popup-transition="popup-fade" style="width:100%;height:100%">
			<SelectUser :userModel="userModel" ref="profile" ></SelectUser>
		</mt-popup>
		<mt-popup v-model="departModel.visible" position="right" popup-transition="popup-fade" style="width:100%;height:100%">
			<selectQuarters :orgModel="departModel" ref="departSel"></selectQuarters>
		</mt-popup>
		<!-- <mt-popup position="right" v-model="application.visible" popup-transition="popup-fade" style="width:100%;height:100%">
			<Applicationforconstruction  :appModel="application" ></Applicationforconstruction>
		</mt-popup> -->
		<mt-popup position="right" v-model="cation.visible" popup-transition="popup-fade" style="width:100%;height:100%">
			<ConstructionUser  :caModel="cation"  ></ConstructionUser>
		</mt-popup>
		<ProcessForm :model="processModel" ref="process"></ProcessForm>
		<!-- <div class="footer">
			<p style="padding:0 5px;">
				  <button  @click="saveData(1)" class="weui-btn weui-btn_mini weui-btn_default cancelBtn">取消</button>
				  <button  @click="saveData()" class="weui-btn weui-btn_mini weui-btn_primary submitBtn">确定</button>
			</p>
		</div> -->
	
	</div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import { Datetime } from 'vux';
import Attachment from '../common/Attachment.vue'
import ProcessForm from '../common/ProcessForm.vue'
import ChooseAddress from '../common/ChooseAddress.vue'
import SelectUser from '../common/SelectUser.vue'
import selectQuarters from '../common/selectQuarters.vue'
import VoiceRecognition from '../common/VoiceRecognition.vue'
import ConstructionUser from '../common/ConstructionUser.vue'
// import Applicationforconstruction from '../common/Applicationforconstruction.vue'
export default {
	name: 'movebx',
	data() {
		return {
			addressObj:{
				addressVisible:false,
			},
			symbol:'sn,CCSQ',
			formId:"DForm_XM008_sggl_kgbg",
			sqlTableName:"G006_sggl_kgbg",
			mainData:{
				SN_:'',
				SUBJECT_:'',
				ENABLE_:1,
				xmdd:'',
				xxdz:'',
				xgdw:'',
				sjs:'',
				htmj:'',
				jcrq:'',
				xctj:'',
				zfbp:'',
				sjtz:'',
				Subject:''
			},
			userModel:{
				visible:false,
				sqr:'',
				userUid:'',
				users:[]
			},
			// application:{
			// 	visible:false,
			// 	qiyige:{
			// 		xmmc:'',
			// 		jflxr:'',
			// 		htje:'',
			// 		jsrq:'',
			// 		userid:''
			// 	},	
			// },
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
			processModel:{
				ifHashWorkflow: true,
				isReadOnly: false,
				sqlTableName: this.sqlTableName,
				formId: this.formId,
				parent: null,
				id: '',
				procDefId: '',
				procInstId: ''
				
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
		}
	},
	created() {
		// this.util.initWxJsSdk(this);
		
// this.application.qiyige.userid =this.userId;

this.feileiData();

	},
	activated() {
		
		this.util.init(this);
		this.mainData={czy:this.userName,SUBJECT_:'',ENABLE_:1};
		this.userModel.sqr = '';
		this.userModel.userUid = '';
		this.departModel.departName= this.sessionUtil.getDepartName(this);
		this.departModel.departUid= this.sessionUtil.getDepartUid(this);
		var id = this.util.getUrlParam("id");
		var isReadOnlyParam = this.util.getUrlParam("isReadOnly");
		this.isReadOnly = (this.validUtil.isNotEmpty(isReadOnlyParam) && isReadOnlyParam == "true") ? true : false;
		this.isNewFlag = (this.validUtil.isNotEmpty(id)) ? false : true;
		this.attachmentModel.isReadOnly = this.isReadOnly;
		this.processModel.parent = this;
		this.id = id;
		this.loadData();
	},
	components: {
		// 名字
		Attachment,ChooseAddress,SelectUser,Datetime,selectQuarters,VoiceRecognition,ProcessForm,ConstructionUser
	},
	computed: {
		...mapState({
			userName: state => state.userName,			 
			userId: state => state.userId
		})

	},
	methods: {
			  feileiData(){
                 var param ={};
				
				this.util.post('/admin/appAgentAction!runAgent.action?agentId=Agent_XM008_xmb&type=getInfo&sqlWhere=&node=root', param, (res)=> {	
                    this.util.unmask();
					
                    // this.list=res.data;
				
					
					// debugger
                    // var o=JSON.parse(res.data)
					// console.log(o)
                    // this.cation.list=[o]
					this.cation.list=res;
                    // this.addCheck(this.list)
                    
        		});
			},
			cations(){
			this.cation.visible=true;
			// this.$r(efs.classcation.postMsg({selectCation:{}});
			
			
			
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
		// applications(data){
		// 	this.application.visible=true;
		// 	// this.$refs.classcation.postMsg({selectCation:{}});	
		// },
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
					_this.cation.qiyige.payeename=data.xmmc;
					_this.cation.xinxi.xmdd=data.xmdd;
					_this.cation.xinxi.xxdz=data.xxdz;
					_this.cation.xinxi.sjs=data.sjs;
					_this.cation.xinxi.htmj=data.htmj;
					_this.cation.xinxi.jcrq=data.jcrq;
				});
				
			}
		},
		checkValid() {
			
			if(!this.validUtil.isNotEmpty(this.cation.qiyige.payeename)){
				this.util.failueToast('请选择项目名称');
				return false;
			}
			
			return true;
		},
		getData(flag){
			if (flag == 1) {
				history.back();
				return;
			}
			if(!this.checkValid()){
				return;
			}
			this.mainData.xmmc=this.cation.qiyige.payeename;
			this.mainData.xmdd=this.cation.xinxi.xmdd;
			this.mainData.xxdz=this.cation.xinxi.xxdz;
			this.mainData.sjs=this.cation.xinxi.sjs;
			this.mainData.htmj=this.cation.xinxi.htmj;
			this.mainData.jcrq=this.cation.xinxi.jcrq;
			this.mainData.xmid=this.cation.xinxi.xmid;
			this.mainData.xmbh=this.cation.xinxi.xmbh;
			this.mainData.jgrq=this.cation.xinxi.jgrq;
			this.mainData.kgrq=this.cation.xinxi.kgrq;
			
			this.mainData.userid=this.userId;
			this.mainData.depart = this.departModel.departName;
			var filesData = new Array();
			for (var i=0;i< this.attachmentModel.fileList.length;i++) {
				var file = this.attachmentModel.fileList[i];
				if (file.isNewFlag) {
					filesData.push(file);
				}
			}
			var _this=this;
			this.util.mask('正在保存...');
			var params = { sqlTableName: "G006_sggl_kgbg", mainFormData: JSON.stringify(this.mainData), filesData: JSON.stringify(filesData), deleteFilesData: _this.attachmentModel.deleteFilesList.join(",") };
			if (this.validUtil.isNotEmpty(this.id)) {
				params['id'] = this.id;
				params['businessKey'] = this.id;
			}
			params['symbol'] = this.symbol;
			params['formId'] = this.formId;
			params['Subject'] = "开工报告";
			// this.util.post("/admin/appDefaultFormAction!saveData.action",params,function(result){
			// 		if(result.success){
			// 			_this.util.unmask();
			// 			_this.util.setTemp(_this,"loadOutWorkList"+Math.random().toString(36).substr(2));
			// 			history.back();
						
			// 		}else{
			// 			if(status!=1){
			// 				_this.util.unmask();
			// 			}
			// 			_this.util.alert(result.msg);
			// 		}
			// 	});
			console.log(params);
				return params;
			

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


<style>
.weui-cells_form .weui-cell{
	padding: 0
}
</style>
