//Create Functions
function createButton(game,textOfButton,x,y,w,h,callback) {
    let button1 = game.add.button(x,y,'grass',callback,this,2,1,0);
    
    button1.anchor.setTo(0.5,0.5);
    button1.width = w;
    button1.height = h;

    createText(game, textOfButton, x, y, '32px murderFont', '#FFF', 'center', 0.5, 0.5);
}

function createImageButton(game, textOfImage,x,y,w,h) {
    let button = game.add.image(x,y,'grass');
    
    button.anchor.setTo(0.5,0.5);
    button.width = w;
    button.height = h;
    button.scale.x = 0.5;
    button.scale.y = 0.5;
    button.tweenAnimation = game.add.tween(button.scale).to({x: 0.7, y: 0.7},500,'Linear',true,0,-1,true); 
    
    createText(game, textOfImage, x, y, '40px murderFont', '#FFF', 'center', 0.5, 0.5);
    return button;
}

function createText(game, str, x, y, font, fill, align = 'center', anchorX = 0, anchorY = 0) {
    let txt = game.add.text(x, y, str, {
        font: font,
        fill: fill,
        align: align
    });
    txt.anchor.setTo(anchorX, anchorY);
    return txt;
}

//Commented out because it needs to be refactored to use
//the new JSON map with two layers..
//Maps now currently added in the level js file itself

function createMaps(game, mapName, bgName) {
    let map = game.add.tilemap(mapName);
    
    map.addTilesetImage(bgName);

    map.addTilesetImage('phase-2');
    let layer1 = map.createLayer('Tile Layer 1');
    let layer2 = map.createLayer('Tile Layer 2');
    map.setCollisionBetween(2000, 3000, true, layer2);
    layer1.resizeWorld();
    return layer2; 
}

function createPlayer(game, gravityNum = 250, bounceY = 0.0){
    let player = game.add.sprite(632, game.world.height - 1550, 'dude3');
    game.physics.arcade.enable(player);
    player.body.setSize(20, 90, 25, 10);

    player.body.bounce.y = bounceY;

    game.camera.follow(player);

    //tried increasing this to 500 and couldn't really jump
    player.body.gravity.y = gravityNum; 
    //player.body.velocity.y = -350;
    //player.body.gravity.x = -500;
    //player.body.velocity.x = -500;

    //this is true or body will rebound back into the world
    //if false, then body will leave the world upon collision
    player.body.collideWorldBounds = true;

    return player;
}

// function createBatteries(game, pixelsApart = 500, numBatteries = 7) {
//     let batteries = game.add.group();
//     batteries.enableBody = true;

//     for(let i = 1; i < numBatteries; i++) {
//         let battery = batteries.create(i * pixelsApart, 500, 'battery');
//         battery.body.gravity.y = 500;
//         battery.body.bounce.y= 0.5 + Math.random() * 0.2;
//     }
//     return batteries;
// }

function createTimer(game, callback, duration = 30000){
    let timer = game.time.create();
    timer.add(duration, callback, this);
    timer.start();
    return timer;
}

function createLevelText(game, font) {
    let timerTxt = createText(game, `Timer: ${game.global.totalTime}s`, 700, 75, font, '#FFF', 'center', 0.5, 0.5);
    timerTxt.fixedToCamera = true;

    let scoreTxt = createText(game, `Score: ${game.global.score}`, 25, 50, font, '#FFF');
    scoreTxt.fixedToCamera = true;

    let lifeTxt = createText(game, `Life: ${game.global.lives}`, 400, 50, font, '#FFF', 'center');
    lifeTxt.fixedToCamera = true;
    
    return {timerTxt, scoreTxt, lifeTxt};
}

function createRain(game, minYSpeed = 300, maxYSpeed = 500, minXSpeed = -5, maxXSpeed = 5,
    minParticleScale = 0.1, maxParticleScale = 0.5, minRotation = 0, maxRotation = 0, angle = 30) {
    var emitter = game.add.emitter(game.world.centerX, 0, 400);
    
    emitter.width = game.world.width;
    // emitter.angle = 30; // uncomment to set an angle for the rain.

    emitter.makeParticles('rain');

    emitter.minParticleScale = minParticleScale;
    emitter.maxParticleScale = maxParticleScale;

    emitter.setYSpeed(minYSpeed, maxYSpeed);
    emitter.setXSpeed(minXSpeed, maxXSpeed);

    emitter.minRotation = minRotation;
    emitter.maxRotation = maxRotation;

    emitter.start(false, 1600, 5, 0);
}

//Update Functions
function playerActions(cursors, player, hitPlatforms) {
    player.body.velocity.x = 0;
    //can make movement more complex
    if(cursors.left.isDown) {
        player.body.velocity.x = -350;
        player.animations.play('left');
    } else if(cursors.right.isDown) {
        player.body.velocity.x = 350;
        player.animations.play('right');
    } else if(cursors.down.isDown) {
        player.body.velocity.y = 550;
        player.animations.play('down');
    } else {
        player.animations.stop();
        player.frame = 6; //sixth frame in spritesheet is standing still
    }

    //can take out the last two conditions in if statement to allow for jumping in midair
    //possible powerup situation
    if(cursors.up.isDown && player.body.blocked.down && hitPlatforms) {
        player.body.velocity.y = -350; //the height of the jump
    }
}

