const { combineStats } = require('../facilitators.js');
const { base, gunCalcNames } = require('../constants.js');
const g = require('../gunvals.js');

module.exports = ({ Class }) => {

// This addon is enabled by default. Uncomment line below to disable.
  // return console.log('[mysticalsV2.js] Addon disabled.');
  Class.bullet
  Class.reload
  Class.shinyomegaMysticals = {
    PARENT: ["menu"],
    LABEL: "Shiny Omega Mysticals",
    COLOR: 1,
    SHAPE: 4,
    UPGRADES_TIER_0: []
  };
  Class.holywaferbread = {
    PARENT: ["sunchip"],
    SHAPE: 0,
    COLOR: 3,
  };
  Class.holysorcerer = {
    PARENT: ["miniboss"],
    LABEL: "Holy Sorcerer",
    DANGER: 50,
    SHAPE: 0,
    COLOR: 3,
    SIZE: 26,
    MAX_CHILDREN: 150,
    FACING_TYPE: "autospin",
    VALUE: 15e6,
    BODY: {
      FOV: 0.8,
      SPEED: 0.15 * base.SPEED,
      HEALTH: 25 * base.HEALTH,
      DAMAGE: 34 * base.DAMAGE,
    },
    GUNS: Array(2).fill().map((_, i) => ({
      POSITION: [4.5, 11, 1.2, 8, 0, i * 180, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.drone, g.summoner, g.mach, g.machgun, g.strong, g.triplereload, g.strong, { size: 0.8, spray: 150, speed: 2, shudder: 1.75 }]),
        TYPE: "holywaferbread",
        AUTOFIRE: true,
        SYNCS_SKILLS: true,
        STAT_CALCULATOR: gunCalcNames.necro,
        WAIT_TO_CYCLE: true,
      },
    }))
  };

