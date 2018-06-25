<template>
  <div class="choose">
      <div class="row" style="margin:0;background:#fff;border-bottom:1px solid #EFEFF4;height:44px;overflow:hidden" >
        <div v-if="!swichFlag" class="col-xs-7" style="padding:0;line-height: 44px;width:199px;text-align: left;overflow:hidden">
            <datetime v-model="dateStart" @on-confirm="startDay" style="padding:0;float:left;margin-left:3px;" default-selected-value="date" format="YYYY-MM-DD" :placeholder="'请选择日期'"></datetime>
            <span style="padding:0;float:left;margin:0 4px;">到</span>
            <datetime v-model="dateEnd" @on-confirm="endDay" style="padding:0;float:left;" default-selected-value="date" format="YYYY-MM-DD" :placeholder="'请选择日期'"></datetime>
        </div>
         
        <div v-if="!swichFlag"  class="min-seach" style="border-left:1px solid #eee;" >
            <i @click.stop="swichSearch()" class="weui-icon-search"></i>
        </div>
         <div v-if="!swichFlag" class=" row-select" style="width:83px;float:right;overflow-x:auto;overflow-y:hidden;padding:0">
           <div @click="changeSelectModel" class="row-select-span" ><span>{{rowSelect}}</span>&nbsp;
            <i class=""></i>
        </div>
       
        </div>
        <div v-show="swichFlag" class="col-xs-10 noBorder" style="width:100%;padding: 0;">
          <!-- <search v-model="searchValue" style="background-color: #fff;" placeholder="搜索" :autoFixed="false" @on-submit="handleClick" @on-cancel="cancelClick" ref="search"></search> -->
            <div class="weui-search-bar weui-search-bar_focusing" style="background-color: #fff;">
                <div class="weui-search-bar__form">
                    <div class="weui-search-bar__box">
                        <i class="weui-icon-search"></i>
                        <input type="search" class="weui-search-bar__input" v-model="search" @keyup.enter="handleClick" id="searchInput" placeholder="按名称搜索" required/>
                    </div>
                </div>
                <div  class="weui-search-bar__cancel-btn" @click.stop.prevent="cancelClick">取消</div>
            </div>
        </div>
      </div>
      <div class="options" style="text-align:center;">
          <ul>
            <li v-for="(rowSelectItem,index) in rowSelectList" :key="index" @click="changeState(rowSelectItem)">{{rowSelectItem.label}}</li>
          </ul>
      </div>
      <div id="scroller">
          <scroller height="-45" :use-pulldown="true" :pulldown-config="pulldown" :use-pullup="true" :pullup-config="pullup" lock-x @on-pulldown-loading="loadTop" @on-pullup-loading="onScrollBottom" ref="scrollerBottom">
            <div class="box2"> 
                <div v-for="(item,index) in leaveDatas" :key="index" class="jr-bill-out" @click="editLeave(item)">
                    <div class="jr-bill-title">
                      <span class="jr-bill-code">单据编号：{{item.sn}}</span>
                      <span class="jr-bill-state" :style="'background:'+(item.lock==-5?'#33CC66':(item.lock==0?'#999':(item.lock==-1?'#3399FF ':'red')))">{{item.lock==-5?'已审':(item.lock==0?'未审':(item.lock==-1?'送审':'在审'))}}</span>
                    </div>
                    <p  class="jr-bill-name">{{item.username}}</p>
                    <div class="jr-bill-content">
                      <span class="jr-bill-allday">请假天数：{{item.peon}}</span>
                      <span class="jr-bill-startday">开始日期：{{item.begindate}}</span>
                    </div>
                    <div class="jr-bill-foot">
                      <span class="jr-bill-overday">结束日期：{{item.enddate}}</span>
                      <span class="jr-bill-missday">请假日期：{{item.fsrq}}</span>
                    </div>
                </div>
                <load-more v-if="!noMore" tip="loading" style="margin-top:0px;"></load-more>
                <div v-if="isEnd || leaveDatas.length == 0" class="noMore" style="padding:10px;text-align: center;">已没有更多</div>
            </div>
      </scroller>
  </div>
      <div class="right-panel">
        <ul>
            <li>
                <x-icon @click="add()" type="ios-plus-outline" size="43"></x-icon>
            </li>
        </ul>
      </div>
      
  </div>
</template>

