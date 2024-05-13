import { Component, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SharedModule } from '../../shared/shared/shared.module';
import { StoryService } from '../../services/story.service';

@Component({
  selector: 'app-sprint-form',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './sprint-form.component.html',
  styleUrl: './sprint-form.component.scss'
})
export class SprintFormComponent {
  sprintForm: FormGroup;

  constructor(private fb: FormBuilder,private storyServ:StoryService) {
    this.sprintForm = this.fb.group({
      points: ['', Validators.required,this.storyServ.nonNegativeOrZero()]
    });
  }

  autoSelectStories() {
    if (this.sprintForm.valid) {
      // Handle submission
      let msg:string =this.storyServ.addsprint(this.sprintForm.value)
      this.sprintForm.reset();
      alert(msg)
    }
  }
  clearStories(event:MouseEvent)
  {
    let msg:string =this.storyServ.clearStories()
    alert(msg)
  }
  clearSelectedStories(event:MouseEvent)
  {
    let msg:string =this.storyServ.clearSprint()
    alert(msg)
  }
}
