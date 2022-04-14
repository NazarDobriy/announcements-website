import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { IAnnouncement } from 'src/app/models/announcement.interface';
import { AnnouncementService } from 'src/app/services/announcement.service';

@Component({
  selector: 'app-announcement-editing',
  templateUrl: './announcement-editing.component.html',
  styleUrls: ['./announcement-editing.component.scss']
})
export class AnnouncementEditingComponent implements OnInit {
  public orderDetailsForm!: FormGroup;
  public announcement!: IAnnouncement;
  public loading: boolean = false;
  public id: number = this.activatedRoute.snapshot.params.id;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute,
    private announcementService: AnnouncementService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.announcementService.getAnnouncementById(this.id).subscribe((responce: IAnnouncement) => {
      this.loading = true;
      this.announcement = responce;
      this.orderDetailsForm.get('title')?.setValue(responce.title);
      this.orderDetailsForm.get('description')?.setValue(responce.description);
    }, (error: HttpErrorResponse) => {
      console.log(error);
      window.location.href = error.url!;
    });
  }

  public initForm(): void {
    this.orderDetailsForm = this.fb.group({
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required])
    });
  }

  public isInputData(): boolean {
    return this.orderDetailsForm.get('title')?.value !== '' && this.orderDetailsForm.get('description')?.value !== '';
  }

  public saveChanges(): void {
    this.announcement.title = this.orderDetailsForm.get('title')?.value;
    this.announcement.description = this.orderDetailsForm.get('description')?.value;

    this.announcementService.editAnnouncement(this.id, this.announcement).subscribe(() => {
      const snakcBarRef: MatSnackBarRef<SimpleSnackBar> = this.snackBar.open("Announcement is edited", 'X', {
        duration: 2000,
        verticalPosition: 'top'
      });

      snakcBarRef.afterDismissed().subscribe(() => {
        this.router.navigate(['/']);
      });
    });
  }
  
}
