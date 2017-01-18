import 'jsdom-global/register';

/* eslint-env mocha */
import React from 'react';
import assert from 'assert';
import { mount } from 'enzyme';

import { Spinner } from '../../src';

describe('<Spinner />', () => {
  it('should render correctly', () => {
    const component = mount(<Spinner />);
    assert.equal('<div class=""><div></div><div></div></div>', component.html());
  });

  it('should respect the className prop', () => {
    const component = mount(<Spinner className="bob" />);
    assert.equal('<div class="bob"><div></div><div></div></div>', component.html());
  });

  it('should respect the style prop', () => {
    const style = { fontSize: 24 };
    const component = mount(<Spinner style={style} />);
    assert.equal(
      '<div class="" style="font-size: 24px;"><div></div><div></div></div>',
      component.html()
    );
  });
});