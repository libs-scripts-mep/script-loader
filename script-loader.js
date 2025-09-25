class Loader {

    static async Init(eventMap, event) {
        const UIRes = await UI.init()
        console.log(UIRes)

        if (pvi.runInstructionS("rastreamento.getproductcode", []) == "") {
            Log.color("Informações do produto não estão previamente carregadas no PVI", Log.OrangeRed)
            await this.rastInit(eventMap, event)
        }

        try {
            UI.setMsg("Carregando script de teste\n\nAguarde")
            const loadStatus = await this.LoadScript(`./Produtos/${pvi.runInstructionS("rastreamento.getproductcode", [])}.js`)
            console.log("Load Script Status:\n", loadStatus)

            UI.setMsg("")
            window.TS = new TestScript(eventMap, event)

        } catch (error) {
            console.warn(error.message)
            sessionStorage.clear()
            alert(error.message)
            location.reload()
        }
    }

    static async rastInit(eventMap, event) {
        const rast = new RastPVI(eventMap, event, {})
        rast.SerialNumber = prompt("Informe o número de serie do produto:\nEx: 1000001234567")
        if (rast == null || rast == "") {
            alert("É necessário informar o número de série!")
            location.reload()
        }

        RastUtil.setValidations(RastUtil.DISABLED, RastUtil.DISABLED, RastUtil.DISABLED, RastUtil.DISABLED)
        await RastUtil.setOperador()
        if (!await rast.init()) {
            alert(`Não foi possível buscar as informações do produto com o número de série '${rast.SerialNumber}'!\n\n${rast.InitInfo.ResultError}: ${rast.InitInfo.Message}`)
            location.reload()
        }
        RastUtil.setValidations(RastUtil.ENABLED, RastUtil.ENABLED, RastUtil.ENABLED, RastUtil.ENABLED)
    }

    static LoadScript(FILE_URL, async = true, type = "text/javascript") {
        return new Promise((resolve, reject) => {
            try {
                const scriptElement = document.createElement("script")
                scriptElement.type = type
                scriptElement.async = async
                scriptElement.src = FILE_URL

                scriptElement.addEventListener("load", (ev) => {
                    resolve({
                        status: true,
                        scriptFile: FILE_URL
                    })
                })
                scriptElement.addEventListener("error", (ev) => {
                    reject({
                        status: false,
                        scriptFile: FILE_URL,
                        message: `Failed to load the script ${FILE_URL}`
                    })
                })

                document.body.appendChild(scriptElement)
            } catch (error) {
                reject(error)
            }
        })
    }
}

