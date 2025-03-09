import { Component, inject, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  RouterModule,
  RouterOutlet,
  Router,
} from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [RouterModule, RouterOutlet],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  listAlarms = 'listbtn';
  listUbications = 'listbtn';
  listReports = 'listbtn';

  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  constructor() {}

  ngOnInit(): void {
    this.route.url.subscribe(() => {
      this.listAlarms = 'listbtn';
      this.listUbications = 'listbtn';
      this.listReports = 'listbtn';

      const lastPartHref = window.location.href.split('/').pop();
      switch (lastPartHref) {
        case 'lista-alarmas':
          this.listAlarms = 'listbtn-active';
          break;
        case 'lista-ubicaciones':
          this.listUbications = 'listbtn-active';
          break;
        case 'reportes':
          this.listReports = 'listbtn-active';
          break;
      }
    });
  }

  public logout() {
    localStorage.removeItem('email');
    this.router.navigate(['/login']);
  }
}
