import React from "react";
import { Link, withRouter } from "react-router-dom";
import { Breadcrumb, Segment } from "semantic-ui-react";

const BreadcrumbDisplay = ({ breadcrumbList }) => {
  const breadcrumbBuilder = breadcrumbList.map((e, index) => {
    if (index === breadcrumbList.length - 1) {
      return (
        <React.Fragment key={index}>
          <Breadcrumb.Divider icon="right chevron" />
          <Breadcrumb.Section active as={Link} to={e.url}>{e.name}</Breadcrumb.Section>
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment key={index}>
          <Breadcrumb.Divider icon="right chevron" />
          <Breadcrumb.Section as={Link} link to={e.url}>
            {e.name}
          </Breadcrumb.Section>
        </React.Fragment>
      );
    }
  });

  return (
    <Segment>
      <Breadcrumb size="small">
        <Breadcrumb.Section link as={Link} to="/dashboard">
          Home
        </Breadcrumb.Section>
        {breadcrumbBuilder}
      </Breadcrumb>
    </Segment>
  );
};

export default withRouter(BreadcrumbDisplay);
