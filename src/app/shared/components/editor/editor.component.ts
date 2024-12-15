import { Component, OnDestroy, OnInit, ViewEncapsulation, inject , Renderer2, ElementRef, Input} from '@angular/core';
import { Editor , NgxEditorModule, schema , Validators, Toolbar} from 'ngx-editor';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, FormControl, ReactiveFormsModule } from '@angular/forms';
import { AppSettings, SettingsService } from '@core';
import { Subscription } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';



@Component({
  selector: 'app-editor',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  imports: [
    NgxEditorModule ,
    CommonModule ,
    ReactiveFormsModule ,
    TranslateModule
  ],
  templateUrl: './editor.component.html',
  styleUrl: './editor.component.scss'
})
export class EditorComponent implements OnInit , OnDestroy{
  
  private readonly settings = inject(SettingsService);
  notifySubscription = Subscription.EMPTY;

  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  editor!: Editor;
  @Input() control!: FormControl;

  toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['code', 'blockquote'],
    ['ordered_list', 'bullet_list'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    ['link', 'image'],
    ['text_color', 'background_color'],
    // ['align_left', 'align_center', 'align_right', 'align_justify'],
  ];

  constructor(private readonly renderer: Renderer2, private readonly el: ElementRef) { }
  
  ngOnInit(): void {
    // Initialize the editor instance
    this.editor = new Editor({
      schema, // Load the schema
      history: true, // Enable undo/redo
      keyboardShortcuts: true, // Enable keyboard shortcuts
    });

    this.notifySubscription = this.settings.notify.subscribe(opts => {
      this.updateThemes(opts) ;
    });
  }

  ngOnDestroy(): void {
    // Destroy the editor instance to clean up resources
    if (this.editor) {
      this.editor.destroy();
    }

    this.notifySubscription.unsubscribe();
  }



  private updateThemes(opts : Partial<AppSettings>) {

    const editorElement = this.el.nativeElement.querySelector('.editor');
    const editorMenuBar = this.el.nativeElement.querySelector('.NgxEditor__MenuBar');
    const editor = this.el.nativeElement.querySelector('.NgxEditor');

    if (editorElement && opts.theme === 'dark') {
      this.renderer.addClass(editorElement, 'editor_dark');
    }
    else {
      this.renderer.removeClass(editorElement, 'editor_dark');
    } ;

    if (editorMenuBar && opts.theme === 'dark') {
      this.renderer.addClass(editorMenuBar, 'NgxEditor__MenuBar_Dark');
    }
    else {
      this.renderer.removeClass(editorMenuBar, 'NgxEditor__MenuBar_Dark');
    } ;

    if (editor && opts.theme === 'dark') {
      this.renderer.addClass(editor, 'NgxEditor_Dark');
    }
    else {
      this.renderer.removeClass(editor, 'NgxEditor_Dark');
    } ;
    

  }
}
