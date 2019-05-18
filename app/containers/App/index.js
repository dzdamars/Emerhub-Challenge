import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { injectIntl, FormattedMessage, intlShape } from 'react-intl';
import injectSaga from 'utils/injectSaga';
import { createStructuredSelector } from 'reselect';
import _debounce from 'lodash/debounce';
import {
  Message,
  Icon,
  Label,
  Input,
  Dropdown,
  Button,
} from 'semantic-ui-react';
import CurrencyPanel from 'components/CurrencyPanel';
import saga from './saga';
import { loadExchangeRate } from './actions';
import {
  makeSelectExchangeRateData,
  makeSelectExchangeRateError,
  makeSelectExchangeRateLoaded,
  makeSelectExchangeRateLoading,
} from './selectors';
/**
 *  styling part
 */
import GlobalStyle from '../../global-styles';

const AppWrapper = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  margin: 0;
  display: flex;
  min-height: 100%;
  padding: 0 16px;
  flex-direction: column;
  @media (min-width: 768px) {
    width: 75%;
    margin: 0 12.5%;
  }
`;
const Header = styled.div`
  position: sticky;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  margin: 10px 0;
`;
const DateLabel = styled(Label)`
  border: none !important;
  background: transparent !important;
  text-align: right;
`;
const BaseCurrencyInput = styled(Input)`
  position: sticky;
  border-bottom: 1px solid #000;
  padding: 0 0 5px;
  input {
    text-align: right !important;
    border: none !important;
    background: transparent !important;
  }
`;
const ContentWrapper = styled.div`
  width: 100%;
  max-height: 75vh;
  overflow: scroll;
  padding: 10px 2vw 5px;
  background: transparent;
`;
const SubmitCurrencyWrapper = styled.div`
  position: sticky;
  width: 100%;
  margin: 25px auto;
  display: flex;
`;
const CustomDropdown = styled(Dropdown)`
  width: 70%;
  @media (min-width: 768px) {
    width: 85%;
  }
`;
const CustomDropdownButton = styled(Button)`
  width: 30%;
  @media (min-width: 768px) {
    width: 15%;
  }
