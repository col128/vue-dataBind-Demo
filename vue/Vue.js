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
