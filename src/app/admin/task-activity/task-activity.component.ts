import { Component, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';
import {StatsService} from "../../services/stats.service";

@Component({
  selector: 'app-task-activity',
  templateUrl: './task-activity.component.html',
  styleUrls: ['./task-activity.component.css']
})
export class TaskActivityComponent implements OnInit {
  chart: any;
  tasksList: any;

  constructor(private statService: StatsService) { }

  ngOnInit(): void {
    this.statService.getTasksStats().subscribe({
      next: (value: any) => {
        this.tasksList = value;
        console.log(this.tasksList);
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
        type: 'bar',
        height: 310,
        width: 610
      },
      title: {
        text: 'Task Activity',
      },
      xAxis: {
        categories: [
          'TO DO',
          'IN PROGRESS',
          'DONE',
          'TO CONFIRM',
          'FINISHED'
        ]
      },
      yAxis: {
        title: {
          text: ''
        }
      },
      series: [
        {
          type: 'bar',
          name:'total',
          showInLegend: false,
          data: [
            {
              name: 'TO DO',
              y: this.tasksList['ToDo'],
              color: '#fcb69f',
            },
            {
              name: 'IN PROGRESS',
              y: this.tasksList['InProgress'],
              color: '#a8deb4',
            },
            {
              name: 'DONE',
              y: this.tasksList['Finished'], // Update key to match JSON
              color: '#98ff98',
            },
            {
              name: 'TO CONFIRM OR BUG',
              y: this.tasksList['ToConfirmOrBug'],
              color: '#ffd700', // Example color
            },
            {
              name: 'FINISHED',
              y: this.tasksList['Finished'],
              color: '#8a2be2', // Example color
            },
          ]
        }
      ],
      credits: {
        enabled: false
      }
    });
  }
}
