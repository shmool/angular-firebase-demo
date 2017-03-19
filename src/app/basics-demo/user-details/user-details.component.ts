import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'sj-user-details',
  template: `
    <div>
      <label>user details:</label>
      <ul>
        <li>name: {{ userDetails?.name }}</li>
        <li>email: {{ userDetails?.email }}</li>
        <li>photoURL: {{ userDetails?.photoURL }}</li>
      </ul>
    </div>
  `,
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {
  @Input() userDetails;

  constructor() { }

  ngOnInit() {
  }

}
