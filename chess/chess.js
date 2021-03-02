boardsize = 800;
tilesize = boardsize / 8;
var board;
canvas = document.getElementById('myCanvas');
ctx = canvas.getContext("2d");
dragging = false;
images = [];

function setSize()
{
	canvas.width = boardsize;
	canvas.height = boardsize;
}
function drawBoard()
{
	ctx.fillStyle = "white";
	ctx.fillRect(0, 0, 800, 800);
	ctx.fillStyle = "brown";
	for (var row = 0; row < 8; row++)
	{
		for (var col = 0; col < 8; col++)
		{
			if ( (row + col) % 2 != 0 )
			{
				ctx.fillRect(row * 100, col * 100, 100, 100);
			}
		}
	}
	board.draw(ctx)
}

function squareOccupied(col, row)
{
	return board.boardState[col + row * 8];
}

function getPeice(col, row)
{
	for (var i = 0; i < board.whitePieces.length; i++)
	{
		if( board.whitePieces[i].col == col && board.whitePieces[i].row == row )
		{
			return board.whitePieces[i];
		}
	}
	for (var i = 0; i < board.blackPieces.length; i++)
	{
		if( board.blackPieces[i].col == col && board.blackPieces[i].row == row )
		{
			return board.blackPieces[i];
		}
	}
	return;
}

var heldPeice = null;

function mouseDown( event )
{
	console.log(event.pageX + " " + event.pageY);
	clickCol = Math.floor(event.pageX / tilesize);
	clickRow = Math.floor(event.pageY / tilesize);
	console.log(clickCol + " " + clickRow)
	if (squareOccupied(clickCol, clickRow ))
	{
		heldPeice = getPeice(clickCol, clickRow)
		heldPeice.pixelCol = event.pageX;
		heldPeice.pixelRow = event.pageY;
		heldPeice.moving = true;
		console.log("peice clicked")
		dragging = true;
	}
}

function mouseMove( event )
{
	if (dragging)
	{
		//console.log(event.pageX + " " + event.pageY);
		heldPeice.pixelCol = event.pageX;
		heldPeice.pixelRow = event.pageY;
		drawBoard();
	}
}

function mouseUp( event )
{
	if (dragging)
	{
		dragging = false;
		clickCol = Math.floor(event.pageX / tilesize);
		clickRow = Math.floor(event.pageY / tilesize);
		board.movePiece(heldPeice, clickCol, clickRow)
		heldPeice.moving = false;
		heldPeice = null;
	}
	drawBoard();
}

canvas.addEventListener('mousedown', mouseDown, false);
canvas.addEventListener('mousemove', mouseMove, false);
canvas.addEventListener('mouseup', mouseUp, false);

function main()
{
	board = new Board()
	setSize()
	drawBoard()
}

main()