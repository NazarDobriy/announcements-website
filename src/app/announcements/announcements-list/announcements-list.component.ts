import { Component, OnInit } from '@angular/core';
import { IAnnouncement } from 'src/app/models/announcement.interface';
import { AnnouncementService } from 'src/app/services/announcement.service';

@Component({
  selector: 'app-announcements-list',
  templateUrl: './announcements-list.component.html',
  styleUrls: ['./announcements-list.component.scss']
})
export class AnnouncementsListComponent implements OnInit {
  public announcements!: IAnnouncement[];
  public loading: boolean = false;
  public isAnnouncement: boolean = false;

  constructor(private announcementService: AnnouncementService) {}

  ngOnInit(): void {
    this.announcementService.getAllAnnouncements().subscribe((responce: IAnnouncement[]) => {
      this.announcements = responce;
      this.loading = true;
      if (this.announcements.length) {
        this.isAnnouncement = true;
      }
    });
  }

}
