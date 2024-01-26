export default async function(time: number = 300) {
    return new Promise((reslove) => {
        setTimeout(() => {
            reslove(1)
        }, time)
    })
}