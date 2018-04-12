import Vue from './Vue'

let vm = new Vue({
  el:"myApp",
  data:{
    message: 'this is message contents'
  }
});
window.vm = vm;