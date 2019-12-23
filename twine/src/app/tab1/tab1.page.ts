import { Router } from '@angular/router';
import { CreateComplaintPage } from './../pages/create-complaint/create-complaint.page';
import { AddComplaintComponent } from './../components/add-complaint/add-complaint.component';
import { Component } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(private modalController: ModalController,
              private nav: NavController) {}

  async addComplaint() {
    const modal = await this.modalController.create({
    component: AddComplaintComponent,
    componentProps: { value: 123 }
    });

    await modal.present();

  }
  showComment() {
    this.nav.navigateForward('/add-comment');

  }

}
