export default function () {
    const s = [];
	// 随机的id值从以下字符串中产生
	const uuidData = "0123456789abcdefghijklmnopqrstuvwxyz";
	const uuidDataLength = uuidData.length;
	//此处循环了36次，可以修改循环次数，循环次数决定生成id长度	
	for (var i = 0; i < 36; i++) {
		// 从uuidData中随机截取一个字符
		s[i] = uuidData.substr(Math.floor(Math.random() * uuidDataLength), 1);
	}
	return s.join("");
}