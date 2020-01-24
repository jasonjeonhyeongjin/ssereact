import React, { Component } from 'react';
import ReactTable from 'react-table';
import { getInitialMonitorData } from './DataProvider';
//import Sidemenu from './components/Sidemenu';
import 'react-table/react-table.css';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: getInitialMonitorData(),
      showStore: true
    };

    this.columns = [{
      Header: 'Origin',
      accessor: 'origin'
    }, {
      Header: 'DataType',
      accessor: 'datatype'
    }, {
      Header: 'Arrival',
      accessor: 'arrival'
    }, {
      Header: 'State',
      accessor: 'state'
    }];


    this.eventSource = new EventSource('http://localhost:5000/events');
  }

  componentDidMount() {
    this.eventSource.addEventListener('monitorDataUpdate', (e) => this.updateDataState(JSON.parse(e.data)));
    this.eventSource.addEventListener('monitorDataRemoval', (e) => this.removeData(JSON.parse(e.data)));
    this.eventSource.addEventListener('closedConnection', () => this.stopUpdates());
  }

  updateDataState(dataState) {
    let newData = this.state.data.map((item) => {
      if (item.datatype === dataState.datatype) {
        item.state = dataState.state;
        item.arrival = dataState.arrival;
      }
      return item;
    });

    this.setState(Object.assign({}, {data: newData}));
  }

  removeData(dataInfo) {
    const newData = this.state.data.filter((item) => item.datatype !== dataInfo.datatype);

    this.setState(Object.assign({}, {data: newData}));
  }

  stopUpdates() {
    this.eventSource.close();
  }


  switchDisplay() {

    console.debug('switchDisplay');
    var show = this.state.showStore ? false : true ;
    console.debug('switchDisplay show: ' + show);
    this.setState({ showStore:show } );
  }



  render() {


    return (
      <div className="App">
      {/* <Sidemenu showStore={this.state.showStore} /> */}
 
        <button onClick={() => this.stopUpdates()}>Stop updates</button>
        <button onClick={() => this.switchDisplay()}>switchDisplay</button>
        <ReactTable
          columns={this.columns}
          data={this.state.data}
          
        />
      </div>
    );
  }
}
export default App;

