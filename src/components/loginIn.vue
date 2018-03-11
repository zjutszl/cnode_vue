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
      value: "",
      authorData:{}
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
          axios.post("https://cnodejs.org/api/v1/accesstoken", {
            accesstoken: this.value
          }).then(response => {
              console.log(JSON.stringify(response.data));
              this.authorData = JSON.stringify(response.data);
              if (response.data.success == true){
              this.$Message.success({
                  render: h => {
                    return h("span", [
                      "登陆成功"
                    ]);
                  }
                })

              this.$emit('signatureChange',true);
              this.$emit('giveAuthorData',this.authorData);
              }          
            }
          ).catch(e => {
            this.$Message.warning({
              render: h => {
                return h("span", [
                  "AccessToken 验证未通过"
                ]);
              }
            })
            this.$emit('signatureChange',false);
          })
        }
    })
  }
  }
}
</script>
