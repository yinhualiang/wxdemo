<template>
  <div id="mainForm" class="headStyle bg-show-mint-wapper" style="background:#eee;">
	  	<div class="middle">
			<div class="bills-popup" >
             <div class="jr-bills1">
							<div class="price" style="text-align:left;">
									<span class="col-xs-4">单据编号：</span>
									<x-input disabled="disabled" class="col-xs-8" style="padding: 0px 0px;padding-right: 15px;" text-align="right" v-model="mainData.sn"></x-input>
							</div>
							
							<div class="weui-cell " id="myCell" style="text-align: right;padding-right: 20px;padding-left: 10px;background:#fff;overflow:hidden;">
								<div class="weui-cell__hd"><span>员工姓名：</span></div>
								<div class="weui-cell__bd" style="width: 100%;height: 22px;">
									<span style=" display: block;height: 100%;">{{userNames}}</span>
								</div>
							</div>
           </div>

           <div class="jr-bills1">
						 <div class="price" style="text-align:left;">
										<span class="col-xs-4">请假日期：</span>
										<x-input disabled="disabled" class="col-xs-8" style="padding: 0px 0px;padding-right: 15px;" text-align="right" v-model="mainData.date"></x-input>
							</div>
							<div class="weui-cell weui-cell_select myCell" style="padding-left: 10px;border-bottom:1px solid #eee;background:#fff;">
								<div class="weui-cell__hd"><span>请假性质<span style="color:red">*</span></span></div>
								<div class="weui-cell__bd myCell-bd" >
									<select :disabled="isReadOnly" class="weui-select" id="selectNum" @change="isVacationFunc()" v-model="mainData.qjxz" name="select1">
											<option v-for="(item,key) in typeList" :key="key"  :value="item.value">{{item.name}}</option>
									</select>
								</div>
							</div>
						</div>
							

           <div class="jr-bills1" v-if="isVacation">
             <div class="price" style="text-align:left;">
                <span class="col-xs-4">本年年假天数：</span>
                <x-input class="col-xs-8" disabled="disabled" style="padding: 0px 0px;padding-right: 15px;" text-align="right" v-model="mainData.njts"></x-input>
            </div>
            <div class="price" style="text-align:left;">
                <span class="col-xs-4">已休年假天数：</span>
                <x-input class="col-xs-8" disabled="disabled" style="padding: 0px 0px;padding-right: 15px;" text-align="right" v-model="mainData.yxnjts"></x-input>
            </div>
            <div class="price" style="text-align:left;">
                <span class="col-xs-4">剩余年假天数：</span>
                <x-input class="col-xs-8" disabled="disabled" style="padding: 0px 0px;padding-right: 15px;" text-align="right" v-model="mainData.synjts"></x-input>
            </div>
           </div>

					 <div class="jr-bills1">
             <div class="price" style="text-align:left;">
                <span class="col-xs-4">开始时间：</span>
				<datetime v-model="mainData.begindate" @on-change="peonCount" format="YYYY-MM-DD HH:mm"></datetime>
            </div>
            <div class="price" style="text-align:left;">
                <span class="col-xs-4">结束时间：</span>
				<datetime v-model="mainData.enddate"  @on-change="peonCount" format="YYYY-MM-DD HH:mm"></datetime>
            </div>
            <div class="price" style="text-align:left;">
                <span class="col-xs-4">请假天数：</span>
                <x-input class="col-xs-8" style="padding: 0px 0px;padding-right: 15px;" text-align="right" v-model="mainData.peon"></x-input>
            </div>
           </div>

           <div class="jr-bills1">
						
            <!-- <VoiceRecognition :model="voiceRecognition"></VoiceRecognition>
            <Attachment :model="attachmentModel"></Attachment> -->
						<div style="background:#fff;">
							<VoiceRecognition :model="voiceRecognition"></VoiceRecognition>	
							<Attachment :model="attachmentModel" style="border-top: 1px solid #eee;"></Attachment>
						</div>
			
           </div>
            
          </div>
	  	</div>
	  	<ProcessForm :model="processModel" ref="process"></ProcessForm>
	  
	    <!--选择请假人-->
		<!-- <mt-popup v-model="userModel.visible" position="right" popup-transition="popup-fade" style="width:100%;height:100%">
			<SelectUser :userModel="userModel" ref="memberfile"></SelectUser>
		</mt-popup> -->
  </div>
</template>

