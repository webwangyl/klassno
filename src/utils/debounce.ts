export default function (fn: Function, delay: number = 300) {
	let timer: number;
	return function () {
		if (timer) clearTimeout(timer);
		timer = window.setTimeout(() => {
            fn.apply(this, arguments)
        }, delay)
	}
}
