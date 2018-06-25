<template>
    <div id='constr'>
        <div>
                <search @on-change='sousuo(xmmc)' v-model="sgdw"  placeholder='搜索' cancel-text='取消'></search>

         </div>
        <div >
            <div class='tit'>施工单位</div>
            <ul class='tit-list' >
                <li @click="parent(item)" v-for="item in items">{{item.sgdw}}</li>
            </ul>
        </div>


        <div class="my-btn-btnpd">
            <input type="button" class="my-btn-back" @click="close()" value="取消">
        </div>
    </div>
</template>
<script>
import { Search } from 'vux'
import { Icon ,Swiper, SwiperItem,Tab, TabItem,XButton  } from 'vux'
// import ConstructionUseritem from './ConstructionUseritem.vue';

    export default{
        data(){
            return{
                tabData:0,
                 items:[
                   {sgdw:'123'},
                   {sgdw:'456'},
                   {sgdw:'789'}
                 ],
              sgdw:''
                // Show:false,
            }
        },
        props: ['appModel'] ,
        components:{
            Search,Tab, TabItem ,Swiper, SwiperItem,Icon,XButton,
        },
        activated() {
        this.getDatas();
	      },
        methods:{
            sousuo(data){
              var param ={methodType :"sgdw",xmmc:data};
              console.log(param.xmmc)
            //   debugger;
				this.util.post('/admin/appAgentAction!runAgent.action?agentId=Agent_WeChat_Mobile', param, (res)=> {
					this.util.unmask();

                    console.log(res)
					this.items=res.data;

        		});
            },
             getDatas(){
                var param ={methodType :"sgdw"};
				    this.util.post('/admin/appAgentAction!runAgent.action?agentId=Agent_WeChat_Mobile', param, (res)=> {
              this.util.unmask();
              console.log("res.data: ", res.data)
              if (res.data) {
                this.items=res.data;
              }
        		});
			},
           parent(e){
                this.appModel.visible=false;
                this.appModel.qiyige=e;
           },
           xian(){
               this.Show=!this.Show;
           },
            close() {
                this.appModel.visible=false;
            },
        }
    }
</script>
<style scoped>
#constr{
    height:100%;
    overflow: scroll;
}






.my-btn-btnpd {
    width: 100%;
    position: absolute;
    box-sizing: border-box;
    height: 45px;
    bottom: 0px;
    padding: 5px 30px 10px;
    background-color: #fafafa;
}

.my-btn-btnpd>input {
    width: 45%;

    height: 100%;
    border-radius: 10px;
    font-size: 14px;
    color: #fff;
}



.my-btn-btnpd .my-btn-back {
    background-color: #9E5;
    display: block;
    width: 80%;
    margin:0 auto;
}
.tit{
    font-size: 18px;
    padding-left:1%;
}
.tit-list{
    font-size:16px;
    padding-left: 5%;
}
.tit-list li{
    padding:1% 0;
    margin-top: 20px;
    }
</style>
