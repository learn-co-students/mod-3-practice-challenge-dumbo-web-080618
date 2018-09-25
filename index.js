const URL = 'http://localhost:3000/books'
const book_list = document.querySelector("#list")
const show_list = document.querySelector("#show-panel")
document.addEventListener("DOMContentLoaded", function() {
  get(URL).then(res => res.forEach(function(element){
    let book = document.createElement("li")
    book.innerHTML = element.title
    book_list.append(book)

    book.addEventListener("click", function(){
      let button = document.createElement("button")
      button.innerHTML = "Like"
      let arr_user = render(element, button)
      button.addEventListener("click",function(){
        fetch(`${URL}/${element.id}`,{
          method: "PATCH",
          headers: {
            "Content-Type": "application/json; charset=utf-8",
            // "Content-Type": "application/x-www-form-urlencoded",
          },
          body: JSON.stringify(patch(arr_user))
        }).then(response => response.json());
        let u_li = document.createElement("li")
        u_li.innerHTML = "pouros"
        document.querySelector("#ul1").append(u_li)
      })

    })
  }))


});

function render(element, button){
  show_list.innerHTML = ""
  let show = document.createElement("div")
  show.innerHTML = `
  <img src=${element.img_url}>
  <p>${element.description}</p>
  `
  let u_ul = document.createElement("ul")
  u_ul.setAttribute("id", "ul1")
  let arr_user = []
  element.users.forEach(function(u_ele){
    let u_li = document.createElement("li")
    u_li.innerHTML = u_ele.username
    u_ul.append(u_li)
    arr_user.push(u_ele)
  })
  show.append(u_ul)
  show.append(button)

  show_list.append(show)
  return arr_user

}

function patch(arr_user){
  arr_user.push({"id": 1, "username": "pouros"})
  let patchData = {
      "users": arr_user
    }
  return patchData;
}

function get(url){
  return fetch(url).then(res => res.json())
}
