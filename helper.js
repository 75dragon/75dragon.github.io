var randomlinks = [];
randomlinks[0]="./Vast.html";
randomlinks[1]="./YoutubeDownload.html";
randomlinks[2]="./TiltArena.html";
randomlinks[3]="./Shakespeare.html";

function randomlink(){
  window.location = randomlinks[Math.floor(Math.random()*randomlinks.length)];
}