// MYSTICALS EXTENSION
  Class.bloodchip = {
    PARENT: ["sunchip"],
    SHAPE: 6
  };
  Class.apostal = {
    PARENT: ["miniboss"],
    LABEL: "Apostal",
    DANGER: 9,
    SHAPE: 6,
    COLOR: 0,
    SIZE: 26,
    MAX_CHILDREN: 15,
    FACING_TYPE: "autospin",
    VALUE: 6e5,
    BODY: {
      FOV: 0.6,
      SPEED: 0.07 * base.SPEED,
      HEALTH: 17 * base.HEALTH,
      DAMAGE: 5.5 * base.DAMAGE,
    },
    GUNS: Array(6).fill().map((_, i) => ({
      POSITION: [3.5, 8.65, 1.2, 8, 0, i * 60, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.drone, g.summoner, g.destroy]),
        TYPE: "bloodchip",
        AUTOFIRE: true,
        SYNCS_SKILLS: true,
        STAT_CALCULATOR: gunCalcNames.necro,
        WAIT_TO_CYCLE: true,
      },
    }))
  };  
  Class.wormchip = {
    PARENT: ["sunchip"],
    SHAPE: 7
  };
  Class.perseus = {
    PARENT: ["miniboss"],
    LABEL: "Perseus",
    DANGER: 9,
    SHAPE: 7,
    COLOR: 30,
    SIZE: 26,
    MAX_CHILDREN: 14,
    FACING_TYPE: "autospin",
    VALUE: 6e5,
    BODY: {
      FOV: 0.6,
      SPEED: 0.06 * base.SPEED,
      HEALTH: 18 * base.HEALTH,
      DAMAGE: 6.5 * base.DAMAGE,
    },
    GUNS: Array(7).fill().map((_, i) => ({
      POSITION: [3.5, 7.7, 1.2, 8, 0, i * 51, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.drone, g.summoner, g.destroy]),
        TYPE: "wormchip",
        AUTOFIRE: true,
        SYNCS_SKILLS: true,
        STAT_CALCULATOR: gunCalcNames.necro,
        WAIT_TO_CYCLE: true,
      },
    }))
  };
  Class.electrochip = {
    PARENT: ["sunchip"],
    SHAPE: 8
  };
  Class.dardanos = {
    PARENT: ["miniboss"],
    LABEL: "Dardanos",
    DANGER: 9,
    SHAPE: 8,
    COLOR: 15,
    SIZE: 26,
    MAX_CHILDREN: 13,
    FACING_TYPE: "autospin",
    VALUE: 7e5,
    BODY: {
      FOV: 0.6,
      SPEED: 0.05 * base.SPEED,
      HEALTH: 19 * base.HEALTH,
      DAMAGE: 7.5 * base.DAMAGE,
    },
    GUNS: Array(8).fill().map((_, i) => ({
      POSITION: [3.5, 7, 1.2, 8, 0, i * 45, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.drone, g.summoner, g.destroy]),
        TYPE: "electrochip",
        AUTOFIRE: true,
        SYNCS_SKILLS: true,
        STAT_CALCULATOR: gunCalcNames.necro,
        WAIT_TO_CYCLE: true,
      },
    }))
  };
  Class.nightchip = {
    PARENT: ["sunchip"],
    SHAPE: 12
  };
  Class.concordia = {
    PARENT: ["miniboss"],
    LABEL: "Concordia",
    DANGER: 12,
    SHAPE: 12,
    COLOR: 8,
    SIZE: 26,
    MAX_CHILDREN: 12,
    FACING_TYPE: "autospin",
    VALUE: 10e5,
    BODY: {
      FOV: 0.6,
      SPEED: 0.02 * base.SPEED,
      HEALTH: 21 * base.HEALTH,
      DAMAGE: 10 * base.DAMAGE,
    },
    GUNS: Array(12).fill().map((_, i) => ({
      POSITION: [3.5, 4, 1.2, 8, 0, i * 30, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.drone, g.summoner, g.destroy, g.mega]),
        TYPE: "nightchip",
        AUTOFIRE: true,
        SYNCS_SKILLS: true,
        STAT_CALCULATOR: gunCalcNames.necro,
        WAIT_TO_CYCLE: true,
      },
    }))
  };