<script>
import { Datetime,Scroller, LoadMore } from 'vux';
import { mapState } from 'vuex'
export default {
  data(){
      return{
          pulldown: {
                content: '下拉刷新',
                height: 60,
                autoRefresh: false,
                downContent: '下拉刷新',
                upContent: '释放刷新',
                loadingContent: 'Load...',
                clsPrefix: 'xs-plugin-pulldown-'
            },
            pullup: {
                content: '上拉加载更多',
                pullUpHeight: 50,
                height: 40,
                autoRefresh: false,
                downContent: '释放加载更多',
                upContent: '上拉加载更多',
                loadingContent: 'Loading...',
                clsPrefix: 'xs-plugin-pullup-'
            },
            scrollTop: 0,
            onFetching: false,
            bottomCount: 10,
            search: '',
            noMore: false,
            list: [],
            pageIndex: 1,
            searchList: [],
            isEnd: false,
            pageSize: 10,
           user:{},
           userNameCode:'',
           positionCode:'',
           popupShow:false,
           search:'',
           swichFlag:false,
           dateEnd: '',
           rowSelect:'审批状态',
           rowSelectId:'',
           isReadOnly: true,
           dateStart:'',
           rowSelectList:[
              {
                label:'所有',
                lock:1
                },
              {
                label:'已审',
                lock:-5
                },
              {
                label:'未审',
                lock:0
                },
              {
                label:'在审',
                lock:-2
                },
              {
                label:'送审',
                lock:-1
            }],
            leaveDatas:[],
            list:[],
            listA:[],
            voiceRecognition:{},
            attachmentModel:{},
      }
  },
  computed: {
  	...mapState({
				temp: state => state.temp,
        userId: state => state.userId
  	}),
  },
  created(){
    
  },
  activated(){
    this.util.init(this);
      if(this.temp!=null&&typeof this.temp=="string"&&this.temp.indexOf("loadEntrepot")>=0){
        this.loadTop();
        this.temp=null;
      }else if (this.leaveDatas.length == 0) {
          
        this.loadData('upLoad');
      }
  },
  components:{
    Datetime,Scroller, LoadMore
  },
  methods:{
    startDay(){
        this.loadData("downLoad");
    },
    endDay(){
        this.loadData("downLoad");
    },
    handleClick() {
        if (!this.validUtil.isNotEmpty(this.search)) {
            if (this.list.length > 0) {
                this.leaveDatas = this.list;
                this.allLoaded = false;
                this.noMore = true;
                this.$nextTick(() => {
                    this.$refs.scrollerBottom.reset()
                });
                return;
            }

        }
        this.leaveDatas = [];
        this.pageIndex = 1;
        this.loadData("downLoad");
    },
    onScrollBottom() {
        if (this.isEnd) {
          this.$refs.scrollerBottom.donePullup();
          return;
        }
        if (this.onFetching) {
          // do nothing
        } else {
          this.onFetching = true;
          this.noMore = false;
          this.pageIndex = this.pageIndex + 1;
          this.loadData("upLoad");
        }
		},
    loadTop() {
        this.onFetching = true;
        this.isEnd = false;
        var xmArr = this.leaveDatas;
        this.pageIndex = 1;
        this.loadData('downLoad');

    },
    loadData(type, creatTime) {
        var param = {
            search: this.util.isNotEmpty(this.search) ? this.search : null,
            operateType: 'getLeaveDatas',
            pageIndex: (type == 'upLoad' ? this.pageIndex : 1),
            begindate:this.dateStart ? this.dateStart : null,
            enddate:this.dateEnd ? this.dateEnd : null,
            lock: typeof(this.rowSelectId)=='string' ?1:this.rowSelectId ,
            userId:this.userId
        };
        var _this = this;
        if (_this.util.isNotEmpty(_this.search) && type == 'downLoad') {
            _this.util.mask("正在搜索...");
        }
        _this.onFetching = true;
        console.log(param)
        this.util.post('/admin/appAgentAction!runAgent.action?agentId=Agent_WeChat_Leave&appId=wechat', param, function(res) {
            _this.noMore = true;

            // console.log(res)
            if (_this.util.isNotEmpty(_this.search) && type == 'downLoad') {
                _this.util.unmask();
            }
            if (res.data == undefined || res.data.length == 0) {
                if (_this.util.isNotEmpty(_this.search) && type == 'downLoad') {
                    _this.searchList = [];
                    _this.leaveDatas = [];
                }
                if (type == 'upLoad') {
                    _this.allLoaded = true;// 若数据已全部获取完毕
                    if (res.ifEnd) {
                        _this.isEnd = true;
                    }
                }
                _this.$nextTick(() => {
                    _this.$refs.scrollerBottom.reset()
                })
                _this.onFetching = false;
                _this.$refs.scrollerBottom.donePullup();
                _this.$refs.scrollerBottom.donePulldown();
                //var dom = _this.$refs.scrollerBottom.$el;
                //dom = $(dom).find('.xs-container')[0];
                //$(dom).css('transform', 'translateX(0px) translateY(0px) translateZ(0px) scale(1, 1)');
                return;
            }
            if (type == 'downLoad') {
                //下拉
                _this.leaveDatas = res.data;
                if (_this.validUtil.isNotEmpty(_this.search)) {
                    _this.searchList = _this.data;

                } else {
                    _this.list = _this.leaveDatas;
                }
                _this.$nextTick(() => {
                    _this.$refs.scrollerBottom.reset()
                });
                // 加载更多数据
                // _this.$refs.loadmore.onTopLoaded();
                _this.$refs.scrollerBottom.donePulldown();
                _this.onFetching = false;
                if (res.ifEnd) {
                    _this.isEnd = true;
                } else {
                    _this.isEnd = false;
                }
            } else if (type == 'upLoad') {
                _this.leaveDatas = _this.leaveDatas.concat(res.data);
                if (_this.validUtil.isNotEmpty(_this.search)) {
                    _this.searchList = _this.leaveDatas
                }else{
                    _this.list = _this.leaveDatas;
                }
                _this.$nextTick(() => {
                    _this.$refs.scrollerBottom.reset()
                });
                _this.onFetching = false;
                _this.$refs.scrollerBottom.donePullup();
                if (res.ifEnd) {
                    _this.isEnd = true;
                } else {
                    _this.isEnd = false;
                }
            }
            if (_this.pageIndex == 1) {
                
            }
        });
    },
    editLeave(item){
        this.$router.push({name:'leave/add',query:{id:item.id}});
    },
    swichSearch(){

        // this.search="";
        this.swichFlag=true;
    },
    add(){
      this.$router.push({name:'leave/add'});
    },
    cancelClick(){
        this.swichFlag=false;
        this.handleClick();
    },
    changeState(item){
      this.rowSelect=item.label;
      this.rowSelectId=item.lock;
      this.loadData("downLoad");
      
      // if(item.lock==1||item.lock==2||item.lock==3){
      // for(var i=0;i<this.data.length;i++){
      //     if(this.data[i].lock==item.lock){
      //       this.listA.push(this.data[i])
      //     }
      //   }
      // }else{
      //   this.listA=this.data;
      // }
      $('.options').slideToggle();
    },
     changeSelectModel(){
      $('.options').slideToggle();
    },
  }
}
</script>


