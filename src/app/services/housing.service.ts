import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import{map} from 'rxjs/operators';
import { ITeam } from '../admin/dashboard/teams/ITeam.interface';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class HousingService {

  constructor(private http:HttpClient) {}
getAllTeamMember() : Observable<ITeam[]>{
  return this.http.get<{ [key: string]: ITeam }>('data/Team.json').pipe
  (map(data=> {
      const TeamArray: Array< ITeam> = [];
      for(const id in  data ) {
        if (data.hasOwnProperty(id)){
          TeamArray.push(data[id]);
        }
      }
      return TeamArray;
  })
);
}

}
