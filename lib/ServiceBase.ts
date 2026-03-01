export abstract class ServiceBase {
  protected static API_URL = "https://fakestoreapi.com"

  protected static getUrl(path: string) {
    return `${this.API_URL}${path}`
  }

  protected static async request<T>(path: string): Promise<T> {
    const url = this.getUrl(path)

    try {
      const res = await fetch(url)

      if (!res.ok) {
        throw new Error(`API Error: ${res.status}`)
      }

      const text = await res.text()

      if (!text) {
        throw new Error("Empty response from API")
      }

      return JSON.parse(text)
    } catch (error) {
      console.error("API Request Failed:", error)
      throw error
    }
  }
}