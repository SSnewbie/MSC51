import { A } from "./RAM/Register";

export default {
	/**
	 * 数据传送指令
	 * @param destination 累加器A
	 * @param source [Rn, direct, @Ri, #data]
	 */
	MOV<T, U>(destination: T, source: U) {
		console.info('==>',this)
	}

}