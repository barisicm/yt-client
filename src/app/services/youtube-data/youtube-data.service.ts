import { Injectable } from '@angular/core';
import axios from 'axios';
import { AxiosInstance } from 'axios';
import { VideoListResponse, IVideos } from '../../models/videos';
import { NgRedux, select } from '@angular-redux/store';
import { IAppState } from '../../../store/store';
import { ADD_VIDEO_LIST_ITEM, ADD_VIDEO_IFRAME, ADD_CHANNEL_THUMBNAIL, CLEAR_VIDEO_LIST } from '../../../store/actions';


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

  getSearchResults(query?: string, cId?: string) {
    this.axiosClient.get<VideoListResponse>('/search', {
      params: {
        part: 'snippet',
        maxResults: 5,
        q: query,
        channelId: cId,
        type: 'video',
        key: 'AIzaSyBN3IY5wP_b-6ukixId85hv9c1VgOr6CZI'
      }
    })
    .then((response) => {
      this.ngRedux.dispatch({type: CLEAR_VIDEO_LIST});
      this.getChannelThumbnail(response.data.items[0].snippet.channelId);
      this.ngRedux.dispatch({type: ADD_VIDEO_IFRAME, video: this.saveResponseToObject(response)});

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

  getChannelThumbnail(cid) {
    this.axiosClient.get('/channels', {
     params: {
      id: cid,
      part: 'snippet',
      fields: 'items(snippet(thumbnails(medium(url))))',
      key: 'AIzaSyBN3IY5wP_b-6ukixId85hv9c1VgOr6CZI'
     }
    })
    .then((response) => {
      this.ngRedux.dispatch({type: ADD_CHANNEL_THUMBNAIL, channelThumbnailUrl: response.data.items[0].snippet.thumbnails.medium.url});
    })
    .catch((error) => {

    });
  }

  saveResponseToObject(response) {
    const videoItem: IVideos = {} as IVideos;
    videoItem.channelId = response.data.items[0].snippet.channelId;
    videoItem.channelTitle = response.data.items[0].snippet.channelTitle;
    videoItem.description = response.data.items[0].snippet.description;
    videoItem.thumbnailUrl = response.data.items[0].snippet.thumbnails.default.url;
    videoItem.videoId = response.data.items[0].id.videoId,
    videoItem.videoTitle = response.data.items[0].snippet.title;
    return videoItem;
  }
}
