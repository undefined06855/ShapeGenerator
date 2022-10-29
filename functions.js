function parseWord(word)
{
    const len = word.length
        , angle = 360 / word.length

    var points = []
    for (var i = 0; i < len; i++) {
        const dir = angle * i
            , dist = alphabet.indexOf(word.charAt(i).toLowerCase()) * SCALE

        points.push(calculatePositionFromCentre(dir, dist, word.charAt(i).toLowerCase()))
    }

    return points
}

function shitCopy()
{
    // badly copies the canvas to the clipboard (https://stackoverflow.com/a/57546936)

    // its bad because https://caniuse.com/mdn-api_clipboarditem is very bad

    // hey ho it works in most browsers anyway

    document.querySelector("canvas").toBlob(function(blob) { 
        const item = new ClipboardItem({ "image/png": blob });
        navigator.clipboard.write([item]); 
    });
}

function drawPoints(word, list = false)
{
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.font = "24px monospace"
    ctx.fillText(word, 0, 24)
    var points = parseWord(word)

    points.forEach(e => e.draw(list))

    console.log("\"" + word + "\" => " + 
    JSON.stringify(points)
    .replaceAll("},", "\n")
    .replaceAll(":", ": ")
    .replaceAll(",\"", ", \"")

    )
    ctx.beginPath()
    ctx.moveTo(points[0].x, points[0].y)
    for (var i = 1; i < points.length; i++)
    {
        ctx.lineTo(points[i].x, points[i].y)
    }
    ctx.lineTo(points[0].x, points[0].y)
    ctx.stroke()
}

function addRandom()
{
    document.getElementById("input").value = WORDS[Math.floor(Math.random() * WORDS.length)]
    dp()
}

const dp                          = ()                               => {drawPoints(document.getElementById("input").value, document.getElementById("list").checked)}
const calculatePositionFromCentre = (degrees, distance, char)        => {degrees = degrees * (Math.PI / 180); return new Point(center.x + distance * Math.cos(degrees), center.y + distance * Math.sin(degrees), char) }
const calculatePositionFromPoint  = (point, degrees, distance, char) => {degrees = degrees * (Math.PI / 180); return new Point(point.x + distance * Math.cos(degrees), point.y + distance * Math.sin(degrees), char) }

// pointClass

class Point {
    constructor(x, y, text = "N/A", r = 2) {
        this.radius = r
        this.x = x
        this.y = y
        this.t = text
    }
    draw(list = false) {
        ctx.beginPath();
        if (list)
        {
            ctx.font = "12px monospace"
            ctx.fillText(this.t, this.x+6, this.y-6)
        }
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
        ctx.fill();

        ctx.beginPath()
        ctx.moveTo(this.x, this.y)
        ctx.lineTo(center.x, center.y)
        ctx.stroke()
    }
}
