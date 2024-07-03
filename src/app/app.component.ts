import { ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { ApiServiceService } from './api-service.service';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MediaMatcher } from '@angular/cdk/layout';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MatTabsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatSidenavModule,
    MatFormFieldModule,
    MatListModule,
    MatButtonModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnDestroy {
  title: any;

  constructor(
    private router: Router,
    private api: ApiServiceService,
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  isTabActive(path: string): boolean {
    return this.router.url === path;
  }

  // sidenav stuff from angular material
  mobileQuery!: MediaQueryList;

  // inside nav
  fillerNav = Array.from({ length: 3 }, (_, i) => `Nav Item ${i + 1}`);

  // outside of nav
  fillerContent = Array.from({ length: 1 }, () => `supposed to be things for nav?`);

  private _mobileQueryListener: () => void;

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
}
