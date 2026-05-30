const { combineStats, addAura, makeAuto } = require('../facilitators.js');
const { gunCalcNames, smshskl, base } = require('../constants.js');
const g = require('../gunvals.js');
const ensureIsClass = (Class, str) => {
    if ("object" == typeof str) {
        return str;
    }
    if (str in Class) {
        return Class[str];
    }
    throw Error(`Definition ${str} is attempted to be gotten but does not exist!`);
};
/*
████████╗██╗░░██╗██╗░██████╗  ░█████╗░██████╗░██████╗░░█████╗░███╗░░██╗  ███╗░░░███╗░█████╗░██████╗░███████╗
╚══██╔══╝██║░░██║██║██╔════╝  ██╔══██╗██╔══██╗██╔══██╗██╔══██╗████╗░██║  ████╗░████║██╔══██╗██╔══██╗██╔════╝
░░░██║░░░███████║██║╚█████╗░  ███████║██║░░██║██║░░██║██║░░██║██╔██╗██║  ██╔████╔██║███████║██║░░██║█████╗░░
░░░██║░░░██╔══██║██║░╚═══██╗  ██╔══██║██║░░██║██║░░██║██║░░██║██║╚████║  ██║╚██╔╝██║██╔══██║██║░░██║██╔══╝░░
░░░██║░░░██║░░██║██║██████╔╝  ██║░░██║██████╔╝██████╔╝╚█████╔╝██║░╚███║  ██║░╚═╝░██║██║░░██║██████╔╝███████╗
░░░╚═╝░░░╚═╝░░╚═╝╚═╝╚═════╝░  ╚═╝░░╚═╝╚═════╝░╚═════╝░░╚════╝░╚═╝░░╚══╝  ╚═╝░░░░░╚═╝╚═╝░░╚═╝╚═════╝░╚══════╝

██████╗░██╗░░░██╗  ░█████╗░░█████╗░███╗░░██╗██╗░░██╗░█████╗░
██╔══██╗╚██╗░██╔╝  ██╔══██╗██╔══██╗████╗░██║╚██╗██╔╝██╔══██╗
██████╦╝░╚████╔╝░  ██║░░╚═╝███████║██╔██╗██║░╚███╔╝░███████║
██╔══██╗░░╚██╔╝░░  ██║░░██╗██╔══██║██║╚████║░██╔██╗░██╔══██║
██████╦╝░░░██║░░░  ╚█████╔╝██║░░██║██║░╚███║██╔╝╚██╗██║░░██║
╚═════╝░░░░╚═╝░░░  ░╚════╝░╚═╝░░╚═╝╚═╝░░╚══╝╚═╝░░╚═╝╚═╝░░╚═╝
*/


module.exports = ({ Class, Config }) => {
// 1 for OG hp, 0.1 for nerfed (0.05 defualt)
const ThreeDHealthMutli = 0.05
// 1 for OG value, 0.25 for nerfed (0.25 defualt)
const ThreeDValueMutli = 0.25
Class.cnxMore3D = {
    PARENT: ["menu"],
    LABEL: "canxA's More 3D Polygons Addon",
};
Class.cnxPlatonicSolids = {
    PARENT: ["menu"],
    LABEL: "Platonic Solids",
};
Class.cnxArchimedeanSolids = {
    PARENT: ["menu"],
    LABEL: "Archimedean Solids",
};
Class.cnxTruncatedSolids = {
    PARENT: ["menu"],
    LABEL: "Truncated Solids",
};
Class.cnxIrregularSolids = {
    PARENT: ["menu"],
    LABEL: "Irregular Solids",
};
Class.cnxMiscSolids = {
    PARENT: ["menu"],
    LABEL: "Misc Solids",
};
Class.cnxHosohedraSolids = {
    PARENT: ["menu"],
    LABEL: "Hosohedral Solids",
};
Class.cnxPyramidSolids = {
    PARENT: ["menu"],
    LABEL: "Pyramid Solids",
};
Class.cnxCatalanSolids = {
    PARENT: ["menu"],
    LABEL: "Catalan Solids",
};
Class.cnxTriakisSolids = {
    PARENT: ["menu"],
    LABEL: "Triakis Solids",
};
let makeGenerator = (type, size = 10) => ({
    PARENT: "spectator",
    LABEL: type.LABEL + " Generator",
    SKILL_CAP: [31, 0, 0, 0, 0, 0, 0, 0, 0, 31],
    TURRETS: [
        {
            POSITION: [size, 0, 0, 0, 360, 1],
            TYPE: [type, { MIRROR_MASTER_ANGLE: true }],
        },
    ],
    UPGRADES_TIER_0: ["cnxMore3D"],
    GUNS: [
        {
            POSITION: [14, 12, 1, 4, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.fake]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [12, 12, 1.4, 4, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, {recoil: 0}]),
                INDEPENDENT_CHILDREN: true,
                TYPE: type,
            },
        }
    ],
});

