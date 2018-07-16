import React from 'react';
import { Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Segment } from 'semantic-ui-react';

import { actions } from '../../actions/index';

import AccountsList from '../../components/accounts/AccountsList';
import AccountNew from '../../components/accounts/AccountNew';
import AccountShow from '../../components/accounts/AccountShow';
import Loading from '../../components/Loading';

class AccountsPage extends React.Component {
  componentDidMount() {
    this.props.actions.getAccounts();
  }

  render() {
    const { match, error, loading, accounts } = this.props;    

    if (loading) {
      return <Loading />
    }

    return (
      <React.Fragment>
        <main>
          <Segment.Group>
            <Route exact path={`${match.url}`} component={() => <AccountsList accounts={accounts} />} />
            <Route exact path={`${match.url}/new`} component={AccountNew} />
            {/* <Route path={`${match.url}/:movieId`} component={AccountShow} /> */}
          </Segment.Group>
        </main>
      </React.Fragment>
    )
  }
}

function mapStateToProps({ accounts }) {  
  return { 
    accounts: accounts.accounts,
    loading: accounts.loading,
    error: accounts.error
  };
}

function mapDispatchToProps(dispatch) {  
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AccountsPage));