class Gob extends Piece {
	constructor(position, name) {
		super(position, 'gob', name);
	}

	getAllowedMoves() {
		return [ this.getMovesTopRight(), this.getMovesTopLeft(), this.getMovesBottomRight(), this.getMovesBottomLeft() ];
	}
}

//exports = Gob;