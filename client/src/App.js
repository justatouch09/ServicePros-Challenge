import React, { Component } from 'react';
import './App.css';
import axios from 'axios'
import Table from 'antd/lib/table';
import 'antd/dist/antd.css';
//import $ from 'jquery';
//import BookRow from './BookRow.js';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      books: null
    }

    this.performSearch()
    //this.
  }

  // npm install axios --save
  performSearch = () => {
    axios({
      url: 'http://localhost:5555/books',
      method: 'GET',
      mode: 'no-cors'
    })
    .then(response => {
      this.setState((prevState) => {
        return {
          ...prevState,
          books: response.data
        }
      })
    })
    .catch(err => {
      console.log(err)
    })
  }

  render() {

    const { books } = this.state

    if (!books) {
      return <div />
    }

    const columns = [{
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      sorter: (a, b) => a.title < b.title ? -1 : a.title > b.title ? 1 : 0,
      

     // defaultSortOrder: 'ascend',
      //expandRowByClick: 'true'
      //align: 'center'
    }, {
      title: 'Author',
      dataIndex: 'author',
      key: 'author',
      sorter: (a, b) => a.author < b.author ? -1 : a.author > b.author ? 1 : 0    

    }, {
      title: 'Year',
      dataIndex: 'year',
      key: 'year',
      sorter: (a, b) => a.year < b.year ? -1 : a.year > b.year ? 1 : 0    

    }, {
      title: 'Isbn',
      dataIndex: 'isbn',
      key: 'isbn',
      sorter: (a, b) => a.isbn < b.isbn ? -1 : a.isbn > b.isbn ? 1 : 0    
    }];
    

    return (
      <div style={{display: "flux"}}>
      <div style={{width: 1200, margin:"auto"}}>      
      <Table className="birth" dataSource={books} columns={columns} />
      </div>
      </div>

    )
  }
}
     
export default App;
