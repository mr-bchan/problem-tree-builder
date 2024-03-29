import React from 'react';
import { Button } from 'semantic-ui-react';

const SuggestedTopics = props => (
  <>
    <div style={{ marginTop: '16px' }}>
      <label>Suggested topics:</label>
    </div>
    <div style={{ marginTop: '8px' }}>
      {props.suggestedTopics &&
        props.suggestedTopics.map(suggestedTopic => (
          <Button
            key={suggestedTopic}
            basic
            content={suggestedTopic}
            onClick={() => props.onSelect(suggestedTopic)}
            size="mini"
          />
        ))}
      <Button icon="caret right" size="mini" />
    </div>
  </>
);

export default SuggestedTopics;
