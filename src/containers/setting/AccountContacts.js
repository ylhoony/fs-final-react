import axios from "axios";
import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  Button,
  Form,
  Header,
  Icon,
  Modal,
  Radio,
  Segment
} from "semantic-ui-react";

import { actions } from "../../actions/index";

import BreadcrumbDisplay from "../../components/BreadcrumbDisplay";
import Loading from "../../components/Loading";
import AccountContactsList from "../../components/accountContacts/AccountContactsList";

class AccountContacts extends Component {
  constructor(props) {
    super(props);

    this.state = {
      displayModal: false,
      contact: {
        id: null,
        account_id: props.currentAccount.id,
        first_name: "",
        last_name: "",
        job_title: "",
        email: "",
        phone: "",
        mobile: "",
        fax: "",
        comment: "",
        active: true
      }
    };
  }

  componentDidMount() {
    if (!this.props.currentAccountLoading) {
      const params = {
        current_account_id: this.props.currentAccount.id
      };
      this.props.actions.getAccountContacts(params);
    }
  }

  openModalNew = () => {
    this.setState({
      ...this.state,
      contact: Object.assign({}, this.state.contact, {
        id: null,
        first_name: "",
        last_name: "",
        job_title: "",
        email: "",
        phone: "",
        mobile: "",
        fax: "",
        comment: "",
        active: true
      })
    });
    this.openModal();
  };

  openModal = () => {
    this.setState({
      displayModal: true
    });
  };

  closeModal = () => {
    this.setState({
      displayModal: false
    });
  };

  handleClickTableCell = async e => {
    const accountContactId = e.target.parentElement.dataset.id;

    const params = {
      current_account_id: this.props.currentAccount.id
    };

    axios
      .get(`/api/v1/account_contacts/${accountContactId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json"
        },
        params: params
      })
      .then(res => {
        const selectedAccountContact = res.data;

        this.setState({
          ...this.state,
          contact: Object.assign({}, this.state.contact, {
            id: selectedAccountContact.id,
            first_name: selectedAccountContact.first_name || "",
            last_name: selectedAccountContact.last_name || "",
            job_title: selectedAccountContact.job_title || "",
            email: selectedAccountContact.email || "",
            phone: selectedAccountContact.phone || "",
            mobile: selectedAccountContact.mobile || "",
            fax: selectedAccountContact.fax || "",
            comment: selectedAccountContact.comment || "",
            active: true
          })
        });
        this.openModal();
      });
  };

  handleFormInputChange = (e, { value }) => {
    const key =
      e.target.name ||
      e.target.dataset.name ||
      e.target.previousSibling.name ||
      e.target.getAttribute("name");

    let newValue;
    if (key === "active") {
      this.state.contact.active ? (newValue = false) : (newValue = true);
    } else {
      newValue = value;
    }

    this.setState({
      ...this.state,
      contact: Object.assign({}, this.state.contact, {
        [key]: newValue
      })
    });
  };

  handleFormSubmit = async e => {
    e.preventDefault();

    const params = {
      current_account_id: this.props.currentAccount.id
    };
    if (!!this.state.contact.id) {
      await this.props.actions.updateAccountContact(
        this.state.contact.id,
        this.state,
        params
      );
    } else {
      await this.props.actions.createAccountContact(this.state, params);
    }
    await this.props.actions.getAccountContacts(params);
    this.closeModal();
    this.props.history.push("/account-contacts");
  };

  render() {
    const {
      accountContactsLoading,
      currentAccountLoading,
      createAccountContactLoading,
      updateAccountContactLoading
    } = this.props;

    if (
      accountContactsLoading ||
      currentAccountLoading ||
      createAccountContactLoading ||
      updateAccountContactLoading
    ) {
      return <Loading />;
    }

    console.log("account conatcts", this.props);

    return (
      <React.Fragment>
        <main>
          <Segment.Group>
            <BreadcrumbDisplay
              breadcrumbList={[{name: "Setting", url: "/setting"}, {name: "Account Contact", url: "/account-contacts"}]}
            />

            <Segment className="flex flex-between flex-middle">
              <Header
                as="h3"
                content="Account Contacts"
                subheader="Manage your warehouse locations"
              />

              <Button
                basic
                color="teal"
                icon
                labelPosition="left"
                size="tiny"
                onClick={() => this.openModalNew()}
              >
                <Icon name="plus" /> Add Contact
              </Button>
            </Segment>

            <Segment className="border-top-remove">
              <AccountContactsList
                handleClickTableCell={event => this.handleClickTableCell(event)}
              />
            </Segment>
          </Segment.Group>
        </main>

        {/* Modal Start */}
        <Modal size="tiny" open={this.state.displayModal} onClose={this.closeModal}>
          <Modal.Header>New Account Contact</Modal.Header>
          <Modal.Content>
            <Form size="tiny" onSubmit={this.handleFormSubmit}>
              <Form.Input
                fluid
                label="First Name"
                name="first_name"
                placeholder="First name"
                value={this.state.contact.first_name}
                onChange={this.handleFormInputChange}
              />
              <Form.Input
                fluid
                label="Last Name"
                name="last_name"
                placeholder="Last name"
                value={this.state.contact.last_name}
                onChange={this.handleFormInputChange}
              />
              <Form.Input
                fluid
                label="Job Title"
                name="job_title"
                placeholder="Job Title"
                value={this.state.contact.job_title}
                onChange={this.handleFormInputChange}
              />
              <Form.Input
                fluid
                label="Email"
                name="email"
                placeholder="email"
                value={this.state.contact.email}
                onChange={this.handleFormInputChange}
              />
              <Form.Input
                fluid
                label="Phone"
                name="phone"
                placeholder="phone"
                value={this.state.contact.phone}
                onChange={this.handleFormInputChange}
              />
              <Form.Input
                fluid
                label="Mobile"
                name="mobile"
                placeholder="Mobile"
                value={this.state.contact.mobile}
                onChange={this.handleFormInputChange}
              />
              <Form.Input
                fluid
                label="Fax"
                name="fax"
                placeholder="fax"
                value={this.state.contact.fax}
                onChange={this.handleFormInputChange}
              />
              <Form.TextArea
                label="comment"
                name="comment"
                placeholder="comment"
                value={this.state.contact.comment}
                onChange={this.handleFormInputChange}
              />
              <Form.Input
                control={Radio}
                toggle
                label="Status"
                name="active"
                placeholder="active"
                checked={this.state.contact.active === true}
                onChange={this.handleFormInputChange}
              />
              <Button type="submit">save</Button>
            </Form>
          </Modal.Content>
        </Modal>
        {/* Modal End */}
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({ accountContacts, countries, user }) => {
  return {
    countries: countries.countries,

    currentAccount: user.currentAccount,
    currentAccountLoading: user.currentAccountLoading,

    accountContacts: accountContacts.accountContacts,
    accountContactsLoading: accountContacts.accountContactsLoading,
    accountContactsError: accountContacts.accountContactsError,

    createAccountContactLoading: accountContacts.createAccountContactLoading,
    updateAccountContactLoading: accountContacts.updateAccountContactLoading
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
  )(AccountContacts)
);
