<template>
<div class="page">
 <div class="container chinese-article">
   <br>




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
      
    }
  },
  methods: {

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
      console.log('#####getTheme');
    }
  },
  mounted() {
    this.getTheme()
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

