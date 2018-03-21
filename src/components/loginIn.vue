<template>
<div>
  <Button @click="Login">登录</Button>
</div>
</template>
<script>
import { Button } from "iview";
import axios from "axios";

export default {
  data() {
    return {
      value: localStorage.getItem("AccessToken") || "",
      authorData: {}
    };
  },
  methods: {
    Login() {
      this.$Modal.confirm({
        render: h => {
          return h("div", [
            h("Input", {
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
            }),
            h('p',[
              h("Icon",{
                props:{
                  type:"ios-information-outline",
                  color:'#2d8cf0'
                }
              }),
              " CNode社区的AccessToken可以在",
              h('a'," 设置 "),
              "中找到。"
            ])
          ]);
        },
        onOk: () => {
          axios
            .post("https://cnodejs.org/api/v1/accesstoken", {
              accesstoken: this.value
            })
            .then(response => {
              console.log(JSON.stringify(response.data));
              this.authorData = JSON.stringify(response.data);
              // foo.msg_number =12;
              // this.authorData = JSON.stringify(foo);
              if (response.data.success == true) {
                this.$Message.success({
                  render: h => {
                    return h("span", ["登陆成功"]);
                  }
                });

                this.$emit("signatureChange", true);
                this.$emit("giveAuthorData", this.authorData);
              }
            })
            .catch(e => {
              this.$Message.warning({
                render: h => {
                  return h("span", ["AccessToken 验证未通过"]);
                }
              });
              this.$emit("signatureChange", false);
            });

          console.log("i can get this value" + this.value);

          // axios.post("https://cnodejs.org/api/v1/accesstoken", {
          //   accesstoken: this.value
          // })

          axios
            .get("https://cnodejs.org/api/v1/message/count", {
              params: {
                accesstoken: this.value
              }
            })
            .then(res => {
              console.log(res.success);
              console.log("### from loginIn");
              // console.log(JSON.stringify(res));
              this.$emit("giveAuthorMessage", res.data.data);
            })
            .catch(e => {
              console.log(e);
              console.log("### failed ### from loginIn");
            });
        }
      });
    }
  }
};
</script>
