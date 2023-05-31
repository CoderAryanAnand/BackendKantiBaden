class Gobl extends Piece {
	constructor(position, name) {
		super(position, 'gobl', name);
		this.ableToCastle = true;
	}

	getAllowedMoves() {
		return [ this.getMovesTop(), this.getMovesBottom(), this.getMovesRight(), this.getMovesLeft() ];
	}
}