export function parseNumber(val):number {
	if (typeof val === 'number') {
		return val;
	}
	if (typeof val === 'string') {
		try {
			if (/\d+H$/.test(val)) {
				return parseInt(val, 16)
			}
			if (/\d+B$/.test(val)) {
				return parseInt(val, 2)
			}
		} catch (error) {
			console.error('PMR->',error)
		}
	}
}