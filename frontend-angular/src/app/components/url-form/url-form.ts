import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UrlService, Url } from '../../services/url';

@Component({
  selector: 'app-url-form',
  standalone: true,
  imports: [FormsModule, CommonModule], 
  templateUrl: './url-form.html',
  styleUrls: ['./url-form.css']
})
export class UrlFormComponent {
  longUrl = '';
  isPrivate = false;
  createdUrl?: Url;
  copyButtonText = 'Copy';

  constructor(private urlService: UrlService) {}

  onSubmit() {
    const url: Url = {
      originalUrl: this.longUrl,
      isPrivate: this.isPrivate
    };

    this.urlService.createUrl(url).subscribe(res => {
      this.createdUrl = res;
      this.longUrl = '';
      this.isPrivate = false;
    });
  }

  copyText(text: string) {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
        this.copyButtonText = 'Copied!';
        setTimeout(() => this.copyButtonText = 'Copy', 3000);
      }).catch(() => {
        this.copyButtonText = 'Failed!';
        setTimeout(() => this.copyButtonText = 'Copy', 3000);
      });
    } else {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      try {
        document.execCommand('copy');
        this.copyButtonText = 'Copied!';
      } catch {
        this.copyButtonText = 'Failed!';
      }
      document.body.removeChild(textarea);

      setTimeout(() => this.copyButtonText = 'Copy', 3000);
    }
  }
}
