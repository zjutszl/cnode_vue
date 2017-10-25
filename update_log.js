/* routes/page.js */

router.get('/post', function (req, res, next) {
    res.render('post_detail', {_id = req.query.id});
});


/* post_detail.ejs */

<% var localId = _id %>
<p><%= localId %></p>  




var vm = new Vue({
	el:"#app",
	data:{
		fetchDataId: localId,
		render:renderData//数据灌入详情
	},
	methods:{
		fetchData (){
			axios.get(`https://cnodejs.org/api/v1/topic/${app.fetchDataId}`)
				.then(function(response){
					//数据灌入详情
				})
		}
	}
})

/* index.html */

app.siteList = response.data.data;
+ app.siteList.forEach(function(element){
	element.url='localhost:3000/post'+ element.id
}


