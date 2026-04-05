import { Component, inject, NgZone, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './upload.html',
})
export class UploadComponent {
  file: File | null = null;
  jobDescription: string = '';
  result: any = null;
  loading = false;

  private http = inject(HttpClient);
  private zone = inject(NgZone); // ✅ added
  private cdr = inject(ChangeDetectorRef);

  onFileChange(event: any) {
    this.file = event.target.files[0];
  }

  upload() {
    if (!this.file) {
      alert('Please upload a file');
      return;
    }

    this.loading = true;

    const formData = new FormData();
    formData.append('file', this.file);
    formData.append('job_description', this.jobDescription);
    
const API_URL =
  location.hostname === 'localhost'
    ? 'http://localhost:5000/analyze'
    : 'https://ai-resume-analyzer-backend-46z5.onrender.com/analyze';

    this.http.post(API_URL, formData).subscribe({
      next: (res: any) => {
        this.zone.run(() => {
          this.result = res;
          this.loading = false;
          this.cdr.detectChanges();
        });
      },
      error: (err) => {
        console.error(err);

        this.zone.run(() => {
          this.loading = false;
        });

        alert('Error analyzing resume');
      },
    });
  }
}
