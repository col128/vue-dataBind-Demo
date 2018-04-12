var  person  = {
  _name:"David.Wu",
  get name(){
    return this._name
  },
  set name(val) {
    this._name = val
  }
}
person.name = 'Wu.Yu'
console.log(person.name)