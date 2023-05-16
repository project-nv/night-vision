
export default function drawArrow(context, fromX, fromY, toX, toY, color, head = true) {
    const headLength = 7;   // length of head in pixels
    const dx = toX - fromX;
    const dy = toY - fromY;
    const angle = Math.atan2(dy, dx);

    context.beginPath();

    // draw the line
    context.moveTo(fromX, fromY);
    context.lineTo(toX, toY);

    // draw the head of the arrow
    if (head) {
        context.moveTo(toX, toY);
        context.lineTo(toX - headLength * Math.cos(angle - Math.PI / 5), toY - headLength * Math.sin(angle - Math.PI / 5));
        context.moveTo(toX, toY);
        context.lineTo(toX - headLength * Math.cos(angle + Math.PI / 5), toY - headLength * Math.sin(angle + Math.PI / 5));
    }
    context.strokeStyle = color;
    context.lineWidth = 1;
    context.stroke();

}