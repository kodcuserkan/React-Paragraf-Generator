import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import Output from './Components/Output'
import Select from './Components/Controls/Select'
import Text from './Components/Controls/Text'

class App extends Component {

  constructor (props) {

    super(props);

    this.state = ({
      paras : 4,
      html : true,
      text : ""
    })

  }


  showHtml (x)  {
    this.setState({
      html : x
    }, this.getSampleText)
  }
  showParas (paras)  {
    this.setState({
      paras : paras
    }, this.getSampleText)
  } 

  componentDidMount() {
    this.getSampleText();
  }
  
  getSampleText(){
    console.log(1);
    
    axios.get('http://hipsterjesus.com/api?paras='+this.state.paras+'&html='+this.state.html)
    .then((response) => {
      this.setState({
        text : response.data.text
      } , function () {
        console.log(this.state);
        
      })
    })
    .catch((err) => console.log(err))
  }

  render() {
    return (
      <div className = "App Container">
        <h1 className="text-center">React Paragraf Generator</h1>
        <hr/>
        <form className="form-inline">
          
          <div className="form-group">
            <label>Paragraf: </label>
            <Text value={this.state.paras} onChange={this.showParas.bind(this)}></Text>
          </div>

          <div className="form-group">
            <label>HTML içersin mi?</label>
            <Select value={this.state.html} onChange={this.showHtml.bind(this)}></Select>
          </div>
        </form>
        <br/><br/>
        <Output value={this.state.text}/>
        
      </div>
    )
  }
}

export default App;