import { ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { ComplaintDTO, MediaDTO } from 'src/app/api/models';
import { ImageSelectorComponent } from '../image-selector/image-selector.component';
import { CommandResourceService } from 'src/app/api/services/command-resource.service';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-add-complaint',
  templateUrl: './add-complaint.component.html',
  styleUrls: ['./add-complaint.component.scss'],
})
export class AddComplaintComponent implements OnInit {
  complaintDTO: ComplaintDTO = {};
  mediaDTO: MediaDTO = {};
 image: any = new Image();

  constructor(private modalController: ModalController, private commandResourceService: CommandResourceService,
              private http: HttpClient ) { }

  ngOnInit() {}

  dismiss() {

    this.modalController.dismiss();
  }
  onChange($event: any) {

    const file: File = $event.target.files[0];
    const myReader: FileReader = new FileReader();
    myReader.onloadend = (loadEvent: any) => {
      this.image.src = loadEvent.target.result;
      console.log('Image Src' + this.image.src);
      this.selectImage();
    };
    myReader.readAsDataURL(file);

  }

   async selectImage() {

       this.mediaDTO.fileBlob = this.image.src.substring(this.image.src.indexOf(',') + 1);
       this.mediaDTO.fileBlobContentType = this.image.src.slice(this.image.src.indexOf(':') + 1, this.image.src.indexOf(';'));

  }

postComplaint() {
  console.log('Post Media');


  this.commandResourceService.createMediaUsingPOST(this.mediaDTO).subscribe(x => {
    console.log('x' + x);
  });


}
}
