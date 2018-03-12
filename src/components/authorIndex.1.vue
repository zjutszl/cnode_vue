<template>
<div class="page">
 <div class="container chinese-article">
   <br>
<h1>我的主页</h1>

<b-list-group>
  <b-list-group-item v-for="item in themePosts" :key="item.id">
    <Icon type="ios-list-outline"></Icon>
    <!-- <Icon type="star" color="#ff9900"></Icon> -->
    <a :href="'/#/post/'+item.id">
      {{item.title}}
    </a>
    <span style="float:right"></span>
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
      themePosts:[]
    }
  },
  methods: {

    getTheme(){
      axios
        .get("https://cnodejs.org/api/v1/user/" + this.$route.params.loginname)
        .then(response => {
          if ((response.success = "true")) {
            console.log("############# No.9 ####################");
            // console.log(JSON.stringify(response.data.data));
            return response.data.data;

          } else {
            throw new Error("fail to get Data from CNode");
          }
        })
        .then(response => {
          // console.log("congratulation!");
          this.themePosts = response.recent_topics;
        })
        .catch(err => console.log(err));
      console.log('#####getTheme');
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
.page {
  background-color: #e1e1e1;
}

h1 {
  margin: 10px 0px;
}

.list-group-item {
  /* background-color: #E1E1E1 !important; */
  border:1px solid #343A40
}
</style>

