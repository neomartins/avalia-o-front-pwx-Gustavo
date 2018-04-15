import React from "react"
import BaseComponent from '../BaseComponent';
import TableRowPerson from  './TableRowPerson';
import LoadingPage from '../../utils/LoadingPage';
import Snackbar from 'material-ui/Snackbar';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as personAction from '../../actions/personActions';

import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
} from 'material-ui/Table';

class PersonOverview extends BaseComponent {

constructor(props) {
    super(props)
    this.state = {
     person : [],
     fixedHeader: true,
      fixedFooter: true,
      stripedRows: false,
      showRowHover: false,
      selpersonectable: true,
      multiSelectable: false,
      enableSelectAll: false,
      deselectOnClickaway: true,
      showCheckboxes: false,
      height: '300px',
      load: true,
      openSnack: false,
    };
    this._bind('renderViewPerson', 'deletePerson', 'handleCloseSnack');
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.person !== undefined && !nextProps.person.userFail) {
        this.setState({person : nextProps.person.person, load: false});
      }
  }

  renderViewPerson() {
    let componentsResult = [];
      if(this.state.person !== undefined && this.state.person.length > 0){
          this.state.person.map((item) =>{
             var component = <TableRowPerson personList = {this.state.person} person={item} key={item.id} deletePerson=
             {this.deletePerson}/>
                return componentsResult.push(component); 
          });            
      }
        return componentsResult;   
    }

  deletePerson(personId) {
    
  }
  handleCloseSnack(){
    let self = this;
    self.setState({openSnack : false});
  }
  render() {
    return (
      <div>
        <Table
          height={this.state.height}
          fixedHeader={this.state.fixedHeader}
          fixedFooter={this.state.fixedFooter}
          selectable={this.state.selectable}
          multiSelectable={this.state.multiSelectable}
          bodyStyle={{overflow:'visible'}}
        >
          <TableHeader
            displaySelectAll={this.state.showCheckboxes}
            adjustForCheckbox={this.state.showCheckboxes}
            enableSelectAll={this.state.enableSelectAll}
          >
            <TableRow>
              <TableHeaderColumn style={{width: '10px'}}tooltip="Id">ID</TableHeaderColumn>
              <TableHeaderColumn style={{width: '100px'}} tooltip="Name">Name</TableHeaderColumn>
              <TableHeaderColumn tooltip="Last Name">Last Name</TableHeaderColumn>
              <TableHeaderColumn tooltip="Email">Email</TableHeaderColumn>
              <TableHeaderColumn style={{width: '100px'}} tooltip="CPF">CPF</TableHeaderColumn>
              <TableHeaderColumn style={{width: '100px'}} tooltip="Date of birth">Date of birth</TableHeaderColumn>
              <TableHeaderColumn ></TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody 
            displayRowCheckbox={this.state.showCheckboxes}
            deselectOnClickaway={this.state.deselectOnClickaway}
            showRowHover={this.state.showRowHover}
            stripedRows={this.state.stripedRows}
          >
         {this.renderViewPerson()}
          </TableBody>
        </Table>
         <div>
          <LoadingPage isLoading={this.state.load}/>
        </div>
        <Snackbar open={this.state.openSnack} message={'Person successful deleted'} autoHideDuration={2000} onRequestClose={this.handleCloseSnack}/>
      </div>
    )
  }
}
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(personAction, dispatch),
    };
}

export default connect(null, mapDispatchToProps)(PersonOverview);