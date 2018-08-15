import React from "react";
import { Link, withRouter } from "react-router-dom";
import { Card, Header, Segment } from "semantic-ui-react";

import BreadcrumbDisplay from "../../components/BreadcrumbDisplay";

const Setting = () => {
  return (
    <React.Fragment>
      <main>
        <Segment.Group>
          <BreadcrumbDisplay
            breadcrumbList={[{ name: "Setting", url: "/setting" }]}
          />

          {/* Company Address and Contacts Section */}
          <Segment>
            <Segment.Group>
              <Segment>
                <Header as="h3">Company Information</Header>
              </Segment>
              <Segment>
                <Card.Group>
                  <Card>
                    <Card.Content
                      as={Link}
                      to="/account-addresses"
                      header="Company Addresses"
                    />
                    <Card.Content description="Lorem ipsum dolor sit amet, consectetur adipiscing elit." />
                  </Card>

                  <Card>
                    <Card.Content
                      as={Link}
                      to="/account-contacts"
                      header="Company Contacts"
                    />
                    <Card.Content description="Lorem ipsum dolor sit amet, consectetur adipiscing elit." />
                  </Card>

                  <Card>
                    <Card.Content
                      as={Link}
                      to="/warehouses"
                      header="Warehouse Locations"
                    />
                    <Card.Content description="Lorem ipsum dolor sit amet, consectetur adipiscing elit." />
                  </Card>
                </Card.Group>
              </Segment>
            </Segment.Group>
          </Segment>

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
                    <Card.Content description="Lorem ipsum dolor sit amet, consectetur adipiscing elit." />
                  </Card>

                  <Card>
                    <Card.Content header="Tax Rules" />
                    <Card.Content description="Lorem ipsum dolor sit amet, consectetur adipiscing elit." />
                  </Card>
                </Card.Group>
              </Segment>
            </Segment.Group>
          </Segment>
          {/* Product */}
          <Segment>
            <Segment.Group>
              <Segment>
                <Header as="h3">Products</Header>
              </Segment>
              <Segment>
                <Card.Group>
                  <Card>
                    <Card.Content
                      as={Link}
                      to="/product-categories"
                      header="Product Categories"
                    />
                    <Card.Content description="Lorem ipsum dolor sit amet, consectetur adipiscing elit." />
                  </Card>

                  <Card>
                    <Card.Content
                      as={Link}
                      to="/product-brands"
                      header="Product Brands"
                    />
                    <Card.Content description="Lorem ipsum dolor sit amet, consectetur adipiscing elit." />
                  </Card>
                </Card.Group>
              </Segment>
            </Segment.Group>
          </Segment>
        </Segment.Group>
      </main>
    </React.Fragment>
  );
};

export default withRouter(Setting);
