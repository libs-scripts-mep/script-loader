import { RastPVI, RastUtil } from "../rast-pvi/rast-pvi.js"
import FWLink from "../daq-fwlink/FWLink.js"
import Log from "./utils-script.js"

export default class TestScriptLoader {

    /**
     * @param {string[]} eventMap Informa ao script o mapa de eventos a serem cumpridos
     * @param {string} event Informa ao script o evento atual
     * @param {string | string[]} tsPath Caminho relativo dos scripts a serem carregados em relação à ESTE arquivo
     * @example
     * ```html
     * <script type="module">
     *  import TestScriptLoader from "./node_modules/@libs-scripts-mep/script-loader/script-loader.js"
     *  TestScriptLoader.init(
     *      ["TF"], 
     *      "TF", 
     *      ["../../../products/48x48/test-scripts/", "../../../products/72x72/test-scripts/", "../../../products/75x33/test-scripts/"]
     *  )
     * </script>
     * ```
     */
    static async init(eventMap, event, tsPath = ["../../../Produtos/"]) {
        const code = FWLink.runInstructionS("rastreamento.getproductcode", [])

        if (code == "") {
            Log.console("Informações do produto não estão previamente carregadas no PVI", Log.Colors.Orange.Coral)
            await this.rastInit(eventMap, event)
            location.reload()
            return
        }

        await this.load(code, eventMap, event, tsPath)
    }

    /**
     * Carrega o script do produto
     * @param {string} productCode Código do produto
     * @param {string[]} eventMap Informa ao script o mapa de eventos a serem cumpridos
     * @param {string} event Informa ao script o evento atual
     * @param {string | string[]} tsPath Caminho relativo dos scripts a serem carregados em relação à ESTE arquivo
     */
    static async load(productCode, eventMap, event, tsPath) {
        if (typeof tsPath == "string") { tsPath = [tsPath] }

        for (const path of tsPath) {
            try {
                window.TS = new (await import(`${path}${productCode}.js`)).default(eventMap, event)
                return
            } catch (error) {
                if (error.message.includes("Failed to fetch")) { continue }
                
                console.warn(error.message)
                alert(error.message)
                location.reload()
                return
            }
        }

        alert(`Arquivo ${productCode}.js não foi encontrado!`)
        location.reload()
    }

    /**
     * Inicia uma instância do Rast para carregar as informações no PVI
     * @param {string[]} eventMap Informa ao script o mapa de eventos a serem cumpridos
     * @param {string} event Informa ao script o evento atual
     */
    static async rastInit(eventMap, event) {
        sessionStorage.setItem("TestComponents", "{}") //Seta algo no sessionStorage para que o script não solicite os componentes

        const rast = new RastPVI(eventMap, event)
        const serialNumber = prompt("Informe o número de série do produto:\nEx: 1000001234567")
        rast.SerialNumber = serialNumber

        RastUtil.setValidations(RastUtil.DISABLED, RastUtil.DISABLED, RastUtil.DISABLED, RastUtil.DISABLED)
        if (!await rast.init()) {
            serialNumber == null || serialNumber == ""
                ? alert("É preciso informar um número de série!")
                : alert(`Não foi possível buscar as informações do produto com o número de série '${serialNumber}'!`)
        }
        RastUtil.setValidations(RastUtil.ENABLED, RastUtil.ENABLED, RastUtil.ENABLED, RastUtil.ENABLED)
        sessionStorage.clear()
    }

    static { console.log("TestScriptLoader is ready!") }
}