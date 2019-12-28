enchant();

window.onload = () => {
  // global settings
  let FPS = 60;
  let WIDTH = 256;
  let HEIGHT = 256;
  let VERSION = '0.0.0';

  // initialize game instance
  let game = new Game(WIDTH, HEIGHT);
  game.fps = FPS;
  //game.keybind(32, 'a');

  // preloading assets
  let assets = ['../../images/walk_rays.png', '../../images/walk_rios.png'];
  assets.forEach((item) => {
    game.preload(item);
  });

  // centering game window element
  game.scale = Math.min(
    window.innerWidth / game.width,
    window.innerHeight / game.height,
  );
  let left = (window.innerWidth - game.width * game.scale) / 2;
  let top = (window.innerHeight - game.height * game.scale) / 2;
  $('#enchant-stage').css({
    position: 'absolute',
    left: left + 'px',
    top: top + 'px',
  });

  // when start game
  game.onload = () => {
    var ray = new Ray(game.width / 3, game.height / 2);
    var rio = new Rio(game.width / 3 + 50, game.height / 2);
    game.rootScene.addChild(ray);
    game.rootScene.addChild(rio);
    game.rootScene.backgroundColor = 'rgba(0, 0, 0, 0.8)';
  };

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
    },
  });

  game.start();
};
