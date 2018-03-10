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
          <span v-html="content"></span>
        </Col>

        <Col span="5" offset="2">
            <!-- <Card style="width:320px" dis-hover>
              <p slot="title">
                  <Icon type="ios-person-outline"></Icon>
                  作者信息
              </p>
              <div style="text-align:left">
                  <img :src="post.author.avatar_url">
                  <p>  {{ post.author.loginname}}</p>
              </div>
          </Card> -->
          
           <Card bordered dishover id="author_card">
                <span slot="title">作者信息</span>
                <img :src="Author.avatar_url">
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
import { Button, Table, Col, Row, Tag , Card } from "iview";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

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
  components: { Button, Table, Col, Row, Tag ,Card },
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
          console.log(JSON.stringify(this.post));
          this.content = response.content;
          this.postkey = Object.keys(response);
          this.authorName = response.author.loginname;
          console.log(this.authorName);          
        })
        .catch(err => console.log(err));
    },
    fetchAuthorData(){
     axios
          .get("https://cnodejs.org/api/v1/user/"+ this.authorName)
          .then(response => {
            if (response.success = "true") {
              console.log(JSON.stringify(response.data));
              return response.data.data;
              // console.log("congratulation!");
            } else {
              throw new Error("###fail to get Data from CNode###");
            }
          })
          .then(response => {
            this.Author = response;
            console.log(JSON.stringify(this.Author));
          })
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
</style>

