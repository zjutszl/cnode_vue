<template>

<div id="contain">
  <div id="bubble"></div>
  <div id="comment">
  <div v-html="replycontent" class="comment-left"></div>
    <div class="comment-right">
      <Icon type="thumbsup"  @click="up">{{ replyups.length }}</Icon>
      <Icon type="reply" ></Icon>
    </div>
  </div>
</div>

</template>

<script>
import { Icon } from 'iview';
import axios from "axios";

export default {
  props:['content','ups','reply'],
  data(){
    return {
      isShow:false,
      replycontent:this.content,
      replyups:this.ups,
      replyid:this.reply
    }
  },
  methods:{
    // Show(){
    //   this.isShow = true;
    // },
    // Hide(){
    //   this.isShow = false;
    // }
    up(){
      // this.ups+=1;
      axios.post('https://cnodejs.org/api/v1/reply/'+this.replyid+'/ups',{
        accesstoken:localStorage.getItem("AccessToken")
      }).then(response => {
        if(response.success){
          console.log("ggggggggggggggg");
        }
      }).catch(e => {
        console.log(e);
      })
    }
  }
};
</script>

<style scoped>
#contain{
  display: flex;
  flex-direction: column;
}

#bubble {
  margin-left: 2vh;
  width:0;
  height:0; 
  font-size:0;
  border:solid 8px;
  border-color:#F8F8F9 #F8F8F9 #E1E1E1 #F8F8F9 ;
}

#comment {
  font-size:14px;
  font-weight: 300;
  line-height: 1;
  background:#E1E1E1;
  border-radius:5px; /* 圆角 */

  padding:1px .5vh 1px 1.5vh;
  margin:0 0 0 0;

  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
}

.comment-right{
  flex-wrap: nowrap;
  align-self:flex-end;
  margin:0 1vh 1vh 0;
  padding:0 0 0 2vh;
}


</style>


