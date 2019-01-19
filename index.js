const URL = 'http://localhost:3000/books'
const book_list = document.querySelector("#list")
const show_list = document.querySelector("#show-panel")


document.addEventListener("DOMContentLoaded", function(){
  get(URL).then(res => {
    render_book_list(res)
  })

});

function get(path){
  return fetch(path).then(res => res.json())
}

function render_book_list(res){
  res.forEach(function(book){
    book_list.append(render_book(book))
  })
}

function render_book(book){
  let li = document.createElement("li")
  li.innerHTML = book.title

  li.addEventListener("click", function(){
    render_book_info(book)
  })
  return li
}

function render_book_info(book){
  show_list.innerHTML = `
  <h2>${book.title}</h2>
  <img src=${book.img_url}>
  <p>${book.description}</p>
  `
  render_user_list(book)
}

function render_user_list(book){
  let div_user = document.createElement("div")
  div_user.id = "div_user"
  book.users.forEach(function(user){
    div_user.innerHTML += `<h4>${user.username}</h4>`
  })
  show_list.append(div_user)

  let btn = document.createElement("button")
  btn.id = "btn-read"
  btn.innerHTML = "Read Book"

  btn.addEventListener("click", function(){
    makePatchRequest(book).then(res =>{
      if(res !== 0){
        let div = document.querySelector("#div_user")
        div.innerHTML += `<h4>${res.users[res.users.length-1].username}</h4>`
      }
    })
  })

  show_list.append(btn)
}

function patch(user_arr){
  let user = {"id":1, "username":"pouros"}
  user_arr.push(user)
  return {
    "users": user_arr
  }
}

function makePatchRequest(book){
  var found = false;
  for(var i = 0; i < book.users.length; i++) {
    if (book.users[i].id == 1) {
        found = true;
        break;
    }
  }

  if(found){
    alert("You read this already!");
    return 0;
  }
  else{
    return fetch(`${URL}/${book.id}`,{
      method: 'PATCH',
      body: JSON.stringify(patch(book.users)),
      headers: {
            "Content-Type": "application/json; charset=utf-8",
        },
    }).then(response => response.json())
  }
}
