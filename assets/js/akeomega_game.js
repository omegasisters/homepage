/* 効果音素材
OtoLogic
> https://otologic.jp (CC BY 4.0)
*/

/* 背景画像素材(加工元)
いらすとや
> https://www.irasutoya.com/2016/01/blog-post_351.html
> https://www.irasutoya.com/2017/11/blog-post_794.html
*/

enchant();

window.onload = () => {
  // global settings
  const FPS = 60;
  const WIDTH = 128;
  const HEIGHT = 128;
  const HORIZON = 85;
  const VERSION = '1.0.0';

  var current_score = 0;

  // initialize game instance
  let game = new Game(WIDTH, HEIGHT);
  game.fps = FPS;
  //game.keybind(32, 'a');

  // preloading assets
  let assets = [
    '../../assets/images/walk_rays.png',
    '../../assets/images/walk_rios.png',
    '../../assets/images/walk_unchan.png',
    '../../assets/images/walk_unchan_mochi.png',
    '../../assets/images/bg_outside_buildings_resized.png',
    '../../assets/images/bg_outside_buildings_yuyake_resized.png',
    '../../assets/images/share_on_twitter.png',
    '../../assets/sounds/synchronity_rmx_fami.mp3',
    '../../assets/sounds/Onmtp-Click03-1.mp3',
  ];
  assets.forEach((item) => {
    game.preload(item);
  });

  // centering game window element
  const wrapper_width = $('#enchant-wrapper').width();
  const wrapper_height = $('#enchant-wrapper').height();
  game.scale = Math.min(
    wrapper_width / game.width,
    wrapper_height / game.height,
  );
  const left = (wrapper_width - game.width * game.scale) / 2;
  const top = (wrapper_height - game.height * game.scale) / 2;
  $('#enchant-stage').css({
    position: 'absolute',
    left: left + 'px',
    top: top + 'px',
    imageRendering: 'pixelated',
  });

  // when start game
  game.onload = () => {
    // start game
    const titleScene = createTitleScene();
    game.pushScene(titleScene);

    game.rootScene.backgroundColor = 'rgba(0, 0, 0, 0.8)';
  };

  // Function

  var createMovableSprite = function(image_path, x, y, x_speed, y_speed) {
    var sprite = new Sprite(512, 128);
    sprite.image = game.assets[image_path];
    sprite.x = x;
    sprite.y = y;
    sprite.onenterframe = function() {
      if (game.fps % 20 == 0) {
        sprite.x += x_speed;
        sprite.y += y_speed;
        if (game.width == this.x) {
          this.x = -(this.width + (this.width - game.width));
        }
      }
    };
    return sprite;
  };

  var createScene = function(image_path) {
    var scene = new Scene();
    var background = new Sprite(game.width, game.height);
    if (image_path) {
      background.image = game.assets[image_path];
    }
    background.x = 0;
    background.y = 0;
    scene.addChild(background);
    return scene;
  };

  var createGameScene = function() {
    var scene = createScene();

    const now_hour = new Date().getHours();
    const background_image =
      6 < now_hour && now_hour < 18
        ? '../../assets/images/bg_outside_buildings_resized.png'
        : '../../assets/images/bg_outside_buildings_yuyake_resized.png';
    const bg1 = createMovableSprite(background_image, 0, 0, 2, 0);
    const bg2 = createMovableSprite(background_image, -512, 0, 2, 0);
    scene.addChild(bg1);
    scene.addChild(bg2);

    var ray = new Ray((game.width / 3) * 2, HORIZON);
    var rio = new Rio((game.width / 3) * 2 + 20, HORIZON);
    var un = new Unchan(-512, HORIZON + 10);
    var un_mochi = new UnchanMochi(-1024, HORIZON + 10);
    scene.addChild(ray);
    scene.addChild(rio);
    scene.addChild(un);
    scene.addChild(un_mochi);

    const score = new Label();
    score.x = score.y = 5;
    score.font = '10px arial';
    score.color = '#FFF';
    score.onenterframe = function() {
      current_score++;
      if (current_score <= 5000) {
        this.text = `SCORE: ${current_score}`;
      } else {
        current_score = 5000;
        this.opacity = new Date().getMilliseconds() > 500 ? 1 : 0;

        if (ray.x < -512) {
          const gameover = createGameOverScreen();
          game.pushScene(gameover);
        }
      }
    };
    scene.addChild(score);

    const jumpSe = game.assets['../../assets/sounds/Onmtp-Click03-1.mp3'];
    const bgm = game.assets['../../assets/sounds/synchronity_rmx_fami.mp3'];
    bgm.play();
    bgm.src.loop = true;

    scene.onenterframe = function() {
      if (
        (current_score < 5000 && ray.within(un, 14)) ||
        ray.within(un_mochi, 14)
      ) {
        const gameover = createGameOverScreen();
        game.pushScene(gameover);
      }
    };
    scene.ontouchstart = () => {
      if (ray.y == HORIZON) {
        ray.frame = 0;
        ray.tl
          .moveBy(0, -32, 12, enchant.Easing.CUBIC_EASEOUT)
          .moveBy(0, 32, 12, enchant.Easing.CUBIC_EASEIN);

        rio.frame = 0;
        rio.tl
          .delay(10)
          .moveBy(0, -32, 12, enchant.Easing.CUBIC_EASEOUT)
          .moveBy(0, 32, 12, enchant.Easing.CUBIC_EASEIN);
        jumpSe.play();
      }
    };

    return scene;
  };

  var createTitleScene = function() {
    var scene = createScene(
      '../../assets/images/bg_outside_buildings_resized.png',
    );
    var ray = new Ray(game.width / 3, HORIZON);
    var rio = new Rio(game.width / 3 + 30, HORIZON);
    scene.addChild(ray);
    scene.addChild(rio);

    const title = new Label();
    title.text = 'あけおめが';
    title.font = 'bold 20px arial';
    title.x = game.width / 2 - 50;
    title.y = game.height / 2 - 30;
    title.color = '#FFF';
    scene.addChild(title);

    const touchToStart = new Label();
    touchToStart.text = 'TOUCH TO START';
    touchToStart.x = game.width / 2 - 35;
    touchToStart.y = game.height / 2;
    touchToStart.font = '8px arial';
    touchToStart.color = '#FFF';
    touchToStart.onenterframe = function() {
      this.opacity = new Date().getMilliseconds() > 500 ? 1 : 0;
    };
    scene.addChild(touchToStart);

    const version = new Label();
    version.text = `version: ${VERSION}`;
    version.x = game.width / 2 + 15;
    version.y = game.height - 8;
    version.font = '8px arial';
    version.color = '#FFF';
    scene.addChild(version);

    scene.ontouchstart = function() {
      const gameScene = createGameScene();
      game.pushScene(gameScene);
    };

    return scene;
  };

  var createGameOverScreen = function() {
    var scene = createScene();
    scene.backgroundColor = 'rgba(0, 0, 0, 0.8)';

    const title = new Label();
    title.text = '　 今年もよろしく！<br>あけましておめがとう！';
    title.font = 'bold 10px arial';
    title.x = game.width / 2 - 50;
    title.y = 10;
    title.color = '#FFF';
    scene.addChild(title);

    const score = new Label();
    score.text = `Your Score: ${current_score}`;
    score.font = 'bold 8px arial';
    score.x = game.width / 2 - 28;
    score.y = game.height / 2 - 20;
    score.color = '#FFF';
    scene.addChild(score);

    const tweet = new Sprite(128, 32);
    tweet.image = game.assets['../../assets/images/share_on_twitter.png'];
    tweet.x = 0;
    tweet.y = game.height / 2;
    tweet.ontouchstart = function() {
      shareOnTwitter(current_score);
    };
    scene.addChild(tweet);

    return scene;
  };

  // Class

  var Ray = Class.create(Sprite, {
    initialize: function(x, y) {
      Sprite.call(this, 16, 26);
      this.image = game.assets['../../assets/images/walk_rays.png'];
      this.x = x;
      this.y = y;
      this.frame = 1;
    },
    onenterframe: function() {
      if (game.frame % 24 == 0) {
        this.frame = this.frame == 1 ? 0 : 1;
      }
      if (5000 <= current_score) {
        this.y = HORIZON + 1;
        this.x -= 2;
      }
    },
  });

  var Rio = Class.create(Sprite, {
    initialize: function(x, y) {
      Sprite.call(this, 15, 26);
      this.image = game.assets['../../assets/images/walk_rios.png'];
      this.x = x;
      this.y = y;
      this.frame = 1;
    },
    onenterframe: function() {
      if (game.frame % 24 == 0) {
        this.frame = this.frame == 1 ? 0 : 1;
      }
      if (5000 <= current_score) {
        this.y = HORIZON + 1;
        this.x -= 2;
      }
    },
  });

  var Unchan = Class.create(Sprite, {
    initialize: function(x, y) {
      Sprite.call(this, 18, 18);
      this.image = game.assets['../../assets/images/walk_unchan.png'];
      this.x = x;
      this.y = y;
      this.frame = 1;
    },
    onenterframe: function() {
      this.x += 2;
      if (game.frame % 20 == 0) {
        this.frame = this.frame == 1 ? 0 : 1;

        // respawn
        if (current_score < 4900 && game.width < this.x) {
          this.x = -Math.floor(Math.random() * 30) * 20;
        }
      }
    },
  });

  var UnchanMochi = Class.create(Sprite, {
    initialize: function(x, y) {
      Sprite.call(this, 18, 18);
      this.image = game.assets['../../assets/images/walk_unchan_mochi.png'];
      this.x = x;
      this.y = y;
      this.frame = 1;
    },
    onenterframe: function() {
      this.x += 3;
      if (game.frame % 20 == 0) {
        this.frame = this.frame == 1 ? 0 : 1;

        // respawn
        if (current_score < 4900 && game.width < this.x) {
          this.x = -Math.floor(Math.random() * 30) * 100;
        }
      }
    },
  });

  var shareOnTwitter = function(score) {
    // 足してけば普通に動くと思います
    const luckyitem = [
      'うんちゃん',
      'ぴょこぴょこ',
      'VALVE INDEX',
      'Oculus Quest',
      'カルピス100本セット',
      'iPhone 11 Pro',
      'おとしだマネー',
      'toio',
      'AirPods Pro',
      'TAGIRON',
      '馬油',
      'チチカカのマフラー',
      '増殖するG',
      '辛辛魚',
      '椿のシャンプー',
      'ドンキで100円のスウェット',
      '蒸気でホッとアイマスク',
      '銀の盾',
      'ココスキ',
      '納豆',
      'マッギョのグッズ',
      'マーイーカのグッズ',
      'ベニスコネクション',
      'Yogibo',
      'めんつゆバター',
    ];

    const item = luckyitem[Math.floor(Math.random() * luckyitem.length)];

    const rank =
      score < 500
        ? 'うん吉'
        : score < 1000
        ? '小吉'
        : score < 2000
        ? '中吉'
        : score < 3000
        ? '吉'
        : score < 4000
        ? '大吉'
        : score < 5000
        ? 'おめ吉'
        : 'おめ吉';

    const EUC = encodeURIComponent;
    const LINK =
      'https://omegasisters.github.io/homepage/pages/special/akeomega.html';
    const message = `🎍おめくじ🎍 - 今年もよろしく！あけおめが！\nあなたの運勢は${rank}です！ラッキーアイテムは\"${item}\"！`;
    const hashtag = 'おめくじ,おめシス';
    const URL = `https://twitter.com/intent/tweet?text=${EUC(
      message,
    )}&hashtags=${EUC(hashtag)}&url=${LINK}`;

    if (
      navigator.userAgent.indexOf('iPhone') > 0 ||
      navigator.userAgent.indexOf('iPad') > 0 ||
      navigator.userAgent.indexOf('iPod') > 0 ||
      navigator.userAgent.indexOf('Android') > 0
    ) {
      location.href = URL;
    } else {
      window.open(
        URL,
        '_blank',
        'top=50,left=50,width=500,height=500,scrollbars=1,location=0,menubar=0,toolbar=0,status=1,directories=0,resizable=1',
      );
    }
  };

  game.start();
};
