const ReactDataGrid = require('react-data-grid');
const exampleWrapper = require('../components/exampleWrapper');
const React = require('react');

/**
 * Aim of this is to have a number of columns fixed on the left side
 */


// Custom Formatter component
const PercentCompleteFormatter = React.createClass({
  propTypes: {
    value: React.PropTypes.number.isRequired
  },

  render() {
    return <div style={{margin: '0px', padding: '7px', background:'#f9f9f9', fontWeight: 'bold'}}>{this.props.value}</div>
  }
});

const RowRenderer = React.createClass({
  propTypes: {
    idx: React.PropTypes.string.isRequired
  },

  setScrollLeft(scrollBy) {
    // if you want freeze columns to work, you need to make sure you implement this as apass through
    this.row.setScrollLeft(scrollBy);
  },

  getRowStyle() {
    return {
      color: this.getRowBackground()
    };
  },

  getRowBackground() {
    return this.props.idx % 2 ?  'green' : 'blue';
  },

  render: function() {
    // here we are just changing the style
    // but we could replace this with anything we liked, cards, images, etc
    // usually though it will just be a matter of wrapping a div, and then calling back through to the grid
    return (<div style={this.getRowStyle()}><Row ref={ node => this.row = node } {...this.props}/></div>);
  }
});



const Example = React.createClass({
  getInitialState() {
    this.createRows();
    this._columns = [
      { key: 'id', name: 'fixme 1' , sortable: true, locked:true, width: 100, formatter: PercentCompleteFormatter},
      { key: 'id2', name: 'fixme 2' , sortable: true, locked:true, width:100, formatter: PercentCompleteFormatter},
      { key: 'title1', name: 'Title1' , sortable: true, width:123},
      { key: 'title2', name: 'Title2' , sortable: true, width:123},
      { key: 'title3', name: 'Title3' , sortable: true, width:123},
      { key: 'title4', name: 'Title4' , sortable: true, width:123},
      { key: 'title5', name: 'Title5' , sortable: true, width:123},
      { key: 'title6', name: 'Title6' , sortable: true, width:123},
      { key: 'title7', name: 'Title7' , sortable: true, width:123},
      { key: 'count', name: ['one'], sortable: true, width:123} ];

    return null;
  },



  createRows() {
    let rows = [];
    for (let i = 1; i < 1000; i++) {
      rows.push({
        id: i,
        id2: 'ABC',
        title1: 'Title ' + i,
        title2: 'Title ' + i,
        title3: 'Title ' + i,
        title4: 'Title ' + i,
        title5: 'Title ' + i,
        title6: 'Title ' + i,
        title7: 'Title ' + i,
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
