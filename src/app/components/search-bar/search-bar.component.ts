import { Component, OnInit, OnChanges } from '@angular/core';
import { YoutubeDataService } from '../../services/youtube-data/youtube-data.service';
import { CLEAR_VIDEO_LIST } from '../../../store/actions';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from '../../../store/store';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent {

  searchValue: string;
  constructor(private DataService: YoutubeDataService,
              private ngRedux: NgRedux<IAppState>) {
  }

  inputSubmit(keyCode) {
    if (keyCode === 13 || keyCode === 'allowAll') {
      this.DataService.getSearchResults(this.searchValue, null);
    }
  }

}
