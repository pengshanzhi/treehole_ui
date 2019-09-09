<template>
<div>
    <!-- 头部导航栏 -->
    <van-nav-bar  title="树洞" left-text="返回" left-arrow fixed @click-left="go('/')" >
        <van-icon size=20px name="other-pay" slot="right" />
    </van-nav-bar>
<br><br>
    <!-- 展示框 -->
    <div v-for="(item,i) in items"  :key=i style="margin:35px 10px 20px 10px;color:white;">
      <div style="margin:10px 6px">
          <van-row>

            <!-- 头像 -->
            <van-col span="4" >
                  <van-image
                    round
                    width="2.7rem"
                    height="2.7rem"
                    src="https://img.yzcdn.cn/vant/cat.jpeg"
                  />
            </van-col>

            <!-- 用户名 -->
            <van-col span="10" style="margin-top:7px">
                {{oneTz.tusername}}
            </van-col>
          </van-row>

          <!-- 标题 -->
          <h4>{{oneTz.ttitle}}</h4> 

          <!-- 正文内容 -->
          <p>{{oneTz.tcontent}}</p>

          
      </div>
    
    </div>
<br><br>

<!-- 回复分割线 -->
    <van-divider :style="{ color: 'white', borderColor: 'white', padding: '0 16px' }">
        全部回复
    </van-divider>
    
     <!-- 回复内容 -->
    <div v-for="(hitem,i) in Aitems"  :key=i style="margin:30px 10px;color:white;">
      <div style="margin:10px 6px">
          <van-row>

            <!-- 头像 -->
            <van-col span="3" >
                  <van-image
                    round
                    width="2rem"
                    height="2rem"
                    src="https://img.yzcdn.cn/vant/cat.jpeg"
                  />
            </van-col>

            <!-- 用户名 -->
            <van-col span="17" style="margin-top:7px">
                {{hitem.rusername}}
            </van-col>
            <!-- 点赞 -->
            <van-col span="2" @click="hitem.showGood=!hitem.showGood">
                <van-icon size=22px name="good-job-o" v-show="hitem.showGood"/>
                <van-icon size=22px  color=red  name="good-job" v-show="!hitem.showGood"/>
            </van-col>
          </van-row>

     

          <!-- 回复内容 -->
          <p>{{hitem.rcontent}}</p>

          
      </div>
        </div>
         <br><br>
          <br><br>
          <br><br>
        
          
        <div style="background-color:#323233;" class="footer">
            <van-row >   
                <!-- 回复框 -->
                <van-col span="20">
                     <textarea rows="2" cols="35" style="background:black;color:white;margin:10px 0px 10px 10px;border-color:black" v-model=content>
                     </textarea>   
                </van-col>
                <van-col span="4" style="margin-top:26px">
                    <van-button color="#3f7cb9" size="mini" @click="sendComfirm()">发表</van-button>
                </van-col>
                
             </van-row>
      
        
        </div>
        


</div>
</template>

<script>
import { NavBar,Icon,Image,Row, Col,Pagination,Divider,Button,Dialog } from 'vant';

export default {
  name: 'Home',
    components: {
    [NavBar.name]:NavBar,
    [Icon.name]:Icon,
    [Image.name]:Image,
    [Row.name]:Row,
    [Col.name]:Col,
    [Pagination.name]:Pagination,
    [Divider.name]:Divider,
    [Button.name]:Button
  },data () {
    return {
      tno:'',
      tpage:'',
      content:"",
        oneTz:{},
        Aitems:[],
        items:[//信息条目
        {
          username:"彭山芝",
          title:"说说今天你有什么难过的事情？",
           content:"你一个人的时候，会孤单吗？如果梦想有一双翅膀，你会选择飞翔吗？当你被折断翅膀，伤痕累累，别哭，我们一起渡过。",
           showGood:true,
        }],
         Hitems:[//回复条目
        {
          username:"Lily",
          content:"如人饮水，冷暖自知。",
          showGood:true,
        },
        {
          username:"Peng",
          content:"有的时候真的想哭，可是哭给谁看呢？不过是自己骗自己罢了",
          showGood:true,
        }
        ]
     }
  
  },
  methods:{
      go(where){
          this.$router.push(where);
    
    },
    refresh(where){
      this.$router.push({
                path:where,
                name:'refresh',
                params:{
                tno:this.tno,
                tpage:this.tpage
                }
              })
    },
    sendComfirm(){
          Dialog.confirm({
          title: '发送',
          message: '确定发送？',
          beforeClose
        }).then(() => {
          this.postReply();
          this.refresh('/refresh');
        }).catch(() => {
          this.refresh('/refresh');
        });
    },
    getParams () {
        // 取到路由带过来的参数 
         
        // 将数据放在当前组件的数据内
        this.tno = this.$route.params.tno,
        this.tpage = this.$route.params.tpage
      },
      getOneTzByPageno(){
   
      console.log(this.tno)
      this.$ajax('getOneTz/'+this.tpage+'&'+this.tno).then(res => {
      console.log(res);
      this.oneTz=res.data;  
    });
    },
    postReply(){
      
      
      this.$ajax({
        method:"post",
        url:'ReplyTz?username='+'温如玉'+'&content='+this.content+'&tPage='+this.tpage+'&tno='+this.tno,
 
    }).then(res => {
      console.log(res);
      this.oneTz=res.data;  
    });
    },
    getReply(){
        this.$ajax({
        method:"post",
        url:'getReply/'+this.tpage+'&'+this.tno,
      
    }).then((res)=>{
        console.log(res.data);
        this.Aitems=res.data;
        var i;      
      for(i=0;i<this.Aitems.length;i++){
        this.$set(this.Aitems[i],'showStar',true)
        this.$set(this.Aitems[i],'showGood',true)
      }
    })

       this.getParams();
      
    }
  },
  created(){
    this.getParams();
    this.getOneTzByPageno();
    this.getReply();
  },
  
  }
    function beforeClose(action, done) {
  if (action === 'confirm') {
    setTimeout(done, 1000);
  } else {
    done();
  }
}

</script>>

<style scoped>
/* 顶部导航栏颜色 */
.van-nav-bar{
    background-color: #323233;
}
/* 顶部导航标题、图标、左侧文字颜色 */
.van-nav-bar__title,.van-nav-bar .van-icon,.van-nav-bar__text{
    color: #ebedf0;
}

.footer{           /*footer绝对定位*/
   
  position: fixed;
 

 width: 100%;
bottom:0;
  z-index: 1000;
 left:0
   
}

</style>