class Book{
  constructor(book, adapter){
    this.id = book.id
    this.title = book.title
    this.img_url = book.img_url
    this.adapter = adapter
    this.users = book.users.slice()
    console.log(book.users.length)
    this.description = book.description
    this.renderCardListElement = this.renderCardListElement.bind(this)
    this.getBookShowPanel = this.getBookShowPanel.bind(this)
    this.addUserThatLikes = this.addUserThatLikes.bind(this)
    this.likeBook = this.likeBook.bind(this)
    this.getUserList = this.getUserList.bind(this)
    // console.log(this)
  }

  renderCardListElement(){
    const li = document.createElement('li')
    li.innerText = this.title
    li.addEventListener('click', () => this.getBookShowPanel())
    return li
  }

  addUserThatLikes(user){
    this.users.push(user)
    this.renderCardListElement()
  }

  getBookShowPanel(){
    const showPanel = document.querySelector('#show-panel')
    showPanel.innerHTML = ""
    showPanel.innerHTML = `<h2>${this.title}</h2><img src="${this.img_url}"/><p>${this.description}</p>`
    const likeButton = document.createElement('button')
    likeButton.innerText = 'Like <3'
    likeButton.addEventListener('click', (e) => this.likeBook(e))
    showPanel.append(likeButton)

    const userList = document.createElement('ul')
    userList.className = 'user-list'
    this.users.forEach(
      user => {
        userList.innerHTML += `<li>${user.username}</li>`
    })
    // this.getUserList()
    showPanel.append(userList)

  }

  getUserList(){
    const myList = document.querySelector('.user-list')
    myList.innerHTML = ""
    this.users.forEach(
      user => {
        myList.innerHTML += `<li>${user.username}</li>`
    })
  }

  likeBook(event){
    event.preventDefault()
    alert('like button pressed')
    let myLike = {id: 1, username: 'pouros'}

 
    if (this.users.every(user => (user.username != myLike.username && user.id != myLike.id))){
      this.users.push(myLike)
    } else {
      this.users.forEach((user, index) =>{
        if (user.id == 1 && user.username == 'pouros'){
          this.users.splice(index,1)
        }
      })
    }
    let users = {users: []}

    this.users.forEach(user =>{
      users['users'].push(user)
    })
 
    this.adapter.likeBook(this.id, users)
    this.getUserList()
  }

}
class User{
  constructor(user){
    this.id = user.id
    this.username = user.username
  }
}