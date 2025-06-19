import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { NavToggledService } from '../../common/service/nav-toggled.service';

@Component({
  selector: 'hm-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  navDisplay: boolean = true;
  hospitalName: string = '';

  constructor(
    private navToggledService: NavToggledService,
    private changeDetectorRef: ChangeDetectorRef,
  ) { }

  ngOnInit() {
    this.navToggledService.getNavDisplaySub().subscribe(navDisplay => {
      this.navDisplay = navDisplay;
      this.changeDetectorRef.detectChanges();
    });
  }

  toggleNavOnclick() {
    this.navDisplay = !this.navDisplay;
    this.navToggledService.changeNavDisplay(this.navDisplay);
    this.changeDetectorRef.detectChanges();
  }
}
