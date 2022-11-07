
// Drawing candle body seperately (for speed-up)

export default function candleBody(ctx, data) {

    let x05 = data.x - 1

    ctx.moveTo(
        x05,
        Math.floor(Math.min(data.o - 1, data.c - 1)),
    )
    ctx.lineTo(
        x05,
        Math.floor(Math.max(data.o, data.c))
            //+ (data.o === data.c ? 1 : 0)
    )


}
