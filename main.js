// Create our 'main' state that will contain the game
var mainState = {
    preload: function() {
        // This function will be executed at the beginning
        // That's where we load the images and sounds
        game.load.image('bird', 'assets/bird.png');
        game.load.image('pipe', 'assets/pipe.png');
    },

    create: function() {
        // This function is called after the preload function
        // Here we set up the game, display sprites, etc.

        //change background color to blue
        game.stage.backgroundColor = '#71c5cf';

        //set Physics system
        game.physics.startSystem(Phaser.Physics.ARCADE);

        //Display the birds position
        this.bird = game.add.sprite(100, 245, 'bird');

        //Add pysics to the bird - Needed for:movements, gravity, collisions
        game.physics.arcade.enable(this.bird);

        //add gravity to the bird
        this.bird.body.gravity.y = 1000;

        //call the "jump function" when the spacekey is entered
        var spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        spaceKey.onDown.add(this.jump, this);

        //create an empty group
        this.pipes = game.add.group();

        //Timer for creating pipes every 1.5  seconds
        this.timer = game.time.events.loop(1500, this.addRowOfPipes, this);

        //score counter
        this.score = 0;
        this.labelScore = game.add.text(20, 20, "0", { font: "30px Arial", fill: "#ffffff" });
    },

//creates single pipe
    addOnePipe: function(x, y) {
      var pipe = game.add.sprite(x, y, 'pipe');

      //add pipe to group
      this.pipes.add(pipe);

      //Enable physics on the pipe
      game.physics.arcade.enable(pipe);

      pipe.body.velocity.x = -200;

      //automatically kill the pipe when its no longer visible
      pipe.checkWorldBounds = true;
      pipe.outOfBoundsKill = true;
    },


//creates more pipes
    addRowOfPipes: function() {
      //randomly pick a number between one & five which will be the position of the hole
      var hole = Math.floor(Math.random() * 5) + 1;

      //Add the 6 pipes with a hole at position 'hole' & 'hole + 1'
      for (var i = 0; i < 8; i++) {
          if (i != hole && i != hole + 1)
            this.addOnePipe(400, i * 60 + 10);
          }
//Updating the score
          this.score += 1;
          this.labelScore.text = this.score;
    },

    update: function() {
        // This function is called 60 times per second
        // It contains the game's logic
        //If the bird is out of the screen(too high or low), call the 'restartGame' function
        if (this.bird.y < 0 || this.bird.y > 490)
        this.restartGame();
        game.physics.arcade.overlap(this.bird, this.pipes, this.restartGame, null, this);
    },

    jump: function() {
      // Add a vertical velocity to the bird
      this.bird.body.velocity.y = -350;
    },

// Restart the Game
    restartGame: function() {
        game.state.start('main');
    }
};

// Initialize Phaser, and create a 400px by 490px game
var game = new Phaser.Game(400, 490);

// Add the 'mainState' and call it 'main'
game.state.add('main', mainState);

// Start the state to actually start the game
game.state.start('main');
console.log("yoh");
