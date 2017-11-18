# cnode_express

## 路由：

**主页 | localhost:3000**

`app.js -> routes/index.js -> index.ejs`

**文章详情 | localhost:3000/post/?id=123456123**

`app.js -> routes/post.js -> post_detail.ejs`

## 更新日志

### 2017.11.18

* 优化了"文章详情页"样式。 参考徐老师的"小白学编程"的样式，扩展了导航栏。
* 给文章详情页添加了返回主页的功能

### 2017.11.06

* 解决了文章详情页的css调用问题。
* 为文章详情页更新了样式

### 2017.10.25

* 将cnode_clone搬运到express平台上，并添加了路由：转到文章详情页
* 创建了文章详情页，但是sematic.css一直无法使用。。
