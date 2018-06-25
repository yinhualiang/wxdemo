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
			<div class="weui-cell weui-cell_select myCell" >
				<div class="weui-cell__hd"><span>施工单位</span><span style="color:red">*</span></div>
				<div class="weui-cell__bd">
					<div class="weui-cell__bd myCell-bd" style="padding-top: 5px;padding-right: 10px;" @click="applications()" >
					<span>{{application.qiyige.payeename}}</span>
				</div>
				</div>
			</div>
			
			
			<div class="weui-cell weui-cell_select myCell" >
				<div class="weui-cell__hd"><span>验收人</span><span style="color:red">*</span></div>
				<div class="weui-cell__bd">
					<div class="weui-cell__bd myCell-bd" style="padding-top: 5px;padding-right: 10px;"  >
					<span>{{userNames}}</span>
				</div>
				</div>
			</div>
			<div class="weui-cell myCell" >
				<div class="weui-cell__hd"><span>验收时间</span><span style="color:red">*</span></div>
				<div class="weui-cell__bd">
					<datetime title="" class="be-check no-line" :readonly="isReadOnly" v-model="mainData.ysrq" style="padding:0px;padding-right:0px;height:100%;line-height:44px;" default-selected-value="date" format="YYYY-MM-DD" placeholder="请选择日期"></datetime>
				</div>
			</div> 
			
		</div>
		
		<div class="my-cells">
			<div class="pop" style="text-align:left;">
				<span class="col-xs-6">检查问题</span>
			</div>
		
				
				<div v-for="xiala in xialas" >
					<div class="weui-panel__bd" style="text-align:left;border-top: 1px solid #eee;" @click="show(xiala)" v-if="(xiala.show == undefined || !xiala.show)">
						<div class="weui-media-box weui-media-box_appmsg" style="padding: 5px;">
							{{xiala.xm}}
						</div>
					</div>
					<div v-show='xiala.show'>
						<div class="details " style="padding:5px 10px;background:#eee">
						
							<div class="details-title">
								<div style="padding-top: 8px;">
								
									<!-- <p v-if="!isReadOnly" style="color:#f00;float:right" @click.stop="remove(xiala)">-删除</p> -->
								</div>
							</div>
						</div>
						
						<div class="weui-cell myCell">
							<div class="weui-cell__hd"><span>验收项目：</span></div>
							<div class="weui-cell__bd">
								{{xiala.xh}}
							</div>
						</div>
						<!-- <div class="weui-cell  weui-cell_select  myCell">
							<div class="weui-cell__hd"><span>是否合格</span></div>
							<div class="weui-cell__bd">
								<select class="weui-select" :readonly="isReadOnly" v-model="xiala.bhg"    name="select1">
									<option  value="">合格</option>
									<option  value="1">不合格</option>
								</select>
							</div>
						</div> -->
						<div class="weui-cell myCell">
							<div class="weui-cell__hd"><span>验收说明：</span></div>
							<div class="weui-cell__bd">
								{{xiala.ysnr}}
							</div>
						</div>
						<div class="weui-cell myCell" >
							<div class="weui-cell__hd"><span>问题描述：</span><span style="color:red">*</span></div>
							<div class="weui-cell__bd">
								<input class="weui-input" :readonly="isReadOnly"  style="text-align: right;width:90%;" v-model="xiala.sm" type="text">
							</div>
						</div>
						<div class="my-cells" style="padding-left: 6px;">
							<Attachment :model="attachmentModel"></Attachment>	
						</div>
					</div>
					
					
					
				</div>
				
			
			
		</div>
		<div class="my-cells" style="padding-left: 6px;">
			<Attachment :model="attachmentModel1"></Attachment>	
		</div>
		<!-- <VoiceRecognition :model="voiceRecognition"></VoiceRecognition> -->
		
		<mt-popup v-model="selectProjModel.selectProjVisible" position="right" popup-transition="popup-fade" style="width:100%;height:100%">
			<SelectProj :mess="selectProjModel" @selectProjCallback="selectProjCallback($event)"></SelectProj>
		</mt-popup>
		<!-- <mt-popup v-model="addressObj.addressVisible" position="right" popup-transition="popup-fade" style="width:100%;height:100%">
			<ChooseAddress :address="addressObj" ref="addressfile" @chooseAddress="chooseAddress($event)"></ChooseAddress>
		</mt-popup> -->
		<mt-popup v-model="userModel.visible" position="right" popup-transition="popup-fade" style="width:100%;height:100%">
			<SelectUser :userModel="userModel" ref="profile" ></SelectUser>
		</mt-popup>
		<mt-popup v-model="departModel.visible" position="right" popup-transition="popup-fade" style="width:100%;height:100%">
			<selectQuarters :orgModel="departModel" ref="departSel"></selectQuarters>
		</mt-popup>
		<mt-popup position="right" v-model="cation.visible" popup-transition="popup-fade" style="width:100%;height:100%">
			<ConstructionUser  :caModel="cation"  @xiala='xiala'></ConstructionUser>
		</mt-popup>
		<mt-popup position="right" v-model="application.visible" popup-transition="popup-fade" style="width:100%;height:100%">
			<Applicationforconstruction  :appModel="application" ></Applicationforconstruction>
		</mt-popup>
		<!-- <ProcessForm :model="processModel" ref="process"></ProcessForm> -->
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
import { Datetime } from 'vux';
import Attachment from '../common/Attachment.vue'
// import ChooseAddress from '../common/ChooseAddress.vue'
// import ProcessForm from '../common/ProcessForm.vue'
import SelectUser from '../common/SelectUser.vue'
import selectQuarters from '../common/selectQuarters.vue'
import VoiceRecognition from '../common/VoiceRecognition.vue'
import SelectProj from '../common/SelectProj.vue'
import ConstructionUser from '../common/ConstructionUser1.vue'
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
			formId:"DForm_XM008_ysgl_jgysjc",
			sqlTableName:"G006_ysgl_jgysjc",
			mainData:{
				SN_:'',
				SUBJECT_:'',
				ENABLE_:1
			},
			mainData1:{
				task_start_date:'',
				task_end_date:'',
				task_uid:'',
				task_name:'',
				TASK_rwqz:''
			},
			mainData2:{
				task_start_date:'',
				task_end_date:'',
				task_uid:'',
				task_name:'',
				TASK_rwqz:''
			},
			// 	processModel:{
			// 	ifHashWorkflow: true,
			// 	isReadOnly: false,
			// 	sqlTableName: this.sqlTableName,
			// 	formId: this.formId,
			// 	parent: null,
			// 	id: '',
			// 	procDefId: '',
			// 	procInstId: ''
				
			// },
			shops:[],//店铺数据
			xialas:[
				{
					TASK_NAME:'',
					TASK_FINISH_DATE: '',	//....
					TASK_START_DATE: '',	//....
					TASK_rwqz: '',	//....
					TASK_OUTLINE_NUM: '',
					TASK_PCT_COMP:'',
					TASK_UID:'',	//....
					IS_SHOW:false, //判断是否已经显示

				},
			],
			// xialaCopy:{
					
			// 		TASK_FINISH_DATE: '',	//....
			// 		TASK_START_DATE: '',	//....
			// 		TASK_rwqz: '',	//....
			// 		TASK_OUTLINE_NUM: '',
			// 		TASK_UID:''	//....

			// },
			userModel:{
				visible:false,
				sqr:'',
				userUid:'',
				users:[]
			},
			cation:{
				visible:false,
				qiyige:{
					name:'',
					
				},
				xinxi:{
					gq:'',
					xmbh:'',
					xxjb:'',
					xmmc:'',
					xmid:''
				},
				shop:{  //店铺形象数据

				},
				id:'',
				item:{},
				list:{}
				
			},
			application:{
				visible:false,
				qiyige:{
					xmmc:'',
					jflxr:'',
					htje:'',
					jsrq:'',
					userid:''
				},
				
				
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
				title: '照片',
				fileList: [],
				deleteFilesList: []
			},
			attachmentModel1: {
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
			userNames:''
		}
	},
	created() {
		// this.util.initWxJsSdk(this);
		this.application.qiyige.userid =this.userId;
		this.feileiData();
		

	},
	activated() {
		
		this.util.init(this);
		this.mainData={czy:this.userName,SUBJECT_:'',ENABLE_:1};
		this.userModel.sqr = '';
		this.userNames=this.userName;
		this.userModel.userUid = '';
		this.departModel.departName= this.sessionUtil.getDepartName(this);
		this.departModel.departUid= this.sessionUtil.getDepartUid(this);
		var id = this.util.getUrlParam("id");
		var isReadOnlyParam = this.util.getUrlParam("isReadOnly");
		this.isReadOnly = (this.validUtil.isNotEmpty(isReadOnlyParam) && isReadOnlyParam == "true") ? true : false;
		this.isNewFlag = (this.validUtil.isNotEmpty(id)) ? false : true;
		this.attachmentModel.isReadOnly = this.isReadOnly;
		// this.processModel.parent = this;
		this.id = id;
		this.loadData();
		
	},
	components: {
		// 名字
		Attachment,SelectUser,Datetime,selectQuarters,VoiceRecognition,SelectProj,ConstructionUser,Applicationforconstruction
	},
	computed: {
		...mapState({
			userName: state => state.userName,
			userId: state => state.userId
		})

	},
	methods: {
		remove(child) {
		child.IS_SHOW=false;
		
		this.xuanran();
			
			
			
		}, 
		// hide(xiala) {
		// 	xiala.show = false;
		// },
		show(xiala) {
			
			for (var i in this.xialas) {
				this.xialas[i].show = false;
			}
			xiala.show = true;
			this.xuanran();
		},
		applications(data){
			this.application.visible=true;
			// this.$refs.classcation.postMsg({selectCation:{}});
		
			
		},
		// popst(){
			
		// 	let vm = this;
		// 	this.xialas.map((xiala,index,lists)=>{
		// 		if(vm.mainData.rwmc == xiala.TASK_UID){
		// 			// vm.xialaCopy = {
		// 			// 	TASK_FINISH_DATE: xiala.TASK_FINISH_DATE,	//....
		// 			// 	TASK_START_DATE: xiala.TASK_START_DATE,	//....
		// 			// 	TASK_rwqz: xiala.TASK_rwqz,	//....
		// 			// 	TASK_OUTLINE_NUM: xiala.TASK_OUTLINE_NUM,
		// 			// 	TASK_UID:xiala.TASK_UID	//....

		// 			// }
		// 			//xiala.IS_SHOW = true;
		// 			vm.$set(xiala, 'IS_SHOW', true);
		// 		}
		// 	})
		// 	// 点击过后的xialas
		// 	this.xuanran();
			
		// 	// if(this.mainData.rwmc==){
		// 	// this.add();
		// 	// }
			
			

		// },
		xuanran(){
			let vm = this;
			let xialasTemp = vm.xialas;
			vm.xialas = [];
			vm.xialas = xialasTemp;
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
		xiala(){
			
			  var param ={operateType:'task',UserName:'UR管理员',xmid:this.cation.xinxi.xmid};
			  let vm = this;
			 
				this.util.post('/admin/appAgentAction!runAgent.action?agentId=Agent_WeChat_Mobile&type=getInfo&sqlWhere=&node=root', param, (res)=> {	
					this.util.unmask();
				
					
					
        		});
		},
		shopchange(){
			console.log(4444)
			console.log(this.xiala.qy)
			console.log(this.shopitem)
			var param ={operateType:'qyysInfo',xxjb:this.cation.xinxi.xxjb,qy:this.xiala.qy};
			  
			 console.log(this.xiala.qy)
				this.util.post('/admin/appAgentAction!runAgent.action?agentId=Agent_WeChat_Mobile&type=getInfo&sqlWhere=&node=root', param, (res)=> {	
					this.util.unmask();
					console.log(res)
					this.xialas=res.data
					
        		});
		},
		
		feileiData(){
                 var param ={};
				
				this.util.post('/admin/appAgentAction!runAgent.action?agentId=Agent_XM008_xmb&type=getInfo&sqlWhere=&node=root', param, (res)=> {	
                    this.util.unmask();
					
                    // this.list=res.data;
				
					
					// debugger
                    // var o=JSON.parse(res.data)
					console.log(res)
                    // this.cation.list=[o]
					this.cation.list=res;
                    // this.addCheck(this.list)
                    
        		});
			},
		cations(){
			this.cation.visible=true;
		},
		...mapActions([
			'selectProj'
		]),
		
		// hide(child) {
		// 	child.show = false;
		// }, show(child) {
		// 	for (var i in this.children) {
		// 		this.children[i].show = false;
		// 	}
		// 	child.show = true;
		// },
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
					_this.cation.qiyige.payeename=data.xmmc;
					_this.application.qiyige.payeename=data.sgdw
					_this.cation.xinxi.xxjb=data.xxjb;
					
					_this.xiala.qy=data.qy;
					_this.userModel.userUid = data.userid;
					_this.departModel.departName = _this.mainData.depart;
					_this.mainData = data;
					
				
				});
				
					var param ={operateType:'jgjcInfo',pid:this.$route.query.id};
				console.log(param)
					this.util.post('/admin/appAgentAction!runAgent.action?agentId=Agent_WeChat_MobileDetailsInfo&type=getInfo&sqlWhere=&node=root', param, (res)=> {	
					this.util.unmask();
					console.log(1231231)
					console.log(res)
					this.xialas=res.data;
					// for(let i=0;i<this.xialas.length;i++){
					// 	this.xialas[i].TASK_START_DATE=res.data[i].task_start_date;
					// 	this.xialas[i].TASK_rwqz=res.data[i].task_rwqz;
					// 	this.xialas[i].TASK_NAME=res.data[i].task_name;
					// 	this.xialas[i].TASK_PCT_COMP=res.data[i].task_pct_comp;
					// }
					console.log(res)
					
					
        			});
			}
			
			
		},
		checkValid() {
		
			if(!this.validUtil.isNotEmpty(this.cation.qiyige.payeename)){
				this.util.failueToast('请选择项目名称');
				return false;
			}
			if(!this.validUtil.isNotEmpty(this.application.qiyige.payeename)){
				this.util.failueToast('请选择项目名称');
				return false;
			}
			
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

		
			

			this.mainData.jbr=this.userName;
			this.mainData.xmmc=this.cation.qiyige.payeename; //项目名称
			this.mainData.qy=this.xiala.qy //验收区域
			this.mainData.xxjb=this.cation.xinxi.xxjb //店铺形象
			this.mainData.ysr=this.userNames;
			this.mainData.xmbh=this.cation.xinxi.xmbh;
			this.mainData.xmid=this.cation.xinxi.xmid;
			this.mainData.name = this.userModel.sqr;
			this.mainData.sgdw=this.application.qiyige.payeename //施工单位
			this.mainData.userId=this.userId;
			
			this.mainData.depart = this.departModel.departName;
			var filesData = new Array();
			for (var i=0;i< this.attachmentModel.fileList.length;i++) {
				var file = this.attachmentModel.fileList[i];
				if (file.isNewFlag) {
					filesData.push(file);
				}
			}
			
			
			
			var subForm = { subFormId: 'subForm1', subFormForeignKey: 'pid', subFormTable: 'G006_ysgl_jgysjcdet' ,fsrq:'2015-05-18'};
			var detData = [];
			
			
			for( var i=0;i<this.xialas.length;i++){
				
					detData.push(this.xialas[i]);
				
			}
			
			subForm.data = JSON.stringify(detData);
			var subFormData = new Array();
			subFormData.push(subForm);

			var _this=this;
			this.util.mask('正在保存...');
			var params = { sqlTableName: "G006_ysgl_jgysjc",subFormData: JSON.stringify(subFormData), mainFormData: JSON.stringify(this.mainData), filesData: JSON.stringify(filesData), deleteFilesData: _this.attachmentModel.deleteFilesList.join(",") };
			if (this.validUtil.isNotEmpty(this.id)) {
				params['id'] = this.id;
				params['businessKey'] = this.id;
			}
			params['symbol'] = this.symbol;
			params['formId'] = this.formId;
			params['Subject'] = "隐蔽检查";
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
				console.log(666)
			console.log(params)
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
.weui-media-box__bd{
	background-color: #fcfcfc;
	height:30px;
}
</style>


<style>
.weui-cells_form .weui-cell{
	padding: 0
}
</style>
