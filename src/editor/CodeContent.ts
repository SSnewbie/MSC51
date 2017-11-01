export default class CodeContent {
	private content: Array<ViewLine>;
	private editorContainer: HTMLElement;
	private viewLines: Array<HTMLElement>;
	constructor(editorContainer: HTMLElement) {
		this.editorContainer = editorContainer;
		this.content = new Array<ViewLine>();
		this.updata()
	}

	get getContent() {
		return this.content as Array;
	}

	loadCode(html: HTMLElement) {
		html.innerText.split('\n').forEach(item => this.content.push(new ViewLine(item)));
	}

	insert(row: number, line: number, code: string):number {
		if (!this.content[row]) {
			this.content[row] = new ViewLine('');
		} else {
			this.content[row].insert(line, code);
			this.commit(row);
			return code.length;
		}
	}

	updata() {
		this.viewLines = this.editorContainer.querySelector('.scroll-element.editor-scrolltable').children;
	}

	commit(row: number) {
		let html = '';
		let codes = this.content[row].text.split(' ').forEach(item => { html += `<span>${item}</span> ` });
		this.viewLines[row].innerHTML = html;
		this.updata();
	}
}


class ViewLine {
	private _text: string;
	constructor(text: string) { this._text = text; }
	public get text() {
		return this._text;
	}
	insert(line: number, s: string) {
		if (this._text.length === 0) {
			this._text = s;
		}
		let ret = this._text.split('');
		ret.splice(line, 0, s)
		this._text = ret.join('');
	}
}