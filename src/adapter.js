class Adapter{
  constructor(baseURL){
    this.baseURL = baseURL
  }

  getBooks(){
    return fetch(this.baseURL)
    .then(res => res.json())
  }

  likeBook(id,data){
    return fetch(`${this.baseURL}/${id}`, {
      method: 'PATCH',
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
  }
}