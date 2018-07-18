import React from "react";
import { withRouter } from "react-router-dom";
import { Breadcrumb, Segment } from "semantic-ui-react";

const BreadcrumbDisplay = ({ breadcrumbList }) => {
  const breadcrumbBuilder = breadcrumbList.map((e, index) => {
    if (index === breadcrumbList.length - 1) {
      return (
        <React.Fragment key={index}>
          <Breadcrumb.Divider icon="right chevron" />
          <Breadcrumb.Section active>{e}</Breadcrumb.Section>
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment key={index}>
          <Breadcrumb.Divider icon="right chevron" />
          <Breadcrumb.Section link key={index}>
            {e}
          </Breadcrumb.Section>
        </React.Fragment>
      );
    }
  });

  return (
    <Segment>
      <Breadcrumb size="small">
        <Breadcrumb.Section link>Home</Breadcrumb.Section>
        {breadcrumbBuilder}
      </Breadcrumb>
    </Segment>
  );
};

export default withRouter(BreadcrumbDisplay);
