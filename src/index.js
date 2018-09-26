const baseURL = 'http://localhost:3000/books'
const adapter = new Adapter(baseURL)
const list = document.querySelector('#list')

document.addEventListener("DOMContentLoaded", function(e) {
  // alert('DOM Content Loaded')
  e.preventDefault()
  
  function renderBooks(bookObjs){
    bookObjs.forEach((bookObj)=>{
      const newBook = new Book (bookObj ,adapter)
      list.append(newBook.renderCardListElement())
    })
  }

  adapter
    .getBooks()
    .then(res => renderBooks(res))
});
