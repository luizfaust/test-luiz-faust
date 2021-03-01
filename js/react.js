class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { minutos: 0, segundos: 0, milisegundos: 0, isToggleOn: false};
    // This binding is necessary to make `this` work in the callback
    this.playClick = this.playClick.bind(this);
    this.stopClick = this.stopClick.bind(this);
  }

  tick() {
    if(this.state.isToggleOn){
      this.setState(state => ({ milisegundos: state.milisegundos + 1 }));
      if(this.state.milisegundos == 100){
        this.setState(state => ({ milisegundos: state.milisegundos - 100 }));
        this.setState(state => ({ segundos: state.segundos + 1 }));
        if(this.state.segundos == 60){
          this.setState(state => ({ segundos: state.segundos - 60 }));
          this.setState(state => ({ minutos: state.minutos + 1 }));
        }
      }
    }
  }

  componentDidMount() {
    this.interval = setInterval(() => this.tick(), 10);
  }

  playClick() {
    this.setState(state => ({ isToggleOn: !state.isToggleOn }));
  }

  stopClick() {
    this.setState(state => ({ isToggleOn: false }));
    this.setState(state => ({ milisegundos: 0 }));
    this.setState(state => ({ segundos: 0 }));
    this.setState(state => ({ minutos: 0 }));
  }

  render() {
    return (
      <div>
        <div class="m-1">
          {this.state.minutos.toLocaleString(undefined, {minimumIntegerDigits:2})}:
          {this.state.segundos.toLocaleString(undefined, {minimumIntegerDigits:2})}:
          {this.state.milisegundos.toLocaleString(undefined, {minimumIntegerDigits:2})}
        </div>
        <div class="m-1">
          <a class="m-1" onClick={this.playClick}>
            {this.state.isToggleOn ? <i class="mx-1 far fa-pause-circle"></i> : <i class="mx-1 far fa-play-circle"></i>}
          </a>
          <a class="m-1" onClick={this.stopClick}>
            <i class="mx-1 far fa-stop-circle"></i>
          </a>
        </div>
      </div>
    );
  }

//  render() {
//    return React.createElement(
//      'div',
//      null,
//      '',
//      this.state.minutos.toLocaleString(undefined, {minimumIntegerDigits: 2}),
//      ':',
//      this.state.segundos.toLocaleString(undefined, {minimumIntegerDigits: 2}),
//      ':',
//      this.state.milisegundos.toLocaleString(undefined, {minimumIntegerDigits: 2})
//    );
//  }

}

ReactDOM.render(
  <Timer />,
  document.getElementById('timer')
);
