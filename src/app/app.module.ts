import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AnnouncementsListComponent } from './announcements/announcements-list/announcements-list.component';
import { AnnouncementCreatingComponent } from './announcements/announcement-creating/announcement-creating.component';
import { AnnouncementService } from './announcement.service';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { AnnouncementEditingComponent } from './announcements/announcement-editing/announcement-editing.component';
import { MaterialModule } from './material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    AnnouncementsListComponent,
    AnnouncementEditingComponent,
    AnnouncementCreatingComponent,
    HeaderComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MaterialModule
  ],
  providers: [AnnouncementService],
  bootstrap: [AppComponent]
})
export class AppModule { }
