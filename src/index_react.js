class ListWithLinks extends React.Component {
  render() {
    const listData = this.props.data;
    const listItems = listData.map((listData) =>
    <li key={listData.id}><a href={listData.link}>{listData.text}</a></li>
    );
    return (
      <ul >{listItems}</ul>
    );
  }
}

class DropdownTrigger extends React.Component {

}

class Navbar extends React.Component {
  render() {
    
  }
}

const ListWithProjectData = [
  {id:0, link:"./Vast.html", text:"Vast"},
  {id:1, link:"https://75dragon.github.io", text:"Website"},
  {id:2, link:"./YoutubeDownload.html", text:"Youtube playlist to MP3"},
  {id:3, link:"./TiltArena.html", text:"Tilt Arena"},
  {id:4, link:"./tilt/GamePage.html", text:"Play Tilt Arena"},
  {id:5, link:"./Shakespeare.html", text:"Shakespeare Text Generator"}
];

const ListWithLinkData = [
  {id:10, link:"https://github.com/75dragon/", text:"GitHub"},
  {id:11, link:"https://www.linkedin.com/in/ache75/", text:"Linkedin"}
]

ReactDOM.render(
  <ListWithLinks data={test} />,
  document.getElementById('test')
);
