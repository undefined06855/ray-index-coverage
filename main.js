let canvas = document.querySelector("canvas")
  , ctx = canvas.getContext("2d")
  /** @type HTMLDivElement */
  , largePercentage = document.querySelector("#large-percentage")
  /** @type HTMLDivElement */
  , detailedPercentage = document.querySelector("#detailed-percentage")
  /** @type HTMLParagraphElement */
  , detailedExplanation = document.querySelector("#detailed-explanation")

  // stuff for pi chart animation
  , animStage = 0
  , animLength = 25000

  // the iife is literally just for the await later on
!(async () => {
    let rayModStats = await getRayModStats()
    if (rayModStats == "err") {
        // aww fuck
        document.querySelector("#loader").innerText = "There was an error when fetching from Github (have you hit the rate limit?)"
        return
    }
    document.querySelector("#loader").style.display = "none"
    document.querySelector("#hide-when-not-loaded").style.display = ""
    largePercentage.innerText = rayModStats.percentage.toFixed(3) + "%"
    detailedPercentage.innerHTML = `(Or more specifically, <strong>${rayModStats.percentage.toFixed(30)}%</strong>)`
    detailedExplanation.innerHTML = `That's <strong>${rayModStats.eryMods}</strong> out of the <strong>${rayModStats.totalMods}</strong> mods on the index!`

    // me when i can't use CCEaseOut on web:
    function tickAnim() {
        animStage += (animLength - animStage) / 16
        let multiplier = animStage / animLength

        // nice graph
        let center = canvas.width / 2

        ctx.fillStyle = "#00bfbf"
        ctx.beginPath()
        ctx.moveTo(center, center)
        ctx.arc(center, center, center, -1.5708, (Math.PI * 2 * rayModStats.drawablePercentage * multiplier) - 1.5708)
        ctx.lineTo(center, center)
        ctx.fill()

        ctx.fillStyle = "#6a5b9b"
        ctx.beginPath()
        ctx.moveTo(center, center)
        ctx.arc(center, center, center, (Math.PI * 2 * rayModStats.drawablePercentage * multiplier) - 1.5708, -1.5708)
        ctx.lineTo(center, center)
        ctx.fill()

        if (animLength == animStage) return

        requestAnimationFrame(tickAnim)
    }

    tickAnim()
})()
