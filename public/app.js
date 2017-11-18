 var app = new Vue({
    el: "#app",
    data: {
      siteList: [],
      topics:"",
      warning:[],
      limit_topic:20,
      page_number:0,
      tab_string:"share",
      topics_visible: true,
      content_visible:false,
      page_list:[1,2,3,4,5,6,7],
      page_max:0
    },
    methods:{
      fetchData(){
        axios.get('https://cnodejs.org/api/v1/topics',{
          params:{
            tab:this.tab_string,
            page:this.page_number,
            limit:this.limit_topic
          }
        })
          .then(function(response){
            if (response.success = 'true'){
              if (app.warning.indexOf("fetchData") === -1){
                app.warning.push("fetchData");
              }
            } else { return;}
            //let jump = response.data.data;
            
            //alert(typeof response.data.data);  //object
            // for (var kk in middle){
            //   kk.visible = false;
            // }

            // response.data.data.forEach(function(element){
            //   element.url=`localhost:3000/post/${element.id}`;
            // }

            app.siteList = response.data.data; //response.data.data才能获得response中的data数组
          }) 
      },
      chooseTab (){
        sessionStorage.removeItem('page_number');
        app.tab_string = event.target.id;
        app.page_number = 1;
        app.page_list = [1,2,3,4,5,6,7];
        app.fetchData();
      },
      pageChange (){
        app.page_number = event.target.innerHTML;
        sessionStorage.setItem('page_number', `${app.page_number}`);
        app.fetchData();
      },
      morePage (){
        app.page_list = app.page_list.map( n => Number(n)+ 5);
        app.page_number = app.page_list[0];
        app.fetchData();
      },
      firstPage (){
        app.page_list = [1,2,3,4,5,6,7];
        app.page_number = 0;
        app.fetchData();
      }
    // beforeMounted:{
    //   load_session (){
    //     if(sessionStorage.getItem('page_number')){
    //       app.page_number = sessionStorage.getItem('page_number');
    //     }
    //     if(sessionStorage.getItem('tab_string')){
    //       app.tab_string = sessionStorage.getItem('tab_string');
    //     }
    //     if(sessionStorage.getItem('limit_topic')){
    //       app.limit_topic = sessionStorage.getItem('limit_topic'); 
    //     }
    //     if(sessionStorage.getItem('page_list')){
    //       app.page_list = sessionStorage.getItem('page_list'); 
    //     }
    //   }
    // },
    // updated:{
    //   save_session (){
    //     sessionStorage.setItem('page_number', `${app.page_number}`);
    //     sessionStorage.setItem('tab_string', `${app.tab_string}`);
    //     sessionStorage.setItem('limit_topic',`${app.limit_topic}`);   
    //     sessionStorage.setItem('page_list',`${app.page_list}`);   
    // //   }
      }
  })



window.addEventListener("unload", function (event) {
        sessionStorage.setItem('page_number',`${app.page_number}`);
        sessionStorage.setItem('tab_string', `${app.tab_string}`);
        sessionStorage.setItem('limit_topic',`${app.limit_topic}`);  
        sessionStorage.setItem('page_list',`${app.page_list.join(',')}`);   
});

document.oncontextmenu = () => false;

window.addEventListener("load", function (event) {
  if(sessionStorage.getItem('page_number')){
    app.page_number = sessionStorage.getItem('page_number');
  }
  if(sessionStorage.getItem('tab_string')){
    app.tab_string = sessionStorage.getItem('tab_string');
  }
  if(sessionStorage.getItem('limit_topic')){
    app.limit_topic = sessionStorage.getItem('limit_topic'); 
  }
  if(sessionStorage.getItem('page_list')){
    let worker = sessionStorage.getItem('page_list').split(',');
    for (var item in worker){
      item = Number(item);
    }
    app.page_list =worker; 
  }
  app.fetchData();
})


$('.message .close')
  .on('click', function() {
    $(this)
      .closest('.message')
      .transition('fade')
    ;
  })
;

