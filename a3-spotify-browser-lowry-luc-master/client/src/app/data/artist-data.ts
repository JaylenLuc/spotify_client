import { ResourceData } from './resource-data';

export class ArtistData extends ResourceData {
	genres:string[];

	constructor(objectModel:any) {
		super(objectModel);
		this.category = 'artist';
		this.name = objectModel['name']
		this.genres = objectModel['genres'];
		console.log("genres: ",this.genres)
		this.url ='artist/'+ objectModel['id']
		console.log("url: ",this.url)

		this.imageURL = 'images' in objectModel && objectModel['images'].length > 0 ? objectModel['images'][0]['url'] : "none"
		console.log(this.imageURL)

	}
}
