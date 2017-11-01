export default class CodeContent {
	private content: Array<ViewLine>;
	private editorContainer: HTMLElement;
	private viewLines: HTMLCollection;
	constructor(editorContainer: HTMLElement) {
		this.editorContainer = editorContainer;
		this.content = new Array<ViewLine>();
		this.updata()
	}

	get getContent() {
		return this.content;
	}

	loadCode(html: HTMLElement) {
		html.innerText.split('\n').forEach(item => this.content.push(new ViewLine(item)));
	}

	insert(row: number, line: number, code: string): number {
		if (!this.content[row]) {
			this.content[row] = new ViewLine('');
		} else {
			this.content[row].insert(line, code);
			this.updataHtml(row);
			return code.length;
		}
	}

	linefeed(row: number, line: number) {
		if (!this.content[row]) {
			this.content[row] = new ViewLine('');
			this.content.splice(row, 0, new ViewLine(''));
		} else {
			let length = this.content[row].text.length;
			let str1 = this.content[row].text.substring(0, line);
			let str2 = this.content[row].text.substring(line, length);
			this.content[row] = new ViewLine(str1);
			this.content.splice(row, 0, new ViewLine(str2));
			this.updataHtml(row);
			this.addHtml(row, str1);
		}
	}
	updata() {
		this.viewLines = this.editorContainer.querySelector('.scroll-element.editor-scrolltable').children as HTMLCollection;
	}

	updataHtml(row: number) {
		let html = '';
		let codes = this.content[row].text.split(' ').forEach(item => { html += `<span>${item}</span> ` });
		this.viewLines[row].innerHTML = html;
		this.updata();
	}
	addHtml(row: number, code: string) {
		let html = '';
		let codes = code.split(' ').forEach(item => { html += `<span>${item}</span> ` });
		this.viewLines.
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