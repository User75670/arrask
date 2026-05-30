let { bossSpawn:   b  , atmg:  A  , outside:   o  } = require('../tiles/siege.js'),
    { wall: WALL, nestNoBoss:  n, normal:   _  } = require('../tiles/misc.js'),
	{ base1:   s  } = require('../tiles/tdm.js'),

room = [
    [  o ,  o ,  o ,  o ,  o ,  o ,  o ,WALL,WALL,WALL,WALL,WALL,WALL,WALL,WALL,WALL,WALL,  o ,  o ],
    [  o ,  A ,  o ,  o ,  o ,  o ,  o ,WALL,  b ,  b ,  b ,WALL,  b ,  b ,  b ,  b ,WALL,  A ,  o ],
    [  o ,  o ,  o ,  o ,  o ,  o ,  o ,WALL,  _ ,  _ ,  _ ,WALL,  b ,  _ ,  _ ,  b ,WALL,  o ,  o ],
    [  o ,  o ,  o ,  o ,WALL,WALL,WALL,WALL,  _ ,  _ ,  _ ,WALL,  b ,  _ ,  _ ,  b ,WALL,  o ,  o ],
    [  o ,  o ,  o ,WALL,WALL,  n ,  n ,WALL,  _ ,  _ ,  _ ,WALL,  b ,  _ ,  _ ,  b ,WALL,  o ,  o ],
    [  o ,  o ,  o ,WALL,  n ,  n ,  _ ,  _ ,  _ ,  _ ,  _ ,WALL,  b ,  _ ,  _ ,  b ,WALL,  o ,  o ],
    [  o ,  o ,  o ,WALL,  n ,  _ ,  _ ,  _ ,  _ ,  _ ,  _ ,WALL,  b ,  _ ,  _ ,  b ,WALL,  o ,  o ],
    [WALL,WALL,WALL,WALL,WALL,  _ ,  _ ,  _ ,  _ ,  _ ,  _ , _  ,  _ ,  _ ,  _ ,  b ,WALL,  o ,  o ],
    [WALL,  s ,  _ ,  s ,WALL,  _ ,  _ ,  _ ,  n ,  _ ,  _ , _  ,  _ ,  _ ,  _ ,  b ,WALL,  o ,  o ],
    [WALL,  _ ,  _ ,  _ ,  _ ,  _ ,  _ ,  n ,  n ,  n ,  _ , _  ,  _ ,  _ ,  _ ,  b ,WALL,  o ,  A ],
    [WALL,  s ,  _ ,  s ,WALL,  _ ,  _ ,  _ ,  n ,  _ ,  _ , _  ,  _ ,  _ ,  _ ,  b ,WALL,  o ,  o ],
    [WALL,WALL,WALL,WALL,WALL,  _ ,  _ ,  _ ,  _ ,  _ ,  _ , _  ,  _ ,  _ ,  _ ,  b ,WALL,  o ,  o ],
    [  o ,  o ,  o ,WALL,  n ,  _ ,  _ ,  _ ,  _ ,  _ ,  _ ,WALL,  b ,  _ ,  _ ,  b ,WALL,  o ,  o ],
    [  o ,  o ,  o ,WALL,  n ,  n ,  _ ,  _ ,  _ ,  _ ,  _ ,WALL,  b ,  _ ,  _ ,  b ,WALL,  o ,  o ],
    [  o ,  o ,  o ,WALL,WALL,  n ,  n ,WALL,  _ ,  _ ,  _ ,WALL,  b ,  _ ,  _ ,  b ,WALL,  o ,  o ],
    [  o ,  o ,  o ,  o ,WALL,WALL,WALL,WALL,  _ ,  _ ,  _ ,WALL,  b ,  _ ,  _ ,  b ,WALL,  o ,  o ],
    [  o ,  o ,  o ,  o ,  o ,  o ,  o ,WALL,  _ ,  _ ,  _ ,WALL,  b ,  _ ,  _ ,  b ,WALL,  o ,  o ],
    [  o ,  A ,  o ,  o ,  o ,  o ,  o ,WALL,  b ,  b ,  b ,WALL,  b ,  b ,  b ,  b ,WALL,  A ,  o ],
    [  o ,  o ,  o ,  o ,  o ,  o ,  o ,WALL,WALL,WALL,WALL,WALL,WALL,WALL,WALL,WALL,WALL,  o ,  o ],
];

module.exports = room;