<template>

  <div class="chinese-article">
    <!-- <Button @click="fetchAuthorData()">fetchAuthorData</Button> -->
    <Row>
        <Col span="13" offset="2">
            <!-- 测试返回值专用 -->
            <!-- <Button @click="fetchData()">back</Button> -->
            <!-- 
            {{$route.params.id}} -->
            <!-- <p v-for="item in postkey" :key="item.id">
              {{ item }}:{{post[item]}}
            </p> -->
            <!-- 测试返回值专用（结束） -->
            
          <div class="page-header">
            <h1><Tag color="green" v-if="post.top">置顶</Tag>{{post.title}}</h1>
          </div>
          <p id="subhead">发布时间：{{post.create_at}} 
            作者：{{post.author.loginname}} 
            {{post.visit_count}}次浏览
          </p>
          <Button @click="gotoTest">test model</Button>

          <div v-html="content" id="article"></div>

          <h1>评论区</h1>

          <div v-if="post.replies.length !== 0">
            <div v-for="item in post.replies">
            
              <Avatar :src="item.author.avatar_url" />
              <!-- {{ item.id }} -->
              {{ item.author.loginname }}
              <div id="comment">
              <div v-html="item.content"></div>
              <div style="float:right">
                <Icon type="thumbsup" ></Icon><span> {{ item.ups.length }}        {{ timeagoInstance(item.create_at) }}</span>   
              </div>
              </div>
            </div>
          </div>
          <div v-else>
            <p>还没有人评论，来占个沙发吧~</p>
          </div>
        </Col>

        <Col span="5" offset="2">
           <Card bordered dishover id="author_card">
                <span slot="title">作者信息</span>
                <img :src="Author.avatar_url">
                 <!-- <Avatar :src="Author.avatar_url" /> -->
                <span>{{Author.loginname}}</span>
                <p>作者的其他话题</p>
                <div v-for="item in Author.recent_topics">
                  · <a :href="'/#/post/'+item.id">{{ item.title}}</a>
                </div>
            </Card>
        </Col>

    </Row>

  

  
  </div>
</template>

<script>
import router from "../router";
import { Button, Table, Col, Row, Tag , Card , Avatar  } from "iview";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import timeago from 'timeago.js';

var timeagoInstance = new timeago();
console.log("##################################");

console.log(timeagoInstance.format('2016-06-12', 'zh_CN'));

export default {
  name: "HelloVue",
  data() {
    return {
      post: {},
      content: "",
      postkey:{},
      Author:{},
      tabType:this.$route.params.id,
      authorName:""
    };
  },
  components: { Button, Table, Col, Row, Tag , Card , Avatar  },
  methods: {
    fetchData() {
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
          this.content = response.content;
          this.postkey = Object.keys(response);
          this.authorName = response.author.loginname;
          // console.log(this.authorName);          
        })
        .catch(err => console.log(err));
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
    }
  },
  mounted(){
    this.fetchData();
    // this.fetchAuthorData();
  },
  watch:{
    authorName: 'fetchAuthorData'
  }
};
</script>

<style src="../assets/chinese-article.css"></style>
<style scoped>
#subhead{
  color:#80848f;
  border-bottom: 1px solid #e5e5e5;
  font-size:13px;
}

#author_card  p,#comment{
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


#article {
  /* margin-bottom:20px; */
  border-bottom: 1px solid #e5e5e5;
}
</style>