function collectBattery(player, battery) {
    battery.kill();
    this.global.score += 10;
    this.global.time += 5;
}

function gainLife(player, piglet) {
    this.global.lives++;
    piglet.kill();
}

function pigletAnimations(group){
    group.forEach(function(piglet){
        if(piglet.previousPosition.x >= piglet.position.x){
            piglet.animations.play('left');
        }
        else{
            piglet.animations.play('right');
        }
    });
}

function shadowAnimations(group){
    group.forEach(function(enemy){
        if (enemy.animations.currentFrame.index === 0 && enemy.game.global.shadowFrame === 'start'){
            enemy.animations.play('rise');
            enemy.body.setSize(0, 0, 0, 0);
        } else if (enemy.animations.currentFrame.index === 8) {
            enemy.body.setSize(80, 45, 0, 25);
        } else if (enemy.animations.currentFrame.index === 12) {
            enemy.body.setSize(80, 70, 0, 0);
            enemy.game.global.shadowFrame = 'fall';
        } else if (enemy.animations.currentFrame.index === 11 && enemy.game.global.shadowFrame === 'fall') {
            enemy.body.setSize(80, 45, 0, 25);
        } else if (enemy.animations.currentFrame.index === 7 && enemy.game.global.shadowFrame === 'fall') {
            enemy.body.setSize(0, 0, 0, 0);
            enemy.game.global.shadowFrame = 'start';
        } else {
            return;
        }
    });
}

function tentacleAnimations(group){
    group.forEach(function(enemy){
        if (enemy.animations.currentFrame.index === 0 && enemy.game.global.tentacleFrame === 'start'){
            enemy.animations.play('rise');
            enemy.body.setSize(25, 25, 0, 65);
        } else if (enemy.animations.currentFrame.index === 9) {
            enemy.body.setSize(25, 65, 0, 25);
        } else if (enemy.animations.currentFrame.index === 13) {
            enemy.body.setSize(25, 90, 0, 0);
            enemy.game.global.tentacleFrame = 'fall';
        } else if (enemy.animations.currentFrame.index === 12 && enemy.game.global.tentacleFrame === 'fall') {
            enemy.body.setSize(25, 65, 0, 25);
        } else if (enemy.animations.currentFrame.index === 8){
            enemy.body.setSize(25, 25, 0, 65);
            enemy.game.global.tentacleFrame = 'start';
        } else {
            return;
        }
    });
}

function flyingAnimations(group){
    group.forEach(function(enemy){
        if(enemy.previousPosition.x >= enemy.position.x){
            enemy.animations.play('left');
        }else{
            enemy.animations.play('right');
        }
    });
}

function lightRadiusSize(time){
    if(time >= 30){
        return 350;
    }
    else if(time > 25) {
        return 300;
    }
    else if(time > 20){
        return 250;
    }
    else if(time > 15) {
        return 200;
    }
    else if(time > 10){
        return 150;
    }
    else{
        return 100;
    }
}

function musicPlayed(time, bgMusic, hbSlow, hbFast) {
    if(time > 10){
        if(!this.hbSlowStopped){
            hbSlow.stop();
            this.hbSlowStopped = true;
        }
        if(this.musicPaused){
            bgMusic.resume();
            this.musicPaused = false;
        }
    }
    else if(time > 5){
        if(!this.musicPaused){
            bgMusic.pause();
            this.musicPaused = true;
        }
        if(!this.hbFastStopped){
            hbFast.stop();
            this.hbFastStopped = true;
        }
        
        if(this.hbSlowStopped){
            hbSlow.play('', 0, 1, true, true);
            this.hbSlowStopped = false;
        }
    }
    else{
        if(!hbSlowStopped) {
            hbSlow.stop();
            hbSlowStopped = true;
        }
        if(this.hbFastStopped){
            hbFast.play('', 0, 1, true, true);
            this.hbFastStopped = false;
        }
    }
}

function goToGameOver(hbSlow, hbFast, state) {
    hbSlow.stop();
    hbFast.stop();
    state.start('GameOver');
}

function updateShadowTexture(game, player, shadowTexture) {
    shadowTexture.context.fillStyle = '#00040c';
    shadowTexture.context.fillRect(0, 0, 4800, 4000);

    let gradient = shadowTexture.context.createRadialGradient(
        player.x, player.y, game.global.lightRadius * 0.65,
        player.x, player.y, game.global.lightRadius
    );
    gradient.addColorStop(0, '#ffffff');
    gradient.addColorStop(1, '#ffffff');

    shadowTexture.context.beginPath();
    shadowTexture.context.fillStyle = gradient;
    shadowTexture.context.arc(player.x + 35, player.y + 10, game.global.lightRadius, 0, Math.PI * 2);
    shadowTexture.context.fill();
    shadowTexture.dirty = true;

}

function tick() {
    this.global.time--;

    this.global.lightRadius = lightRadiusSize(this.global.time);

    musicPlayed(this.global.time, window.music, window.music1, window.music2);
    
    if(this.global.time === 0) {
        window.music.stop();
        window.music.destroy();
        goToGameOver(window.music1, window.music2, this.state);
    }
}