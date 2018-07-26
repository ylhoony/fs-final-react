import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { Card, Header, Icon, Segment } from "semantic-ui-react";

import BreadcrumbDisplay from "../../components/BreadcrumbDisplay";

class Setting extends Component {
  render() {
    const description = [
      "Amy is a violinist with 2 years experience in the wedding industry.",
      "She enjoys the outdoors and currently resides in upstate New York."
    ].join(" ");

    return (
      <React.Fragment>
        <main>
          <Segment.Group>
            <BreadcrumbDisplay breadcrumbList={["Setting"]} />

            {/* Company Address and Contacts Section */}
            <Segment>
              <Segment.Group>
                <Segment>
                  <Header as="h3">Company Information</Header>
                </Segment>
                <Segment>
                  <Card.Group className="">
                    <Card>
                      <Card.Content
                        as={Link}
                        to="/account-addresses"
                        header="Company Addresses"
                      />
                      <Card.Content description={description} />
                      <Card.Content extra>
                        <Icon name="user" />
                        4 Friends
                      </Card.Content>
                    </Card>

                    <Card>
                      <Card.Content
                        as={Link}
                        to="/account-contacts"
                        header="Company Contacts"
                      />
                      <Card.Content description={description} />
                      <Card.Content extra>
                        <Icon name="user" />
                        4 Friends
                      </Card.Content>
                    </Card>

                    <Card>
                      <Card.Content
                        as={Link}
                        to="/warehouses"
                        header="Warehouse Locations"
                      />
                      <Card.Content description={description} />
                      <Card.Content extra>
                        <Icon name="user" />
                        4 Friends
                      </Card.Content>
                    </Card>
                  </Card.Group>
                </Segment>
              </Segment.Group>
            </Segment>

            {/*  */}
            <Segment>
              <Segment.Group>
                <Segment>
                  <Header as="h3">Financial?</Header>
                </Segment>
                <Segment>
                  <Card.Group>
                    <Card>
                      <Card.Content
                        as={Link}
                        to="/payment-terms"
                        header="Payment Terms"
                      />
                      <Card.Content description="this is description" />
                      <Card.Content extra>
                        <Icon name="user" />
                        4 Friends
                      </Card.Content>
                    </Card>

                    <Card>
                      <Card.Content header="use this" />
                      <Card.Content description="This is for other link" />
                      <Card.Content extra>
                        <Icon name="user" />
                        4 Friends
                      </Card.Content>
                    </Card>
                  </Card.Group>
                </Segment>
              </Segment.Group>
            </Segment>
          </Segment.Group>
        </main>
      </React.Fragment>
    );
  }
}

export default withRouter(Setting);
