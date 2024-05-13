import { Component, Input } from '@angular/core';
import { SharedModule } from '../../shared/shared/shared.module';
import { Story } from '../../models/story';
import { StoryService } from '../../services/story.service';
import { CardsComponent } from "../cards/cards.component";
import { Router } from '@angular/router';

@Component({
    selector: 'app-sprint-display',
    standalone: true,
    templateUrl: './sprint-display.component.html',
    styleUrl: './sprint-display.component.scss',
    imports: [SharedModule, CardsComponent]
})
export class SprintDisplayComponent {
  sprint: Story[]=[];
  constructor(private storyServ:StoryService,private router:Router)
  {

  }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.sprint = this.storyServ.getsprint()
  }
  addNew()
  {
    this.router.navigate(['/sprint'])
  }
}
