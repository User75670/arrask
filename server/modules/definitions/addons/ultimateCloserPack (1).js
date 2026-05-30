const { combineStats, makeAuto, makeHybrid, makeOver, makeDeco, makeGuard, makeBird, makeMulti, makeCeption, addAura } = require('../facilitators.js');
const { base, statnames, gunCalcNames, dfltskl, smshskl } = require('../constants.js');
const generics = require('../groups/generics.js');
const g = require('../gunvals.js');
const tanks = require('../groups/tanks.js');

 

module.exports = ({ Class }) => {

	// This addon is disabled by default.
	// You can also disable addons by not making them end with '.js'
	// If you want to enable, simply make the line below just not run.
	//return console.log('[exampleAddon.js] Addon disabled by default');

	let MAX_CHILDREN = 0,
		GUNS = [],
		TURRETS = [],

	alreadySeen = [],
	next = ['basic'],

	// We don't loop infinitely, because that's a bad idea if someone makes a circular upgrade path.
	// Also, RECURSION BAD. RECURSION BAD. RECURSION BAD. RECURSION BAD. RECURSION BAD. RECURSION BAD.
	limit = 1000;
	while (next.length && limit--) {
		let current = next;
		next = [];
		for (let i = 0; i < current.length; i++) {

			// Handle string definition references
			let now = current[i];
	        if ("string" == typeof now) {
	            if (!(now in Class)) throw Error(`Definition ${now} is attempted to be gotten but does not exist!`);
	            now = Class[now];
	        }

			// Handles tanks with multiple ways to upgrade to them, like Overgunner.
			if (alreadySeen.includes(now.LABEL)) continue;
			alreadySeen.push(now.LABEL);

			// Add guns, turrets and additional max child count to our current list of stuff for our abomination to have.
			if (now.MAX_CHILDREN) MAX_CHILDREN += now.MAX_CHILDREN;
			if (now.GUNS) GUNS.push(...now.GUNS);
			if (now.TURRETS) TURRETS.push(...now.TURRETS);

			// Add upgrades of current tank to next iteration
			for (let key of Object.keys(now)) if (key.startsWith('UPGRADES_TIER_')) next.push(...now[key]);
		}
	}
    Class.menu = {
		PARENT: ["genericTank"],
		LABEL: "",
		SKILL_CAP: [
			dfltskl,
			dfltskl,
			dfltskl,
			dfltskl,
			dfltskl,
			dfltskl,
			dfltskl,
			dfltskl,
			dfltskl,
			dfltskl,
		],
		IGNORED_BY_AI: true,
		TURRETS: [],
		GUNS: [
			{
				/*** LENGTH    WIDTH     ASPECT        X             Y         ANGLE     DELAY */
				POSITION: [18, 10, -1.4, 0, 0, 0, 0],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.basic]),
					TYPE: "bullet",
				},
			},
		],
	};

    Class.ACbody = {
		LABEL: "Unknown Class",
		ARENA_CLOSER: true,
		TYPE: "tank",
		DAMAGE_CLASS: 2,
		SKILL: [9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
		DANGER: 5,
		COLOR: 3,
		SNAPSIZE: true,
		MOTION_TYPE: "motor",
		FACING_TYPE: "toTarget",
		UPGRADE_COLOR: "gold",
		SIZE: 40,
		MAX_CHILDREN: 0,
		//CAN_BE_ON_LEADERBOARD: false,
		ACCEPTS_SCORE: false,
		DAMAGE_EFFECTS: false,
		BODY: {
		  // def
		  ACCELERATION: base.ACCEL,
		  SPEED: base.SPEED * 3,
		  HEALTH: base.HEALTH * 3000,
		  DAMAGE: base.DAMAGE * 5,
		  PENETRATION: base.PENETRATION,
		  SHIELD: base.SHIELD * 300,
		  REGEN: base.REGEN,
		  FOV: base.FOV * 2,
		  DENSITY: base.DENSITY,
		  PUSHABILITY: 0.4,
		  HETERO: 3,
		},
		GUNS: [],
		TURRETS: [],
		GIVE_KILL_MESSAGE: true,
		DRAW_HEALTH: true,
	  };
	  
	// ------------ ARENA CLOSERS -----------------
	
	  Class.ac = {
		PARENT: ["ACbody"],
		LABEL: "Arena Closer",
        UPGRADE_COLOR: "gold",
		GUNS: [
		  {
			/*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
			POSITION: [14, 10, 1, 0, 0, 0, 0],
			PROPERTIES: {
			  SHOOT_SETTINGS: combineStats([g.basic, { reload: 0.4, recoil: 0, health: 4, damage: 4, pen: 4, speed: 5, maxSpeed: 3, density: 5, spray: 2 }]),
			  TYPE: ["bullet", { ARENA_CLOSER: true }],
			},
		  },
		],
	  };
	  Class.ac_ception = makeCeption(Class.ac)
	  Class.babyac = {
		PARENT: ["genericTank"],
		LABEL: "Baby Arena Closer",
    UPGRADE_COLOR: "gold",
    ARENA_CLOSER: true,
		DAMAGE_CLASS: 2,
		SKILL: [9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
		DANGER: 3,
    TYPE: "tank",
		COLOR: 3,
		SNAPSIZE: true,
		MOTION_TYPE: "motor",
		FACING_TYPE: "toTarget",
		UPGRADE_COLOR: "gold",
		SIZE: 20,
		MAX_CHILDREN: 0,
		ACCEPTS_SCORE: false,
		DAMAGE_EFFECTS: false,
    GIVE_KILL_MESSAGE: true,
		DRAW_HEALTH: true,
    BODY: {
      ACCELERATION: base.ACCEL,
		  SPEED: base.SPEED * 2,
		  HEALTH: base.HEALTH * 6,
		  DAMAGE: base.DAMAGE * 2,
		  PENETRATION: base.PENETRATION,
		  SHIELD: base.SHIELD * 1,
		  REGEN: base.REGEN,
		  FOV: base.FOV * 2,
		  DENSITY: base.DENSITY,
		  PUSHABILITY: 0.4,
		  HETERO: 3,
    },
		GUNS: [
		  {
			/*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
			POSITION: [14, 10, 1, 0, 0, 0, 0],
			PROPERTIES: {
			  SHOOT_SETTINGS: combineStats([g.basic, { reload: 1, recoil: 0, health: 1.5, damage: 2, pen: 2, speed: 2, maxSpeed: 2, density: 5, spray: 2 }]),
			  TYPE: ["bullet", { ARENA_CLOSER: true }],
			},
		  },
		],
	  };
	  Class.flankac = {
		PARENT: ["ACbody"],
		LABEL: "Flank Closer",
        UPGRADE_COLOR: "gold",
		GUNS: [],
	  };
      for (let i = 0; i < 3; i++) {
        Class.flankac.GUNS.push(
            {
                /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [14, 10, 1, 0, 0, 120 * i, 0],
                PROPERTIES: {
                  SHOOT_SETTINGS: combineStats([g.basic, { reload: 0.4, recoil: 0, health: 4, damage: 4, pen: 4, speed: 5, maxSpeed: 3, density: 5, spray: 2 }]),
                  TYPE: ["bullet", { ARENA_CLOSER: true }],
                },
              },
        )
        
      }
      Class.sniperac = {
		PARENT: ["ACbody"],
		LABEL: "Sniper Closer",
        UPGRADE_COLOR: "gold",
		GUNS: [
		  {
			/*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
			POSITION: [27, 10, 1, 0, 0, 0, 0],
			PROPERTIES: {
			  SHOOT_SETTINGS: combineStats([g.basic, { reload: 0.4, recoil: 0, health: 4, damage: 4, pen: 4, speed: 5, maxSpeed: 3, density: 5, spray: 2 }, g.lessreload, g.veryfast]),
			  TYPE: ["bullet", { ARENA_CLOSER: true }],
			},
		  },
          {
			/*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
			POSITION: [10, 10, -1.7, 3, 0, 0, 0],
		  },
		],
	  };
	  Class.bigchungus = {
		PARENT: ["ACbody"],
		LABEL: "Big Chungus",
        UPGRADE_COLOR: "gold",
		GUNS: [
		  {
			/*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
			POSITION: [14 / 2, 2, 1, 0, 0, 0, 0],
			PROPERTIES: {
			  SHOOT_SETTINGS: combineStats([g.basic, { reload: 0.4, recoil: 0, health: 4, damage: 4, pen: 4, speed: 5, maxSpeed: 3, density: 5, spray: 2 }, g.doublereload]),
			  TYPE: ["bullet", { ARENA_CLOSER: true }],
			},
		  },
		],
	  };
	  Class.machac = {
		PARENT: ["ACbody"],
		LABEL: "Machine Closer",
        UPGRADE_COLOR: "gold",
		GUNS: [
		  {
			/*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
			POSITION: [12, 10, 1.4, 8, 0, 0, 0],
			PROPERTIES: {
			  SHOOT_SETTINGS: combineStats([g.basic, { reload: 0.4, recoil: 0, health: 4, damage: 4, pen: 4, speed: 5, maxSpeed: 3, density: 5, spray: 2 }]),
			  TYPE: ["bullet", { ARENA_CLOSER: true }],
			},
		  },
		],
	  };
	  Class.machac360 = {
		PARENT: ["ACbody"],
		LABEL: "360 Machine Closer",
        UPGRADE_COLOR: "gold",
		GUNS: [],
	  };
	  for (let i = 0; i < 50; i++) {
		Class.machac360.GUNS.push({
		  POSITION: [12, 10, 1.4, 8, 0, (360 / 50) * i, 0],
		  SHOOT_SETTINGS: combineStats([g.basic, { reload: 0.4, recoil: 0, health: 4, damage: 4, pen: 4, speed: 5, maxSpeed: 3, density: 5, spray: 2 }, g.mach]),
		  TYPE: ["bullet", { ARENA_CLOSER: true }],
		});
	  }
	
	  Class.hybridcloser = {
		PARENT: [Class.ACbody],
		LABEL: "Hybrid Closer",
        UPGRADE_COLOR: "gold",
		GUNS: [
		  {
			/*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
			POSITION: [18, 15, 1, 0, 0, 0, 0],
			PROPERTIES: {
			  SHOOT_SETTINGS: combineStats([g.basic, { reload: 0.4, recoil: 0, health: 4, damage: 4, pen: 4, speed: 5, maxSpeed: 3, density: 5, spray: 2 }, g.lessreload]),
			  TYPE: [Class.bullet, { ARENA_CLOSER: true }],
			},
		  },
		  {
			POSITION: [7, 12, 1.2, 8, 0, 180, 0],
			PROPERTIES: {
			  SHOOT_SETTINGS: combineStats([g.drone, g.over]),
			  TYPE: [Class.drone, { INDEPENDENT: true }],
			  AUTOFIRE: true,
			  SYNCS_SKILLS: true,
			  STAT_CALCULATOR: gunCalcNames.drone,
			  WAIT_TO_CYCLE: false,
			  MAX_CHILDREN: 10,
			},
		  },
		],
	  };

	  Class.omegacloser = {
      PARENT: [Class.ACbody],
      LABEL: "Omega Closer",
      UPGRADE_COLOR: "gold",
      SIZE: 75,
      BODY: {
        // def
        SPEED: base.SPEED * 3,
        HEALTH: base.HEALTH * 10000,
        SHIELD: base.SHIELD * 300,
        DAMAGE: base.DAMAGE * 5,
        DENSITY: base.DENSITY,
        PUSHABILITY: 0.4,
        HETERO: 3,
      },
      GUNS: [
        {
          /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
          POSITION: [14, 10, 1, 0, 0, 0, 0],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([
              g.basic,
              { reload: 0.4, recoil: 0, health: 4, damage: 4, pen: 4, speed: 5, maxSpeed: 3, density: 5, spray: 2 },
              g.morereload,
              g.fast,
            ]),
            TYPE: [Class.bullet, { ARENA_CLOSER: true }],
          },
        },
      ],
    };

	Class.smashac = {
		PARENT: [Class.ACbody],
		LABEL: "Smasher Closer",
        UPGRADE_COLOR: "gold",
		DANGER: 6,
		BODY: {
		  FOV: base.FOV * 2,
		  DENSITY: base.DENSITY * 2,
		  HEALTH: base.HEALTH * 1000,
		  SPEED: base.SPEED * 5,
		  ACCEL: base.ACCEL * 10,
		  DAMAGE: base.DAMAGE * 50
		},
		TURRETS: [
		  {
			/** SIZE     X       Y     ANGLE    ARC */
			POSITION: [23, 0, 0, 0, 360, 0],
			TYPE: Class.smasherBody,
		  },
		],
		IS_SMASHER: true,
		SKILL_CAP: [smshskl, 0, 0, 0, 0, smshskl, smshskl, smshskl, smshskl, smshskl],
		SKILL: [smshskl, 0, 0, 0, 0, smshskl, smshskl, smshskl, smshskl, smshskl],
		STAT_NAMES: statnames.smasher,
	  };

	  Class.minionac = {
		PARENT: [Class.genericTank],
		LABEL: "Minion",
		TYPE: "minion",
		DAMAGE_CLASS: 0,
		ARENA_CLOSER: true,
		HITS_OWN_TYPE: "hardWithBuffer",
		FACING_TYPE: "smoothToTarget",
		BODY: {
		  FOV: 2,
		  SPEED: 5,
		  ACCELERATION: 0.4,
		  HEALTH: 5,
		  SHIELD: 0,
		  DAMAGE: 1.2,
		  RESIST: 1,
		  PENETRATION: 1,
		  DENSITY: 0.4,
		},
		AI: {
		  BLIND: true,
		},
		DRAW_HEALTH: false,
		CLEAR_ON_MASTER_UPGRADE: true,
		GIVE_KILL_MESSAGE: false,
		CONTROLLERS: [
		  "nearestDifferentMaster",
		  "mapAltToFire",
		  "minion",
		  "canRepel",
		  "hangOutNearMaster",
		],
		//CONTROLLERS: ['nearestDifferentMaster'],
		GUNS: [
		  {
			/*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
			POSITION: [14, 10, 1, 0, 0, 0, 0],
			PROPERTIES: {
			  SHOOT_SETTINGS: combineStats([g.basic, { reload: 0.4, recoil: 0, health: 4, damage: 4, pen: 4, speed: 5, maxSpeed: 3, density: 5, spray: 2 }]),
			  TYPE: [Class.bullet, { ARENA_CLOSER: true }],
			},
		  },
		],
	  };

	  Class.factoryac = {
		PARENT: [Class.ACbody],
		LABEL: "Factory Closer",
        UPGRADE_COLOR: "gold",
		DANGER: 7,
		STAT_NAMES: statnames.drone,
		BODY: {
		  SPEED: base.SPEED * 2,
		  FOV: base.FOV * 2,
		},
		MAX_CHILDREN: 10,
		GUNS: [
		  {
			/**** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
			POSITION: [5, 15, 1, 10.5, 0, 0, 0],
		  },
		  {
			POSITION: [2, 17, 1, 15.5, 0, 0, 0],
			PROPERTIES: {
			  SHOOT_SETTINGS: combineStats([g.factory, g.morereload, g.morereload, g.morereload]),
			  TYPE: Class.minionac,
			  STAT_CALCULATOR: gunCalcNames.drone,
			  AUTOFIRE: true,
			  SYNCS_SKILLS: true,
			},
		  },
		  {
			POSITION: [7, 17, 1, 5, 0, 0, 0],
		  },
		],
	  };

	  Class.opdrone = {
		PARENT: ["drone"],
		BODY: {
		  PENETRATION: 5,
		  PUSHABILITY: 0.1,
		  ACCELERATION: 0.05,
		  HEALTH: 15,
		  DAMAGE: 15,
		  SPEED: 20,
		  RANGE: 200,
		  DENSITY: 0.03,
		  RESIST: 1.5,
		  FOV: 2,
		},
	  };

	  Class.overac = {
		PARENT: [Class.ACbody],
		LABEL: "Overcloser",
        UPGRADE_COLOR: "gold",
		DANGER: 7,
		STAT_NAMES: statnames.drone,
		BODY: {
		  ACCELERATION: base.ACCEL * 0.75,
		  SPEED: base.SPEED * 2,
		  FOV: base.FOV * 2,
		},
		MAX_CHILDREN: 16,
		GUNS: [],
	  };

	  for (let i = 0; i < 4; i++) {
		Class.overac.GUNS.push(
			{
				/*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
				POSITION: [6, 12, 1.2, 8, 0, 90*i, 0],
				PROPERTIES: {
				  SHOOT_SETTINGS: combineStats([g.drone, g.over, g.morereload, g.morereload, g.morereload]),
				  TYPE: Class.opdrone,
				  AUTOFIRE: true,
				  SYNCS_SKILLS: true,
				  STAT_CALCULATOR: gunCalcNames.drone,
				  WAIT_TO_CYCLE: true,
				},
			  },
		)
	  }

	  Class.bombac = {
		PARENT: [Class.bullet],
		LABEL: "Bomb",
		INDEPENDENT: true,
		FACING_TYPE: "turnWithSpeed",
		GUNS: [
		  {
			/*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
			POSITION: [14, 10, 1, 0, 0, 0, 0],
			PROPERTIES: {
			  SHOOT_SETTINGS: combineStats([g.basic, { reload: 0.4, recoil: 0, health: 4, damage: 4, pen: 4, speed: 5, maxSpeed: 3, density: 5, spray: 2 }, g.doublereload]),
			  TYPE: [Class.bullet, { PERSISTS_AFTER_DEATH: false }],
			  SHOOT_ON_DEATH: false,
			  AUTOFIRE: true,
			},
		  },
		],
	  };

	  Class.acThrower = {
		PARENT: [Class.ACbody],
		LABEL: "Arena Closer Thrower",
        UPGRADE_COLOR: "gold",
		GUNS: [
		  {
			/*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
			POSITION: [12, 13, -1.4, 4, 0, 0, 0],
			PROPERTIES: {
			  SHOOT_SETTINGS: combineStats([g.basic, g.halfreload, {health: 3, damage: 3, pen: 3}]),
			  TYPE: Class.bombac,
			},
		  },
		  {
			POSITION: [10, 0.5, -20, 5, 0, 0, 0],
		  },
		],
	  };

	  Class.redistbullet = {
		PARENT: "bullet",
		SHAPE: 6,
		TURRETS: [
			{
				/** SIZE     X       Y     ANGLE    ARC */
				POSITION: [18.5, 0, 0, 0, 360, 0],
				TYPE: "spikeBody",
			},
			{
				POSITION: [18.5, 0, 0, 90, 360, 0],
				TYPE: "spikeBody",
			},
			{
				POSITION: [18.5, 0, 0, 180, 360, 0],
				TYPE: "spikeBody",
			},
			{
				POSITION: [18.5, 0, 0, 270, 360, 0],
				TYPE: "spikeBody",
			},
		],
	  };

	  Class.redistcloser = {
		PARENT: [Class.ACbody],
		LABEL: "Redist Closer",
        UPGRADE_COLOR: "gold",
		GUNS: [
		  {
			POSITION: [8, 12.2, 1.3, 8.5, 0, 0, 0],
		  },
	  
		  {
			/*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
			POSITION: [18, 12.2, 1, 0, 0, 0, 0.15],
			PROPERTIES: {
			  SHOOT_SETTINGS: combineStats([
				g.basic,
				g.op,
				g.tonsmorrecoil,
				g.tonsmorrecoil,
				g.halfreload,
				g.halfreload,
				g.halfreload,
				{ size: 0.4 },
				g.slow,
				g.slow,
				{ reload: 0.4, recoil: 0, health: 4, damage: 4, pen: 4, speed: 5, maxSpeed: 3, density: 5, spray: 2 },
				{damage: 15, pen: 15},
			  ]),
			  TYPE: Class.redistbullet,
			},
		  },
		  {
			POSITION: [8, 12.2, -1.4, 4.8, 0, 0, 0],
		  },
		],
	  };

	  Class.lancercloser = {
		PARENT: [Class.ACbody],
		LABEL: "Lancer Closer",
        UPGRADE_COLOR: "gold",
		SKILL_CAP: [
		  dfltskl,
		  dfltskl,
		  dfltskl,
		  dfltskl,
		  0,
		  dfltskl,
		  dfltskl,
		  dfltskl,
		  dfltskl,
		  dfltskl,
		],
		BODY: {
		  SPEED: base.SPEED * 3,
		  DAMAGE: 3,
		  ACCEL: base.ACCEL + 4,
		  HEALTH: base.HEALTH * 1000,
		},
		GUNS: [
		  {
			POSITION: [20, 0.3, -55, 0, 0, 0, 0],
			PROPERTIES: {
			  AUTOFIRE: true,
			  SHOOT_SETTINGS: combineStats([[2, 0, 0.1, 1.3, 0.05, 50, 20, 0.7 * 3, 3, 0.05, 1, 45, 1]]),
	  
			  TYPE: [
				[Class.bullet, 
				//	{ALPHA: 0}
				],
				{
				  LABEL: "Lance",
				},
			  ],
			},
		  },
		  {
			POSITION: [25, 0.3, -55, 0, 0, 0, 0],
		  },
		],
	  };

	  Class.autoACgun = {
		PARENT: [Class.genericTank],
		LABEL: "",
		BODY: {
		  FOV: 3,
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
			POSITION: [14, 11, 1, 0, 0, 0, 0],
			PROPERTIES: {
			  SHOOT_SETTINGS: combineStats([g.basic, g.halfreload, { reload: 0.4, recoil: 0, health: 4, damage: 4, pen: 4, speed: 5, maxSpeed: 3, density: 5, spray: 2 }, g.five, g.morereload]),
			  TYPE: [Class.bullet, { ARENA_CLOSER: true }],
			},
		  },
		],
	  };

	  Class.auto5ac = {
		PARENT: [Class.ACbody],
		LABEL: "Auto-AC-5",
        UPGRADE_COLOR: "gold",
		DANGER: 7,
		FACING_TYPE: "autospin",
		TURRETS: [],
	  };

	  for (let i = 0; i < 5; i++) {
		Class.auto5ac.TURRETS.push(
			{
				/*  SIZE     X       Y     ANGLE    ARC */
				POSITION: [11, 8, 0, 72 * i, 190, 0],
				TYPE: Class.autoACgun,
			  },
		)
		
	  }

	  Class.pentacloser = {
		PARENT: [Class.ACbody],
		LABEL: "Penta Closer",
        UPGRADE_COLOR: "gold",
		GUNS: [
		  {
			/*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
			POSITION: [12, 8, 1, 0, -3, -30, 0.667],
			PROPERTIES: {
			  SHOOT_SETTINGS: combineStats([g.basic, { reload: 0.4, recoil: 0, health: 4, damage: 4, pen: 4, speed: 5, maxSpeed: 3, density: 5, spray: 2 }]),
			  TYPE: [Class.bullet, { ARENA_CLOSER: true }],
			},
		  },
		  {
			POSITION: [12, 8, 1, 0, 3, 30, 0.667],
			PROPERTIES: {
			  SHOOT_SETTINGS: combineStats([g.basic, { reload: 0.4, recoil: 0, health: 4, damage: 4, pen: 4, speed: 5, maxSpeed: 3, density: 5, spray: 2 }]),
			  TYPE: [Class.bullet, { ARENA_CLOSER: true }],
			},
		  },
		  {
			POSITION: [14, 8, 1, 0, -2, -15, 0.333],
			PROPERTIES: {
			  SHOOT_SETTINGS: combineStats([g.basic, { reload: 0.4, recoil: 0, health: 4, damage: 4, pen: 4, speed: 5, maxSpeed: 3, density: 5, spray: 2 }]),
			  TYPE: [Class.bullet, { ARENA_CLOSER: true }],
			},
		  },
		  {
			POSITION: [14, 8, 1, 0, 2, 15, 0.333],
			PROPERTIES: {
			  SHOOT_SETTINGS: combineStats([g.basic, { reload: 0.4, recoil: 0, health: 4, damage: 4, pen: 4, speed: 5, maxSpeed: 3, density: 5, spray: 2 }]),
			  TYPE: [Class.bullet, { ARENA_CLOSER: true }],
			},
		  },
		  {
			POSITION: [16, 8, 1, 0, 0, 0, 0],
			PROPERTIES: {
			  SHOOT_SETTINGS: combineStats([g.basic, { reload: 0.4, recoil: 0, health: 4, damage: 4, pen: 4, speed: 5, maxSpeed: 3, density: 5, spray: 2 }]),
			  TYPE: [Class.bullet, { ARENA_CLOSER: true }],
			},
		  },
		],
	  };

	  Class.gunnercloser = {
		PARENT: [Class.ACbody],
		LABEL: "Gunner Closer",
        UPGRADE_COLOR: "gold",
		GUNS: [
		  {
			/*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
			POSITION: [12, 3.5, 1, 0, 7.25, 0, 0.5],
			PROPERTIES: {
			  SHOOT_SETTINGS: combineStats([g.basic, { reload: 0.4, recoil: 0, health: 4, damage: 4, pen: 4, speed: 5, maxSpeed: 3, density: 5, spray: 2 }, g.fast]),
			  TYPE: [Class.bullet, { ARENA_CLOSER: true }],
			},
		  },
		  {
			POSITION: [12, 3.5, 1, 0, -7.25, 0, 0.75],
			PROPERTIES: {
			  SHOOT_SETTINGS: combineStats([g.basic, { reload: 0.4, recoil: 0, health: 4, damage: 4, pen: 4, speed: 5, maxSpeed: 3, density: 5, spray: 2 }, g.fast]),
			  TYPE: [Class.bullet, { ARENA_CLOSER: true }],
			},
		  },
		  {
			POSITION: [16, 3.5, 1, 0, 2.75, 0, 0],
			PROPERTIES: {
			  SHOOT_SETTINGS: combineStats([g.basic, { reload: 0.4, recoil: 0, health: 4, damage: 4, pen: 4, speed: 5, maxSpeed: 3, density: 5, spray: 2 }, g.fast]),
			  TYPE: [Class.bullet, { ARENA_CLOSER: true }],
			},
		  },
		  {
			POSITION: [16, 3.5, 1, 0, -2.75, 0, 0.25],
			PROPERTIES: {
			  SHOOT_SETTINGS: combineStats([g.basic, { reload: 0.4, recoil: 0, health: 4, damage: 4, pen: 4, speed: 5, maxSpeed: 3, density: 5, spray: 2 }, g.fast]),
			  TYPE: [Class.bullet, { ARENA_CLOSER: true }],
			},
		  },
		],
	  };

      Class.nailcloser = {
		PARENT: [Class.ACbody],
		LABEL: "Nailgun Closer",
        UPGRADE_COLOR: "gold",
		GUNS: [
            {
                /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [19, 2, 1, 0, -2.5, 0, 0.25],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([
                        g.basic, { reload: 0.4, recoil: 0, health: 4, damage: 4, pen: 4, speed: 5, maxSpeed: 3, density: 5, spray: 2 }, g.fast,  g.fast
                    ]),
                    TYPE: "bullet",
                },
            },
            {
                POSITION: [19, 2, 1, 0, 2.5, 0, 0.75],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([
                        g.basic, { reload: 0.4, recoil: 0, health: 4, damage: 4, pen: 4, speed: 5, maxSpeed: 3, density: 5, spray: 2 }, g.fast,  g.fast
                    ]),
                    TYPE: "bullet",
                },
            },
            {
                POSITION: [20, 2, 1, 0, 0, 0, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([
                        g.basic, { reload: 0.4, recoil: 0, health: 4, damage: 4, pen: 4, speed: 5, maxSpeed: 3, density: 5, spray: 2 }, g.fast, g.fast
                    ]),
                    TYPE: "bullet",
                },
            },
            {
                POSITION: [5.5, 7, -1.8, 6.5, 0, 0, 0],
            },
		],
	  };

	  Class.mechacloser = {
		PARENT: [Class.ACbody],
		LABEL: "Mecha Closer",
        UPGRADE_COLOR: "gold",
		TURRETS: [
		  {
			/*  SIZE     X       Y     ANGLE    ARC */
			POSITION: [11, 8, 0, 270, 360, 0],
			TYPE: Class.ac,
		  },
		  {
			POSITION: [11, 8, 0, 90, 360, 0],
			TYPE: Class.ac,
		  },
		  /* {
			POSITION: [11, 0, 0, 180, 360, 1],
			TYPE: [Class.ac,{CONTROLLERS: ["nearestDifferentMaster"], INDEPENDENT: true}]
		  } */
		],
		GUNS: [
		  {
			/*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
			POSITION: [14, 10, 1, 0, 0, 0, 0],
			PROPERTIES: {
			  SHOOT_SETTINGS: combineStats([g.basic, { reload: 0.4, recoil: 0, health: 4, damage: 4, pen: 4, speed: 5, maxSpeed: 3, density: 5, spray: 2 }]),
			  TYPE: [Class.bullet, { ARENA_CLOSER: true }],
			},
		  },
		],
	  };

	  Class.ssjhair = {
		LABEL: "",
		SHAPE: [[-0.6,2.53],[-0.77,1.92],[-0.73,1.455],[-1.24,1.9],[-0.95,1.005],[-1.4,1.18],[-1.27,0.74],[-0.974,0.51],[-1.1,0.296],[-1.15,-0.11],[-0.846,0.18],[-0.57,0.3],[-0.58,-0.18],[-0.38,0.2],[-0.01,0.36],[0.28,0.22],[0.54,-0.29],[0.69,0.1],[0.646,0.43],[0.9,0.284],[1.147,-0.08],[1.167,0.33],[1.02,0.51],[1.3,0.72],[1.5,1.055],[0.94,0.86],[1.32,1.31],[1.325,1.87],[0.81,1.45],[0.93,2.525],[0.374,1.814],[0.15,2.89],[-0.18,2.14],[-0.21,1.78],[-0.38,2.086]],
		INDEPENDENT: true,
	  };

	  Class.ssjacAura = addAura(2, 0.7, 0.08, "gold");

	  Class.ssjac = {
		PARENT: [Class.ACbody],
		LABEL: "Super Saiyan Closer",
        UPGRADE_COLOR: "gold",
		//CONTROLLERS: ['nearestDifferentMaster'],
		TURRETS: [
		  {
			  /** SIZE     X       Y     ANGLE    ARC */
			  POSITION: [22, 0, 0, 90, 0, 1],
			  TYPE: [Class.ssjhair,{COLOR: 13}],
			},
			],
			GUNS: [
				{
				  /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
				  POSITION: [14, 10, 1, 0, 0, 0, 0],
				  PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.basic, { reload: 0.4, recoil: 0, health: 4, damage: 4, pen: 4, speed: 5, maxSpeed: 3, density: 5, spray: 2 }]),
					TYPE: ["bullet", { ARENA_CLOSER: true }],
				  },
				},
			  ],
	  };
	  for (let i = 1; i < 20; i++) {
		Class.ssjac.TURRETS.push(
			{
				POSITION: [4*i/5, 0, 0, 0, 360, 0],
				TYPE: "ssjacAura",
			},
		)

        Class.ACmenu = {
            PARENT: ["menu"],
            LABEL: "Arena Closers",
            LEVEL: 45,
            COLOR: 3,
            UPGRADE_COLOR: "gold"
        };
  }


Class.ACmenu.UPGRADES_TIER_3 = ["ac", "ac_ception", "babyac", "machac", "flankac", "sniperac","hybridcloser", "bigchungus", "omegacloser", "smashac", "factoryac", "overac", "acThrower", "redistcloser", "auto5ac", "pentacloser","nailcloser", "gunnercloser", "mechacloser", "ssjac"]
Class.addons.UPGRADES_TIER_0.push("ACmenu");
}