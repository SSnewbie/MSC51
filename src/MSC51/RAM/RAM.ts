import { ByteUnit } from "./ByteUnit";
import { WorkRegister, AddressableRegister, GeneralRegister, SpecialFunctionRegister, PSW, Register, A } from "./Register";
import { RegisterInterface } from "./interface";
/**
 * 数据存储器 RAM
 * (随机存储器)
 */
export default class RAM {
	private static WRA_SIZE = 0x1F;		//工作寄存器区 （work register area）
	private static AAA_SIZE = 0x2F;		//可位寻址区（Bit register area）
	private static UMA_SIZE = 0x7F;		//用户存储器区（User memory area）
	private static SpecialFunctionRegister_SIZE = 0xFF;		//特殊功能寄存器区（SpecialFunctionRegister）
	private memory: Array<Register>;	//内存

	private psw: PSW;									//PSW
	constructor() {
		this.memory = new Array<Register>();
		this.initByteUnit();
		this.psw = this.memory.filter(i => i.name === 'PSW')[0] as PSW;
	}

	/**初始化内存**/
	private initByteUnit(): any {
		for (let i = 0; i < 0x7F; i++) {
			if (i < RAM.WRA_SIZE) {
				this.memory.push(new WorkRegister(i, 0, 'R' + i % 8));
			} else if (i > RAM.WRA_SIZE && i < RAM.AAA_SIZE) {
				this.memory.push(new AddressableRegister(i, 0, ''));
			} else if (i > RAM.AAA_SIZE && i < RAM.UMA_SIZE) {
				this.memory.push(new GeneralRegister(i, 0, ''));
			}
		}
		this.memory.push(new PSW(0xD0, 0, 'PSW')); //程序状态字
		this.memory.push(new A(0xE0, 0, 'A')); //A累加器
		this.memory.push(new SpecialFunctionRegister(0x80, 0, 'P0')); //p0端口
		this.memory.push(new SpecialFunctionRegister(0x81, 0, 'SP')); //堆栈指针
		this.memory.push(new SpecialFunctionRegister(0x82, 0, 'DPL')); //数据指针L
		this.memory.push(new SpecialFunctionRegister(0x83, 0, 'DPH')); //数据指针H
		this.memory.push(new SpecialFunctionRegister(0x87, 0, 'PCON')); //电源控制
		this.memory.push(new SpecialFunctionRegister(0x88, 0, 'TCON')); //定时器控制
		this.memory.push(new SpecialFunctionRegister(0x89, 0, 'TMOD')); //定时器模式
		this.memory.push(new SpecialFunctionRegister(0x8A, 0, 'TL0')); //T0低字节
		this.memory.push(new SpecialFunctionRegister(0x8B, 0, 'TL1')); //T1低字节
		this.memory.push(new SpecialFunctionRegister(0x8C, 0, 'TH0')); //T0高字节
		this.memory.push(new SpecialFunctionRegister(0x8D, 0, 'TH1')); //T1高字节
		this.memory.push(new SpecialFunctionRegister(0x90, 0, 'P1')); //p1端口
		this.memory.push(new SpecialFunctionRegister(0x91, 0, 'SCON')); //
		this.memory.push(new SpecialFunctionRegister(0xF0, 0, 'B')); //B寄存器
	}

	registerAddressing(name: string) {
		let psw = this.memory.filter(i => i.name === 'PSW')[0] as PSW;
		let reg = this.memory.filter(i => (i as PSW).name === name)[psw.RS0 + psw.RS1 * 2];
		return reg;
	}

}



