// evolved now lol
class Superpawn extends Piece {
	constructor(position, name) {
		super(position, 'superpawn', name);
	}

    getAllowedMoves() {
		const position = this.position;
		return [
			[parseInt(position) + 10],
			[parseInt(position) - 10],
			[parseInt(position) + 9],
			[parseInt(position) + 11],
			[parseInt(position) + 1],
			[parseInt(position) - 1],
			[parseInt(position) - 11],
			[parseInt(position) - 9]
		];
	}
}