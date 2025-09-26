class Loader {

    static async Init(eventMap, event) {
        const UIRes = await UI.init()
        console.log(UIRes)

        if (pvi.runInstructionS("rastreamento.getproductcode", []) == "") {
            console.log("%cInformações do produto não estão previamente carregadas no PVI", 'color: #FF4500')
            await this.rastInit(eventMap, event)
            location.reload()
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
        pvi.runInstructionS("rastreamento.setvalidations", ["disabled", "disabled", "disabled", "disabled"])
        const serialNumber = this.getSerialNumber()
        pvi.runInstructionS("ras.init", ["true", serialNumber, eventMap.join(";"), event])

        const observer = await this.rastObserver(serialNumber)
        if (!observer.result) {
            alert(`Não foi possível buscar as informações do produto com o número de série '${serialNumber}'!\n\n${observer.info.ResultError}: ${observer.info.Message}`)
            location.reload()
        }
        pvi.runInstructionS("rastreamento.setvalidations", ["enabled", "enabled", "enabled", "enabled"])
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
            const id = PVI.FWLink.globalDaqMessagesObservers.add((message, param) => {
                if (message.includes(serialNumber)) {
                    const result = param[0]
                    const info = JSON.parse(param[1])

                    if (message.includes("init")) {
                        PVI.FWLink.globalDaqMessagesObservers.remove(id)
                        console.log(`Rastreamento Init ${serialNumber}\n`, result, info)
                        resolve({ result, info })
                    }
                }
            }, "rastreamento")
        })
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

