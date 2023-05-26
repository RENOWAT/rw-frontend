import {Component, Inject} from '@angular/core';
import {Observable} from 'rxjs';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-dialogs',
  templateUrl: './read-dialog.component.html',
  styleUrls: ['./read-dialog.component.css']
})
export class ReadDialogComponent {
  title: string;
  object: Observable<any>;

  constructor(@Inject(MAT_DIALOG_DATA) data: any) {
    this.title = data.title;
    this.object = data.object;
  }

  labels(object): string[] {
    return Object.getOwnPropertyNames(object);
  }

  convertStatus(estado: string): string {
    return estado = "1" ? 'vigente' : 'vencido';
  }

}
