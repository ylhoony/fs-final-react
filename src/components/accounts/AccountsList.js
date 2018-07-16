import React from 'react';
import { withRouter } from 'react-router-dom';
import { Button, Header, Icon, Table, Segment } from 'semantic-ui-react';
import Account from './Account';
import BreadcrumbDisplay from '../BreadcrumbDisplay';

class AccountsList extends React.Component {
  constructor(props) {
    super(props);
  }

  openAccountNew = () => {
    this.props.history.push('/accounts/new');
  }

  render() {
    const { accounts } = this.props;
    if (!accounts) {
      return (
        <div>Nothing</div>
      )
    }
    return (
      <React.Fragment>
        <BreadcrumbDisplay breadcrumbList={['Accounts']} />

        <Segment className='flex flex-between flex-middle'>
          <Header
            as='h2'
            content='My Company Accounts'
            subheader='Manage your account settings and set email preferences'
          />
          <Button icon labelPosition='left' color='olive' size='small' onClick={this.openAccountNew}>
            <Icon name='plus' />
            Add Organization
          </Button>
        </Segment>
        
        <Segment className='border-top-remove'>
          <Table celled selectable color='brown'>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Name</Table.HeaderCell>
                <Table.HeaderCell>Status</Table.HeaderCell>
                <Table.HeaderCell>Notes</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {accounts.map(account => <Account key={account.id} id={account.id} name={account.name} />)}
            </Table.Body>
          </Table>
        </Segment>
      </React.Fragment>
    )
  }
}

export default withRouter(AccountsList);
