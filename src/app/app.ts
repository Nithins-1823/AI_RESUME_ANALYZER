import { Component, signal } from '@angular/core';
import { UploadComponent } from './app/upload/upload/upload';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [UploadComponent],
  template: `<app-upload></app-upload>`,
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('resume_analyzer');
}