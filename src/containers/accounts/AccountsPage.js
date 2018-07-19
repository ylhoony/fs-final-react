import React from 'react';
import { Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Segment } from 'semantic-ui-react';

import { actions } from '../../actions/index';

import AccountsList from '../../components/accounts/AccountsList';
import AccountNew from '../../components/accounts/AccountNew';
// import AccountShow from '../../components/accounts/AccountShow';

class AccountsPage extends React.Component {

  render() {
    const { match } = this.props;

    return (
      <React.Fragment>
        <main>
          <Segment.Group>
            <Route exact path={`${match.url}`} component={() => <AccountsList />} />
            <Route exact path={`${match.url}/new`} component={() => <AccountNew />} />
            {/* <Route exact path={`${match.url}/:accountId`} component={() => <AccountShow/>} /> */}
          </Segment.Group>
        </main>
      </React.Fragment>
    )
  }
}

function mapDispatchToProps(dispatch) {  
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default withRouter(connect(null, mapDispatchToProps)(AccountsPage));