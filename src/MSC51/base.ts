/** 寄存器 */
export interface Register {
	name: string;
	States: Array<State>;
}

export class State {
	label: string;
	address: number;
	value: number;
	constructor(label: string, address: number, value: number) {
		this.label = label;
		this.address = address;
		this.value = value;
	}
}