var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function ListWithLinks(props) {
  var listData = props.data;
  var listItems = listData.map(function (listData) {
    return React.createElement(
      "li",
      { key: listData.id },
      React.createElement(
        "a",
        { href: listData.link },
        listData.text
      )
    );
  });
  return React.createElement(
    "ul",
    { id: "dropdownLink", "class": "dropdown-content" },
    listItems
  );
}

var ListWithProjectData = [{ id: 0, link: "./Vast.html", text: "Vast" }, { id: 1, link: "https://75dragon.github.io", text: "Website" }, { id: 2, link: "./YoutubeDownload.html", text: "Youtube playlist to MP3" }, { id: 3, link: "./TiltArena.html", text: "Tilt Arena" }, { id: 4, link: "./tilt/GamePage.html", text: "Play Tilt Arena" }, { id: 5, link: "./Shakespeare.html", text: "Shakespeare Text Generator" }];

var ListWithLinkData = [{ id: 10, link: "https://github.com/75dragon/", text: "GitHub" }, { id: 11, link: "https://www.linkedin.com/in/ache75/", text: "Linkedin" }];

ReactDOM.render(React.createElement(ListWithLinks, { data: ListWithProjectData }), document.getElementById('root'));

var dropdownProjects = function (_React$Component) {
  _inherits(dropdownProjects, _React$Component);

  function dropdownProjects() {
    _classCallCheck(this, dropdownProjects);

    return _possibleConstructorReturn(this, (dropdownProjects.__proto__ || Object.getPrototypeOf(dropdownProjects)).apply(this, arguments));
  }

  _createClass(dropdownProjects, [{
    key: "render",
    value: function render() {
      return React.createElement(
        "ul",
        { id: "dropdownProject", "class": "dropdown-content" },
        React.createElement(
          "li",
          null,
          React.createElement(
            "a",
            { href: "./Vast.html" },
            "Vast"
          )
        ),
        React.createElement(
          "li",
          null,
          React.createElement(
            "a",
            { href: "https://75dragon.github.io" },
            "Website"
          )
        ),
        React.createElement(
          "li",
          null,
          React.createElement(
            "a",
            { href: "./YoutubeDownload.html" },
            "Youtube playlist to MP3"
          )
        ),
        React.createElement(
          "li",
          null,
          React.createElement(
            "a",
            { href: "./TiltArena.html" },
            "Tilt Arena"
          )
        ),
        React.createElement(
          "li",
          null,
          React.createElement(
            "a",
            { href: "./tilt/GamePage.html" },
            "Play Tilt Arena"
          )
        ),
        React.createElement(
          "li",
          null,
          React.createElement(
            "a",
            { href: "./Shakespeare.html" },
            "Shakespeare Text Generator"
          )
        )
      );
    }
  }]);

  return dropdownProjects;
}(React.Component);

var dropdownLinks = function (_React$Component2) {
  _inherits(dropdownLinks, _React$Component2);

  function dropdownLinks() {
    _classCallCheck(this, dropdownLinks);

    return _possibleConstructorReturn(this, (dropdownLinks.__proto__ || Object.getPrototypeOf(dropdownLinks)).apply(this, arguments));
  }

  _createClass(dropdownLinks, [{
    key: "render",
    value: function render() {
      return React.createElement(
        "ul",
        { id: "dropdownLink", "class": "dropdown-content" },
        React.createElement(
          "li",
          null,
          React.createElement(
            "a",
            { href: "https://github.com/75dragon/" },
            "GitHub"
          )
        ),
        React.createElement(
          "li",
          null,
          React.createElement(
            "a",
            { href: "https://www.linkedin.com/in/ache75/" },
            "Linkedin"
          )
        )
      );
    }
  }]);

  return dropdownLinks;
}(React.Component);

var navBar = function (_React$Component3) {
  _inherits(navBar, _React$Component3);

  function navBar() {
    _classCallCheck(this, navBar);

    return _possibleConstructorReturn(this, (navBar.__proto__ || Object.getPrototypeOf(navBar)).apply(this, arguments));
  }

  _createClass(navBar, [{
    key: "render",
    value: function render() {
      return React.createElement(
        "nav",
        { "class": "black", role: "navigation" },
        React.createElement(
          "div",
          { "class": "nav-wrapper container" },
          React.createElement(
            "a",
            { id: "logo-container", href: "./index.html", "class": "brand-logo", style: "color:white" },
            "Home"
          ),
          React.createElement(
            "ul",
            { "class": "right" },
            React.createElement(
              "li",
              null,
              React.createElement(
                "a",
                { "class": "dropdown-trigger", href: "#!", "data-target": "dropdownLink", style: "color:white" },
                "Links",
                React.createElement(
                  "i",
                  { "class": "material-icons right" },
                  "arrow_drop_down"
                )
              )
            ),
            React.createElement(
              "li",
              null,
              React.createElement(
                "a",
                { "class": "dropdown-trigger", href: "#!", "data-target": "dropdownStar", style: "color:white" },
                "Projects",
                React.createElement(
                  "i",
                  { "class": "material-icons right" },
                  "arrow_drop_down"
                )
              )
            )
          )
        )
      );
    }
  }]);

  return navBar;
}(React.Component);

