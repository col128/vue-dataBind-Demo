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