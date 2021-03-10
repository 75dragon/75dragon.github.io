class Piece
{
	col = 0
	row = 0
	isWhite = true
	type = "King"
	letter = "K"
	moving = false
	pixelCol = 0
	pixelRow = 0
	constructor(col, row, isWhite, type, img)
	{
		this.col = col;
		this.row = row;
		this.isWhite = isWhite;
		this.type = type;
		this.img = img;
		this.hasNotMoved = true;
	}

	draw(ctx)
	{
		if (this.moving)
		{
			ctx.drawImage(this.img,this.pixelCol - 30,this.pixelRow - 30);
		}
		else
		{
	   		ctx.drawImage(this.img, 20 + this.col * 100 , 20 + this.row * 100);
	    }
	}

	move(col, row)
	{
		this.col = col;
		this.row = row;
	}

	getSquare()
	{
		return this.col + 8 * this.row;
	}
}

class King extends Piece
{
	constructor(col,row,isWhite, img)
	{
		super(col, row, isWhite, "King", img);
		this.letter = "K";
	}

	attacks(board)
	{
		var moves = new Array(64).fill(false);
		for (var c = 0; c < 8; c++)
		{
			for (var r = 0; r < 8; r++)
			{
				if (Math.abs(this.col - c) <= 1 && Math.abs(this.row - r) <= 1)
				{
					if (!(this.col - c == 0 && this.col - c == this.row - r))
					{
						moves[c + 8 * r] = true;
					}
				}
			}
		}
		return moves;
	}

	moves(board)
	{
		var moves = new Array(64).fill(false);
		for (var c = 0; c < 8; c++)
		{
			for (var r = 0; r < 8; r++)
			{
				if (Math.abs(this.col - c) <= 1 && Math.abs(this.row - r) <= 1)
				{
					if (!board.squareOccupied(c, r) || (board.getPiece(c, r).isWhite != this.isWhite))
					moves[c + 8 * r] = true;
				}
			}
		}
		//castle, king not in check and king has not moved
		if (this.hasNotMoved && !board.squareAttacked(this.col + 8 * this.row, !this.isWhite))
		{
			//kingside
			//check if piece has not moved, thus is rook
			if (board.squareOccupied(7, this.row) && board.getPiece(7, this.row).isWhite == this.isWhite && board.getPiece(7, this.row).hasNotMoved)
			{
				//check if middle squares empty
				if (!(board.squareOccupied(5, this.row ) || board.squareOccupied(6, this.row)))
				{
					//check if squares attacked by enemy
					if(!board.squareAttacked(6 + 8 * this.row, !this.isWhite) && !board.squareAttacked(5 + 8 * this.row, !this.isWhite))
					{
						console.log("can castle kingside")
						moves[6 + 8 * this.row] = "CK";
					}
				}
			}
			//queenside
			if (board.squareOccupied(0, this.row) && board.getPiece(0, this.row).isWhite == this.isWhite && board.getPiece(0, this.row).hasNotMoved)
			{
				//check if middle squares empty
				if (!(board.squareOccupied( 1, this.row ) || board.squareOccupied(2, this.row ) || board.squareOccupied(3, this.row)))
				{
					//check if squares attacked by enemy
					if(!board.squareAttacked(2 + 8 * this.row, !this.isWhite) && !board.squareAttacked(3 + 8 * this.row, !this.isWhite))
					{
						console.log("can castle queenside")
						moves[2 + 8 * this.row] = "CQ";
					}
				}
			}
		}
		return moves;
	}
}

class Queen extends Piece
{
	constructor(col,row,isWhite, img)
	{
		super(col, row, isWhite, "Queen", img);
		this.letter = "Q";
	}

