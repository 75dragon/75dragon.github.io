function ListWithLinks(props) {
  const listData = props.data;
  const listItems = listData.map((listData) =>
  <li key={listData.id}>
    <a href={listData.link}>
      {listData.text}
    </a>
  </li>
  );
  return (
    <ul>{listItems}</ul>
  );
}

const ListWithLinkData = [
  {id:0, link:"./Vast.html", text:"Vast"},
  {id:1, link:"https://75dragon.github.io", text:"Website"},
  {id:2, link:"./YoutubeDownload.html", text:"Youtube playlist to MP3"},
  {id:3, link:"./TiltArena.html", text:"Tilt Arena"},
  {id:4, link:"./tilt/GamePage.html", text:"Play Tilt Arena"},
  {id:5, link:"./Shakespeare.html", text:"Shakespeare Text Generator"}
];
ReactDOM.render(
  <ListWithLinks data={ListWithLinkData} />,
  document.getElementById('root')
);

class dropdownProjects extends React.Component {
  render() {
    return (
      <ul id='dropdownProject' class='dropdown-content'>
        <li><a href="./Vast.html">Vast</a></li>
        <li><a href="https://75dragon.github.io">Website</a></li>
        <li><a href="./YoutubeDownload.html">Youtube playlist to MP3</a></li>
        <li><a href="./TiltArena.html">Tilt Arena</a></li>
        <li><a href="./tilt/GamePage.html">Play Tilt Arena</a></li>
        <li><a href="./Shakespeare.html">Shakespeare Text Generator</a></li>
      </ul>
    );
  }
}

class dropdownLinks extends React.Component {
  render() {
    return (
      <ul id="dropdownLink" class="dropdown-content">
        <li><a href="https://github.com/75dragon/">GitHub</a></li>
        <li><a href="https://www.linkedin.com/in/ache75/">Linkedin</a></li>
      </ul>
    );
  }
}

class navBar extends React.Component {
  render() {
    return (
      <nav class="black" role="navigation">
        <div class="nav-wrapper container">
          <a id="logo-container" href="./index.html" class="brand-logo" style="color:white">Home</a>
          <ul class="right">
            <li>
              <a class="dropdown-trigger" href="#!" data-target="dropdownLink" style="color:white">Links
                <i class="material-icons right">arrow_drop_down</i>
              </a>
            </li>
            <li>
              <a class="dropdown-trigger" href="#!" data-target="dropdownStar" style="color:white">Projects
                <i class="material-icons right">arrow_drop_down</i>
              </a>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

class parallaxContainer extends React.Component {
  render() {
    return (
      <div id="index-banner" class="parallax-container">
        <div class="section no-pad-bot">
          <div class="container">
            <br><br>
            <h1 class="header center teal-text text-lighten-2">Shakespeare Text Generator</h1>
            <div class="row center">
              <h5 class="header col s12 light" style="color:purple;">A machine learning python project that generates text based of Shakespeare's plays!</h5>
            </div>
            <div class="row center">
              <a href="https://github.com/75dragon/ShakespeareTextGenerator" id="GitHub-link" class="btn-large waves-effect waves-light teal lighten-1">GitHub Repository</a>
            </div>
            <br><br>
          </div>
        </div>
        <div class="parallax"><img src="images/mini2.jpg" alt="Unsplashed background img 1"></div>
      </div>
    );
  }
}

class carouselContainer extends React.Component {
  render() {
    return (
      <div class="container">
        <div class="section">
          <div class="carousel carousel-slider center">
            <div class="carousel-item red white-text">
              <img src="./images/Shake/shake.png">
            </div>
          </div>
        </div>
        <div class="section">
          Built when I was curious about machine learning text generation, taught me the basics of Keras and LSTM.<br>
          Built With: <br>
          -Python (Keras, Pickle, Numpy, Pandas), Anaconda (environment). <br>
          Concepts: <br>
          -Data cleaning, padding, and tokenizing. <br>
          -LSTM model, Adam loss function, 40% dropout to prevent overfitting. <br>
          -Trained for 45 epochs, 4 hours overnight, loss dropped to 1/3 of the original value.<br>
          Goals!<br>
          -Allow website users to use the bot. (Model, Tokenizer, and Script already saved in GitHub. Need to find a way to host)
        </div>
      </div>
    );
  }
}


class pageFooter extends React.Component {
  render() {
    return (
      <footer class="page-footer cyan">
        <div class="container">
          <div class="row">
            <div class="col l6 s12">
              <h5 class="white-text">About me</h5>
              <p class="grey-text text-lighten-4">UCSC CS Major with a passion for chess, archery, algorithms, and projects. Lets work together!</p>
            </div>
            <div class="col l3 s12">
              <h5 class="white-text">Connect</h5>
              <ul>
                <li><a class="link" style="color:pink;" href="https://github.com/75dragon/">Github</a></li>
                <li><a class="link" style="color:pink;" href="https://www.linkedin.com/in/ache75/">Facebook</a></li>
                <li><a class="white-text">email me at: austinbicheng@gmail.com</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div class="footer-copyright">
          <div class="container">
            Made with <a class="brown-text text-lighten-3" href="http://materializecss.com">Materialize</a>
          </div>
        </div>
      </footer>
    );
  }
}


  <!--  Scripts-->
  <script src="https://code.jquery.com/jquery-2.1.1.min.js"></script>
  <script src="js/materialize.js"></script>
  <script src="js/init.js"></script>

</body>

</html>
