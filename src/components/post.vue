<template>

    
  <div class="chinese-article container">

    <!-- 测试返回值专用 -->
    <!-- <Button @click="fetchData()">back</Button> -->
    <!-- 
    {{$route.params.id}} -->
    <!-- <p v-for="item in postkey" :key="item.id">
      {{ item }}:{{post[item]}}
    </p> -->
    <!-- 测试返回值专用（结束） -->
  <div class="page-header">
    <h1><Tag color="green" v-if="post.top">置顶</Tag>{{post.title}}</h1>
  </div>
  <p id="subhead">发布时间：{{post.create_at}} 
    作者：{{post.author.loginname}} 
    {{post.visit_count}}次浏览
  </p>
  <Button @click="gotoTest">test model</Button>
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
    gotoTest(){
      router.push('/post/'+this.tabType+'/test');
    }
  },
  mounted(){
    this.fetchData();
  }
};
</script>

<style src="../assets/chinese-article.css"></style>
<style scoped>
#subhead{
  color:#80848f;
  border-bottom: 1px solid #e5e5e5;
  font-size:13px;
}

h2 {
  /* margin: 1.2em 0; */
}
</style>

