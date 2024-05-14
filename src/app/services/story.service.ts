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
    if(this.stories.getValue().length===0){
      return 'Nothing to clear'
    }
    this.stories.next([])
    return 'Cleared'
  }
  //sprint
  addsprint(sprint: Story):string {
    console.log(sprint);
    
    const existingStories = this.stories.getValue();

    if (!existingStories || existingStories.length === 0) {
        return 'There are no tasks available in stories.';
    }

    const existingSprint = this.sprint.getValue();

    if (existingSprint && existingSprint.length > 0) {
        return 'Please clear the current sprint.';
    }
    // this.findCombinations(existingStories,sprint.points)
    // Example usage
var array = existingStories
const target = sprint.points
const combinations :any= this.combinationSum(array, target);

console.log(combinations);
let selectedStories = []
if(combinations.length===0)
  {
	let sortedStories = array.slice().sort((a,b) => b.points-a.points);
    //this.findCombinations(existingStories.filter(ite=>ite.points),sprint.points)
    let selectedStorySum = 0;

    for (let story of sortedStories) {
        if (selectedStorySum + story.points <= target) {
            selectedStorySum += story.points
            selectedStories.push(story);
        }
    }
    console.log(combinations);
}
else{
  selectedStories=combinations[0]
}
    if (selectedStories.length > 0) {
        this.sprint.next(selectedStories);
        return 'Stories added to sprint.';
    } else {
        return 'Target sprint points should be less than or equal to the sum of existing story points.';
    }
  }
  getsprint():Story[]
  {
    return this.sprint.getValue()
  }
  clearSprint():string {
    if(this.sprint.getValue().length===0){
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

  findCombinations(array:any, capacity:any) {
    const result :any= [];

    function backtrack(startIndex:any, currentCombination:any, currentSum:any) {
        if (currentSum < capacity) {
            result.push([...currentCombination]);
        }

        for (let i = startIndex; i < array.length; i++) {
            currentCombination.push(array[i]);
            backtrack(i + 1, currentCombination, currentSum + array[i]);
            currentCombination.pop();
        }
    }

    backtrack(0, [], 0);
    console.log(result);
    
    return result;
}
combinationSum(array:any, target:number) {
  const result = [];
  const stack :any= [];
  let index = 0;
  let currentSum = 0;

  while (true) {
      if (currentSum === target) {
          result.push([...stack]);
          if (!stack.length) break;
          const last = stack.pop();
          currentSum -= last.points;
          index = array.indexOf(last) + 1;
      }

      let found = false;
      for (let i = index; i < array.length; i++) {
          if (currentSum + array[i].points <= target && !stack.includes(array[i])) {
              stack.push(array[i]);
              currentSum += array[i].points;
              index = i + 1;
              found = true;
              break;
          }
      }

      if (!found) {
          if (!stack.length) break;
          const last = stack.pop();
          currentSum -= last.points;
          index = array.indexOf(last) + 1;
      }
  }

  return result;
}
}
