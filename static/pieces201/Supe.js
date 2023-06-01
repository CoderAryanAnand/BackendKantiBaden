//Supe = SuperPawn
class Supe extends Piece {
	constructor(position, name) {
		super(position, 'supe', name);
	}

	getAllowedMoves() {
        const position = this.position;
        const mathSign = (this.color == 'white')? '+': '-';
        const allowedMoves = [eval(position + mathSign +'10' )];

        if ( (position >20 && position < 29) || (position >70 && position < 79) )
            allowedMoves.push(eval(position + mathSign +'20' ));

        const attackMoves = [eval(position + mathSign + '9'), eval(position + mathSign + '11')]
        return [ attackMoves, allowedMoves ];
}

changePosition(position, promote=false) {
    this.position = parseInt(position);
    if (promote && (position > 10 || position < 90) && turnnr >= 20) game.supepromote(this);
   // if (promote && (position > 20 || position < 80)) game.supepromote(this);
}
}