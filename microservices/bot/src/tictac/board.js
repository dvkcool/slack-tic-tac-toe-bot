const _ = require('underscore');

const Slot = require('./slot');
const Emoji = require('./emoji');
const BoardStringGenerator = require('./boardStringGenerator');

const WIDTH = 3;
const HEIGHT = 3;

class Board {

    constructor(gameType) {
        this.gameType = gameType;
        this.slots = this.initialiseSlots();
        this.gameWon = false;
        this.bsg = new BoardStringGenerator(this.slots, WIDTH, HEIGHT);
    }

    static get width() {
        return WIDTH;
    }

    static get height() {
        return HEIGHT;
    }

    static validCell(cell) {
        return cell < 9 && cell >= 0;
    }

    getCounterAt(row, col) {
        return this.slots[row][col];
    }

    play(cell, colour) {
	let row =Math.floor(cell/3);
	let col = Math.floor(cell%3);
	this.slots[row][col].play(colour);
        this.gameWon = this.checkWon();
        return this.slots[row][col];
    }

    isCellFull(cell) {
	let row =Math.floor(cell/3);
	let col = Math.floor(cell%3);
        return !this.slots[row][col].empty;
    }

    isBoardFull() {
        /*let topRow = this.slots[this.slots.length - 1];
        return _.every(topRow, (slot) => {
            return !slot.empty;
        });*/
	let m =true;
	for(let i=0; i<3; i++){
	 for(let j=0; j<3; j++){
	  if(this.slots[i][j].empty){
		m= false;
	  }
	 }
	}
	return m;
    }

    /**
     * Checks whether the counter just played was a winning move for that player.
     * Only looks at the winning positions the most recent counter is in, and only checks if the player
     * that just played has won, not both players.
     * @returns {boolean}
     */
    checkWon() {
       // return this.bsg.checkWon(this.lastPlayedSlot);
	//First row
	if(!this.slots[0][0].empty &&(this.slots[0][0].symbol == this.slots[0][1].symbol && this.slots[0][0].symbol == this.slots[0][2].symbol)){
	 return true;
	}
	//Second row
	if(!this.slots[1][0].empty &&(this.slots[1][0].symbol == this.slots[1][1].symbol && this.slots[1][0].symbol == this.slots[1][2].symbol)){
	 return true;
	}
	//Third row
	if(!this.slots[2][0].empty &&(this.slots[2][0].symbol == this.slots[2][1].symbol && this.slots[2][0].symbol == this.slots[2][2].symbol)){
	 return true;
	}
	//First column
	if(!this.slots[0][0].empty &&(this.slots[0][0].symbol == this.slots[1][0].symbol && this.slots[0][0].symbol == this.slots[2][0].symbol)){
	 return true;
	}
	//Second column
	if(!this.slots[0][1].empty &&(this.slots[0][1].symbol == this.slots[1][1].symbol && this.slots[0][1].symbol == this.slots[2][1].symbol)){
	 return true;
	}
	//Third column
	if(!this.slots[0][2].empty &&(this.slots[0][2].symbol == this.slots[1][2].symbol && this.slots[0][2].symbol == this.slots[2][2].symbol)){
	 return true;
	}
	//Diagonal 1
	if(!this.slots[0][0].empty &&(this.slots[0][0].symbol == this.slots[1][1].symbol && this.slots[0][0].symbol == this.slots[2][2].symbol)){
	 return true;
	}
	//Diagonal 2
	if(!this.slots[0][2].empty &&(this.slots[0][2].symbol == this.slots[1][1].symbol && this.slots[0][2].symbol == this.slots[2][0].symbol)){
	 return true;
	}
	return false;
    }

    toString() {
        let display = "";
	display += '		==========';
	display += '\n';
        for (let i = 0; i <=this.slots.length - 1; i++) { 
	    display += Emoji.number[i];
	    display += ' ';
            for (let slot of this.slots[i]) {
                display += slot.toString();
		display += '||';
            }
	    display += '\n';
	    display += '		==========';
            display += '\n';
        }
	display += '	    ';
        for (let i = 1; i <= 3; i++) {
            display += Emoji.number[i];
	    display += '||'
        }
        return display;
    }

    initialiseSlots() {
        return _.map(new Array(HEIGHT), (a, i) => {
            return _.map(new Array(WIDTH), (b, j) => {
                return new Slot(i, j, this.gameType);
            }, this);
        }, this);
    }
}

module.exports = Board;
