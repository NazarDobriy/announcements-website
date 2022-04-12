import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { IAnnouncement } from 'src/app/models/announcement.interface';
import { AnnouncementService } from 'src/app/services/announcement.service';

@Component({
  selector: 'app-announcement-creating',
  templateUrl: './announcement-creating.component.html',
  styleUrls: ['./announcement-creating.component.scss']
})
export class AnnouncementCreatingComponent implements OnInit {
  public orderDetailsForm!: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private announcementService: AnnouncementService
  ) {}

  ngOnInit(): void {
    this.initForm();
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

  public send() {
    const snakcBarRef: MatSnackBarRef<SimpleSnackBar> = this.snackBar.open("Announcement is added", 'X', {
      duration: 2000,
      verticalPosition: 'top'
    });

    const newAnnouncement: IAnnouncement = {
      title: this.orderDetailsForm.get('title')?.value,
      description: this.orderDetailsForm.get('description')?.value
    };
    this.announcementService.createAnnouncement(newAnnouncement).subscribe(() => {
      this.orderDetailsForm.get('title')?.setValue('');
      this.orderDetailsForm.get('description')?.setValue('');

      snakcBarRef.afterDismissed().subscribe(() => {
        this.router.navigate(['/']);
      });
    });
  }

}
