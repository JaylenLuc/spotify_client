import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrackData } from '../../data/track-data';
import { ResourceData } from '../../data/resource-data';

@Component({
  selector: 'app-track-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './track-list.component.html',
  styleUrl: './track-list.component.scss'
})

export class TrackListComponent implements OnInit {
	@Input() tracks:TrackData[] | undefined; //changed from TrackData
	@Input() hideArtist:boolean = false;
	@Input() hideAlbum:boolean = false;
  @Input() albumName: string = ""

  constructor() { 
  }

  ngOnChanges() {
    if (this.tracks !== undefined){
      for (let i = 0 ; i < this.tracks?.length; i ++){
        let min = Math.floor(this.tracks[i].duration_ms/60000).toString() + " : "  
        
        let sec =( Math.floor(this.tracks[i].duration_ms/1000) % 60).toString()
        sec = sec.length == 1 ? "0" + sec : sec  

        this.tracks[i].formatted_length = min + sec 
      }
    }
}


  ngOnInit() {

  }

}
