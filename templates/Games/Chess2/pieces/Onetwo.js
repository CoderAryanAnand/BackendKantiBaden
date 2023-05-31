class Onetwo extends Piece {
	constructor(position, name) {
		super(position, 'onetwo', name);
	}

	getAllowedMoves() {
		const position = this.position;

		if (game.turn == "white" && wturnnr % 2 === 0 || game.turn == "black" && bturnnr % 2 === 0){

		// if (turnnr === 5) {
			return [
			[parseInt(position) + 1],
			[parseInt(position) - 1],
			[parseInt(position) + 2],
			[parseInt(position) - 2],
			[parseInt(position) + 10],
			[parseInt(position) - 10],
			[parseInt(position) + 20],
			[parseInt(position) - 20],
			[parseInt(position) + 11],
			[parseInt(position) + 9],
			[parseInt(position) - 9],
			[parseInt(position) - 11]
		];
		} else {
			return [
				[parseInt(position) + 1],
				[parseInt(position) - 1],
				//[parseInt(position) + 2],
				//[parseInt(position) - 2],
				[parseInt(position) + 10],
				[parseInt(position) - 10]//,
				//[parseInt(position) + 20],
				//[parseInt(position) - 20]
			];
		}
		
	}
}