import { ByteUnit } from "./ByteUnit";
import { RegisterInterface, WorkRegisterInterface, GeneralRegisterInterface, AddressableRegisterInterface } from "./interface";

export class Register extends ByteUnit implements RegisterInterface {
	name: string;
	constructor(address: number, data: number, name: string) {
		super(address, data);
		this.name = name;
	}
}

export class WorkRegister extends ByteUnit implements WorkRegisterInterface {
	name: string;
	constructor(address: number, data: number, name: string) {
		super(address, data);
		this.name = name;
	}
}

export class AddressableRegister extends ByteUnit implements AddressableRegisterInterface {
	name: string;
	constructor(address: number, data: number, name: string) {
		super(address, data);
		this.name = name;
	}
}

export class GeneralRegister extends ByteUnit implements GeneralRegisterInterface {
	name: string;
	constructor(address: number, data: number, name: string) {
		super(address, data);
		this.name = name;
	}
}


export class SpecialFunctionRegister extends Register implements RegisterInterface {
	constructor(address: number, data: number, name: string) {
		super(address, data, name);
	}
}

export class A extends SpecialFunctionRegister {
	constructor(address: number, data: number, name: string) {
		super(address, data, name);
	}
}

export class PSW extends SpecialFunctionRegister {
	constructor(address: number, data: number, name: string) {
		super(address, data, name);
	}

	get P() {
		return this.getBit(0)
	}
	get OV() {
		return this.getBit(2)
	}
	get RS0() {
		return this.getBit(3)
	}
	get RS1() {
		return this.getBit(4)
	}
	get F0() {
		return this.getBit(5)
	}
	get AC() {
		return this.getBit(6)
	}
	get CY() {
		return this.getBit(7)
	}

	set P(value) {
		this.setBit(0, value > 0 ? 1 : 0)
	}
	set OV(value) {
		this.setBit(2, value > 0 ? 1 : 0)
	}
	set RS0(value) {
		this.setBit(3, value > 0 ? 1 : 0)
	}
	set RS1(value) {
		this.setBit(4, value > 0 ? 1 : 0)
	}
	set F0(value) {
		this.setBit(5, value > 0 ? 1 : 0)
	}
	set AC(value) {
		this.setBit(6, value > 0 ? 1 : 0)
	}
	set CY(value) {
		this.setBit(7, value > 0 ? 1 : 0)
	}
}
