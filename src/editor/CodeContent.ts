export default class CodeContent {
	private content: Array<ViewLine>;
	private editorContainer: HTMLElement;
	private viewLines: HTMLCollection;

	/** 初始化 */
	constructor(editorContainer: HTMLElement) {
		this.editorContainer = editorContainer;
		this.content = new Array<ViewLine>();
		this.updataViewLines();
	}



	get getContent() {
		return this.content;
	}

	/** 将HTML解析为 content */
	loadCode(html: HTMLElement) {
		html.innerText.split('\n').forEach(item => this.content.push(new ViewLine(item)));
	}

	/** 在指定行列插入 */
	insert(row: number, line: number, code: string): number {
		if (!this.content[row]) {
			this.content[row] = new ViewLine(' ');
		} else {
			this.content[row].insert(line, code);
			this.updataHtml();
			return code.length;
		}
	}
	/** 在指定行列删除，若改行=0,就返回到上行的尾部 */
	delete(row: number, line: number) {
		if (this.content[row].delete(line)) {
			this.content.splice(row, 1);
			return true;
		}
		this.updataHtml();
	}

	linefeed(row: number, line: number) {
		if (!this.content[row]) {
			this.content[row] = new ViewLine(' ');
			this.content.splice(row, 0, new ViewLine(' '));
		} else {
			let length = this.content[row].text.length;
			let str1 = this.content[row].text.substring(0, line);
			let str2 = this.content[row].text.substring(line, length);
			this.content[row] = new ViewLine(str1 || ' ');
			this.content.splice(row + 1, 0, new ViewLine(str2 || ' '));
		}
		this.updataHtml();
	}
	updataViewLines() {
		this.viewLines = this.editorContainer.querySelector('.scroll-element.editor-scrolltable').children as HTMLCollection;
	}

	updataHtml() {
		this.editorContainer.querySelector('.scroll-element.editor-scrolltable').innerHTML = ''
		console.table(this.content)
		let codes = this.content.forEach((item, i) => {
			let html = '';
			item.splitToHTML().forEach(item => { html += `<span>${item}</span> ` });
			let viewLine = document.createElement('div');
			viewLine.setAttribute('class', 'view-line');
			viewLine.innerHTML = html;
			this.editorContainer.querySelector('.scroll-element.editor-scrolltable').appendChild(viewLine);
		});

	}
	addHtml(row: number, code: string) {
		let html = '';
		let codes = code.split(' ').forEach(item => { html += `<span>${item}</span> ` });

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

	delete(line: number) {
		if (this._text.length <= 1) {
			this._text = ' ';
			return true;
		}
		let ret = this._text.split('');
		ret.splice(line - 1, 1)
		this._text = ret.join('');

	}

	splitToHTML() {
		let ret = [];
		let flag = false;   //判断是否接受了连续的空格
		let html = '';
		this._text.split('').forEach((item, i) => {
			if (i === 0) {
				if (item === ' ' && this._text.length === 1) {
					return ret = ['<br/>'];
				}
			}
			if (item !== ' ') {
				html += item;
				flag = false;
			} else if (flag === true) {
				html += '&nbsp;';
			} else {
				ret.push(html);
				html = '';
				flag = true;
			}
			if (i === this._text.length-1) {
				ret.push(html);
			}

		})
		return ret;
	}
}
