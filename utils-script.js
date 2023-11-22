export default class Log {
    static Colors = {
        Blue: {
            Blue: "color: #0000FF",
            Olive: "color: #808000",
            SkyBlue: "color: #87CEEB",
            DarkBlue: "color: #00008B",
            DarkCyan: "color: #008B8B",
            SlateBlue: "color: #6A5ACD",
            LightCyan: "color: #E0FFFF",
            CadetBlue: "color: #5F9EA0",
            SteelBlue: "color: #4682B4",
            AliceBlue: "color: #F0F8FF",
            Turquoise: "color: #40E0D0",
            BlueViolet: "color: #8A2BE2",
            DodgerBlue: "color: #1E90FF",
            Aquamarine: "color: #7FFFD4",
            PowderBlue: "color: #B0E0E6",
            SlateBlue1: "color: #836FFF",
            DeepSkyBlue: "color: #00BFFF",
            MidnightBlue: "color: #191970",
            PaleTurquoise: "color: #E0FFFF",
            DarkSlateBlue: "color: #483D8B",
            DarkTurquoise: "color: #00CED1",
            CornflowerBlue: "color: #6495ED",
            LightSteelBlue: "color: #B0C4DE",
            MediumSlateBlue: "color: #7B68EE",
            MediumTurquoise: "color: #48D1CC",
            MediumAquamarine: "color: #66CDAA",
        },
        Green: {
            Cyan: "color: #00FFFF",
            Teal: "color: #008080",
            Lime: "color: #00FF00",
            Green: "color: #008000",
            SeaGreen: "color: #2E8B57",
            PaleGreen: "color: #98FB98",
            DarkGreen: "color: #006400",
            LimeGreen: "color: #32CD32",
            LawnGreen: "color: #7CFC00",
            Chartreuse: "color: #7FFF00",
            LightGreen: "color: #90EE90",
            ForestGreen: "color: #228B22",
            GreenYellow: "color: #ADFF2F",
            YellowGreen: "color: #9ACD32",
            SpringGreen: "color: #00FF7F",
            DarkSeaGreen: "color: #8FBC8F",
            LightSeaGreen: "color: #20B2AA",
            MediumSeaGreen: "color: #3CB371",
            MediumSpringGreen: "color: #00FA9A",
            DarkOliveGreen: "color: #556B2F",
        },
        Red: {
            Red: "color: #FF0000",
            Salmon: "color: #FA8072",
            Crimson: "color: #DC143C",
            DarkRed: "color: #8B0000",
            FireBrick: "color: #B22222",
            OrangeRed: "color: #FF4500",
            IndianRed: "color: #CD5C5C",
            LightCoral: "color: #F08080",
            DarkSalmon: "color: #E9967A",
            PaleVioletRed: "color: #DB7093",
            MediumVioletRed: "color: #C71585",
        },
        Pink: {
            Pink: "color: #FFC0CB",
            HotPink: "color: #FF69B4",
            DeepPink: "color: #FF1493",
            LightPink: "color: #FFB6C1",
        },
        Orange: {
            Coral: "color: #FF7F50",
            Orange: "color: #FFA500",
            Tomato: "color: #FF6347",
            DarkOrange: "color: #FF8C00",
            LightSalmon: "color: #FFA07A",
        },
        Greyscale: {
            Gray: "color: #808080",
            Snow: "color: #FFFAFA",
            Beige: "color: #F5F5DC",
            Black: "color: #000000",
            Ivory: "color: #FFFFF0",
            Linen: "color: #FAF0E6",
            Azure: "color: #F0FFFF",
            grey11: "color: #1C1C1C",
            grey31: "color: #4F4F4F",
            DimGray: "color: #696969",
            OldLace: "color: #FDF5E6",
            Lavender: "color: #E6E6FA",
            Honeydew: "color: #F0FFF0",
            DarkGray: "color: #A9A9A9",
            Seashell: "color: #FFF5EE",
            MistyRose: "color: #FFE4E1",
            SlateGray: "color: #708090",
            MintCream: "color: #F5FFFA",
            WhiteSmoke: "color: #F5F5F5",
            GhostWhite: "color: #F8F8FF",
            FloralWhite: "color: #FFFAF0",
            DarkSlateGray: "color: #2F4F4F",
            LavenderBlush: "color: #FFF0F5",
        },
        Yellow: {
            Gold: "color: #FFD700",
            Khaki: "color: #F0E68C",
            Yellow: "color: #FFFF00",
            Moccasin: "color: #FFE4B5",
            DarkKhaki: "color: #BDB76B",
            Goldenrod: "color: #DAA520",
            PeachPuff: "color: #FFDAB9",
            PapayaWhip: "color: #FFEFD5",
            LightYellow: "color: #FFFFE0",
            LemonChiffon: "color: #FFFACD",
            DarkGoldenrod: "color: #B8860B",
            PaleGoldenrod: "color: #EEE8AA",
            LightGoldenrodYellow: "color: #FAFAD2",
        },
        Brown: {
            Tan: "color: #D2B48C",
            Peru: "color: #CD853F",
            Wheat: "color: #F5DEB3",
            Brown: "color: #A52A2A",
            Bisque: "color: #FFE4C4",
            Sienna: "color: #A0522D",
            Maroon: "color: #800000",
            Cornsilk: "color: #FFF8DC",
            Chocolate: "color: #D2691E",
            RosyBrown: "color: #BC8F8F",
            BurlyWood: "color: #DEB887",
            SandyBrown: "color: #F4A460",
            SaddleBrown: "color: #8B4513",
            NavajoWhite: "color: #FFDEAD",
            AntiqueWhite: "color: #FAEBD7",
            BlanchedAlmond: "color: #FFEBCD",
        },
        Purple: {
            Plum: "color: #DDA0DD",
            Orchid: "color: #DA70D6",
            Indigo: "color: #4B0082",
            Purple: "color: #A020F0",
            Violet: "color: #EE82EE",
            Magenta: "color: #FF00FF",
            Thistle: "color: #D8BFD8",
            DarkViolet: "color: #9400D3",
            DarkOrchid: "color: #9932CC",
            DarkMagenta: "color: #8B008B",
            MediumOrchid: "color: #BA55D3",
            MediumPurple: "color: #9370DB",
        }
    }

    /**
     * @param {String} msg mensagem de log
     * @param {String} css estilização 
     * 
     * # Exemplos
     * 
     * Modificando apenas a cor da fonte:
     * ```js
     * Log.console("this is my message", Log.Colors.Yellow.Gold)
     * ```
     * Passando uma estilização personalizada:
     * ```js
     * Log.console("this is my message", "color: #808000; background-color: #000000")
     * ```
    */
    static console(msg, css) { console.log("%c" + msg, css) }

    /**
    * @param {String} msg mensagem de log
    * @param {String} css estilização
    *
    * # Exemplos
    * 
    * Modificando apenas a cor da fonte:
    * ```js
    * Log.console("this is my message", Log.Colors.Yellow.Gold)
    * ```
    * Passando uma estilização personalizada:
    * ```js
    * Log.console("this is my message", "color: #808000; background-color: #000000")
    * ```
    */
    static warn(msg, css) { console.warn("%c" + msg, css) }

    static chooseYourColor() {
        Object.entries(this.Colors).forEach((ColorSet, key) => {
            Object.entries(ColorSet[1]).forEach((color, key) => {
                this.console(`Log.Colors.${ColorSet[0]}.${color[0]}`, color[1])
            })
        })
    }

    static { window.Log = Log }
}

