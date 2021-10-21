import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'http://localhost:3000',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

export default {
  // Being able to specify which data to retrieve
  getChart() {
    return apiClient.get('/data')
  },
  getLineChart() {
    return apiClient.get('/line')
  }
}