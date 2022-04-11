export default class API {
  // @param {url} string

  constructor(url) {
    this.url = url;
  }

  async getRecipes() {
    const response = await fetch(this.url);
    const data = await response.json();
    if (!response.ok) {
      const error = new Error(response.statusText || "Unable to retrieve recipes list");
      throw error;
    }
    return Array.from(data);
  }
}