<style lang="less" scoped>
.choose .row .min-seach{
    max-width:40px;
    width:10%;
    float: right;
    height: 28px;
    line-height: 28px;
    margin:8px 5px 0px 0;
    box-sizing: border-box;
    border-radius: 5px;
}
.row-select-span{
  box-sizing: border-box;
  display: inline-block;
  height: 36px;
  padding:0 5px;
  float: left;
  overflow-y: hidden;
  overflow-x: auto;
  line-height: 36px;
}
.row-select-span span{
    margin:0;
    display: inline;
    color:#000;
    white-space: nowrap;
}
.icon-comm{
    font-size: 13px;
    padding: 0px 3px 0px 5px;
    border-radius: 12px;
    color:#fff;
}
.choose{
  background:#eee;
}
.choose .row {
  position: relative;
}
 .options{
  display: none;
  position: absolute;
  background-color: #fff;
  z-index: 2;
  top: 44px;
  right: 40px;
  width: 83px;
  box-sizing: border-box;
  border: 1px solid #ccc;
}
.choose .row .options s{
  content:'';
  width: 10px;
  height: 10px;
  background:#fff;
  position: absolute;
  top:-6px;
  border-top: 1px solid #ccc;
  border-left: 1px solid #ccc;
  transform: rotate(45deg)
}

.options ul{
  margin:0;
  width:83px;
  
}
.options ul li{
  width: 100%;
  border-bottom: 1px solid #ccc;
}
.options ul li:active{
  background: #ccc;
}
.options ul li:last-child{
  width: 100%;
  border-bottom:0 none;
}
.choose .row .row-select{
  height: 44px;
  padding: 0 0 0 0.2rem;
  display: flex;
  justify-content: center;
  align-items: center;
}
.choose .icon{
  height: 14px;
}
.row-select-span i{
  position: relative;
}

span{
  display: block 
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
.right-panel{
    position: fixed;
    bottom: 1.3rem;
    right: .5rem;
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
