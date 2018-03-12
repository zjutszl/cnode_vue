<template>
  <div class="chinese-article container">

  <br>
  <b-list-group>
    <b-list-group-item v-for="item in siteList" :key="item.id">
        <Tag color="green" v-if="item.top"> 置顶 </Tag>
        <Tag color="green" v-else-if="item.good"> 精华 </Tag>
        <Tag v-else-if="item.tab == 'share'"> 分享 </Tag>
        <Tag v-else-if="item.tab == 'ask'"> 问答 </Tag>
        <Tag v-else-if="item.tab == 'job'"> 工作 </Tag>
        <Tag v-else color="red"> 已删除 </Tag>
      <a :href="'/#/post/'+item.id">
        {{item.title}}
      </a>
      <span style="float:right">（{{item.reply_count}}/{{item.visit_count}}）</span>
    </b-list-group-item>
  </b-list-group>
  <br>
 

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
import { Button, Col, Row, Tag } from "iview";
import axios from "axios";
import * as R from "ramda"
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

export default {
  name: "index",
  components: { Button, Col, Row, Tag},
  data() {
    return {
      siteList: []
    };
  },
  methods: {
    fetchData(tab = "", page_number = 0, limit_topic = 20) {
      axios
        .get("https://cnodejs.org/api/v1/topics", {
          params: {
            tab: tab,
            page: page_number,
            limit: limit_topic
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
