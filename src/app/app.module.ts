import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/app/app.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { VideoDetailsComponent } from './components/video-details/video-details.component';
import { VideoListComponent } from './components/video-list/video-list.component';
import { VideoListItemComponent } from './components/video-list-item/video-list-item.component';
import { FormsModule } from '@angular/forms';
import { NgRedux, NgReduxModule, DevToolsExtension } from '@angular-redux/store';
import { IAppState, rootReducer, INITIAL_STATE } from '../store/store';
import { isDevMode } from '@angular/core';
import { ChannelComponent } from './components/channel/channel.component';
import { HomeComponent } from './components/home/home.component';


@NgModule({
  declarations: [
    AppComponent,
    SearchBarComponent,
    VideoDetailsComponent,
    VideoListComponent,
    VideoListItemComponent,
    ChannelComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgReduxModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(ngRedux: NgRedux<IAppState>, private devTools: DevToolsExtension) {

    let enhancers = [];

    if (isDevMode() && devTools.isEnabled()) {
      enhancers = [ ...enhancers, devTools.enhancer() ];
    }

    ngRedux.configureStore(rootReducer, INITIAL_STATE, [],
      enhancers);
  }
 }
