<template>

  <div class="chinese-article page">
    <Row>
        <Col span="13" offset="2">
            <h2  class="topics">最近创建的话题</h2>
            <b-list-group>
            <b-list-group-item v-for="item in Author.recent_topics" :key="item.id">
              <Icon type="ios-list-outline" color="#2d8cf0"></Icon> 
              <a :href="'/#/post/'+item.id">
                {{item.title}}
              </a>
              
              <span style="float:right"><Avatar :src="item.author.avatar_url" shape="square" /> {{item.author.loginname}} 
                <span style="color:#80848f">{{ timeagoInstance(item.last_reply_at) }}创建</span>
              </span>
            </b-list-group-item>
          </b-list-group>
          
            <h2  class="topics">最近参与的话题</h2>
            <b-list-group  id="downList">
            <b-list-group-item v-for="item in Author.recent_replies" :key="item.id">
              <Icon type="ios-list-outline" color="#2d8cf0"></Icon> 
              <a :href="'/#/post/'+item.id">
                {{item.title}}
              </a>
              
              <span style="float:right"><Avatar :src="item.author.avatar_url" shape="square" /> {{item.author.loginname}} 
                <span style="color:#80848f">{{ timeagoInstance(item.last_reply_at) }}回复</span>
              </span>
            </b-list-group-item>
          </b-list-group>
        </Col>

        <Col span="5" offset="2">
           <Card bordered dishover id="author_card">
                <span slot="title">个人信息</span>
                <img class="img-rounded" :src="Author.avatar_url" style="width:120px;height:120px">
                 <!-- <Avatar :src="Author.avatar_url" /> -->
                <span>{{Author.loginname}}</span>
                <p>积分：{{Author.score}}</p>
                <p>{{timeagoInstance(Author.create_at)}} 注册</p>
            </Card>
            <br>
        </Col>

    </Row>

  
  </div>
</template>

<script>
import router from "../router";
import { Button, Col, Row, Tag } from "iview";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import timeago from 'timeago.js';


var timeagoInstance = new timeago();

export default {
  name: "authorProfile",
  components: { Button, Col, Row, Tag },
  data() {
    return {
      Author:[]
    }
  },
  methods: {

    getTheme(){
      axios
        .get("https://cnodejs.org/api/v1/user/" + this.$route.params.loginname)
        .then(response => {
          if ((response.success = "true")) {
            console.log("############# No.9 ####################");
            console.log(JSON.stringify(response.data.data));
            return response.data.data;

          } else {
            throw new Error("fail to get Data from CNode");
          }
        })
        .then(response => {
          // console.log("congratulation!");
          this.Author = response;
        })
        .catch(err => console.log(err));
      console.log('#####getTheme');
    },

    timeagoInstance(time){
      var timeago_instance = new timeago();
      return(timeago_instance.format(time, 'zh_CN'));
    }
  },
  mounted() {
    this.getTheme()
  },
  watch: {
    $route(to, from) {
      this.getTheme();
    }
  }
}
</script>
<style src="../assets/chinese-article.css"></style>

<style scoped>
#subhead{
  color:#80848f;
  border-bottom: 1px solid #e5e5e5;
  font-size:13px;
}

/* #author_card{
  margin-top:20px
} */

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

.page {
  background-color: #e1e1e1;
}

h1 {
  margin: 10px 0px;
}

.list-group-item {
  /* background-color: #E1E1E1 !important; */
  border:1px solid #dddee1
}


.topics {
  padding:30px 0 0 0;  
}

.page {
  background-color: #e1e1e1;
}

#downList {
  margin-bottom: 20px
}


</style>