var parallaxContainer = function (_React$Component4) {
  _inherits(parallaxContainer, _React$Component4);

  function parallaxContainer() {
    _classCallCheck(this, parallaxContainer);

    return _possibleConstructorReturn(this, (parallaxContainer.__proto__ || Object.getPrototypeOf(parallaxContainer)).apply(this, arguments));
  }

  _createClass(parallaxContainer, [{
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        { id: "index-banner", "class": "parallax-container" },
        React.createElement(
          "div",
          { "class": "section no-pad-bot" },
          React.createElement(
            "div",
            { "class": "container" },
            React.createElement("br", null),
            React.createElement("br", null),
            React.createElement(
              "h1",
              { "class": "header center teal-text text-lighten-2" },
              "Shakespeare Text Generator"
            ),
            React.createElement(
              "div",
              { "class": "row center" },
              React.createElement(
                "h5",
                { "class": "header col s12 light", style: "color:purple;" },
                "A machine learning python project that generates text based of Shakespeare's plays!"
              )
            ),
            React.createElement(
              "div",
              { "class": "row center" },
              React.createElement(
                "a",
                { href: "https://github.com/75dragon/ShakespeareTextGenerator", id: "GitHub-link", "class": "btn-large waves-effect waves-light teal lighten-1" },
                "GitHub Repository"
              )
            ),
            React.createElement("br", null),
            React.createElement("br", null)
          )
        ),
        React.createElement(
          "div",
          { "class": "parallax" },
          React.createElement("img", { src: "images/mini2.jpg", alt: "Unsplashed background img 1" })
        )
      );
    }
  }]);

  return parallaxContainer;
}(React.Component);

var carouselContainer = function (_React$Component5) {
  _inherits(carouselContainer, _React$Component5);

  function carouselContainer() {
    _classCallCheck(this, carouselContainer);

    return _possibleConstructorReturn(this, (carouselContainer.__proto__ || Object.getPrototypeOf(carouselContainer)).apply(this, arguments));
  }

  _createClass(carouselContainer, [{
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        { "class": "container" },
        React.createElement(
          "div",
          { "class": "section" },
          React.createElement(
            "div",
            { "class": "carousel carousel-slider center" },
            React.createElement(
              "div",
              { "class": "carousel-item red white-text" },
              React.createElement("img", { src: "./images/Shake/shake.png" })
            )
          )
        ),
        React.createElement(
          "div",
          { "class": "section" },
          "Built when I was curious about machine learning text generation, taught me the basics of Keras and LSTM.",
          React.createElement("br", null),
          "Built With: ",
          React.createElement("br", null),
          "-Python (Keras, Pickle, Numpy, Pandas), Anaconda (environment). ",
          React.createElement("br", null),
          "Concepts: ",
          React.createElement("br", null),
          "-Data cleaning, padding, and tokenizing. ",
          React.createElement("br", null),
          "-LSTM model, Adam loss function, 40% dropout to prevent overfitting. ",
          React.createElement("br", null),
          "-Trained for 45 epochs, 4 hours overnight, loss dropped to 1/3 of the original value.",
          React.createElement("br", null),
          "Goals!",
          React.createElement("br", null),
          "-Allow website users to use the bot. (Model, Tokenizer, and Script already saved in GitHub. Need to find a way to host)",
          React.createElement("br", null)
        )
      );
    }
  }]);

  return carouselContainer;
}(React.Component);

var pageFooter = function (_React$Component6) {
  _inherits(pageFooter, _React$Component6);

  function pageFooter() {
    _classCallCheck(this, pageFooter);

    return _possibleConstructorReturn(this, (pageFooter.__proto__ || Object.getPrototypeOf(pageFooter)).apply(this, arguments));
  }

  _createClass(pageFooter, [{
    key: "render",
    value: function render() {
      return React.createElement(
        "footer",
        { "class": "page-footer cyan" },
        React.createElement(
          "div",
          { "class": "container" },
          React.createElement(
            "div",
            { "class": "row" },
            React.createElement(
              "div",
              { "class": "col l6 s12" },
              React.createElement(
                "h5",
                { "class": "white-text" },
                "About me"
              ),
              React.createElement(
                "p",
                { "class": "grey-text text-lighten-4" },
                "UCSC CS Major with a passion for chess, archery, algorithms, and projects. Lets work together!"
              )
            ),
            React.createElement(
              "div",
              { "class": "col l3 s12" },
              React.createElement(
                "h5",
                { "class": "white-text" },
                "Connect"
              ),
              React.createElement(
                "ul",
                null,
                React.createElement(
                  "li",
                  null,
                  React.createElement(
                    "a",
                    { "class": "link", style: "color:pink;", href: "https://github.com/75dragon/" },
                    "Github"
                  )
                ),
                React.createElement(
                  "li",
                  null,
                  React.createElement(
                    "a",
                    { "class": "link", style: "color:pink;", href: "https://www.linkedin.com/in/ache75/" },
                    "Facebook"
                  )
                ),
                React.createElement(
                  "li",
                  null,
                  React.createElement(
                    "a",
                    { "class": "white-text" },
                    "email me at: austinbicheng@gmail.com"
                  )
                )
              )
            )
          )
        ),
        React.createElement(
          "div",
          { "class": "footer-copyright" },
          React.createElement(
            "div",
            { "class": "container" },
            "Made with ",
            React.createElement(
              "a",
              { "class": "brown-text text-lighten-3", href: "http://materializecss.com" },
              "Materialize"
            )
          )
        )
      );
    }
  }]);

  return pageFooter;
}(React.Component);

//TODO: put these scripts in html
// <script src="https://code.jquery.com/jquery-2.1.1.min.js"></script>
// <script src="js/materialize.js"></script>
// <script src="js/init.js"></script>