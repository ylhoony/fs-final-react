import React, { Component } from "react";

class ProductForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: []
    }
  }

  render() {
    return(
      <React.Fragment>
        Products Form
      </React.Fragment>
    )
  }
}

export default ProductForm;