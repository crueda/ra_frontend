import store from 'src/store'
import axios from 'axios'

export default function () {
  async function get(url, params) {
    let reportResponse = {}
    try {
      let requestParams = {}
      if (params !== undefined) {
        requestParams = params
      }
      reportResponse = await axios.get(
        process.env.VUE_APP_API_URL + url,
        requestParams,
        { timeout: process.env.VUE_APP_API_TIMEOUT }
      )
      await reportResponse
    } catch (err) {
      console.error(err)
      throw new Error(err)
    }
    return reportResponse
  }

  async function post(url, body, timeout = process.env.VUE_APP_API_TIMEOUT) {
    let reportResponse = {}
    try {
      reportResponse = await axios.post(
        process.env.VUE_APP_API_URL + url,
        body,
        { timeout }
      )
      await manageResponse(reportResponse)
    } catch (err) {
      await manageResponse(err.response)
      console.error(err)
      throw new Error(err)
    }
    return reportResponse
  }

  async function put(url, body) {
    let reportResponse = {}
    try {
      reportResponse = await axios.put(
        process.env.VUE_APP_API_URL + url,
        body,
        { timeout: process.env.VUE_APP_API_TIMEOUT }
      )
      await manageResponse(reportResponse)
    } catch (err) {
      await manageResponse(err.response)
      console.error(err)
      throw new Error(err)
    }
    return reportResponse
  }

  async function remove(url, body) {
    let reportResponse = {}
    try {
      reportResponse = await axios.delete(
        process.env.VUE_APP_API_URL + url,
        body,
        { timeout: process.env.VUE_APP_API_TIMEOUT }
      )
      await manageResponse(reportResponse)
    } catch (err) {
      await manageResponse(err.response)
      console.error(err)
      throw new Error(err)
    }
    return reportResponse
  }

  async function manageResponse(response) {
    if (response && response.status && [401, 403].includes(response.status)) {
      store.$router.push({ name: 'logout' })
    }
  }

  return {
    get,
    post,
    put,
    remove,
  }
}
