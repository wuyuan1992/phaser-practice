class Scene1 extends Phaser.Scene {
    constructor(){
        super( { key: 'Scene1' } );
    }

    preload(){
        this.load.image('follow', '/assets/imgs/small.png');
    }

    create(){
        this.image = this.add.image( 200, 200, 'follow' );

        // console.log(this.image);ddd

        // keyup 才能触发
        this.input.keyboard.on('keyup_D', function(event){
            this.image.x += 10;
        }, this);

        // 定义按键
        this.key_A = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);

        // 鼠标点击事件
        this.input.on('pointerdown',function(event){
            this.image.x = event.x;
            this.image.y = event.y;
        }, this);


        this.input.on('pointerdown',function(event){
            this.image.x = event.x;
            this.image.y = event.y;
        }, this);



        this.input.keyboard.on('keyup_P', function(event){
            // 设定位置和图片资源
            var physicsImage = this.physics.add.image(
                this.image.x, this.image.y, 'follow'
            );
            // 设定初始速度 vx vy 
            physicsImage.setVelocity(Phaser.Math.RND.integerInRange(-100, 100), -300);
        }, this);



        this.input.keyboard.on("keyup_N", function(event){
            this.scene.start('Scene2');
        },this)
    }


    update(delta){
        // 持续按压持续触发
        if(this.key_A.isDown){
            this.image.x--
        }


    }
}