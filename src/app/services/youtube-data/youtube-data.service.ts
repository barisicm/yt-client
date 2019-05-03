import { Injectable } from '@angular/core';
import axios from 'axios';
import { AxiosInstance } from 'axios';

@Injectable({
  providedIn: 'root'
})
export class YoutubeDataService {

  private axiosClient: AxiosInstance;
  constructor() {
    this.axiosClient = axios.create({
      timeout: 3000,
      baseURL: 'https://some-domain.com/api/',
      headers: {
        'X-Initialized-At': Date.now().toString()
      }
    });

  }

}
