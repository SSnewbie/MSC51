export default class Instructs {
	public lable: string;//跳转标签
	public ac: string;	//操作符
	public destination: string;//目的操作数
	public source: string;//源操作数
	public rel: string;//相对地址
	public annotation: string;//注释
	public id:number; //
	private static count: number = 0;
	constructor(code: string) {
		let res = getArray(code.split(' ').map(i => i.split(',')));
		let i = 0;
		if (/\:$/.test(res[i])) {
			this.lable = res[i];
			i++;
		}
		this.ac = res[i++];
		this.destination = res[i++];
		this.source = res[i++];
		if (!/^;/.test(res[i])) {
			this.rel = res[i++]
		}
		if (/^;/.test(res[i])) {
			this.annotation = res[i++]
		}
		this.id = Instructs.count++;
	}
}

function getArray(array) {
	let ret = [];
	(function get(array) {
		array.forEach(i => {
			if (i instanceof Array) {
				get(i);
			} else if (i !== '') {
				ret.push(i);
			}
		})
	})(array)
	return ret;
}