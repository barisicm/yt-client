import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { YoutubeDataService } from '../../services/youtube-data/youtube-data.service';
import { Router } from '@angular/router';
import { CLEAR_VIDEO_LIST, RESET_STATE } from '../../../store/actions';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from '../../../store/store';

@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.css']
})
export class ChannelComponent implements OnInit {

  channelId: string;
  constructor(private route: ActivatedRoute,
              private dataService: YoutubeDataService,
              private router: Router,
              private ngRedux: NgRedux<IAppState>) {
  }

  ngOnInit() {
    this.ngRedux.dispatch({type: CLEAR_VIDEO_LIST});
    this.route.params.subscribe(params => {
      this.dataService.getSearchResults(null, params.id);
    });
  }

  gotoHome() {
    this.router.navigate(['/']);
    this.ngRedux.dispatch({type: RESET_STATE});
  }

}
