export default function (fn: Function) {
	let raf: number;
	return function () {
		if (raf) return;
		raf = requestAnimationFrame(() => {
            fn.apply(this, arguments)
            raf = null
        })
	}
}