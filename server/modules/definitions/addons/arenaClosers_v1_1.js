const { dereference, skillSet, combineStats } = require('../facilitators');
const g = require('../gunvals');

module.exports = ({ Class }) => {
    let lastTurretId = 0;
    const toArenaCloser = tank => {
        tank.ARENA_CLOSER = true;
        tank.ACCEPTS_SCORE = false;
        tank.LABEL += ' Arena Closer';
        tank.NAME = 'Arena Closer';
        tank.SIZE = 34;
        tank.LAYER = 13;
        tank.BODY = {
            REGEN: 1e5,
            HEALTH: 1e6,
            DENSITY: 30,
            DAMAGE: 1e5,
            FOV: 2,
            SPEED: 8,
        };
        tank.HITS_OWN_TYPE = 'never';
        tank.SKILL = skillSet({ rld: 1, dam: 1, pen: 1, str: 1, spd: 1, atk: 1, hlt: 1, shi: 1, rgn: 1, mob: 1 });
        tank.COLOR = 3;
        tank.DANGER = 10;
        tank.DRAW_HEALTH = false;
        const makeGuns = guns => guns.map(gun => {
            gun = dereference(gun);
            if (gun.PROPERTIES) {
                if (gun.PROPERTIES.TYPE) {
                    if (Array.isArray(gun.PROPERTIES.TYPE)) {
                        gun.PROPERTIES.TYPE.push({ LAYER: 12 });
                    } else {
                        gun.PROPERTIES.TYPE = [gun.PROPERTIES.TYPE, { LAYER: 12 }];
                    }
                }
                if (gun.PROPERTIES.SHOOT_SETTINGS) {
                    gun.PROPERTIES.SHOOT_SETTINGS = combineStats([g.arenaCloser, gun.PROPERTIES.SHOOT_SETTINGS]);
                }
            }
            return gun;
        })
        if (tank.GUNS) tank.GUNS = makeGuns(tank.GUNS);
        if (tank.TURRETS) {
            /**
             * some shit code cuz im lazy to fix this lol
             */
            const forTurret = e => {
                const newTurret = t => {
                    if (Array.isArray(t)) return t.map(newTurret);
                    if (typeof t == 'object') return t;
                    const turret = dereference(Class[t]);
                    const name = `OSA_CLOSER_TURRET_${++lastTurretId}`;
                    if (turret.GUNS) turret.GUNS = makeGuns(turret.GUNS);
                    if (turret.TURRETS) turret.TURRETS = turret.TURRETS.map(tu => forTurret(tu));
                    Class[name] = turret;
                    return name;
                }
                if (typeof e.TYPE == 'string') {
return Object.assign({}, e, {
                        TYPE: newTurret(e.TYPE)
                    });
                }
return Object.assign({}, e, {
    TYPE: newTurret(e.TYPE)
});

                console.log('no support for turret:', e);
                return e;
            }
            tank.TURRETS = tank.TURRETS.map(t => forTurret(t));
        }
        return tank;
    }

    const makeTree = tank => {
        const def = dereference(tank);
        const closer = toArenaCloser(def);
        const name = `OSA_CLOSER_${tank.LABEL.toUpperCase().replace(' ', '_').replace('-', '_')}`;
        for (let i = 0; i < 10; ++i) {
            const tier = `UPGRADES_TIER_${i}`;
            const upgrades = tank[tier];
            if (upgrades != null) {
                closer[tier] = upgrades.map(u => makeTree(Class[u]));
            }
        }
        Class[name] = closer;
        return name;
    }

    Class.addons.UPGRADES_TIER_0.push(makeTree(Class.basic));
}