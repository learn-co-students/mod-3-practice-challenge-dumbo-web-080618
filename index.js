document.addEventListener('DOMContentLoaded', function() {
  const url = 'http://localhost:3000/books';

  fetchBooks();

  function fetchBooks() {
    fetch(url)
    .then(res => res.json())
    .then(renderbooks);
  }

  function renderbooks(booksArray) {
    const list = document.querySelector('#list');
    booksArray.forEach(book => {
      const li = document.createElement('li');
      li.innerText = book.title;
      li.dataset.id = book.id;
      list.append(li);
      li.addEventListener('click', getBookId);
    });
  }
});

function getBookId(e) {
  let id = e.target.dataset.id;
  fetchSpecificBook(id);
}

function fetchSpecificBook(id) {
  let specificUrl = `http://localhost:3000/books/${id}`;
  fetch(specificUrl)
    .then(res => res.json())
    .then(attachSpecificBook);
}

function attachSpecificBook(book) {
  // debugger;
  const show = document.querySelector('#show-panel');
  const users = book.users.map(user => ' ' + user.username);
  let div = document.createElement('div');
  div.innerHTML =  `<h3>${book.title}</h3><img src='${book.img_url}'><h4>${book.description}</h4><h6>Users: ${users}</h6><button data-id=${book.id}>Like Me</button>`;
  show.innerHTML = '';
  show.append(div);
  if (!book.users.find(user => user.id === 1)) {
    div.addEventListener('click', addUser);
  }
}

function addUser(e) {
  if (e.target.nodeName === 'BUTTON') {
    const id = e.target.dataset.id;
    const me = {"id":1, "username":"pouros"};
    let users;
    fetch(`http://localhost:3000/books/${id}`)
      .then(res => res.json())
      .then(res => {
        // debugger;
        users = res.users;
        users.push(me);
        return users;
      }).then(users => patchUser(id, users));
  }
}

function patchUser(id, users) {
  let specificUrl = `http://localhost:3000/books/${id}`;
  fetch(specificUrl, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ users: users })
  }).then(res => res.json());
}
