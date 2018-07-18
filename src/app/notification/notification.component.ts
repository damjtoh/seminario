import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '../../../node_modules/@angular/material';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<NotificationComponent>,
    @Inject(MAT_DIALOG_DATA) public dosis: any
  ) {
    console.log("Dosis notification: ", dosis);
  }

  ngOnInit() {
  }

}
