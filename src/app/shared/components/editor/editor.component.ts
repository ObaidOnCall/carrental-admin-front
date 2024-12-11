import { Component, OnDestroy, OnInit } from '@angular/core';
import { Editor , NgxEditorModule, schema} from 'ngx-editor';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';



@Component({
  selector: 'app-editor',
  standalone: true,
  imports: [
    NgxEditorModule ,
    CommonModule ,
    ReactiveFormsModule
  ],
  templateUrl: './editor.component.html',
  styleUrl: './editor.component.scss'
})
export class EditorComponent implements OnInit , OnDestroy{
  
  
  editor!: Editor;
  html = new FormControl('Hello world'); 
  
  
  ngOnDestroy(): void {
    this.editor = new Editor({
      content: '',
      history: true,
      keyboardShortcuts: true,
      inputRules: true,
      plugins: [], //https://prosemirror.net/docs/guide/#state
      schema, //https://prosemirror.net/examples/schema/
      nodeViews: {}, //https://prosemirror.net/docs/guide/#state,
      attributes: {}, // https://prosemirror.net/docs/ref/#view.EditorProps.attributes
      linkValidationPattern: '',
      parseOptions: {}, // https://prosemirror.net/docs/ref/#model.ParseOptions
    });
  }
  ngOnInit(): void {
    this.editor.destroy();  
  }
}
