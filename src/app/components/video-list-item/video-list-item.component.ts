import { Component, OnInit, Input } from '@angular/core';
import { YoutubeDataService } from '../../services/youtube-data/youtube-data.service';
import { IAppState } from '../../../store/store';
import { NgRedux } from '@angular-redux/store';
import { ADD_VIDEO_IFRAME } from 'src/store/actions';
import { IVideos } from '../../models/videos';

@Component({
  selector: 'app-video-list-item',
  templateUrl: './video-list-item.component.html',
  styleUrls: ['./video-list-item.component.css']
})
export class VideoListItemComponent {
  @Input() videoTitle: string;
  @Input() description: string;
  @Input() thumbnailUrl: string;
  @Input() channelId: string;
  @Input() videoId: string;
  @Input() channelTitle: string;

  channelThumbnailUrl: string;

  constructor(private ngRedux: NgRedux<IAppState>,
              private DataService: YoutubeDataService) { }

  dispatchVideo() {
    this.DataService.getChannelThumbnail(this.channelId);
    this.ngRedux.dispatch({
      type: ADD_VIDEO_IFRAME,
      video: this.saveInputsToObject(this.videoTitle, this.description, this.thumbnailUrl, this.channelId, this.videoId, this.channelTitle)
    });
  }

  saveInputsToObject(videoTitle, description, thumbnailUrl, channelId, videoId, channelTitle) {
    const videoItem: IVideos = {} as IVideos;
    videoItem.channelId = channelId;
    videoItem.channelTitle = channelTitle;
    videoItem.description = description;
    videoItem.thumbnailUrl = thumbnailUrl;
    videoItem.videoId = videoId;
    videoItem.videoTitle = videoTitle;
    return videoItem;
  }
}
