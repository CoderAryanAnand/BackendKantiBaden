/*class Mara extends Piece {
	constructor(position, name) {
		super(position, 'mara', name);
	}

	getAllowedMoves() {
		const position = this.position;
		return [
			[parseInt(position) + 1],
			[parseInt(position) - 1],
			[parseInt(position) + 2],
			[parseInt(position) - 2],
			[parseInt(position) + 10],
			[parseInt(position) - 10],
			[parseInt(position) + 20],
			[parseInt(position) - 20]
		];
	}
}
*/

//the following works :) - Jan
//only gets to move 2 on turn 5, use as template

class Mara extends Piece {
	constructor(position, name) {
		super(position, 'mara', name);
	}

	getAllowedMoves() {
		const position = this.position;
		
		if (turnnr === 5) {
			return [
			[parseInt(position) + 1],
			[parseInt(position) - 1],
			[parseInt(position) + 2],
			[parseInt(position) - 2],
			[parseInt(position) + 10],
			[parseInt(position) - 10],
			[parseInt(position) + 20],
			[parseInt(position) - 20]
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