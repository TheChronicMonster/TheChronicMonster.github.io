// Enemies our player must avoid
var Enemy = function(x,y) {
    'use strict';
    // Variables applied to each of our instances go here,
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
// Multiplying movement with dt parameter ensures consistent speed on all computers.
Enemy.prototype.update = function(dt) {
    'use strict';
    //this causes enemies to move in a loop from left to right on x axis.
    this.x += Math.floor(Math.random()*1200*dt);
    if (this.x >= 505) {
        this.x = -120;
    }
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    'use strict';
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Player class
var Player = function(sprite, x,y) {
    'use strict';
    this.sprite = sprite;
    this.x = 200;
    this.y = 415;
}

Player.prototype.update = function(dt) {
    'use strict';
    this.x * (dt);
    this.y * (dt);
    // this if statement resets the game when player reaches water
    if (player.y === 0) {
        player.reset();
    }
    // collision detection loop
    for(var i = 0, bugs = allEnemies.length; i < bugs; i++) {
        if(player.x <= (allEnemies[i].x + 55) && allEnemies[i].x <= (player.x + 55) && 
        player.y <= (allEnemies[i].y + 50) && allEnemies[i].y <= (player.y + 50)) {
            player.reset();
        }
    }
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//use allowed keys from keyup event listener to make player move
// do not allow player to move off screen
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
};

// Resets player position after collision or win.
Player.prototype.reset = function() {
    'use strict';
    this.x = 200;
    this.y = 415;
}

// Instantiates enemies and player.
var allEnemies = [new Enemy(-10,60), new Enemy(-40,143), new Enemy(-70,226)]; 
// enemy is hid on left at x=-100 and on right at x=505. I like y at 60,143,226
var player = new Player('images/char-boy.png') ;

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
