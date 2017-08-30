'use strict';

const Piglet = function(game, x, y, destination, platforms, group){
    this.platform = platforms;
    this.piglet = game.add.sprite(x, y, 'piglet');
    game.physics.arcade.enable(this.piglet);
    this.piglet.collideWorldBounds = true;
    this.piglet.enableBody = true;
    this.piglet.animations.add('left', [0,1], 5, true);
    this.piglet.animations.add('right', [2,3], 5, true);  
    this.piglet.body.collideWorldBounds = true;  
    this.piglet.body.gravity.y = 400;
    this.piglet.body.velocity.x = 80;
    this.pigletTween = game.add.tween(this.piglet).to({x: this.piglet.x + destination},2000,'Linear',true,0,-1,true);
    group.add(this.piglet);
};

Piglet.prototype = Object.create(Phaser.Sprite);
Piglet.prototype.constructor = Piglet;
Piglet.prototype.create = function(game, group) {
    this.piglet = game.add.sprite(this.enemyXPos, this.enemyYPos, 'piglet');
    game.physics.arcade.enable(this.piglet); 
    this.piglet.collideWorldBounds = true;
    this.piglet.enableBody = true;
    this.piglet.animations.add('left', [0,1], 5, true);
    this.piglet.animations.add('right', [2,3], 5, true);  
    this.piglet.body.collideWorldBounds = true;  
    this.piglet.body.gravity.y = 400;
    this.piglet.body.velocity.x = 80;
    this.pigletTween = game.add.tween(this.piglet).to({x: this.piglet.x + 100},2000,'Linear',true,0,-1,true);
    group.add(this.piglet);
    return group;
};

    