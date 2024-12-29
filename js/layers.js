addLayer("h", {
    name: "Honesty", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: '<img src="resources/honesty.png" style="width: 75px; height: 75px;" />', // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#AF3911",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "honesty points", // Name of prestige currency
    baseResource: "ponies", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() {
        let mult = new Decimal(1)
        if (hasUpgrade('h', 13)) mult = mult.times(upgradeEffect('h', 13))
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    getPointGain() {
        // base gain is 1; applies gainMult() modifiers
        return new Decimal(1).times(tmp.h.gainMult);
    },

        upgrades: {
         11: {title: "Whole Buncha Apples",
            description: "Doubles your pony gain",
            cost: new Decimal(1),
    },
        12: {title: "Takin' The Core",
            description: "Scales effect based on honesty points.",
            cost: new Decimal(2),
            effect() {
                return player[this.layer].points.add(1).pow(0.5)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        13: {title: "Honest Advertising",
            description: "Ponies boost honesty point gain.",
            cost: new Decimal(10),
            effect() {
                return player.points.add(1).pow(0.15)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },  },
        14: {title: "Sturdy Work Ethic",
            description: "Doubles pony gain. Again.",
            cost: new Decimal(25),
 },
        15: {title: "Apple Orchard Expansion",
            description:"Increases pony gain by 1% per honesty point.",
            cost: new Decimal(50),
            effect() {
                let honestyPoints = player.h.points || new Decimal(0); // get honesty points
                return honestyPoints.times(0.01).plus(1); // 1% boost per honesty point
            },
            effectDisplay() { return format(this.effect()) + "x"; } // shows multiplier in the UI
            
 },
            21: {
                title: "Open A Market (NOT WORKING YET)",
                description: "Gain passive Honesty points equal to 5% of your current Honesty point gain.",
                cost: new Decimal(0),
                
            },
        22: {title: "No Shortcuts",
            description: "Boosts pony gain by 25% for every 100 honesty points.",
            cost: new Decimal(200),
            effect() {
                let honestyPoints = player.h.points || new Decimal(0); // get honesty points
                return honestyPoints.div(100).floor().times(0.25).plus(1); // calculate boost
            },
            effectDisplay() { return format(this.effect()) + "x"; }, // displays the multiplier
            },
            23: {
                title: "Roots Run Deep",
                description: "Each Honesty point increases the effectiveness of all other upgrades by .1%.",
                cost: new Decimal(250),
                effect() {
                    let honestyPoints = player.h.points || new Decimal(0); // get honesty points
                    return honestyPoints.times(0.001).plus(1); // calculate upgrade effectiveness multiplier
                },
                effectDisplay() { return format(this.effect()) + "x"; } // displays the multiplier
            },
        },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "h", description: "H: Reset for honesty points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
})

addLayer("g", {
    name: "Generosity",
    symbol: '<img src="resources/generosity.png" style="width: 90px; height: 90px;" />',
    position: 0,
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    color: "#733089",
    requires: new Decimal(1000),
    resource: "generosity points",
    baseResource: "honesty points",
    baseAmount() {return player.points},
    type: "normal",
    gainMult() {
        return new Decimal(1)
    },
    gainExp() {
        return new Decimal(1)
    },
    layerShown() { return true },
    row: 1,
    hotkeys: [
        {key: "g", description: "g: Reset for generosity points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ], 
    upgrades: {
        11: {title: "Giving Back",
            description: "nothin atm",
            cost: new Decimal(1),
        },
}
})