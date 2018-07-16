import React, { Component } from 'react';
import { Segment } from '../../node_modules/semantic-ui-react';

class Footer extends Component {
  render() {
    return (
      <footer>
        <Segment>
          <p>this is footer.</p>
        </Segment>
      </footer>
    )
  }
}

export default Footer;