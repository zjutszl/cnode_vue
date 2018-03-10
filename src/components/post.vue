<template>
  <div class="hello">
    
    <!-- 导航栏 -->
    
   <!-- 导航栏结束 -->


    <br>
    <br>
    <br>
    <Button @click="fetchData('5433d5e4e737cbe96dcef312')">back</Button>
    <p v-for="item in postkey">
      {{ item }}:{{post[item]}}
    </p>
  <span class="chinese-article">
    <p v-html="content"></p>
  </span>
  
  </div>
</template>

<script>
import router from "../router";
import { Button, Table, Col, Row, Tag } from "iview";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

export default {
  name: "HelloVue",
  data() {
    return {
      post: {},
      content: "",
      postkey:{}
    };
  },
  components: { Button, Table, Col, Row, Tag },
  methods: {
    fetchData(id) {
      axios
        .get("https://cnodejs.org/api/v1/topic/" + id)
        .then(response => {
          if ((response.success = "true")) {
            return response.data.data;
            console.log("congratulation!");
          } else {
            throw new Error("fail to get Data from CNode");
          }
        })
        .then(response => {
          this.post = response;
          this.content = response.content;
          this.postkey = Object.keys(response);
        })
        .catch(err => console.log(err));
    },
    back() {
      router.go(-1);
    }
  }
};
</script>

<style src="../assets/chinese-article.css"></style>

