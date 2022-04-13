// src\utils\request.js
import axios from 'axios'
const instance = axios.create({
  baseURL:
    'https://www.fastmock.site/mock/1d0bde1ae3333d08550849d84f810db4/jd',
  timeout: 10000
})
const post = (url, data = {}) => {
  return new Promise((resolve, reject) => {
    instance
      .post(url, data, {
        headers: {
          'Content-type': 'application/json'
        }
      })
      .then(
        (response) => {
          resolve(response)
        },
        (error) => {
          reject(error)
        }
      )
  })
}
const get = (url, params = {}) => {
  return new Promise((resolve, reject) => {
    instance.get(url, { params }).then(
      (response) => {
        resolve(response)
      },
      (error) => {
        reject(error)
      }
    )
  })
}
export { post, get }