	attacks(board)
	{
		var moves = new Array(64).fill(false);
		var c = this.col - 1;
		var r = this.row;
		//go left
		while (c >= 0 )
		{
			moves[c + 8 * r] = true;
			if (board.squareOccupied(c, r) )
			{
				break;
			}
			c = c - 1
		}
		c = this.col - 1;
		r = this.row + 1;
		//go left down
		while (c >= 0 && r <= 7 )
		{
			moves[c + 8 * r] = true;
			if (board.squareOccupied(c, r) )
			{
				break;
			}
			c = c - 1;
			r = r + 1;
		}
		c = this.col;
		r = this.row + 1;
		//go down
		while (r <= 7 )
		{
			moves[c + 8 * r] = true;
			if (board.squareOccupied(c, r) )
			{
				break;
			}
			r = r + 1;
		}
		c = this.col + 1;
		r = this.row + 1;
		//go right down
		while (c <= 7 && r <= 7 )
		{
			moves[c + 8 * r] = true;
			if (board.squareOccupied(c, r) )
			{
				break;
			}
			c = c + 1;
			r = r + 1;
		}
		c = this.col + 1;
		r = this.row;
		//go right
		while (c <= 7 )
		{
			moves[c + 8 * r] = true;
			if (board.squareOccupied(c, r) )
			{
				break;
			}
			c = c + 1
		}
		c = this.col + 1;
		r = this.row - 1;
		//go right up
		while (c <= 7 && r >= 0 )
		{
			moves[c + 8 * r] = true;
			if (board.squareOccupied(c, r) )
			{
				break;
			}
			c = c + 1
			r = r - 1
		}
		c = this.col;
		r = this.row - 1;
		//go up
		while (r >= 0 )
		{
			moves[c + 8 * r] = true;
			if (board.squareOccupied(c, r) )
			{
				break;
			}
			r = r - 1;
		}
		c = this.col - 1;
		r = this.row - 1;
		//go up left
		while (c >= 0 && r >= 0 )
		{
			moves[c + 8 * r] = true;
			if (board.squareOccupied(c, r) )
			{
				break;
			}
			c = c - 1
			r = r - 1
		}
		return moves;
	}

	moves(board)
	{
		var moves = new Array(64).fill(false);
		var c = this.col - 1;
		var r = this.row;
		//go left
		while (c >= 0 && (!board.squareOccupied(c, r) || (board.getPiece(c, r).isWhite != this.isWhite)))
		{
			moves[c + 8 * r] = true;
			if (board.squareOccupied(c, r) && board.getPiece(c, r).isWhite != this.isWhite)
			{
				break;
			}
			c = c - 1
		}
		c = this.col - 1;
		r = this.row + 1;
		//go left down
		while (c >= 0 && r <= 7 && (!board.squareOccupied(c, r) || (board.getPiece(c, r).isWhite != this.isWhite)))
		{
			moves[c + 8 * r] = true;
			if (board.squareOccupied(c, r) && board.getPiece(c, r).isWhite != this.isWhite)
			{
				break;
			}
			c = c - 1;
			r = r + 1;
		}
		c = this.col;
		r = this.row + 1;
		//go down
		while (r <= 7 && (!board.squareOccupied(c, r) || (board.getPiece(c, r).isWhite != this.isWhite)))
		{
			moves[c + 8 * r] = true;
			if (board.squareOccupied(c, r) && board.getPiece(c, r).isWhite != this.isWhite)
			{
				break;
			}
			r = r + 1;
		}
		c = this.col + 1;
		r = this.row + 1;
		//go right down
		while (c <= 7 && r <= 7 && (!board.squareOccupied(c, r) || (board.getPiece(c, r).isWhite != this.isWhite)))
		{
			moves[c + 8 * r] = true;
			if (board.squareOccupied(c, r) && board.getPiece(c, r).isWhite != this.isWhite)
			{
				break;
			}
			c = c + 1;
			r = r + 1;
		}
		c = this.col + 1;
		r = this.row;
		//go right
		while (c <= 7 && (!board.squareOccupied(c, r) || (board.getPiece(c, r).isWhite != this.isWhite)))
		{
			moves[c + 8 * r] = true;
			if (board.squareOccupied(c, r) && board.getPiece(c, r).isWhite != this.isWhite)
			{
				break;
			}
			c = c + 1
		}
		c = this.col + 1;
		r = this.row - 1;
		//go right up
		while (c <= 7 && r >= 0 && (!board.squareOccupied(c, r) || (board.getPiece(c, r).isWhite != this.isWhite)))
		{
			moves[c + 8 * r] = true;
			if (board.squareOccupied(c, r) && board.getPiece(c, r).isWhite != this.isWhite)
			{
				break;
			}
			c = c + 1
			r = r - 1
		}
		c = this.col;
		r = this.row - 1;
		//go up
		while (r >= 0 && (!board.squareOccupied(c, r) || (board.getPiece(c, r).isWhite != this.isWhite)))
		{
			moves[c + 8 * r] = true;
			if (board.squareOccupied(c, r) && board.getPiece(c, r).isWhite != this.isWhite)
			{
				break;
			}
			r = r - 1;
		}
		c = this.col - 1;
		r = this.row - 1;
		//go up left
		while (c >= 0 && r >= 0 && (!board.squareOccupied(c, r) || (board.getPiece(c, r).isWhite != this.isWhite)))
		{
			moves[c + 8 * r] = true;
			if (board.squareOccupied(c, r) && board.getPiece(c, r).isWhite != this.isWhite)
			{
				break;
			}
			c = c - 1
			r = r - 1
		}
		return moves;
	}
}

