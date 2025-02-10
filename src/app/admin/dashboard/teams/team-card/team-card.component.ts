import { Component, Input, OnInit } from '@angular/core';
import { ITeam } from '../ITeam.interface';

@Component({
  selector: 'app-team-card',
  templateUrl: './team-card.component.html',
  styleUrls: ['./team-card.component.css']
})
export class TeamCardComponent implements OnInit {
@Input() team !: ITeam;


  constructor() { }

  ngOnInit(): void {
  }

}
