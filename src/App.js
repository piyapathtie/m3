import React, { Component } from 'react';
// import './App.css';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
// import axios from './AxiosConfiguration';
import axios from "axios";

var instanceA = axios.create({
    baseURL: 'http://localhost:8080',
    withCredentials: true
})

var instanceB = axios.create({
    baseURL: 'http://localhost:5000',
    // withCredentials: true
})

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bucketname: '',
      showInBucket: false,
        data: [],
        allvid: [],
    };
  }



  handleClick = (bucketname, input) => {
      console.log(input)
      instanceB.post('/factor', {bucketname:bucketname, objectname:input, targetbucket:bucketname, targetobject:input+"gif"})
          .then((response) => {
              console.log(response.data)
          })
          .catch((error) => {
              console.log(error)
          })

      // input.map((each)=> console.log(each.name))
      // this.setState({allvid: input}, () => console.log(this.state.allvid))
  }


    componentDidMount(){
        instanceA.get("/all")
            .then((response) => {
                console.log(response.data)
                this.setState({data: response.data})
            })
            .catch((error) => {
                console.log(error)
            })
    }

    handleDelete = (bucketname, input) =>{
        console.log("delete "+ input)
        instanceA.delete(`/${bucketname}/${input}?delete`)
            .then((response) => {
                console.log(response.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    handleDeleteAllGif = (bucketname) =>{
        console.log("delete all gif")
        instanceA.delete(`/${bucketname}?deleteAllGif`)
            .then((response) => {
                console.log(response.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }


  render() {
    return (
      <div>

          <p>All Bucket</p>

          <table className="table">
              <tbody>
              {this.state.data.map((each) => {
                  return (
                      <tr key={each.name}>
                          <tr>
                              <td>
                                  <b>Bucket Name: {each.name}</b>
                                  <button type="button" onClick={()=>this.handleDeleteAllGif(each.name)}>Delete All Gif</button>
                              </td>
                          </tr>
                          {each.objectFileSet.map((elt)=> {
                              return (
                                  <tr key={elt.name}>
                                      {elt.extension === "mp4" &&
                                          <div>
                                                  {elt.name}
                                                  <button type="button" onClick={() => this.handleClick(each.name, elt.name)}>Make Gif</button>

                                          </div>
                                      }
                                  </tr>
                              );
                          })}
                          {each.objectFileSet.map((elt)=> {
                              return (
                                  <div>
                                      {elt.extension === "gif" &&

                                              <div style={{display:"flex"}}>
                                                  <img src={`http://localhost:8080/${each.name}/${elt.name}`}/>
                                                  <button type="button" onClick={() => this.handleDelete(each.name, elt.name)}>Delete Gif</button>
                                              </div>
                                      }
                                  </div>
                              );
                          })}

                      </tr>
                  );
              })}
              </tbody>

          </table>

          {/*{this.state.data.map((each) => {*/}

              {/*return(*/}
                  {/*<div>*/}
                      {/*<p onClick={() => this.handleClick(each.objectFileSet)}>*/}
                          {/*{each.name}*/}
                      {/*</p>*/}
                      {/*/!*<p>*!/*/}
                          {/*/!*{this.state.allvid[0]}*!/*/}
                      {/*/!*</p>*!/*/}
                          {/*/!*{each.objectFileSet.map((elt) => {*!/*/}
                              {/*/!*return(*!/*/}
                                  {/*/!*<div>*!/*/}
                                      {/*/!*<p>*!/*/}
                                          {/*/!*{elt}*!/*/}
                                      {/*/!*</p>*!/*/}
                                  {/*/!*</div>*!/*/}
                              {/*/!*)*!/*/}
                          {/*/!*})}*!/*/}
                  {/*</div>*/}
              {/*)*/}
          {/*})*/}
          {/*}*/}



      </div>
    );
  }
}

export default App;
