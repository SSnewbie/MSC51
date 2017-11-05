import RAM from './RAM';
import ROM from './ROM';

class MAC51 {
	private ram: RAM;
	private rom: ROM;
	constructor(ram: RAM, rom: ROM) {
		this.ram = ram;
		this.rom = rom;
	}

	private static compile(code: string): void {
		let codes = code.split('\n');
		
	}

	public run(code: string): void {
		//todo 1: 将程序写入ROM 


		//todo 2: 
	}


}