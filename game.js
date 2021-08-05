/* eslint-disable linebreak-style */

kaboom({
  global: true,
  fullscreen: true,
  scale: 1.5,
  debug: true,
  clearColor: [0, 1, 1, 1],
});

const MOVE_SPEED = 120;
const JUMP_FORCE = 400;
const BIG_JUMP_FORCE = 450;
let CURRENT_JUMP_FORCE = JUMP_FORCE;
let isJumping = true;
const FALL_DEATH = 400;

loadRoot('https://i.imgur.com/');
loadSprite('cloud', 'r33O1Ho.png');
loadSprite('doubleCloud', 'YKUfqgu.png');
loadSprite('coin', 'wbKxhcd.png');
loadSprite('evil-shroom', 'KPO3fR9.png');
loadSprite('brick', 'pogC9x5.png');
loadSprite('block', 'M6rwarW.png');
loadSprite('mario', 'Wb1qfhK.png'); // Mario standing small
loadSprite('marioRight', '2r2Agzs.png');//  Mario right
loadSprite('marioLeft', 'vujGU6O.png'); //  Mario left
loadSprite('mushroom', '0wMd92p.png');
loadSprite('surprise', 'gesQ1KP.png');
loadSprite('unboxed', 'bdrLpi6.png');
loadSprite('pipe-top-left', 'ReTPiWY.png');
loadSprite('pipe-top-right', 'hj2GK4n.png');
loadSprite('pipe-bottom-left', 'c1cYSbt.png');
loadSprite('pipe-bottom-right', 'nqQ79eI.png');

loadSprite('blue-block', 'fVscIbn.png');
loadSprite('blue-brick', '3e5YRQd.png');
loadSprite('blue-steel', 'gqVoI2b.png');
loadSprite('blue-evil-shroom', 'SvV4ueD.png');
loadSprite('blue-surprise', 'RMqCc1G.png');


