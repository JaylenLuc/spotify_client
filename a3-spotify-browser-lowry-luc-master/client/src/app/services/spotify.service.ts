import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { ArtistData } from '../data/artist-data';
import { AlbumData } from '../data/album-data';
import { TrackData } from '../data/track-data';
import { ResourceData } from '../data/resource-data';
import { ProfileData } from '../data/profile-data';
import { TrackFeature } from '../data/track-feature';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
	expressBaseUrl:string = 'http://localhost:8888';

  constructor(private http:HttpClient) { }

  private sendRequestToExpress(endpoint:string):Promise<any> {
    //TODO: use the injected http Service to make a get request to the Express endpoint and return the response.
    var uri:string = this.expressBaseUrl + endpoint;
    console.log("sendRequestToExpress URI : ", uri);
    //if(items === undefined) {return}
    return firstValueFrom(this.http.get(uri)).then((response) => {
      console.log(response)      
      return response;
    }, (err) => {
      console.log(err)   
      return err;
    });
  }

  aboutMe():Promise<ProfileData> {
    //This line is sending a request to express, which returns a promise with some data. We're then parsing the data 
    return this.sendRequestToExpress('/me').then((data) => {
      return new ProfileData(data);
    });
  }

  searchFor(category:string, resource:string):Promise<ResourceData[]> {
    //TODO: identify the search endpoint in the express webserver (routes/index.js) and send the request to express.
    //Make sure you're encoding the resource with encodeURIComponent().
    //Depending on the category (artist, track, album), return an array of that type of data.
    //JavaScript's "map" function might be useful for this, but there are other ways of building the array.
    
    let encoded_resource = encodeURIComponent(resource)
    let req_string = '/search/' + category + '/' + encoded_resource
    console.log(req_string)
    return this.sendRequestToExpress(req_string).then((data) => {
      console.log("category: ",category)
      switch (category){
        case "artist":
          
          data = data['artists']['items'] 
          console.log(data)
          data = data.map((obj: any) => {
            return new ArtistData(obj)
          })
          break;

        case "album":
          data = data['albums']['items'] 
          data = data.map((obj: any) => {
            return new AlbumData(obj)
          })
          break;

        case "track":
          data = data['tracks']['items'] 
          data = data.map((obj: any) => {
            return new TrackData(obj)
          })
          break;
      }
      


      return data
    });
  }

  getArtist(artistId:string):Promise<ArtistData> {
    //TODO: use the artist endpoint to make a request to express.
    let req_string = '/artist/' + artistId
    return this.sendRequestToExpress(req_string).then((data) => {
      return new ArtistData(data);
    });
    //Again, you may need to encode the artistId.
    return null as any;
  }

  getRelatedArtists(artistId:string):Promise<ArtistData[]> {
    //TODO: use the related artist endpoint to make a request to express and return an array of artist data.
    let req_string = '/artist-related-artists/' + artistId
    return this.sendRequestToExpress(req_string).then((data) => {
      return data['artists'].map((item : any ) => {
        return new ArtistData(item)
      })
    });
   return null as any;
  }

  getTopTracksForArtist(artistId:string):Promise<TrackData[]> {
    //TODO: use the top tracks endpoint to make a request to express.
    let req_string = '/artist-top-tracks/' + artistId
    return this.sendRequestToExpress(req_string).then((data) => {
      return data['tracks'].map((item : any ) => {
        return new TrackData(item)
      })
    });
    return null as any;
  }

  getAlbumsForArtist(artistId:string):Promise<AlbumData[]> {
    //TODO: use the albums for an artist endpoint to make a request to express.
    let req_string = '/artist-albums/' + artistId
    return this.sendRequestToExpress(req_string).then((data) => {
      return data['items'].map((item : any ) => {
        return new ArtistData(item)
      })
    });
    return null as any;
  }

  getAlbum(albumId:string):Promise<AlbumData> {
    //TODO: use the album endpoint to make a request to express.
    let req_string = '/album/' + albumId
    return this.sendRequestToExpress(req_string).then((data) => {
     
      return new AlbumData(data)
      
    });
    return null as any;
  }

  getTracksForAlbum(albumId:string):Promise<TrackData[]> {
    //TODO: use the tracks for album endpoint to make a request to express.
    let req_string = '/album-tracks/' + albumId
    return this.sendRequestToExpress(req_string).then((data) => {
      console.log("api call for tracks album: ",data)
      return data['items'].map((item : any ) => {
        return new TrackData(item)
      })
    });
    return null as any;
  }

  getTrack(trackId:string):Promise<TrackData> {
    //TODO: use the track endpoint to make a request to express.
    let req_string = '/track/' + trackId
    return this.sendRequestToExpress(req_string).then((data) => {
        console.log("hereherhe: ", data)
        return new TrackData(data)

    });
    return null as any;
  }

  getAudioFeaturesForTrack(trackId:string):Promise<TrackFeature[]> {
    //TODO: use the audio features for track endpoint to make a request to express.
    let req_string = '/track-audio-features/' + trackId
    //let rr : TrackFeature[]= []
    return this.sendRequestToExpress(req_string).then((data) => {
      console.log("resp: ", data)
      //console.log("audio featuers: ",data)
      let res : TrackFeature[] = []
      Object.entries(data).forEach(([key,val]) => {

        if (TrackFeature.FeatureTypes.includes(key)){
          res.push(new TrackFeature(key,val as number))
        }
      });
      console.log("ret: ",res)
      return res


    });
    return null as any
  }

  getTopTracksForYou(spotID: string):Promise<TrackData[]>{
    let req_string = '/me/top/tracks'
    return this.sendRequestToExpress(req_string).then((data) => {
      console.log("teehee: ", data)
      return data['items'].map((item : any ) => {
        return new TrackData(item)
      })

    });

    return null as any
  }
}
