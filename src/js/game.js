window.onload = function(){
    var config = {
        type:Phaser.AUTO,
        width: 800, //window.innerWidth,
        height: 600, //window.innerHeight,
        physics:{
            default:'arcade',
            arcade:{
                gravity:{ y: 300 },
                debug: false
            }
        },
        //  youtube 教学的两个场景
        // scene:[ Scene1, Scene2 ]

        // 官方教程， 抽出scene
        scene: [ Game ]
    }
    
    var game = new Phaser.Game(config);
}