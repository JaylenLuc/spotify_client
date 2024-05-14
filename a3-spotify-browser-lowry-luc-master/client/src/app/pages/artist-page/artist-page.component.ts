import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArtistData } from '../../data/artist-data';
import { TrackData } from '../../data/track-data';
import { AlbumData } from '../../data/album-data';
import { SpotifyService } from '../../services/spotify.service';
import { Injectable } from '@angular/core';
import { TrackListComponent } from '../../components/track-list/track-list.component';
import { CarouselComponent } from '../../components/carousel/carousel.component';
import { CarouselCardComponent } from '../../components/carousel-card/carousel-card.component';

@Component({
  selector: 'app-artist-page',
  standalone: true,
  imports: [CommonModule, TrackListComponent,CarouselComponent,CarouselCardComponent],
  templateUrl: './artist-page.component.html',
  styleUrl: './artist-page.component.scss'
})
@Injectable()
export class ArtistPageComponent implements OnInit {
	artistId:string | undefined;
	artist:ArtistData | undefined;
	relatedArtists:ArtistData[] | undefined;
	topTracks:TrackData[] | undefined;
	albums:AlbumData[] | undefined;
  spotifyServiceObject: SpotifyService
  carouselID : string = "artistpagecar"
  carouselID1 : string = "artistpagecar1"

  constructor(private route: ActivatedRoute, sso : SpotifyService) {
    this.spotifyServiceObject = sso 
  }

  async ngOnInit() {
  	this.artistId = this.route.snapshot.paramMap.get('id') || "";
    //TODO: Inject the spotifyService and use it to get the artist data, related artists, top tracks for the artist, and the artist's albums

    this.artist = await this.spotifyServiceObject.getArtist(this.artistId)
    this.relatedArtists = await this.spotifyServiceObject.getRelatedArtists(this.artistId)
    this.topTracks = await this.spotifyServiceObject.getTopTracksForArtist(this.artistId)
    console.log("toptrackss: ", this.topTracks)
    this.albums = await this.spotifyServiceObject.getAlbumsForArtist(this.artistId)



  }

}