<script>
import VoiceRecognition from '../common/VoiceRecognition.vue'
import ProcessForm from '../common/ProcessForm.vue'
import Attachment from '../common/Attachment.vue'
import SelectUser from '../common/SelectUser.vue'
import {mapState,mapGetters, mapActions} from 'vuex';
import { Datetime,XInput,Cell } from 'vux'
export default {
    name: 'movebx',
    data () {
	    return {
				isVacation:false,
			agentId: 6,
			symbol:'sn,QJSQ',
			formId:"DForm_XM001_office_leave",
	    	mainData: {
				njts:'',
				peon:0,
				yxnjts:'',
				synjts:'',
				formKey: 'leave',
				begindate: '',
				enddate: '',
			},
			userModel: {
				visible: false,
				userName: '',
				userUid: ''
			},
			dateLength: '',
			voiceRecognition: {
				title: '请假原因',
				isReadOnly: false,
				placeholder: '请输入请假原因',
				content: ''
			},
			attachmentModel: {
				isReadOnly: false,
				title: '上传附件',
				fileList: [],
				deleteFilesList: []
			},
			typeList: [],
			currentActId:'',
			formKey: 'DForm_XM001_office_leave',
			modelName: '请假',
			sqlTableName: 'G001_office_qj',
			processModel: {
				ifHashWorkflow: true,
				isReadOnly: false,
				sqlTableName: this.sqlTableName,
				formId: this.formId,
				parent: null,
				id: '',
				procDefId: '',
				procInstId: ''
			},
			isReadOnly: true,//是否只读
			id:'',
			isNewFlag:false,
			iDays:0,
			userNames:'',
			userIds:''
	    }
    },
   components:{
      // 名字
      Datetime,Attachment,ProcessForm,VoiceRecognition,SelectUser,XInput,Cell
    },
    computed: {
		...mapState({
		   	userName: state => state.userName,
		   	userId: state => state.userId
		   })
		
    },
	created(){
		
		this.util.initWxJsSdk(this);
		var _this = this;
		 this.util.loadDic({ dicId: 'Dic_XM001_qjyy' }, function(data) {
			for(var i=0;i<data.length;i++){
				var item = {name: data[i].name, value: data[i].value}
				_this.typeList.push(item);
			}

		});
		
   },
   activated(){
	   
		this.mainData.czy=this.userName;
		this.mainData.fsrq=new Date().format("yyyy-MM-dd");
		this.mainData.begindate=new Date().format("yyyy-MM-dd hh:mm");
		this.mainData.enddate=new Date().format("yyyy-MM-dd hh:mm");
		this.mainData.date=new Date().format("yyyy-MM-dd");
		this.userNames = this.userName;
		this.userIds = this.userId;
		this.voiceRecognition.content='';

		this.id = this.util.getUrlParam("id");
		this.isNewFlag = (this.validUtil.isNotEmpty(this.id)) ? false : true;
			if(this.validUtil.isNotEmpty(this.id)){
			document.title="请假详情"; 
		}
		this.loadData();
		this.processModel.parent = this;
		this.isReadOnly = this.mainData.isReadOnly;
		this.attachmentModel.isReadOnly = this.mainData.isReadOnly;
		this.voiceRecognition.isReadOnly = this.mainData.isReadOnly;
		 
		
		
		
   },
   methods: {
			 peonCount(){
					console.log(123)
					var date1=	this.mainData.begindate;
					var date2=	this.mainData.enddate;
					if((date1!="undefined"&&date1!=null&&date2!="undefined"&&date2!=null&&date1!=""&&date2!="")&&(!this.CompareDate(date1,date2))){
					
					var time1=new Date(date1.replace(/\-/g, "/"));
					var time2=new Date(date2.replace(/\-/g, "/"));
					var time3=new Date(this.getNowFormatDate(time2,"11:30"));//11:30
					var time4=new Date(this.getNowFormatDate(time2,"13:30"));//13:30
					if(this.comptime(date2.split(" ")[1],"13:30:00")&&this.comptime("11:30:00",date1.split(" ")[1])){
							time2=time2-(time4-time3);
					}
					if(this.comptime(date2.split(" ")[1],"11:30:00")&&this.comptime("13:30:00",date2.split(" ")[1])){
							time2=time3;
					}
					var date3=time2-time1;
					var day=date3/(7*3600*1000);
						console.log(date1)
						console.log(date2)
						console.log(day)
					if(date3<=24*3600*1000){
						
							if(day>1){
							this.mainData.peon=1;
							}else{
						this.mainData.peon=day.toFixed(2);
						}
						
					}else{
						this.util.successToast("请假时间超过一天,请手工输入请假天数!")
						this.mainData.peon="";
					}
					
					}else{
						this.util.failueToast("开始时间不能小于结束时间!")
					}
		 	},
			CompareDate(d1,d2){
				return ((new Date(d1.replace(/-/g,"\/"))) > (new Date(d2.replace(/-/g,"\/"))));
			},
				//根据时间戳比较时间大小
		 comptime(a,b){   
				//var dateA = new Date("1900/1/1 " + a);   
				//var dateB = new Date("1900/1/1 " + b); 
				var dateA = Date.parse(new Date(("2017/01/01 " + a).replace(/\-/g, "/"))); 
				var dateB = Date.parse(new Date(("2017/01/01 " + b).replace(/\-/g, "/")));   

				if(isNaN(dateA) || isNaN(dateB)) return null;   
				if(dateA > dateB) return true;   
				if(dateA < dateB) return false;   
				return 0;   
				},
				//转换时间格式，转为请假日期+13：30或请假日期+11：30
		  getNowFormatDate(date,s) {  
						var seperator1 = "-";  
						var seperator2 = ":";  
						var month = date.getMonth() + 1;  
						
						var strDate = date.getDate();  
						if (month >= 1 && month <= 9) {  
								month = "0" + month;  
						}  
						if (strDate >= 0 && strDate <= 9) {  
								strDate = "0" + strDate;  
						}  
						if(s=="13:30"){
						var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate  
										+ " " + "13" + seperator2 + "30" 
										+ seperator2 + "00"; 
						}else{
						var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate  
										+ " " + "11" + seperator2 + "30" 
										+ seperator2 + "00";  
										}
						return currentdate;  
				},
		 isVacationFunc(){
			 if(this.mainData.qjxz=='年假(休假)'){
				this.isVacation=true
				// this.util.
				var qjxz=this.mainData.qjxz;
				if(qjxz=="年假(休假)"){
				var sql = "select inDate  from org_user where userid='"+this.userId+"'";
				var params ;
				this.Sys_GetDataBySql(sql,params,'1');

			
				
				var sql1="select peon  from G001_office_qj where userid='"+this.userId+"' and qjxz='年假(休假)' and begindate>'" +new Date().getFullYear()+"-01-01 'and lock='-5'";
				this.Sys_GetDataBySql(sql1,params,'1');
				
				
				}


			 }else{
				this.isVacation=false;
			 }
		 },
		Sys_GetDataBySql(sql,params,type){
			var flag
			if(sql== "select inDate  from org_user where userid='"+this.userId+"'"){
				flag=true
			}else{
				flag=false
			}
		 var result=null;
		 var 	params1 ={
				flag:type,
				params : params== null ? "":JSON.stringify(params),
				type:'1',
				sql:sql
			};
			var _this=this
	  this.util.post('/admin/appAgentAction!runAgent.action?agentId=Agent_Sys_GetDataBySql&appId=Sys',params1,function (response) {  
				var responseText = response	;
				if(responseText != undefined && responseText != null && responseText != ""){
					result = responseText;
				}else{
					result = null;
				}
				 if(flag){
						var inDate=result[0].inDate;
						var nowData="";
						if(inDate.substring(0,4)==new Date().getFullYear()){
							nowData=new Date().getFullYear()+"-"+(new Date().getMonth()+1)+"-"+new Date().getDate();
						}else{
							nowData=new Date().getFullYear()+"-1-1";
						}
						_this.iDays =  _this.datedifference(inDate, nowData);
				 }else{
					 var disLeave=0;
					 if(result && result.length >0){
							for(var i=0;i<result.length;i++ ){
								disLeave+=result[i].peon;
							}
						}
						
							var yearLeave=0;
				if(_this.iDays>90&&_this.iDays<=365){
					yearLeave=parseInt(_this.iDays/30/3);
					if(yearLeave>4){
					yearLeave=4;
					}
				}else if(365*2>_this.iDays&&_this.iDays>=365){
					yearLeave=5;
				}else if(_this.iDays>=365*2){
					yearLeave=parseInt(_this.iDays/365)+4;
					}
					_this.mainData.njts=yearLeave;
					_this.mainData.yxnjts=disLeave;
					_this.mainData.synjts=yearLeave-disLeave;
					
				 }
				
				
		})


	},
	 datedifference(sDate1, sDate2) {    //sDate1和sDate2是2006-12-18格式  
        var dateSpan,
            tempDate,
            iDays;
        sDate1 = Date.parse(sDate1);
        sDate2 = Date.parse(sDate2);
        dateSpan = sDate2 - sDate1;
        dateSpan = Math.abs(dateSpan);
        iDays = Math.floor(dateSpan / (24 * 3600 * 1000));
        return iDays
},

	 selectUser(){
		 this.$refs.memberfile.postMsg({ singer: true, radioCheckedArr: [] })
		 this.userModel.visible = true;
	 },
	 loadData() {
		var _this = this;
		if (!this.isNewFlag) {
			this.util.mask("正在加载...");
			this.util.initData({id:this.id ,sqlTableName:this.sqlTableName},function(data){
				_this.util.unmask();
				_this.mainData.sn = data.sn;
				_this.mainData.czy = data.czy;
				_this.voiceRecognition.content = data.reason;
				_this.mainData.fsrq = data.fsrq;
				_this.mainData.begindate = data.begindate;
				_this.mainData.enddate = data.enddate;
				_this.userNames = data.username;
				_this.userIds = data.userid;
				_this.mainData.peon = data.peon;
				_this.mainData.qjxz = data.qjxz;
				_this.isVacationFunc()
			});
			
		}
	},
	 checkValid() {
		// if(!this.validUtil.isNotEmpty(this.userModel.userUid)){
		// 	this.util.failueToast('请选择员工');
		// 	return false;
		// }
		
		// if(!this.validUtil.isNotEmpty(this.mainData.peon)){
		// 	this.util.failueToast('请输入请假天数！');
		// 	return false;
		// }
		if(!this.validUtil.isNotEmpty(this.mainData.qjxz)){
			this.util.failueToast('请选择请假性质！');
			return false;
		}
		if(!this.validUtil.isNotEmpty(this.voiceRecognition.content)){
			this.util.failueToast('请选择请假原因！');
			return false;
		}
		return true;
	},	
	 getData(){
		var _this = this;
		this.mainData.Subject = "请假申请";
		this.mainData.username = this.userNames;
		this.mainData.userid = this.userIds; 
		this.mainData.czyId = this.userIds; 
		this.mainData.reason = this.voiceRecognition.content;
		var filesData = new Array();
		for (var i=0;i< this.attachmentModel.fileList.length;i++) {
			var file = this.attachmentModel.fileList[i];
			if (file.isNewFlag) {
				filesData.push(file);
			}
		}
		
		var params = { sqlTableName: this.sqlTableName, mainFormData: JSON.stringify(this.mainData), filesData: JSON.stringify(filesData), deleteFilesData: _this.attachmentModel.deleteFilesList.join(",") };
		if (this.validUtil.isNotEmpty(this.id)) {
			params['id'] = this.id;
			params['businessKey'] = this.id;
		}
		params['symbol'] = this.symbol;
		params['formId'] = this.formId;
		params['subject'] = "请假申请";
		return params;
			
	},
	cancelCallback(){
		if(this.validUtil.isNotEmpty(this.id)){
			history.back();
		}else{
			WeixinJSBridge.call('closeWindow');
		}
		
	}
	
	
	
   }
}
</script>

