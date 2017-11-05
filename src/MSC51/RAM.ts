import { State } from './base';

/**
 * 数据存储器 RAM
 * (随机存储器)
 */
export default class RAM {
	private static WRA_SIZE = 0x1F;		//工作寄存器区 （work register area）
	private static BRA_SIZE = 0x2F;		//为寄存器区（Bit register area）
	private static UMA_SIZE = 0x3F;		//用户存储器区（User memory area）
	states: Array<State>

	constructor() {

	}

	initRAM() {

	}
}