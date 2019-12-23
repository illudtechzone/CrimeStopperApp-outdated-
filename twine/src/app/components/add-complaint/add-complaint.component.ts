import { ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-complaint',
  templateUrl: './add-complaint.component.html',
  styleUrls: ['./add-complaint.component.scss'],
})
export class AddComplaintComponent implements OnInit {

  constructor(private modalController: ModalController) { }

  ngOnInit() {}

  dismiss() {

    this.modalController.dismiss();


  }



}
