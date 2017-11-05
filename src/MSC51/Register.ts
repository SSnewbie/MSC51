import { Register, State, States } from './base';

export class ACC implements Register {
	name: string;
	States: Array<State>;
	constructor() {

	}
}

/**
 * 程序状态寄存器
 */
export class PSW implements Register {
	name: string;
	States: Array<State>;
	constructor() {
		this.States.push(new State('CY', 0xD7, 0x0));
		this.States.push(new State('AC', 0xD6, 0x0));
		this.States.push(new State('F0', 0xD5, 0x0));
		this.States.push(new State('RS1', 0xD4, 0x0));
		this.States.push(new State('RS0', 0xD3, 0x0));
		this.States.push(new State('OV', 0xD2, 0x0));
		this.States.push(new State(' ', 0xD1, 0x0));
		this.States.push(new State('P', 0xD0, 0x0));
	}
}

/**
 * 数据指针寄存器
 */
export class DPTR implements Register {
	name: string;
	States: Array<State>;

}

export class B implements Register {
	name: string;
	States: Array<State>;
}

