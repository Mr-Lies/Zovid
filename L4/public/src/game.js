const game = new Phaser.Game(800, 600, Phaser.AUTO, '', {
    preload: preload,
    create: create,
    update: update
})


let score = 0
let scoreText
let platforms
let diamonds
let cursors
let player
let enemy

function preload() {

    game.load.image('sky', './assets/WP.jpg')
    game.load.image('ground', './assets/platform.png')
    game.load.image('diamond', './assets/enemy.png')
    game.load.spritesheet('woof', './assets/woof.png', 1000, 100)
    game.load.image('enemy', './assets/Zovid himself.png')
}


function create() {

    game.physics.startSystem(Phaser.Physics.ARCADE)


    game.add.sprite(0, 0, 'sky')


    platforms = game.add.group()


    platforms.enableBody = true


    const ground = platforms.create(0, game.world.height - 64, 'ground')


    ground.scale.setTo(2, 2)


    ground.body.immovable = true


    let ledge = platforms.create(400, 450, 'ground')
    ledge.body.immovable = true

    ledge = platforms.create(-75, 350, 'ground')
    ledge.body.immovable = true


    player = game.add.sprite(32, game.world.height - 1300, 'woof')


    enemy = game.add.sprite(600, game.world.height - 420, 'enemy')



    game.physics.arcade.enable(enemy)


    game.physics.arcade.enable(player)


    player.body.bounce.y = 0.7
    player.body.gravity.y = 800
    player.body.collideWorldBounds = true


    player.animations.add('left', [0, 1], 10, true)
    player.animations.add('right', [2, 3], 10, true)


    diamonds = game.add.group()


    diamonds.enableBody = true


    for (var i = 0; i < 12; i++) {
        const diamond = diamonds.create(i * 70, 0, 'diamond')



        diamond.body.gravity.y = 1000
        diamond.body.bounce.y = 0.5 + Math.random() * 0.7
    }


    scoreText = game.add.text(16, 16, '', { fontSize: '32px', fill: '#FFF' })


    cursors = game.input.keyboard.createCursorKeys()
}

function update() {

    player.body.velocity.x = 0


    game.physics.arcade.collide(player, platforms)
    game.physics.arcade.collide(diamonds, platforms)
    game.physics.arcade.collide(player, enemy)


    game.physics.arcade.overlap(player, diamonds, collectDiamond, null, this)


    game.physics.arcade.overlap(player, enemy, collectDiamond, null, this)


    if (cursors.left.isDown) {
        player.body.velocity.x = -150
        player.animations.play('left')
    } else if (cursors.right.isDown) {
        player.body.velocity.x = 150
        player.animations.play('right')
    } else {

        player.animations.stop()
    }


    if (cursors.up.isDown && player.body.touching.down) {
        player.body.velocity.y = -700
    }

    if (score === 120) {
        location.href = 'pass.html'
    }
}

function collectDiamond(player, diamond) {

    diamond.kill()





    score += 10
    scoreText.text = 'Zovid knallers: ' + score
}
