import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
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

  constructor(private announcementService: AnnouncementService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.announcementService.getAllAnnouncements().subscribe((responce: IAnnouncement[]) => {
      this.announcements = responce;
      this.loading = true;
      if (this.announcements.length) {
        this.isAnnouncement = true;
      }
    });
  }

  public deleteAnnouncement(id: number | undefined): void {
    if (typeof id === 'number') {
      this.announcementService.deleteAnnouncementById(id).subscribe(() => {
        this.announcements = this.announcements.filter((announcement: IAnnouncement) => {
          return announcement.id != id;
        });

        this.snackBar.open("Announcement is deleted", 'X', {
          duration: 2000,
          verticalPosition: 'top'
        });
      });
      return;
    }
    this.snackBar.open("Announcement has't id", 'X', {
      duration: 2000,
      verticalPosition: 'top'
    });
  }

}
