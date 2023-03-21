export function textToColor(text: string): string {
    let color = "#"
    let iter = 0
    text = text.toLocaleLowerCase()
    for (let i = 0; i < 6; i++) {
        let chr = text[iter]
        // console.log(text[iter].charCodeAt(0) - 'a'.charCodeAt(0))
        if ((text[iter].charCodeAt(0) - 'a'.charCodeAt(0)) % 16 > 9) {
            // console.log("worked")
            chr = String.fromCharCode((text[iter].charCodeAt(0) - 'a'.charCodeAt(0)) % 16 + 'a'.charCodeAt(0))
        } else {
            chr = (text[iter].charCodeAt(0) - 'a'.charCodeAt(0)) % 16 + ""
        }
        color += chr
        if (++iter >= text.length) {
            iter = 0
        }
    }
    // console.log("color: " + color)
    return color
}