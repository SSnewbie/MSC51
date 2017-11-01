const log = console.log;
import config from './config';
import CodeContent from './CodeContent';
export default class Editor {

	private selectionRow: number;
	private selectionLine: number;
	private codeContent: CodeContent;
	private element: HTMLElement;
	private input: HTMLInputElement;
	constructor(element: HTMLElement, input: HTMLInputElement, codeContent: CodeContent) {
		this.element = element;
		this.input = input;
		this.codeContent = codeContent;
		this.initEditor();
	}


	/**
	 * 初始化编辑器主体部分
	 * @param element 
	 * @param textarea 
	 */
	private initEditor() {

		this.element.addEventListener('click', (e) => {
			this.setCuoserLocation(e);
			this.input.setAttribute('style', `top:${this.selectionLine * 30}px;left:${this.selectionRow * 9}px;`);
			this.input.focus();
		})

		this.input.addEventListener('input', e => {
			this.selectionLine +=	this.codeContent.insert(this.selectionRow, this.selectionLine, this.input.value);
			this.input.value = '';
			this.updataCuoserLocation();
		})
		this.codeContent.loadCode(this.element)
	}


	private setCuoserLocation(e) {
		const x = e.layerX;
		const y = e.layerY;
		this.selectionRow = Math.floor(y / config.fontSize);
		let viewlineLength = this.codeContent.getContent[this.selectionLine].text.length;
		this.selectionLine = Math.floor(x / 9) > viewlineLength ? viewlineLength : Math.floor(x / 9);
	}

	private updataCuoserLocation() {

	}
}