import React from 'react';
import { Breadcrumb, Segment } from 'semantic-ui-react';

const BreadcrumbDisplay = ({ breadcrumbList }) => {
  const breadcrumbBuilder = breadcrumbList.map((e, index) => {
    if (index === breadcrumbList.length - 1) {
      return (
        <React.Fragment>
          <Breadcrumb.Divider icon='right chevron' />
          <Breadcrumb.Section active key={index}>{e}</Breadcrumb.Section>
        </React.Fragment>
      )
    } else {
      return (
        <React.Fragment>
          <Breadcrumb.Divider icon='right chevron' />        
          <Breadcrumb.Section link key={index}>{e}</Breadcrumb.Section>
        </React.Fragment>
      )
    }
  })

  return (
    <Segment>
      <Breadcrumb size='small'>
        <Breadcrumb.Section link>Home</Breadcrumb.Section>
        { breadcrumbBuilder }
      </Breadcrumb>
    </Segment>
  )
}

export default BreadcrumbDisplay;