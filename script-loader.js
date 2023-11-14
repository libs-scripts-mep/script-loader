import Effective from "./effective.js"

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
            const ERPData = await Effective.ERPDataInit()
            console.log("ERP Data:\n", ERPData)

            const productCode = Effective.getProductCode()

            if (productCode != "") {
                const testScript = await import(`${TSpath}${productCode}.js`)
                window.TS = new testScript.default(eventMap, event)
            } else { throw ("Código do produto baseado no número de série informado, é inválido!") }

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
    static { console.log("TestScriptLoader is ready!") }
}