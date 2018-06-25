<template>
	<div style="overflow: auto;height: 100%;background: #eee;text-align: left;">

		<div class="my-cells" style="margin-top: 0px;margin-bottom:15px;">
			
			
			<div class="weui-cell myCell">
				<div class="weui-cell__hd"><span>店铺名称</span></div>
				<div class="weui-cell__bd">
					<input class="weui-input" :readonly="isReadOnly"  style="text-align: right;" v-model="mainData.czy" type="text">
				</div>
			</div>
            <div class="weui-cell myCell">
				<div class="weui-cell__hd"><span>派工说明</span></div>
				<div class="weui-cell__bd">
					<input class="weui-input" :readonly="isReadOnly"  style="text-align: right;" v-model="mainData.yfje" type="text">
				</div>
			</div>
		</div>
		<span style="padding-left:4%;">年检问题1</span>
		<div class="my-cells" style='margin-top:10px;margin-bottom:15px;'>
             <div class="weui-cell  weui-cell_select  myCell">
				<div class="weui-cell__hd"><span>检查区域</span></div>
				<div class="weui-cell__bd">
					<select class="weui-select" :readonly="isReadOnly" v-model="mainData.jsdw" name="select1">
						<option  value="满足">满足</option>
						<option  value="不满足">不满足</option>
					</select>
				</div>
			</div> 
			<div class="weui-cell myCell">
				<div class="weui-cell__hd"><span>检查项</span></div>
				<div class="weui-cell__bd">
					<input class="weui-input" :readonly="isReadOnly"  style="text-align: right;" v-model="mainData.yfje" type="text">
				</div>
			</div>
            <div class="weui-cell myCell">
				<div class="weui-cell__hd"><span>检查结果</span></div>
				<div class="weui-cell__bd">
					<input class="weui-input" :readonly="isReadOnly"  style="text-align: right;" v-model="mainData.yfje" type="text">
				</div>
			</div>
			<div class="weui-cell myCell">
				<div class="weui-cell__hd"><span>处理结果</span></div>
				<div class="weui-cell__bd">
					<input class="weui-input" :readonly="isReadOnly"  style="text-align: right;" v-model="mainData.yfje" type="text">
				</div>
			</div>
		</div>
        <span style="padding-left:4%;">年检问题2</span>
		<div class="my-cells" style='margin-top:10px;'>
             <div class="weui-cell  weui-cell_select  myCell">
				<div class="weui-cell__hd"><span>检查区域</span></div>
				<div class="weui-cell__bd">
					<select class="weui-select" :readonly="isReadOnly" v-model="mainData.jsdw" name="select1">
						<option  value="满足">满足</option>
						<option  value="不满足">不满足</option>
					</select>
				</div>
			</div> 
			<div class="weui-cell myCell">
				<div class="weui-cell__hd"><span>检查项</span></div>
				<div class="weui-cell__bd">
					<input class="weui-input" :readonly="isReadOnly"  style="text-align: right;" v-model="mainData.yfje" type="text">
				</div>
			</div>
            <div class="weui-cell myCell">
				<div class="weui-cell__hd"><span>检查结果</span></div>
				<div class="weui-cell__bd">
					<input class="weui-input" :readonly="isReadOnly"  style="text-align: right;" v-model="mainData.yfje" type="text">
				</div>
			</div>
			<div class="weui-cell myCell">
				<div class="weui-cell__hd"><span>处理结果</span></div>
				<div class="weui-cell__bd">
					<input class="weui-input" :readonly="isReadOnly"  style="text-align: right;" v-model="mainData.yfje" type="text">
				</div>
			</div>
		</div>
		
		
		
		<div class="my-cells" style="padding-left: 6px;">
			<Attachment :model="attachmentModel"></Attachment>	
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
// import ChooseAddress from '../common/ChooseAddress.vue'
import SelectUser from '../common/SelectUser.vue'
import ProcessForm from '../common/ProcessForm.vue'
import selectQuarters from '../common/selectQuarters.vue'
import VoiceRecognition from '../common/VoiceRecognition.vue'
import SelectProj from '../common/SelectProj.vue'

export default {
	name: 'movebx',
	data() {
		return {
			selectProjModel:{projUid:"",selectProjVisible:false,xmmc:''},
			addressObj:{
				addressVisible:false,
			},
			symbol:'sn,CCSQ',
			formId:"DForm_XM008_wxgl_wxsq",
			sqlTableName:"G006_wxgl_wxsp",
			mainData:{
				SN_:'',
				SUBJECT_:'',
				ENABLE_:1
			},
			mainData1:{
				SN_:'',
				SUBJECT_:'',
				ENABLE_:1
			},
			userModel:{
				visible:false,
				sqr:'',
				userUid:'',
				users:[]
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
		}
	},
	created() {
		// this.util.initWxJsSdk(this);

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
		this.processModel.parent = this;
		this.id = id;
		this.loadData();
	},
	components: {
		// 名字
		Attachment,SelectUser,Datetime,selectQuarters,VoiceRecognition,SelectProj,ProcessForm
	},
	computed: {
		...mapState({
			userName: state => state.userName
		})

	},
	methods: {
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
				});
				
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
		getData(flag){
			if (flag == 1) {
				history.back();
				return;
			}
			if(!this.checkValid()){
				return;
			}
			this.mainData.name = this.userModel.sqr;
			this.mainData.depart = this.departModel.departName;
			var filesData = new Array();
			for (var i=0;i< this.attachmentModel.fileList.length;i++) {
				var file = this.attachmentModel.fileList[i];
				if (file.isNewFlag) {
					filesData.push(file);
				}
			}
			var subForm = { subFormId: 'subForm1', subFormForeignKey: 'pid', subFormTable: 'G006_wxgl_wxspdet' ,fsrq:'2015-05-18'};
			var detData = new Array();
			detData.push(this.mainData1);
			subForm.data = JSON.stringify(detData);
			var subFormData = new Array();
			subFormData.push(subForm);

			var _this=this;
			this.util.mask('正在保存...');
			var params = { sqlTableName: "G006_wxgl_wxsp",subFormData: JSON.stringify(subFormData), mainFormData: JSON.stringify(this.mainData), filesData: JSON.stringify(filesData), deleteFilesData: _this.attachmentModel.deleteFilesList.join(",") };
			if (this.validUtil.isNotEmpty(this.id)) {
				params['id'] = this.id;
				params['businessKey'] = this.id;
			}
			params['symbol'] = this.symbol;
			params['formId'] = this.formId;
			params['subject'] = "维修申请";
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
</style>


<style>
.weui-cells_form .weui-cell{
	padding: 0
}
</style>
