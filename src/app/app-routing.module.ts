import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnnouncementCreatingComponent } from './announcements/announcement-creating/announcement-creating.component';
import { AnnouncementEditingComponent } from './announcements/announcement-editing/announcement-editing.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'create', component: AnnouncementCreatingComponent },
  { path: 'edit/:id', component: AnnouncementEditingComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
