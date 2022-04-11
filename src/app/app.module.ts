import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AnnouncementsListComponent } from './announcements/announcements-list/announcements-list.component';
import { AnnouncementCreatingComponent } from './announcements/announcement-creating/announcement-creating.component';
import { AnnouncementDeletingComponent } from './announcements/announcement-deleting/announcement-deleting.component';

@NgModule({
  declarations: [
    AppComponent,
    AnnouncementsListComponent,
    AnnouncementCreatingComponent,
    AnnouncementDeletingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
