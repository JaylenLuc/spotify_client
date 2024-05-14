import { Component, Input, OnInit } from '@angular/core';
import { AboutComponent } from '../../components/about/about.component';
import { SearchComponent } from '../../components/search/search.component';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [AboutComponent, SearchComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent implements OnInit {
  router : Router 
  constructor(r : Router) {
    this.router = r
   }

  ngOnInit(): void {
    
  }
}
