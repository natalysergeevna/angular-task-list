import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  widthContainer: string;

  constructor(public breakpointObserver: BreakpointObserver) {}

  ngOnInit() {
    this.breakpointObserver
      .observe([
        Breakpoints.XLarge,
        Breakpoints.Large,
        Breakpoints.Medium,
        Breakpoints.Small,
        Breakpoints.XSmall,
      ])
      .subscribe((result) => {
        const breakpoints = result.breakpoints;
        if (breakpoints[Breakpoints.XLarge]) {
          this.widthContainer = '1600px';
        } else if (breakpoints[Breakpoints.Large]) {
          this.widthContainer = '1200px';
        } else if (breakpoints[Breakpoints.Medium]) {
          this.widthContainer = '900px';
        } else if (breakpoints[Breakpoints.Small]) {
          this.widthContainer = '560px';
        } else {
          this.widthContainer = '375px';
        }
      });
  }
}
