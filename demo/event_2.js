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