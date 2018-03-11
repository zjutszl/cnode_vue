<template>
<div>
  <Button @click="handleRender">登录</Button>
</div>
</template>
<script>
import { Button } from "iview";
import axios from "axios";

export default {
  data() {
    return {
      value: ""
    };
  },
  methods: {
    handleRender() {
      this.$Modal.confirm({
        render: h => {
          return h("Input", {
            props: {
              value: this.value,
              autofocus: true,
              placeholder: "请输入你的accessToken"
            },
            on: {
              input: val => {
                this.value = val;
                localStorage.setItem("AccessToken", val);
              }
            }
          });
        },
        onOk:() => {
          // axios.post("https://cnodejs.org/api/v1/accesstoken", {
          //   accesstoken: this.value
          // }).then(response => {
          //   console.log(JSON.stringify(response.data));
          //   if (response.data.success == true){
          //     console.log('######### 验证成功 #########');
          //   } else {
          //     console.log('######### 验证失败 #########');              
          //   }
          // })
          this.$emit('getAcc', localStorage.getItem("AccessToken"));
          // this.$emit('getAcc', );
        }
      });
    }
  }
};
</script>
