import React from 'react';
import { storiesOf } from '@kadira/storybook';

import { BlockPanel, Button, Icon, HelpBubble } from '../src';
import { boolean, text } from '@kadira/storybook-addon-knobs';

storiesOf('BlockPanel', module)
  .addWithInfo('Live example', () => (
    <BlockPanel
      title={text('title', 'Some simple content would go here')}
      onEdit={() => alert('Edit clicked!')}
      expandable={boolean('expandable', true)}
    >
      Now you see me.
    </BlockPanel>
  ))
  .addWithInfo('Initially closed', () => (
    <BlockPanel
      title={text('title', 'Some simple content would go here')}
      onEdit={() => alert('Edit clicked!')}
      expandable={boolean('expandable', true)}
      open={false}
    >
      Now you don't.
    </BlockPanel>
  ))
  .addWithInfo('components for title and controls', () => (
    <BlockPanel
      title={
        <span className="text-uppercase">
          {text('title', 'Invoices')} <HelpBubble className="text-primary" title="What does this mean?">It means nothing.</HelpBubble>
        </span>
      }
      controls={[
        <Button size="sm" color="link" onClick={() => alert('Cool I passed this in.')}><Icon name="upload" /> Upload</Button>,
        <Button size="sm" color="link" onClick={() => alert('This one too.')}><Icon name="plus-circle" /> Add Activity</Button>
      ]}
    >
      Hello.
    </BlockPanel>
  ));

