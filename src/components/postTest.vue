<template>
  <div class="chinese-article container">

    <!-- 测试返回值专用 -->
    <Button @click="goBack">back</Button>
    <!-- 
    {{$route.params.id}} -->
    <p v-for="item in postkey" :key="item.id">
      {{ item }}:{{post[item]}}
    </p>
    <!-- 测试返回值专用（结束） -->


    <span v-html="content"></span>

  
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
      postkey:{},
      tabType: this.$route.params.id
    };
  },
  components: { Button, Table, Col, Row, Tag },
  methods: {
    fetchData() {
      axios
        .get("https://cnodejs.org/api/v1/topic/" + this.$route.params.id)
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
    goBack(){
      router.go(-1);
    }
  },
  mounted(){
    this.fetchData();
  }
};
</script>

<style src="../assets/chinese-article.css"></style>

