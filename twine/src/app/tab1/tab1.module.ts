import { ComplanitCardComponent } from './../components/complanit-card/complanit-card.component';
import { AddComplaintComponent } from './../components/add-complaint/add-complaint.component';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';
import { SharedModule } from '../components/shared.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    SharedModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: Tab1Page }]),

  ],
  declarations: [Tab1Page],
  entryComponents: [AddComplaintComponent,ComplanitCardComponent]
})
export class Tab1PageModule {}
