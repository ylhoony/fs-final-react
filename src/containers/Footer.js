import React from "react";
import { List, Segment } from "../../node_modules/semantic-ui-react";

const Footer = () => {
  return (
    <footer>
      <Segment size="tiny">
        <List className="flex flex-around">
          <List.Item>Apples</List.Item>
          <List.Item>Pears</List.Item>
          <List.Item>Oranges</List.Item>
        </List>
      </Segment>
    </footer>
  );
};

export default Footer;
