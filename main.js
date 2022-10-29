const canvas = document.querySelector("canvas")
    , ctx = canvas.getContext("2d")



var center = new Point(canvas.width / 2, canvas.height / 2, "", 0)
  , SCALE = 10
    


//#region create alphabet

const alphabet_str = "0123456789!?'. abcdefghijklmnopqrstuvwxyz"
var alphabet = ["", "", "", "", "", ""] // offset
for (var i = 0; i < alphabet_str.length; i++) {
    alphabet.push(alphabet_str.charAt(i))
}

//#endregion

addRandom()
