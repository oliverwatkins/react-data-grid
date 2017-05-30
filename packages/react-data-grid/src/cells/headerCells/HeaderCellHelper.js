const React              = require('react');

function convertHeaderText(column): string {

  let headerText;

  //if array then stack them as a list
  if (column.name instanceof Array) {
    headerText = <div >
      { column.name.map(item => <div style={{height:30}}>{item}</div>) }
    </div>;
  }else {
    headerText = column.name;
  }

  return headerText;
}

module.exports = { convertHeaderText};