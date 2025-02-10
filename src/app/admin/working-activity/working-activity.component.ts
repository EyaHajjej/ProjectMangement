import { Component, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';


@Component({
  selector: 'app-working-activity',
  templateUrl: './working-activity.component.html',
  styleUrls: ['./working-activity.component.css']
})
export class WorkingActivityComponent implements OnInit {
  chart = new Chart({
    chart:{
      type:'line',
      height:325
    },
    title: {
      text:'Working Activity'
    },
    xAxis:{
       categories: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
       ]
    },
    yAxis:{
    title:{
      text:'Revenue in £'
    }
    },
    series:[{
      name: "Arizona",
      type: "line" ,
       data:[ 70, 69, 145, 182, 215, 252, 233, 183, 139, ]},
       {
        name: "Connecticut",
        type: "line" ,
         data:[ 40, 52, 35, 58, 32, 53, 71, 82, 99, ]},
         {
          name: "Ohio",
          type: "line" ,
           data:[ 17, 22, 14, 18, 19, 22, 43, 11, 32, 29,59]}




    ],
    credits:{
      enabled: false
    }
  })


  constructor() { }

  ngOnInit(): void {
  }

}
