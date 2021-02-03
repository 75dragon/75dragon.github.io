var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ListWithLinks = function (_React$Component) {
  _inherits(ListWithLinks, _React$Component);

  function ListWithLinks() {
    _classCallCheck(this, ListWithLinks);

    return _possibleConstructorReturn(this, (ListWithLinks.__proto__ || Object.getPrototypeOf(ListWithLinks)).apply(this, arguments));
  }

  _createClass(ListWithLinks, [{
    key: "render",
    value: function render() {
      var listData = this.props.data;
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
        null,
        listItems
      );
    }
  }]);

  return ListWithLinks;
}(React.Component);

var DropdownTrigger = function (_React$Component2) {
  _inherits(DropdownTrigger, _React$Component2);

  function DropdownTrigger() {
    _classCallCheck(this, DropdownTrigger);

    return _possibleConstructorReturn(this, (DropdownTrigger.__proto__ || Object.getPrototypeOf(DropdownTrigger)).apply(this, arguments));
  }

  return DropdownTrigger;
}(React.Component);

var Navbar = function (_React$Component3) {
  _inherits(Navbar, _React$Component3);

  function Navbar() {
    _classCallCheck(this, Navbar);

    return _possibleConstructorReturn(this, (Navbar.__proto__ || Object.getPrototypeOf(Navbar)).apply(this, arguments));
  }

  _createClass(Navbar, [{
    key: "render",
    value: function render() {}
  }]);

  return Navbar;
}(React.Component);

var ListWithProjectData = [{ id: 0, link: "./Vast.html", text: "Vast" }, { id: 1, link: "https://75dragon.github.io", text: "Website" }, { id: 2, link: "./YoutubeDownload.html", text: "Youtube playlist to MP3" }, { id: 3, link: "./TiltArena.html", text: "Tilt Arena" }, { id: 4, link: "./tilt/GamePage.html", text: "Play Tilt Arena" }, { id: 5, link: "./Shakespeare.html", text: "Shakespeare Text Generator" }];

var ListWithLinkData = [{ id: 10, link: "https://github.com/75dragon/", text: "GitHub" }, { id: 11, link: "https://www.linkedin.com/in/ache75/", text: "Linkedin" }];

ReactDOM.render(React.createElement(ListWithLinks, { data: test }), document.getElementById('test'));