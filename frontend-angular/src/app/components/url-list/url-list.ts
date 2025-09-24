import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UrlService, Url } from '../../services/url';

@Component({
  selector: 'app-url-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './url-list.html',
  styleUrls: ['./url-list.css']
})
export class UrlListComponent implements OnInit {
  urls: Url[] = [];
  searchText = '';
  buttonTexts: { [key: number]: string } = {};

  constructor(private urlService: UrlService) {}

  ngOnInit() {
    this.loadUrls();
  }

  loadUrls() {
    this.urlService.getUrls().subscribe(data => {
      this.urls = data;
    });
  }

  deleteUrl(id: number | undefined) {
    if (!id) return;
    if(confirm('Are you sure you want to delete the URL?')){
      this.urlService.deleteUrl(id).subscribe(() => {
        this.loadUrls();
      });
    } 
  }

  filteredUrls(): Url[] {
    return this.urls.filter(u =>
      u.originalUrl.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }


  copyText(text: string, id: number | undefined) {
    if (!id) return;

    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(
        () => {
          this.buttonTexts[id] = 'Copied!';
          setTimeout(() => this.buttonTexts[id] = 'Copy', 3000);
        },
        () => {
          this.buttonTexts[id] = 'Failed!';
          setTimeout(() => this.buttonTexts[id] = 'Copy', 3000);
        }
      );
    } else {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      try {
        document.execCommand('copy');
        this.buttonTexts[id] = 'Copied!';
      } catch {
        this.buttonTexts[id] = 'Failed!';
      }
      document.body.removeChild(textarea);

      setTimeout(() => this.buttonTexts[id] = 'Copy', 3000);
    }
  }
}
