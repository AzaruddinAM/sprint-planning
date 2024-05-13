import { Component, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SharedModule } from '../../shared/shared/shared.module';
import { StoryService } from '../../services/story.service';
@Component({
  selector: 'app-story-form',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './story-form.component.html',
  styleUrl: './story-form.component.scss'
})
export class StoryFormComponent {
  @Output() addStory = new EventEmitter<any>();
  storyForm: FormGroup;

  constructor(private fb: FormBuilder,private storyServ:StoryService) {
    this.storyForm = this.fb.group({
      name: ['', Validators.required],
      points: ['', Validators.required,this.storyServ.nonNegativeOrZero()]
    });
  }
   
  onSubmit() {
    if (this.storyForm.valid) {
      this.addStory.emit(this.storyForm.value);
      let msg =this.storyServ.addStory(this.storyForm.value)
      alert(msg)
      this.storyForm.reset();
    }
  }
}
