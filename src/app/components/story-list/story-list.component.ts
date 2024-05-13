import { Component, Input } from '@angular/core';
import { SharedModule } from '../../shared/shared/shared.module';
import { StoryService } from '../../services/story.service';
import { Story } from '../../models/story';
import { CardsComponent } from '../cards/cards.component';
import { Router } from '@angular/router';

@Component({
    selector: 'app-story-list',
    standalone: true,
    templateUrl: './story-list.component.html',
    styleUrl: './story-list.component.scss',
    imports: [SharedModule, CardsComponent]
})
export class StoryListComponent {
  // stories: any[]=[{name:'Story1',points:1}];
  stories: Story[]=[];
  constructor(private storyServ:StoryService,private router:Router){

  }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.stories=this.storyServ.getStory()
    
  }
  addNew()
  {
    this.router.navigate(['/story'])
  }
  
}
