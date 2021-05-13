class ClassRoom1 extends Phaser.Scene {

    constructor(config) {
        config = {
            key: 'scene1',
        }
        super(config);
        this.keys;
        this.player;
        this.player2;
        this.bullets;
        this.bltqnt = 100;
        this.bltqnt2 = 100;
        this.inst;
        this.init2;
        this.ghostNumber = 3
        this.ghosts = [];
        this.spacebar;
        this.fireRate = 600;
        this.fireRate2 = 600;
        this.timeBefore = 0;
        this.timeBefore2 = 0;
        this.platform
        this.platforms = []
        this.platformsData = {
            0: [505, 590],
            1: [925, 260],
            2: [98, 260],
        }
        this.boss
        this.bossHealth = 100
        this.bossPewFireRate = 4500
        this.bossPewBefore = 0
        this.bossPews = []
        this.minionSpawnBefore = 0
        this.minionSpawnFireRate = 10000
        this.canSpawnMinions = true
        this.gameOver = false
        this.victory
        this.gameOverText1
        this.gameOverText2
        this.gos
        this.bmsc
        this.test = 0
        this.ghostDestroy
        this.bossDmg
        this.players
    }

    init(data) {
        this.players = data.players//RECEBE DATA DA CENA DO MENU
    }
    preload() {
        //CARREGA IMAGENS E AUDIO
        this.load.image('classroom', '../res/cenario/classroom.jpg');
        this.load.image('table', '../res/cenario/table.png');
        this.load.image('id_card', '../res/sprites/id_card.png')
        this.load.spritesheet('ghostFlying', '../res/ghosts/fantasmasR.png', { frameWidth: 387.5, frameHeight: 297 })
        this.load.spritesheet('ghostFlyingL', '../res/ghosts/fantasmasL.png', { frameWidth: 387.5, frameHeight: 297 })

        this.load.image('boss', '../res/ghosts/fantasma_1.png')
        this.load.spritesheet('bossWalking', '../res/ghosts/fantasma_2.png', { frameWidth: 235.5, frameHeight: 248 });
        this.load.spritesheet('bossDead', '../res/ghosts/fantasma_3.png', { frameWidth: 270, frameHeight: 334 });

        this.load.spritesheet('bossPew', '../res/ghosts/bossPew.png', { frameWidth: 147, frameHeight: 91 });
        this.load.spritesheet('bossPewDead', '../res/ghosts/bossPewDestroy.png', { frameWidth: 198.5, frameHeight: 151 });

        this.load.spritesheet('playerDown', '../res/sprites/down.png', { frameWidth: 249, frameHeight: 375 });
        this.load.spritesheet('playerRunning', '../res/sprites/running.png', { frameWidth: 515, frameHeight: 686 });
        this.load.spritesheet('playerRunningL', '../res/sprites/runningL.png', { frameWidth: 515, frameHeight: 686 });
        this.load.spritesheet('playerStand', '../res/sprites/stand.png', { frameWidth: 262, frameHeight: 690 });
        this.load.spritesheet('playerJump', '../res/sprites/jump.png', { frameWidth: 343, frameHeight: 690 });
        this.load.spritesheet('playerJumpL', '../res/sprites/jumpL.png', { frameWidth: 342, frameHeight: 690 });
        this.load.spritesheet('playerStandL', '../res/sprites/standL.png', { frameWidth: 262, frameHeight: 690 });
        this.load.spritesheet('playerPunching', '../res/sprites/punchingR.png', { frameWidth: 430, frameHeight: 689 });
        this.load.spritesheet('playerPunchingL', '../res/sprites/punchingL.png', { frameWidth: 430, frameHeight: 689 });
        this.load.spritesheet('playerKicking', '../res/sprites/kickR.png', { frameWidth: 455, frameHeight: 556 });
        this.load.spritesheet('playerKickingL', '../res/sprites/kickL.png', { frameWidth: 455, frameHeight: 556 });
        this.load.spritesheet('playerThrowing', '../res/sprites/throw.png', { frameWidth: 459, frameHeight: 714 });
        this.load.spritesheet('playerThrowingL', '../res/sprites/throwL.png', { frameWidth: 459, frameHeight: 714 });
        this.load.spritesheet('playerThrowingD', '../res/sprites/throwD.png', { frameWidth: 470, frameHeight: 691 });
        this.load.spritesheet('playerThrowingDL', '../res/sprites/throwDL.png', { frameWidth: 470, frameHeight: 691 });
        this.load.spritesheet('playerThrowingV', '../res/sprites/throwV.png', { frameWidth: 470, frameHeight: 691 });
        this.load.spritesheet('playerThrowingVL', '../res/sprites/throwVL.png', { frameWidth: 470, frameHeight: 691 });


        this.load.audio('music', '../res/sons/Sound_Effects/musicadeluta.mp3');
        this.load.audio('punch', '../res/sons/Sound_Effects/punch.mp3');
        this.load.audio('card', '../res/sons/Sound_Effects/card_throw.mp3');
        this.load.audio('jump', '../res/sons/Sound_Effects/jump.mp3');
        this.load.audio('hit', '../res/sons/Sound_Effects/hit.mp3');
        this.load.audio('kick', '../res/sons/Sound_Effects/kick.mp3');
        this.load.audio('die', '../res/sons/Sound_Effects/death_sound.mp3');
        this.load.audio('bossDeath', '../res/sons/Sound_Effects/bossDeathSound.mp3');
        this.load.audio('bossShot', '../res/sons/Sound_Effects/bossShotSound.mp3');
        this.load.audio('bossDmg', '../res/sons/Sound_Effects/bossDamageSound.mp3');
        this.load.audio('victoryS', '../res/sons/Victory_n_loss_sounds/Victory.mp3');
        this.load.audio('defeat', '../res/sons/Victory_n_loss_sounds/Game_Over.mp3');
    }
    create(data) {
        //EXECUTA UMA VEZ QUANDO A CENA E CRIADA
        this.bmsc = this.sound.add('music', {
            mute: false,
            volume: 0.4,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: true,
            delay: 0,
        })
        this.bmsc.play()
        this.bossDmg = this.sound.add('bossDmg')
        this.gos = this.sound.add('defeat')
        this.game.config.pss = this.sound.add('punch')
        this.game.config.js = this.sound.add('jump', {
            mute: false,
            volume: 2,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: false,
            delay: 0,
        })
        this.game.config.hs = this.sound.add('hit')
        this.game.config.ds = this.sound.add('die')
        this.game.config.idcs = this.sound.add('card', {
            mute: false,
            volume: 5,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: false,
            delay: 0,
        })
        this.game.config.ks = this.sound.add('kick')

        this.keys = this.input.keyboard.addKeys("W,A,S,D,SHIFT,UP,RIGHT,DOWN,LEFT,V,B,K,L,ALT");//adiciona teclas do teclado a serem escutadas
        this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        this.add.image(1252 / 2, 834 / 2, 'classroom')//fundo

        if (this.players == 'two') {//diminui vida do boss se for um player so
            this.bossHealth = 65
            this.ghostNumber = 6
        }

        for (let i = 0; i < 3; i++) {//adiciona a hitbox das plataformas
            let platform = this.physics.add.sprite(this.platformsData[i][0], this.platformsData[i][1]).setScale(0.36).refreshBody()
            platform.body.immovable = true;
            platform.body.moves = false;
            platform.body.setSize(750, 450)
            platform.body.setOffset(0, 220)
            this.platforms.push(platform)
        }


        //CRIA ANIMAÇÔES DO FANTASMA, SEMPRE QUANDO TIVER ANIMS = CRIAR ANIMACAO
        this.anims.create({
            key: 'bossWalk',
            frames: this.anims.generateFrameNumbers("bossWalking"),
            frameRate: 10
        });
        this.anims.create({
            key: 'bossDead',
            frames: this.anims.generateFrameNumbers("bossDead"),
            frameRate: 10
        });
        this.anims.create({
            key: 'bossPew',
            frames: this.anims.generateFrameNumbers("bossPew"),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'bossPewDead',
            frames: this.anims.generateFrameNumbers("bossPewDead"),
            frameRate: 10
        });

        //CRIA OS PERSONAGENS PRINCIPAIS A PARTIR DA CLASSE
        this.player = new Player(this, 300, 561, 'playerStand', 0.2, 500, this.game.config, 1)
        this.inst = new GameText(this, 1140, 5, 'x' + this.bltqnt, '32px', '#00000', 'Georgia, "Goudy Bookletter 1911", Times, serif')
        if (this.players == 'two') {
            this.inst2 = new GameText(this, 20, 5, 'x' + this.bltqnt2, '32px', '#00000', 'Georgia, "Goudy Bookletter 1911", Times, serif')
            this.player2 = new Player(this, 400, 561, 'playerStand', 0.2, 500, this.game.config, 2)
            this.player.ps.tint = '0xef5350'//COLORE ELES SE FOR DOIS PLAYERS
            this.player2.ps.tint = '0x29b6f6'
        }

        //FUNCOES DE GERAR NUMERO ALEATORIO
        this.randomMinAndMax = (max, min) => Math.floor(Math.random() * (max - (min) + 1)) + min;
        this.randomInterv = (min, max, min2, max2) => this.randomMinAndMax(1, 0) == 0 ? this.randomMinAndMax(min, max) : this.randomMinAndMax(min2, max2)

        this.anims.create({
            key: 'fly',
            frames: this.anims.generateFrameNumbers("ghostFlying"),
            frameRate: 10
        })

        this.anims.create({
            key: 'flyL',
            frames: this.anims.generateFrameNumbers("ghostFlyingL"),
            frameRate: 10
        })

        //CRIA O FANSTASMA BOSS A PARTIR DA CLASSE DO FASNTASMA
        this.boss = new Ghost(this, 1150, 500, 'boss', 1.2, -350)
        this.boss.gs.body.setSize(200, 200)//HITBOX
        this.boss.gs.body.setOffset(70, 0)

        //MOVE OS FANTASMAS
        this.moveGhosts = () => {
            if (this.bossHealth > 0) {
                //SE O BOSS ESTIVER NA DIRECAO DO PLAYER 
                if (Math.abs(this.player.ps.y) - 5 < Math.abs(this.boss.gs.y) && Math.abs(this.player.ps.y) + 5 > Math.abs(this.boss.gs.y)) {
                    this.physics.moveTo(this.boss.gs, 1150, this.boss.gs.y)

                    //NASCE OS MORCEGOS
                    if (((new Date().getTime()) - this.bossPewBefore) > this.bossPewFireRate) {
                        this.bossPewBefore = new Date().getTime()
                        this.boss.gs.play('bossWalk', true)
                        let bossPew = new Ghost(this, 1150, this.boss.gs.y, 'bossPew', 0.5, -350)
                        this.physics.moveTo(bossPew.gs, this.player.ps.x, this.player.ps.y)
                        this.bossPews.push(bossPew)
                        bossPew.gs.play('bossPew')
                        let bss = this.sound.add('bossShot', {
                            mute: false,
                            volume: 1,
                            rate: 1,
                            detune: 0,
                            seek: 0,
                            loop: false,
                            delay: 0,
                        })
                        bss.play()
                        //CRIAR COLISAO ENTRE O PLAYER E MORCEGOS
                        this.physics.add.collider(this.player.ps, bossPew.gs, (player, ghost) => {
                            if (player.width == 430 || player.height < 560) {
                                if (player.body.touching.up && player.height > 560) {
                                    ghost.play('bossPewDead')
                                    setTimeout(() => {
                                        ghost.destroy()
                                    }, 500);
                                    this.player.damage()
                                }
                                if ((player.body.touching.left && this.player.pos == 'L') || (player.body.touching.right && this.player.pos == 'R')) {
                                    this.bltqnt += 8
                                    this.inst.setNewText('x' + this.bltqnt.toString())
                                    ghost.play('bossPewDead')
                                    setTimeout(() => {
                                        ghost.destroy() //DESTROI O FANTASMA QUANDO A COLISAO
                                    }, 500);
                                    if (player.body.onFloor()) {
                                        this.game.config.pss.play()
                                    }
                                    else {
                                        this.game.config.ks.play()
                                    }

                                }
                                else {
                                    this.player.damage()//DANO AO PLAYER AO COLIDIR COM MORCEGO
                                }
                            }
                            else {
                                this.player.damage()//DANO AO PLAYER AO COLIDIR COM MORCEGO
                                ghost.play('bossPewDead')
                                setTimeout(() => {
                                    ghost.destroy()//DESTROI O FANTASMA QUANDO A COLISAO
                                }, 500);

                            }
                        })
                        //MESMA COISA DA DE CIMA, MAS COM O PLAYER 2
                        if (this.players == 'two') {
                            this.physics.add.collider(this.player2.ps, bossPew.gs, (player, ghost) => {
                                if (player.width == 430 || player.height < 560) {
                                    if (player.body.touching.up && player.height > 560) {
                                        ghost.play('bossPewDead')
                                        setTimeout(() => {
                                            ghost.destroy()
                                        }, 500);
                                        this.player.damage()
                                    }
                                    if ((player.body.touching.left && this.player2.pos == 'L') || (player.body.touching.right && this.player2.pos == 'R')) {
                                        this.bltqnt2 += 8
                                        this.inst.setNewText('x' + this.bltqnt2.toString())
                                        ghost.play('bossPewDead')
                                        setTimeout(() => {
                                            ghost.destroy()
                                        }, 500);
                                        if (player.body.onFloor()) {
                                            this.game.config.pss.play()
                                        }
                                        else {
                                            this.game.config.ks.play()
                                        }

                                    }
                                    else {
                                        this.player2.damage()
                                    }
                                }
                                else {
                                    this.player2.damage()
                                    ghost.play('bossPewDead')
                                    setTimeout(() => {
                                        ghost.destroy()
                                    }, 500);

                                }
                            })
                        }
                    }

                } else {
                    this.physics.moveTo(this.boss.gs, 1150, this.player.ps.y)
                }
            } else if (this.boss.gs.isAlive) { //CHECA SE BOSS ESTA VIVO
                //SE TIVER SOUND E PORQUE ESTA DEFININDO SONS A SEREM USADOS
                let bds = this.sound.add('bossDeath', {
                    mute: false,
                    volume: 1,
                    rate: 1,
                    detune: 0,
                    seek: 0,
                    loop: false,
                    delay: 0,
                })
                let vs = this.sound.add('victoryS', {
                    mute: false,
                    volume: 1,
                    rate: 1,
                    detune: 0,
                    seek: 0,
                    loop: false,
                    delay: 0,
                })
                bds.play()
                this.bmsc.stop()
                vs.play()
                this.boss.gs.isAlive = false
                this.canSpawnMinions = false
                this.boss.gs.play('bossDead', true)
                this.bossPews.forEach((pews) => {
                    //pews.gs.play('bossPewDead')
                    setTimeout(() => {
                        pews.gs.destroy()
                    }, 500);
                })
                this.ghosts.forEach((ghost) => {
                    ghost.gs.isAlive = false
                    ghost.gs.destroy()
                })
                setTimeout(() => {
                    this.boss.gs.destroy()
                    //SE BOSS MORREU GANHAR JOGO
                    this.victory = new GameText(this, 70, 300, 'Victory', '200px', '#00000', 'Georgia, "Goudy Bookletter 1911", Times, serif')
                }, 500);
            }
            //CHECA DE TEMPOS EM TEMPOS SE PODE SPAWNAR OS FANTASMAS
            if ((((new Date().getTime()) - this.minionSpawnBefore) > this.minionSpawnFireRate) && this.canSpawnMinions) {
                this.minionSpawnBefore = new Date().getTime()
                for (let i = 0; i < this.ghostNumber; i++) {
                    this.ghosts.push(new Ghost(this, this.randomInterv(-200, -50, 650, 850), this.randomMinAndMax(-200, 400), 'ghostFlying', 0.3, 0))
                }
            }
            this.ghosts.forEach(ghost => {
                //ADICIONA COLISAO DESSES FANTASMAS CRIADOS COM O PLAYER, MESMA LOGICA COM OS FANTASMAS MORCEGOS
                this.physics.add.collider(this.player.ps, ghost.gs, (player, ghost) => {
                    if (player.width == 430 || player.height < 560) {
                        if (player.body.touching.up && player.height > 560) {
                            this.player.damage()
                        }
                        if ((player.body.touching.left && this.player.pos == 'L') || (player.body.touching.right && this.player.pos == 'R')) {
                            ghost.isAlive = false
                            this.bltqnt += 8
                            this.inst.setNewText('x' + this.bltqnt.toString())
                            ghost.destroy()
                            if (player.body.onFloor()) {
                                this.game.config.pss.play()
                            }
                            else {
                                this.game.config.ks.play()
                            }

                        }
                        else {
                            this.player.damage()
                        }
                    }
                    else {
                        this.player.damage()
                        ghost.isAlive = false
                        ghost.destroy()
                    }

                })
            });
            //COLISAO FANTASMAS PLAYER2
            if (this.players == 'two') {
                this.ghosts.forEach(ghost => {
                    this.physics.add.collider(this.player2.ps, ghost.gs, (player, ghost) => {
                        if (player.width == 430 || player.height < 560) {
                            if (player.body.touching.up && player.height > 560) {
                                this.player2.damage()
                            }
                            if ((player.body.touching.left && this.player2.pos == 'L') || (player.body.touching.right && this.player2.pos == 'R')) {
                                ghost.isAlive = false
                                this.bltqnt2 += 8
                                this.inst.setNewText('x' + this.bltqnt2.toString())
                                ghost.destroy()
                                if (player.body.onFloor()) {
                                    this.game.config.pss.play()
                                }
                                else {
                                    this.game.config.ks.play()
                                }

                            }
                            else {
                                this.player2.damage()
                            }
                        }
                        else {
                            this.player2.damage()
                            ghost.isAlive = false
                            ghost.destroy()
                        }

                    })
                });
            }
            //QUANDO A DOIS PLAYERS, ELE RANZDOMIZA QUAL PLAYER CADA FANTASMA IRA SEGUIR
            this.ghosts.forEach(ghost => {
                if (this.players == 'two') {
                    if (ghost.gs.isAlive) {
                        if (!ghost.alocatedTo) {
                            let p = this.randomMinAndMax(1, 0) == 0 ? this.player.ps : this.player2.ps

                            this.physics.moveToObject(ghost.gs, p, 50)
                            let angleBetween = (obj1, obj2) => {
                                var angleDeg = (Math.atan2(obj2.y - obj1.y, obj2.x - obj1.x) * 180 / Math.PI);
                                return angleDeg;
                            }
                            if ((angleBetween(p, ghost.gs) <= 90 && angleBetween(p, ghost.gs) >= 0) || (angleBetween(p, ghost.gs) >= -90 && angleBetween(p, ghost.gs) <= 0)) {
                                ghost.gs.play('flyL', true)
                            }
                            else if ((angleBetween(p, ghost.gs) < -90 && angleBetween(p, ghost.gs) >= -180) || (angleBetween(p, ghost.gs) > 90 && angleBetween(p, ghost.gs) <= 180)) {
                                ghost.gs.play('fly', true)
                            }
                            ghost.alocatedTo = p
                        }
                        else if (ghost.alocatedTo) {
                            let p = ghost.alocatedTo
                            this.physics.moveToObject(ghost.gs, p, 50)
                            let angleBetween = (obj1, obj2) => {
                                var angleDeg = (Math.atan2(obj2.y - obj1.y, obj2.x - obj1.x) * 180 / Math.PI);
                                return angleDeg;
                            }
                            if ((angleBetween(p, ghost.gs) <= 90 && angleBetween(p, ghost.gs) >= 0) || (angleBetween(p, ghost.gs) >= -90 && angleBetween(p, ghost.gs) <= 0)) {
                                ghost.gs.play('flyL', true)
                            }
                            else if ((angleBetween(p, ghost.gs) < -90 && angleBetween(p, ghost.gs) >= -180) || (angleBetween(p, ghost.gs) > 90 && angleBetween(p, ghost.gs) <= 180)) {
                                ghost.gs.play('fly', true)
                            }
                        }
                    }
                }
                else {
                    if (ghost.gs.isAlive) {
                        this.physics.moveToObject(ghost.gs, this.player.ps, 50)
                        let angleBetween = (obj1, obj2) => {
                            var angleDeg = (Math.atan2(obj2.y - obj1.y, obj2.x - obj1.x) * 180 / Math.PI);
                            return angleDeg;
                        }
                        if ((angleBetween(this.player.ps, ghost.gs) <= 90 && angleBetween(this.player.ps, ghost.gs) >= 0) || (angleBetween(this.player.ps, ghost.gs) >= -90 && angleBetween(this.player.ps, ghost.gs) <= 0)) {
                            ghost.gs.play('flyL', true)
                        }
                        else if ((angleBetween(this.player.ps, ghost.gs) < -90 && angleBetween(this.player.ps, ghost.gs) >= -180) || (angleBetween(this.player.ps, ghost.gs) > 90 && angleBetween(this.player.ps, ghost.gs) <= 180)) {
                            ghost.gs.play('fly', true)
                        }
                    }
                }
            });
        }
        //COLISAO DAS PLATAFORMAS COM OS PLAYER
        this.platforms.forEach((plat) => {
            this.physics.add.collider(this.player.ps, plat, (player, plat) => {
            })
            this.physics.add.overlap(this.player.ps, plat, () => {
                if (this.player.checkOverlap) {
                    if (this.player.ps.y > 611 && this.player.ps.y < 612) {
                        this.player.ps.y = 559.94
                    } else if (this.player.ps.y > 281 && this.player.ps.y < 283) {
                        this.player.ps.y = 229.24
                    }
                    this.player.forcePunch = true
                }
            })
        })
        //COLISAO DAS PLATAFORMAS COM OS PLAYER
        if (this.players == 'two') {
            this.platforms.forEach((plat) => {
                this.physics.add.collider(this.player2.ps, plat, (player, plat) => {
                })
                this.physics.add.overlap(this.player2.ps, plat, () => {
                    if (this.player2.checkOverlap) {
                        if (this.player2.ps.y > 611 && this.player2.ps.y < 612) {
                            this.player2.ps.y = 559.94
                        } else if (this.player2.ps.y > 281 && this.player2.ps.y < 283) {
                            this.player2.ps.y = 229.24
                        }
                        this.player2.forcePunch = true
                    }
                })
            })
        }
        //DEFINICAO DE ANIMACOES
        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers("playerRunning"),
            frameRate: 10
        });
        this.anims.create({
            key: 'down',
            frames: this.anims.generateFrameNumbers("playerDown"),
            frameRate: 10
        });
        this.anims.create({
            key: 'stand',
            frames: this.anims.generateFrameNumbers("playerStand"),
            frameRate: 10
        });
        this.anims.create({
            key: 'standL',
            frames: this.anims.generateFrameNumbers("playerStandL"),
            frameRate: 10
        })
        this.anims.create({
            key: 'jump',
            frames: this.anims.generateFrameNumbers("playerJump"),
            frameRate: 10,
        });
        this.anims.create({
            key: 'jumpL',
            frames: this.anims.generateFrameNumbers("playerJumpL"),
            frameRate: 10
        });
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers("playerRunningL"),
            frameRate: 10
        });
        this.anims.create({
            key: 'punching',
            frames: this.anims.generateFrameNumbers("playerPunching"),
            frameRate: 10
        });
        this.anims.create({
            key: 'punchingL',
            frames: this.anims.generateFrameNumbers("playerPunchingL"),
            frameRate: 10
        });
        this.anims.create({
            key: 'kicking',
            frames: this.anims.generateFrameNumbers("playerKicking"),
            frameRate: 10
        });
        this.anims.create({
            key: 'kickingL',
            frames: this.anims.generateFrameNumbers("playerKickingL"),
            frameRate: 10
        });
        this.anims.create({
            key: 'throw',
            frames: this.anims.generateFrameNumbers("playerThrowing"),
            frameRate: 10
        });
        this.anims.create({
            key: 'throwL',
            frames: this.anims.generateFrameNumbers("playerThrowingL"),
            frameRate: 10
        });
        this.anims.create({
            key: 'throwD',
            frames: this.anims.generateFrameNumbers("playerThrowingD"),
            frameRate: 10
        });
        this.anims.create({
            key: 'throwDL',
            frames: this.anims.generateFrameNumbers("playerThrowingDL"),
            frameRate: 10
        });
        this.anims.create({
            key: 'throwV',
            frames: this.anims.generateFrameNumbers("playerThrowingV"),
            frameRate: 10
        });
        this.anims.create({
            key: 'throwVL',
            frames: this.anims.generateFrameNumbers("playerThrowingVL"),
            frameRate: 10
        });

    }

    update(time, delta) {//FUNCAO QUE FICA SEMPRE EM LOOP
        if (this.test == 0) {//CHECA SE OS PLAYERS ESTAO VIVOS
            if (this.player.healthBar.value <= 0) {
                this.test = 1
                this.canSpawnMinions = false
                //SE ESTIVEREM MORTOS DA GAME OVER
                this.gameOverText1 = new GameText(this, 300, 170, 'Game', '200px', '#00000', 'Georgia, "Goudy Bookletter 1911", Times, serif')
                this.gameOverText2 = new GameText(this, 300, 370, 'Over', '200px', '#00000', 'Georgia, "Goudy Bookletter 1911", Times, serif')
                this.gos.play()
                this.bmsc.stop()
            }
            if (this.players == 'two') {
                //MESMA COISA DA DE CIMA
                if (this.player2.healthBar.value <= 0) {
                    this.test = 1
                    this.canSpawnMinions = false
                    this.gameOverText1 = new GameText(this, 300, 170, 'Game', '200px', '#00000', 'Georgia, "Goudy Bookletter 1911", Times, serif')
                    this.gameOverText2 = new GameText(this, 300, 370, 'Over', '200px', '#00000', 'Georgia, "Goudy Bookletter 1911", Times, serif')
                    this.gos.play()
                    this.bmsc.stop()
                }
            }
        }


        if (this.canSpawnMinions) { //SE ELE PODE NASCER FANTASMAS, CRIA E MOVE ELES AOS PLAYERS
            this.moveGhosts()
        }

        //DEFINE O FIRERATE DA ARMA
        if ((((new Date().getTime()) - this.timeBefore) > this.fireRate - 200) && this.player.isThrowing) {
            this.player.isThrowing = false
        }
        if (this.players == 'two') {
            if ((((new Date().getTime()) - this.timeBefore2) > this.fireRate2 - 200) && this.player2.isThrowing) {
                this.player2.isThrowing = false
            }
        }

        if (this.canSpawnMinions) {
            //AQUI PARA BAIXO E SO MOVIMENTACAO DO PLAYER, SE A TECLA TAL ISDOWN(PRESSIONADA) EXECUTAR ACAO
            if (this.player2 != undefined) {
                if (this.keys.ALT.isDown && this.keys.LEFT.isDown) {
                    if (this.player2.isThrowing) {
                        this.player2.throwing_card()
                    }
                    else {
                        if (this.keys.L.isDown) {
                            this.player2.combat()
                        } else {
                            this.player2.standShot('L')
                        }
                    }
                }
                else if (this.keys.ALT.isDown && this.keys.RIGHT.isDown) {
                    if (this.player2.isThrowing) {
                        this.player2.throwing_card()
                    } else {
                        if (this.keys.L.isDown) {
                            this.player2.combat()
                        }
                        else {
                            this.player2.standShot('R')
                        }
                    }
                }
                else if (this.keys.ALT.isDown) {
                    if (this.player2.isThrowing) {
                        this.player2.throwing_card()
                    } else {
                        this.player2.standShot(this.player2.pos)
                    }
                }
                else if (this.keys.L.isDown) {
                    this.player2.combat()
                }
                else if (this.keys.ALT.isDown) {
                    this.player2.standShot()
                    if (this.keys.L.isDown) {
                        this.player2.combat()
                    }
                }
                else if (this.keys.L.isDown) {
                    this.player2.combat()
                }
                else if (this.keys.LEFT.isDown && this.keys.RIGHT.isDown && !this.keys.DOWN.isDown) {
                    this.player2.stand()
                }
                else if (this.keys.UP.isDown && this.keys.RIGHT.isDown) {
                    this.player2.jump()
                    this.player2.move_right_jump()
                }
                else if (this.keys.UP.isDown && this.keys.LEFT.isDown) {
                    this.player2.jump()
                    this.player2.move_left_jump()
                }
                else if (this.keys.UP.isDown) {
                    this.player2.jump()
                }
                else if (this.keys.RIGHT.isDown && !this.keys.DOWN.isDown) {
                    this.player2.move_right()
                }
                else if (this.keys.LEFT.isDown && !this.keys.DOWN.isDown) {
                    this.player2.move_left()
                }
                else if (this.keys.DOWN.isDown) {
                    this.player2.sneak()
                }
                else {
                    if (this.player2.isThrowing) {
                        this.player2.throwing_card()
                    }
                    else {
                        this.player2.stand()
                    }
                }
            }
            if (this.keys.SHIFT.isDown && this.keys.A.isDown) {
                if (this.player.isThrowing) {
                    this.player.throwing_card()
                }
                else {
                    if (this.keys.B.isDown) {
                        this.player.combat()
                    } else {
                        this.player.standShot('L')
                    }
                }
            }
            else if (this.keys.SHIFT.isDown && this.keys.D.isDown) {
                if (this.player.isThrowing) {
                    this.player.throwing_card()
                } else {
                    if (this.keys.B.isDown) {
                        this.player.combat()
                    }
                    else {
                        this.player.standShot('R')
                    }
                }
            }
            else if (this.keys.SHIFT.isDown) {
                if (this.player.isThrowing) {
                    this.player.throwing_card()
                } else {
                    this.player.standShot(this.player.pos)
                }
            }
            else if (this.keys.B.isDown) {
                this.player.combat()
            }
            else if (this.keys.SHIFT.isDown) {
                this.player.standShot()
                if (this.keys.B.isDown) {
                    this.player.combat()
                }
            }
            else if (this.keys.A.isDown && this.keys.D.isDown && !this.keys.B.isDown) {
                this.player.stand()
            }
            else if (this.keys.W.isDown && this.keys.D.isDown) {
                this.player.jump()
                this.player.move_right_jump()
            }
            else if (this.keys.W.isDown && this.keys.A.isDown) {
                this.player.jump()
                this.player.move_left_jump()
            }
            else if (this.keys.W.isDown) {
                this.player.jump()
            }
            else if (this.keys.D.isDown && !this.keys.S.isDown) {
                this.player.move_right()
            }
            else if (this.keys.A.isDown && !this.keys.S.isDown) {
                this.player.move_left()
            }
            else if (this.keys.S.isDown) {
                this.player.sneak()
            }

            else {
                if (this.player.isThrowing) {
                    this.player.throwing_card()
                }
                else {
                    this.player.stand()
                }
            }
        }
        else {
            this.player.stand()
            if (this.players == 'two') {
                this.player2.stand()
            }
        }
        //ATIRA CARTEIRINHA
        if (this.keys.V.isDown && !this.keys.S.isDown && !this.keys.B.isDown && this.canSpawnMinions) {
            if (((new Date().getTime()) - this.timeBefore) > this.fireRate) {//CHECA SE O FIRERATE PERMITE
                this.timeBefore = new Date().getTime()
                if (this.bltqnt > 0) {
                    this.bltqnt = this.bltqnt - 1;
                    this.inst.setNewText('x' + this.bltqnt.toString())

                    let bullet;
                    //FAZ NASCER A CARTEIRINHA
                    let newBullet = () => bullet = new Bullet(this, this.player.ps.x, this.player.ps.y, "id_card", 0.4, this.game.config.idcs)
                    let direction = 'normal'
                    //VE PARA QUAL DIRECAO ATACA A CARTEIRINHA DEPENDENDO DE QUAL TECLA QUE ESTA PRESSIONADA
                    if (this.keys.SHIFT.isDown && (this.keys.D.isDown || this.keys.A.isDown) && this.keys.W.isDown) {
                        direction = 'diagonal'
                        this.player.throwing_card_diagonal()
                    }
                    else if (this.keys.SHIFT.isDown && this.player.ps.body.onFloor() && this.keys.W.isDown) {
                        direction = 'up'
                        this.player.throwing_card_up()
                    }
                    else {
                        this.player.throwing_card()
                    }

                    setTimeout(() => {
                        newBullet()
                        //SE TIVER DOIS PLAYERS ELE COLORE A CARTEIRINHA
                        if (this.players == 'two')
                            bullet.bullet.tint = '0xef5350'
                        direction == 'normal' ? bullet.fire(this.player.pos) : direction == 'up' ? bullet.fireUp() : bullet.fireDiagonally(this.player.pos)
                        this.ghosts.forEach(ghost => {
                            this.physics.add.collider(bullet.bullet, ghost.gs, (bullet, ghost) => {
                                ghost.isAlive = false
                                ghost.destroy()
                                this.game.config.ds.play()
                                bullet.destroy()
                            })
                        });
                        this.physics.add.collider(bullet.bullet, this.boss.gs, (bullet, ghost) => {
                            this.bossDmg.play()
                            this.bossHealth -= 1
                            bullet.destroy()
                        })
                    }, 400);
                }
            }
        }
        //MESMA COISA DO DE CIMA
        if (this.keys.K.isDown && !this.keys.DOWN.isDown && !this.keys.L.isDown && this.canSpawnMinions) {
            if (((new Date().getTime()) - this.timeBefore2) > this.fireRate2) {
                this.timeBefore2 = new Date().getTime()
                if (this.bltqnt2 > 0) {
                    this.bltqnt2 = this.bltqnt2 - 1;
                    this.inst2.setNewText('x' + this.bltqnt2.toString())

                    let bullet;
                    let newBullet = () => bullet = new Bullet(this, this.player2.ps.x, this.player2.ps.y, "id_card", 0.4, this.game.config.idcs)
                    let direction = 'normal'

                    if (this.keys.ALT.isDown && (this.keys.RIGHT.isDown || this.keys.LEFT.isDown) && this.keys.UP.isDown) {
                        direction = 'diagonal'
                        this.player2.throwing_card_diagonal()
                    }
                    else if (this.keys.ALT.isDown && this.player2.ps.body.onFloor() && this.keys.UP.isDown) {
                        direction = 'up'
                        this.player2.throwing_card_up()
                    }
                    else {
                        this.player2.throwing_card()
                    }

                    setTimeout(() => {
                        newBullet()
                        bullet.bullet.tint = '0x29b6f6'
                        direction == 'normal' ? bullet.fire(this.player2.pos) : direction == 'up' ? bullet.fireUp() : bullet.fireDiagonally(this.player2.pos)
                        this.ghosts.forEach(ghost => {
                            this.physics.add.collider(bullet.bullet, ghost.gs, (bullet, ghost) => {
                                ghost.isAlive = false
                                ghost.destroy()
                                this.game.config.ds.play()
                                bullet.destroy()
                            })
                        });
                        this.physics.add.collider(bullet.bullet, this.boss.gs, (bullet, ghost) => {
                            this.bossDmg.play()
                            this.bossHealth -= 1
                            bullet.destroy()
                        })
                    }, 400);
                }
            }
        }
    }
}