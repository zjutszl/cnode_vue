<template>
<div class="page">
 <div class="container chinese-article">
   <br>
<h1>你的消息</h1>
<h2>未读消息</h2>
    <Card :bordered="false" style="width:500px" v-for="item in unRead" :key="item.id">
      <p slot="title"></p>
      <p></p>
      <button @click.native="item.has_read=true"></button>
    </Card>
<h2>未读消息</h2>
    <Card :bordered="false" style="width:500px" v-for="item in hasRead" :key="item.id">
      <p slot="title"></p>
      <p></p>
      <button @click.native="item.has_read=true"></button>
    </Card>
<br>
</div>
</div>
 
</template>

<script>
import router from "../router";
import { Button, Col, Row, Tag } from "iview";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

export default {
  name: "authorMessage",
  components: { Button, Col, Row, Tag },
  data() {
    return {
      hasRead: [],
      unRead:[

        {
        id: "543fb7abae523bbc80412b26",
        type: "at",
        has_read: false,
        author: {
          loginname: "alsotang",
          avatar_url: "https://avatars.githubusercontent.com/u/1147375?v=2"
        },
        topic: {
          id: "542d6ecb9ecb3db94b2b3d0f",
          title: "adfadfadfasdf",
          last_reply_at: "2014-10-18T07:47:22.563Z"
        },
        reply: {
          id: "543fb7abae523bbc80412b24",
          content: "[@alsotang](/user/alsotang) 哈哈",
          ups: [ ],
          create_at: "2014-10-16T12:18:51.566Z"
          }
        }

      ]
    };
  },
  methods: {
    // getMessage(tab = "", page_number = 0, limit_topic = 20) {
    getMessage() {
      axios
        .get(" https://cnodejs.org/api/v1/messages", {
          params: {
            accesstoken: localStorage.getItem("AccessToken")
          }
        })
        .then(response => {
          if ((response.success = "true")) {
            console.log("#### authorMessage.vue : you get my message!");
            this.hasRead = response.data.data.has_read_messages;
            this.unRead = response.data.data.hasnot_read_messages;
          } else {
            throw new Error("fail to get Data from CNode");
          }
        })
        .then(response => {
          console.log("congratulation!");
          // this.siteList = response.data;
          // this.siteList.push("xiaoming");
          // this.siteList.pop();
        })
        .catch(err => console.log(err));
    },

    getStar() {
      axios
        .get(" https://cnodejs.org/api/v1/topic_collect" + this.$router.params.loginname)
        .then(response => {
          if ((response.success = "true")) {
            console.log("############# No.9 ####################");
            console.log(response.data.data);
          } else {
            throw new Error("fail to get Data from CNode");
          }
        })
        .then(response => {
          console.log("congratulation!");

        })
        .catch(err => console.log(err));
    },

    getTheme(){
      // axios
      //   .get(" https://cnodejs.org/api/v1/topic_collect" + this.$router.params.loginname)
      //   .then(response => {
      //     if ((response.success = "true")) {
      //       console.log("############# No.9 ####################");
      //       console.log(response.data.data);
      //     } else {
      //       throw new Error("fail to get Data from CNode");
      //     }
      //   })
      //   .then(response => {
      //     console.log("congratulation!");

      //   })
      //   .catch(err => console.log(err));
    }
  },
  mounted() {
    // this.fetchData(this.$route.params.type);
    switch (this.$route.params.type){
      case 'message':
        this.getMessage();
        break;
    }
  // },
  // watch: {
  //   $route(to, from) {
  //     this.fetchData(this.$route.params.type);
  //   }
  }
};
</script>
<style src="../assets/chinese-article.css"></style>
<style scoped>
.page {
  background-color: #e1e1e1;
}

h1 {
  margin: 10px 0px;
}
</style>

