import React, { Component } from 'react';
import './App.css';
import axios from 'axios'
import 'antd/dist/antd.css';
import { Table, Input, Button, Icon } from 'antd';

class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      filterDropdownVisible: false,
      books: null,
      searchText: '',
      filtered: false
    }

    this.loadBooks = this.loadBooks.bind(this)
  }

  componentDidMount () {
    this.loadBooks()
  }

  loadBooks() {
    axios({
      url: 'http://localhost:5555/books',
      method: 'GET'
    })
    .then((response) => {
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

  onInputChange = (e) => {
    this.setState({searchText: e.target.value})
  }

  onSearch = () => {
    const { searchText, books } = this.state;

    if (books) {
      this.setState({
        filterDropdownVisible: false,
        filtered: !!searchText
      });
    }
  }

  render() {
    const { books, filtered, filterDropdownVisible, searchText } = this.state

    if (!books) {
      return <div />
    }

    const reg = new RegExp(searchText, 'gi');
    const tableData = books.map((record) => {
      const match = record.title.match(reg);
      return !match ? null : record
    }).filter(record => !!record)

    const columns = [
      {
        title: 'Title',
        dataIndex: 'title',
        key: 'title',
        sorter: (a, b) => a.title < b.title ? -1 : a.title > b.title ? 1 : 0,
        filterDropdown: (
          <div className="custom-filter-dropdown">
            <Input
              ref={ele => this.searchInput = ele}
              placeholder="Search Title"
              value={searchText}
              onChange={this.onInputChange}
              onPressEnter={this.onSearch}
            />
            <Button type="primary" onClick={this.onSearch}>Search</Button>
          </div>
        ),
        filterIcon: <Icon type="search" style={{ color: filtered ? '#108ee9' : '#aaa' }} />,
        filterDropdownVisible: filterDropdownVisible,
        onFilterDropdownVisibleChange: (visible) => {
          this.setState({
            filterDropdownVisible: visible,
          }, () => this.searchInput.focus());
        }
      },
      {
        title: 'Author',
        dataIndex: 'author',
        key: 'author',
        sorter: (a, b) => a.author < b.author ? -1 : a.author > b.author ? 1 : 0   
      },
      {
        title: 'Year',
        dataIndex: 'year',
        key: 'year',
        sorter: (a, b) => a.year < b.year ? -1 : a.year > b.year ? 1 : 0
      },
      {
        title: 'Isbn',
        dataIndex: 'isbn',
        key: 'isbn',
        sorter: (a, b) => a.isbn < b.isbn ? -1 : a.isbn > b.isbn ? 1 : 0
      }
    ];
    
    return (
      <div>
        <div style={{width: 1200, margin:"auto"}}>
          <Table className="table-source" columns={columns} dataSource={tableData} />
        </div>
      </div>
    )
  }
}
     
export default App;
