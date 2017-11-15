import MSC51 from './MSC51';
/**
 * 1- 装载指令 
 * 2- 复位CPU
 * 3- 单步调试
 * 4- 
 */
const MCU: MSC51 = new MSC51();

MCU.loadInstructs('MOV R1,#1H');
MCU.run();