<style lang="scss" scoped>
#myCell{
	border-top:1px solid #eee
}
.weui-select{
	height:100%;
	line-height:28px;
	padding-right: 0px;
	direction: rtl;
}

.jr-bill-out{
  background: #fff;
  margin-bottom: 13px;
  padding: 0 10px;
  overflow: hidden;
}
.jr-bill-out>div{
  
  overflow: hidden;
}
.jr-bill-out>div>span{
float: left;
  color: #ccc;

}
.jr-bill-out>div>span:last-child{
float: right;
}
.jr-bill-name{
  margin: 0;
  text-align: left;
  font-size: 16px ;
  color: #000;
}
.jr-bill-title{
  padding: 5px 0 0;
}
.jr-bill-content{
  padding:0 0 5px ;
  border-bottom: 1px dashed #ccc
}
.jr-bill-foot{
  padding: 5px 0 ;
}
.jr-bill-out>div .jr-bill-state{
  width: 50px;
  height: 22px;
  line-height: 22px;
  font-size: 12px;
  color: #fff;
  border-radius: 11px;
}
 .price{
  height: 48px;
  line-height: 48px;
  border-bottom: 1px solid #eee; 
  background: #fff;
  }
  .price input{
     height: 40px;
    padding-top: 10px;
    text-align: right;
  }
  .price>span{
    padding: 0 10px;
  }
  .jr-bills1{
    margin-bottom: 10px;
  }
	.weui-cell{
		height: 48px;
	}
</style>

<style>
.jr-bills1 .weui-cell:before{
      border-top: 0 none;
}
.jr-bills1 .vux-cell-primary{
  height: 100%;
  line-height: 27px;
  text-align: right;
}
.jr-bills1 .vux-cell-primary label{
  font-weight: 400;
}
.jr-bills1 .weui-cells_form .weui-cell{
  padding: 0
}
.jr-bills1 .weui-cells_form .weui-cell .weui-textarea{
  padding: 10px;
}
.jr-bills1 .weui-uploader__bd{
  background: #fff;
}
.navbar{
  position: fixed;
  bottom: 0;
  height:55px;padding:5px;
}
.navbar p button{
  width:49%;margin:0;
  height: 45px;
  line-height: 45px;
  float: left;
  border-radius: 5px;
  outline: 0 none;
}
.navbar p .queding{
  float: right;
  background: #1AAD19;
  color: #fff;
}
.bills-popup{
  padding-bottom:55px 
}
</style>
