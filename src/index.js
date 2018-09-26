document.addEventListener("DOMContentLoaded", function() {
  const URL = "http://localhost:3000/books"
  const adapter = new Adapter(URL)

  adapter.getBooks().then((books) => {
    books.forEach(function(book) {
      Book.appendLi(book)
    })
  })
})
