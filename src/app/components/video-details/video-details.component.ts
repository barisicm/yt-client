import { Component, OnInit, DoCheck } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { Observable, from } from 'rxjs';
import { IVideos, Video } from '../../models/videos';
import { IAppState } from '../../../store/store';
import { YoutubeDataService } from '../../services/youtube-data/youtube-data.service';
import { SafeUrl, DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-video-details',
  templateUrl: './video-details.component.html',
  styleUrls: ['./video-details.component.css']
})
export class VideoDetailsComponent implements OnInit {

  currentUrl: SafeResourceUrl = '';
  currentVideo: IVideos;
  url: string;

  constructor(private ngRedux: NgRedux<IAppState>,
              private DataService: YoutubeDataService,
              private sanitizer: DomSanitizer,
              private router: Router) { }

  ngOnInit() {
    this.ngRedux.select('video').subscribe((video: IVideos) => {
      this.setVideoData(video);
      if (video.videoId === undefined) {
      } else {
        this.setIframe(video.videoId);
      }
    });

    this.ngRedux.select('chnlThumbnail').subscribe((channelThbUrl: string) => {
      this.url = channelThbUrl;
    });
  }

  setVideoData(video: IVideos) {
    const tempObj: IVideos = {} as IVideos;
    tempObj.channelId = video.channelId;
    tempObj.channelTitle = video.channelTitle;
    tempObj.description = video.description;
    tempObj.thumbnailUrl = video.thumbnailUrl;
    tempObj.videoId = video.videoId;
    tempObj.videoTitle = video.videoTitle;
    this.currentVideo = tempObj;
  }

  setIframe(videoId) {
    const url = 'https://www.youtube.com/embed/' + videoId;
    this.currentUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  gotoChannels() {
    const id = this.currentVideo.channelId;
    this.router.navigate(['/', 'channels', id]);
  }
}
