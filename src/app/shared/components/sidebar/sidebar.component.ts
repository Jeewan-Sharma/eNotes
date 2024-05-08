import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import { BadgeModule } from 'primeng/badge';

const PrimeNgModules = [BadgeModule]


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  standalone: true,
  imports: [CommonModule, PrimeNgModules]
})
export class SidebarComponent implements OnInit {

  tags!: string[]

  constructor() { };

  ngOnInit(): void {
    this.getTags();
  }

  getTags() {
    this.tags = [
      'Daily Entry',
      'Work',
      'Kitchen',
      'Travel',
      'Study',
      'Passwords',
    ]
  }

}
