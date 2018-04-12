# vue双向数据绑定简单实现





## vue双向数据绑定(二).mp4

定义vue双向数据绑定的基本结构



### index.html

定义基本的页面结构,类似于vue真实结构.一个input标签,带**v-model**属性,一个为{{message}}的文本,在本示例中,使用了ES6的语法,使用webpack 编译之后,输出bundle.js文件. 所以再main.js中,直接引入bundle.js文件即可.该文件是经过编译的,能直接运行在浏览器中.



```bash
webpack main.js bundle.js --watch 
```



> index.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Vue Demo</title>
</head>
<body>
  <div id='myApp'>
    <input type="text" v-model = "message">
    {{ message }}
  </div>
  <script src="bundle.js"></script>
</body>
</html>
```





### main.js



> main.js

```javascript
import Vue from './Vue'

let vm = new Vue({
  el:"myApp",
  data:{
    message: 'this is message content'
  }
});
window.vm = vm;
```



### vue.js



> vue.js

```javascript
import Observer from './Observer.js'
import Complier from './Complier.js'

class Vue {
  constructor(options){
    console.log("Vue constructor() is running...")
    this.$options = options
    this.$el = options.el
    this._data = options.data
    Object.keys(this._data).forEach(key=>this._proxy(key))
    new Observer(this._data)
    new Complier(this.$el,this)
  }
  _proxy(key){
    let self = this;
    Object.defineProperty(this,key,{
      get(){
        return self._data[key]
      },
      set(val){
        self._data[key] = val
      }
    })
  }
}
export default Vue

```



### Observer.js



> Observer.js

```javascript
class Observer {
  constructor(){
    console.log("Observer constructor() is running...");
  }
}
export  default Observer 
```



### Complier.js



> Complier.js

```javascript
class Complier  {
  constructor(){
    console.log("Complier constructor() is running...");
  }
}
export default Complier
```



### Dep.js



> Dep.js

```javascript
class Dep {
  constructor(){
    console.log("Dep constructor() is running...");
    this.list = [];
  }
  listen(subl){
    this.list.push(subl);
  }
  notify(){
    this.list.forEach(item=>item.update())
  }
}
export default Dep
```



### 运行效果

打开浏览器的控制台 输入

```javascript
window.vm.message = 'eee'
```



在vue.js给data设置的get和set方法是可以正常运行的.这个就是vue双向数据绑定的核心



在浏览器运行效果如下所示:

![](https://ws4.sinaimg.cn/large/006tNc79ly1fqaa858mzfj31kw0t04ar.jpg)

