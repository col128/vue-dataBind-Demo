import Observer from './Observer.js'
import Complier from './Complier.js'

class Vue {
  constructor(options){
    console.log("Vue constructor() is running...")
    this.$options = options
    this.$el = options.el
    this.$data = options.data
    new Observer(this.$data)
    new Complier(this.$el,this)
  }
}
export default Vue
