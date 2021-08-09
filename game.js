/* eslint-disable max-len */
/* eslint-disable linebreak-style */

kaboom({
  global: true,
  fullscreen: true,
  scale: 1.5,
  debug: true,
  clearColor: [0, 1, 1, 1],
});

MOVE_SPEED = 155;
JUMP_FORCE = 435;
BIG_JUMP_FORCE = 450;
CURRENT_JUMP_FORCE = JUMP_FORCE;
isJumping = true;
FALL_DEATH = 400;
directions = {
  LEFT: 'left',
  RIGHT: 'right',
};

const BULLET_SPEED = 480;

loadRoot('https://i.imgur.com/');
loadSprite('cloud', 'r33O1Ho.png');
loadSprite('doubleCloud', 'YKUfqgu.png');
loadSprite('coin', 'wbKxhcd.png');
loadSprite('evil-shroom', 'KPO3fR9.png');
loadSprite('brick', 'pogC9x5.png');
loadSprite('block', 'M6rwarW.png');
loadSprite('brown-brick', 'nYDwuug.png');
loadSprite('brown-steel', 'AfZajME.png');
loadSprite('mario', 'Wb1qfhK.png'); // Mario standing small
loadSprite('marioRight', '2r2Agzs.png');//  Mario right
loadSprite('marioLeft', 'vujGU6O.png'); //  Mario left
loadSprite('marioMedium', 'kZTgkcC.png');// Mario medium
loadSprite('marioMediumLeft', '60tt3zQ.png');// Mario medium left
loadSprite('marioSuperRight', 'QDCgHkb.png'); // Mario super right
loadSprite('marioSuperLeft', 'QrVQJFp.png'); // Mario super left
loadSprite('endFlag', '7R5zHud.png'); // End flag
loadSprite('greenHill', 'g09tOqP.png'); // Green Hill
loadSprite('fireball', 'MkHqQl7.png'); // FireBall

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
      '                      c                                                                                                                                                                                                       ',
      '                                          d                            c                                                                                                                                                              ',
      '         c                       d c                         c                                                                                                                                      ~~                        ',
      '                         %                                                         ________     __%               *            ___    _%%_                                                         ~~~                                 ',
      '                                                                                                                                                                                                  ~~~~    f        ____                      ',
      '                                                                                                                                                                                                 ~~~~~             ____                         ',
      '                  %    _*_*_                                                _*_                   _      __    %  %  %     _          __        ~  ~          ~~  ~~            __%_            ~~~~~~             ____                  ',
      '                                                                                                                                               ~~  ~~        ~~~  ~~~                          ~~~~~~~            __  __                  ',
      '                                  -+       -+     -+        -+                                                                                ~~~  ~~~      ~~~~  ~~~~     -+              -+ ~~~~~~~~            __  __                       ',
      '                            ^     ()       () ^   ()   ^^   ()                                                                               ~~~~  ~~~~    ~~~~~  ~~~~~    ()              ()~~~~~~~~~            __  __                           ',
      '=======================================================================  ==============   ======================================================================  ====================================================                              ',
      '=======================================================================  ==============   ======================================================================  ====================================================                                ',
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
      '£    £££££££  -+£',
      '!!!!!!!!!!!!!!!!!',
      '!!!!!!!!!!!!!!!!!',
    ],
    [
      '£                                                     £            £',
      '£                                                     £            £',
      '£                                                     £            £',
      '£                                                     £            £',
      '£                                 £ ££££££ £          ££££         £',
      '£    %%%%%%%%%%%%                 £$£    £$£             £         £',
      '£                                 £££    £££             £         £',
      '£                                                                  £',
      '£                                                                  £',
      '!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!',
      '!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!',
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
    'f': [sprite('endFlag'), solid(), scale(0.1), 'endFlag'],
    'g': [sprite('greenHill'), scale(0.1)],
    '_': [sprite('brown-brick'), solid(), scale(0.622)],
    '~': [sprite('brown-steel'), solid(), scale(0.622)],

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
      shrink() {
        CURRENT_JUMP_FORCE = JUMP_FORCE;
        player.changeSprite('mario');
        this.scale = vec2(1.0);
        return isBig = false;
      },
      shrinker() {
        this.scale = vec2(1.0);
        return isBig = true, isBigger = false;
      },
      growBig() {
        CURRENT_JUMP_FORCE = BIG_JUMP_FORCE;
        player.changeSprite('marioMedium');
        this.scale = vec2(1.0);
        return isBig = true;
      },
      growBigger() {
        player.changeSprite('marioSuperRight');
        this.scale = vec2(1.0);
        return isBigger = true, isBig = false;
      },
    };
  }

  const currentDirection = directions.RIGHT;

  // eslint-disable-next-line valid-jsdoc
  /**
 *@type{string}
 */
  function spawnBullet(bulletpos) {
    if (currentDirection == directions.LEFT) {
      bulletpos = bulletpos.sub(10 - 10);
    } else if (currentDirection == directions.RIGHT) {
      bulletpos = bulletpos.add(10, -10);
    }
    add([
      sprite('fireball'),
      scale(0.03), // Size of fireball
      pos(bulletpos),
      origin('center'),
      color(1, 1, 1),
      'bullet',
      {
        bulletSpeed: currentDirection ==
        directions.LEFT ? -1 * BULLET_SPEED : BULLET_SPEED,
      },
    ]);
  }

  action('bullet', (b) => {
    b.move(b.bulletSpeed, 0);
    if ((b.pos.x < 0) || (b.pos.x > map)) {
      destroy(b);
    }
  });

  const player = add([ // Create player
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

  player.collides('mushroom', (m) => { // mushroom collide
    destroy(m);
    if (isBig) {
      player.growBigger();
    } else {
      player.growBig();
    }
  });

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

  let isBig = false;
  let isBigger = false;
  player.collides('dangerous', (d) => {
    if (isJumping) {
      destroy(d);
    } else if (isBigger) {
      camShake(1);
      wait(0.2, () => {
        player.shrinker();
      });
    } else if (isBig) {
      camShake(1);
      wait(0.2, () => {
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
        player,
      });
    });
  });

  player.collides('endFlag', () => {
    keyPress('right', () => {
      go('lose', {score: scoreLabel.value});
    });
  });

  collides('dangerous', 'bullet', (dangerous, bullet) => {
    destroy(dangerous);
    destroy(bullet);
  });

  keyDown('left', () => {
    if (isBigger) {
      player.changeSprite('marioSuperLeft');
      player.move(-MOVE_SPEED, 0);
      body();
      origin('bot');
    } else if (isBig) {
      player.changeSprite('marioMediumLeft');
      player.move(-MOVE_SPEED, 0);
      body();
      origin('bot');
    } else {
      player.changeSprite('marioLeft');
      player.move(-MOVE_SPEED, 0);
      body();
      origin('bot');
    }
  });

  keyDown('right', () => {
    if (isBigger) {
      player.changeSprite('marioSuperRight');
      player.move(MOVE_SPEED, 0);
      body();
      origin('bot');
    } else if (isBig) {
      player.changeSprite('marioMedium');
      player.move(MOVE_SPEED, 0);
      body();
      origin('bot');
    } else {
      player.changeSprite('marioRight');
      player.move(MOVE_SPEED, 0);
      body();
      origin('bot');
    }
  });

  player.action(() => {
    if (player.grounded()) {
      isJumping = false;
    }
  });

  keyPress('space', () => {
    if (isBigger) {
      spawnBullet(player.pos);
    }
  });

  keyPress('up', () => {
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
