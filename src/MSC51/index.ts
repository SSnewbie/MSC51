import RAM from './RAM';
import ROM from './ROM/ROM';
import Instructs from './Instructs';
import ACTable from './actionCodeTable';
import parser from './Parser';

export default class MAC51 {
	private rom: ROM;
	public ram: RAM;
	private parser: Function;
	private instructsList: Array<Instructs>;
	constructor() {
		this.ram = new RAM();
		this.rom = new ROM();
		this.instructsList = new Array<Instructs>();
	}

	public loadInstructs(code: string) {
		code.split('\n').forEach(i => this.instructsList.push(new Instructs(i)));
	}

	public run() {
		parser.call(this.ram, this.instructsList[0])
	}


}