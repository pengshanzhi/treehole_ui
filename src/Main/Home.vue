<template>
  <div class="Home" >
      <!-- 头部导航栏 -->
    <van-nav-bar title="树洞"  fixed >
        <van-icon size=20px name="manager-o" slot="right" />
    </van-nav-bar>
  <br><br>
  <!-- 顶部头图 -->
  <div style="text-align:center;margin-top:3px">
  <img   src="../assets/homeTop.png" alt="" width=98% >
  </div>
  <div style="min-height:325px;margin:30px 8px;">
  <!-- 展示框 -->
    <div v-for="(item,i) in Aitems " :key=i    style="color:white;" >
      <div style="margin:10px 6px" >
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
                {{item.tusername}}
            </van-col>
          </van-row>

          <!-- 标题 -->
          <p @click="goes('/Detail',i)">{{item.ttitle}}</p> 

          <!-- 点赞，回复 -->
            <van-row>
              <van-col span="1">
                
              </van-col>
              <van-col span="2" @click="item.showStar=!item.showStar">
                <van-icon size=20px name="star-o"  v-show="item.showStar" />
                <van-icon size=20px  color=#ffab25  name="star" v-show="!item.showStar"/>
              </van-col>
              <van-col span="8" >
              </van-col>
              <van-col span="2" @click="go('/Detail')">
                 <van-icon size=21px name="comment-o"/>
                
              </van-col>
              <van-col span="8" >
              </van-col>
              <van-col span="2" @click="item.showGood=!item.showGood">
                <van-icon size=22px name="good-job-o" v-show="item.showGood"/>
                <van-icon size=22px  color=red  name="good-job" v-show="!item.showGood"/>
              </van-col>
            </van-row>
      </div>
        
    </div>
 <br><br>
 </div>
 <!-- 分割线 -->
    <van-divider>翻页查看前一天内容</van-divider>
 
    

<!-- 翻页 -->
<van-pagination 
  v-model="currentPage" 
  :page-count="12"
  mode="simple" 
  @change= getTzByPage() 
/>
  </div>
</template>

<script>
import axios from 'axios';
import { NavBar,Icon,Image,Row, Col,Pagination,Divider } from 'vant';

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
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      currentPage: 1,//当前页码
      items:[//信息条目
        {
          username:"彭山芝",
          title:"说说今天你有什么难过的事情？",
          showStar:true,//收藏点击变化
           showGood:true,//点赞点击变化
        },{
          username:"彭山芝",
          title:"说说今天你有什么难过的事情？",
          showStar:true,//收藏点击变化
          showGood:true,//点赞点击变化
        },{
          username:"彭山芝",
          title:"说说今天你有什么难过的事情？",
          showStar:true,//收藏点击变化
          showGood:true,//点赞点击变化
        }],
      Aitems:[],
      username:"彭山芝",
      title:"说说今天你有什么难过的事情？",
      showStar:true,//收藏点击变化
      showGood:true,//点赞点击变化
      sky:{
          backgroundImage: "url(" + require("../assets/sky.png") + ")"
      }
    }
  },
    methods:{
      go(where){
          this.$router.push(where);
    
    },
    goes(where,i){
          this.$router.push({
                path:where,
                name:'Detail',
                params:{
                tno:this.Aitems[i].tno,
                tpage:this.Aitems[i].tpage
                }
              })
    
    },
    getTzByPage(){
      this.$ajax('getTz/'+this.currentPage).then(res => {
      console.log(res);
      this.Aitems=res.data;
      var i;      
      for(i=0;i<this.Aitems.length;i++){
        this.$set(this.Aitems[i],'showStar',true)
        this.$set(this.Aitems[i],'showGood',true)
      }
      console.log(this.Aitems);
    });
    }
  },
  created(){
    
      this.getTzByPage();
  }

}
</script>

<style scoped>
/* 顶部导航栏颜色 */
.van-nav-bar{
    background-color: #323233;
}
/* 顶部导航标题、图标、左侧文字颜色 */
.van-nav-bar__title,.van-nav-bar .van-icon,.van-nav-bar__text{
    color: #ebedf0;
}


 /*footer绝对定位*/
/* .footer{          
   
  position: fixed;
 

 width: 100%;
bottom:0;
  z-index: 1000;
 left:0
   
} */





</style>