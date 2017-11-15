import { parseNumber } from './../../util/util';
export class ByteUnit {
	private _address: number;
	private _data: number;
	constructor(address: number, data: number) {
		this._address = address;
		this._data = data;
	}

	get address() {
		return this._address.toString(16).toUpperCase() + 'H';
	}

	get data() {
		return this._data.toString(16).toUpperCase() + 'H';
	}

	set address(val: any) {
		let address: number = parseNumber(val);
		if (address > 15) {
			this._address = address % 15;
		}
	}

	set data(val: any) {
		let data: number = parseNumber(val);
		if (data > 15) {
			this._address = data % 15;
		}
	}

	public getBit(n: number): number {
		return parseInt(this.data, 16) >> (n % 8) & 1;
	}

	public setBit(n, b) {
		if (n >= 0 && n < 8) {
			if (b === 0) {
				this._data = parseInt(this.data, 16) & ~Math.pow(2, n);
			} else {
				this._data = parseInt(this.data, 16) ^ Math.pow(2, n);
			}
		}
	}
}