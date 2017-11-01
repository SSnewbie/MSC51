import Editor from './editor/editor';
import CodeContent from './editor/CodeContent';
const editorContainer: HTMLElement  = document.querySelector('.editor-container') as HTMLElement;
const input : HTMLInputElement  = document.querySelector('.inputarea') as HTMLInputElement;
const editor = new Editor(editorContainer,input,new CodeContent(editorContainer));