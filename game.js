/* eslint-disable linebreak-style */
/* https://www.freecodecamp.org/news/how-to-build-mario-zelda-and-space-invaders-with-kaboom-js/ Date: 14Jul21 */

kaboom({
  global: true,
  fullscreen: true,
  scale: 1.5,
  debug: true,
  clearColor: [0, 1, 1, 1],
});

const MOVE_SPEED = 120;
const JUMPHEIGHT = 400;
let isJumping = true;
let CURRENT_JUMP = JUMPHEIGHT;
const FALL_DEATH = 400;

loadRoot('https://i.imgur.com/');
loadSprite('cloud', 'r33O1Ho.png');
loadSprite('doubleCloud', 'YKUfqgu.png');
loadSprite('coin', 'wbKxhcd.png');
loadSprite('evilShroom', 'KPO3fR9.png');
loadSprite('brick', 'pogC9x5.png');
loadSprite('block', 'M6rwarW.png');
loadSprite('mario', 'Wb1qfhK.png'); // Mario standing small
loadSprite('marioRight', '2r2Agzs.png');//  Mario right
loadSprite('marioLeft', 'vujGU6O.png'); //  Mario left
loadSprite('marioMiddle', 'kZTgkcC.png');
loadSprite('mushroom', '0wMd92p.png');
loadSprite('surprise', 'gesQ1KP.png');
loadSprite('unboxed', 'bdrLpi6.png');
loadSprite('pipeTopLeft', 'ReTPiWY.png'); // top left pipe
loadSprite('pipeTopRight', 'hj2GK4n.png'); // top right pipe
loadSprite('pipeBottomLeft', 'c1cYSbt.png'); // bottom left pipe
loadSprite('pipeBottomRight', 'nqQ79eI.png'); // bottom right pipe

loadSprite('blueBlock', 'fVscIbn.png');
loadSprite('blueBrick', '3e5YRQd.png');
loadSprite('blueSteel', 'gqVoI2b.png');
loadSprite('blueEvilShroom', 'SvV4ueD.png');
loadSprite('blueSurprise', 'RMqCc1G.png');


scene('game', ({ level, score }) => {
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
    '(': [sprite('pipeBottomLeft'), solid(), scale(0.5), 'pipeLeft'],
    ')': [sprite('pipeBottomRight'), solid(), scale(0.5), 'pipeRight'],
    '-': [sprite('pipeTopLeft'), solid(), scale(0.5), 'pipe'],
    '+': [sprite('pipeTopRight'), solid(), scale(0.5), 'pipe'],
    '^': [sprite('evilShroom'), { dir: -1 }, 'dangerous'],
    '#': [sprite('mushroom'), solid(), 'mushroom', body()],
    '!': [sprite('blueBlock'), solid(), scale(0.5)],
    '£': [sprite('blueBrick'), solid(), scale(0.5)],
    'z': [sprite('blueEvilShroom'), solid(), scale(0.5), 'dangerous'],
    '@': [sprite('blueSurprise'), solid(), scale(0.5), 'coinSurprise'],
    'x': [sprite('blueSteel'), solid(), scale(0.5)],
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
  function drinkMePotion() { // Character grow or shrink
    return {
      shrink() { // Character shrink
        this.scale = vec2(1);
        CURRENT_JUMP = JUMPFORCE;
        return isBig = false;
      },
      growBig() { // Character grow
        CURRENT_JUMP = BIG_JUMP_FORCE;
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
    origin('bot'),
  ]);

  player.action(() => {
    player.resolve();
  });

  //  Mushroom function here.................

  //  Coin function here....................

  //  Headbump functio here....................

  //  Collides coin here.....................

  //  Collides mushroom.....................

  const ENEMY_SPEED = 20;

  action('dangerous', (d) => {//  emeny movement
    d.move(d.dir * ENEMY_SPEED, 0);
    body();
  });

  collides('dangerous', 'pipeRight', (d) => { //  Bournces between pipes
    d.dir = -d.dir;
  });

  collides('dangerous', 'pipeLeft', (d) => { // Bounces between pipes
    d.dir = -d.dir;
  });

  // FireBall function here.......................

  let isBig = false;
  player.collides('dangerous', (d) => {
    if (isJumping) {
      destroy(d);
    } else if (isBig) { //  If character big shrink
      camShake(1);
      wait(0.1, () => {
        player.smallify();
      });
    } else { // If character is shrink kill
      go('lose', { score: scoreLabel.value });
    }
  });

  player.action(() => {
    camPos(player.pos);
    if (player.pos.y >= FALL_DEATH) {
      go('lose', { score: scoreLabel.value });
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
      player.jump(CURRENT_JUMP);
    }
  });
});

scene('lose', ({ score }) => {
  add([text(score, 32), origin('center'), pos(width() / 2, height() / 2)]);
});

start('game', { level: 0, score: 0 });
