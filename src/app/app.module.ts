import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/app/app.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { VideoDetailsComponent } from './components/video-details/video-details.component';
import { VideoListComponent } from './components/video-list/video-list.component';
import { VideoListItemComponent } from './components/video-list-item/video-list-item.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchBarComponent,
    VideoDetailsComponent,
    VideoListComponent,
    VideoListItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
