import { Component, OnInit } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IAnnouncement } from 'src/app/models/announcement.interface';
import { AnnouncementService } from 'src/app/services/announcement.service';

@Component({
  selector: 'app-announcements-list',
  templateUrl: './announcements-list.component.html',
  styleUrls: ['./announcements-list.component.scss']
})
export class AnnouncementsListComponent implements OnInit {
  readonly SIMILAR_LIMIT: number = 3;
  public searchTitle: string = '';
  public announcements!: IAnnouncement[];
  public loading: boolean = false;
  public isAnnouncement: boolean = false;
  public copyAnnouncements!: IAnnouncement[];

  constructor(private announcementService: AnnouncementService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.announcementService.getAllAnnouncements().subscribe((responce: IAnnouncement[]) => {
      this.announcements = responce;
      this.copyAnnouncements = responce;
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

  public isSimilarText(str1: string, str2: string): boolean {
    let result: boolean = false;
    if (str1.split(' ').length === 1) {
      str2.split(' ').forEach((word) => {
        if (word === str1) {
          result = true;
        }
      });
    } else {
      str2.split(' ').forEach((word) => {
        if (str1.includes(word)) {
          result = true;
        }
      });
    }
    return result;
  }

  public filterSimilarAnnouncements(): IAnnouncement[] {
    const similarAnnouncements: IAnnouncement[] = [];
    const uniqueAnnouncements: Set<number> = new Set();
    for (let i = 0; i < this.announcements.length; i++) {
      for (let j = i + 1; j < this.announcements.length; j++) {
        //debugger;
        const isSimilarTitle: boolean = this.isSimilarText(
          this.announcements[i].title.toLocaleLowerCase(), 
          this.announcements[j].title.toLocaleLowerCase()
        );
        const isSimilarDescription: boolean = this.isSimilarText(
          this.announcements[i].description.toLocaleLowerCase(), 
          this.announcements[j].description.toLocaleLowerCase()
        );
        if (isSimilarTitle && isSimilarDescription) {
          uniqueAnnouncements.add(i);
          uniqueAnnouncements.add(j);
        }
      }
    }
    for (const unique of uniqueAnnouncements) {
      similarAnnouncements.push(this.announcements[unique]);
    }
    return similarAnnouncements.slice(0, this.SIMILAR_LIMIT);
  }

  public changeCheckBox(event: MatCheckboxChange): void {
    event.checked ? this.announcements = this.filterSimilarAnnouncements() : this.announcements = this.copyAnnouncements;
  }

}
