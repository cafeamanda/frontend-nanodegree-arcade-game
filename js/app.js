(function () {
   'use strict';
}());

// Enemies Class
var Enemy = function() {
    this.sprite = 'images/enemy-bug.png';

    // Randomly pick an increment (~ velocity) for each new enemy.
    // An integer between 1-9
    this.increment = 1 + Math.floor(Math.random() * ((9 - 1) + 1));

    // Randomly pick one out of the three lanes of stone-block
    // for each new enemy to walk on.
    var num = 1 + Math.floor(Math.random() * 10);
    if (num > 0 && num <= 3) {
        this.y = 310; // first level of stone-block
    } else if (num > 3 && num <= 6) {
        this.y = 227.5; // second level of stone-block
    } else if (num > 6) {
        this.y = 145; // third level of stone-block
    }
    this.x = num * (0 - 1) * 100; // enemy is created off-canvas
};

// Update the enemy's position
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    (this.x += this.increment) * dt;

    // Display "You Win!" when player crosses 10 times
    // and restart the game after 3 seconds.
    if (player.points === 10) {
        player.points = "You Win!";
        setTimeout(function() {
            allEnemies = [];
            player.points = 0;
            player.x = 202;
            player.y = 375;
        }, 3000);
    }

};

// Draw the enemy on the screen
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Player Class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.x = 202;
    this.y = 375;
    this.points = 0;
    this.sprite = 'images/char-boy.png';
};

// Take the player back to the starting point and
// add 1 point to the scoreboard every time the
// hero reaches the water.
Player.prototype.update = function(key) {
    if (key === 'up' && this.y <= 81 && !isNaN(this.points)) {
        this.x = 202;
        this.y = 375;
        this.points++;
    }
};

// Draw the player on the screen
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Handle keyboard input for:
// 1) Choosing a character
// 2) Moving the hero
Player.prototype.handleInput = function(key) {
    switch (key) {
        case '1':
            this.sprite = 'images/char-boy.png';
            break;
        case '2':
            this.sprite = 'images/char-cat-girl.png';
            break;
        case '3':
            this.sprite = 'images/char-horn-girl.png';
            break;
        case '4':
            this.sprite = 'images/char-pink-girl.png';
            break;
        case '5':
            this.sprite = 'images/char-princess-girl.png';
            break;
    }


    // 2)
    // Make sure the hero doesn't move off-canvas
    if (key === 'down' && this.y < 375) {
        this.y += 81;
    } else if (key === 'up' && this.y > 81) {
        this.y -= 81;
    } else if (key === 'right' && this.x < 400) {
        this.x += 101;
    } else if (key === 'left' && this.x > 0) {
        this.x -= 101;
    }
};

// Instantiate objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var player,
    allEnemies;

player = new Player();
allEnemies = [];

// Create a new enemy every 0.5s and add it to the allEnemies array
// with the push() method.
function createEnemies() {
    setTimeout(function() {
        var enemy = new Enemy();
        allEnemies.push(enemy);
        requestAnimationFrame(createEnemies);
    }, 500);
}

createEnemies();

// This listens for key presses and sends the keys to your
// Player.handleInput() method.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        49: '1',
        50: '2',
        51: '3',
        52: '4',
        53: '5'
    };
    player.handleInput(allowedKeys[e.keyCode]);
    player.update(allowedKeys[e.keyCode]);
});

// This listens for click events and sends the keys to your
// Player.handleInput() method.
document.addEventListener('click', function(e) {
    var up = document.getElementById('up');
    var down = document.getElementById('down');
    var left = document.getElementById('left');
    var right = document.getElementById('right');

    if (e.target === up) {
        player.handleInput('up');
        player.update('up');
    } else if (e.target === down) {
        player.handleInput('down');
    } else if (e.target === left) {
        player.handleInput('left');
    } else if (e.target === right) {
        player.handleInput('right');
    }

});
