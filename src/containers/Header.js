import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Dropdown, Menu } from "semantic-ui-react";

import { actions } from "../actions/index";
import Loading from "../components/Loading";
import AccountDropdownList from "../components/header/AccountDropdownList";
import NavMenu from "../components/header/NavMenu";

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentAccount: props.currentAccount
    };
  }

  handleAccountClick = e => {
    const account = {
      account_id: e.target.dataset.id || e.target.parentElement.dataset.id
    };

    this.props.actions.changeCurrentAccount(account);
    this.props.history.push("/dashboard");
  };

  handleSignOut = e => {
    e.preventDefault();
    this.props.actions.signOut();
    this.props.history.push("/signin");
  };

  render() {
    const { accounts, currentAccount, currentAccountLoading } = this.props;
    const menuList = [
      { name: "dashboard", endpoint: "/dashboard" },
      { name: "demand", endpoint: "/demand" },
      { name: "supply", endpoint: "/supply" },
      { name: "product", endpoint: "/product" },
      { name: "warehouse", endpoint: "/warehouse" },
      { name: "setting", endpoint: "/setting" }
    ];

    console.log("currentAccount in Header: ", currentAccount);

    if (currentAccountLoading) {
      return <Loading />;
    }

    return (
      <React.Fragment>
        <header>
          <Menu pointing size="small">
            <Menu.Item icon="bars" fitted="vertically" />
            <Menu.Menu>
              <Dropdown
                item
                text={currentAccount ? currentAccount.name : "my app"}
              >
                <Dropdown.Menu>
                  <Dropdown.Header>
                    <a href="/accounts">My Accounts</a>
                  </Dropdown.Header>
                  <Dropdown.Divider />
                  {!!accounts.length && (
                    <AccountDropdownList
                      accounts={accounts}
                      handleAccountClick={this.handleAccountClick}
                    />
                  )}
                </Dropdown.Menu>
              </Dropdown>
            </Menu.Menu>

            <Menu.Menu position="right">
              <div className="ui right aligned category search item">
                <div className="ui transparent icon input">
                  <input
                    className="prompt"
                    type="text"
                    placeholder="Search..."
                  />
                  <i className="search link icon" />
                </div>
                <div className="results" />
              </div>

              <Menu.Item onClick={event => this.handleSignOut(event)}>
                Sign out
              </Menu.Item>
            </Menu.Menu>
          </Menu>

          <Menu className="padding-all-sm" pointing secondary size="tiny">
            <NavMenu list={menuList} />
          </Menu>
        </header>
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({ accounts, user }) => {
  return {
    accounts: accounts.accounts,
    currentAccount: user.currentAccount,
    currentAccountLoading: user.currentAccountLoading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Header)
);
