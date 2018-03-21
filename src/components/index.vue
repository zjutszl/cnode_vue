<template>
  <div class="chinese-article container">
  <b-list-group>
    <b-list-group-item v-for="(item,index) in siteList" :key="item.id" v-if="index < limited_topic">
        <Tag color="green" v-if="item.top"> 置顶 </Tag>
        <Tag color="green" v-else-if="item.good"> 精华 </Tag>
        <Tag v-else-if="item.tab == 'share'"> 分享 </Tag>
        <Tag v-else-if="item.tab == 'ask'"> 问答 </Tag>
        <Tag v-else-if="item.tab == 'job'"> 工作 </Tag>
        <Tag v-else color="red"> 已删除 </Tag>
      <a :href="'/#/post/'+item.id">
        {{item.title}}       
      </a>
      <span style="color:#80848f">（{{item.reply_count}}/{{item.visit_count}}）</span>
      <span style="float:right">
        <span><Avatar :src="item.author.avatar_url" shape="square" />
          <span style="color:#80848f;font-size:12px">&nbsp;{{timeagoInstance(item.last_reply_at)}}</span>
        </span>
 
      </span>
    </b-list-group-item>

      <Spin fix v-if="spinShow">
        <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
        <div>Loading</div>
      </Spin>

    </b-list-group>

    
    <div id="More">
      <Button @click="moreTopic" long>加载更多</Button>
    </div>

</div>

</template>

<script>
import router from "../router";
import { Button, Col, Row, Tag ,Page} from "iview";
import axios from "axios";
import * as R from "ramda"
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import timeago from 'timeago.js';


var timeagoInstance = new timeago();

export default {
  name: "index",
  components: { Button, Col, Row, Tag,Page},
  data() {
    return {
      siteList: [],
      limited_topic:20,
      limit_topic:80,
      spinShow:true
      // loading:false
    };
  },
  methods: {
    fetchData(tab = "") {
      this.spinShow=true;
      axios
        .get("https://cnodejs.org/api/v1/topics", {
          params: {
            tab: tab,
            page: 0,
            limit: this.limit_topic
          }
        })
        .then(response => {
          if ((response.success = "true")) {
            return response.data;
          } else {
            throw new Error("fail to get Data from CNode");
          }
        })
        .then(response => {
          console.log("congratulation!");
          this.siteList = response.data;
          // this.siteList.push("xiaoming");
          // this.siteList.pop();
          this.spinShow = false;
        })
        .catch(err => console.log(err));
    },
    timeagoInstance(time){
      var timeago_instance = new timeago();
      return(timeago_instance.format(time, 'zh_CN'));
    },
    moreTopic(){
      this.limited_topic += 20;
      if(this.limited_topic >= this.limit_topic){
        this.limit_topic += 80;
        this.fetchData(this.$route.params.type);
      }
    }
  },
  mounted() {
    this.fetchData(this.$route.params.type);
  },
  watch: {
    $route(to, from) {
      this.fetchData(this.$route.params.type);
    }
  }
};
</script>
<style src="../assets/chinese-article.css"></style>
<style scoped>

  .container {
    padding-right: 1vh;
    margin-top: 2vh;
    margin-bottom: 2vh;
    margin-left: 18vh;
  }

  #More {
    display: flex;
    justify-content: center;
    margin-top: 2px;
    margin-bottom:2vh;
  }

  .demo-spin-icon-load{
      animation: ani-demo-spin 1s linear infinite;
  }
  @keyframes ani-demo-spin {
      from { transform: rotate(0deg);}
      50%  { transform: rotate(180deg);}
      to   { transform: rotate(360deg);}
  }
  
</style>

