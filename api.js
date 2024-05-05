// https://github.com/geode-sdk/mods/tree/main/mods-v2
// https://docs.github.com/en/rest/repos/contents?apiVersion=2022-11-28#get-repository-content

/** @returns Promise<> */
function getRayModStats() {
    return new Promise(resolve => {
        fetch("https://api.github.com/repos/geode-sdk/mods/contents/mods-v2", {cache: "reload"})
        .then(response => response.json())
        .then(_modsArray => {
            /** @type Array<Object> */
            let modsArray = _modsArray
            let totalMods = modsArray.length

            if (totalMods == undefined) {
                resolve("err")
                return
            }

            let username = new URL(window.location.href).searchParams.get("user") || "raydeeux"
            username.toLowerCase()

            let eryMods = modsArray.filter(mod => mod.name.includes(username)).length

            console.log("Total mods: %s", totalMods)
            console.log("Mods containing \"%s\": %s", username, eryMods)
            console.log("Raydeeux currently holds %s% of the index", (eryMods / totalMods) * 100)

            resolve({
                percentage: (eryMods / totalMods) * 100,
                drawablePercentage: eryMods / totalMods,
                totalMods: totalMods,
                eryMods: eryMods
            })
        })
    })
}
