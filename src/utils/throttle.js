export default function(func, wait) {
	let context, args, timeout, result;
	let previous = 0;
	let later = function() {
		previous = new Date;
		timeout = null;
		result = func.apply(context, args);
	};
	return function() {
		let now = new Date;
		let remaining = wait - (now - previous);
		context = this;
		args = arguments;
		if (remaining <= 0) {
			clearTimeout(timeout);
			timeout = null;
			previous = now;
			result = func.apply(context, args);
		} else if (!timeout) {
			timeout = setTimeout(later, remaining);
		}
		return result;
	};
};
