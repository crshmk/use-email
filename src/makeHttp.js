/**
 * @param Object { axiosConfig } https://axios-http.com/docs/req_config
 * @return Axios instance
 */
import axios from 'axios'

const defaultConfig = {
  baseURL: 'http://localhost',
  withCredentials: true
}

const makeHttp = config => {
  const axiosConfig = config?.axiosConfig || defaultConfig
  return axios.create(axiosConfig)
} 

export default makeHttp