import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IAnnouncement } from 'src/app/models/announcement.interface';
import { AnnouncementService } from 'src/app/services/announcement.service';

@Component({
  selector: 'app-announcement-creating',
  templateUrl: './announcement-creating.component.html',
  styleUrls: ['./announcement-creating.component.scss']
})
export class AnnouncementCreatingComponent implements OnInit {
  public orderDetailsForm!: FormGroup;

  constructor(private fb: FormBuilder, private announcementService: AnnouncementService) { }

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

  public send(): void {
    const newAnnouncement: IAnnouncement = {
      title: this.orderDetailsForm.get('title')?.value,
      description: this.orderDetailsForm.get('description')?.value
    };
    this.announcementService.createAnnouncement(newAnnouncement).subscribe(() => {
      this.orderDetailsForm.get('title')?.setValue('');
      this.orderDetailsForm.get('description')?.setValue('');
    });
  }

}
