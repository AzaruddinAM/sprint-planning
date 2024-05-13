import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Story } from '../models/story';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class StoryService {
  // stories: BehaviorSubject<Story> =new BehaviorSubject([]);
  private stories: BehaviorSubject<Story[]> = new BehaviorSubject<Story[]>([]);
  private sprint: BehaviorSubject<Story[]> = new BehaviorSubject<Story[]>([]);
  //story
  addStory(story: Story):string {
    const existingStory = this.stories.getValue().find(s => s.name === story.name);
    if (!existingStory) {
      const updatedStories = [...this.stories.getValue(), story];
      console.log(updatedStories,"updatedStories")
      this.stories.next(updatedStories);
      return 'added'
    }
    return 'Name should be unique'
  }
  getStory():Story[]
  {
    return this.stories.getValue()
  }
  clearStories():string {
    if(!this.stories.getValue().length){
      return 'Nothing to clear'
    }
    this.stories.next([])
    return 'Cleared'
  }
  //sprint
  addsprint(sprint: Story):string {
    console.log(sprint);
    
    const existingStory = this.stories.getValue()

    if (existingStory && existingStory.length) {
      console.log(this.sprint.getValue(),"this.sprint.getValue()");
      
      if(this.sprint.getValue().length>0)
        {
          return 'Please clear current sprint';
        }
      let sprints :Story[]= []//this.stories.getValue().find(s => s.points === sprint.points);
      const sortedStories = this.stories.getValue().slice().sort((a,b)=>a.points-b.points)
      console.log(sortedStories);
      let selectedStorySum=0
      for (let i of sortedStories)
        {
          if (Number(i.points)<=Number(sprint.points) && selectedStorySum<Number(sprint.points)) {
            selectedStorySum+=Number(i.points)
            sprints.push(i)
          }
          else if (Number(i.points)===Number(sprint.points)) {
            sprints=[]
            sprints.push(i)
          }
        }
        if(sprints.length)
          {
            this.sprint.next(sprints);
            return sprints?'added':'There is no task for current Sprint capacity .Please increase target points'
          }
          else{
            return 'Target sprint points should less than sum of existing story points'
          }
      }
    else
    {
      return 'There is no task available in stories';
    }
  }
  getsprint():Story[]
  {
    return this.sprint.getValue()
  }
  clearSprint():string {
    if(!this.sprint.getValue().length){
      return 'Nothing to clear'
    }
    this.sprint.next([])
    return 'Cleared'
  }
  //edit or delete
  deleteCard(name:string,target:string):Story[]
  {
    if(target ==='story')
      {
        let index =this.stories.getValue().findIndex(item=>item.name ===name)
        if(index !==-1)
          {
            this.stories.getValue().splice(index,1)
          }
          return this.stories.getValue()
      }
      else if(target ==='sprint')
        {
          let index =this.sprint.getValue().findIndex(item=>item.name ===name)
          if(index !==-1)
            {
              this.stories.getValue().splice(index,1)
            }
            return this.stories.getValue()
        }
        return this.stories.getValue()
  }
  //validations
  nonNegativeOrZero(): ValidatorFn {
    return (control: AbstractControl): Promise<ValidationErrors | null> => {
      return new Promise((resolve) => {
        const value = control.value;
        if (value < 0 || value === 0) {
          resolve({ 'nonNegativeOrZero': true });
        } else {
          resolve(null);
        }
      });
    };
  }
}
