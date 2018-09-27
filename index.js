const URL = "http://localhost:3000/books"

document.addEventListener("DOMContentLoaded", function() {
  let adapter = new Adapter(URL);
  let books = adapter.getBooks()
    .then(showBooks)





});

function showBooks(books){
  books.forEach(function(bookObj){
    let book = new Book(bookObj)
    book.renderBook()
  })

}
