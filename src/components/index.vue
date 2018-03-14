<template>
  <div class="chinese-article container">


  <b-list-group>
    <b-list-group-item v-for="(item,index) in siteList" :key="item.id" v-if="index < limited_topic">
        <Tag color="green" v-if="item.top"> 置顶 </Tag>
        <Tag color="green" v-else-if="item.good"> 精华 </Tag>
        <Tag v-else-if="item.tab == 'share'"> 分享 </Tag>
        <Tag v-else-if="item.tab == 'ask'"> 问答 </Tag>
        <Tag v-else-if="item.tab == 'job'"> 工作 </Tag>
        <Tag v-else color="red"> 已删除 </Tag>
      <a :href="'/#/post/'+item.id">
        {{item.title}}       
      </a>
      <span style="color:#80848f">（{{item.reply_count}}/{{item.visit_count}}）</span>
      <span style="float:right">
        <span><Avatar :src="item.author.avatar_url" shape="square" />
          <span style="color:#80848f">&nbsp;{{timeagoInstance(item.last_reply_at)}}</span>
        </span>
 
      </span>
    </b-list-group-item>

  </b-list-group>
<div id="More">

  <Button @click="moreTopic" type="primary" >加载更多</Button>
</div>
 

    <!-- <div v-for="item in siteList" :key="item.id">
      {{ item.id }} + {{ item.title }}
    </div> -->

    <!-- <footer class="ui center aligned basic segment">
      <div class="ui horizontal divider">特别鸣谢</div>

      <div class="ui centered cards">
        <div class="ui card">
          <div class="ui image">
            <img src="./jsclass.jpg">
          </div>
          <div class="content">
            <a class="header">新生大学JavaScript入门课</a>
            <div class="meta">
              <p class="date">Create in Aug 2017</p>
              <img class="ui avatar image" src="xgyang.jpg">
              <span>徐高阳</span>
            </div>
          </div>
        </div>
      </div>

    </footer> -->


</div>

<!-- <bottomNav/> -->


</template>

<script>
import router from "../router";
import { Button, Col, Row, Tag ,Page} from "iview";
import axios from "axios";
import * as R from "ramda"
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import timeago from 'timeago.js';


var timeagoInstance = new timeago();

export default {
  name: "index",
  components: { Button, Col, Row, Tag,Page},
  data() {
    return {
      siteList: [],
      limited_topic:20,
      limit_topic:100
    };
  },
  methods: {
    fetchData(tab = "") {
      axios
        .get("https://cnodejs.org/api/v1/topics", {
          params: {
            tab: tab,
            page: 0,
            limit: this.limit_topic
          }
        })
        .then(response => {
          if ((response.success = "true")) {
            return response.data;
          } else {
            throw new Error("fail to get Data from CNode");
          }
        })
        .then(response => {
          console.log("congratulation!");
          this.siteList = response.data;
          this.siteList.push("xiaoming");
          this.siteList.pop();
        })
        .catch(err => console.log(err));
    },
    timeagoInstance(time){
      var timeago_instance = new timeago();
      return(timeago_instance.format(time, 'zh_CN'));
    },
    moreTopic(){
      this.limited_topic += 20;
      if(this.limited_topic >= this.limit_topic){
        this.limit_topic += 100;
        this.fetchData(this.$route.params.type);
      }
    }
  },
  mounted() {
    this.fetchData(this.$route.params.type);
  },
  watch: {
    $route(to, from) {
      this.fetchData(this.$route.params.type);
    }
  }
};
</script>
<style src="../assets/chinese-article.css"></style>
<style scoped>
  b-list-group-item > Tag {
     float:left
  }
  b-list-group-item > a {
     float:left
  }

  .container {
    padding-right: 1vh;
    margin-top: 2vh;
    margin-bottom: 2vh;
    margin-left: 18vh;
  }

  #More {
    display: flex;
    justify-content: center;
    margin-top: 2vh;
    margin-bottom:2vh;
  }
</style>

