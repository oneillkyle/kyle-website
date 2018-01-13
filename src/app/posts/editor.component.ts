import {
  Component,
  OnDestroy,
  AfterViewInit,
  EventEmitter,
  Input,
  Output,
  OnInit
} from '@angular/core';
declare var tinymce: any;

@Component({
  selector: 'editor',
  template: `<textarea id="{{elementId}}">{{content}}</textarea>`
})
export class EditorComponent implements AfterViewInit, OnDestroy, OnInit {
  @Input() elementId: string;
  @Input()
  get content() {
    return this.editorContent;
  };
  set content(val) {
    this.editorContent = val;
    this.contentChange.emit(this.editorContent);
  }
  @Output() contentChange = new EventEmitter<any>();

  editor;
  editorContent: string;

  ngAfterViewInit() {
    tinymce.init({
      selector: '#' + this.elementId,
      plugins: ['link', 'paste', 'table', 'image', 'spellchecker'],
      // toolbar: ['image', 'spellchecker'],
      // menubar: 'tools',
      skin_url: '/assets/skins/lightgray',
      height: '500',
      setup: editor => {
        this.editor = editor;
        editor.on('keyup', () => {
          this.content = editor.getContent();
          // this.onEditorKeyup.emit(this.content);
        });
      },
    });
  }

  ngOnInit() {
    // this.editor.setContent(this.content);
  }

  ngOnDestroy() {
    tinymce.remove(this.editor);
  }
}
