<template>
   <Dropdown trigger="hover"  placement="bottom-end" @on-click="goToDetail">
    <a href="javascript:void(0)">
        <Avatar shape="square" :src="avatar_url" />
    </a>
    <DropdownMenu slot="list" >
        <DropdownItem name="index">{{ loginname }}</DropdownItem>
        <DropdownItem name="index" divided><Icon type="ios-paper-outline"></Icon> 我的主页</DropdownItem>
        <DropdownItem name="star"><Icon type="star"></Icon> 我的收藏</DropdownItem>
        <DropdownItem  name="message"><Badge dot :count="msgNumber"><Icon type="ios-chatbubble-outline"/> 消息</Badge></DropdownItem>
        <DropdownItem name="signout" divided @click.native="signOut">SignOut</DropdownItem>
    </DropdownMenu>
  </Dropdown>
</template>
<script>
import router from "../router";


export default {
   props: ['data','msgNumber'],
   data(){
       return {
           userData:JSON.parse(this.data),
           loginname:JSON.parse(this.data).loginname,
           avatar_url:JSON.parse(this.data).avatar_url,
           msg_number:this.msgNumber
       }
   },
   methods:{
       signOut(){
           console.log("### signOut ###");
           this.$Message.info({
              render: h => {
                return h("span", [
                  "登出成功"
                ]);
              }
            })
           this.$emit('signatureChange',false);
           window.location.reload();
       },
       //点击菜单栏的选项，跳转到“消息”、“收藏”、“主题”三个页面
       goToDetail(type){
        if(type != "signout")
           router.push('/profile/'+ this.loginname +'/'+ type);
        // console.log('/profile/'+ this.loginname +'/'+ type);
       }
   }
}
</script>
