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
            if (FWLink.runInstructionS("rastreamento.getproductcode", []) != "" && sessionStorage.getItem("ProductCode") != null) {
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
        const serialNumber = await this.getSerialNumber()
        await this.setUser()
        FWLink.runInstructionS("ras.init", ["true", serialNumber, eventMap.join(";"), event])

        const observer = await this.rastObserver(serialNumber)
        if (!observer.result) {
            alert(`Não foi possível buscar as informações do produto com o número de série '${serialNumber}'!\n\n${observer.info.ResultError}: ${observer.info.Message}`)
            location.reload()
            await new Promise(r => { })
        }
        this.setErpData(observer.info.item)
        sessionStorage.setItem("ProductCode", observer.info.item.OpInfo.Product.Code)
        sessionStorage.setItem("SerialNumber", observer.info.item.Serial)
        FWLink.runInstructionS("rastreamento.setvalidations", ["enabled", "enabled", "enabled", "enabled"])
    }

    /**@returns {Promise<string>} */
    static async getSerialNumber() {
        const serialNumber = prompt("Informe o número de serie do produto:\nEx: 1000001234567")
        if (serialNumber == null || serialNumber == "") {
            alert("É necessário informar o número de série!")
            location.reload()
            await new Promise(r => { })
        }
        return serialNumber
    }

    static async setUser() {
        if (FWLink.runInstructionS("ras.getuser", []) != "") return

        const user = prompt("Informe o Número do Cracha")
        if (FWLink.runInstructionS("ras.setuser", [user]) === "0") {
            alert("Usuário inválido!")
            location.reload()
            await new Promise(r => { })
        }
    }

    /** Faz um translate parcial e seta no sessionStorage o objeto que viria do ERP */
    static setErpData(itemInfo) {
        const Code = itemInfo.Serial
        const Op = itemInfo.OpInfo.Code
        const ProductSteps = itemInfo.OpInfo.OpProcesses.map(step => { step.Cod = step.Code; return step })
        const Information = {
            ProductCode: itemInfo.OpInfo.Product.Code,
            ERPName: itemInfo.OpInfo.Product.Name,
            Description: itemInfo.OpInfo.Product.Description
        }

        sessionStorage.setItem("ERPData", JSON.stringify({ Code, Op, ProductSteps, Information }))
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