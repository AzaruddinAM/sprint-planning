import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SharedModule } from '../../shared/shared/shared.module';
import { Story } from '../../models/story';
import { StoryService } from '../../services/story.service';

@Component({
  selector: 'app-cards',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.scss'
})
export class CardsComponent {
  @Input() cards :Story[]=[]
  @Input() target :string='story'
  // @Output() addItem=new EventEmitter()
  constructor(private storyServ:StoryService){

  }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.cards=this.cards
  }
  // add()
  // {
  //   this.addItem.emit()
  // }
  // editCard(name:string)
  // {
  //   this.storyServ.editCard(name,this.target)
  // }
  deleteCard(name:string)
  {
    this.cards =this.storyServ.deleteCard(name,this.target)
  }
}
