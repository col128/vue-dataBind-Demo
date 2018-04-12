# vue双向数据绑定简单实现







## vue双向数据绑定(一).mp4



### 1. getSet方法

定义一个对象,让它的属性,可以分成set和get两个方法来获取或者设置它的值

> person.js

```javascript
var  person  = {
  _name:null,
  get name(){
    return this._name
  },
  set name(val) {
    this._name = val
  }
}
person.name = 'Wu.Yu'
console.log(person.name)
```



### 2.发布订阅模式

#### demo-1

简单实现发布订阅模式

1. 在构造函数中,定义一个数组.用于存放事件订阅者.
2. 在addListener函数中,把事件推送到队列中,
3. trigger中,循环订阅者数组,如果传进来的是函数,直接使用**call(this)**,执行该函数



> event_1.js

```javascript
class Event {
  constructor(){
    this.listeners = []
  }
  addListener(listener){
    this.listeners.push(listener)
  }
  trigger(){
    for (let i = 0; i < this.listeners.length; i++) {
      this.listeners[i].call(this)
    }
  }
}

var myEvents = new Event();
myEvents.addListener(function (params) {
  console.log("this is listenerA");
  
})
myEvents.addListener(function (params) {
  console.log("this is listenerB");
})

myEvents.trigger();
```



调试 event.js函数

```
node event_1.js
```

截图如下所示:

![](https://ws1.sinaimg.cn/large/006tNc79ly1fqa7bz5znlj30og05oq3s.jpg)



#### demo-2



> event_2.js

```javascript
class Event {
  constructor(){
    this.listeners = []
  }
  addListener(listener){
    this.listeners.push(listener)
  }
  trigger(){
    for (let i = 0; i < this.listeners.length; i++) {
      this.listeners[i].update()
    }
  }
}

var myEvents = new Event();
var tom = {
  update:function() {
    console.log("tom update() is running...");
    
  }
}

var jack = {
  update:function() {
    console.log("jack update() is running...");
    
  }
}

myEvents.addListener(tom)
myEvents.addListener(jack)
myEvents.trigger();
```



调试 event.js函数

```
node event_2.js
```

截图如下所示:

![](https://ws3.sinaimg.cn/large/006tNc79ly1fqa7adwwymj30oy05gdgt.jpg)





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



