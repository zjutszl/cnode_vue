
var app = new Vue({
    el: "#app",
    data: {
      detailData : {
        content:'zjutszl'
      },
      post_id:postId,
      title:"",
      content:""
    },
    methods:{
      fetchData (){
        axios.get('https://cnodejs.org/api/v1/topic/' + app.post_id)
        .then(function(response) {
          alert(JSON.stringify(response.data));
          if (response.data.success == true){
            app.title = response.data.data.title;
            app.content = response.data.data.content;
          } else { alert("数据请求失败！")}
          
        })
        .catch(function(err) {
          alert(err);
        })
      }
    }
})

app.fetchData();