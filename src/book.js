class Book {
  constructor(title, img_url, description){
    this.title = title
    this.img_url = img_url
    this.description = description
  }

  static createLi(bookObj) {
    let li = document.createElement("li")
    li.innerText = bookObj.title
    li.id = bookObj.id
    return li
  }

  static appendLi(bookObj) {
    let bookUl = document.querySelector("#list")
    let li = this.createLi(bookObj)
    bookUl.append(li)
    li.addEventListener('click', () =>{
      this.show(bookObj)
    })
  }

  static show(bookObj) {
    let bookUsers = bookObj.users
    let showDiv = document.querySelector("#show-panel")
    showDiv.innerHTML = `<h3>${bookObj.title}</h3><img src=${bookObj.img_url}><p>${bookObj.description}</p><div id=readers></div><button> Read Book</button>`
    let usersDiv = showDiv.querySelector("#readers")
      if (bookUsers != undefined) {
        bookUsers.forEach(function(user) {
          let p = document.createElement("p")
          p.id = user.id
          p.innerHTML = `<strong>${user.username}</strong>`
          usersDiv.append(p)
        })
      }
    let readButton = showDiv.querySelector("button")
    readButton.addEventListener('click', () => {

      let x = [];
      if (bookUsers != undefined) {
        x = bookUsers.filter(function(user) {
          return (user.id === 1)
        })
      }

        if (x.length > 0){
          alert("you already read this book")
        }
        else {
          let usersx = []
            if (bookObj.users != undefined) {
              usersx = (bookObj.users.slice())
            }
          usersx.push({id: 1, username: "pouros"})

          let data = {"users": usersx}
          debugger
          let post_url = `http://localhost:3000/books/${bookObj.id}`
          Adapter.readBook(post_url, bookObj, data)
          .then(Book.show)
        }

    })
  }



}
