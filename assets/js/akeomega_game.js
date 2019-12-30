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

  // initialize game instance
  let game = new Game(WIDTH, HEIGHT);
  game.fps = FPS;
  //game.keybind(32, 'a');

  // preloading assets
  let assets = [
    '../../images/walk_rays.png',
    '../../images/walk_rios.png',
    '../../images/walk_unchan.png',
    '../../images/bg_outside_buildings_resized.png',
    '../../images/bg_outside_buildings_yuyake_resized.png',
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
    const gameScene = createGameScene();
    game.pushScene(gameScene);

    game.rootScene.backgroundColor = 'rgba(0, 0, 0, 0.8)';
  };

  // Function

  var createMovableSprite = function(image_path, x, y, x_speed, y_speed) {
    var sprite = new Sprite(1024, 256);
    sprite.image = game.assets[image_path];
    sprite.x = x;
    sprite.y = y;
    sprite.onenterframe = function() {
      if (game.fps % 20 == 0) {
        sprite.x += x_speed;
        sprite.y += y_speed;
        if (game.width < this.x) {
          this.x = -this.width;
        }
      }
    };
    return sprite;
  };

  var createScene = function(image_path) {
    var scene = new Scene();
    var background = new Sprite(game.width, game.height);
    if (image_path) {
      background.image = image_path;
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
        ? '../../images/bg_outside_buildings_resized.png'
        : '../../images/bg_outside_buildings_yuyake_resized.png';
    const bg1 = createMovableSprite(background_image, 0, 0, 2, 0);
    const bg2 = createMovableSprite(background_image, -1024, 0, 2, 0);

    scene.addChild(bg1);
    scene.addChild(bg2);

    const score = new Label();
    score.x = score.y = 5;
    score.font = '10px arial';
    score.color = '#FFF';
    score.onenterframe = function() {
      if (game.frame <= 5000) {
        this.text = `SCORE: ${game.frame}`;
      } else {
        this.opacity = new Date().getMilliseconds() > 500 ? 1 : 0;
      }
    };
    scene.addChild(score);

    var ray = new Ray(game.width / 3, HORIZON);
    var rio = new Rio(game.width / 3 + 50, HORIZON);
    var un = new Unchan(-512, HORIZON + 10);
    scene.addChild(ray);
    scene.addChild(rio);
    scene.addChild(un);

    const jumpSe = game.assets['../../assets/sounds/Onmtp-Click03-1.mp3'];
    const bgm = game.assets['../../assets/sounds/synchronity_rmx_fami.mp3'];
    bgm.play();
    bgm.src.loop = true;

    scene.onenterframe = function() {
      if (ray.within(un, 14)) {
        console.log('dead');
      }
    };
    scene.ontouchstart = () => {
      if (ray.y == HORIZON) {
        ray.frame = 0;
        ray.tl
          .moveBy(0, -32, 12, enchant.Easing.CUBIC_EASEOUT)
          .moveBy(0, 32, 12, enchant.Easing.CUBIC_EASEIN);
        jumpSe.play();
      }
    };

    return scene;
  };

  var createTitleScene = function() {
    var scene = createScene(
      game.assets['../../images/bg_outside_buildings_resized.png'],
    );
    return scene;
  };

  // Class

  var Ray = Class.create(Sprite, {
    initialize: function(x, y) {
      Sprite.call(this, 16, 26);
      this.image = game.assets['../../images/walk_rays.png'];
      this.x = x;
      this.y = y;
      this.frame = 1;
    },
    onenterframe: function() {
      if (game.frame % 24 == 0) {
        this.frame = this.frame == 1 ? 0 : 1;
      }
      if (5000 < game.frame) {
        this.x += 2;
      }
    },
  });

  var Rio = Class.create(Sprite, {
    initialize: function(x, y) {
      Sprite.call(this, 15, 26);
      this.image = game.assets['../../images/walk_rios.png'];
      this.x = x;
      this.y = y;
      this.frame = 1;
    },
    onenterframe: function() {
      if (game.frame % 24 == 0) {
        this.frame = this.frame == 1 ? 0 : 1;
      }
      if (5000 < game.frame) {
        this.x += 2;
      }
    },
  });

  var Unchan = Class.create(Sprite, {
    initialize: function(x, y) {
      Sprite.call(this, 18, 18);
      this.image = game.assets['../../images/walk_unchan.png'];
      this.x = x;
      this.y = y;
      this.frame = 1;
    },
    onenterframe: function() {
      this.x += 2;
      if (game.frame % 20 == 0) {
        this.frame = this.frame == 1 ? 0 : 1;

        // respawn
        if (game.frame < 4900 && game.width < this.x) {
          this.x = -Math.floor(Math.random() * 30) * 20;
        }
      }
    },
  });

  game.start();
};
