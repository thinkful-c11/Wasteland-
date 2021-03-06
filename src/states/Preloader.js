'use strict';

Game.Preloader = function(game) {
    this.preloadBar = null;
    this.loadingText = '';
};

Game.Preloader.prototype = {
    preload: function() {
        //////CENTERS PHASER GAME WINDOW/////////
        this.game.scale.pageAlignHorizontally = true;
        this.game.scale.pageAlignVertically = true;
        this.game.scale.refresh();
        
        //Background loading bar
        this.preloadBG = this.add.sprite(this.world.centerX, this.world.centerY, 'loadingBG');
        this.preloadBG.anchor.setTo(0.5,0.5);
        
        //loading bar
        this.preloaderBar = this.add.sprite(this.world.centerX -250, this.world.centerY, 'loading');
        this.preloaderBar.anchor.setTo(0,0.5);
        
        this.time.advancedTiming = true;
        
        //Does the Loading
        this.load.setPreloadSprite(this.preloaderBar);
        this.load.onLoadStart.add(this.loadStart, this);
        this.load.onLoadComplete.add(this.startMainMenu, this);
        
        //Load All Assets
        this.load.image('bg2', 'assets/bg2.jpg');
        this.load.image('lvl1bg', 'assets/lvl1bg.jpg');
        this.load.image('lvl2bg', 'assets/lvl2bg.jpg');
        this.load.image('lvl3bg', 'assets/lvl3bg.jpg');
        this.load.image('victory', 'assets/light_forest.png');
        this.load.spritesheet('celebrate', 'charSprites/jump/jump_up.png', 216, 350);
        this.load.image('gameover', 'assets/gameoverbg.jpg');
        this.load.image('grim', 'assets/grim_reaper.png');
        this.load.image('platform', 'assets/platform.png');
        this.load.image('grass', 'assets/Grass_Platform_black.png');
        this.load.spritesheet('faint', 'assets/fainting.png', 250, 192);
        this.load.image('battery', 'assets/battery.png');
        this.load.spritesheet('dude3', 'assets/dude4_small.png', 57, 80); 
        this.load.tilemap('map1', 'assets/level1.json', null, Phaser.Tilemap.TILED_JSON);
        this.load.tilemap('map2', 'assets/level2.json', null, Phaser.Tilemap.TILED_JSON);
        this.load.tilemap('map3', 'assets/level3.json', null, Phaser.Tilemap.TILED_JSON);
        this.load.image('tiles', 'assets/phase-2.png', 32, 32);
        this.load.image('phase-2', 'assets/phase-2.png', 32, 32);
        this.load.spritesheet('rain', 'assets/rain.png', 34, 34);
        this.load.spritesheet('piglet', 'assets/baddie.png', 32, 32);
        this.load.spritesheet('shadow', 'assets/shadow.png', 80, 70);
        this.load.spritesheet('tentacle', 'assets/tentacle.png', 25, 90);
        this.load.spritesheet('bat', 'assets/bat.png', 75, 75);
        this.load.image('portal', 'assets/portal.png', 95, 256);
        
        //Music
        this.load.audio('menu_music', 'music/Sad-Creepy.mp3');
        this.load.audio('level1_music', 'music/Sad-Creepy.mp3');
        this.load.audio('losing_light', 'music/Theyre-Closing-In.ogg');
        this.load.audio('heart_fast', 'music/heartFast.ogg');
        this.load.audio('heart_slow', 'music/heartSlow.ogg');
    },
    loadStart: function() {
        this.loadingText = createText(this, 'Loading', this.world.centerX, this.world.centerY - 100, 
        '80px murderFont', '#FFF', 'center', 0.5, 0.5);
    },
    startMainMenu: function() {
        this.state.start('MainMenu');
    }
};

