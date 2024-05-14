import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArtistData } from '../../data/artist-data';
import { TrackData } from '../../data/track-data';
import { AlbumData } from '../../data/album-data';
import { CommonModule } from '@angular/common';
import { SpotifyService } from '../../services/spotify.service';
import { TrackListComponent } from '../../components/track-list/track-list.component';

@Component({
  selector: 'app-album-page',
  standalone: true,
  imports: [CommonModule, TrackListComponent],
  templateUrl: './album-page.component.html',
  styleUrl: './album-page.component.scss'
})

export class AlbumPageComponent implements OnInit {
	albumId:string | undefined;
	album:AlbumData | undefined;
	tracks:TrackData[] | undefined;
  ss : SpotifyService 
  hideArtist : boolean = true
  hideAlbum : boolean = true


  constructor(private route: ActivatedRoute, sso : SpotifyService) { 
    this.ss = sso
  }

  async ngOnInit() {
  	this.albumId = this.route.snapshot.paramMap.get('id') || "";
  	//TODO: inject spotifyService and use it to get the album data and the tracks for the album
    this.album = await  this.ss.getAlbum(this.albumId)
    console.log("aaa:", this.album )
    this.tracks = await this.ss.getTracksForAlbum(this.albumId)
    console.log("album page tracksL: ",this.tracks)



  }

}
