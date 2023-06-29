import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

export class AxiosService {
  private axiosInstance = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    timeout: 5000,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.TMDB_TOKEN}`,
    },
  });

  public async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.axiosInstance.get(url, config);
    return response.data;
  }
}
