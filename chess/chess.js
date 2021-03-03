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

var heldPiece = null;

function mouseDown( event )
{
	console.log(event.pageX + " " + event.pageY);
	clickCol = Math.floor(event.pageX / tilesize);
	clickRow = Math.floor(event.pageY / tilesize);
	console.log(clickCol + " " + clickRow)
	if (board.squareOccupied(clickCol, clickRow ))
	{
		heldPiece = board.getPiece(clickCol, clickRow)
		heldPiece.pixelCol = event.pageX;
		heldPiece.pixelRow = event.pageY;
		heldPiece.moving = true;
		console.log("Piece clicked")
		dragging = true;
	}
}

function mouseMove( event )
{
	if (dragging)
	{
		//console.log(event.pageX + " " + event.pageY);
		heldPiece.pixelCol = event.pageX;
		heldPiece.pixelRow = event.pageY;
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
		board.movePiece(heldPiece, clickCol, clickRow)
		heldPiece.moving = false;
		heldPiece = null;
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