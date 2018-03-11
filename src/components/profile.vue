<template>
   <Dropdown trigger="click"  placement="bottom-end">
    <a href="javascript:void(0)">
        <Avatar shape="square" :src="avatar_url" />
    </a>
    <DropdownMenu slot="list">
        <DropdownItem >{{ loginname }}</DropdownItem>
        <DropdownItem divided>驴打滚</DropdownItem>
        <DropdownItem>炸酱面</DropdownItem>
        <DropdownItem>冰糖葫芦</DropdownItem>
        <DropdownItem divided @click.native="signOut">SignOut</DropdownItem>
    </DropdownMenu>
  </Dropdown>
</template>
<script>


export default {
   props: ['data'],
   data(){
       return {
           userData:JSON.parse(this.data),
           loginname:JSON.parse(this.data).loginname,
           avatar_url:JSON.parse(this.data).avatar_url
       }
   },
   methods:{
       signOut(){
           console.log("### signOut ###");
           this.$emit('signatureChange',false);
       }
   }
}
</script>

