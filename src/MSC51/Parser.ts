import Instructs from "./Instructs";
import ACTable from './actionCodeTable';
export default function Parser(instructs: Instructs) {
	try {
		if (!instructs.ac) {
			return
		}
		console.log('PC->', this.psw.P,'		d->', instructs.destination, '		s->', instructs.source)
		ACTable[instructs.ac.toUpperCase()].call(this, (instructs.destination, instructs.source, instructs.rel));
	} catch (e) {
		console.error(e);
	}
}