import { Component, OnInit, OnChanges } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { Observable } from 'rxjs';
import { IVideos, Video } from '../../models/videos';
import { IAppState } from '../../../store/store';

@Component({
  selector: 'app-video-list',
  templateUrl: './video-list.component.html',
  styleUrls: ['./video-list.component.css']
})
export class VideoListComponent implements OnInit {

  videosList: IVideos[] = [];
  counter: Observable<IVideos>;
  constructor(private ngRedux: NgRedux<IAppState>) { }

  ngOnInit() {
    this.counter = this.ngRedux.select('videosList');
    this.counter.subscribe((videoListSubscription: IVideos) => {
      if (videoListSubscription[0] !== undefined) {
        this.videosList.push(videoListSubscription);
      } else {
        this.videosList = [];
      }
    });
  }
}
