import React from 'react' ;
import { Dimmer, Loader, Segment } from 'semantic-ui-react';

const Loading = () => 
  <div>
    <Segment className="vh-100">
      <Dimmer active inverted>
        <Loader inverted>Loading</Loader>
      </Dimmer>
    </Segment>
  </div>

export default Loading;