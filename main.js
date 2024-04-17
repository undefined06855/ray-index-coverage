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

  , wikiHighlightLink = "https://en.wikipedia.org/wiki/Floating-point_arithmetic#Representable_numbers,_conversion_and_rounding:~:text=The%20number%20of%20digits%20(or%20bits)%20of%20precision%20also%20limits%20the%20set%20of%20rational%20numbers%20that%20can%20be%20represented%20exactly.%20For%20example%2C%20the%20decimal%20number%20123456789%20cannot%20be%20exactly%20represented%20if%20only%20eight%20decimal%20digits%20of%20precision%20are%20available"

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
    detailedPercentage.innerHTML = `(Or more specifically, <a href="${wikiHighlightLink}" class="no-deco" target="_blank"><strong>${rayModStats.percentage}%</strong>*</a>)`
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
