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

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
