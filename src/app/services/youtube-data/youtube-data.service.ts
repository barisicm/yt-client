import { Injectable } from '@angular/core';
import axios from 'axios';
import { AxiosInstance } from 'axios';
import { VideoListResponse, IVideos } from '../../models/videos';
import { NgRedux, select } from '@angular-redux/store';
import { IAppState } from '../../../store/store';
import { ADD_VIDEO_LIST_ITEM } from '../../../store/actions';

@Injectable({
  providedIn: 'root'
})
export class YoutubeDataService {

  private axiosClient: AxiosInstance;
  constructor(private ngRedux: NgRedux<IAppState>) {
    this.axiosClient = axios.create({
      timeout: 3000,
      baseURL: 'https://www.googleapis.com/youtube/v3/',
      headers: {
        Accept: 'application/json'
      }
    });
  }

  getSearchResults(query) {
    this.axiosClient.get<VideoListResponse>('/search', {
      params: {
        part: 'snippet',
        maxResults: 5,
        q: query,
        type: 'video',
        key: 'AIzaSyDgzY99hWWws2PTQdvuQlJPoLaW64Cr8z8'
      }
    })
    .then((response) => {
      // console.log(response.data.items);
      response.data.items.map((value) => {
        const videoItem: IVideos = {} as IVideos;
        videoItem.channelId = value.snippet.channelId;
        videoItem.channelTitle = value.snippet.channelTitle;
        videoItem.thumbnailUrl = value.snippet.thumbnails.default.url;
        videoItem.videoId = value.id.videoId;
        videoItem.videoTitle = value.snippet.title;
        videoItem.description = value.snippet.description;
        this.ngRedux.dispatch({type: ADD_VIDEO_LIST_ITEM, videosList: videoItem});
      });
    })
    .catch((error) => {
      console.log(error);
    });
  }

  getVideoById(vid) {
    this.axiosClient.get('/videos', {
      params: {
        part: 'player',
        id: 'tAGnKpE4NCI',
        // id: vid,
        maxHeight: 522,
        key: 'AIzaSyDgzY99hWWws2PTQdvuQlJPoLaW64Cr8z8'
      }
    })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
  }
}
