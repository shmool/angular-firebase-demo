import { Component } from '@angular/core';

@Component({
  selector: 'sj-root',
  template: `
  <h1>
    {{title}}
  </h1>
  <router-outlet></router-outlet>
  `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Angular & Firebase Demo';
}
