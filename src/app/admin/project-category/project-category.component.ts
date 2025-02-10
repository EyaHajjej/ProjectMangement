import { Component, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';
import {StatsService} from "../../services/stats.service";

@Component({
  selector: 'app-project-category',
  templateUrl: './project-category.component.html',
  styleUrls: ['./project-category.component.css']
})
export class ProjectCategoryComponent implements OnInit {

  chart: any;
  UsersStats: any;

  constructor(private statService: StatsService) { }

  ngOnInit(): void {
    this.statService.getUserStats().subscribe({
      next: (value: any) => {
        this.UsersStats = value.usersByRole;
        //console.log(this.UsersStats);
        this.renderChart();
      },
      error: (err: any) => {
        console.error(err);
      }
    });
  }

  renderChart() {
    this.chart = new Chart({
      chart: {
        type: 'pie',
        height: 300,
        width: 550
      },
      title: {
        text: 'Team Statistics'
      },
      series: [
        {
          type: 'pie',
          name: 'total',
          data: [
            {
              name: 'Designer',
              y: this.UsersStats['Designer'],
              color: '#a8deb4',
            },
            {
              name: 'Developer',
              y: this.UsersStats['Developer'],
              color: '#98ff98',
            },
            {
              name: 'Project Manager',
              y: this.UsersStats['Project Manager'],
              color: '#2c5364',
            }
          ]
        }
      ],
      credits: {
        enabled: false
      }
    });
  }

}