Class.threeDFood = {
    TYPE: "food",
    DAMAGE_CLASS: 1,
    LEVEL_CAP: 1,
    CONTROLLERS: ["moveInCircles"],
    HITS_OWN_TYPE: "repel",
    MOTION_TYPE: "drift",
    FACING_TYPE: "turnWithSpeed",
    COLOR: "white",
    BODY: {
        STEALTH: 30,
        PUSHABILITY: 1,
    },
    DAMAGE_EFFECTS: false,
    RATEFFECTS: false,
    HEALTH_WITH_LEVEL: false,
};
// PLATONIC
Class.cnxTetrahedron = {
    PARENT: ["threeDFood"],
    LABEL: "Tetrahedron",
    VALUE: (2e7) * ThreeDValueMutli,
    SIZE: 4*2.5,
    SHAPE: "M -0.13 0.07 L -0.87 -0.35 L -0.13 0.92 Z M 0.13 0.07 L 0.13 0.92 L 0.87 -0.35 Z M 0 -0.15 L 0.74 -0.57 L -0.74 -0.57 Z",
    BODY: {
        DAMAGE: 12,
        DENSITY: 20,
        HEALTH: 500 * ThreeDHealthMutli,
        PENETRATION: 17.5,
        ACCELERATION: 0.002
    },
    DRAW_HEALTH: true,
    GIVE_KILL_MESSAGE: true
};
Class.cnxCube = {
    PARENT: ["threeDFood"],
    LABEL: "Cube",
    VALUE: (3e7) * ThreeDValueMutli,
    SIZE: 6*2.5,
    SHAPE: "M -0.13 0.07 L -0.87 -0.35 L -0.87 0.5 L -0.13 0.93 Z M 0.13 0.07 L 0.13 0.93 L 0.87 0.5 L 0.87 -0.35 Z M 0 -0.15 L 0.74 -0.57 L 0 -1 L -0.74 -0.57 Z",
    BODY: {
        DAMAGE: 15,
        DENSITY: 23,
        HEALTH: 666 * ThreeDHealthMutli,
        PENETRATION: 22.5,
        ACCELERATION: 0.002
    },
    DRAW_HEALTH: true,
    INTANGIBLE: false,
    GIVE_KILL_MESSAGE: true,
};
Class.cnxOctahedron = {
    PARENT: ["threeDFood"],
    LABEL: "Octahedron",
    VALUE: (4e7) * ThreeDValueMutli,
    SIZE: 8*2.5,
    SHAPE: "M -0.12 -0.12 L -0.12 -0.88 L -0.88 -0.12 Z M -0.12 0.12 L -0.88 0.12 L -0.12 0.88 Z M 0.12 0.12 L 0.12 0.88 L 0.88 0.12 Z M 0.12 -0.12 L 0.88 -0.12 L 0.12 -0.88 Z",
    BODY: {
        DAMAGE: 18,
        DENSITY: 26,
        HEALTH: 866 * ThreeDHealthMutli,
        PENETRATION: 30,
        ACCELERATION: 0.002
    },
    DRAW_HEALTH: true,
    GIVE_KILL_MESSAGE: true
};
Class.cnxDodecahedron = {
    PARENT: ["threeDFood"],
    LABEL: "Dodecahedron",
    VALUE: (5e7) * ThreeDValueMutli,
    SIZE: 12*2.5,
    SHAPE: "M -0.28 -0.39 H 0.28 L 0.455 0.15 L 0 0.48 L -0.455 0.15 Z M -0.951 -0.309 L -0.957 0.194 L -0.659 0.102 L -0.473 -0.469 L -0.66 -0.719 Z M -0.588 0.809 L -0.111 0.97 L -0.107 0.658 L -0.592 0.305 L -0.888 0.406 Z M 0.588 0.809 L 0.888 0.406 L 0.593 0.305 L 0.107 0.658 L 0.111 0.97 Z M 0.951 -0.309 L 0.66 -0.719 L 0.473 -0.469 L 0.659 0.102 L 0.957 0.194 Z M 0 -1 L -0.48 -0.85 L -0.3 -0.595 H 0.3 L 0.48 -0.85 Z",
    BODY: {
        DAMAGE: 22.5,
        DENSITY: 30,
        HEALTH: 1000 * ThreeDHealthMutli,
        RESIST: 10,
        PENETRATION: 35,
        ACCELERATION: 0.002
    },
    DRAW_HEALTH: true,
    GIVE_KILL_MESSAGE: true,
};
Class.cnxIcosahedron = {
    PARENT: ["threeDFood"],
    LABEL: "Icosahedron",
    VALUE: (1e8) * ThreeDValueMutli,
    SIZE: 20*2.5,
    SHAPE: "M -0.84 0.485 L -0.196 0.621 L -0.636 -0.141 Z M 0.733 -0.319 L 0.912 0.27 L 0.911 -0.422 Z M 0.643 -0.475 L 0.222 -0.925 L 0.821 -0.578 Z M 0.84 0.485 L 0.636 -0.141 L 0.196 0.621 Z M -0.643 -0.475 L -0.222 -0.925 L -0.821 -0.578 Z M -0.733 -0.319 L -0.912 0.27 L -0.911 -0.422 Z M 0 -0.97 L -0.44 -0.48 L 0.44 -0.48 Z M -0.09 0.794 L -0.69 0.655 L -0.09 1 Z M 0.09 0.794 L 0.69 0.655 L 0.09 1 Z M 0 0.62 L -0.537 -0.31 L 0.537 -0.31 Z",
    BODY: {
        DAMAGE: 17.5,
        DENSITY: 25,
        HEALTH: 1200 * ThreeDHealthMutli,
        RESIST: 7.5,
        PENETRATION: 22.5,
        ACCELERATION: 0.002
    },
    DRAW_HEALTH: true,
    GIVE_KILL_MESSAGE: true,
};
Class.cnxCubeGenerator = makeGenerator(Class.cnxCube);
Class.cnxTetrahedronGenerator = makeGenerator(Class.cnxTetrahedron);
Class.cnxOctahedronGenerator = makeGenerator(Class.cnxOctahedron);
Class.cnxDodecahedronGenerator = makeGenerator(Class.cnxDodecahedron);
Class.cnxIcosahedronGenerator = makeGenerator(Class.cnxIcosahedron);
// ARCHIMEDIAN
Class.cnxCuboctahedron = {
    PARENT: ["threeDFood"],
    LABEL: "Cuboctahedon",
    VALUE: (6e7) * ThreeDValueMutli,
    SIZE: 8*2.5,
    SHAPE: "M -0.27 0.47 L -0.27 -0.4677 L 0.542 0.0012 Z M -0.1934 0.5851 L 0.0516 1.0094 L 0.8484 0.5494 L 0.6034 0.1251 Z M -0.32 -0.5543 L -0.8397 -0.5544 L -0.0603 -1.0044 Z M 0.6034 -0.1251 L 0.8484 -0.5494 L 0.0516 -1.0094 L -0.1934 -0.5851 Z M -0.32 0.5543 L -0.0603 1.0044 L -0.8397 0.5544 Z M -0.41 -0.46 L -0.9 -0.46 L -0.9 0.46 L -0.41 0.46 Z M 0.64 -0 L 0.9 -0.45 L 0.9 0.45 Z",
    BODY: {
        DAMAGE: 20,
        DENSITY: 46,
        HEALTH: 1366 * ThreeDHealthMutli,
        PENETRATION: 47.5,
        ACCELERATION: 0.002
    },
    DRAW_HEALTH: true,
    INTANGIBLE: false,
    GIVE_KILL_MESSAGE: true,
};
Class.cnxIcosidodecahedron = {
    PARENT: ["threeDFood"],
    LABEL: "Icosidodecahedron",
    VALUE: (1.5e8) * ThreeDValueMutli,
    SIZE: 30*2.5,
    SHAPE: "M -0.1369 -0.2378 L 0.2745 -0.0004 L -0.1369 0.2379 Z M -0.2 -0.25 L -0.5875 -0.4125 L -0.8375 0 L -0.5875 0.4125 L -0.2 0.25 Z M -0.85 0.075 L -0.6375 0.4375 L -0.8125 0.45 Z M -0.5375 0.4625 L -0.1875 0.3125 L -0.1375 0.7 Z M -0.6625 -0.4375 L -0.85 -0.1 L -0.8125 -0.45 Z M -0.75 0.5 L -0.6125 0.5 L -0.1376 0.775 L -0.075 0.8875 L -0.4375 0.7375 Z M -0.1165 0.2983 L -0.0635 0.715 L 0.4188 0.7253 L 0.651 0.3025 L 0.3165 0.0483 Z M 0.49 0.6986 L 0.6976 0.3334 L 0.796 0.4786 Z M 0.6693 0.2343 L 0.3644 0.0061 L 0.675 -0.2309 Z M -0.0476 0.7925 L 0.3384 0.7861 L 0.0165 0.9286 Z M 0.808 0.3995 L 0.7393 0.2805 L 0.74 -0.2684 L 0.8061 -0.3787 L 0.8575 0.0101 Z M 0.3165 -0.0483 L 0.651 -0.3025 L 0.4188 -0.7253 L -0.0635 -0.715 L -0.1165 -0.2983 Z M 0.36 -0.7736 L -0.0601 -0.7709 L 0.0165 -0.9286 Z M -0.1317 -0.6967 L -0.1769 -0.3186 L -0.5375 -0.4691 Z M 0.7101 -0.355 L 0.5116 -0.6861 L 0.796 -0.4786 Z M -0.058 -0.8995 L -0.1268 -0.7805 L -0.6024 -0.5066 L -0.7311 -0.5087 L -0.42 -0.7476 Z",
    BODY: {
        DAMAGE: 40,
        DENSITY: 55,
        HEALTH: 2200 * ThreeDHealthMutli,
        RESIST: 17.5,
        PENETRATION: 57.5,
        ACCELERATION: 0.002
    },
    DRAW_HEALTH: true,
    INTANGIBLE: false,
    GIVE_KILL_MESSAGE: true,
};
Class.cnxGreatRhombicosidodecahedron = {
    PARENT: ["threeDFood"],
    LABEL: "Great Rhombicosidodecahedron",
    VALUE: (6e8) * ThreeDValueMutli,
    SIZE: 62*2.5,
    SHAPE: "M 0.2977 -0.2163 L 0.1137 -0.35 L -0.1137 -0.35 L -0.2977 -0.2163 L -0.368 -0 L -0.2977 0.2163 L -0.1137 0.35 L 0.1137 0.35 L 0.1137 0.35 L 0.2977 0.2163 L 0.368 0 Z M 0.0999 0.4099 L 0.1 0.5699 L -0.09 0.57 L -0.09 0.4101 Z M 0.3183 0.2823 L 0.1699 0.39 L 0.17 0.5699 L 0.3399 0.62 L 0.4846 0.5149 L 0.4895 0.338 Z M 0.2828 0.6904 L 0.1079 0.6361 L -0.1081 0.6361 L -0.2828 0.6904 L -0.3496 0.7779 L -0.2827 0.8655 L -0.1079 0.9198 L 0.1082 0.9197 L 0.108 0.9198 L 0.2828 0.8657 L 0.3496 0.7781 Z M 0.37 0.67 L 0.4201 0.74 L 0.574 0.628 L 0.5229 0.5588 Z M 0.4199 0.79 L 0.3799 0.85 L 0.46 0.82 L 0.6376 0.6908 L 0.691 0.624 L 0.6216 0.6436 Z M -0.359 0.2217 L -0.5111 0.2712 L -0.5699 0.0905 L -0.4178 0.0411 Z M -0.1701 0.39 L -0.3184 0.2821 L -0.4895 0.3378 L -0.4846 0.5148 L -0.3399 0.62 L -0.1702 0.57 Z M -0.5692 0.4823 L -0.5716 0.2992 L -0.6384 0.0938 L -0.744 -0.0556 L -0.8479 -0.0921 L -0.9105 -0.0014 L -0.9081 0.1816 L -0.8413 0.3871 L -0.8414 0.3869 L -0.7359 0.5365 L -0.632 0.5729 Z M -0.5229 0.5589 L -0.574 0.6282 L -0.4199 0.74 L -0.3699 0.67 Z M -0.6216 0.6435 L -0.691 0.624 L -0.6377 0.6909 L -0.46 0.8199 L -0.3799 0.85 L -0.42 0.7901 Z M -0.3218 -0.2729 L -0.4159 -0.4023 L -0.2622 -0.514 L -0.1682 -0.3846 Z M -0.4235 -0.0412 L -0.3667 -0.2156 L -0.4725 -0.3612 L -0.6394 -0.3018 L -0.6947 -0.1317 L -0.5947 0.0143 Z M -0.6346 -0.3923 L -0.4612 -0.4512 L -0.2865 -0.5782 L -0.177 -0.7248 L -0.1744 -0.8349 L -0.28 -0.8664 L -0.4533 -0.8075 L -0.6281 -0.6805 L -0.628 -0.6806 L -0.7376 -0.5341 L -0.7402 -0.424 Z M -0.6931 -0.3246 L -0.7748 -0.3518 L -0.8335 -0.1707 L -0.7515 -0.1448 Z M -0.8041 -0.3923 L -0.807 -0.4643 L -0.8542 -0.393 L -0.9219 -0.1841 L -0.9258 -0.0986 L -0.8812 -0.1553 Z M 0.1601 -0.3904 L 0.2541 -0.5199 L 0.4078 -0.4082 L 0.3138 -0.2788 Z M -0.0917 -0.4155 L 0.0917 -0.4154 L 0.1975 -0.561 L 0.0894 -0.7014 L -0.0894 -0.7014 L -0.1974 -0.5612 Z M 0.177 -0.7248 L 0.2866 -0.5781 L 0.4614 -0.4512 L 0.6346 -0.3923 L 0.7401 -0.4239 L 0.7375 -0.534 L 0.6279 -0.6806 L 0.4531 -0.8076 L 0.4532 -0.8076 L 0.28 -0.8665 L 0.1745 -0.835 Z M 0.0945 -0.7595 L 0.0952 -0.8456 L -0.0952 -0.8455 L -0.0945 -0.7595 Z M 0.1246 -0.886 L 0.1922 -0.911 L 0.1098 -0.9338 L -0.1098 -0.9337 L -0.1923 -0.911 L -0.1246 -0.8861 Z M 0.4208 0.0316 L 0.573 0.081 L 0.5142 0.2617 L 0.3621 0.2123 Z M 0.3668 -0.2156 L 0.4234 -0.0412 L 0.5946 0.0145 L 0.6947 -0.1317 L 0.6394 -0.3018 L 0.4727 -0.3612 Z M 0.744 -0.0556 L 0.6384 0.0939 L 0.5717 0.2994 L 0.5692 0.4823 L 0.6319 0.5729 L 0.7358 0.5364 L 0.8413 0.3869 L 0.9081 0.1814 L 0.9081 0.1815 L 0.9106 -0.0015 L 0.848 -0.0921 Z M 0.7515 -0.1448 L 0.8336 -0.1708 L 0.7747 -0.3518 L 0.6931 -0.3246 Z M 0.8811 -0.1553 L 0.9258 -0.0987 L 0.922 -0.1841 L 0.8541 -0.393 L 0.807 -0.4644 L 0.8042 -0.3923 Z",
    BODY: {
        DAMAGE: 50,
        DENSITY: 65,
        HEALTH: 5200 * ThreeDHealthMutli,
        RESIST: 21.5,
        PENETRATION: 75,
        ACCELERATION: 0.002
    },
    DRAW_HEALTH: true,
    INTANGIBLE: false,
    GIVE_KILL_MESSAGE: true,
};
Class.cnxCuboctahedronGenerator = makeGenerator(Class.cnxCuboctahedron);
Class.cnxIcosidodecahedronGenerator = makeGenerator(Class.cnxIcosidodecahedron);
Class.cnxGreatRhombicosidodecahedronGenerator = makeGenerator(Class.cnxGreatRhombicosidodecahedron);
// TRUNCATED(ARCHIMEDIAN)
Class.cnxTruncatedTetrahedron = {
    PARENT: ["threeDFood"],
    LABEL: "Truncated Tetrahedron",
    VALUE: (2e7) * ThreeDValueMutli * 2.25,
    SIZE: 8*2.5,
    SHAPE: "M 0.1 -0.2 L -0.2 0.1 L -0.88 0.11 L -0.9 -0.1599 L -0.1599 -0.9 L 0.11 -0.88 Z M 0.25 -0.27 L 0.25 -0.77 L 0.77 -0.25 Z M -0.1 0.2 L 0.2 -0.1 L 0.88 -0.11 L 0.9 0.1599 L 0.1599 0.9 L -0.11 0.88 Z M -0.25 0.27 L -0.25 0.77 L -0.77 0.25 Z",
    BODY: {
        DAMAGE: 12 * 1.2,
        DENSITY: 20 * 1.6,
        HEALTH: 500 * ThreeDHealthMutli * 1.5,
        PENETRATION: 17.5 * 1.3,
        ACCELERATION: 0.002
    },
    DRAW_HEALTH: true,
    GIVE_KILL_MESSAGE: true
};
Class.cnxTruncatedCube = {
    PARENT: ["threeDFood"],
    LABEL: "Truncated Cube",
    VALUE: (3e7) * ThreeDValueMutli * 2.25,
    SIZE: 14*2.5,
    SHAPE: "M 0.66 0.6701 L 0.35 0.69 L 0.69 0.35 Z M -0.6701 0.66 L -0.69 0.35 L -0.35 0.69 Z M -0.66 -0.6701 L -0.35 -0.69 L -0.69 -0.35 Z M 0.6701 -0.66 L 0.69 -0.35 L 0.35 -0.69 Z M 0.2 0.68 L -0.2 0.68 L -0.68 0.2 L -0.68 -0.2 L -0.68 -0.2 L -0.2 -0.68 L 0.2 -0.68 L 0.2 -0.68 L 0.68 -0.2 L 0.68 0.2 Z",
    BODY: {
        DAMAGE: 15 * 1.2,
        DENSITY: 23 * 1.6,
        HEALTH: 666 * ThreeDHealthMutli * 1.5,
        PENETRATION: 22.5 * 1.3,
        ACCELERATION: 0.002
    },
    DRAW_HEALTH: true,
    INTANGIBLE: false,
    GIVE_KILL_MESSAGE: true,
};
Class.cnxTruncatedOctahedron = {
    PARENT: ["threeDFood"],
    LABEL: "Truncated Octahedron",
    VALUE: (4e7) * ThreeDValueMutli * 2.25,
    SIZE: 14*2.5,
    SHAPE: "M -0.06 -0.54 L -0.07 -0.74 L -0.45 -0.72 L -0.72 -0.45 L -0.7401 -0.07 L -0.54 -0.06 Z M -0.54 0.06 L -0.74 0.07 L -0.72 0.45 L -0.45 0.72 L -0.07 0.7401 L -0.06 0.54 Z M 0.06 0.54 L 0.07 0.74 L 0.45 0.72 L 0.72 0.45 L 0.7401 0.07 L 0.54 0.06 Z M 0.54 -0.06 L 0.74 -0.07 L 0.72 -0.45 L 0.45 -0.72 L 0.07 -0.7401 L 0.06 -0.54 Z M 0 -0.42 L 0.42 0 L 0 0.42 L -0.42 0 Z",
    BODY: {
        DAMAGE: 18 * 1.2,
        DENSITY: 26 * 1.6,
        HEALTH: 866 * ThreeDHealthMutli * 1.5,
        PENETRATION: 30 * 1.3,
        ACCELERATION: 0.002
    },
    DRAW_HEALTH: true,
    GIVE_KILL_MESSAGE: true
};
Class.cnxTruncatedDodecahedron = {
    PARENT: ["threeDFood"],
    LABEL: "Truncated Dodecahedron",
    VALUE: (5e7) * ThreeDValueMutli * 2.25,
    SIZE: 32*2.5,
    SHAPE: "M -0.1 -0.1732 L -0.1 0.1732 L 0.2 -0 Z M 0.24 -0.05 L 0.44 -0.05 L 0.67 -0.22 L 0.69 -0.38 L 0.51 -0.66 L 0.3166 -0.7717 L -0.0159 -0.7876 L -0.1445 -0.6902 L -0.1767 -0.4061 L -0.0767 -0.2328 Z M 0.5 -0 L 0.69 -0.15 L 0.69 0.15 Z M 0.73 -0.42 L 0.76 -0.4901 L 0.6 -0.63 Z M 0.74 -0.2 L 0.75 -0.38 L 0.78 -0.47 L 0.81 -0.41 L 0.84 -0.13 L 0.84 0.13 L 0.81 0.41 L 0.78 0.47 L 0.75 0.38 L 0.74 0.2 Z M 0.72 0.4401 L 0.76 0.51 L 0.5901 0.66 Z M -0.1633 -0.1828 L -0.2633 -0.3561 L -0.5255 -0.4702 L -0.6741 -0.4076 L -0.8266 -0.1117 L -0.8266 0.1117 L -0.6741 0.4076 L -0.5255 0.4702 L -0.2633 0.3561 L -0.1633 0.1828 Z M -0.25 -0.433 L -0.4749 -0.5226 L -0.2151 -0.6726 Z M -0.7287 -0.4222 L -0.8044 -0.4131 L -0.8456 -0.2046 Z M -0.5432 -0.5409 L -0.7041 -0.4595 L -0.797 -0.4405 L -0.7601 -0.4965 L -0.5326 -0.6625 L -0.3074 -0.7925 L -0.0499 -0.9065 L 0.017 -0.9105 L -0.0459 -0.8395 L -0.1968 -0.7409 Z M 0.0211 -0.8436 L 0.0617 -0.9132 L 0.2765 -0.841 Z M -0.0767 0.2328 L -0.1767 0.4061 L -0.1445 0.6902 L -0.0159 0.7876 L 0.3166 0.7717 L 0.51 0.66 L 0.69 0.38 L 0.67 0.22 L 0.44 0.05 L 0.24 0.05 Z M -0.25 0.433 L -0.2151 0.6726 L -0.4749 0.5226 Z M -0.0013 0.8422 L 0.0444 0.9032 L 0.2456 0.8346 Z M -0.1968 0.7409 L -0.0459 0.8395 L 0.017 0.9105 L -0.0499 0.9065 L -0.3074 0.7925 L -0.5326 0.6625 L -0.7601 0.4965 L -0.797 0.4405 L -0.7041 0.4595 L -0.5432 0.5409 Z M -0.7411 0.4035 L -0.8217 0.4032 L -0.8666 0.181 Z",
    BODY: {
        DAMAGE: 22.5 * 1.2,
        DENSITY: 30 * 1.6,
        HEALTH: 1000 * ThreeDHealthMutli * 1.5,
        RESIST: 10,
        PENETRATION: 35 * 1.3,
        ACCELERATION: 0.002
    },
    DRAW_HEALTH: true,
    GIVE_KILL_MESSAGE: true,
};
Class.cnxTruncatedIcosahedron = {
    PARENT: ["threeDFood"],
    LABEL: "Truncated Icosahedron",
    VALUE: (1e8) * ThreeDValueMutli * 2.25,
    SIZE: 32*2.5,
    SHAPE: "M 0.3 0 L 0.0927 -0.2853 L -0.2427 -0.1763 L -0.2427 0.1763 L 0.0927 0.2853 Z M 0.37 0.05 L 0.61 0.05 L 0.6899 0.32 L 0.5174 0.5573 L 0.2361 0.5647 L 0.1619 0.3364 Z M 0.76 0.35 L 0.86 0.2499 L 0.8 0.36 L 0.5895 0.6496 L 0.5035 0.7406 L 0.5677 0.6146 Z M 0.68 -0 L 0.76 -0.2599 L 0.8501 -0.1699 L 0.8501 0.17 L 0.7599 0.26 Z M 0.1619 -0.3364 L 0.2361 -0.5647 L 0.5175 -0.5573 L 0.6899 -0.3199 L 0.61 -0.05 L 0.37 -0.05 Z M 0.5677 -0.6147 L 0.5034 -0.7407 L 0.5896 -0.6496 L 0.8 -0.3599 L 0.8599 -0.25 L 0.76 -0.35 Z M 0.2101 -0.6467 L -0.0123 -0.8031 L 0.1011 -0.861 L 0.4244 -0.7559 L 0.4821 -0.6424 Z M -0.2699 -0.2579 L -0.4641 -0.399 L -0.3701 -0.6644 L -0.0911 -0.755 L 0.1409 -0.5956 L 0.0668 -0.3673 Z M -0.4092 -0.7299 L -0.5489 -0.7077 L -0.4356 -0.7615 L -0.0951 -0.8721 L 0.028 -0.8951 L -0.098 -0.831 Z M -0.5501 -0.3997 L -0.7676 -0.2365 L -0.7876 -0.3622 L -0.5878 -0.6372 L -0.462 -0.657 Z M -0.3287 0.177 L -0.5229 0.3181 L -0.7463 0.1467 L -0.7462 -0.1467 L -0.5229 -0.3181 L -0.3287 -0.177 Z M -0.8206 0.1636 L -0.8427 0.3033 L -0.8588 0.179 L -0.8588 -0.179 L -0.8427 -0.3032 L -0.8206 -0.1636 Z M -0.5501 0.3997 L -0.4621 0.657 L -0.5878 0.6371 L -0.7876 0.3621 L -0.7676 0.2364 Z M 0.0668 0.3673 L 0.1409 0.5956 L -0.0911 0.7551 L -0.3701 0.6644 L -0.4641 0.399 L -0.2699 0.2579 Z M -0.098 0.831 L 0.028 0.8952 L -0.0952 0.8721 L -0.4356 0.7615 L -0.5488 0.7077 L -0.4092 0.7299 Z M 0.2101 0.6467 L 0.4821 0.6425 L 0.4243 0.7559 L 0.101 0.8609 L -0.0124 0.8031 Z",
    BODY: {
        DAMAGE: 17.5 * 1.2,
        DENSITY: 25 * 1.6,
        HEALTH: 1200 * ThreeDHealthMutli * 1.5,
        RESIST: 7.5,
        PENETRATION: 22.5 * 1.3,
        ACCELERATION: 0.002
    },
    DRAW_HEALTH: true,
    GIVE_KILL_MESSAGE: true,
};
Class.cnxTruncatedCubeGenerator = makeGenerator(Class.cnxTruncatedCube);
Class.cnxTruncatedTetrahedronGenerator = makeGenerator(Class.cnxTruncatedTetrahedron);
Class.cnxTruncatedOctahedronGenerator = makeGenerator(Class.cnxTruncatedOctahedron);
Class.cnxTruncatedDodecahedronGenerator = makeGenerator(Class.cnxTruncatedDodecahedron);
Class.cnxTruncatedIcosahedronGenerator = makeGenerator(Class.cnxTruncatedIcosahedron);
// CATALAN
Class.cnxTriacontahedron = {
    PARENT: ["threeDFood"],
    LABEL: "Triacontahedron",
    VALUE: (2.5e8) * ThreeDValueMutli,
    SIZE: 30*2.5,
    SHAPE: "M 0.0501 -0.0001 L 0.4699 0.2901 L 0.79 0.0101 L 0.4699 -0.2899 Z M 0.4901 0.3601 L 0.33 0.72 L 0.62 0.46 L 0.7868 0.0915 Z M 0.0154 -0.0477 L 0.4211 -0.3573 L 0.2537 -0.7482 L -0.1305 -0.5365 Z M 0.4939 -0.3548 L 0.7867 -0.0914 L 0.6291 -0.4475 L 0.33 -0.7199 Z M -0.0406 -0.0294 L -0.2097 -0.5109 L -0.6332 -0.4725 L -0.5506 -0.0417 Z M -0.1848 -0.5794 L 0.1562 -0.7764 L -0.2312 -0.7366 L -0.5827 -0.5363 Z M -0.0405 0.0295 L -0.5507 0.0416 L -0.645 0.4562 L -0.2098 0.5108 Z M -0.6081 -0.0033 L -0.6901 -0.3885 L -0.772 -0.0077 L -0.6901 0.3885 Z M 0.0155 0.0476 L -0.1306 0.5366 L 0.2346 0.7544 L 0.421 0.3574 Z M -0.191 0.5773 L -0.5828 0.5363 L -0.2459 0.7318 L 0.1562 0.7764 Z",
    BODY: {
        DAMAGE: 22,
        DENSITY: 35,
        HEALTH: 1850 * ThreeDHealthMutli,
        RESIST: 9.25,
        PENETRATION: 34,
        ACCELERATION: 0.002
    },
    DRAW_HEALTH: true,
    GIVE_KILL_MESSAGE: true,
};
Class.cnxDisdyakisTriacontahedron = {
    PARENT: ["threeDFood"],
    LABEL: "Disdyakis Triacontahedron",
    VALUE: (2.5e8) * ThreeDValueMutli * 5,
    SIZE: 120*2.5,
    SHAPE: "M 0.036 0.012 L 0.48 0.336 L 0.516 0.012 Z M 0.5401 0.0121 L 0.84 0.0121 L 0.5041 0.336 Z M 0.516 0.3599 L 0.852 0.0239 L 0.624 0.444 Z M 0.6479 0.4559 L 0.8519 0.0601 L 0.684 0.48 Z M 0.036 -0.0121 L 0.48 -0.336 L 0.516 -0.0121 Z M 0.5399 -0.012 L 0.8399 -0.012 L 0.504 -0.3361 Z M 0.5159 -0.3599 L 0.8521 -0.024 L 0.624 -0.444 Z M 0.648 -0.456 L 0.852 -0.06 L 0.684 -0.48 Z M 0.0226 -0.0305 L 0.4679 -0.3527 L 0.1709 -0.4871 Z M 0.1784 -0.5099 L 0.2711 -0.7951 L 0.4753 -0.3756 Z M 0.5017 -0.3796 L 0.286 -0.8029 L 0.6151 -0.4562 Z M 0.6338 -0.4753 L 0.3204 -0.7916 L 0.6679 -0.5022 Z M -0.0004 -0.0379 L -0.1712 -0.5603 L 0.148 -0.4945 Z M 0.1554 -0.5172 L 0.2482 -0.8024 L -0.1639 -0.5832 Z M -0.1829 -0.6018 L 0.2405 -0.8178 L -0.2294 -0.7307 Z M -0.2334 -0.7572 L 0.2063 -0.8288 L -0.2452 -0.7988 Z M -0.0221 -0.0308 L -0.1908 -0.5539 L -0.4104 -0.313 Z M -0.4298 -0.3272 L -0.6725 -0.5035 L -0.2104 -0.5681 Z M -0.2059 -0.5945 L -0.6752 -0.5201 L -0.2438 -0.726 Z M -0.2562 -0.7498 L -0.6539 -0.5494 L -0.2712 -0.7904 Z M -0.0361 -0.0114 L -0.5857 -0.0103 L -0.4246 -0.2935 Z M -0.4439 -0.3077 L -0.6865 -0.484 L -0.6053 -0.0244 Z M -0.6289 -0.012 L -0.7034 -0.4814 L -0.7658 -0.0076 Z M -0.7922 -0.012 L -0.7246 -0.4523 L -0.8356 -0.0137 Z M -0.0361 0.0115 L -0.5857 0.0103 L -0.4244 0.2936 Z M -0.444 0.3077 L -0.6866 0.484 L -0.6053 0.0245 Z M -0.629 0.0121 L -0.7033 0.4814 L -0.7658 0.0076 Z M -0.7922 0.012 L -0.7246 0.4522 L -0.8356 0.0137 Z M -0.022 0.0308 L -0.1908 0.5539 L -0.4104 0.3131 Z M -0.4298 0.3271 L -0.6725 0.5034 L -0.2102 0.5681 Z M -0.2058 0.5945 L -0.6752 0.5202 L -0.2438 0.726 Z M -0.2562 0.7498 L -0.654 0.5494 L -0.2712 0.7904 Z M -0.0002 0.0379 L -0.1712 0.5603 L 0.1481 0.4944 Z M 0.1554 0.5173 L 0.2482 0.8026 L -0.1638 0.5832 Z M -0.1829 0.602 L 0.2405 0.8177 L -0.2294 0.7307 Z M -0.2334 0.7572 L 0.2062 0.8288 L -0.2452 0.7988 Z M 0.0226 0.0305 L 0.4679 0.3527 L 0.1709 0.4871 Z M 0.1783 0.5099 L 0.271 0.7951 L 0.4753 0.3755 Z M 0.5018 0.3794 L 0.2861 0.8029 L 0.6151 0.4562 Z M 0.634 0.4753 L 0.3204 0.7918 L 0.6679 0.5022 Z",
    BODY: {
        DAMAGE: 25,
        DENSITY: 40,
        HEALTH: 5600 * ThreeDHealthMutli,
        RESIST: 10,
        PENETRATION: 45,
        ACCELERATION: 0.002
    },
    DRAW_HEALTH: true,
    GIVE_KILL_MESSAGE: true,
};
Class.cnxTriacontahedronGenerator = makeGenerator(Class.cnxTriacontahedron);
Class.cnxDisdyakisTriacontahedronGenerator = makeGenerator(Class.cnxDisdyakisTriacontahedron);
// TRIAKIS
Class.cnxTriakisTetrahedron = {
    PARENT: ["threeDFood"],
    LABEL: "Triakis Tetrahedron",
    VALUE: (2e7) * ThreeDValueMutli * 3.75,
    SIZE: 12*2.5,
    SHAPE: "M -0.15 0.075 L -0.45 0.6751 L -0.525 0.0625 Z M -0.15 -0.075 L -0.45 -0.6751 L -0.525 -0.0625 Z M 0.14 0.0924 L 0.8096 0.0521 L 0.3166 0.4234 Z M 0.01 0.1674 L -0.3596 0.7272 L 0.2084 0.4859 Z M 0.01 -0.1674 L -0.3596 -0.7272 L 0.2084 -0.4859 Z M 0.14 -0.0924 L 0.8096 -0.0522 L 0.3166 -0.4234 Z",
    BODY: {
        DAMAGE: 12 * 1.25,
        DENSITY: 20 * 1.65,
        HEALTH: 500 * ThreeDHealthMutli * 1.75,
        PENETRATION: 17.5 * 1.425,
        ACCELERATION: 0.002
    },
    DRAW_HEALTH: true,
    GIVE_KILL_MESSAGE: true
};
Class.cnxTriakisCube = {
    PARENT: ["threeDFood"],
    LABEL: "Triakis Cube",
    VALUE: (3e7) * ThreeDValueMutli * 3.75,
    SIZE: 24*2.5,
    SHAPE: "M 0.06 -0.06 L 0.54 -0.06 L 0.6 -0.59 L 0.06 -0.54 Z M -0 -0.61 L 0.58 -0.63 L -0 -0.63 L -0.58 -0.63 Z M -0.06 -0.06 L -0.06 -0.54 L -0.59 -0.6 L -0.54 -0.06 Z M -0.61 0 L -0.63 -0.58 L -0.63 0 L -0.63 0.58 Z M -0.06 0.06 L -0.54 0.06 L -0.6 0.59 L -0.06 0.54 Z M 0 0.61 L -0.58 0.63 L 0 0.63 L 0.58 0.63 Z M 0.06 0.06 L 0.06 0.54 L 0.59 0.6 L 0.54 0.06 Z M 0.61 -0 L 0.63 0.58 L 0.63 -0 L 0.63 -0.58 Z",
    BODY: {
        DAMAGE: 15 * 1.25,
        DENSITY: 23 * 1.65,
        HEALTH: 666 * ThreeDHealthMutli * 1.75,
        PENETRATION: 22.5 * 1.425,
        ACCELERATION: 0.002
    },
    DRAW_HEALTH: true,
    INTANGIBLE: false,
    GIVE_KILL_MESSAGE: true,
};
Class.cnxTriakisOctahedron = {
    PARENT: ["threeDFood"],
    LABEL: "Triakis Octahedron",
    VALUE: (4e7) * ThreeDValueMutli * 3.75,
    SIZE: 24*2.5,
    SHAPE: "M 0.06 0.05 L 0.2709 0.4153 L 0.75 0.05 Z M 0.0133 0.077 L 0.2242 0.4423 L -0.3317 0.6745 Z M 0.2717 0.5494 L -0.2788 0.7628 L 0.3412 0.6697 Z M 0.3399 0.51 L 0.8 0.14 L 0.4094 0.6303 Z M 0.0133 -0.077 L 0.2242 -0.4423 L -0.3317 -0.6745 Z M 0.06 -0.05 L 0.2709 -0.4153 L 0.75 -0.05 Z M 0.3399 -0.51 L 0.8 -0.14 L 0.4094 -0.6303 Z M 0.2717 -0.5494 L -0.2788 -0.7628 L 0.3412 -0.6697 Z M -0.0733 0.027 L -0.4951 0.027 L -0.4183 0.6245 Z M -0.0733 -0.027 L -0.4951 -0.027 L -0.4183 -0.6245 Z M -0.6116 -0.0394 L -0.5212 -0.6228 L -0.7506 -0.0394 Z M -0.6117 0.0394 L -0.5212 0.6228 L -0.7506 0.0394 Z",
    BODY: {
        DAMAGE: 18 * 1.25,
        DENSITY: 26 * 1.65,
        HEALTH: 866 * ThreeDHealthMutli * 1.75,
        PENETRATION: 30 * 1.425,
        ACCELERATION: 0.002
    },
    DRAW_HEALTH: true,
    GIVE_KILL_MESSAGE: true
};
Class.cnxTriakisDodecahedron = {
    PARENT: ["threeDFood"],
    LABEL: "Triakis Dodecahedron",
    VALUE: (5e7) * ThreeDValueMutli * 3.75,
    SIZE: 60*2.5,
    SHAPE: "M 0.1 0 L 0.53 -0.33 L 0.5299 0.3301 Z M 0.6 0.3399 L 0.6 -0.34 L 0.7699 0.0001 Z M 0.63 -0.4101 L 0.7799 -0.1099 L 0.73 -0.4801 Z M 0.63 0.41 L 0.7801 0.11 L 0.7301 0.48 Z M 0.0309 -0.0951 L -0.1501 -0.606 L 0.4777 -0.402 Z M 0.5087 -0.4656 L -0.138 -0.6757 L 0.238 -0.7322 Z M -0.1953 -0.7259 L 0.1365 -0.7757 L -0.231 -0.8426 Z M 0.5846 -0.4725 L 0.3457 -0.7079 L 0.6821 -0.546 Z M -0.0809 -0.0588 L -0.6227 -0.0445 L -0.2347 -0.5785 Z M -0.2856 -0.6277 L -0.6853 -0.0776 L -0.6228 -0.4526 Z M -0.7507 -0.0386 L -0.6956 -0.3695 L -0.8727 -0.0407 Z M -0.2687 -0.702 L -0.5664 -0.5475 L -0.3085 -0.8174 Z M -0.0809 0.0588 L -0.2348 0.5785 L -0.6227 0.0445 Z M -0.6852 0.0777 L -0.2856 0.6278 L -0.6229 0.4525 Z M -0.2687 0.702 L -0.5664 0.5474 L -0.3084 0.8174 Z M -0.7507 0.0386 L -0.6957 0.3695 L -0.8727 0.0408 Z M 0.0309 0.0951 L 0.4776 0.4021 L -0.1501 0.606 Z M -0.1379 0.6757 L 0.5088 0.4656 L 0.2379 0.7323 Z M 0.5846 0.4725 L 0.3456 0.7078 L 0.6821 0.5459 Z M -0.1953 0.7259 L 0.1364 0.7758 L -0.2309 0.8426 Z",
    BODY: {
        DAMAGE: 22.5 * 1.25,
        DENSITY: 30 * 1.65,
        HEALTH: 1000 * ThreeDHealthMutli * 1.75,
        RESIST: 10,
        PENETRATION: 35 * 1.425,
        ACCELERATION: 0.002
    },
    DRAW_HEALTH: true,
    GIVE_KILL_MESSAGE: true,
};
Class.cnxTriakisIcosahedron = {
    PARENT: ["threeDFood"],
    LABEL: "Triakis Icosahedron",
    VALUE: (1e8) * ThreeDValueMutli * 3.75,
    SIZE: 60*2.5,
    SHAPE: "M -0.035 -0.0606 L -0.6103 -0.0171 L 0.2903 -0.5371 Z M -0.644 -0.0554 L -0.28 -0.485 L 0.269 -0.5941 Z M -0.3027 -0.5643 L 0.2677 -0.6164 L -0.4127 -0.7548 Z M -0.3373 -0.5443 L -0.6677 -0.0764 L -0.4473 -0.7348 Z M -0.6986 -0.0701 L -0.5226 -0.6451 L -0.6811 -0.2996 Z M -0.7319 -0.0278 L -0.7227 -0.1716 L -0.7816 -0.0337 Z M 0.2886 -0.6401 L -0.2974 -0.7751 L 0.0811 -0.7396 Z M 0.342 -0.6477 L 0.2127 -0.7117 L 0.3616 -0.6937 Z M -0.035 0.0606 L 0.2903 0.5371 L -0.6103 0.0171 Z M 0.274 0.5854 L -0.28 0.485 L -0.649 0.0641 Z M -0.3373 0.5443 L -0.6677 0.0764 L -0.4473 0.7348 Z M -0.3027 0.5643 L 0.2677 0.6164 L -0.4127 0.7548 Z M 0.2886 0.6401 L -0.2974 0.7751 L 0.0811 0.7396 Z M 0.3419 0.6477 L 0.2127 0.7117 L 0.3616 0.6937 Z M -0.6986 0.0701 L -0.5226 0.6451 L -0.6811 0.2996 Z M -0.7319 0.0277 L -0.7227 0.1717 L -0.7816 0.0337 ZM 0.07 0 L 0.32 -0.52 L 0.32 0.52 Z M 0.37 -0.53 L 0.56 0 L 0.38 0.53 Z M 0.64 0.02 L 0.4 0.54 L 0.86 0.02 Z M 0.64 -0.02 L 0.4 -0.54 L 0.86 -0.02 Z M 0.41 -0.57 L 0.82 -0.13 L 0.6 -0.44 Z M 0.39 -0.62 L 0.51 -0.54 L 0.42 -0.66 ZM 0.41 0.57 L 0.82 0.13 L 0.6 0.44 Z M 0.39 0.62 L 0.51 0.54 L 0.42 0.66 Z",
    BODY: {
        DAMAGE: 17.5 * 1.25,
        DENSITY: 25 * 1.65,
        HEALTH: 1200 * ThreeDHealthMutli * 1.75,
        RESIST: 7.5,
        PENETRATION: 22.5 * 1.425,
        ACCELERATION: 0.002
    },
    DRAW_HEALTH: true,
    GIVE_KILL_MESSAGE: true,
};
Class.cnxTriakisTetrahedronGenerator = makeGenerator(Class.cnxTriakisTetrahedron);
Class.cnxTriakisCubeGenerator = makeGenerator(Class.cnxTriakisCube);
Class.cnxTriakisOctahedronGenerator = makeGenerator(Class.cnxTriakisOctahedron);
Class.cnxTriakisDodecahedronGenerator = makeGenerator(Class.cnxTriakisDodecahedron);
Class.cnxTriakisIcosahedronGenerator = makeGenerator(Class.cnxTriakisIcosahedron);
// IRREGULAR
Class.cnxRectangularPrism = {
    PARENT: ["threeDFood"],
    LABEL: "Rectangular Prism",
    VALUE: (4e7) * ThreeDValueMutli,
    SIZE: (6*2.5)*2,
    SHAPE: "M 0.2272 0.24 L -0.9772 -0.45 L -0.9772 0.1875 L 0.2272 0.885 Z M 0.4223 0.24 L 0.4223 0.885 L 0.9772 0.5625 L 0.9772 -0.075 Z M 0.3248 0.075 L 0.8798 -0.24 L -0.3248 -0.9375 L -0.8798 -0.615 Z",
    BODY: {
        DAMAGE: 24,
        DENSITY: 40,
        HEALTH: 1000 * ThreeDHealthMutli,
        PENETRATION: 35,
        ACCELERATION: 0.002
    },
    DRAW_HEALTH: true,
    INTANGIBLE: false,
    GIVE_KILL_MESSAGE: true,
};
Class.cnxSlab = {
    PARENT: ["threeDFood"],
    LABEL: "Slab",
    VALUE: (1e7) * ThreeDValueMutli,
    SIZE: 6*2.5,
    SHAPE: "M -0.3675 -0.2063 V 0.82 L 0.46 0.36 V -0.6806 L -0.3675 -0.2063 Z M -0.47 -0.2 V 0.82 L -0.8869 0.5159 V -0.4306 L -0.47 -0.2 Z M -0.42 -0.29 L 0.4 -0.78 L 0 -1 L -0.8254 -0.527 Z",
    BODY: {
        DAMAGE: 6,
        DENSITY: 10,
        HEALTH: 250 * ThreeDHealthMutli,
        PENETRATION: 8.75,
        ACCELERATION: 0.002
    },
    DRAW_HEALTH: true,
    INTANGIBLE: false,
    GIVE_KILL_MESSAGE: true,
};
Class.cnxRectangularPrismGenerator = makeGenerator(Class.cnxRectangularPrism);
Class.cnxSlabGenerator = makeGenerator(Class.cnxSlab);
// MISC
Class.cnxSphereShine = {
    LABEL: "",
    CONTROLLERS: [["spin", { speed: 0, independent: true }]],
    BORDERLESS: true, 
    SHAPE: 'M 0 0',
    TURRETS: [{
        POSITION: [17, 0, 0, 0, 0, 1],
        TYPE: ["egg", { COLOR: { BASE: "white", BRIGHTNESS_SHIFT: 1 }, BORDERLESS: true }]
    }, {
        POSITION: [15, 1, -1, 0, 0, 1],
        TYPE: ["egg", { COLOR: { BASE: "white", BRIGHTNESS_SHIFT: 6 }, BORDERLESS: true }]
    }, {
        POSITION: [13, 2, -2, 0, 0, 1],
        TYPE: ["egg", { COLOR: { BASE: "white", BRIGHTNESS_SHIFT: 7 }, BORDERLESS: true }]
    }, {
        POSITION: [11, 3, -3, 0, 0, 1],
        TYPE: ["egg", { COLOR: { BASE: "white", BRIGHTNESS_SHIFT: 12 }, BORDERLESS: true }]
    }, {
        POSITION: [8, 3.25, -3.25, 0, 0, 1],
        TYPE: ["egg", { COLOR: { BASE: "white", BRIGHTNESS_SHIFT: 18 }, BORDERLESS: true }]
    }, {
        POSITION: [6, 3, -3, 0, 0, 1],
        TYPE: ["egg", { COLOR: { BASE: "white", BRIGHTNESS_SHIFT: 24 }, BORDERLESS: true }]
    }],
    INDEPENDENT: true,
};
Class.cnxSphere = {
    PARENT: ["threeDFood"],
    LABEL: "Sphere",
    VALUE: (1e7) * ThreeDValueMutli,
    SHAPE: 0,
    SIZE: 15,
    BODY: {
        DAMAGE: 10,
        DENSITY: 15,
        HEALTH: 300 * ThreeDHealthMutli,
        PENETRATION: 15,
        ACCELERATION: 0.002
    },
    DRAW_HEALTH: true,
    GIVE_KILL_MESSAGE: true,
    TURRETS: [
        {
            POSITION: [20, 0, 0, 0, 360, 1],
            TYPE: "cnxSphereShine",
        },
    ],
};
Class.cnxCylinderShine3 = {
    LABEL: "",
    MIRROR_MASTER_ANGLE: true,
    COLOR: { BASE: "white", BRIGHTNESS_SHIFT: 12 },
    BORDERLESS: true, 
//    SHAPE: 'M 0.695 -0.222 A 1 1 0 0 1 0.724 -0.33 L 0.876 -0.33 A 1 1 0 0 1 0.905 -0.222 Z M 0.523 -0.33 A 1 1 0 0 0 0.495 -0.222 L -0.705 -0.222 A 1 1 0 0 1 -0.676 -0.33 Z',
    SHAPE: 'M 0.523 -0.33 A 1 1 0 0 0 0.495 -0.222 L -0.705 -0.222 A 1 1 0 0 1 -0.676 -0.33 Z',
    INDEPENDENT: true,
};
Class.cnxCylinderShine2 = {
    LABEL: "",
    MIRROR_MASTER_ANGLE: true,
    COLOR: { BASE: "white", BRIGHTNESS_SHIFT: 7 },
    BORDERLESS: true, 
//    SHAPE: 'M 0.68 -0.13 A 1 1 0 0 1 0.75 -0.4 L 0.85 -0.4 A 1 1 0 0 1 0.92 -0.13 Z M 0.55 -0.4 A 1 1 0 0 0 0.48 -0.13 L -0.72 -0.13 A 1 1 0 0 1 -0.65 -0.4 Z',
    SHAPE: 'M 0.55 -0.4 A 1 1 0 0 0 0.48 -0.13 L -0.72 -0.13 A 1 1 0 0 1 -0.65 -0.4 Z',
    INDEPENDENT: true,
};
Class.cnxCylinderShine = {
    LABEL: "",
    MIRROR_MASTER_ANGLE: true,
    COLOR: { BASE: "white", BRIGHTNESS_SHIFT: 3 },
    BORDERLESS: true, 
//    SHAPE: 'M 0.67 0 A 1 1 0 0 1 0.8 -0.5 A 1 1 0 0 1 0.93 0 Z M 0.6 -0.5 A 1 1 0 0 0 0.47 0 L -0.73 0 A 1 1 0 0 1 -0.6 -0.5 Z',
    SHAPE: 'M 0.67 0 A 1 1 0 0 1 0.8 -0.5 A 1 1 0 0 1 0.93 0 Z M 0.6 -0.5 A 1 1 0 0 0 0.47 0 L -0.73 0 A 1 1 0 0 1 -0.6 -0.5 Z',
    INDEPENDENT: true,
};
Class.cnxCylinder = {
    PARENT: ["threeDFood"],
    LABEL: "Cylinder",
    VALUE: (2e7) * ThreeDValueMutli,
    SHAPE: 'M 0.8 -0.5 A 1 1 0 0 0 0.8 0.5 A 1 1 0 0 0 0.8 -0.5 Z M 0.6 -0.5 A 1 1 0 0 0 0.6 0.5 L -0.6 0.5 A 1 1 0 0 1 -0.6 -0.5 Z',
    SIZE: 15,
    BODY: {
        DAMAGE: 12.5,
        DENSITY: 17.5,
        HEALTH: 350 * ThreeDHealthMutli,
        PENETRATION: 20,
        ACCELERATION: 0.002
    },
    DRAW_HEALTH: true,
    GIVE_KILL_MESSAGE: true,
    TURRETS: [
        {
            POSITION: [20, 0, 0, 0, 360, 1],
            TYPE: "cnxCylinderShine",
        },
        {
            POSITION: [20, 0, 0, 0, 360, 1],
            TYPE: "cnxCylinderShine2",
        },
        {
            POSITION: [20, 0, 0, 0, 360, 1],
            TYPE: "cnxCylinderShine3",
        },
    ],
};
Class.cnxConeShine3 = {
    LABEL: "",
    MIRROR_MASTER_ANGLE: true,
    COLOR: { BASE: "white", BRIGHTNESS_SHIFT: 12 },
    BORDERLESS: true, 
    SHAPE: 'M 0.8 0 L -0.761 -0.279 A 1 1 0 0 1 -0.71 -0.413 Z',
    INDEPENDENT: true,
};
Class.cnxConeShine2 = {
    LABEL: "",
    MIRROR_MASTER_ANGLE: true,
    COLOR: { BASE: "white", BRIGHTNESS_SHIFT: 7 },
    BORDERLESS: true, 
    SHAPE: 'M 0.8 0 L -0.786 -0.168 A 1 1 0 0 1 -0.674 -0.485 Z',
    INDEPENDENT: true,
};
Class.cnxConeShine = {
    LABEL: "",
    MIRROR_MASTER_ANGLE: true,
    COLOR: { BASE: "white", BRIGHTNESS_SHIFT: 3 },
    BORDERLESS: true, 
    SHAPE: 'M 0.8 0 L -0.8 0 A 1 1 0 0 1 -0.6 -0.6 Z',
    INDEPENDENT: true,
};
Class.cnxCone = {
    PARENT: ["threeDFood"],
    LABEL: "Cone",
    VALUE: (1.5e7) * ThreeDValueMutli,
    SHAPE: 'M 0.8 0 L -0.6 0.6 A 1 1 0 0 1 -0.6 -0.6 Z',
    SIZE: 15,
    BODY: {
        DAMAGE: 20,
        DENSITY: 20,
        HEALTH: 400 * ThreeDHealthMutli,
        PENETRATION: 40,
        ACCELERATION: 0.002
    },
    DRAW_HEALTH: true,
    GIVE_KILL_MESSAGE: true,
    TURRETS: [
        {
            POSITION: [20, 0, 0, 0, 360, 1],
            TYPE: "cnxConeShine",
        },
        {
            POSITION: [20, 0, 0, 0, 360, 1],
            TYPE: "cnxConeShine2",
        },
        {
            POSITION: [20, 0, 0, 0, 360, 1],
            TYPE: "cnxConeShine3",
        },
    ],
};
Class.cnxSphereGenerator = makeGenerator(Class.cnxSphere);
Class.cnxCylinderGenerator = makeGenerator(Class.cnxCylinder);
Class.cnxConeGenerator = makeGenerator(Class.cnxCone);
// HOSOHEDRA
Class.cnxLune = {
    PARENT: ["threeDFood"],
    LABEL: "Lune",
    VALUE: (1e6) * ThreeDValueMutli,
    SHAPE: 'M 0 1 A 2 2 90 0 0 0 -1 A 2 2 90 0 0 0 1',
    SIZE: 10,
    BODY: {
        DAMAGE: 2,
        DENSITY: 5,
        HEALTH: 100 * ThreeDHealthMutli,
        PENETRATION: 5,
        ACCELERATION: 0.002
    },
    DRAW_HEALTH: true,
    GIVE_KILL_MESSAGE: true,
};
Class.cnxDigonalHosohedron = {
    PARENT: ["threeDFood"],
    LABEL: "Digonal Hosohedron",
    VALUE: (1e6)*2 * ThreeDValueMutli,
    SHAPE: 'M 0.15 1 A 1 1 0 0 0 0.15 -1 Z M -0.15 -1 A 1 1 180 0 0 -0.15 1 Z',
    SIZE: 15,
    BODY: {
        DAMAGE: 2*2,
        DENSITY: 5*(2*0.75),
        HEALTH: 100*(2*0.675) * ThreeDHealthMutli,
        PENETRATION: 5*(2*0.675),
        ACCELERATION: 0.002
    },
    DRAW_HEALTH: true,
    GIVE_KILL_MESSAGE: true,
};
Class.cnxLuneGenerator = makeGenerator(Class.cnxLune);
Class.cnxDigonalHosohedronGenerator = makeGenerator(Class.cnxDigonalHosohedron);
// PYRAMIDS
Class.cnxSquarePyramid = {
    PARENT: ["threeDFood"],
    LABEL: "Square Pyramid",
    VALUE: (2.25e7) * ThreeDValueMutli,
    SIZE: 5*2.5,
    SHAPE: "M 0.05 -0.05 L 0.05 -0.95 L 0.95 -0.05 Z M -0.05 -0.05 L -0.95 -0.05 L -0.05 -0.95 Z M -0.05 0.05 L -0.05 0.95 L -0.95 0.05 Z M 0.05 0.05 L 0.95 0.05 L 0.05 0.95 Z",
    BODY: {
        DAMAGE: 12 * 1.25,
        DENSITY: 20 * 1.25,
        HEALTH: 500 * 1.25 * ThreeDHealthMutli,
        PENETRATION: 17.5 * 1.25,
        ACCELERATION: 0.002
    },
    DRAW_HEALTH: true,
    GIVE_KILL_MESSAGE: true
};
Class.cnxPentagonalPyramid = {
    PARENT: ["threeDFood"],
    LABEL: "Pentagonal Pyramid",
    VALUE: (2.5e7) * ThreeDValueMutli,
    SIZE: 6*2.5,
    SHAPE: "M 0.057 0.0186 L 0.8773 -0.2406 L 0.5682 0.7104 Z M 0.0353 -0.0485 L 0.0423 -0.9087 L 0.8512 -0.3209 Z M -0.0352 -0.0486 L -0.8512 -0.321 L -0.0422 -0.9087 Z M -0.0571 0.0185 L -0.5683 0.7104 L -0.8773 -0.2407 Z M 0 0.06 L 0.5 0.76 L -0.5 0.76 Z",
    BODY: {
        DAMAGE: 12 * 1.25 * 1.25,
        DENSITY: 20 * 1.25 * 1.25,
        HEALTH: 500 * 1.25 * 1.25 * ThreeDHealthMutli,
        PENETRATION: 17.5 * 1.25 * 1.25,
        ACCELERATION: 0.002
    },
    DRAW_HEALTH: true,
    GIVE_KILL_MESSAGE: true
};
Class.cnxHexagonalPyramid = {
    PARENT: ["threeDFood"],
    LABEL: "Hexagonal Pyramid",
    VALUE: (2.75e7) * ThreeDValueMutli,
    SIZE: 7*2.5,
    SHAPE: "M 0.03 0.052 L 0.8114 0.5146 L 0.04 0.96 Z M 0.06 -0 L 0.8514 -0.4454 L 0.8514 0.4454 Z M 0.03 -0.052 L 0.04 -0.96 L 0.8114 -0.5146 Z M -0.03 -0.052 L -0.8114 -0.5146 L -0.04 -0.96 Z M -0.06 0 L -0.8514 0.4454 L -0.8514 -0.4454 ZM -0.03 0.052 L -0.04 0.96 L -0.8114 0.5146 Z ",
    BODY: {
        DAMAGE: 12 * 1.25 * 1.25 * 1.25,
        DENSITY: 20 * 1.25 * 1.25 * 1.25,
        HEALTH: 500 * 1.25 * 1.25 * 1.25 * ThreeDHealthMutli,
        PENETRATION: 17.5 * 1.25 * 1.25 * 1.25,
        ACCELERATION: 0.002
    },
    DRAW_HEALTH: true,
    GIVE_KILL_MESSAGE: true
};
Class.cnxSquarePyramidGenerator = makeGenerator(Class.cnxSquarePyramid);
Class.cnxPentagonalPyramidGenerator = makeGenerator(Class.cnxPentagonalPyramid);
Class.cnxHexagonalPyramidGenerator = makeGenerator(Class.cnxHexagonalPyramid);
  
	Class.addons.UPGRADES_TIER_0.push("cnxMore3D");
		Class.cnxMore3D.UPGRADES_TIER_0 = ["cnxPlatonicSolids", "cnxArchimedeanSolids", "cnxIrregularSolids", "cnxMiscSolids", "cnxCatalanSolids"];
	  	Class.cnxPlatonicSolids.UPGRADES_TIER_0 = ["cnxTetrahedronGenerator", "cnxCubeGenerator", "cnxOctahedronGenerator", "cnxDodecahedronGenerator", "cnxIcosahedronGenerator"];
	  	Class.cnxArchimedeanSolids.UPGRADES_TIER_0 = ["cnxTruncatedSolids", "cnxCuboctahedronGenerator", "cnxIcosidodecahedronGenerator", "cnxGreatRhombicosidodecahedronGenerator"];
	  	Class.cnxIrregularSolids.UPGRADES_TIER_0 = ["cnxHosohedraSolids", "cnxPyramidSolids", "cnxRectangularPrismGenerator", "cnxSlabGenerator"];
	  	Class.cnxMiscSolids.UPGRADES_TIER_0 = ["cnxSphereGenerator", "cnxCylinderGenerator", "cnxConeGenerator"];
	  	Class.cnxHosohedraSolids.UPGRADES_TIER_0 = ["cnxLuneGenerator", "cnxDigonalHosohedronGenerator"];
	  	Class.cnxPyramidSolids.UPGRADES_TIER_0 = ["cnxSquarePyramidGenerator", "cnxPentagonalPyramidGenerator", "cnxHexagonalPyramidGenerator"];
	  	Class.cnxTruncatedSolids.UPGRADES_TIER_0 = ["cnxTruncatedTetrahedronGenerator", "cnxTruncatedCubeGenerator", "cnxTruncatedOctahedronGenerator", "cnxTruncatedDodecahedronGenerator", "cnxTruncatedIcosahedronGenerator"];
	  	Class.cnxCatalanSolids.UPGRADES_TIER_0 = ["cnxTriakisSolids", "cnxTriacontahedronGenerator", "cnxDisdyakisTriacontahedronGenerator"];
	  	Class.cnxTriakisSolids.UPGRADES_TIER_0 = ["cnxTriakisTetrahedronGenerator", "cnxTriakisCubeGenerator", "cnxTriakisOctahedronGenerator", "cnxTriakisDodecahedronGenerator", "cnxTriakisIcosahedronGenerator"];