class Rook extends Piece
{
	constructor(col,row,isWhite, img)
	{
		super(col, row, isWhite, "Rook", img);
		this.letter = "R";
	}

	attacks(board)
	{
		var moves = new Array(64).fill(false);
		var c = this.col - 1;
		var r = this.row;
		//go left
		while (c >= 0 )
		{
			moves[c + 8 * r] = true;
			if (board.squareOccupied(c, r) )
			{
				break;
			}
			c = c - 1
		}
		c = this.col;
		r = this.row + 1;
		//go down
		while (r <= 7 )
		{
			moves[c + 8 * r] = true;
			if (board.squareOccupied(c, r) )
			{
				break;
			}
			r = r + 1;
		}
		c = this.col + 1;
		r = this.row;
		//go right
		while (c <= 7 )
		{
			moves[c + 8 * r] = true;
			if (board.squareOccupied(c, r) )
			{
				break;
			}
			c = c + 1
		}
		c = this.col;
		r = this.row - 1;
		//go up
		while (r >= 0 )
		{
			moves[c + 8 * r] = true;
			if (board.squareOccupied(c, r) )
			{
				break;
			}
			r = r - 1;
		}
		return moves;
	}

	moves(board)
	{
		var moves = new Array(64).fill(false);
		var c = this.col - 1;
		var r = this.row;
		//go left
		while (c >= 0 && (!board.squareOccupied(c, r) || (board.getPiece(c, r).isWhite != this.isWhite)))
		{
			moves[c + 8 * r] = true;
			if (board.squareOccupied(c, r) && board.getPiece(c, r).isWhite != this.isWhite)
			{
				break;
			}
			c = c - 1
		}
		c = this.col;
		r = this.row + 1;
		//go down
		while (r <= 7 && (!board.squareOccupied(c, r) || (board.getPiece(c, r).isWhite != this.isWhite)))
		{
			moves[c + 8 * r] = true;
			if (board.squareOccupied(c, r) && board.getPiece(c, r).isWhite != this.isWhite)
			{
				break;
			}
			r = r + 1;
		}
		c = this.col + 1;
		r = this.row;
		//go right
		while (c <= 7 && (!board.squareOccupied(c, r) || (board.getPiece(c, r).isWhite != this.isWhite)))
		{
			moves[c + 8 * r] = true;
			if (board.squareOccupied(c, r) && board.getPiece(c, r).isWhite != this.isWhite)
			{
				break;
			}
			c = c + 1
		}
		c = this.col;
		r = this.row - 1;
		//go up
		while (r >= 0 && (!board.squareOccupied(c, r) || (board.getPiece(c, r).isWhite != this.isWhite)))
		{
			moves[c + 8 * r] = true;
			if (board.squareOccupied(c, r) && board.getPiece(c, r).isWhite != this.isWhite)
			{
				break;
			}
			r = r - 1;
		}
		return moves;
	}
}

class Bishop extends Piece
{
	constructor(col,row,isWhite, img)
	{
		super(col, row, isWhite, "Bishop", img);
		this.letter = "B";
	}

	attacks(board)
	{
		var moves = new Array(64).fill(false);
		var c = this.col - 1;
		var r = this.row + 1;
		//go left down
		while (c >= 0 && r <= 7 )
		{
			moves[c + 8 * r] = true;
			if (board.squareOccupied(c, r) )
			{
				break;
			}
			c = c - 1;
			r = r + 1;
		}
		c = this.col + 1;
		r = this.row + 1;
		//go right down
		while (c <= 7 && r <= 7 )
		{
			moves[c + 8 * r] = true;
			if (board.squareOccupied(c, r) )
			{
				break;
			}
			c = c + 1;
			r = r + 1;
		}
		c = this.col + 1;
		r = this.row - 1;
		//go right up
		while (c <= 7 && r >= 0 )
		{
			moves[c + 8 * r] = true;
			if (board.squareOccupied(c, r) )
			{
				break;
			}
			c = c + 1
			r = r - 1
		}
		c = this.col - 1;
		r = this.row - 1;
		//go up left
		while (c >= 0 && r >= 0 )
		{
			moves[c + 8 * r] = true;
			if (board.squareOccupied(c, r) )
			{
				break;
			}
			c = c - 1
			r = r - 1
		}
		return moves;
	}

