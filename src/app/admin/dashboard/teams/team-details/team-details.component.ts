import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-team-details',
  templateUrl: './team-details.component.html',
  styleUrls: ['./team-details.component.css']
})
export class TeamDetailsComponent implements OnInit {
public teamId!: number;
  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.teamId = +this.route.snapshot.params['id'];
    this.route.params.subscribe(
      (params) =>{
        this.teamId =+params['id'];
      }
    )
  }
  onSelectNext(){
 this.teamId += 1;
this.router.navigate(['team-details', this.teamId]);


  }
}
