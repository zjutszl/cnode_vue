<template>
  <div>
        <Menu mode="horizontal" :theme="'light'" active-name="" @on-select='change'>
            <MenuItem name="" >
                <Icon type="ios-paper"></Icon>
                首页  
            </MenuItem>
            <MenuItem name="good">
                <Icon type="settings"></Icon>
                精华 
            </MenuItem>
            <MenuItem name="ask">
                <Icon type="ios-people"></Icon>
                问答
            </MenuItem>
            <MenuItem name="share">
                <Icon type="settings"></Icon>
                分享
            </MenuItem>
            <MenuItem name="job">
                <Icon type="settings"></Icon>
                招聘
            </MenuItem>
        </Menu>
        <br>
      </div>
</template>
<script>
export default {
  methods:{
    change(){

    }
  }
}
</script>

