import { Component , Input, inject} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MatButtonModule } from '@angular/material/button';
import { MtxDialog } from '@ng-matero/extensions/dialog';



@Component({
  selector: 'app-table-toolbar',
  standalone: true,
  imports: [
    MatCardModule ,
    TranslateModule
  ],
  templateUrl: './table-toolbar.component.html',
  styleUrl: './table-toolbar.component.scss'
})
export class TableToolbarComponent {

  @Input() handleDelete! : ()=> void ;
  @Input() handleAdd! : ()=> void ;
  @Input() handleSearch! : (query : string)=> void ;

  private readonly mtxDialog :MtxDialog = inject(MtxDialog);
  private readonly translate = inject(TranslateService);


  onSearch(event: Event) : void{
    const input = event.target as HTMLInputElement;
    this.handleSearch(input.value);
  }



  open() {
    this.mtxDialog.open({
      title: this.translate.stream('confirm_delete'),
      description: this.translate.stream('delete_selected_warning_message'),
      showCloseIcon: true,
      buttons: [
        {
          text: this.translate.stream('close'),
          onClick: () => {
            // this.mtxDialog.alert(`You click Close button.`);
          },
        },
        {
          color: 'warn',
          text: this.translate.stream('ok'),
          focusInitial: true,
          onClick: () => {
            // this.mtxDialog.alert(`You click Ok button.`);
            this.handleDelete() ;
          },
        },
      ],
    });
  }

}
