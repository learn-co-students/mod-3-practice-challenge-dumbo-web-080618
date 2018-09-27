class Adapter{
  constructor(baseURL){
    this.baseURL = baseURL
  }

  get(path){
    return fetch(path).then(res => res.json())
  }

  getBooks(){
    return this.get(this.baseURL)
  }

  getBook(id){
    return this.get(this.baseURL + `/${id}`)
  }

  patch(path,data){
    return fetch(path, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json; charset=utf-8"
        // "Content-Type": "application/x-www-form-urlencoded",
      },
      body: JSON.stringify(data)
    })
    .then(res => res.json())
  }

  patchBook(id, data){
    return this.patch(this.baseURL + `/${id}`, data)
  }
}
