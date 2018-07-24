import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button, Header, Icon, Segment } from "semantic-ui-react";

import { actions } from "../../actions/index";

import BreadcrumbDisplay from "../../components/BreadcrumbDisplay";
import Loading from "../../components/Loading";
import WarehousesList from "../../components/warehouses/WarehousesList";

class Warehouses extends Component {

  componentDidMount() {
    if (!this.props.currentAccountLoading) {
      const params = {
        current_account_id: this.props.currentAccount.id
      };
      this.props.actions.getWarehouses(params);
    }
  }

  render() {
    const { currentAccountLoading, warehousesLoading } = this.props;

    if (currentAccountLoading || warehousesLoading) {
      return <Loading />;
    }

    return (
      <React.Fragment>
        <main>
          <Segment.Group>
            <BreadcrumbDisplay
              breadcrumbList={["Setting", "Warehouse Locations"]}
            />

            <Segment className="flex flex-between flex-middle">
              <Header
                as="h2"
                content="Warehouse Locations"
                subheader="Manage your warehouse locations"
              />

              <Button
                // floated={this.props.floated}
                icon
                labelPosition="left"
                primary
                size="small"
                onClick={this.openModal}
              >
                <Icon name="plus" /> Add Warehouse
              </Button>
            </Segment>

            <Segment className="border-top-remove">
              <WarehousesList />
            </Segment>
          </Segment.Group>
        </main>
      </React.Fragment>
    );
  }
}

function mapStateToProps({ countries, user, warehouses }) { 
  return {
    countries: countries.countries,

    currentAccount: user.currentAccount,
    currentAccountLoading: user.currentAccountLoading,

    warehouses: warehouses.warehouses,
    warehousesLoading: warehouses.warehousesLoading,
    warehousesError: warehouses.warehousesError
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
  )(Warehouses)
);
