// Enemies our player must avoid
var Enemy = function(x,y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    //set the enemy initial location as part of enemy function
    //set enemey speed as part of enemy function
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    //first thought
    //this.dt *= dt;
    //this causes enemies to move in a loop from left to right
    this.x += Math.floor(Math.random()*1200*dt);
    if (this.x >= 505) {
        this.x = -120;
    }
    // setting up collision function
    // bugs are x >=2 <= 99, y >= 78 <= 144 px player is x >=18 <= 84, y >= 64 <= 159
   /* var checkCollisions = function() {
        for (enemy in allEnemies) {
            // if (allEnemies[enemy].x + 99 === player.x + 18 && allEnemies[enemy].y + 144 === player.y + 64) {
            if ((Player.prototype[this.x]) === (Enemy.prototype[this.x]) || Player.prototype[this.y] === Enemy.prototype[this.y]) {
                this.reset();
                console.log("Game Over");
            }
        }
    } */
}
    /* junk code can be deleted
    var enemyMove = function() {
        while (player) {
            this.x = x++;
            collision(!false);
            console.log("x");
        }


        }; */
    
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    // enemies move along the x axis on a stationary y point.
    // This function needs to update enemy location
        // This function handles a collision with player, i.e. resets game


// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(sprite, x,y) {
	this.sprite = sprite;
    this.x = 200;
    this.y = 415;
    // documentation on location https://developer.mozilla.org/en-US/docs/Web/API/Location
    // may need to us this.loc = loc;
    // may need to differentiate between location and starting location
    // set player initial location
}

Player.prototype.update = function(dt) {
    // I don't think the following two lines do anything
    this.x * (dt);
    this.y * (dt);
    // this if statement resets the game when player reaches water
    if (player.y === 0) {
        player.reset();
    }

    for(var i = 0, bugs = allEnemies.length; i < bugs; i++) {
        if(player.x <= (allEnemies[i].x + 55) && allEnemies[i].x <= (player.x + 55) && 
        player.y <= (allEnemies[i].y + 50) && allEnemies[i].y <= (player.y + 50)) {
            player.reset();
        }

    }
   // think about how to use update to move enemies and player
   // these movements need to be defined.
   // player can move with keys. So do I call Player.handleInput() ?
   // x += this.x;
   // y += this.y;
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(move) {
    if (move === 'left' && this.x > 0) {
        this.x -= (100);
    }
    else if (move === 'right' && this.x < 400) {
        this.x += (100);
    }
    else if (move === 'up' && this.y > 0) {
        this.y -= (83);
    }
    else if (move === 'down' && this.y < 400) {
        this.y += (83);
    }
    //use allowed keys to make player move
    // do not allow player to move off screen
};

Player.prototype.reset = function() {
    this.x = 200;
    this.y = 415;
    // how do I define reset?
    // how does the game reset? when a bug is hit? after points collected?
    // write a function that takes an argument function(hitABug)
    // call reset funct on player, enemy, graphics to re render everything.
    // considered udacious
    // if player reaches water resets game.
}
    //'images/char-boy.png';
    /* Additional sprites for player. We'll start with the boy first 
    this.sprite = 'images/cat-girl.png';
	this.sprite = 'char-horn-girl.png';
	this.sprite = 'char-pink-girl.png';
	this.sprite = 'char-princess-girl.png';    */



// Now instantiate your objects.
// when instatiating a new player object should be created and enemies placed into array.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
// var enemy = new Enemy();
var allEnemies = [new Enemy(-10,60), new Enemy(-40,143), new Enemy(-70,226)]; 
// enemy is hide on left at x=-100 and on right at x=505. I like y at 60,143,226
var player = new Player('images/char-boy.png') ;
//Enemy.update(); // Enemy update is called on engine ln95.

//player.update();
//player.render(); // May not need to call player.render because it's called in engine ln155
//player.handleInput();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
