import { Component, OnInit } from '@angular/core';
import {StatsService} from "../../services/stats.service";
import {Chart} from "angular-highcharts";

@Component({
  selector: 'app-column-chart',
  templateUrl: './column-chart.component.html',
  styleUrls: ['./column-chart.component.css']
})
export class ColumnChartComponent implements OnInit {
  chart: any;
  tasksList: any;

  constructor(private statService: StatsService) { }

  ngOnInit(): void {
    this.statService.getProjectStats().subscribe({
      next: (value: any) => {
        this.tasksList = value;
        //console.log(this.tasksList);
        this.renderChart();
      },
      error: (err: any) => {
        console.error(err);
      }
    });
  }

  renderChart() {
    const categories = this.tasksList.map((task: any) => task.projectName);
    const data = this.tasksList.map((task: any) => ({
      name: task.projectName,
      y: task.durationInDays
    }));

    this.chart = new Chart({
      chart: {
        type: 'column',
        height: 510,
        width: 910
      },
      title: {
        text: 'Project Duration'
      },
      xAxis: {
        categories: categories,
        title: {
          text: 'Projects'
        }
      },
      yAxis: {
        title: {
          text: 'Duration in Days'
        }
      },
      series: [
        {
          type: 'column',
          name: 'Duration days',
          showInLegend: false,
          data: data,
          color: '#a8deb4' // Example color
        }
      ],
      credits: {
        enabled: false
      }
    });
  }
}
