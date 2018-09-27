let Book = (function(){
  let allBooks = [];
  return class Book{
    constructor(book){
      this.id = book.id
      this.title = book.title
      this.description = book.description
      this.img_url = book.img_url
      this.users = book.users
      allBooks.push(this)
    }

    renderBook(){
      let ul = document.querySelector('#list')
      let li = document.createElement('li')
      li.innerHTML = this.title
      li.dataset.id = this.id
      ul.appendChild(li)
      li.addEventListener('click', this.showBook)
    }

    showBook(e){
      let adapter = new Adapter("http://localhost:3000/books")
      let bookPromise = adapter.getBook(parseInt(this.dataset.id))
      bookPromise.then((bookObj) => {
        let showPanel = document.querySelector("#show-panel");
        let book = new Book(bookObj)
        let info = `
          <h1>${book.title}</h1>
          <img src = ${book.img_url}>
          <p>${book.description}</p>
        `
        showPanel.innerHTML = info
        let ul = document.createElement('ul')
        book.users.forEach(function(userObj){
          let user = new User(userObj)
          ul.appendChild(user.renderUser());
          // info += user.renderUser();
        })
        showPanel.appendChild(ul)

        let readBtn = document.createElement('button')
        readBtn.innerText = "Read Book"
        readBtn.id = "read-button"
        readBtn.dataset.bookId = book.id
        showPanel.appendChild(readBtn)
        readBtn.addEventListener('click', (e) => {
          let user = {"id":1, "username":"pouros"}
          let adapter = new Adapter("http://localhost:3000/books")
          let inspect = adapter.getBook(parseInt(e.target.dataset.bookId))
            .then(book => {
              let readBtn = document.querySelector('#read-button')
              let ul = readBtn.parentElement.querySelector("ul")
              if (!book.users.find(user => user.id === 1)){
                book.users.push(user)
                let userObj = new User(user)
                ul.appendChild(userObj.renderUser())
              }
              else{
                book.users.splice( book.users.indexOf(user), 1)
                let li = Array.from(ul.children).find((li) => parseInt(li.dataset.userId) === user.id)
                li.remove()
              }
              adapter.patchBook(book.id, {users: book.users})


            })
        })
      })

    }

    readBook(e){

    }

  }
})()
