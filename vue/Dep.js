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