import React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean } from '@storybook/addon-knobs';

import { ImageCarousel } from '../src';

const items = [
  {
    src: 'https://picsum.photos/800/600?random',
    altText: 'Slide 1',
    caption: 'Slide 1',
    header: 'Slide 1 Header'
  },
  {
    src: 'https://picsum.photos/1000/750?random',
    altText: 'Slide 2',
    caption: 'Slide 2',
    header: 'Slide 2 Header'
  },
  {
    src: 'https://picsum.photos/1200/900?random',
    altText: 'Slide 3',
    caption: 'Slide 3',
    header: 'Slide 3 Header'
  }
];

storiesOf('ImageCarousel', module)
  .addWithInfo('default props', () => (
    <ImageCarousel
      items={items}
      fade={boolean('fade', ImageCarousel.defaultProps.fade)}
      isOpen={boolean('isOpen', true)}
      keyboard={boolean('keyboard', ImageCarousel.defaultProps.keyboard)}
      indicators={boolean('indicators', ImageCarousel.defaultProps.indicators)}
      controls={boolean('controls', ImageCarousel.defaultProps.controls)}
      autoPlay={boolean('autoPlay', ImageCarousel.defaultProps.autoPlay)}
    />
  ));
