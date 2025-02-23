import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArtistData } from '../../data/artist-data';
import { TrackData } from '../../data/track-data';
import { AlbumData } from '../../data/album-data';
import { TrackFeature } from '../../data/track-feature';
import { CommonModule } from '@angular/common';
import { SpotifyService } from '../../services/spotify.service';
import { ThermometerComponent } from '../../components/thermometer/thermometer.component';

@Component({
  selector: 'app-track-page',
  standalone: true,
  imports: [CommonModule,ThermometerComponent],
  templateUrl: './track-page.component.html',
  styleUrl: './track-page.component.scss'
})

export class TrackPageComponent implements OnInit {
	trackId:string | undefined;
	track: TrackData | undefined;
  audioFeatures: TrackFeature[] = [];
  sso : SpotifyService

  constructor(private route: ActivatedRoute, sso : SpotifyService) { 
    this.sso = sso
  }

  async ngOnInit() {
  	this.trackId = this.route.snapshot.paramMap.get('id') || "";
  	//TODO: Inject the spotifyService and use it to get the track data and it's audio features
    this.audioFeatures = await this.sso.getAudioFeaturesForTrack(this.trackId)
    this.track = await this.sso.getTrack(this.trackId)
    console.log("ttt: ", this.track.url)
  }
}
