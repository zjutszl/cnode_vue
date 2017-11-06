
var app = new Vue({
    el: "#app",
    data: {
      post_id:postId,
      title:"",
      content:"",
      replies:[]
    },
    methods:{
      fetchData (){
        axios.get('https://cnodejs.org/api/v1/topic/' + app.post_id)
        .then(function(response) {
          if (response.data.success == true){
            app.title = response.data.data.title;
            app.content = response.data.data.content;
            app.replies = response.data.data.replies;
          } else { alert("数据请求失败！")}
          
        })
        .catch(function(err) {
          alert(err);
        })
      }
    }
})

function transform(ISO_time){
  return moment(ISO_time).toNow();
}

app.fetchData();



