import React from 'react';
import { boolean, text } from '@storybook/addon-knobs';
import { Icon, Waiting } from '../src';

export default {
  title: 'Waiting',
  component: Waiting
};

export const Default = () => (
  <Waiting isOpen={boolean('isOpen', true)} backdrop={boolean('backdrop', true)} />
);

export const CustomTitle = () => (
  <Waiting
    isOpen={boolean('isOpen', true)}
    backdrop={boolean('backdrop', true)}
    title={text('text', 'Please wait for this thing')}
  />
);

export const Children = () => (
  <Waiting
    isOpen={boolean('isOpen', true)}
    backdrop={boolean('backdrop', true)}
  >
    <Icon name="clock-o" size="4x" />
  </Waiting>
);
