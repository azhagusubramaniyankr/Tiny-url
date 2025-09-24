import { Component, signal } from '@angular/core';
import { UrlFormComponent } from './components/url-form/url-form';
import { UrlListComponent } from './components/url-list/url-list';
import { UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [UrlFormComponent, UrlListComponent, UpperCasePipe],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  protected readonly title = signal('frontend-angular');
}