`;

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      baseCurrency: 'USD',
      baseNumber: parseFloat(1.0),
      displayedCurrency: [],
    };
    this.contentWrapperRef = React.createRef();
  }

  componentDidMount() {
    this.getExchangeRate();
  }

  componentDidUpdate(prevProps) {
    const { exchangeRateData } = this.props;
    if (prevProps.exchangeRateData !== exchangeRateData) {
      this.updateDisplayedCurrency();
    }
  }

  getExchangeRate() {
    const { baseCurrency } = this.state;
    this.props.loadExchangeRate({ base: baseCurrency });
  }

  handleBaseNumberChanges = _debounce((e, data) => {
    const { value } = data;
    this.setState({
      baseNumber: Math.abs(parseFloat(value)),
    });
  }, 25);

  handleBaseCurrencyChanges = (e, data) => {
    const { value } = data;
    const { baseCurrency } = this.state;
    if (value !== baseCurrency) {
      this.setState(
        {
          baseCurrency: value,
        },
        () => this.props.loadExchangeRate({ base: this.state.baseCurrency }),
      );
    }
  };

  handleTargetCurrencyChanges = (e, data) => {
    const { value } = data;
    this.setState({
      targetCurrency: value,
    });
  };

  submitCurrency = () => {
    const { displayedCurrency, targetCurrency } = this.state;
    const { exchangeRateData } = this.props;
    const isCurrencyExist = displayedCurrency.find(
      item => item.currency === targetCurrency,
    );
    if (targetCurrency && !isCurrencyExist) {
      this.setState(
        {
          displayedCurrency: [
            ...displayedCurrency,
            {
              currency: targetCurrency,
              rates: exchangeRateData.rates[targetCurrency],
            },
          ],
        },
        () => this.scrollDownContentWrapper(),
      );
    }
  };

  removeCurrency = targetCurrency => {
    const { displayedCurrency } = this.state;
    const newDisplayedCurrency = displayedCurrency.filter(
      item => item.currency !== targetCurrency,
    );
    this.setState({
      displayedCurrency: newDisplayedCurrency,
    });
  };

  updateDisplayedCurrency = () => {
    const { displayedCurrency } = this.state;
    const { exchangeRateData } = this.props;
    let newDisplayedCurrency = [];
    if (displayedCurrency && displayedCurrency.length > 0) {
      displayedCurrency.map(item => {
        newDisplayedCurrency = [
          ...newDisplayedCurrency,
          {
            currency: item.currency,
            rates: exchangeRateData.rates[item.currency],
          },
        ];
        return true;
      });
      this.setState({
        displayedCurrency: newDisplayedCurrency,
      });
    }
  };

  scrollDownContentWrapper = () => {
    this.contentWrapperRef.current.scrollTop = this.contentWrapperRef.current.scrollHeight;
  };

  generateContent = () => {
    const { intl } = this.props;
    const { displayedCurrency, baseNumber, baseCurrency } = this.state;
    let renderedItem = null;
    if (displayedCurrency && displayedCurrency.length > 0) {
      renderedItem = displayedCurrency.map(item => (
        <CurrencyPanel
          key={item.currency}
          item={item}
          baseNumber={baseNumber}
          baseCurrency={baseCurrency}
          onRemoveCurrency={this.removeCurrency}
        />
      ));
    } else {
      renderedItem = (
        <Message align="center" info>
          <Message.Header>
            {intl.formatMessage({ id: 'general.please.select.currency' })}
          </Message.Header>
        </Message>
      );
    }
    return renderedItem;
  };

  render() {
    const {
      intl,
      exchangeRateLoading,
      exchangeRateData,
      exchangeRateLoaded,
    } = this.props;
    const { baseCurrency, baseNumber } = this.state;
    return (
      <AppWrapper>
        <Header>
          <DateLabel float="right" basic>
            {intl.formatMessage({ id: 'general.date' })}:{' Foreign Exchange App '}
          
          </DateLabel>
       
        </Header>
        <BaseCurrencyInput
          type="number"
          step="any"
          action={
            <Dropdown
              scrolling
              loading={exchangeRateLoading}
              value={baseCurrency}
              options={
                exchangeRateLoaded && exchangeRateData
                  ? exchangeRateData.currencyList
                  : []
              }
              onChange={this.handleBaseCurrencyChanges}
            />
          }
          actionPosition="left"
          value={typeof baseNumber === 'number' ? baseNumber : ''}
          onChange={this.handleBaseNumberChanges}
        />
        <ContentWrapper ref={this.contentWrapperRef}>
          {this.generateContent()}
        </ContentWrapper>
        <SubmitCurrencyWrapper>
          <CustomDropdown
            search
            clearable
            scrolling
            selection={exchangeRateLoaded}
            loading={exchangeRateLoading}
            placeholder={
              exchangeRateLoaded && exchangeRateData
                ? exchangeRateData.currencyList[0].value
                : null
            }
            options={
              exchangeRateLoaded && exchangeRateData
                ? exchangeRateData.currencyList
                : []
            }
            onChange={this.handleTargetCurrencyChanges}
          />
          <CustomDropdownButton
            primary
            disabled={exchangeRateLoading}
            onClick={this.submitCurrency}
          >
            {intl.formatMessage({ id: 'general.submit' })}
          </CustomDropdownButton>
        </SubmitCurrencyWrapper>
        <GlobalStyle />
      </AppWrapper>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    loadExchangeRate: query => dispatch(loadExchangeRate(query)),
  };
}

const mapStateToProps = createStructuredSelector({
  exchangeRateData: makeSelectExchangeRateData(),
  exchangeRateLoading: makeSelectExchangeRateLoading(),
  exchangeRateLoaded: makeSelectExchangeRateLoaded(),
  exchangeRateError: makeSelectExchangeRateError(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
const withSaga = injectSaga({ key: 'global', saga });

App.propTypes = {
  exchangeRateData: PropTypes.object,
  exchangeRateLoading: PropTypes.bool,
  exchangeRateLoaded: PropTypes.bool,
  intl: intlShape.isRequired,
  loadExchangeRate: PropTypes.func,
};
export default compose(
  withConnect,
  withSaga,
)(injectIntl(App));
