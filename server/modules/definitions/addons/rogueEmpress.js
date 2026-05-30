const { combineStats, makeAuto} = require('../facilitators.js');
const { base, gunCalcNames, statnames } = require('../constants.js');
const g = require('../gunvals.js');

module.exports = ({ Class }) => {
// ROGUE EMPRESS
Class.autoSmasherDrone = {
    PARENT: ["drone"],
    LABEL: "Auto-Smasher Drone",
    COLOR: 18,
    DANGER: 6,
    SKILL_CAP: [12, 12, 12, 12, 12, 12, 12, 12, 12, 12],
    SKILL: [12, 12, 12, 12, 12, 12, 12, 12, 12, 12],
    BODY: {
      PUSHABILITY: 0.3,
      HEALTH: 0.25 * 5,
      DAMAGE: 3.265 / 5,
      SPEED: 2,
      DENSITY: 0.1,
      RESIST: 3,
      FOV: 100,
    },
    SHAPE: 0,
    GUNS: [],
    TURRETS: [{
      POSITION: [21.5, 0, 0, 0, 360, 0],
      TYPE: "smasherBody",
    },
      {
        POSITION: [11, 0, 0, 0, 360, 1],
        TYPE: ["auto4gun", {
          INDEPENDENT: true
        }],
      },
    ],
  }
  Class.rogueEmpressLowerBody = {
    PARENT: ["genericTank"],
    LABEL: "Rogue Empress Lower Body",
    CONTROLLERS: [
      ["spin", {
        independent: true,
        speed: -0.005
      }]
    ],
    FACING_TYPE: ["spin", {
      speed: -0.005
    }],
    COLOR: 17,
    SIZE: 100,
    SKILL_CAP: [12, 12, 12, 12, 12, 12, 12, 12, 12, 12],
    SKILL: [12, 12, 12, 12, 12, 12, 12, 12, 12, 12],
    SHAPE: 12,
    FOV: 10,
    MAX_CHILDREN: 12,
    GUNS: [],
  }
  for (let i = 0; i < 12; i++) {
    Class.rogueEmpressLowerBody.GUNS.push({
      POSITION: [2.5, 3, -1.8, 9, 0, 360 / 12 * i, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.factory, g.celeslower, g.pound, g.summoner, g.one_third_reload, g.halfreload, g.lessreload, g.one_third_reload, g.slow, g.one_third_reload, g.slow, g.halfreload, g.lessreload, g.lessreload, {
          size: 2.1
        }]),
        TYPE: ["autoSmasherDrone", {
          INDEPENDENT: true,
        }],
        AUTOFIRE: true,
        SYNCS_SKILLS: true,
      },
    }, )
  }
  Class.askshybridMissile = {
    PARENT: ["missile"],
    LABEL: "Auto-Smasher-Trap-Skimmer Hybrid Missile",
    HITS_OWN_TYPE: "never",
    DANGER: 6,
    COLOR: 18,
    SHAPE: 0,
    SKILL_CAP: [12, 12, 12, 12, 12, 12, 12, 12, 12, 12],
    SKILL: [12, 12, 12, 12, 12, 12, 12, 12, 12, 12],
    BODY: {
      FOV: 1.05 * base.FOV,
      DENSITY: 2 * base.DENSITY,
    },
    GUNS: [
      {
        POSITION: [4, 6, 1.6, 13, -2, 90, 0.5],
      },
      {
        POSITION: [4, 6, 1.6, 13, 2, -90, 0.5],
      },
        {
      POSITION: [14, 6, 1, 0, -2, 150, 0],
      PROPERTIES: {
        AUTOFIRE: true,
        SHOOT_SETTINGS: combineStats([
          g.basic,
          [3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        ]),
        TYPE: [
          "bullet",
          {
            PERSISTS_AFTER_DEATH: true,
          },
        ],
        STAT_CALCULATOR: gunCalcNames.thruster,
      },
    },
      {
        POSITION: [14, 6, 1, 0, 2, 210, 0],
        PROPERTIES: {
          AUTOFIRE: true,
          SHOOT_SETTINGS: combineStats([
            g.basic,
            [3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
          ]),
          TYPE: [
            "bullet",
            {
              PERSISTS_AFTER_DEATH: true,
            },
          ],
          STAT_CALCULATOR: gunCalcNames.thruster,
        },
      },
      {
        POSITION: [5, 7, 1, 9, -2, 90, 0],
        PROPERTIES: {
          AUTOFIRE: true,
          SHOOT_SETTINGS: combineStats([
            g.trap,
            g.halfrange,
            [3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
          ]),
          TYPE: [
            "trap",
            {
              PERSISTS_AFTER_DEATH: true,
            },
          ],
        },
      },
      {
        POSITION: [5, 7, 1, 9, 2, -90, 0],
        PROPERTIES: {
          AUTOFIRE: true,
          SHOOT_SETTINGS: combineStats([
            g.trap,
            g.halfrange,
            [3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
          ]),
          TYPE: [
            "trap",
            {
              PERSISTS_AFTER_DEATH: true,
            },
          ],
        },
      },
    ],
    TURRETS: [{
      POSITION: [21.5, 0, 0, 0, 360, 0],
      TYPE: "smasherBody",
    },
      {
        POSITION: [11, 0, 0, 0, 360, 1],
        TYPE: ["auto4gun", {
          INDEPENDENT: true
        }],
      },
    ],
  }
  Class.askshybridTurret = {
    PARENT: ["genericTank"],
    LABEL: "Triple-Auto-Smasher-Trap-Skimmer Hybrid Turret",
    BODY: {
      FOV: 10,
    },
    COLOR: 16,
    CONTROLLERS: [
      "canRepel",
      "onlyAcceptInArc",
      "mapAltToFire",
      "nearestDifferentMaster",
    ],
    GUNS: [{
      POSITION: [3, 10, 1.2, 15, 0, 0, 0],
    },
      {
        POSITION: [16, 18, -0.7, 0, 0, 0, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([
            g.basic,
            g.pound,
            g.arty,
            g.skim,
            g.morespeed,
            g.one_third_reload,
            g.lessreload,
            g.halfreload,
            g.one_third_reload,
            g.halfreload,
            g.lessreload,
            {
              range: 3
            },
          ]),
          TYPE: "askshybridMissile",
        },
      },
    ],
  };
  Class.rogueEmpressBottomBody = {
    PARENT: ["genericTank"],
    LABEL: "Rogue Empress Bottom Body",
    CONTROLLERS: [
      ["spin", {
        independent: true,
        speed: 0.005
      }]
    ],
    FACING_TYPE: ["spin", {
      speed: 0.005
    }],
    COLOR: 17,
    SIZE: 100,
    SKILL_CAP: [12, 12, 12, 12, 12, 12, 12, 12, 12, 12],
    SKILL: [12, 12, 12, 12, 12, 12, 12, 12, 12, 12],
    SHAPE: 9,
    FOV: 1,
    TURRETS: [],
  };
  for (let i = 0; i < 9; i++) {
    Class.rogueEmpressBottomBody.TURRETS.push({
      POSITION: [6.5, 9, 0, 360 / 9 * (i + 0.5), 160, 0],
      TYPE: ["askshybridTurret", {
        INDEPENDENT: true,
      }],
    }, )
  };
  Class.rogueEmpressMiddleBody = {
    PARENT: ["genericTank"],
    LABEL: "Rogue Empress Middle Body",
    CONTROLLERS: [
      ["spin", {
        independent: true,
        speed: -0.005
      }]
    ],
    FACING_TYPE: ["spin", {
      speed: -0.005
    }],
    COLOR: 17,
    SIZE: 100,
    SKILL_CAP: [12, 12, 12, 12, 12, 12, 12, 12, 12, 12],
    SKILL: [12, 12, 12, 12, 12, 12, 12, 12, 12, 12],
    SHAPE: 6,
    FOV: 1,
    TURRETS: [],
  };
  for (let i = 0; i < 6; i++) {
    Class.rogueEmpressMiddleBody.TURRETS.push({
      POSITION: [8.5, 9, 0, 360 / 6 * (i + 0.5), 160, 0],
      TYPE: ["guardGunner", {
        INDEPENDENT: true,
        COLOR: 16,
      }],
    }, )
  }
  Class.rogueAnni = {
    PARENT: ["miniboss"],
    LABEL: "Rogue Devastator",
    COLOR: 17,
    SHAPE: 6,
    SIZE: 30,
    VALUE: 5e5,
    FACING_TYPE: ["autospin"],
    AUTOSPIN: true,
    AUTOFIRE: true,
    CONTROLLERS: ['nearestDifferentMaster', 'onlyAcceptInArc'],
    BODY: {
      FOV: 1.4,
      SPEED: 0.05 * base.SPEED,
      HEALTH: 16 * base.HEALTH,
      SHIELD: 3 * base.SHIELD,
    },
    GUNS: [{
      POSITION: [4, 6, -1.6, 8, 0, 0, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.pound, g.destroy, g.destroy, g.anni, g.halfrecoil, g.lessreload, g.basic]),
        TYPE: ["bullet"],
        AUTOFIRE: true
      }
    },
      {
        POSITION: [4, 6, -1.6, 8, 0, 60, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.pound, g.destroy, g.destroy, g.anni, g.halfrecoil, g.lessreload, g.basic]),
          TYPE: ["bullet"],
          AUTOFIRE: true
        }
      },
      {
        POSITION: [4, 6, -1.6, 8, 0, 120, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.pound, g.destroy, g.destroy, g.anni, g.halfrecoil, g.lessreload, g.basic]),
          TYPE: ["bullet"],
          AUTOFIRE: true
        }
      },
      {
        POSITION: [4, 6, -1.6, 8, 0, 180, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.pound, g.destroy, g.destroy, g.anni, g.halfrecoil, g.lessreload, g.basic]),
          TYPE: ["bullet"],
          AUTOFIRE: true
        }
      },
      {
        POSITION: [4, 6, -1.6, 8, 0, 240, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.pound, g.destroy, g.destroy, g.anni, g.halfrecoil, g.lessreload, g.basic]),
          TYPE: ["bullet"],
          AUTOFIRE: true
        }
      },
      {
        POSITION: [4, 6, -1.6, 8, 0, 300, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.pound, g.destroy, g.destroy, g.anni, g.halfrecoil, g.lessreload, g.basic]),
          TYPE: ["bullet"],
          AUTOFIRE: true
        }
      },
      {
        POSITION: [11, 7, 0.6, 0, 0, 30, 0],
        PROPERTIES: {
          TYPE: "swarm",
          SHOOT_SETTINGS: combineStats([g.swarm, g.battle, g.carrier]),
          STAT_CALCULATOR: gunCalcNames.swarm,
          AUTOFIRE: true,
          SYNCS_SKILLS: true,
          WAIT_TO_CYCLE: true
        }
      },
      {
        POSITION: [11, 7, 0.6, 0, 0, 90, 0],
        PROPERTIES: {
          TYPE: "swarm",
          SHOOT_SETTINGS: combineStats([g.swarm, g.battle, g.carrier]),
          STAT_CALCULATOR: gunCalcNames.swarm,
          AUTOFIRE: true,
          SYNCS_SKILLS: true,
          WAIT_TO_CYCLE: true
        }
      },
      {
        POSITION: [11, 7, 0.6, 0, 0, 150, 0],
        PROPERTIES: {
          TYPE: "swarm",
          SHOOT_SETTINGS: combineStats([g.swarm, g.battle, g.carrier]),
          STAT_CALCULATOR: gunCalcNames.swarm,
          AUTOFIRE: true,
          SYNCS_SKILLS: true,
          WAIT_TO_CYCLE: true
        }
      },
      {
        POSITION: [11, 7, 0.6, 0, 0, 210, 0],
        PROPERTIES: {
          TYPE: "swarm",
          SHOOT_SETTINGS: combineStats([g.swarm, g.battle, g.carrier]),
          STAT_CALCULATOR: gunCalcNames.swarm,
          AUTOFIRE: true,
          SYNCS_SKILLS: true,
          WAIT_TO_CYCLE: true
        }
      },
      {
        POSITION: [11, 7, 0.6, 0, 0, 270, 0],
        PROPERTIES: {
          TYPE: "swarm",
          SHOOT_SETTINGS: combineStats([g.swarm, g.battle, g.carrier]),
          STAT_CALCULATOR: gunCalcNames.swarm,
          AUTOFIRE: true,
          SYNCS_SKILLS: true,
          WAIT_TO_CYCLE: true
        }
      },
      {
        POSITION: [11, 7, 0.6, 0, 0, 330, 0],
        PROPERTIES: {
          TYPE: "swarm",
          SHOOT_SETTINGS: combineStats([g.swarm, g.battle, g.carrier]),
          STAT_CALCULATOR: gunCalcNames.swarm,
          AUTOFIRE: true,
          SYNCS_SKILLS: true,
          WAIT_TO_CYCLE: true
        }
      },
    ],
  }
  Class.rogueEmpressPillbox = {
    PARENT: ["unsetTrap"],
    LABEL: "Rogue Empress Pillbox",
    BODY: {
      SPEED: 1,
      DENSITY: 5,
    },
    DIE_AT_RANGE: false,
    TURRETS: [{
      POSITION: [11, 0, 0, 0, 360, 1],
      TYPE: "legionaryTwin",
    }, ],
  }
  Class.assemblerDotRE = {
    LABEL: '',
    SHAPE: -4,
    COLOR: 16
  };
  Class.assemblerTrapRE = {
    PARENT: ['setTrap'],
    LABEL: "Assembler Trap",
    BODY: {
      SPEED: 0.7,
      ACCEL: 0.75
    },
    TURRETS: [
      {
        /**        SIZE X  Y  ANGLE ARC */
        POSITION: [4, 0, 0, 0,    360, 1],
        TYPE: 'assemblerDotRE'
      }
    ],
    HITS_OWN_TYPE: 'assembler'
  };
  Class.assemblerturret = {
    PARENT: ['genericTank'],
    DANGER: 7,
    LABEL: 'Assembler',
    STAT_NAMES: statnames.trap,
    BODY: {
      FOV: 2 * base.FOV,
      BULLET_SPEED: 1.1 * base.BULLET_SPEED,
    },
    AUTOFIRE: true,
    GUNS: [
      {
        POSITION: [18, 12, 1, 0, 0, 0, 0],
      },
      {
        POSITION: [2, 12, 1.1, 18, 0, 0, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.trap, g.block]),
          TYPE: 'assemblerTrapRE',
          MAX_CHILDREN: 8
        }
      }
    ],
    TURRETS: [
      {
        /**        SIZE X   Y  ANGLE ARC */
        POSITION: [2.5, 14, 0, 0,    360, 1],
        TYPE: 'assemblerDot'
      }
    ]
  };
  Class.rogueEmpressTopBody = {
    PARENT: ["genericTank"],
    LABEL: "Rogue Empress Top Body",
    SIZE: 100,
    COLOR: 17,
    MAX_CHILDREN: 5,
    SKILL_CAP: [12, 12, 12, 12, 12, 12, 12, 12, 12, 12],
    SKILL: [12, 12, 12, 12, 12, 12, 12, 12, 12, 12],
    SHAPE: 3,
    TURRETS: [],
    CONTROLLERS: [
      ["spin", {
        speed: 0.1,
      }]
    ],
    GUNS: [{
      POSITION: [5, 14, 1.6, 6, 0, 180, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.trap, g.block, g.pound, g.destroy, g.veryfast, g.mini, {
          maxSpeed: 3
        }]),
        TYPE: ["legionaryPillbox", {
          AUTOFIRE: true,
        }],
        STAT_CALCULATOR: gunCalcNames.trap,
      },
    },
      {
        POSITION: [5, 14, 1.6, 6, 0, -60, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.trap, g.block, g.pound, g.destroy, g.veryfast, g.mini, {
            maxSpeed: 3
          }]),
          TYPE: ["legionaryPillbox", {
            AUTOFIRE: true,
          }],
          STAT_CALCULATOR: gunCalcNames.trap,
        },
      },
      {
        POSITION: [5, 14, 1.6, 6, 0, 60, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.trap, g.block, g.pound, g.destroy, g.veryfast, g.mini, {
            maxSpeed: 3
          }]),
          TYPE: ["legionaryPillbox", {
            AUTOFIRE: true,
          }],
          STAT_CALCULATOR: gunCalcNames.trap,
        },
      },
      {
        POSITION: [5, 8, 1.6, 9, 0, 120, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.factory, g.summoner, g.minion, g.mega, g.noreload, g.one_third_reload, g.lessreload, g.lessreload, g.halfreload, g.lessreload, g.noreload, g.one_third_reload, g.lessreload, g.lessreload, g.halfreload, g.lessreload, g.noreload, g.one_third_reload, g.lessreload, g.lessreload, g.halfreload, g.lessreload, g.noreload, g.one_third_reload, g.lessreload, g.lessreload, g.halfreload, g.lessreload, g.noreload, g.one_third_reload, g.lessreload, g.lessreload, g.halfreload, g.lessreload, {
            SIZE: 45
          }]),
          TYPE: ["alviss", {
            INDEPENDENT: true,
          }],
        },
      },
      {
        POSITION: [5, 8, 1.6, 9, 0, 240, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.factory, g.summoner, g.minion, g.mega, g.noreload, g.one_third_reload, g.lessreload, g.lessreload, g.halfreload, g.lessreload, g.noreload, g.one_third_reload, g.lessreload, g.lessreload, g.halfreload, g.lessreload, g.noreload, g.one_third_reload, g.lessreload, g.lessreload, g.halfreload, g.lessreload, g.noreload, g.one_third_reload, g.lessreload, g.lessreload, g.halfreload, g.lessreload, g.noreload, g.one_third_reload, g.lessreload, g.lessreload, g.halfreload, g.lessreload, {
            SIZE: 45
          }]),
          TYPE: ["tyr", {
            INDEPENDENT: true,
          }],
        },
      },
      {
        POSITION: [5, 8, 1.6, 9, 0, 360, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.factory, g.summoner, g.minion, g.mega, g.noreload, g.one_third_reload, g.lessreload, g.lessreload, g.halfreload, g.lessreload, g.noreload, g.one_third_reload, g.lessreload, g.lessreload, g.halfreload, g.lessreload, g.noreload, g.one_third_reload, g.lessreload, g.lessreload, g.halfreload, g.lessreload, g.noreload, g.one_third_reload, g.lessreload, g.lessreload, g.halfreload, g.lessreload, g.noreload, g.one_third_reload, g.lessreload, g.lessreload, g.halfreload, g.lessreload, {
            SIZE: 45
          }]),
          TYPE: ["fiolnir", {
            INDEPENDENT: true,
          }],
        },
      },
      {
        POSITION: [5, 8, 1.6, 9, 0, 120, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.factory, g.summoner, g.minion, g.mega, g.noreload, g.one_third_reload, g.lessreload, g.lessreload, g.halfreload, g.lessreload, g.noreload, g.one_third_reload, g.lessreload, g.lessreload, g.halfreload, g.lessreload, g.noreload, g.one_third_reload, g.lessreload, g.lessreload, g.halfreload, g.lessreload, g.noreload, g.one_third_reload, g.lessreload, g.lessreload, g.halfreload, g.lessreload, g.noreload, g.one_third_reload, g.lessreload, g.lessreload, g.halfreload, g.lessreload, {
            SIZE: 28
          }]),
          TYPE: ["rogueArmada", {
            INDEPENDENT: true,
          }],
        },
      },
      {
        POSITION: [5, 8, 1.6, 9, 0, 240, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.factory, g.summoner, g.minion, g.mega, g.noreload, g.one_third_reload, g.lessreload, g.lessreload, g.halfreload, g.lessreload, g.noreload, g.one_third_reload, g.lessreload, g.lessreload, g.halfreload, g.lessreload, g.noreload, g.one_third_reload, g.lessreload, g.lessreload, g.halfreload, g.lessreload, g.noreload, g.one_third_reload, g.lessreload, g.lessreload, g.halfreload, g.lessreload, g.noreload, g.one_third_reload, g.lessreload, g.lessreload, g.halfreload, g.lessreload, {
            SIZE: 28
          }]),
          TYPE: ["roguePalisade", {
            INDEPENDENT: true,
          }],
        },
      },
    ],
  }
  for (let i = 0; i < 3; i++) {
    Class.rogueEmpressTopBody.TURRETS.push({
      POSITION: [16, 12, 0, 360 / 3 * (i + 0.5), 180, 0],
      TYPE: ["assemblerturret", {
      }],
    }, )
  }
  Class.rogueWarrior = {
    PARENT: ["genericTank"],
    LABEL: "Rogue Warrior",
    COLOR: 18,
    CONTROLLERS: [
      ["spin", {
        independent: true,
      }]
    ],
    SKILL_CAP: [12, 12, 12, 12, 12, 12, 12, 12, 12, 12],
    SKILL: [12, 12, 12, 12, 12, 12, 12, 12, 12, 12],
    GUNS: [],
    TURRETS: [],
  };
  for (let i = 0; i < 3; i++) {
    Class.rogueWarrior.GUNS.push({
      POSITION: [17, 8, 1, 0, 0, 120 * i, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.sniper, g.doublereload]),
        TYPE: "bullet",
      },
    }, {
      POSITION: [13, 8, 1, 0, 0, 120 * i + 60, 0],
    }, {
      POSITION: [4, 8, 1.7, 13, 0, 120 * i + 60, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.trap, g.doublereload, ]),
        TYPE: "trap",
        STAT_CALCULATOR: gunCalcNames.trap,
      },
    }, )
    Class.rogueWarrior.TURRETS.push({
      POSITION: [15, 0, 0, 0, 360, 1],
      TYPE: ["auto4gun"]
    }, )
  };
  Class.rogueEmpressBase = {
    PARENT: ["genericTank"],
    LABEL: "Rogue Empress Base",
    FACING_TYPE: "autospin",
    DANGER: 4,
    SHAPE: 12,
    COLOR: 17,
    SIZE: 150,
    SKILL_CAP: [12, 12, 12, 12, 12, 12, 12, 12, 12, 12],
    SKILL: [12, 12, 12, 12, 12, 12, 12, 12, 12, 12],
    BROADCAST_MESSAGE: "The Rogue Empress Has Fallen!",
    BODY: {
      SPEED: base.SPEED * 0.005,
    },
    TURRETS: [],
  }
  for (let i = 0; i < 12; i++) {
    Class.rogueEmpressBase.TURRETS.push({
      POSITION: [5, 8.5, 0, 360 / 12 * (i + 1), 30, 0],
      TYPE: ["baseTrapTurret", {
        INDEPENDENT: true,
      }],
    }, )
  }
  Class.rogueEmpress = {
    PARENT: ["eternal"],
    LABEL: "Rogue Empress",
    AI: {
      STRAFE: true,
    },
    NAME: "Supernova",
    FACING_TYPE: "autospin",
    DANGER: 50, //How dangerous it is according to AI
    SHAPE: 12,
    COLOR: 17,
    SIZE: 150,
    VALUE: 1e9,
    SKILL_CAP: [12, 12, 12, 12, 12, 12, 12, 12, 12, 12],
    SKILL: [12, 12, 12, 12, 12, 12, 12, 12, 12, 12],
    BROADCAST_MESSAGE: "The Rogue Empress Has Fallen!",
    BODY: {
      SPEED: base.SPEED * 0.005,
      HEALTH: base.HEALTH * 1.5,
    },
    TURRETS: [{
      POSITION: [15.5, 0, 0, 0, 360, 1],
      TYPE: ["rogueEmpressLowerBody"],
    },
      {
        POSITION: [11, 0, 0, 0, 360, 1],
        TYPE: ["rogueEmpressBottomBody"],
      },
      {
        POSITION: [6.5, 0, 0, 0, 360, 1],
        TYPE: ["rogueEmpressMiddleBody"],
      },
      {
        POSITION: [2, 0, 0, 0, 360, 1],
        TYPE: ["rogueEmpressTopBody"],
      },
      {
        POSITION: [0.6, 0, 0, 0, 360, 1],
        TYPE: ["rogueWarrior"],
      },
    ],
  };
  Class.guardGunner = {
    PARENT: ["guard"],
    LABEL: "Guard Gunner",
    UPGRADE_LABEL: "Guard Gunner",
    GUNS: [
      {
        POSITION: [18, 10, 1, 0, 5, 0, 0.5],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triple]),
          TYPE: "bullet",
        },
      },
      {
        POSITION: [18, 10, 1, 0, -5, 0, 0.5],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triple]),
          TYPE: "bullet",
        },
      },
      {
        POSITION: [17, 10, 1, 0, 5, 0, 0, 0.5],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triple]),
          TYPE: "bullet",
        },
      },
      {
        POSITION: [17, 10, 1, 0, -5, 0, 0, 0.5],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triple]),
          TYPE: "bullet",
        },
      },
      {
        POSITION: [16, 10, 1, 0, 5, 0, 1 / 4, 0.5],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triple]),
          TYPE: "bullet",
        },
      },
      {
        POSITION: [16, 10, 1, 0, -5, 0, 1 / 4, 0.5],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triple]),
          TYPE: "bullet",
        },
      },
      {
        POSITION: [15, 10, 1, 0, -5, 0, 3 / 4, 0.5],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triple]),
          TYPE: "bullet",
        },
      },
      {
        POSITION: [15, 10, 1, 0, 5, 0, 2 / 4, 0.5],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triple]),
          TYPE: "bullet",
        },
      },
      {
        POSITION: [14, 10, 1, 0, -5, 0, 2 / 4, 0.5],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triple]),
          TYPE: "bullet",
        },
      },
      {
        POSITION: [14, 10, 1, 0, 5, 0, 3 / 4, 0.5],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triple]),
          TYPE: "bullet",
        },
      },
      {
        POSITION: [19, 13.5, 1.2, 0, 0, 0, 0,],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triple, g.mach]),
          TYPE: "bullet",
        },
      },
      {
        POSITION: [21, 11.5, 1.2, 0, 0, 0, 2 / 3],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triple, g.mach]),
          TYPE: "bullet",
        },
      },
      {
        POSITION: [23, 10, 1.2, 0, 0, 0, 1 / 3],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triple, g.mach]),
          TYPE: "bullet",
        },
      },
    ],
  };
  Class.guard = {
    PARENT: ["genericTank"],
    LABEL: "Guard",
    DANGER: 10,
    COLOR: "gold",
    SHAPE: 9,
    SIZE: 15,
    SKILL: [9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
    SKILL_CAP: [9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
    HAS_NO_RECOIL: true,
    VALUE: 1e5,
    VARIES_IN_SIZE: true,
    CONTROLLERS: ["nearestDifferentMaster", "mapTargetToGoal"],
    AI: {
      NO_LEAD: true,
      STRAFE: true,
    },
    BODY: {
      FOV: 0.8,
      ACCELERATION: 0.8,
      DAMAGE: base.DAMAGE,
      HEALTH: 0.8 * base.HEALTH,
      SPEED: 0.45 * base.SPEED,
    },
    MOTION_TYPE: "motor",
    FACING_TYPE: "smoothToTarget",
    HITS_OWN_TYPE: "hard",
    HAS_NO_MASTER: true,
    DRAW_HEALTH: true,
    GIVE_KILL_MESSAGE: true,
  };
  Class.alvissDrone = {
    PARENT: ["eggchip"],
    NECRO: false,
};
Class.launcherTurret = {
    PARENT: ["genericTank"],
    LABEL: "Launcher",
    BODY: {
        FOV: 2 * base.FOV,
    },
    COLOR: 16,
    CONTROLLERS: [
        "canRepel",
        "onlyAcceptInArc",
        "mapAltToFire",
        "nearestDifferentMaster",
    ],
    GUNS: [
        {
            /*** LENGTH    WIDTH     ASPECT        X             Y         ANGLE     DELAY */
            POSITION: [10, 9, 1, 9, 0, 0, 0],
        },
        {
            POSITION: [17, 13, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.arty, g.arty]),
                TYPE: "minimissile",
                STAT_CALCULATOR: gunCalcNames.sustained,
            },
        },
    ],
};
Class.alvissLowerTurret = {
    PARENT: ["genericTank"],
    LABEL: "",
    MAX_CHILDREN: 3,
    BODY: {
        FOV: 2,
    },
    CONTROLLERS: [
        "canRepel",
        "onlyAcceptInArc",
        "mapAltToFire",
        "nearestDifferentMaster",
    ],
    COLOR: 16,
    GUNS: [
        {
            /*** LENGTH    WIDTH     ASPECT        X             Y         ANGLE     DELAY */
            POSITION: [8.5, 11, 0.6, 6, 0, 0, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm, g.sunchip]),
                TYPE: "alvissDrone",
                STAT_CALCULATOR: gunCalcNames.swarm,
            },
        },
    ],
};
Class.alvissLowerBody = {
    LABEL: "",
    CONTROLLERS: [["spin", { independent: true, speed: -0.05 }]],
    COLOR: 17,
    SIZE: 100,
    SKILL: [9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
    SHAPE: 7,
    FOV: 1,
    FACING_TYPE: "autospin",
    MAX_CHILDREN: 24,
    TURRETS: [
        {
            //*********    SIZE         X             Y         ANGLE        ARC
            POSITION: [8.5, 9, 0, 26, 180, 0],
            TYPE: ["alvissLowerTurret"],
        },
        {
            POSITION: [8.5, 9, 0, 77, 180, 0],
            TYPE: ["alvissLowerTurret"],
        },
        {
            POSITION: [8.5, 9, 0, 129, 180, 0],
            TYPE: ["alvissLowerTurret"],
        },
        {
            POSITION: [8.5, 9, 0, 180, 180, 0],
            TYPE: ["alvissLowerTurret"],
        },
        {
            POSITION: [8.5, 9, 0, 231, 180, 0],
            TYPE: ["alvissLowerTurret"],
        },
        {
            POSITION: [8.5, 9, 0, 282, 180, 0],
            TYPE: ["alvissLowerTurret"],
        },
        {
            POSITION: [8.5, 9, 0, 333, 180, 0],
            TYPE: ["alvissLowerTurret"],
        },
    ],
};
Class.alvissUpperBody = {
    LABEL: "",
    CONTROLLERS: [["spin", { independent: true, speed: 0.05 }]],
    COLOR: 17,
    SIZE: 100,
    SKILL: [9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
    MAX_CHILDREN: 28,
    SHAPE: 5,
    INDEPENDENT: true,
    TURRETS: [
        {
            //**     SIZE         X             Y         ANGLE        ARC
            POSITION: [10.6, 7.5, 0, 35, 160, 0],
            TYPE: ["launcherTurret"],
        },
        {
            POSITION: [10.6, 7.5, 0, 110, 160, 0],
            TYPE: ["launcherTurret"],
        },
        {
            POSITION: [10.6, 7.5, 0, 180, 160, 0],
            TYPE: ["launcherTurret"],
        },
        {
            POSITION: [10.6, 7.5, 0, 252, 160, 0],
            TYPE: ["launcherTurret"],
        },
        {
            POSITION: [10.6, 7.5, 0, 325, 160, 0],
            TYPE: ["launcherTurret"],
        },
    ],
};
Class.alviss = {
    PARENT: ["rogueCelestial"],
    NAME: "Alviss",
    UPGRADE_LABEL: "Alviss",
    UPGRADE_COLOR: "darkGrey",
    TURRETS: [
        {
            /*********    SIZE         X             Y         ANGLE        ARC */
            POSITION: [6.5, 9, 0, 260, 180, 0],
            TYPE: ["baseTrapTurret", { INDEPENDENT: true }],
        },
        {
            POSITION: [6.5, 9, 0, 219, 180, 0],
            TYPE: ["baseTrapTurret", { INDEPENDENT: true }],
        },
        {
            POSITION: [6.5, 9, 0, 180, 180, 0],
            TYPE: ["baseTrapTurret", { INDEPENDENT: true }],
        },
        {
            POSITION: [6.5, 9, 0, 300, 180, 0],
            TYPE: ["baseTrapTurret", { INDEPENDENT: true }],
        },
        {
            POSITION: [6.5, 9, 0, 339, 180, 0],
            TYPE: ["baseTrapTurret", { INDEPENDENT: true }],
        },
        {
            POSITION: [6.5, 9, 0, 380, 180, 0],
            TYPE: ["baseTrapTurret", { INDEPENDENT: true }],
        },
        {
            POSITION: [6.5, 9, 0, 420, 180, 0],
            TYPE: ["baseTrapTurret", { INDEPENDENT: true }],
        },
        {
            POSITION: [6.5, 9, 0, 459, 180, 0],
            TYPE: ["baseTrapTurret", { INDEPENDENT: true }],
        },
        {
            POSITION: [6.5, 9, 0, 500, 180, 0],
            TYPE: ["baseTrapTurret", { INDEPENDENT: true }],
        },
        {
            POSITION: [14.94, 0, 0, 0, 360, 1],
            TYPE: ["alvissLowerBody"],
        },
        {
            POSITION: [8.6, 0, 0, 0, 360, 1],
            TYPE: ["alvissUpperBody"],
        },
    ],
};

Class.tinyTyrMinion = {
    PARENT: ["minion"],
    LABEL: "Tiny Minion",
    ACCEPTS_SCORE: false,
    SHAPE: 0,
    MOTION_TYPE: 'swarm',
    CRAVES_ATTENTION: true,
    BODY: {
        ACCELERATION: 3,
        PENETRATION: 1.5,
        HEALTH: 0.35 * 0.5,
        DAMAGE: 2.25,
        RESIST: 1.6,
        RANGE: 300,
        DENSITY: 12,
        PUSHABILITY: 0.5,
        FOV: 1.5,
    },
    AI: {
        BLIND: true,
    },
    GUNS: [ { /*** LENGTH    WIDTH     ASPECT        X             Y         ANGLE     DELAY */
        POSITION: [    17,         9,            1,            0,            0,            0,            0,     ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.minion, g.lowpower]),
            WAIT_TO_CYCLE: true,
            TYPE: "bullet",
        }, }, 
    ],
    DIE_AT_RANGE: true,
    BUFF_VS_FOOD: true,
};
Class.tyrLowerTurret = {
    PARENT: ["genericTank"],
    LABEL: "",
    MAX_CHILDREN: 4,
    BODY: {
        FOV: 2,
    },
    CONTROLLERS: [
        "canRepel",
        "onlyAcceptInArc",
        "mapAltToFire",
        "nearestDifferentMaster",
    ],
    COLOR: 16,
    GUNS: [
        {
            /*** LENGTH    WIDTH     ASPECT        X             Y         ANGLE     DELAY */
            POSITION: [8.5, 11, 0.6, 6, 0, 0, 0.5],
        },
        {
            POSITION: [3.4, 14, 1, 14.3, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm, g.babyfactory, g.lessreload]),
                TYPE: ["tinyTyrMinion", {INDEPENDENT: true,}],
                AUTOFIRE: true,
                SYNCS_SKILLS: true,
            },
        },
    ],
};
Class.tyrLowerBody = {
    LABEL: "",
    CONTROLLERS: [["spin", { independent: true, speed: -0.05 }]],
    COLOR: 17,
    SIZE: 100,
    SKILL: [9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
    SHAPE: 7,
    FOV: 1,
    FACING_TYPE: "autospin",
    MAX_CHILDREN: 23,
    TURRETS: [{ //*********    SIZE         X             Y         ANGLE        ARC
        POSITION: [8.5, 9, 0, 26, 180, 0],
        TYPE: ["tyrLowerTurret"],
    },{
        POSITION: [8.5, 9, 0, 77, 180, 0],
        TYPE: ["tyrLowerTurret"],
    },{
        POSITION: [8.5, 9, 0, 129, 180, 0],
        TYPE: ["tyrLowerTurret"],
    },{
        POSITION: [8.5, 9, 0, 180, 180, 0],
        TYPE: ["tyrLowerTurret"],
    },{
        POSITION: [8.5, 9, 0, 231, 180, 0],
        TYPE: ["tyrLowerTurret"],
    },{
        POSITION: [8.5, 9, 0, 282, 180, 0],
        TYPE: ["tyrLowerTurret"],
    },{
        POSITION: [8.5, 9, 0, 333, 180, 0],
        TYPE: ["tyrLowerTurret"],
    }]
};
Class.tyrUpperBody = {
    LABEL: "",
    CONTROLLERS: [["spin", { independent: true, speed: 0.05 }]],
    COLOR: 17,
    SIZE: 100,
    SKILL: [9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
    MAX_CHILDREN: 28,
    SHAPE: 5,
    INDEPENDENT: true,
    TURRETS: [{ //**     SIZE         X             Y         ANGLE        ARC
        POSITION: [10.6, 7.5, 0, 35, 160, 0],
        TYPE: ["auto4gun"],
    },{
        POSITION: [10.6, 7.5, 0, 110, 160, 0],
        TYPE: ["auto4gun"],
    },{
        POSITION: [10.6, 7.5, 0, 180, 160, 0],
        TYPE: ["auto4gun"],
    },{
        POSITION: [10.6, 7.5, 0, 252, 160, 0],
        TYPE: ["auto4gun"],
    },{
        POSITION: [10.6, 7.5, 0, 325, 160, 0],
        TYPE: ["auto4gun"],
    }]
};
Class.tyr = {
    PARENT: ["rogueCelestial"],
    NAME: "Tyr",
    UPGRADE_LABEL: "Tyr",
    UPGRADE_COLOR: "darkGrey",
    TURRETS: [{ /*********    SIZE         X             Y         ANGLE        ARC */
        POSITION: [6.5, 9, 0, 260, 180, 0],
        TYPE: ["baseTrapTurret", { INDEPENDENT: true }],
    },{
        POSITION: [6.5, 9, 0, 219, 180, 0],
        TYPE: ["baseTrapTurret", { INDEPENDENT: true }],
    },{
        POSITION: [6.5, 9, 0, 180, 180, 0],
        TYPE: ["baseTrapTurret", { INDEPENDENT: true }],
    },{
        POSITION: [6.5, 9, 0, 300, 180, 0],
        TYPE: ["baseTrapTurret", { INDEPENDENT: true }],
    },{
        POSITION: [6.5, 9, 0, 339, 180, 0],
        TYPE: ["baseTrapTurret", { INDEPENDENT: true }],
    },{
        POSITION: [6.5, 9, 0, 380, 180, 0],
        TYPE: ["baseTrapTurret", { INDEPENDENT: true }],
    },{
        POSITION: [6.5, 9, 0, 420, 180, 0],
        TYPE: ["baseTrapTurret", { INDEPENDENT: true }],
    },{
        POSITION: [6.5, 9, 0, 459, 180, 0],
        TYPE: ["baseTrapTurret", { INDEPENDENT: true }],
    },{
        POSITION: [6.5, 9, 0, 500, 180, 0],
        TYPE: ["baseTrapTurret", { INDEPENDENT: true }],
    },{
        POSITION: [14.94, 0, 0, 0, 360, 1],
        TYPE: ["tyrLowerBody"],
    },{
        POSITION: [8.6, 0, 0, 0, 360, 1],
        TYPE: ["tyrUpperBody"],
    }]
};

Class.fiolnirLowerTurret = {
    PARENT: ["genericTank"],
    LABEL: "",
    BODY: {
        FOV: 2,
    },
    CONTROLLERS: [
        "canRepel",
        "onlyAcceptInArc",
        "mapAltToFire",
        "nearestDifferentMaster",
    ],
    COLOR: 16,
    GUNS: [
        {
            POSITION: [7, 8, 0.6, 6, 0, 30, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm, g.bees, g.pound, g.morespeed]),
                TYPE: ["bee", { INDEPENDENT: true }],
                STAT_CALCULATOR: gunCalcNames.swarm,
            },
        },
        {
            POSITION: [7, 8, 0.6, 6, 0, -30, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm, g.bees, g.pound, g.morespeed]),
                TYPE: ["bee", { INDEPENDENT: true }],
                STAT_CALCULATOR: gunCalcNames.swarm,
            },
        },
    ],
};
Class.fiolnirLowerBody = {
    LABEL: "",
    CONTROLLERS: [["spin", { independent: true, speed: -0.05 }]],
    COLOR: 17,
    SIZE: 100,
    SKILL: [9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
    SHAPE: 7,
    FOV: 1,
    FACING_TYPE: "autospin",
    MAX_CHILDREN: 23,
    TURRETS: [{ //*********    SIZE         X             Y         ANGLE        ARC
        POSITION: [8.5, 9, 0, 26, 180, 0],
        TYPE: ["fiolnirLowerTurret"],
    },{
        POSITION: [8.5, 9, 0, 77, 180, 0],
        TYPE: ["fiolnirLowerTurret"],
    },{
        POSITION: [8.5, 9, 0, 129, 180, 0],
        TYPE: ["fiolnirLowerTurret"],
    },{
        POSITION: [8.5, 9, 0, 180, 180, 0],
        TYPE: ["fiolnirLowerTurret"],
    },{
        POSITION: [8.5, 9, 0, 231, 180, 0],
        TYPE: ["fiolnirLowerTurret"],
    },{
        POSITION: [8.5, 9, 0, 282, 180, 0],
        TYPE: ["fiolnirLowerTurret"],
    },{
        POSITION: [8.5, 9, 0, 333, 180, 0],
        TYPE: ["fiolnirLowerTurret"],
    }]
};
Class.turretedBullet = makeAuto(Class.bullet, "Auto-Bullet", {size: 14, color: 6, angle: 0});
Class.fiolnirUpperTurret = {
    PARENT: ["genericTank"],
    LABEL: "",
    BODY: {
        FOV: 2,
    },
    CONTROLLERS: [
        "canRepel",
        "onlyAcceptInArc",
        "mapAltToFire",
        "nearestDifferentMaster",
    ],
    COLOR: 16,
    GUNS: [
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [12, 16, -0.6, 0, 0, 0, 0],
        },
        {
            POSITION: [15, 12, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.bitlessspeed]),
                TYPE: ["turretedBullet", {COLOR: 6}],
            },
        },
    ],
};
Class.fiolnirUpperBody = {
    LABEL: "",
    CONTROLLERS: [["spin", { independent: true, speed: 0.05 }]],
    COLOR: 17,
    SIZE: 100,
    SKILL: [9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
    MAX_CHILDREN: 28,
    SHAPE: 5,
    INDEPENDENT: true,
    TURRETS: [{ //**     SIZE         X             Y         ANGLE        ARC
        POSITION: [10.6, 7.5, 0, 35, 160, 0],
        TYPE: ["fiolnirUpperTurret"],
    },{
        POSITION: [10.6, 7.5, 0, 110, 160, 0],
        TYPE: ["fiolnirUpperTurret"],
    },{
        POSITION: [10.6, 7.5, 0, 180, 160, 0],
        TYPE: ["fiolnirUpperTurret"],
    },{
        POSITION: [10.6, 7.5, 0, 252, 160, 0],
        TYPE: ["fiolnirUpperTurret"],
    },{
        POSITION: [10.6, 7.5, 0, 325, 160, 0],
        TYPE: ["fiolnirUpperTurret"],
    }]
};
Class.fiolnir = {
    PARENT: ["rogueCelestial"],
    NAME: "Fiolnir",
    UPGRADE_LABEL: "Fiolnir",
    UPGRADE_COLOR: "darkGrey",
    TURRETS: [{ /*********    SIZE         X             Y         ANGLE        ARC */
        POSITION: [6.5, 9, 0, 260, 180, 0],
        TYPE: ["baseTrapTurret", { INDEPENDENT: true }],
    },{
        POSITION: [6.5, 9, 0, 219, 180, 0],
        TYPE: ["baseTrapTurret", { INDEPENDENT: true }],
    },{
        POSITION: [6.5, 9, 0, 180, 180, 0],
        TYPE: ["baseTrapTurret", { INDEPENDENT: true }],
    },{
        POSITION: [6.5, 9, 0, 300, 180, 0],
        TYPE: ["baseTrapTurret", { INDEPENDENT: true }],
    },{
        POSITION: [6.5, 9, 0, 339, 180, 0],
        TYPE: ["baseTrapTurret", { INDEPENDENT: true }],
    },{
        POSITION: [6.5, 9, 0, 380, 180, 0],
        TYPE: ["baseTrapTurret", { INDEPENDENT: true }],
    },{
        POSITION: [6.5, 9, 0, 420, 180, 0],
        TYPE: ["baseTrapTurret", { INDEPENDENT: true }],
    },{
        POSITION: [6.5, 9, 0, 459, 180, 0],
        TYPE: ["baseTrapTurret", { INDEPENDENT: true }],
    },{
        POSITION: [6.5, 9, 0, 500, 180, 0],
        TYPE: ["baseTrapTurret", { INDEPENDENT: true }],
    },{
        POSITION: [14.5, 0, 0, 0, 360, 1],
        TYPE: ["fiolnirLowerBody"],
    },{
        POSITION: [8.6, 0, 0, 0, 360, 1],
        TYPE: ["fiolnirUpperBody"],
    }]
};


  for (let i = 0; i < 12; i++) {
    Class.rogueEmpress.TURRETS.push({
      POSITION: [5, 8.5, 0, 360 / 12 * (i + 1), 30, 0],
      TYPE: ["baseTrapTurret", {
        INDEPENDENT: true,
      }],
    }, )
  }
};