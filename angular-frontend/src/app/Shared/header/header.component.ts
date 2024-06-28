import { Component } from '@angular/core';

@Component({
  selector: 'app-root-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  title = 'angular';

  collapsed: boolean = true;
}