// MYSTICALS EXTENSION PT. 2: SHINY OMEGA
  Class.shinyomegaSorcerer = {
    PARENT: ["miniboss"],
    LABEL: "Shiny Omega Sorcerer",
    DANGER: 8,
    SHAPE: 0,
    COLOR: 1,
    SIZE: 52,
    DENSITY: 2,
    MAX_CHILDREN: 100,
    FACING_TYPE: "autospin",
    VALUE: 3e5,
    BODY: {
      FOV: 0.5,
      SPEED: 0.09 * base.SPEED,
      HEALTH: 9 * base.HEALTH,
      DAMAGE: 4.5 * base.DAMAGE,
    },
    GUNS: Array(2).fill().map((_, i) => ({
      POSITION: [3.5, 8.65, 1.2, 8, 0, i * 180, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.drone, g.summoner, g.mach, g.machgun, g.doublereload, g.strong, { size: 0.4, spray: 150, speed: 2, shudder: 1.75 }]),
        TYPE: "shinybetawaferbread",
        AUTOFIRE: true,
        SYNCS_SKILLS: true,
        STAT_CALCULATOR: gunCalcNames.necro,
        WAIT_TO_CYCLE: true,
      },
    })),
    TURRETS: [
      {
        POSITION: [15, 0, 0, 45, 0, 1],
        TYPE: "shinyEggDummy"
      },
      {
        POSITION: [10, 0, 0, 45, 0, 1],
        TYPE: "shinyEggDummy"
      },
      {
        POSITION: [3, 0, 0, 45, 0, 1],
        TYPE: "shinyEggDummy"
      },
    ]
  };
  Class.shinySquareDummy = {
    SHAPE: 4,
    COLOR: 1,
  }
  Class.shinyomegasummoner = {
    PARENT: ["miniboss"],
    LABEL: "Shiny Omega Summoner",
    DANGER: 9,
    SHAPE: 4,
    COLOR: 1,
    SIZE: 52,
    MAX_CHILDREN: 12,
    FACING_TYPE: "autospin",
    VALUE: 5e5,
    BODY: {
      FOV: 0.5,
      SPEED: 0.08 * base.SPEED,
      HEALTH: 13 * base.HEALTH,
      DAMAGE: 5.5 * base.DAMAGE,
    },
    GUNS: Array(4).fill().map((_, i) => ({
      POSITION: [3.5, 8.65, 1.2, 8, 0, i * 90, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.drone, g.summoner, g.destroy, g.destroy, g.veryfast, g.strong, { maxSpeed: 3 }, { size: 0.8 }]),
        TYPE: ["shinyomegasunchip"],
        AUTOFIRE: true,
        SYNCS_SKILLS: true,
        STAT_CALCULATOR: gunCalcNames.necro,
        WAIT_TO_CYCLE: true,
      },
    })),
    TURRETS: [{
      POSITION: [20 * Math.SQRT1_2, 0, 0, 45, 0, 1],
      TYPE: ["shinySquare", { MIRROR_MASTER_ANGLE: true }]
    },{
      POSITION: [20 * Math.SQRT1_2 ** 2, 0, 0, 0, 0, 1],
      TYPE: ["shinySquare", { MIRROR_MASTER_ANGLE: true }]
    },{
      POSITION: [20 * Math.SQRT1_2 ** 3, 0, 0, 45, 0, 1],
      TYPE: ["shinySquare", { MIRROR_MASTER_ANGLE: true }]
    }]
  };
  Class.shinydoritoDummy = {
    SHAPE: 3,
    COLOR: 1,
  }
  Class.shinyomegadorito = {
    PARENT: ["sunchip"],
    SHAPE: 3,
    HITS_OWN_TYPE: "hard",
    BODY: {
      FOV: 0.5,
    },
    AI: {
      BLIND: true,
      FARMER: true,
    },
    TURRETS: [{
      POSITION: [20 * Math.SQRT1_2, 0, 0, 180, 0, 1],
      TYPE: ["shinydoritoDummy", { MIRROR_MASTER_ANGLE: true }]
    },{
      POSITION: [20 * Math.SQRT1_2 ** 1.5, 0, 0, 0, 0, 1],
      TYPE: ["shinydoritoDummy", { MIRROR_MASTER_ANGLE: true }]
    },{
      POSITION: [20 * Math.SQRT1_2 ** 2, 0, 0, 360, 0, 1],
      TYPE: ["shinydoritoDummy", { MIRROR_MASTER_ANGLE: true }]
    }]
  };
  Class.shinyomegaenchantress = {
    PARENT: ["miniboss"],
    LABEL: "Shiny Omega Enchantress",
    DANGER: 11,
    SHAPE: 3.5,
    COLOR: 1,
    SIZE: 52,
    MAX_CHILDREN: 9,
    FACING_TYPE: "autospin",
    VALUE: 750000,
    BODY: {
      FOV: 0.5,
      SPEED: 0.07 * base.SPEED,
      HEALTH: 18 * base.HEALTH,
      DAMAGE: 7.5 * base.DAMAGE,
    },
    GUNS: Array(3).fill().map((_, i) => ({
      POSITION: [3.5, 8.65, 1.2, 8, 0, i * 120, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.drone, g.summoner, g.destroy, g.destroy, g.veryfast, g.strong, g.lessreload, {maxSpeed: 3}, { size: 0.9 }]),
        TYPE: "shinyomegadorito",
        AUTOFIRE: true,
        SYNCS_SKILLS: true,
        STAT_CALCULATOR: gunCalcNames.necro,
        WAIT_TO_CYCLE: true,
      },
    })),
    TURRETS: [{
      POSITION: [20 * Math.SQRT1_2, 0, 0, 180, 0, 1],
      TYPE: ["shinydoritoDummy", { MIRROR_MASTER_ANGLE: true }]
    },{
      POSITION: [20 * Math.SQRT1_2 ** 1.5, 0, 0, 0, 0, 1],
      TYPE: ["shinydoritoDummy", { MIRROR_MASTER_ANGLE: true }]
    },{
      POSITION: [20 * Math.SQRT1_2 ** 2, 0, 0, 360, 0, 1],
      TYPE: ["shinydoritoDummy", { MIRROR_MASTER_ANGLE: true }]
    }]
  };
  Class.shinypentaDummy = {
    COLOR: 1,
    SHAPE: 5,
  }
  Class.shinyomegademonchip = {
    PARENT: ["sunchip"],
    SHAPE: 5,
    HITS_OWN_TYPE: "hard",
    BODY: {
      FOV: 0.4,
    },
    AI: {
      BLIND: true,
      FARMER: true,
    },
    TURRETS: [{
      POSITION: [20 * Math.SQRT1_2, 0, 0, 180, 0, 1],
      TYPE: ["shinypentaDummy", { MIRROR_MASTER_ANGLE: true }]
    },{
      POSITION: [20 * Math.SQRT1_2 ** 1.5, 0, 0, 0, 0, 1],
      TYPE: ["shinypentaDummy", { MIRROR_MASTER_ANGLE: true }]
    },{
      POSITION: [20 * Math.SQRT1_2 ** 2, 0, 0, 360, 0, 1],
      TYPE: ["shinypentaDummy", { MIRROR_MASTER_ANGLE: true }]
    }]
  };
  Class.shinyomegaexorcistor = {
    PARENT: ["miniboss"],
    LABEL: "Shiny Omega Exorcistor",
    DANGER: 15,
    SHAPE: 5.5,
    COLOR: 1,
    SIZE: 52,
    MAX_CHILDREN: 5,
    FACING_TYPE: "autospin",
    VALUE: 1000000,
    BODY: {
      FOV: 0.4,
      SPEED: 0.05 * base.SPEED,
      HEALTH: 22 * base.HEALTH,
      DAMAGE: 9 * base.DAMAGE,
    },
    GUNS: Array(5).fill().map((_, i) => ({
      POSITION: [3.5, 8.65, 1.2, 8, 0, i * 72, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.drone, g.summoner, g.destroy, g.destroy, g.veryfast, g.strong, g.one_third_reload, {maxSpeed: 3}, { size: 1.5 }]),
        TYPE: "shinyomegademonchip",
        AUTOFIRE: true,
        SYNCS_SKILLS: true,
        STAT_CALCULATOR: gunCalcNames.necro,
        WAIT_TO_CYCLE: true,
      },
    })),
    TURRETS: [{
      POSITION: [20 * Math.SQRT1_2, 0, 0, 180, 0, 1],
      TYPE: ["shinypentaDummy", { MIRROR_MASTER_ANGLE: true }]
    },{
      POSITION: [20 * Math.SQRT1_2 ** 1.5, 0, 0, 0, 0, 1],
      TYPE: ["shinypentaDummy", { MIRROR_MASTER_ANGLE: true }]
    },{
      POSITION: [20 * Math.SQRT1_2 ** 2, 0, 0, 360, 0, 1],
      TYPE: ["shinypentaDummy", { MIRROR_MASTER_ANGLE: true }]
    }]
  };

  Class.shinyomegaMysticals.UPGRADES_TIER_0.push("shinyomegaSorcerer", "shinyomegasummoner", "shinyomegaenchantress", "shinyomegaexorcistor");
  Class.bosses.UPGRADES_TIER_0.push("shinyomegaMysticals");
  Class.mysticals.UPGRADES_TIER_0.push("apostal", "perseus", "dardanos", "concordia");
};