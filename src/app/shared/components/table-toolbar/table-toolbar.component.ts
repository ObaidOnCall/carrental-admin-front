import { Component , Input} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { TranslateModule } from '@ngx-translate/core';


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


  onSearch(event: Event) : void{
    const input = event.target as HTMLInputElement;
    this.handleSearch(input.value);
  }

}
