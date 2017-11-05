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
			this.input.focus();
			this.updataCuoserLocation();
		})

		this.input.addEventListener('input', e => {
			this.selectionLine += this.codeContent.insert(this.selectionRow, this.selectionLine, this.input.value);
			this.input.value = '';
			this.updataCuoserLocation();
		})

		this.input.addEventListener('keydown', e => {
			if (e.code === 'Enter') {
				this.codeContent.linefeed(this.selectionRow, this.selectionLine);
				this.selectionRow += 1;
				this.selectionLine = 0;
			} else if (e.code === 'Backspace') {
				this.codeContent.delete(this.selectionRow, this.selectionLine);
				if (this.selectionLine <= 0) {
					if (this.selectionRow > 0) {
						this.selectionRow -= 1;
						this.selectionLine = this.codeContent.getContent[this.selectionRow].text.length;
					}
				} else {
					this.selectionLine -= 1;
				}
			} else if (e.code === 'ArrowUp') {
				if (this.selectionRow > 0) {
					this.selectionRow -= 1;
				}
			} else if (e.code === 'ArrowDown') {
				this.selectionRow += 1;
			} else if (e.code === 'ArrowLeft') {
				if (this.selectionLine <= 0) {
					if (this.selectionRow > 0) {
						this.selectionRow -= 1;
						this.selectionLine = this.codeContent.getContent[this.selectionRow].text.length;
					}
				} else {
					this.selectionLine -= 1;
				}

			} else if (e.code === 'ArrowRight') {
				if (this.selectionLine >= this.codeContent.getContent[this.selectionRow].text.length && this.selectionRow <= this.codeContent.getContent.length) {
					this.selectionRow += 1;
					this.selectionLine = 0;
				} else {
					this.selectionLine += 1;
				}
			}
			this.updataCuoserLocation();
		})

		this.codeContent.loadCode(this.element)
	}


	private setCuoserLocation(e) {
		const x = e.layerX;
		const y = e.layerY;

		this.selectionRow = Math.floor(y / config.fontSize);
		if (this.codeContent.getContent.length - 2 < this.selectionRow) {
			this.selectionRow = this.codeContent.getContent.length - 2;
		}
		let viewlineLength = this.codeContent.getContent[this.selectionRow].text.length;
		this.selectionLine = Math.floor(x / 9) > viewlineLength ? viewlineLength : Math.floor(x / 9);
	}

	private updataCuoserLocation() {
		this.input.setAttribute('style', `top:${this.selectionRow * 30}px;left:${this.selectionLine * 9}px;`);
	}
}