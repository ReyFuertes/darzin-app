import { Component, OnInit } from '@angular/core';
import { Router, RouterEvent } from '@angular/router';
import { filter, takeUntil } from 'rxjs';

import { GenericDestroy } from '../../generics/destroy.generic';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss']
})
export class TopnavComponent extends GenericDestroy implements OnInit {
  public currentMenu: string;

  constructor(private router: Router) {
    super();
    this.router.events.pipe(
      filter((e: any): e is RouterEvent => e instanceof RouterEvent),
      takeUntil(this.$unsubscribe))
      .subscribe((e: RouterEvent) => {
        this.currentMenu = e?.url?.replace('/', '');
      });
  }

  ngOnInit(): void { }
}
