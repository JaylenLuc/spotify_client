import { ResourceData } from './resource-data';
import { ArtistData } from './artist-data';

export class AlbumData extends ResourceData {
	genres:string[];
	artists:ArtistData[];

	constructor(objectModel:any) {
		super(objectModel);
		this.category="album";
		console.log(objectModel)
		if ("images" in objectModel && objectModel["images"].length > 0 ){
			this.imageURL = objectModel["images"][0].url
		}else{
			this.imageURL = "not available"
		}
		this.genres = objectModel['genres'];
		this.name = objectModel['name']
		
		this.url = 'album/'+ objectModel['id']
		console.log("url: ",this.url)
		console.log( objectModel)
		this.artists = objectModel['artists'].map((artist:any) => {
			console.log("artsits: ", artist)
			return new ArtistData(artist) ;
		});
	}
}
