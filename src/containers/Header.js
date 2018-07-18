import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Dropdown, Icon, Input, Menu } from "semantic-ui-react";

import { actions } from "../actions/index";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: window.location.pathname,
      companySelected: "Company Name Inc."
    };
  }

  handleAccountClick = e => {
    // debugger;
    // update current_account in server and redirect to /dashboard

    // this.props.actions.changeCurrentAccount();
  };

  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name });
  };

  handleSignOut = e => {
    e.preventDefault();
    this.props.actions.signOut();
    this.props.history.push("/signin");
  };

  render() {
    const { accounts } = this.props;
    const accountsDropdownList = accounts.map(account => {
      return (
        <Dropdown.Item
          key={account.id}
          name={account.id}
          text={account.name}
          value={account.id}
          onClick={this.handleAccountClick}
        />
      );
    });

    return (
      <React.Fragment>
        <header>
          <Menu pointing>
            <Menu.Item icon="bars" fitted="vertically" />
            <Menu.Menu>
              <Dropdown item text={this.state.companySelected}>
                <Dropdown.Menu>
                  <Dropdown.Header>
                    <a href="/accounts">My Accounts</a>
                  </Dropdown.Header>
                  <Dropdown.Divider />
                  {accountsDropdownList}
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

              <Dropdown item icon="user" simple>
                <Dropdown.Menu>
                  <Dropdown.Item>
                    <Icon name="dropdown" />
                    <span className="text">New</span>

                    <Dropdown.Menu>
                      <Dropdown.Item>Document</Dropdown.Item>
                      <Dropdown.Item>Image</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown.Item>
                  <Dropdown.Item>Open</Dropdown.Item>
                  <Dropdown.Item>Save...</Dropdown.Item>
                  <Dropdown.Item>Edit Permissions</Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Header>Export</Dropdown.Header>
                  <Dropdown.Item>Share</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>

              <Menu.Item onClick={event => this.handleSignOut(event)}>
                Sign out
              </Menu.Item>
            </Menu.Menu>
          </Menu>

          <Menu pointing secondary className="padding-all-sm">
            <Menu.Item
              href="/dashboard"
              name="dashboard"
              active={this.state.activeItem === "/dashboard"}
              onClick={this.handleItemClick}
            />
            <Menu.Item
              href="/demand"
              name="demand"
              active={this.state.activeItem === "/demand"}
              onClick={this.handleItemClick}
            />
            <Menu.Item
              href="/supply"
              name="supply"
              active={this.state.activeItem === "/supply"}
              onClick={this.handleItemClick}
            />
            <Menu.Item
              href="/product"
              name="product"
              active={this.state.activeItem === "/product"}
              onClick={this.handleItemClick}
            />
            <Menu.Item
              href="/logistics"
              name="logistics"
              active={this.state.activeItem === "/logistics"}
              onClick={this.handleItemClick}
            />
            <Menu.Item
              href="/warehouse"
              name="warehouse"
              active={this.state.activeItem === "/warehouse"}
              onClick={this.handleItemClick}
            />
            <Menu.Item
              href="/setting"
              name="setting"
              active={this.state.activeItem === "/setting"}
              onClick={this.handleItemClick}
            />
          </Menu>
        </header>
      </React.Fragment>
    );
  }
}

function mapStateToProps({ accounts }) {
  return {
    accounts: accounts.accounts
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Header)
);
