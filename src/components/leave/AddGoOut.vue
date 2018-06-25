<template>
	<div style="overflow: auto;height: 100%;background: #eee;text-align: left;">

		<div class="my-cells" style="margin-top: 0px;">
			<div class="weui-cell myCell">
				<div class="weui-cell__hd"><span>单据编号</span></div>
				<div class="weui-cell__bd">
					<input class="weui-input" :readonly="isReadOnly"  style="text-align: right;" v-model="mainData.sn" type="text">
				</div>
			</div>
			<div class="weui-cell myCell">
				<div class="weui-cell__hd"><span>操作员</span></div>
				<div class="weui-cell__bd" >
					<span style="text-align: right;" >{{mainData.czy}}</span>
				</div>
			</div>
			<div class="weui-cell weui-cell_select myCell" style="padding-left:15px;">
				<div class="weui-cell__hd"><span>外出人<span style="color:red">*</span></span></div>
				<div class="weui-cell__bd myCell-bd" @click="selectOutWorker()">
					<span>{{userModel.userName}}</span>
				</div>
			</div>
		</div>
		
		<div class="my-cells">
			<div class="weui-cell weui-cell_select myCell">
				<div class="weui-cell__hd"><span>部门名称<span style="color:red">*</span></span></div>
				<div class="weui-cell__bd" style="padding-right: 5px;" @click="selectDepart()">
					<span>{{departModel.departName}}</span>
				</div>
			</div>
			<div class="weui-cell myCell">
				<div class="weui-cell__hd"><span>预计费用</span></div>
				<div class="weui-cell__bd">
					<input class="weui-input" :readonly="isReadOnly"  style="text-align: right;" v-model="mainData.yjfy" type="number">
				</div>
			</div>
			<div class="weui-cell myCell">
				<div class="weui-cell__hd"><span>外出天数<span style="color:red">*</span></span></div>
				<div class="weui-cell__bd">
					<input class="weui-input" :readonly="isReadOnly"  style="text-align: right;" v-model="mainData.ccts" type="text">
				</div>
			</div>
		</div>

		<div class="my-cells">
			<div class="weui-cell myCell" >
				<div class="weui-cell__hd"><span>外出日期</span></div>
				<div class="weui-cell__bd">
					<datetime title="" class="be-check no-line" :readonly="isReadOnly" v-model="mainData.fsrq" style="padding:0px;padding-right:0px;height:100%;line-height:44px;" default-selected-value="date" format="YYYY-MM-DD" placeholder="请选择日期"></datetime>
				</div>
			</div>
			<div class="weui-cell myCell" style="text-align:left;overflow: hidden;">
				<div class="weui-cell__hd"><span>外出地点</span></div>
				<div class="destination weui-cell__bd">
					<input type="text" :readonly="isReadOnly"  v-model="mainData.dd" placeholder="请输入出差地点"> <i>|</i><s @click="isReadOnly? '':selectAddress()" class="glyphicon  glyphicon-map-marker" aria-hidden="true"></s>
				</div>
			</div>
			<div class="weui-cell myCell" >
				<div class="weui-cell__hd"><span>结束时间</span></div>
				<div class="weui-cell__bd">
					<datetime title="" class="be-check no-line" :readonly="isReadOnly" v-model="mainData.enddate" style="padding:0px;padding-right:0px;height:100%;line-height:44px;" default-selected-value="date" format="YYYY-MM-DD HH:mm" placeholder="请选择日期"></datetime>
				</div>
			</div>
			<div class="weui-cell myCell">
				<div class="weui-cell__hd"><span>事由</span></div>
				<div class="weui-cell__bd">
					<input class="weui-input" :readonly="isReadOnly"  style="text-align: right;" v-model="mainData.sy" type="text">
				</div>
			</div>
		</div>
		<div class="my-cells" style="padding-left: 6px;">
			<Attachment :model="attachmentModel"></Attachment>	
		</div>
		
		<mt-popup v-model="addressObj.addressVisible" position="right" popup-transition="popup-fade" style="width:100%;height:100%">
			<ChooseAddress :address="addressObj" ref="addressfile" @chooseAddress="chooseAddress($event)"></ChooseAddress>
		</mt-popup>
		<mt-popup v-model="userModel.visible" position="right" popup-transition="popup-fade" style="width:100%;height:100%">
			<SelectUser :userModel="userModel" ref="profile" ></SelectUser>
		</mt-popup>
		<mt-popup v-model="departModel.visible" position="right" popup-transition="popup-fade" style="width:100%;height:100%">
			<selectQuarters :orgModel="departModel" ref="departSel"></selectQuarters>
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
import { Datetime } from 'vux';
import Attachment from '../common/Attachment.vue'
import ChooseAddress from '../common/ChooseAddress.vue'
import SelectUser from '../common/SelectUser.vue'
import selectQuarters from '../common/selectQuarters.vue'
export default {
	name: 'movebx',
	data() {
		return {
			addressObj:{
				addressVisible:false,
			},
			symbol:'sn,CCSQ',
			formId:"DForm_XM001_office_ccsq",
			sqlTableName:"G001_rsgl_wcsqb",
			mainData:{
				SN_:'',
				SUBJECT_:'',
				ENABLE_:1
			},
			userModel:{
				visible:false,
				userName:'',
				userUid:'',
				users:[]
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
			assignee: '',
			isReadOnly: true,//是否只读
			isNewFlag: true,//是否是新增
			id: ''
		}
	},
	created() {
		// this.util.initWxJsSdk(this);

	},
	activated() {
		
		this.util.init(this);
		this.mainData={czy:this.userName,SUBJECT_:'',ENABLE_:1};
		this.userModel.userName = '';
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
	},
	components: {
		// 名字
		Attachment,ChooseAddress,SelectUser,Datetime,selectQuarters
	},
	computed: {
		...mapState({
			userName: state => state.userName
		})

	},
	methods: {
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
					_this.userModel.userName = data.name;
					_this.userModel.userUid = data.userid;
					_this.departModel.departName = _this.mainData.depart;
					_this.mainData = data;
				});
				
			}
		},
		checkValid() {
			if(!this.validUtil.isNotEmpty(this.userModel.userUid)){
				this.util.failueToast('请选择出差人');
				return false;
			}
			if(!this.validUtil.isNotEmpty(this.departModel.departName)){
				this.util.failueToast('请输入部门');
				return false;
			}
			
			if(!this.validUtil.isNotEmpty(this.mainData.ccts)){
				this.util.failueToast('请输入出差天数');
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
			this.mainData.name = this.userModel.userName;
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
			var params = { sqlTableName: this.sqlTableName, mainFormData: JSON.stringify(this.mainData), filesData: JSON.stringify(filesData), deleteFilesData: _this.attachmentModel.deleteFilesList.join(",") };
			if (this.validUtil.isNotEmpty(this.id)) {
				params['id'] = this.id;
				params['businessKey'] = this.id;
			}
			params['symbol'] = this.symbol;
			params['formId'] = this.formId;
			params['subject'] = "出差申请";
			this.util.post("/admin/appDefaultFormAction!saveData.action",params,function(result){
					if(result.success){
						_this.util.unmask();
						_this.util.setTemp(_this,"loadGoOutList"+Math.random().toString(36).substr(2));
						history.back();
						
					}else{
						if(status!=1){
							_this.util.unmask();
						}
						_this.util.alert(result.msg);
					}
				});
				
			

		}
	}
}
</script>

<style lang="scss" scoped>
.my-cells {
    margin-top: 1.17647059em;
    background-color: #FFFFFF;
    line-height: 1.41176471;
    font-size: 14px;
    overflow: hidden;
    position: relative;
}
.myCell-bd {
    height: 100%;
    padding-top: 12px;
    padding-right: 20px;
}
.mintBtn{
	background:#2f7dcd; 
	box-sizing: content-box;
	padding: 5px;
	border-radius: 7px;
	color:#fff;
	font-size: 12px;
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

/* .footer .weui-btn_primary{
	background-color: #2f7dcd!important;
} */
</style>

