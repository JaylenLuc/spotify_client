import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArtistPageComponent } from './pages/artist-page/artist-page.component';
import { TrackPageComponent } from './pages/track-page/track-page.component';
import { AlbumPageComponent } from './pages/album-page/album-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { YourTopTracksComponent } from './pages/your-top-tracks/your-top-tracks.component';

export const routes: Routes = [
	{ path: 'yourtoptracks/:id', component: YourTopTracksComponent},
	{ path: 'artist/:id', component: ArtistPageComponent},
	{ path: 'track/:id', component: TrackPageComponent},
	{ path: 'album/:id', component: AlbumPageComponent},
	{ path: '', component: HomePageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
