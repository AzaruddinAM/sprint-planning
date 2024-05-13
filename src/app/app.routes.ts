import { Routes } from '@angular/router';
import { StoryFormComponent } from './components/story-form/story-form.component';
import { StoryListComponent } from './components/story-list/story-list.component';
import { SprintFormComponent } from './components/sprint-form/sprint-form.component';
import { SprintDisplayComponent } from './components/sprint-display/sprint-display.component';

export const routes: Routes = [
  {path:'', redirectTo:'stories',pathMatch:'full'},
  {path:'stories', component:StoryListComponent},
  {path:'sprints', component:SprintDisplayComponent},
  {path:'story', component:StoryFormComponent},
  {path:'sprint', component:SprintFormComponent},


];
