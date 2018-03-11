<template>
  <div id="app" class="chinese-article container">
    <!-- <Row>
      <Col span="18">
        <Menu mode="horizontal" :theme="'light'" active-name="" @on-select='fetchData'>
            <MenuItem name="" >
                <Icon type="ios-paper"></Icon>
                首页  
            </MenuItem>
            <MenuItem name="good">
                <Icon type="settings"></Icon>
                精华 
            </MenuItem>
            <MenuItem name="ask">
                <Icon type="ios-people"></Icon>
                问答
            </MenuItem>
            <MenuItem name="share">
                <Icon type="settings"></Icon>
                分享
            </MenuItem>
            <MenuItem name="job">
                <Icon type="settings"></Icon>
                招聘
            </MenuItem>
        </Menu>
      </Col> -->

      <!-- <Col span="8">
        <Menu mode="horizontal" :theme="'light'" active-name="" @on-select='fetchData'>
          <MenuItem name="" >
            <Button>+1</Button>
          </MenuItem>
        </Menu>
      </Col> -->
    </Row>
    <br>
  <!-- <Table size="small" stripe :columns="title" :data="siteList"></Table> -->

  <!-- <div v-for="item in siteList">
    <a :href="'/#/post/'+item.id">{{item.title}}</a>
  </div> -->

  <b-list-group>
    <b-list-group-item v-for="item in siteList" :key="item.id">
        <Tag color="green" v-if="item.top"> 置顶 </Tag>
        <Tag v-else-if="item.good"> 精华 </Tag>
        <Tag v-else-if="item.tab == 'share'"> 分享 </Tag>
        <Tag v-else-if="item.tab == 'ask'"> 问答 </Tag>
        <Tag v-else-if="item.tab == 'job'"> 工作 </Tag>
        <Tag v-else color="red"> 被删除 </Tag>
      <a :href="'/#/post/'+item.id">
        {{item.title}}
      </a>
      <span style="float:right">（{{item.reply_count}}/{{item.visit_count}}）</span>
    </b-list-group-item>
  </b-list-group>

    <!-- <section class="ui segments">
      <div class="ui segment borderless" v-for="item in siteList" :key="item.id">
        <Tag color="#1c2438" v-if="item.top">置顶</Tag>
        <Tag color="#495060" v-if="item.good">精华</Tag>
        <Tag color="#80848f" v-if="item.tab == 'share'"> 分享 </Tag>
        <Tag color="#80848f" v-if="item.tab == 'ask'"> 问答 </Tag>
        <Tag color="#80848f" v-if="item.tab == 'job'"> 工作 </Tag>
        <a :href="'https://cnodejs.org/api/v1/topic/'+item.id">{{item.title}}</a>
      </div>
    </section> -->
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

</template>

<script>
import router from "../router";
import { Button, Table, Col, Row, Tag } from "iview";
import axios from "axios";
const R = require("ramda");
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

export default {
  name: "index",
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
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
    },
    jumptoDetail(){
      router.push('/post');
    }
  },
  components: { Button, Table, Col, Row, Tag },
  mounted() {
    this.fetchData(this.$route.params.type);
  },
  watch: {
  '$route' (to, from) {
    this.fetchData(this.$route.params.type);
  }
  }
};
</script>
<style src="../assets/chinese-article.css"></style>
