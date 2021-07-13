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
loadSprite('mario', 'Wb1qfhK.png'); // small
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
      '        c                                      c                   ',
      '                          d                                          ',
      '            %                                                    ',
      '                                                                 ',
      '                                                                 ',
      '     %    =*=%=                                  -+                ',
      '                                                 ()                ',
      '                            -+        -+         ()                   ',
      '                    ^   ^   ()   ^    ()         ()                   ',
      '================================================================   ===========',
      '================================================================   ===========',
    ],
    [
      '£                                       £',
      '£                                       £',
      '£                                       £',
      '£                                       £',
      '£                                       £',
      '£        @@@@@@              x x        £',
      '£                          x x x        £',
      '£                        x x x x  x   -+£',
      '£               z   z  x x x x x  x   ()£',
      '!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!',
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
    '^': [sprite('evil-shroom'), {dir: -1}, 'dangerous'],
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
  function big() {
    return {
      smallify() {
        this.scale = vec2(1);
        CURRENT_JUMP_FORCE = JUMP_FORCE;
        return isBig = false;
      },
      biggify() {
        CURRENT_JUMP_FORCE = BIG_JUMP_FORCE;
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
    big(),
    origin('bot'),
  ]);

  player.action(() => {
    player.resolve();
  });

  action('mushroom', (m) => {
    m.move(20, 0);
  });

  player.on('headbump', (obj) => {
    if (obj.is('coin-surprise')) {
      gameLevel.spawn('$', obj.gridPos.sub(0, 1));
      destroy(obj);
      gameLevel.spawn('}', obj.gridPos.sub(0, 0));
    }
    if (obj.is('mushroom-surprise')) {
      gameLevel.spawn('#', obj.gridPos.sub(0, 1));
      destroy(obj);
      gameLevel.spawn('}', obj.gridPos.sub(0, 0));
    }
  });

  player.collides('mushroom', (m) => {
    destroy(m);
    player.biggify();
  });

  player.collides('coin', (c) => {
    destroy(c);
    scoreLabel.value++;
    scoreLabel.text = scoreLabel.value;
  });

  const ENEMY_SPEED = 20;

  action('dangerous', (d) => {
    d.move(d.dir * ENEMY_SPEED, 0);
    body();
  });

  collides('dangerous', 'pipe-right', (d) => {
    d.dir = -d.dir;
  });

  collides('dangerous', 'pipe-left', (d) => {
    d.dir = -d.dir;
  });

  let isBig = false;
  player.collides('dangerous', (d) => {
    if (isJumping) {
      destroy(d);
    } else if (isBig) {
      camShake(1);
      wait(0.1, () => {
        player.smallify();
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
    player.move(-MOVE_SPEED, 0);
  });

  keyDown('right', () => {
    player.move(MOVE_SPEED, 0);
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

scene('lose', ({score}) => {
  add([text(score, 32), origin('center'), pos(width() / 2, height() / 2)]);
});

start('game', {level: 0, score: 0});
