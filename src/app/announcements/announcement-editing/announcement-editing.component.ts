import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
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
  public id: number = Number(this.activatedRoute.snapshot.paramMap.get('id'));

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute,
    private announcementService: AnnouncementService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.announcementService.getAnnouncementById(this.id).subscribe((responce: IAnnouncement) => {
      this.announcement = responce;
      this.initForm(responce.title, responce.description);
    }, (error: HttpErrorResponse) => {
      console.log(error);
      window.location.href = error.url!;
    });
  }

  public initForm(announcementTitle: string = '', announcementDescription: string = ''): void {
    this.orderDetailsForm = this.fb.group({
      title: new FormControl(announcementTitle, [Validators.required]),
      description: new FormControl(announcementDescription, [Validators.required])
    });
  }

  public isInputData(): boolean {
    return this.orderDetailsForm.get('title')?.value !== '' && this.orderDetailsForm.get('description')?.value !== '';
  }

  public saveChanges(): void {

  }
}