	moves(board)
	{
		var moves = new Array(64).fill(false);
		var c = this.col - 1;
		var r = this.row + 1;
		//go left down
		while (c >= 0 && r <= 7 && (!board.squareOccupied(c, r) || (board.getPiece(c, r).isWhite != this.isWhite)))
		{
			moves[c + 8 * r] = true;
			if (board.squareOccupied(c, r) && board.getPiece(c, r).isWhite != this.isWhite)
			{
				break;
			}
			c = c - 1;
			r = r + 1;
		}
		c = this.col + 1;
		r = this.row + 1;
		//go right down
		while (c <= 7 && r <= 7 && (!board.squareOccupied(c, r) || (board.getPiece(c, r).isWhite != this.isWhite)))
		{
			moves[c + 8 * r] = true;
			if (board.squareOccupied(c, r) && board.getPiece(c, r).isWhite != this.isWhite)
			{
				break;
			}
			c = c + 1;
			r = r + 1;
		}

		c = this.col + 1;
		r = this.row - 1;
		//go right up
		while (c <= 7 && r >= 0 && (!board.squareOccupied(c, r) || (board.getPiece(c, r).isWhite != this.isWhite)))
		{
			moves[c + 8 * r] = true;
			if (board.squareOccupied(c, r) && board.getPiece(c, r).isWhite != this.isWhite)
			{
				break;
			}
			c = c + 1
			r = r - 1
		}

		c = this.col - 1;
		r = this.row - 1;
		//go up left
		while (c >= 0 && r >= 0 && (!board.squareOccupied(c, r) || (board.getPiece(c, r).isWhite != this.isWhite)))
		{
			moves[c + 8 * r] = true;
			if (board.squareOccupied(c, r) && board.getPiece(c, r).isWhite != this.isWhite)
			{
				break;
			}
			c = c - 1
			r = r - 1
		}
		return moves;
	}
}

class Knight extends Piece
{
	constructor(col, row, isWhite, img)
	{
		super(col, row, isWhite, "Knight", img);
		this.letter = "N";
	}

	attacks(board)
	{
		var moves = new Array(64).fill(false);
		var colArray = [1,1,2,2,-1,-1,-2,-2]
		var rowArray = [2,-2,1,-1,2,-2,1,-1]
		var c = 0;
		var r = 0;
		for (var i = 0; i < 8; i++)
		{
			c = this.col + colArray[i]
			r = this.row + rowArray[i] 
			if (c >= 0 && c <= 7 && r >= 0 && r <= 7)
			{
				moves[c + 8 * r] = true;
			}
		}
		return moves;
	}

	moves(board)
	{
		var moves = new Array(64).fill(false);
		var colArray = [1,1,2,2,-1,-1,-2,-2]
		var rowArray = [2,-2,1,-1,2,-2,1,-1]
		var c = 0;
		var r = 0;
		for (var i = 0; i < 8; i++)
		{
			c = this.col + colArray[i]
			r = this.row + rowArray[i] 
			if (c >= 0 && c <= 7 && r >= 0 && r <= 7 && (!board.squareOccupied(c, r) || (board.getPiece(c, r).isWhite != this.isWhite)))
			{
				moves[c + 8 * r] = true;
			}
		}
		return moves;
	}
}

class Pawn extends Piece
{
	constructor(col,row,isWhite, img)
	{
		super(col, row, isWhite, "Pawn", img);
		this.letter = "P";
	}

	attacks(board)
	{
		var moves = new Array(64).fill(false);
		var direction = 1;
		if (this.isWhite)
		{
			direction = -1;
		}
		var c = this.col - 1;
		var r = this.row + direction;
		if (c >= 0 && c <= 7 && r >= 0 && r <= 7)
		{
			moves[c + 8 * r] = true;
		}
		c = this.col + 1;
		r = this.row + direction;
		if (c >= 0 && c <= 7 && r >= 0 && r <= 7)
		{
			moves[c + 8 * r] = true;
		}
		return moves;
	}

	moves(board)
	{
		var moves = new Array(64).fill(false);
		var direction = 1;
		if (this.isWhite)
		{
			direction = -1;
		}
		var c = this.col;
		var r = this.row + direction;
		if (r >= 0 && r <= 7 && !board.squareOccupied(c, r))
		{
			moves[c + 8 * r] = true;
		}
		c = this.col;
		r = this.row + direction * 2;
		if (this.hasNotMoved && r >= 0 && r <= 7 && !board.squareOccupied(c, r))
		{
			moves[c + 8 * r] = true;
		}
		c = this.col - 1;
		r = this.row + direction;
		if (c >= 0 && c <= 7 && r >= 0 && r <= 7 && board.squareOccupied(c, r) && (board.getPiece(c, r).isWhite != this.isWhite))
		{
			moves[c + 8 * r] = true;
		}
		c = this.col + 1;
		r = this.row + direction;
		if (c >= 0 && c <= 7 && r >= 0 && r <= 7 && board.squareOccupied(c, r) && (board.getPiece(c, r).isWhite != this.isWhite))
		{
			moves[c + 8 * r] = true;
		}
		return moves;
	}
}