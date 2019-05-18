import React from 'react';
import { shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import CurrencyPanel from 'components/CurrencyPanel';
import App from '../index';

const mockStore = configureMockStore();
describe('<App />', () => {
  it('should render the Currency Panel', () => {
    const store = mockStore({});
    const renderedComponent = shallow(<App store={store} />).dive();
    expect(renderedComponent.find(CurrencyPanel)).toHaveLength(1);
  });
});
