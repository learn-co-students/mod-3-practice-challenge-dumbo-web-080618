let User = (function(){
  let userAll = []
  return class User{
    constructor(user){
      this.id = user.id
      this.username = user.username
    }

    renderUser(){
      let li = document.createElement('li')
      li.innerHTML = this.username
      li.dataset.userId = this.id
      // return `<p><b>${this.username}</p>`
      return li
    }
  }
})()
