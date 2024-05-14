import { Component } from '@angular/core';
import { CarouselCardComponent } from '../../components/carousel-card/carousel-card.component';
import { CarouselComponent } from '../../components/carousel/carousel.component';
import { SpotifyService } from '../../services/spotify.service';
import { ActivatedRoute } from '@angular/router';
import { TrackData } from '../../data/track-data';

@Component({
  selector: 'app-your-top-tracks',
  standalone: true,
  imports: [CarouselCardComponent,CarouselComponent],
  templateUrl: './your-top-tracks.component.html',
  styleUrl: './your-top-tracks.component.scss'
})
export class YourTopTracksComponent {
  carID : string = "resnaut"
  sso : SpotifyService
  myID : string | undefined
  route : ActivatedRoute
  top_track : TrackData[] | undefined
  constructor(sso : SpotifyService, route: ActivatedRoute){
    this.sso = sso
    this.route = route
  }

  async ngOnInit(){
    console.log("here")
    this.myID = this.route.snapshot.paramMap.get('id') || "";
    this.top_track = await this.sso.getTopTracksForYou(this.myID)
    console.log("this top tracks::: ", this.top_track)
  } 

}
