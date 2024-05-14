import { ResourceData } from './resource-data';
import { ArtistData } from './artist-data';
import { AlbumData } from './album-data';

export class TrackData extends ResourceData {
	album:AlbumData | undefined;
	artists:ArtistData[];
	duration_ms:number;
	formatted_length : string = ""
	albumFlag : boolean = false;

	constructor(objectModel:any) {
		super(objectModel);
		this.category = "track";
		this.duration_ms = objectModel['duration_ms']

		this.url ='track/'+ objectModel['id']
		this.artists = objectModel['artists'].map((artist:any) => {
			return new ArtistData(artist);
		});
		//console.log("logged artist: ",this.artists[0].url)

		if(objectModel['album']) {
			this.album = new AlbumData(objectModel['album']);
			this.albumFlag = true;
		}

		this.duration_ms = objectModel['duration_ms'];
	}

	//Return duration_ms in X:XX form (and drop ms component)
	get durationStr() {
		var minutes:number = this.duration_ms / 60000; //60 sec/min * 100ms/sec
		var seconds:number = (this.duration_ms) / 1000 % 60; // 100ms/sec, get remainder
		return minutes.toFixed(0) + ':' + seconds.toFixed(0).padStart(2, '0');
	}


}
