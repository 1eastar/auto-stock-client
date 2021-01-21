import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
import axiosHttpAdapter from 'axios/lib/adapters/http'
import _ from 'lodash'
import qs from 'qs'

export type ClientPromise<T = any> = Promise<T>

/* NOTE: 추후 수정 예정 */
// export const END_POINT = (() => {
//   if ()
// })()

/* NOTE: 추후 수정 예정 */
const END_POINT = 'http://localhost:3001'

const UPBIT_END_POINT  = 'https://api.upbit.com'

export class Client {
  static requestInterceptor(config) {
    //
    return config
  }

  static responseInterceptor(response) {
    //
    return response.data
  }

  static responseErrorInterceptor(error) {
    // eslint-disable-next-line prefer-promise-reject-errors
    return Promise.reject({
      status: _.get(error, 'response.status', '-1'),
      statusText: _.get(error, 'response.statusText', ''),
      body: _.get(error, 'response.data', {}),
    })
  }

  client: AxiosInstance

  upbitClient: AxiosInstance

  constructor() {
    this.client = axios.create({
      baseURL: END_POINT,
      // withCredentials: true,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })

    this.upbitClient = axios.create({
      baseURL: UPBIT_END_POINT,
      // withCredentials: true,
      // headers: {
      //   Accept: 'application/json',
      //   'Content-Type': 'application/json',
      // },
    })

    this.client.interceptors.request.use(Client.requestInterceptor)
    this.upbitClient.interceptors.request.use(Client.requestInterceptor)
  }

  private getImpl<T = any>(
    client: AxiosInstance['get'],
    url: string,
    query?: any,
    config?: AxiosRequestConfig,
    responseInterceptor = Client.responseInterceptor,
    responseErrorInterceptor = Client.responseErrorInterceptor,
  ): ClientPromise<T> {
    return client(url, {
      ...config,
      params: query,
      paramsSerializer: (params) => qs.stringify(params, { arrayFormat: 'repeat' }),
    })
      .then(responseInterceptor)
      .catch(responseErrorInterceptor)
  }

  get<T = any>(
    url: string,
    query?: any,
    config?: AxiosRequestConfig,
    responseInterceptor?: (res: any) => any,
    responseErrorInterceptor?: (error: Error) => any,
  ): ClientPromise<T> {
    return this.getImpl<T>(this.client.get, url, query, config, responseInterceptor, responseErrorInterceptor)
  }

  getFromUpbit<T = any> (
    url: string,
    query?: any,
    config?: AxiosRequestConfig,
    responseInterceptor?: (res: any) => any,
    responseErrorInterceptor?: (error: Error) => any,
  ): ClientPromise<T> {
    return this.getImpl<T>(this.upbitClient.get, url, query, config, responseInterceptor, responseErrorInterceptor)
  }
}

export default new Client()
