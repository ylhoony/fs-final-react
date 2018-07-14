import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actions } from '../../actions/index';

import AccountsList from '../../components/accounts/AccountsList';


class AccountsPage extends Component {

  componentDidMount() {
    console.log(this.props.actions);
    this.props.actions.getAccounts();
  }

  render() {
    return (
      <div>
        <p>Accounts Page</p>
        <AccountsList accounts={this.props.accounts} />
        

        {/* <MoviesList movies={movies} />
        <Route path={`${match.url}/:movieId`} component={MovieShow}/>
        <Route exact path={match.url} render={() => (
          <h3>Please select a Movie from the list.</h3>
        )}/> */}

      </div>
    )
  }
}

function mapStateToProps({ accounts }) {  
  return { accounts };
}

function mapDispatchToProps(dispatch) {  
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AccountsPage));