<template>
<div class="page">
 <div class="container chinese-article">
   <br>
<h1>收藏主题</h1>
<!-- <div v-for="item in starPosts" :key="item.id"> -->
  <!-- <p>id:{{ item.id}}</p>
  <p>author_id: {{item.author_id}}</p>
  <p>tab:{{item.tab}}</p>
  <p>content:</p>
  <div v-html="item.content"></div>
  <p></p>
  <p></p>
  <p></p>
  <p></p>
  <p></p> -->

<b-list-group>
    <b-list-group-item v-for="item in starPosts" :key="item.id">
      <Icon type="star" color="#ff9900"></Icon>
      <a :href="'/#/post/'+item.id">
        {{item.title}}
      </a>
      <span style="float:right">（{{item.reply_count}}/{{item.visit_count}}）</span>
    </b-list-group-item>
  </b-list-group>

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
  name: "authorProfile",
  components: { Button, Col, Row, Tag },
  data() {
    return {
      starPosts:[]
    }
  },
  methods: {

    getStar() {
      console.log('#####getStar');
      axios
        .get(" https://cnodejs.org/api/v1/topic_collect/" + this.$route.params.loginname)
        .then(response => {
          if ((response.success = "true")) {
            console.log(response.data.data);
            this.starPosts=response.data.data;
          }
        })
        .catch(err => console.log(err));
    }
  },
  mounted() {
    this.getStar();
  }
}
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

