import { Component, Injectable, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';
import { ArtistData } from '../../data/artist-data';
import { AlbumData } from '../../data/album-data';
import { TrackData } from '../../data/track-data';
import { ResourceData } from '../../data/resource-data';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'
import { CarouselComponent } from '../carousel/carousel.component';
import { CarouselCardComponent } from '../carousel-card/carousel-card.component';
import { TrackListComponent } from '../track-list/track-list.component';
@Component({
  selector: 'app-search',
  standalone: true,
  imports: [FormsModule, CommonModule,CarouselComponent, CarouselCardComponent,TrackListComponent],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
  providers: [ SpotifyService ]
})
@Injectable()
export class SearchComponent implements OnInit {
  searchCategory:string = 'artist';
  searchCategories:string[] = ['artist', 'album', 'track'];
  resources:ResourceData[] | undefined;
  searchinput : string = ""
  service : SpotifyService
  searched : boolean =  false
  carouselIdsearch : string = 'results'
  track_res : TrackData[] | undefined 

  constructor(private spotifyService:SpotifyService) { 
    this.service = spotifyService
  }

  ngOnInit() {
  }

  async search() {
    //TODO: call search function in spotifyService and parse response
    console.log(this.searchCategory)
    if (this.searchinput.length == 0){ //guard
      return 
    }
    console.log(this.searchCategory)



    this.resources = await this.service.searchFor(this.searchCategory, this.searchinput)

    //artists or albums 
    // console.log(this.resources[0].url)
    // console.log(this.resources[0].imageURL)
    // console.log(this.resources[0].name)

    console.log("res: ",this.resources)
    
    if (this.searchCategory == 'track'){
      this.track_res = this.resources as TrackData[]
    }





  }

}