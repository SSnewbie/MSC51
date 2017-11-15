/** 寄存器 */
export interface RegisterInterface {};

/** 工作寄存器 */
export interface WorkRegisterInterface extends RegisterInterface { name: string; };

/** 可寻位地址 */
export interface AddressableRegisterInterface extends RegisterInterface { };

/** 通用RAM */
export interface GeneralRegisterInterface extends RegisterInterface { };

/** 特殊功能寄存器 */
export interface SpecialFunctionRegisterInterface extends RegisterInterface { name: string; };