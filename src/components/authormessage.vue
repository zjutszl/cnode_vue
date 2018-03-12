<template>
<div class="page">
 <div class="container chinese-article">
   <br>
<h1>你的消息</h1>
<h2><Icon type="chatbubble-working" color="#2b85e4"></Icon> 未读消息</h2>
<b-list-group>
  <div v-if="unRead.length !== 0">
    <b-list-group-item v-for="(item, index) in unRead" :key="index">

      <!-- <span style="float:right">{{ item.reply.create_at }}</span> -->
      <Avatar :src="item.author.avatar_url" shape="square"/>
      <a :href="'#'">{{ item.author.loginname}}</a> 在
      <a :href="'/#/post/'+item.topic.id">
        {{item.topic.title}}
      </a>
      中@了你
      <span style="font-size:0.6em;color:#80848f">{{ timeagoInstance(item.reply.create_at) }}</span>
    </b-list-group-item>
  </div>
  <b-list-group-item v-else>
    暂无消息
  </b-list-group-item>
</b-list-group>



<h2><Icon type="checkmark-circled" color="#19be6b"></Icon> 已读消息</h2>
<b-list-group>
  <b-list-group-item v-for="(item, index) in hasRead" :key="index">

    <!-- <span style="float:right">{{ item.reply.create_at }}</span> -->
    <Avatar :src="item.author.avatar_url" shape="square"/>
    <a :href="'#'">{{ item.author.loginname}}</a> 在
    <a :href="'/#/post/'+item.topic.id">
      {{item.topic.title}}
    </a>
    中@了你
    <span style="font-size:0.6em;color:#80848f">{{ timeagoInstance(item.reply.create_at) }}</span>
  </b-list-group-item>
</b-list-group>

<br>
</div>
</div>
 
</template>

<script>
import router from "../router";
import { Button, Col, Row, Tag , Avatar} from "iview";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import timeago from 'timeago.js';


var timeagoInstance = new timeago();

export default {
  name: "authorMessage",
  components: { Button, Col, Row, Tag },
  data() {
    return {
      hasRead: [],
      unRead:[]
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
            // console.log("#### authorMessage.vue : you get my message!");
            this.hasRead = response.data.data.has_read_messages;
            this.unRead = response.data.data.hasnot_read_messages;
          } else {
            throw new Error("fail to get Data from CNode");
          }
        })
        .then(response => {
          console.log("congratulation!");
        })
        .catch(err => console.log(err));
    },
    timeagoInstance(time){
      var timeago_instance = new timeago();
      return(timeago_instance.format(time, 'zh_CN'));
    }
  },
  mounted() {
    this.getMessage();
  },
  watch: {
    $route(to, from) {
      this.getMessage();
    }
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

.list-group-item {
  /* background-color: #E1E1E1 !important; */
  border:1px solid #dddee1
}
</style>

