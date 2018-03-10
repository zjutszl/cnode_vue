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

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
