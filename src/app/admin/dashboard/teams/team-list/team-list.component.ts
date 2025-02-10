import { Component, OnInit } from '@angular/core';
import { HousingService } from 'src/app/services/housing.service';
import { ITeam } from '../ITeam.interface';

@Component({
  selector: 'app-team-list',
  templateUrl: './team-list.component.html',
  styleUrls: ['./team-list.component.css']
})
export class TeamListComponent implements OnInit {
  Team !: Array< ITeam>;

  constructor(private houstingService: HousingService) { }

  ngOnInit(): void {

    this.houstingService.getAllTeamMember().subscribe(
      data=>{this.Team = data;
        console.log(data);}
    , error =>
      {console.log('httperror:');
        console.log(error);
      }
    );
  }}
    //this.http.get('data/Team.json').subscribe(
     // data=>{
       // this.Team = data;
       // console.log(data);
     // }
    //);


