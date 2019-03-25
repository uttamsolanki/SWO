import {Component, OnInit, ViewChild} from '@angular/core';
import {ModalDirective} from 'ngx-bootstrap';

@Component({
  selector: 'app-reference',
  templateUrl: './reference.component.html',
  styleUrls: ['./reference.component.scss']
})
export class ReferenceComponent implements OnInit {

  constructor() { }
  @ViewChild('infoModal') public modal: ModalDirective;
  ngOnInit() {
  }

  viewRef(id){
  }

  editRef(id) {
    this.modal.show();
  }
  deleteRef(id) {
    this.modal.hide();
  }

}
