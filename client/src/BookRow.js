import React from 'react'

class BookRow extends React.Component {
    render() {
     return <table key={this.props.book.id}>
     <tbody>
       <tr>
         <td>
           image
          </td>
          <td>
            {this.props.book.title}
            <p>{this.props.book.overview}</p>
          </td>
        </tr>
      </tbody>
      </table>      

    }
}

export default BookRow;