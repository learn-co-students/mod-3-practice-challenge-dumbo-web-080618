class Adapter {
  constructor(baseURL) {
    this.baseURL = baseURL
  }

  get(path) {
    return fetch(path).then(res => res.json())
  }
  getBooks(){
    return this.get(this.baseURL)
  }

  static readBook(path, bookObj, data) {
    return fetch((path), {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(data)
    }).then(res => res.json())
  }
}
