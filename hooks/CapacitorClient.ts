import { CapacitorHttp, HttpResponse } from '@capacitor/core';

// const baseURL = 'http://localhost:3000'; // DEV
const baseURL = 'http://zkteco-qa-env.eba-nzmdmds8.us-east-2.elasticbeanstalk.com'; // QA
// const baseURL = 'http://localhost:3000'; // PRD

const defaultOptions = {
  connectTimeout: 10000,
  readTimeout: 10000,
}

class HttpClient {
  private baseURL: string;
  private defaultHeaders: Record<string, string>;

  constructor(baseURL: string, defaultHeaders: Record<string, string> = {}) {
    this.baseURL = baseURL;
    this.defaultHeaders = {
      'Content-Type': 'application/json',
      ...defaultHeaders
    };
  }

  private buildUrl(endpoint: string): string {
    return `${this.baseURL}${endpoint.startsWith('/') ? endpoint : '/' + endpoint}`;
  }

  private mergeHeaders(customHeaders: Record<string, string> = {}): Record<string, string> {
    return { ...this.defaultHeaders, ...customHeaders };
  }

  private convertParams(params?: Record<string, string | number | boolean>): Record<string, string> | undefined {
    if (!params) return undefined;

    const convertedParams: Record<string, string> = {};
    for (const [key, value] of Object.entries(params)) {
      convertedParams[key] = String(value);
    }
    return convertedParams;
  }

  async get<T = HttpResponse>(endpoint: string, options: {
    params?: Record<string, string | number | boolean>;
    headers?: Record<string, string>;
  } = {}): Promise<T> {
    try {
      const response = await CapacitorHttp.get({
        url: this.buildUrl(endpoint),
        headers: this.mergeHeaders(options.headers),
        params: this.convertParams(options.params),
        ...defaultOptions,
      });

      return response as T;
    } catch (error) {
      console.error('GET Error:', error);
      throw error;
    }
  }

  async post<T = HttpResponse>(endpoint: string, data: Record<string, unknown> = {}, options: {
    headers?: Record<string, string>;
  } = {}): Promise<T> {
    try {
      const response = await CapacitorHttp.post({
        url: this.buildUrl(endpoint),
        headers: this.mergeHeaders(options.headers),
        data: data,
        ...defaultOptions,
      });

      return response as T;
    } catch (error) {
      console.error('POST Error:', error);
      throw error;
    }
  }

  async put<T = HttpResponse>(endpoint: string, data: Record<string, unknown> = {}, options: {
    headers?: Record<string, string>;
  } = {}): Promise<T> {
    try {
      const response = await CapacitorHttp.put({
        url: this.buildUrl(endpoint),
        headers: this.mergeHeaders(options.headers),
        data: data,
        ...defaultOptions,
      });

      return response as T;
    } catch (error) {
      console.error('PUT Error:', error);
      throw error;
    }
  }

  async delete<T = HttpResponse>(endpoint: string, options: {
    headers?: Record<string, string>;
  } = {}): Promise<T> {
    try {
      const response = await CapacitorHttp.delete({
        url: this.buildUrl(endpoint),
        headers: this.mergeHeaders(options.headers),
        ...defaultOptions,
      });

      return response as T;
    } catch (error) {
      console.error('DELETE Error:', error);
      throw error;
    }
  }

  async patch<T = HttpResponse>(endpoint: string, data: Record<string, unknown> = {}, options: {
    headers?: Record<string, string>
  } = {}): Promise<T> {
    try {
      const response = await CapacitorHttp.patch({
        url: this.buildUrl(endpoint),
        headers: this.mergeHeaders(options.headers),
        data: data,
        ...defaultOptions,
      });

      return response as T;
    } catch (error) {
      console.error();
      throw error;
    }
  }

  setAuthToken(token: string) {
    this.defaultHeaders['Authorization'] = `Bearer ${token}`;
  }

  removeAuthToken() {
    delete this.defaultHeaders['Authorization'];
  }
}

const httpClient = new HttpClient(baseURL);

export default httpClient;