class Game extends Phaser.Scene {
    constructor(){
        super({ key: 'Game' });

        this.platform = undefined;
        this.player = undefined;
        this.starts = undefined;
        this.cursor = undefined;
        this.score = 0;
        this.scoreText = undefined;
        this.bombs = undefined;
    }

    // phaser 生命周期

    // 资源与加载
    preload(){
        this.load.image('sky', '/assets/imgs/sky.png');
        this.load.image('ground', '/assets/imgs/platform.png');
        this.load.image('star', '/assets/imgs/star.png');
        this.load.image('bomb', '/assets/imgs/bomb.png');
        this.load.spritesheet('dude', 
            '/assets/imgs/dude.png',
            { frameWidth: 32, frameHeight: 48 }
        );
    }
    // 设定场景
    create(){
        this.setBg();
        this.setPatform();
        this.setPlayer();
        this.setStars(5);
        this.setBomb();
        this.setInput();
        this.showScore();
        this.setRelation();
    }
    // 更新
    update(){
        this.captureInput();
    }


    // 设定各种元素
    setBg(){
        this.add.image(400, 300, 'sky');
    }
    
    setPatform(){
        // 静态物体制造器
        this.platform = this.physics.add.staticGroup();

        // 位置 、 大小
        this.platform.create(400, 568, 'ground').setScale(2).refreshBody();
        this.platform.create(600, 400, 'ground');
        this.platform.create(50, 250, 'ground');
        this.platform.create(750, 220, 'ground');


        this.platform.create(330, 200, 'star');
        this.platform.create(360, 460, 'star');
        this.platform.create(300, 310, 'star');
    }

    setPlayer(){
        this.player = this.physics.add.sprite(100, 450, 'dude');

        this.player.setBounce(0.2);
        this.player.setCollideWorldBounds(true);
        this.player.body.setGravityY(300)
    }

    setStars(count){
        this.stars = this.physics.add.group({
            key: 'star',
            repeat: count,
            setXY: { x: 12, y: 0, stepX: 70 }
        });
        this.stars.children.iterate(function (child) {

            child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
        
        });

    }

    setBomb(){
        this.bombs = this.physics.add.group();
    }

    // 操作
    setInput(){
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'turn',
            frames: [ { key: 'dude', frame: 4 } ],
            frameRate: 20
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });

        // 鼠标
        this.cursors = this.input.keyboard.createCursorKeys();

    }

    captureInput(){
        if(this.gameOver){
            return;
        }
        if (this.cursors.left.isDown)
        {
            this.player.setVelocityX(-160);

            this.player.anims.play('left', true);
        }
        else if (this.cursors.right.isDown)
        {
            this.player.setVelocityX(160);

            this.player.anims.play('right', true);
        }
        else
        {
            this.player.setVelocityX(0);

            this.player.anims.play('turn');
        }

        if (this.cursors.up.isDown && this.player.body.touching.down)
        {
            this.player.setVelocityY(-530);
        }
    }
    
    // 设定物理关系
    setRelation(){
        
        // 设定物理联系
        this.physics.add.collider(this.player, this.platform);
        this.physics.add.collider(this.stars, this.platform);
        this.physics.add.collider(this.bombs, this.platform);

        // 碰撞检测
        this.physics.add.overlap(this.player, this.stars, this.collectStar, null, this);
        this.physics.add.collider(this.player, this.bombs, this.hitBomb, null, this);

    }



    // 游戏逻辑
    collectStar(player, star){
        
        star.disableBody(true, true);

        this.updateScore(10);

        if (this.stars.countActive(true) === 0)
        {
            this.stars.children.iterate(function (child) {
    
                child.enableBody(true, child.x, 0, true, true);
    
            });
    
            var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);
    
            var bomb = this.bombs.create(x, 16, 'bomb');
            bomb.setBounce(1);
            bomb.setCollideWorldBounds(true);
            bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
            bomb.allowGravity = false;
    
        }
    }

    hitBomb(player, bomb){

        this.physics.pause();

        player.setTint(0xff0000);

        player.anims.play('turn');

        this.gameOver = true;
    }

    showScore(){
        this.scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });
    }

    updateScore(reward){
        this.score += reward;
        this.scoreText.setText('score: ' + this.score);
    }
}