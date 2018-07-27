import React, { Component } from 'react';
import { List, Segment } from '../../node_modules/semantic-ui-react';

class Footer extends Component {
  render() {
    return (
      <footer>
        <Segment size="tiny">
          <List className='flex flex-around'>
            <List.Item>Apples</List.Item>
            <List.Item>Pears</List.Item>
            <List.Item>Oranges</List.Item>
          </List>
        </Segment>
      </footer>
    )
  }
}

export default Footer;
