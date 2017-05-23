const ReactDataGrid = require('react-data-grid');
const exampleWrapper = require('../components/exampleWrapper');
const React = require('react');

const Example = React.createClass({
  getInitialState() {
    this.createRows();
    this._columns = [
      { key: 'id', name: 'ID' , sortable: true},
      { key: 'title', name: 'Title' , sortable: true},
      { key: 'count', name: ['one','two','three','four'], sortable: true} ];

    return null;
  },



  createRows() {
    let rows = [];
    for (let i = 1; i < 1000; i++) {
      rows.push({
        id: i,
        title: 'Title ' + i,
        count: i * 1000
      });
    }

    this._rows = rows;
  },

  rowGetter(i) {
    return this._rows[i];
  },

  render() {
    return  (
      <ReactDataGrid
        onGridSort={this.handleGridSort}
        columns={this._columns}
        rowGetter={this.rowGetter}
        rowsCount={this._rows.length}
        // headerRowHeight={123}
        minHeight={500} />);
  },


  handleGridSort(sortColumn, sortDirection) {

    var col = this._columns.find(function(item) {
      return item.key === sortColumn
    });


    var comparer;

    comparer = (a, b) => {
      if (sortDirection === 'ASC') {
        return (a[sortColumn] > b[sortColumn]) ? 1 : -1;
      } else if (sortDirection === 'DESC') {
        return (a[sortColumn] < b[sortColumn]) ? 1 : -1;
      }
    };


    const rows = sortDirection === 'NONE' ? this.state.originalRows.slice(0) : this.state.rows.sort(comparer);

    this.setState({rows});
  }
});

module.exports = exampleWrapper({
  WrappedComponent: Example,
  exampleName: 'Multiline header',
  exampleDescription: 'A display only grid.',
  examplePath: './scripts/example30-multilineheader.js',
  examplePlaygroundLink: 'https://jsfiddle.net/f6mbnb8z/1/'
});