export class TestEmmiter {
    static Events = {}

    /**
     * Emite um evento de teste que será inserido no `TestEvents.Events`
     * @param {String} testName 
     * @param {String} symbol 
     * 
     * # Exemplos
     * 
     * ```js
     * TestEmmiter.emmit("Teste1", "⏳")
     * //teste acontendo...
     * TestEmmiter.emmit("Teste1", "✅")
     * ```
     */
    static emmit(testName, symbol) {
        if (this.Events.hasOwnProperty(testName)) {
            this.Events[testName]["symbol"] = symbol
            this.Events[testName].finish = parseInt(performance.now())
            this.Events[testName].elapsed = this.Events[testName].finish - this.Events[testName].start
            Log.console(`${testName}: ${this.Events[testName].elapsed}ms`, Log.Colors.Blue.LightSteelBlue)
        } else {
            this.Events[testName] = {}
            this.Events[testName]["symbol"] = symbol
            this.Events[testName]["start"] = parseInt(performance.now())
        }
    }

    /**
     * Itera sobre o objeto `TestEvents.Events` e monta um novo `Map` contendo os nomes de teste e os respectivos símbolos
     * @returns Map
     */
    static getMapOfSymbols() {
        const map = new Map()
        const events = Object.entries(this.Events)
        events.forEach((info) => { map.set(info[0], info[1].symbol) })
        return map
    }

    /**
     * Itera sobre o objeto `TestEvents.Events` e monta um novo `Map` contendo os nomes de teste e os respectivos timestamp de início
     * @returns Map
     */
    static getMapOfStart() {
        const map = new Map()
        const events = Object.entries(this.Events)
        events.forEach((info) => { map.set(info[0], info[1].start) })
        return map
    }

    /**
     * Itera sobre o objeto `TestEvents.Events` e monta um novo `Map` contendo os nomes de teste e os respectivos timestamp de fim
     * @returns Map
     */
    static getMapOfFinish() {
        const map = new Map()
        const events = Object.entries(this.Events)
        events.forEach((info) => { map.set(info[0], info[1].finish) })
        return map
    }

    /**
     * Itera sobre o objeto `TestEvents.Events` e monta um novo `Map` contendo os nomes de teste e o respectivo tempo de duração
     * @returns Map
     */
    static getMapOfElapsed() {
        const map = new Map()
        const events = Object.entries(this.Events)
        events.forEach((info) => { map.set(info[0], info[1].elapsed) })
        return map
    }

    /**
     * Analisa e retorna o teste emitido com maior tempo de execução
     * @returns Array
     * 
     * # Exemplos
     * 
     * ```js
     * const slowest = TestEmmiter.getSlowest()
     * ```
     * 
     * # Retorno
     * 
     * ```
     * [String | null, Number | null]
     * ```
     * 
     */
    static getSlowest() {
        const elapsed = this.getMapOfElapsed()
        let slowest = [null, null]
        for (const test of elapsed) {
            if (slowest[1] != null) {
                slowest[1] < test[1] ? slowest = test : null
            } else {
                slowest = test
            }
        }
        return slowest
    }

    /**
     * Analisa e retorna o teste emitido com menor tempo de execução
     * @returns Array
     * 
     * # Exemplos
     * 
     * ```js
     * const fastest = TestEmmiter.getFastest()
     * ```
     * 
     * # Retorno
     * 
     * ```
     * [String | null, Number | null]
     * ```
     * 
     */
    static getFastest() {
        const elapsed = this.getMapOfElapsed()
        let fastest = [null, null]
        for (const test of elapsed) {
            if (fastest[1] != null) {
                fastest[1] > test[1] ? fastest = test : null
            } else {
                fastest = test
            }
        }
        return fastest
    }

    /**
     * Printa como tabela no console o objeto `TestEmmiter.Events`
     * 
     * ![Image](https://i.imgur.com/ZljXR9x.png)
     */
    static table() { console.table(this.Events) }

    static { window.TestEmmiter = TestEmmiter }
}