import FWLink from "../daq-fwlink/FWLink.js"

export default class TestScriptLoader {

    /**
     * @param {Array} eventMap Informa ao script as o mapa de eventos a serem cumpridos
     * @param {String} event Informa ao script o evento atual
     * @param {String} TSpath Caminho relativo dos scripts à serem carregados em relação à ESTE arquivo
     * 
     * # Exemplos
     * 
     * ## .html
     * ```html
     * <script type="module">
     * import TestScriptLoader from "./node_modules/@libs-scripts-mep/script-loader/script-loader.js"
     * TestScriptLoader.Init(["TF"], "TF", "../../../test_scripts/")
     * </script>
     * ```
     */
    static async Init(eventMap, event, TSpath = "../../../Produtos/") {
        try {
            if (FWLink.runInstructionS("rastreamento.getproductcode", []) != "") {
                const testScript = await import(`${TSpath}${FWLink.runInstructionS("rastreamento.getproductcode", [])}.js`)
                window.TS = new testScript.default(eventMap, event)
                return
            }

            console.log("%cInformações do produto não estão previamente carregadas", "color: #FF4500;")
            await this.rastInit(eventMap, event)
            location.reload()
        } catch (error) {
            if (error.hasOwnProperty("message")) {
                console.warn(error.message)
                alert(error.message)
            } else {
                console.warn(error)
                alert(error)
            }
            sessionStorage.clear()
            location.reload()
        }
    }

    static async rastInit(eventMap, event) {
        FWLink.runInstructionS("rastreamento.setvalidations", ["disabled", "disabled", "disabled", "disabled"])
        const serialNumber = this.getSerialNumber()
        FWLink.runInstructionS("ras.init", ["true", serialNumber, eventMap.join(";"), event])

        const observer = await this.rastObserver(serialNumber)
        if (!observer.result) {
            alert(`Não foi possível buscar as informações do produto com o número de série '${serialNumber}'!\n\n${observer.info.ResultError}: ${observer.info.Message}`)
            location.reload()
        }
        FWLink.runInstructionS("rastreamento.setvalidations", ["enabled", "enabled", "enabled", "enabled"])
    }

    /**@returns {string} */
    static getSerialNumber() {
        const serialNumber = prompt("Informe o número de serie do produto:\nEx: 1000001234567")
        if (serialNumber == null || serialNumber == "") {
            alert("É necessário informar o número de série!")
            location.reload()
        }
        return serialNumber
    }

    /** @returns {Promise<{ result: boolean, info: { ResultError: string, Message: string } }>} */
    static async rastObserver(serialNumber) {
        return new Promise((resolve) => {
            const id = FWLink.PVIEventObserver.add((message, param) => {
                if (message.includes(serialNumber)) {
                    const result = param[0]
                    const info = JSON.parse(param[1])

                    if (message.includes("init")) {
                        FWLink.PVIEventObserver.remove(id)
                        console.log(`Rastreamento Init ${serialNumber}\n`, result, info)
                        resolve({ result, info })
                    }
                }
            }, "rastreamento")
        })
    }

    static { console.log("TestScriptLoader is ready!") }
}