// who needs ids when you have document.querySelector?
let canvas = document.querySelector("canvas")
  , ctx = canvas.getContext("2d")
  /** @type HTMLDivElement */
  , percentEl = document.querySelector("#large-percentage")
  /** @type HTMLDivElement */
  , percentageSpecificEl = document.querySelector("#detailed-percentage")
  /** @type HTMLParagraphElement */
  , detailedExplanation = document.querySelector("p")

!(async () => {
    let rayModStats = await getRayModStats()
    percentEl.innerText = rayModStats.percentage.toFixed(3) + "%"
    percentageSpecificEl.innerHTML = `(Or more specifically, <strong>${rayModStats.percentage}%</strong>)`
    detailedExplanation.innerHTML = `That's <strong>${rayModStats.eryMods}</strong> out of the <strong>${rayModStats.totalMods}</strong> mods on the index!`

    // nice graph
    let center = canvas.width / 2

    ctx.fillStyle = "#00bfbf"
    ctx.beginPath()
    ctx.moveTo(center, center)
    ctx.arc(center, center, center, -1.5708, Math.PI * 2 * rayModStats.drawablePercentage - 1.5708)
    ctx.lineTo(center, center)
    ctx.fill()

    ctx.fillStyle = "#6a5b9b"
    ctx.beginPath()
    ctx.moveTo(center, center)
    ctx.arc(center, center, center, Math.PI * 2 * rayModStats.drawablePercentage - 1.5708, -1.5708)
    ctx.lineTo(center, center)
    ctx.fill()
})()
