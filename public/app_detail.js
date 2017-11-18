
var app = new Vue({
    el: "#app",
    data: {
      post_id:postId,
      title:"",
      content:"",
      replies:[],
      author:{}
      // host:'localhost:3000'
    },
    methods:{
      fetchData (){
        axios.get('https://cnodejs.org/api/v1/topic/' + app.post_id)
        .then(function(response) {
          if (response.data.success == true){
            app.title = response.data.data.title;
            app.content = response.data.data.content;
            app.replies = response.data.data.replies;
            app.author = response.data.data.author; 

          } else { alert("数据请求失败！")}
          
        })
        .then(function(response){
          //设置页面标题
          document.title = app.title;
          $("div#respondData img")
          .css("width","50%");

        })
        .catch(function(err) {
          alert(err);
        })
      },
      
      redirection(){
        window.open('localhost:3000');
      }
    }
})


app.fetchData();