scene('game', ({level, score}) => {
  layers(['bg', 'obj', 'ui'], 'obj');

  const maps = [
    [
      '                      c                                                                                                                            ',
      '                                          d                            c                                                                           ',
      '         c                       d c                         c                                                                                     ',
      '                         %                                                         ========     ==%               *            ===    =%%=         ',
      '                                                                                                                                                   ',
      '                                                                                                                                                   ',
      '                  %    =*=%=                                                =*=                   =      ==    %  %  %     =           ==          ',
      '                                                                                                                                                   ',
      '                                  -+       -+     -+        -+                                                                                     ',
      '                            ^     ()       () ^   ()   ^^   ()                                                                                     ',
      '=======================================================================  ==============      ===============================================       ',
      '=======================================================================  ==============      ===============================================       ',
    ],
    [
      '£    !!!!!!!    £',
      '£               £',
      '£               £',
      '£     $$$$$     £',
      '£    $$$$$$$    £',
      '£    $$$$$$$    £',
      '£    £££££££    £',
      '£    £££££££  -+£',
      '£    £££££££  ()£',
      '!!!!!!!!!!!!!!!!!',
      '!!!!!!!!!!!!!!!!!',
    ],
  ];

  const levelCfg = {
    'width': 20,
    'height': 20,
    '=': [sprite('block'), solid()],
    '$': [sprite('coin'), 'coin'],
    '%': [sprite('surprise'), solid(), 'coin-surprise'],
    '*': [sprite('surprise'), solid(), 'mushroom-surprise'],
    '}': [sprite('unboxed'), solid()],
    '(': [sprite('pipe-bottom-left'), solid(), scale(0.5), 'pipe-left'],
    ')': [sprite('pipe-bottom-right'), solid(), scale(0.5), 'pipe-right'],
    '-': [sprite('pipe-top-left'), solid(), scale(0.5), 'pipe'],
    '+': [sprite('pipe-top-right'), solid(), scale(0.5), 'pipe'],
    '^': [sprite('evil-shroom'), { dir: -1 }, 'dangerous'],
    '#': [sprite('mushroom'), solid(), 'mushroom', body()],
    '!': [sprite('blue-block'), solid(), scale(0.5)],
    '£': [sprite('blue-brick'), solid(), scale(0.5)],
    'z': [sprite('blue-evil-shroom'), solid(), scale(0.5), 'dangerous'],
    '@': [sprite('blue-surprise'), solid(), scale(0.5), 'coin-surprise'],
    'x': [sprite('blue-steel'), solid(), scale(0.5)],
    'c': [sprite('cloud'), scale(0.08)],
    'd': [sprite('doubleCloud'), scale(0.1)],

  };

  const gameLevel = addLevel(maps[level], levelCfg);

  const scoreLabel = add([
    text(score),
    pos(30, 6),
    layer('ui'),
    {
      value: score,
    },
  ]);

  add([text('level ' + parseInt(level + 1)), pos(40, 6)]);

  /**
 *@return {boolean}
 */
  function drinkMePotion() {
    return {
<<<<<<< HEAD
      shrink() {
        this.scale = vec2(0.8);
        CURRENT_JUMP_FORCE = JUMP_FORCE;
        return isBig = false;
      },
      growBig() {
        CURRENT_JUMP_FORCE = BIG_JUMP_FORCE;
=======
      shrink() { // Character shrink
        this.scale = vec2(1);
        //CURRENT_JUMP = JUMPFORCE;
        return isBig = false;
      },
      growBig() { // Character grow
        //CURRENT_JUMP = BIG_JUMP_FORCE;
>>>>>>> 58d012ccf288a9c1e10d5b15bf94c40146a2f635
        // player.changeSprite('evil-shroom')
        this.scale = vec2(1.1);
        return isBig = true;
      },
    };
  }

  const player = add([
    sprite('mario'), solid(),
    pos(30, 0),
    scale(0.8),
    body(),
    drinkMePotion(),
    origin('bot'),
  ]);

  player.action(() => {
    player.resolve();
  });

  action('mushroom', (m) => {
    m.move(20, 0);
  });

  player.on('headbump', (obj) => {
    if (obj.is('coin-surprise')) { // coin appear after hitting block
      gameLevel.spawn('$', obj.gridPos.sub(0, 1));
      destroy(obj);
      gameLevel.spawn('}', obj.gridPos.sub(0, 0));
    }
    if (obj.is('mushroom-surprise')) { // mushroom appear after hitting block
      gameLevel.spawn('#', obj.gridPos.sub(0, 1));
      destroy(obj);
      gameLevel.spawn('}', obj.gridPos.sub(0, 0));
    }
  });

<<<<<<< HEAD
  player.collides('mushroom', (m) => { // mushroom collide
    destroy(m);
    player.growBig();
  });
=======
  player.on("headbump", (obj) => {
    if (obj.is('coin-surprise')) {
      gameLevel.spawn('$', obj.gridPos.sub(0, 1))
      destroy(obj)
      gameLevel.spawn('}', obj.gridPos.sub(0,0))
    }
    if (obj.is('mushroom-surprise')) {
      gameLevel.spawn('#', obj.gridPos.sub(0, 1))
      destroy(obj)
      gameLevel.spawn('}', obj.gridPos.sub(0,0))
    }
  })

  player.collides('mushroom', (m) => {
    destroy(m)
    player.growBig()
  })

  player.collides('coin', (c) => {
    destroy(c)
    scoreLabel.value++
    scoreLabel.text = scoreLabel.value
  })

  //  Collides coin here.....................
>>>>>>> 58d012ccf288a9c1e10d5b15bf94c40146a2f635

  player.collides('coin', (c) => { // coin collide
    destroy(c);
    scoreLabel.value++;
    scoreLabel.text = scoreLabel.value;
  });

  const ENEMY_SPEED = 20;

  action('dangerous', (d) => { // mashroom movement
    d.move(d.dir * ENEMY_SPEED, 0);
    body();
  });

  collides('dangerous', 'pipe-right', (d) => { // mashroom bounces between pipe
    d.dir = -d.dir;
  });

  collides('dangerous', 'pipe-left', (d) => { // mashroom bounces between pipe
    d.dir = -d.dir;
  });

  //  Fireball function here

  let isBig = false;
  player.collides('dangerous', (d) => {
    if (isJumping) {
      destroy(d);
    } else if (isBig) {
      camShake(1);
      wait(0.1, () => {
        player.shrink();
      });
    } else {
      go('lose', {score: scoreLabel.value});
    }
  });

  player.action(() => {
    camPos(player.pos);
    if (player.pos.y >= FALL_DEATH) {
      go('lose', {score: scoreLabel.value});
    }
  });

  player.collides('pipe', () => {
    keyPress('down', () => {
      go('game', {
        level: (level + 1) % maps.length,
        score: scoreLabel.value,
      });
    });
  });

  keyDown('left', () => {
    player.changeSprite('marioLeft');
    player.move(-MOVE_SPEED, 0);
    body();
    origin('bot');
  });

  keyDown('right', () => {
    player.changeSprite('marioRight');
    player.move(MOVE_SPEED, 0);
    body();
    origin('bot');
  });

  player.action(() => {
    if (player.grounded()) {
      isJumping = false;
    }
  });

  keyPress('space', () => {
    if (player.grounded()) {
      isJumping = true;
      player.jump(CURRENT_JUMP_FORCE);
    }
  });
});

scene('lose', ({ score }) => {
  add([text(score, 32), origin('center'), pos(width() / 2, height() / 2)]);
});

start('game', { level: 0, score: 0 });
