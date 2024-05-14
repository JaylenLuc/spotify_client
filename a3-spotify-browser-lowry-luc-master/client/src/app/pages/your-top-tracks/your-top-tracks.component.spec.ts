import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YourTopTracksComponent } from './your-top-tracks.component';

describe('YourTopTracksComponent', () => {
  let component: YourTopTracksComponent;
  let fixture: ComponentFixture<YourTopTracksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [YourTopTracksComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(YourTopTracksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
