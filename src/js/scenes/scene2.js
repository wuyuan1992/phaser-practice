class Scene2 extends Phaser.Scene {
    constructor(){
        super( { key: 'Scene2' } );
    }

    preload(){

    }

    create(){
        this.text= this.add.text(100,100,'welcome to scene 2', {font:"40px Impact"});


        // 设定动画
        var tween = this.tweens.add({
            targets: [this.text],
            x:200,
            y:250,
            duration:'1500',
            ease:'Elastic',
            easeParams:[1.5, 0.5],
            delay: 1000,
            onComplete: function(src, targets){
                var tgt = targets[0];
                tgt.x = 10;
                tgt.y = 10;
                tgt.setColor('Red');
            }
        }, this)
    }


    update(delta){

    }
}