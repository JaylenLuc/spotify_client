import { CommonModule } from '@angular/common';
import { Component, Injectable, OnInit, ViewChild } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';
import { ProfileData } from '../../data/profile-data';
import { Router } from '@angular/router';
@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
@Injectable()
export class AboutComponent implements OnInit {
  name:string | undefined;
  profile_pic:string = "../../../assets/unknown.jpg";
  profile_link:string | undefined;
  s_service : SpotifyService 
  router : Router
  profile_object : ProfileData | undefined

  //TODO: inject the Spotify service
  constructor(public service : SpotifyService, r : Router ) { 
    this.s_service = service
    this.router = r
  }

  ngOnInit() {
  }

  async getUserData(){
      /*TODO: create a function which gets the "about me" information from Spotify when the button in the view is clicked.
      In that function, update the name, profile_pic, and profile_link fields */

    this.profile_object = await this.s_service.aboutMe().then((resp : ProfileData) =>{
      console.log(resp.name)
      return resp
    }, (err) => {
      console.log(err)
      return new ProfileData("")
    })

    let name_elem = document.querySelector("h3");
    let pic_elem = document.querySelector("img");
    let link_elem = document.getElementById("prof_link")
    if (name_elem != null && pic_elem != null && link_elem != null){

      this.name =this. profile_object.name
      this.profile_pic = this.profile_object.imageURL
      this.profile_link = this.profile_object.spotifyProfile

    }else{
      console.log("some or all are null")
    }


  }
  goToTopTracks(){
    let res = '/yourtoptracks/' + this?.profile_object?.id
    this.router.navigate( [res])
  }



}