//     Config.FOOD_TYPES = [
//         [2000, [
//             [1024, 'egg'], [256, 'square'], [64, 'triangle'], [16, 'pentagon'], [4, 'betaPentagon'], [1, 'alphaPentagon']
//         ]],
//         [1, [
//             [3125, 'gem'], [625, 'shinySquare'], [125, 'shinyTriangle'], [25, 'shinyPentagon'], [5, 'shinyBetaPentagon'], [1, 'shinyAlphaPentagon']
//         ]],
//         [0.1, [
//             [6836, 'jewel'], [1296, 'legendarySquare'], [216, 'legendaryTriangle'], [36, 'legendaryPentagon'], [6, 'legendaryBetaPentagon'], [1, 'legendaryAlphaPentagon']
//         ]],
//         [0.005, [
//             /*[16807, 'egg'], */[2401, 'shadowSquare'], [343, 'shadowTriangle'], [49, 'shadowPentagon'], [7, 'shadowBetaPentagon'], [1, 'shadowAlphaPentagon']
//         ]],
//         [0.001, [
//             /*[65536, 'egg'], */[8192, 'rainbowSquare'], [1024, 'rainbowTriangle'], [64, 'rainbowPentagon'], [8, 'rainbowBetaPentagon'], [1, 'rainbowAlphaPentagon']
//         ]],
//         [0.0005, [
//             [59549, 'egg'], [6561, 'transSquare'], [729, 'transTriangle'], [81, 'transPentagon'], [9, 'transBetaPentagon'], [1, 'transAlphaPentagon']
//         ]],
//         [1000, [
//             [1000000, 'cnxSphere'], [1000000/4, 'cnxTetrahedron'], [1000000/6, 'cnxCube'], [1000000/8, 'cnxOctahedron'], [1000000/12, 'cnxDodecahedron'], [1000000/20, 'cnxIcosahedron'], [1000000/8, 'cnxCuboctahedron'], [1000000/30, 'cnxIcosidodecahedron'], [1000000/62, 'cnxGreatRhombicosidodecahedron'], [1000000/6, 'cnxRectangularPrism'], [1000000/6, 'cnxSlab'], [1000000/1.4, 'cnxCylinder'], [1000000/1.6, 'cnxCone'], [1000000/2, 'cnxLune'], [1000000/4, 'cnxLune'], [1000000/5, 'cnxSquarePyramid'], [1000000/6, 'cnxPentagonalPyramid'], [1000000/7, 'cnxHexagonalPyramid'], [1000000/8, 'cnxTruncatedTetrahedron'], [1000000/14, 'cnxTruncatedCube'], [1000000/14, 'cnxTruncatedOctahedron'], [1000000/32, 'cnxTruncatedDodecahedron'], [1000000/32, 'cnxTruncatedIcosahedron'], [1000000/12, 'cnxTriakisTetrahedron'], [1000000/24, 'cnxTriakisCube'], [1000000/24, 'cnxTriakisOctahedron'], [1000000/60, 'cnxTriakisDodecahedron'], [1000000/60, 'cnxTriakisIcosahedron'], [1000000/30, 'cnxTriacontahedron'], [1000000/120, 'cnxDisdyakisTriacontahedron']
//         ]]
//     ];
//     Config.FOOD_TYPES_NEST = [
//         [1, [
//             [16, 'pentagon'], [ 4, 'betaPentagon'], [ 1, 'alphaPentagon']
//         ]],
//         [0.5, [
//             [1000000/12, 'cnxDodecahedron'], [1000000/20, 'cnxIcosahedron'], [1000000/30, 'cnxIcosidodecahedron'], [1000000/62, 'cnxGreatRhombicosidodecahedron'], [1000000/14, 'cnxTruncatedCube'], [1000000/14, 'cnxTruncatedOctahedron'], [1000000/32, 'cnxTruncatedDodecahedron'], [1000000/32, 'cnxTruncatedIcosahedron'], [1000000/12, 'cnxTriakisTetrahedron'], [1000000/24, 'cnxTriakisCube'], [1000000/24, 'cnxTriakisOctahedron'], [1000000/60, 'cnxTriakisDodecahedron'], [1000000/60, 'cnxTriakisIcosahedron'], [1000000/30, 'cnxTriacontahedron'], [1000000/120, 'cnxDisdyakisTriacontahedron']
//         ]]
//     ];
};