<template>
    <div id='constr'>
        <div>
                <search placeholder='搜索' cancel-text='取消'></search>

                 <!-- <tab v-model="tabData">
                    <tab-item >项目信息</tab-item>
                    <tab-item >项目分类</tab-item>
                </tab> -->
         </div>
        
       
         <swiper height="100%" width="100%" :threshold="100" :show-dots="false" v-model="tabData" id="yuandibaozha">
            <!-- <swiper-item>
               <div class="listData">
                   <ul v-for="(item,key) in caModel.item" :key='key'>
                       <li  @click="parent(item)">{{item.payeename}}</li>
                   </ul>
               </div>
            </swiper-item> -->
            <swiper-item class="black">
                <ConstructionUseritem v-bind:model='model'  :radioSelectFlags="radioSelectFlag" :orgUsersObj='orgUsersObj' v-bind:level=1 @messageOut="messageIn" v-for='model in caModel.list' :key="model.id"></ConstructionUseritem>
            </swiper-item>
           
        </swiper>
        <div class="my-btn-btnpd">
            <input type="button" class="my-btn-back" @click="close()" value="取消">
            
        </div>
    </div>
</template>
<script>
import { Search } from 'vux'
import { Icon ,Swiper, SwiperItem,Tab, TabItem,XButton  } from 'vux'
import ConstructionUseritem from './ConstructionUseritem.vue';
    
    export default{
        name:'ConstructionUser',
        data(){
            return{
                tabData:0,
                items:[],  //项目信息
                // fenlei:[],//客户分类
                xinxi:[
                    {name:'13245'}
                ],//客户信息
                Show:false,
                userId:'',
               list: [],
               radioSelectFlag:true,
                orgUsersObj: {},
                smil:{

                }
                // list:[
                //     {
                //         label:'123',
                //         checked:false,
                //         children:[
                //             {
                //                 label:'456',
                //                 checked:false,
                //                 children:[
                //                     {
                //                         label:'789',
                //                         checked:false,
                //                         children:[
                                    
                //                         ]
                //                     }
                //                  ]
                //              }
                //         ]
                //     }
                // ]
               
            }
        },
        
        props: ['caModel'],
        components:{
            Search,Tab, TabItem ,Swiper, SwiperItem,Icon,XButton,ConstructionUseritem
        },
       activated() {
        // this.loadData();
        // this.feileiData();
	},
    created() {
        

	},
        methods:{
            messageIn(data){
             
               this.caModel.qiyige.payeename=this.$store.state.myUserList[0].xmmc;
               this.caModel.xinxi.id=this.$store.state.myUserList[0].id;
            
               var id=this.$store.state.myUserList[0].id;
                var param ={operateType:'gwfp',xmid:id}
                
				this.util.post('/admin/appAgentAction!runAgent.action?agentId=Agent_WeChat_Mobile&type=getInfo&sqlWhere=&node=root', param, (res)=> {	
                    this.util.unmask();
                   console.log(res)
					this.caModel.xinxi=res.data[0];
                    this.$emit('xiala')
        		});
                this.close();
                
            },
        //    parent(e){
             
        //         this.caModel.visible=false;
        //         this.caModel.qiyige=e;
               
        //    },
            close() {
                this.$store.state.myUserList=[];
                this.caModel.visible=false;
            },
           
          
           
             creatNear(data) {
            this.createUserLink(data);
        }
             
           
           
           
            
           
        }
    }
</script>
<style scoped>
#constr{
    height:100%;
}
#yuandibaozha {
    padding-bottom: 45px;
    height: 85%;
}
ul {
    margin:0;
}
.listData ul li{
    font-size:16px;
    text-align: left;
    padding-left: 2%;
    height:35px;
    line-height: 35px;
}
.cation {
    text-align: left;
    font-size:16px;
    margin: 1% 5%;
}
.fenlei ul{
    margin:10px 0;
    text-align: left;
    padding-left: 5%;
}.foot{
    position: absolute;
    bottom: 0;
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
</style>
