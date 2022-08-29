export interface GridTransform {
	HandleMouseEnter: (
		e: MouseEvent,
		Xoffset?: number,
		Yoffset?: number
	) => void;
	HandleMouseLeave: () => void;
}

import gsap from "gsap";

export default function useGridTransform(): GridTransform {
	const horizontalY = [];
	const verticalX = []; // 存储横、竖线坐标
	let horizontal = document.getElementsByClassName("horizontal");
	let vertical = document.getElementsByClassName("vertical"); // 存储dom
	let yIndex = [];
	let xIndex = []; // 存储最近4条线
	Array.from(horizontal).forEach((el) => {
		const rect = el.getBoundingClientRect();
		horizontalY.push(rect.y);
	});
	Array.from(vertical).forEach((el) => {
		const rect = el.getBoundingClientRect();
		verticalX.push(rect.x);
	});
	const tl = gsap.timeline();
	return {
		HandleMouseEnter: (e: MouseEvent, Xoffset = 0, Yoffset = 0) => {
			const { width, height, x, y } = (
				e.target as HTMLElement
			).getBoundingClientRect();
			yIndex = [];
			xIndex = [];
			try {
				horizontalY.forEach((el, index) => {
					if (el >= y) {
						yIndex[0] = index - 1;
						yIndex[1] = index;
						throw new Error();
					}
				});
			} catch (error) {}
			try {
				verticalX.forEach((el, index) => {
					if (el >= x) {
						xIndex[0] = index - 1;
						xIndex[1] = index;
						throw new Error();
					}
				});
			} catch (error) {}
			const offsetx = x + width + Xoffset;
			const offsety = y + height + Yoffset;
			tl.to(vertical[xIndex[0]], { x: x - Xoffset, duration: 0.5 });
			tl.to(vertical[xIndex[1]], { x: offsetx, duration: 0.5 }, "<");
			tl.to(
				horizontal[yIndex[0]],
				{ y: y - Yoffset, duration: 0.5 },
				"<"
			);
			tl.to(horizontal[yIndex[1]], { y: offsety, duration: 0.5 }, "<");
		},
		HandleMouseLeave: () => {
			tl.to(vertical[xIndex[0]], {
				x: verticalX[xIndex[0]],
				duration: 0.5,
			});
			tl.to(
				vertical[xIndex[1]],
				{ x: verticalX[xIndex[1]], duration: 0.5 },
				"<"
			);
			tl.to(
				horizontal[yIndex[0]],
				{ y: horizontalY[yIndex[0]], duration: 0.5 },
				"<"
			);
			tl.to(
				horizontal[yIndex[1]],
				{ y: horizontalY[yIndex[1]], duration: 0.5 },
				"<"
			);
		},
	};
}
