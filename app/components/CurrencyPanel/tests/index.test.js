import React from 'react';
// import { mount } from 'enzyme';
// import { enzymeFind } from 'styled-components/test-utils';
import renderer from 'react-test-renderer';
import 'jest-styled-components';
import CurrencyPanel from '../index';

describe('<CurrencyPanel />', () => {
  it('should match the snapshot', () => {
    const mockItem = {
      currency: 'idr',
      rates: '15000',
    };
    const baseNumber = 1;
    const baseCurrency = 'USD';
    const renderedComponent = renderer
      .create(
        <CurrencyPanel
          key={mockItem.currency}
          item={mockItem}
          baseNumber={baseNumber}
          baseCurrency={baseCurrency}
        />,
      )
      .toJSON();
    expect(renderedComponent).toMatchSnapshot();
  });
});
