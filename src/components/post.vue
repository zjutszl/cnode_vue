<template>

  <div class="chinese-article">

    <Row>
        <Col span="13" offset="2" id="content">
        
        <!-- 正文 -->
            <article>
              <div class="page-header"  >
                <h1><Tag color="green" v-if="post.top">置顶</Tag>{{post.title}}</h1>
              </div>
              <p id="subhead">发布时间：{{  timeagoInstance(post.create_at)}}&nbsp;
                作者：{{post.author.loginname}}&nbsp;
                {{post.visit_count}}次浏览
              </p>
              <Button @click="gotoTest">test model</Button>
              <div v-html="content"></div>
            </article>

            

        <!-- 评论区  -->
          <h1>评论区 <Icon type="chatboxes"></Icon></h1>

          <div v-if="post.replies.length !== 0">
            <div v-for="(item,index) in post.replies" :key="index" id="comment-all" >
              <div id="comment-users">
                <Avatar :src="item.author.avatar_url" shape="square" />
                &nbsp;{{ item.author.loginname }}
                <span style="font-size:1.5vh;color:#80848f">&nbsp;{{ index+=1 }}楼·{{ timeagoInstance(item.create_at) }}</span>
              </div>

              <Comment :content="item.content" :ups="item.ups" :reply="item.id"></Comment>
              
            </div>
          </div>
          <div v-else>
            <p>还没有人评论，来占个沙发吧~</p>
        </div>
        </Col>
        <Spin fix v-if="spinShow">
              <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
              <div>Loading</div>
        </Spin>

        <Col span="5" offset="2">

        <!-- <Affix :offset-top="0"> -->
          
          <Card bordered dishover id="author_card">
              <span slot="title">作者信息</span>
              <a :href="'/#/profile/'+Author.loginname+'/index'">
                <img class="img-rounded" :src="Author.avatar_url" style="width:10vh;height:10vh">
              </a>
                <!-- <Avatar :src="Author.avatar_url" /> -->
              <a :href="'/#/profile/'+Author.loginname+'/index'">{{Author.loginname}}</a>
              <p>作者的其他话题</p>
              <div v-for="item in Author.recent_topics" :key="item.id">
                · <a :href="'/#/post/'+item.id">{{ item.title }}</a>
              </div>
          </Card>

        <!-- </Affix> -->

           
            <br>
        </Col>

    </Row>
   

  <!-- <bottomNav/> -->

  
  </div>
</template>

<script>
import router from "../router";
import { Button,  Col, Row, Tag , Card , Avatar , Affix  } from "iview";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import timeago from 'timeago.js';
import Comment from './comment'


var timeagoInstance = new timeago();

export default {
  name: "HelloVue",
  data() {
    return {
      post: {},
      content: "",
      postkey:{},
      Author:{},
      tabType:this.$route.params.id,
      authorName:"",
      isShow:false,
      spinShow:true
    };
  },
  components: { Button,  Col, Row, Tag , Card , Avatar ,Affix ,Comment },
  methods: {
    fetchData() {
      this.spinShow=true;
      axios
        .get("https://cnodejs.org/api/v1/topic/" + this.$route.params.id)
        .then(response => {
          if (response.success = "true") {
            console.log("congratulation!");
            return response.data.data;
          } else {
            throw new Error("fail to get Data from CNode");
          }
        })
        .then(response => {
          this.post = response;
          // console.log(JSON.stringify(this.post));
          // console.log(JSON.stringify(response));
          this.content = response.content;
          this.postkey = Object.keys(response);
          this.authorName = response.author.loginname;
          this.spinShow = false;
          // console.log(this.authorName);          
        })
        .catch(err => console.log("err"));
    },
    fetchAuthorData(){
     axios
          .get("https://cnodejs.org/api/v1/user/"+ this.authorName)
          .then(response => {
            if (response.success = "true") {
              // console.log(JSON.stringify(response.data));
              return response.data.data;
              // console.log("congratulation!");
            } else {
              throw new Error("###fail to get Data from CNode###");
            }
          })
          .then(response => {
            this.Author = response;
            // console.log(JSON.stringify(this.Author));
          })
    },
    timeagoInstance(time){
      var timeago_instance = new timeago();
      return(timeago_instance.format(time, 'zh_CN'));
    },
    gotoTest(){
      router.push('/post/'+this.tabType+'/test');
    // },
    // show(index){
    //   this.post.replies[index].isShow=true;
    // },
    // hide(index){
    //   this.post.replies[index].isShow=false;
    //   // this.isShow=false;
    }
  },
  mounted(){
    this.fetchData();
    // this.fetchAuthorData();
  },
  watch:{
    authorName: 'fetchAuthorData',
    $route(to, from) {
      this.fetchData();
    }
  }
};
</script>

<style src="../assets/chinese-article.css"></style>
<style scoped>
h1{
  margin: 4vh 0 3vh 1vh;
}

#subhead{
  color:#80848f;
  border-bottom: 1px solid #e5e5e5;
  font-size:13px;
}

#author_card  p{
  font-size:14px;
  font-weight: 300;
  padding: 4px 1px 0 0;
}

#author_card  a{
  color: #80848f;
  font-size:12px;
  font-weight:100;
  border-bottom: 0px;
}

#author_card  a:hover {
  color:#2d8cf0;
  text-decoration: none;
}

#content {
  background-color: #f8f8f9;
  padding:0 3vh 0 3vh;
  margin-bottom: 3vh;
  border-radius:5px;
}

article {
  padding-bottom: 3vh;
  border-bottom: .8px #495060 dashed
}


#comment-all {
  margin: 1vh 0 3vh 0;
  padding-right: 2vh;
}


#comment-users{
  display: flex;
  flex-flow: row nowrap;
  align-items:center;
  padding:0 0 0 1vh;
}

#comment {
  font-size:14px;
  font-weight: 300;
  /* position:relative; */
  /* width:150px; */
  /* height:35px; */
  line-height: 1;
  background:#E1E1E1;
  border-radius:5px; /* 圆角 */
  /* margin:30px auto 0; */
  padding:1px 1.5vh 1px 1.5vh;
  margin:0 0 0 0;
}

#bubble {
  position: relative;
  top:0px;
  right:-15px; /* 圆角的位置需要细心调试哦 */
  width:0;
  height:0;
  font-size:0;
  border:solid 8px;
  border-color:#F8F8F9 #F8F8F9 #E1E1E1 #F8F8F9 ;
}

.chinese-article code {
  padding: 0px 4px;
  border:0px;  
}

.chinese-article pre {
  padding-top:4px;
  border:0px;
}

 .demo-spin-icon-load{
      animation: ani-demo-spin 1s linear infinite;
  }
  @keyframes ani-demo-spin {
      from { transform: rotate(0deg);}
      50%  { transform: rotate(180deg);}
      to   { transform: rotate(360deg);}
  }
</style>

