<template>
	<div class="bill" style="text-align:left;width:100%;min-height: 48px;overflow-x:hidden">
		<div class="titleStyle">
			<p class=" col-xs-5 weui-uploader__title">{{model.title}}</p>
			<div v-if="!model.isReadOnly" class="col-xs-7 weui-uploader__input-box" style="width:26px;height:26px;margin-top: 10px;float: right;">
				<input id="uploaderInput" name="uploaderInput" @change="uploaderCallback" class="weui-uploader__input" type="file" accept="application/vnd.ms-excel,image/*,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" multiple="multiple"/>
			</div>
		</div>
		<div class="weui-uploader__bd">
			<ul class="weui-uploader__files" id="uploaderFiles" style="margin: 0;">
				<li style="margin:3px 5px;position:relative;text-align:left;float: left;overflow:hidden;width:100%;" :class="{fileStyle: img.src==undefined }" v-for="img in model.fileList" :key="img.id">
					<img class="col-xs-3" v-if="img.src!=undefined" @click="previewImage(img.src,img)" style="width:43px;height:43px;padding:0" :src="img.src" alt="">
					<span class="col-xs-6" style="width:61%;height:39px;overflow: hidden;padding-left: 5px;">{{img.fileName}}</span>
					<div class="col-xs-3" style="padding:0;float:right;line-height: 48px;">
						<img style="width:25px;height:25px;margin-right: 10px;" @click="download(img)" src="../../assets/download.png">
						<img style="width:25px;height:25px;" @click="removeImage(img)" src="../../assets/delete.png">
					</div>
				</li>
			</ul>
			
		</div>
		
	</div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import '@/public/js/ajaxfileupload.js';
export default {
	name: 'selectProj',
	data() {
		return {
			value: '',
			showDelete: false,
			baseUrl:'',
			imgType:['jpg','jpeg','png','jpe','gif'],
			excelType:['xls','xlsx'],
			wordType:['doc','docx']
		}
	},
	computed: {
		preViewImageList: function () {
			var arr = new Array();
			for (var i = 0; i < this.model.fileList.length; i++) {
				if(this.model.fileList[i].src!=undefined&&this.model.fileList[i].dataType=='img'){
					arr.push(this.model.fileList[i].src);
				}
				
			}
			return arr;
		}
	},
	watch: {
		model: function (val, oldVal) {
			// console.log('new: %s, old: %s', val, oldVal)
		},
	},
	props: ['model'],
	activated() {
		this.showDelete = false;
		var id = this.util.getUrlParam("id");
		this.loadData(id);
	},
	created(){
		this.showDelete = false;
		var _this = this;
		this.search = '';
		this.baseUrl = this.util.getBaseUrl();
		
	},
	methods: {
		loadData(id) {
			var _this = this;
			_this.model.fileList = new Array();
			if (this.util.isNotEmpty(id)) {
				var params = { parentId: id };
				if (this.util.isNotEmpty(this.model.xtype)) {
					params = { parentId: id, xtype: this.model.xtype };
				}
				this.util.post("/attachment/getFiles", params, function (res) {
					if (res.data != undefined && res.data.length > 0) {
						for (var i in res.data) {
							var item = res.data[i];
							item.isNewFlag = false;
							if(_this.validUtil.contains(_this.imgType,item.suffix)){
								item.src = _this.util.getBaseUrl() + '/attachment/look?id=' + item.id + '&access_token=' + _this.util.getAccessToken();
								item.dataType="img";
							}else if(_this.validUtil.contains(_this.excelType,item.suffix)){
								item.src = _this.util.getBaseUrl()+'/static/img/excel.png';
								item.dataType="file";
							}else if(_this.validUtil.contains(_this.wordType,item.suffix)){
								item.src = _this.util.getBaseUrl()+'/static/img/Word.png';
								item.dataType="file";
							}else{
								item.src = _this.util.getBaseUrl()+'/static/img/file_icon.png';
							}
							_this.model.fileList.push(item);
						}
					}
				});
			}
		},
		uploaderCallback(e){
			var _this=this;
			var xtype = "";
			if (this.util.isNotEmpty(this.model.xtype)) {
				xtype = this.model.xtype;
			}
			this.util.mask("正在上传");
			$.ajaxFileUpload({
				url : _this.util.getBaseUrl()+'/wx/uploadTemp',
				secureuri : false,
				fileElementId : 'uploaderInput',
				dataType : 'json',
				type:"post", 
				data :{},
				success : function(res,status) {
					_this.util.unmask();
					if(res.status==200){
						for(var i =0;i<res.data.length;i++){
							var item = res.data[i];
							if(_this.validUtil.contains(_this.imgType,res.data[i].suffix)){
								item.src = _this.util.getBaseUrl() + '/attachment/lookTemp?id=' + item.id + '&access_token=' + _this.util.getAccessToken();
								item.dataType="img"
							}else if(_this.validUtil.contains(_this.excelType,res.data[i].suffix)){
								item.src = _this.util.getBaseUrl()+'/static/img/excel.png';
								item.dataType="file";
							}else if(_this.validUtil.contains(_this.wordType,res.data[i].suffix)){
								item.src = _this.util.getBaseUrl()+'/static/img/Word.png';
								item.dataType="file";
							}else{
								item.src = _this.util.getBaseUrl()+'/static/img/file_icon.png';
							}
							item.isNewFlag = true;
							item.xtype = xtype;
							_this.model.fileList.push(item);

						}
					}
				},
				complete:function(){
					$('#uploaderInput').change(function(){
						_this.uploaderCallback();
					});
				},
				error : function(res, status, e) {
					_this.util.unmask();
					_this.util.alert("导入失败");
				}
			});
			
		},
		previewImage(curId,item) {
			if(item.dataType!="img"){
				return;
			}
			this.wx.previewImage({
				current: curId, // 当前显示图片的http链接
				urls: this.preViewImageList // 需要预览的图片http链接列表
			});
		},
		download(item){
			var url = this.util.getBaseUrl() + '/attachment/download?id=' + item.id + '&access_token=' + this.util.getAccessToken();
			// console.debug(url);
			window.open(url);
		},
		removeImage(img) {
			this.model.deleteFilesList.push(img.id);
			this.model.fileList = this.model.fileList.filter((item) => {
				return item != img;
			});

		},
		delImg() {
			this.showDelete = !this.showDelete;
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
//文件
.fileStyle{
	border: 1px solid #ccc;
	background: #eee;
	box-sizing: border-box;
	background: #336699;
	height: 45px;
    padding: 5px;
}

.weui-uploader__input-box:after{
	width:15px;
}
.weui-uploader__input-box:before{
	height:15px;
}
// .minus{
// 	border-color:#D81E06;
// }
// .minus:after, .minus:before{
// 	background-color:#D81E06;
// }
.minus:before{
	height:0;
}
.minus:after{
	height:3px;
}

.titleStyle{
	height:48px;
	line-height: 47px;
	border-bottom:1px dashed #eee;
	overflow:hidden
}
.bill p {
	padding: 0 10px;
	margin: 0;
}


</style>
