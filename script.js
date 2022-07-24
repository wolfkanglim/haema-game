window.addEventListener('load', init());

function init(){    
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = 900;
    canvas.height = 500;
   
    const hero = document.querySelector('.hero');
    const hiveWhaleStill =document.getElementById('hive_whale');
    const playerStill = document.getElementById('player');
    const wolfkang = document.getElementById('wolfkang_icon');
    const replayBtn = document.getElementById('replay'); 
    ctx.drawImage(wolfkang, 10, 10, 50, 50);
    ctx.save();
    ctx.drawImage(hiveWhaleStill, 0, 0, 400, 227, 410, 120, 400, 227);
    ctx.drawImage(playerStill, 0, 0, 120, 190, 80, 100, 120, 190);
    ctx.fillStyle = '#232621';
    ctx.shadowOffsetX = 4;
    ctx.shadowOffsetY = 4;
    ctx.shadowColor = 'white'
    ctx.font = ' 60px Righteous';
    ctx.fillText('H A E M A  *  ㅎㅐㅁㅏ', 160, 100);
     ctx.restore();
    hero.addEventListener('click', function() {
        hero.style.display = 'none';  
        if(game.gameOver){
            game.gameTimer = 0;
            game.score = 0;
            game.speed = 1;
            game.ammo = 20;
            game.gameTime = 0;
            game.gameOver = false;
        }
        animation(0);      
    })
    replayBtn.addEventListener('click', () => {
        if(game.gameOver){
            game.gameTimer = 0;
            game.score = 0;
            game.speed = 1;
            game.ammo = 20;
            game.gameTime = 0;
            game.gameOver = false;
            replayBtn.classList.remove('show');
        }
        init();      
    })          

    class InputHandler {
        constructor(game){
            this.game = game;
            window.addEventListener('keydown', e => {
                if(((e.key === 'ArrowUp') || (e.key === 'ArrowDown') || (e.key === 'ArrowRight') || (e.key === 'ArrowLeft')) && this.game.keys.indexOf(e.key) === -1){
                    this.game.keys.push(e.key);
                } else if(e.key === ' '){
                    this.game.player.shootTop();
                } else if (e.key === 'd'){
                    if(!this.game.gameOver){
                        this.game.debug = true;
                        this.game.gameOver = true;
                        this.game.speed = 0;
                    } else {
                        this.game.gameOver = false;
                        this.game.debug = false;
                        this.game.speed = 1;
                    }                    
                }
            });
            window.addEventListener('keyup', e => {
                if(this.game.keys.indexOf(e.key) > -1){
                    this.game.keys.splice(this.game.keys.indexOf(e.key), 1);
                }
            })
        }
    }

    class SoundController {
        constructor(){
            this.powerUpSound = document.getElementById('power_up');
            this.powerDownSound = document.getElementById('power_down');
            this.explosionSound = document.getElementById('explosion');
            this.shotSound = document.getElementById('shot');
            this.hitSound = document.getElementById('hit');
            this.shieldSound = document.getElementById('shield_sound');
            this.angler1Sound = document.getElementById('angler1_sound');
            this.angler2Sound = document.getElementById('angler2_sound');
            this.hiveWhaleSound = document.getElementById('hive_whale_sound');
            this.luckySound = document.getElementById('lucky_sound');
            this.scoreSound = document.getElementById('score');
            this.bgmSound = document.getElementById('bgm');
            this.smokeSound = document.getElementById('smoke');
            this.laserSound = document.getElementById('laser');
        }
        powerUp(){
            this.powerUpSound.currentTime = 0;
            this.powerUpSound.volume = 0.2;
            this.powerUpSound.play();
        }
        powerDown(){
            this.powerDownSound.currentTime = 0;
            this.powerDownSound.volume = 0.2;
            this.powerDownSound.play();
        }
        explosion(){
            this.explosionSound.currentTime = 0;
            this.explosionSound.volume = 0.2;
            this.explosionSound.play();
        }
        shot(){
            this.shotSound.currentTime = 0;
            this.shotSound.volume = 0.2;
            this.shotSound.play();
        }
        hit(){
            this.hitSound.currentTime = 0;
            this.hitSound.volume = 0.3;
            this.hitSound.play();
        }
        laser(){
            this.laserSound.currentTime = 0;
            this.laserSound.volume = 0.2;
            this.laserSound.play();
        }
        shield(){
            this.shieldSound.currentTime = 0;
            this.shieldSound.volume = 0.3;
            this.shieldSound.play();
        }
        angler1(){
            this.angler1Sound.currentTime = 0;
            this.angler1Sound.volume = 0.3 ;
            this.angler1Sound.play();
        }
        angler2(){
            this.angler2Sound.currentTime = 0;
            this.angler2Sound.volume = 0.3;
            this.angler2Sound.play();
        }
        HiveWhale(){
            this.hiveWhaleSound.currentTime = 0;
            this.hiveWhaleSound.volume = 0.3;
            this.hiveWhaleSound.play();
        }
        bgm(){
            //this.bgmSound.currentTime = 0;
            this.bgmSound.volume = 0.15;
            this.bgmSound.play();
        }
        lucky(){
            this.luckySound.currentTime = 0;
            this.luckySound.volume = 0.3;
            this.luckySound.play();
        }
        score(){
            this.scoreSound.currentTime = 0;
            this.scoreSound.volume = 0.2;
            this.scoreSound.play();
        }
        smoke(){
            this.smokeSound.currentTime = 0;
            this.smokeSound.volume = 0.2;
            this.smokeSound.play();
        }
    }


    class Shield {
        constructor(game){
            this.game = game;
            this.width = this.game.player.width;
            this.height = this.game.player.height;
            this.frameX = 0;
            this.maxFrame = 24;
            this.image = document.getElementById('shield');
            this.fps = 30;
            this.timer = 0;
            this.interval = 1000/this.fps;               
        }
        update(deltaTime){
            if(this.frameX <= this.maxFrame){
                if(this.timer > this.interval){
                    this.frameX++;
                    this.timer = 0;
                } else {
                    this.timer += deltaTime;
                }
            }
        }
        draw(context){
            context.drawImage(this.image, this.frameX * this.width, 0, this.width, this.height, this.game.player.x, this.game.player.y, this.width, this.height);
        }
        reset(){
            this.frameX = 0;
            this.game.sound.shield();
        }
    }


    class Projectile {
        constructor(game, x, y){
            this.game = game;
            this.x = x;
            this.y = y;
            this.speed = 3;
            this.width = 10;
            this.height = 3;
            this.markedForDeletion = false;
            this.image = document.getElementById('projectile');
        }
        update(){
            this.x += this.speed;
            if(this.x > this.game.width * 0.9) this.markedForDeletion = true;
        }
        draw(context){
            context.drawImage(this.image, this.x, this.y);
        }
    }


    class Particle {
        constructor(game, x, y){
            this.game = game;
            this.x = x;
            this.y = y;
            this.image = document.getElementById('gears');
            this.frameX = Math.floor(Math.random() * 3);
            this.frameY = Math.floor(Math.random() * 3);
            this.spriteSize = 50;
            this.sizeModifier = (Math.random() * 0.5 + 0.1).toFixed(1);
            this.size = this.spriteSize * this.sizeModifier;
            this.speedX = Math.random() * 4 - 1;
            this.speedY = Math.random() * -6;
            this.gravity = 0.5;
            this.markedForDeletion = false;
            this.angle = 0;
            this.va = Math.random() * 0.2 - 0.1;
            this.bounced = 0;
            this.bottomBounceBoundary = Math.random() * 80 - 60;
        }
        update(){
            this.angle += this.va;
            this.x -= this.speedX;
            this.speedY += this.gravity;
            this.y += this.speedY;
            if(this.y > this.game.height + this.size || this.x < 0 - this.size) this.markedForDeletion = true;
            if(this.y > this.game.height - this.bottomBounceBoundary && this.bounced < 1){
                this.bounced++;
                this.speedY *= -0.7;
            }
        }
        draw(context){
            context.save();
            context.translate(this.x, this.y);
            context.rotate(this.angle);
            context.drawImage(this.image, this.frameX * this.spriteSize, this.frameY * this.spriteSize, this.spriteSize, this.spriteSize, this.size * -0.5, this.size * -0.5, this.size, this.size);
            context.restore();
        }
    }


    class Player {
        constructor(game){
            this.game = game;
            this.width = 120;
            this.height = 190;
            this.x = 20;
            this.y = 200;
            this.frameX = 0;
            this.frameY = 0;
            this.maxFrame = 37;
            this.speedY = 0;
            this.speedX = 0;
            this.maxSpeed = 3;
            this.projectiles = [];
            this.powerUp = false;    
            this.powerUpTimer = 0;
            this.powerUpLimit = 10000;
            this.image = document.getElementById('player');
        }
        update(deltaTime){
            if(this.game.keys.includes('ArrowDown')) {this.speedY = this.maxSpeed;
            } else if (this.game.keys.includes('ArrowUp')) {
                    this.speedY = - this.maxSpeed;
            } else if (this.game.keys.includes('ArrowRight')) {
                this.speedX = this.maxSpeed;
            } else if (this.game.keys.includes('ArrowLeft')) {
                this.speedX = - this.maxSpeed * 0.7;
            } else {
                (this.speedY = 0);
                this.speedX = 0;
            }
            this.y += this.speedY;
            this.x += this.speedX;      
            if(this.y > this.game.height - this.height / 4) this.y = this.game.height - this.height / 4;
            if(this.y < - this.height / 2) this.y = - this.height / 2;
            if(this.x > this.game.width - this.width / 2) this.x = this.game.width - this.width / 2;
            if(this.x < - this.width / 2) this.x = - this.width / 2;
            this.projectiles.forEach(projectile => {
                projectile.update();
            });
            this.projectiles = this.projectiles.filter(projectile => !projectile.markedForDeletion);            
            if(this.frameX < this.maxFrame){
                this.frameX++;
            } else {
                this.frameX = 0;
            }            
            if(this.powerUp){
                if(this.powerUpTimer > this.powerUpLimit) {
                    this.powerUpTimer = 0;
                    this.powerUp = false;
                    this.frameY = 0;
                    this.game.sound.powerUp();
                } else {
                    this.powerUpTimer += deltaTime;
                    this.frameY = 1;
                    this.game.ammo += 0.1;
                }
            }
        }

        draw(context){
            if(this.game.debug) context.strokeRect(this.x, this.y, this.width * 0.75, this.height * 0.7);
            this.projectiles.forEach(projectile => {
                projectile.draw(context);
            })
            context.drawImage(this.image, this.frameX * this.width, this.frameY * this.height, this.width, this.height, this.x, this.y, this.width * 0.75, this.height * 0.7);
        }
        shootTop(){ 
            if(this.game.ammo > 0){
                this.projectiles.push(new Projectile(this.game, this.x + 70  , this.y + 20   ));
                this.game.ammo--;
            }
            this.game.sound.shot();
            if(this.powerUp) this.shootBottom();
        }
        shootBottom(){
            if(this.game.ammo > 0){
                this.projectiles.push(new Projectile(this.game, this.x + 75, this.y + 120))
                this.game.sound.laser();
            }
        }
        enterPowerUp(){
            this.powerUpTimer = 0;
            this.powerUp = true;
            if(this.game.ammo < this.game.maxAmmo) this.game.ammo = this.game.maxAmmo;
            //this.game.sound.powerUp();
        }
    }


    class Enemy {
        constructor(game){
            this.game = game;
            this.x = this.game.width;
            this.speedX = this.game.speed * (Math.random() * -1.2 - 0.5);
            this.markedForDeletion = false;
            this.frameX = 0;
            this.frameY = 0;
            this.maxFrame = 37;
        }
        update(){
            this.x += this.game.speed * this.speedX;
            if(this.x + this.width < 0) this.markedForDeletion = true;
            if(this.frameX < this.maxFrame) {
                this.frameX++;
            } else this.frameX = 0;
        }
        draw(context){
            if(this.game.debug) context.strokeRect(this.x, this.y, this.width/2, this.height/2);
            context.drawImage(this.image, this.frameX * this.width, this.frameY * this.height, this.width, this.height, this.x, this.y, this.width/2, this.height/2);
            if(this.game.debug) {
                context.font = '25px Helvetica';
                context.fillText(this.lives, this.x, this.y);
            }
        }
    }

    class Angler1 extends Enemy {
        constructor(game) {
            super(game);
            this.width = 228;
            this.height = 169;
            this.y = Math.random() * (this.game.height * 0.95 -this.height / 2);
            this.image = document.getElementById('angler1');
            this.frameY = Math.floor(Math.random() * 3);
            this.lives = 5;
            this.score = this.lives;
        }
    }

    class Angler2 extends Enemy {
        constructor(game) {
            super(game);
            this.width = 213;
            this.height = 165;
            this.y = Math.random() * (this.game.height * 0.95 -this.height / 2);
            this.image = document.getElementById('angler2');
            this.frameY = Math.floor(Math.random() * 2);
            this.lives = 7;
            this.score = this.lives;
        }
    }

    class HiveWhale extends Enemy {
        constructor(game) {
            super(game);
            this.width = 400;
            this.height = 227;
            this.y = Math.random() * (this.game.height * 0.95 -this.height / 2);
            this.image = document.getElementById('hive_whale');
            this.frameY = 0;
            this.lives = 20;
            this.score = this.lives;
            this.type = 'hive';
            this.speedX = Math.random() * -0.5 - 0.2;
        }
    }

    class LuckyFish extends Enemy {
        constructor(game) {
            super(game);
            this.width = 99;
            this.height = 95;
            this.y = Math.random() * (this.game.height * 0.95 -this.height / 2);
            this.image = document.getElementById('lucky');
            this.frameY = Math.floor(Math.random() * 2);
            this.lives = 10;
            this.score = this.lives;
            this.type = 'lucky';
        }
        
    }

    class Drone extends Enemy {
        constructor(game, x, y) {
            super(game);
            this.width = 115;
            this.height = 95;
            //this.y = Math.random() * (this.game.height * 0.95 -this.height / 2);
            this.x = x;
            this.y = y;
            this.image = document.getElementById('drone');
            this.frameY = Math.floor(Math.random() * 2);
            this.lives = 3;
            this.score = this.lives;
            this.speedX = Math.random() * -4 - 0.5;
            this.type = 'drone';
        }
    }


    class Layer {
        constructor(game, image, speedModifier) {
            this.game = game;
            this.image = image;
            
            this.speedModifier = speedModifier;
            this.x = 0;
            this.y = 0;
            this.width = 1768;
            this.height = 500;
        }
        update(){
            this.x -= this.game.speed * this.speedModifier;
            if(this.x <= - this.width) this.x = 0;
        }
        draw(context){
            context.drawImage(this.image, this.x, this.y);
            context.drawImage(this.image, this.x + this.width, this.y)
        }
    }


    class Background { 
        constructor(game){
            this.game = game;
            this.image1 = document.getElementById('layer1');
            this.image2 = document.getElementById('layer2');
            this.image3 = document.getElementById('layer3');
            this.image4 = document.getElementById('layer4');
            this.layer1 = new Layer(this.game, this.image1, 0.03);
            this.layer2 = new Layer(this.game, this.image2, 0.05);
            this.layer3 = new Layer(this.game, this.image3, 0.07);
            this.layer4 = new Layer(this.game, this.image4, 0.1);
            //this.layers = [this.layer1, this.layer2, this.layer3, this.layer4];
            this.layers = [this.layer1, this.layer3];
        }
        update(){
            this.layers.forEach(layer => layer.update());
        }
        draw(context){
            this.layers.forEach(layer => layer.draw(context));
        }
    }


    class Explosion {
        constructor(game, x, y){
            this.game = game;
            this.frameX = 0;
            this.maxFrame = 8;
            this.spriteWidth = 200;
            this.spriteHeight = 200;
            this.width = this.spriteWidth;
            this.height = this.spriteHeight;
            this.x = x + this.width/2;
            this.y = y + this.height/2;
            this.fps = 5;    
            this.timer = 0;
            this.interval = 1000/this.fps;
            this.markedForDeletion = false;
        }

        update(deltaTime){
            this.x -= this.game.speed * Math.random();
            if(this.timer > this.interval){
                this.frameX++;
                this.timer = 0;

            } else {
                this.timer += deltaTime;
            }
            if(this.frameX = this.maxFrame) this.markedForDeletion = true;
        }
        draw(context){
            context.drawImage(this.image, this.frameX * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
        }
    }

    class SmokeExplosion extends Explosion {
        constructor(game, x, y){
            super(game, x, y);
            this.image = document.getElementById('smoke_explosion');
        }
    }

    class FireExplosion extends Explosion {
        constructor(game, x, y){
            super(game, x, y);
            this.image = document.getElementById('fire_explosion');
        }
    }


    class UI {
        constructor(game){
            this.game = game;
            this.fontSize = 20;
            this.fontFamily = 'Righteous';
            this.color = 'white';
        }

        draw(context){
            context.save();
            context.fillStyle = this.color;
            context.shadowOffsetX = 3;
            context.shadowOffsetY = 3;
            context.shadowColor = 'black';
            context.font = this.fontSize + 'px ' + this.fontFamily;
            context.fillText('Score: '+ this.game.score, 150, 470);
            const formattedTime = (this.game.gameTime * 0.001).toFixed(2);
            context.fillText('Timer: ' + formattedTime, 20, 470);
            if(this.game.gameOver && !this.game.debug){
                context.textAlign = 'center';                 
                let msg1;
                let msg2;
                if(this.game.score > this.game.winningScore){
                    msg1 = 'Mission Accomplished!';
                    msg2 = ' Head To Wondrous East!  - Dr.W';
                } else {
                    msg1 = 'Mission Aborted!';
                    msg2 = 'Get my repair kit, try again!  - Dr.W';
                }
                context.font = '60px Righteous';
                context.fillText(msg1, this.game.width/2, this.game.height/3);
                context.font = '40px Righteous';
                context.fillText(msg2, this.game.width/2, this.game.height/2);
            }
                context.fillStyle = '#ffffbd';
                for(let i = 0; i < this.game.ammo; i++){
                    context.fillRect(20 + 5 * i, 479, 3, 20);
                }
            context.fillRect(20, 479, 3, 20);  
            context.drawImage(wolfkang, canvas.width - 50, 10, 42, 40);         
            context.restore();
            //console.log(this.game.player.powerUp);
        } 
    }


    class Game {
        constructor(width, height){
            this.width = width;
            this.height = height;
            this.player = new Player(this);
            this.background = new Background(this);
            this.input = new InputHandler(this);
            this.ui = new UI(this);
            this.sound = new SoundController();
            this.shield = new Shield(this);
            this.keys = [];
            this.enemies = [];
            this.particles = [];
            this.explosions = [];
            this.enemyTimer = 0;
            this.enemyInterval = 2000;
            this.ammo = 20;
            this.maxAmmo = 50;
            this.ammoTimer = 0;
            this.ammoInterval = 350;
            this.gameOver = false;
            this.timeLimit = 100000;
            this.debug = false;
            this.speed = 1;
            this.score = 0;
            this.winningScore = 100;
            this.gameTime = 0;
        }  

        update(deltaTime){
            this.sound.bgm();
            if(!this.gameOver) {
                this.gameTime += deltaTime;                
            }
            if(this.gameTime > this.timeLimit) {
                this.gameOver = true;
                this.sound.powerDown();
                replayBtn.classList.add('show');

            }
            this.background.update();
            this.player.update(deltaTime);
            this.shield.update(deltaTime);
            this.particles.forEach(particle => particle.update());
            this.particles = this.particles.filter(particle => !particle.markedForDeletion);
            this.explosions.forEach(explosion => explosion.update(deltaTime));
            this.explosions = this.explosions.filter(explosion => !explosion.markedForDeletion);  
            
            if(this.ammoTimer > this.ammoInterval){
                if(this.ammo < this.maxAmmo) {
                    this.ammo++;
                this.ammoTimer = 0;
                this.sound.lucky();
                } else {
                    this.ammoTimer += deltaTime;
                }
            }    
            this.enemies.forEach(enemy => {
                enemy.update();
                if(this.checkCollision(this.player, enemy)){
                    enemy.markedForDeletion = true;
                    for(let i = 0; i < 5; i++){
                        this.particles.push(new Particle(this, enemy.x + Math.random() * enemy.width * 0.5, enemy.y + Math.random() * enemy.height * 0.5));
                    }
                    //this.addExplosion(enemy);
                    this.explosions.push(new SmokeExplosion(this, enemy.x + enemy.width, enemy.y + enemy.height));
                    this.sound.powerDown();
                    this.shield.reset();
                    this.particles.push(new Particle(this, enemy.x + enemy.width / 2, enemy.y + enemy.height / 2));
                    if(enemy.type === 'lucky') {
                        this.player.enterPowerUp();
                        this.sound.lucky();
                    } else if(!this.gameOver) this.score -= enemy.score;
                }

                //projectiles
                this.player.projectiles.forEach(projectile => {
                    if(this.checkCollision(projectile, enemy)){
                        this.sound.hit();
                        enemy.lives--;
                        projectile.markedForDeletion = true;
                        if(enemy.lives <= 0){
                            enemy.markedForDeletion = true;
                            for(let i = 0; i < 10; i++){
                                this.particles.push(new Particle(this, enemy.x + Math.random() * enemy.width * 0.5, enemy.y + Math.random() * enemy.height * 0.5));
                            }
                            this.explosions.push(new FireExplosion(this, enemy.x + enemy.width/2, enemy.y + enemy.height/2));
                            //this.addExplosion(enemy);
                            this.sound.explosion();
                            if(enemy.type === 'lucky') this.player.enterPowerUp();
                            if(enemy.type === 'hive'){
                                for(let i = 0; i < 5; i++){
                                    this.enemies.push(new Drone(this, enemy.x + enemy.width * 0.5, enemy.y + Math.random() * enemy.height * 0.5));
                                }
                                this.sound.angler2();
                            }
                            if(!this.gameOver) this.score += enemy.score;
                            this.sound.lucky();
                        }
                    }
                })
            });
            this.enemies = this.enemies.filter(enemy => !enemy.markedForDeletion);
            if(this.enemyTimer > this.enemyInterval && !this.gameOver) {
                this.addEnemy();
                this.enemyTimer = 0;
            } else {
             this.enemyTimer += deltaTime;           
            }
        }

        draw(context){
            this.background.draw(context);
            this.player.draw(context);
            this.shield.draw(context);
            this.particles.forEach(particle => particle.draw(context));
            this.enemies.forEach(enemy => enemy.draw(context));
            this.explosions.forEach(explosion => explosion.draw(context));
            this.ui.draw(context);
        }
    
        addEnemy() {
            const randomNumber = Math.random();
            if(randomNumber < 0.3) {
                this.enemies.push(new Angler1(this));
                this.sound.angler1();
            } else if(randomNumber < 0.6) {
                this.enemies.push(new Angler2(this));
                this.sound.angler1();
            } else if(randomNumber < 0.7) {
                this.enemies.push(new HiveWhale(this));
                this.sound.HiveWhale();
            } else {
                this.enemies.push(new LuckyFish(this));
                this.sound.score();
            }
        };

        addExplosion(enemy){
            const randomNumber2 = Math.random();
            if(randomNumber2 < 0.5) {
                this.explosions.push(new SmokeExplosion(this, enemy.x + enemy.width/2, enemy.y + enemy.height/2));
            } else {
                this.explosions.push(new FireExplosion(this, enemy.x + enemy.width/2, enemy.y + enemy.height/2)); 
            }
        }

        checkCollision(obj1, obj2){
            return (
                obj1.x < obj2.x + obj2.width * 0.5 && 
                obj1.x + obj1.width * 0.5 > obj2.x &&
                obj1.y < obj2.y + obj2.height * 0.5 &&
                obj1.y + obj1.height * 0.5> obj2.y
            )
        }                     
    };


    const game = new Game(canvas.width, canvas.height);
    let lastTime = 0;
    function animation(timeStamp){
        const deltaTime = timeStamp - lastTime;
        lastTime = timeStamp;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        game.draw(ctx);
        game.update(deltaTime);
        requestAnimationFrame(animation);        
    }
    //animation(0);
}