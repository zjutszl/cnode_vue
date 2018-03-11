# Cnode_Vue SPA

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

回顾整个项目的开发过程。

#### 扒CNode的图标

在CNode官网检查=>发现是SVG=>谷歌怎么扒SVG=>直接复制SVG代码块=>调整大小=>Done!

#### 使用Vue-Cli,Vue-router,Bootstrap-Vue来构建应用

#### Vue-router无法响应地址变化(不会随着地址栏的变化而更新页面)

使用watch来监视变化
```javascript
watch:{
	'$router' (to,from){
		this.fetchData(this.$route.params.type);
	}
}
```

#### 在post页面，想要同时fetchData和fetchAuthorData时，发现this.post.author.loginname无法传递到fetchAuthorData.

用了很多console.log来测试，做了很多尝试，都没有解决问题。比如在mounted这里同时fetchData和fetchAuthorData,在fetchData中注入fetchAuthorData部分的代码，但都没有成功。
测试发现this.authorName是能接到fetchData传来的值的，但是在函数定义时用this.authorName不能给到fetchAuthorData。
后来想到可能是时间顺序出了问题。
用watch侦测authorName的变化，一出现变化，就调用fetchAuthorData。这下搞定了！
```javascript
watch:{
	authorData:'fetchAuthorData'  //简便写法，在authorData变化时调用字符串对应函数
}
```

#### 大坑。。。在<script>直接定义的变量或者函数，又或者是import的第三方库，如果没有放在export default的选项对象中，那么<html>上就访问不到。

一定要把要用的放在export default上。

#### 一个困扰半天的大坑：promise.catch

在做用户登录的时候，axios.post("http://...",{accesstoken :this.value})，这里总是报错：HTTP 401。 当时想了很多，是不是this.value没有传到？各种操作。。是不是axios.post拿不到this.value...后来放弃了直接在askAccessToken.vue上反馈，而是将数据通过this.$emit('getAcc',this.value)传出去，用父子组件传参，搞了几十分钟，一个流畅的通路做了出来，长出一口气。
this.value问题解决了，但是返回值呢？response.data.success是ture，那怎么传不到我的另外一个methods里呢？因为是异步调用，所以另外一个函数拿不到值？将期间写的两个函数合并，在then里调用那个组件。

用自己的accesstoken测试，通过。
用错误的accesstoken测试，报401。

问题还是在，分析代码发现，在promise.then里面接错误的请求是不行的（不像其他函数返回值，axios.post如果没有收到response，就会报错，而不是返回空数据），搜索了下catch的使用，加了上去。
问题解决~

7点的时候，徐老师发消息说：axios.post这样写没有问题。我想，这个通路已经打通了，改下试试就知道之前的写法对不对了。  
结果，徐老师是对的。 我之前分析错误原因的时候以为是askAccessToken.vue文件内的作用域有问题（其实是没有写catch惹的祸），导致axios.post得不到正确的值。用原来的axios方法重写之后依然流畅运行。
删除了父子组件信息传递的部分，代码轻了不少~

奋斗了一路，终于搞定了

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
