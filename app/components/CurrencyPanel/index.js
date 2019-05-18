import React from 'react';
import styled from 'styled-components';
import { Card, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import CurrencyConstant from './currencyConstant';

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 0 0 10px;
`;
const Container = styled(Card)`
  padding: 10px !important;
  margin: 0 !important;
`;
const CalculationContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  span {
    font-size: 1.1em;
    font-weight: bold;
  }
`;
const Segment = styled.div`
  margin: 10px 0 5px;
`;
const CurrencyDescription = styled.span`
  font-style: italic;
  font-size: 0.9em;
`;
const CustomSpan = styled.span`
  background: #fe5722;
  color: #ffffff;
  padding: 5px;
  font-size: 1em;
  border-radius: 8px;
`;
const CloseButtonWrapper = styled.div`
  margin: 0 1vw;
  button {
    margin: 0 !important;
  }
`;
const defaultNumber = 1;
class CurrencyPanel extends React.PureComponent {
  componentDidMount() {}

  componentDidUpdate() {}

  calculateCurrency = () => {
    const { item, baseNumber } = this.props;
    if (baseNumber && !Number.isNaN(baseNumber)) {
      return parseFloat(item.rates * parseFloat(baseNumber)).toLocaleString();
    }
    return '-';
  };

  render() {
    const { item, baseCurrency, onRemoveCurrency } = this.props;
    return (
      <Wrapper>
        <Container fluid>
          <div>
            <CalculationContainer>
              <span>{item.currency}</span>
              <span>{this.calculateCurrency()}</span>
            </CalculationContainer>
            <Segment>
              <CurrencyDescription>
                {item.currency} - {CurrencyConstant[item.currency]}{' '}
              </CurrencyDescription>
            </Segment>
            <Segment>
              <CustomSpan>
                {defaultNumber}
                &nbsp;
                {baseCurrency} = {item.currency}
                &nbsp;
                {item.rates}
              </CustomSpan>
            </Segment>
          </div>
        </Container>
        <CloseButtonWrapper>
          <Button
            size="tiny"
            color="orange"
            icon="close"
            onClick={() => onRemoveCurrency(item.currency)}
          />
        </CloseButtonWrapper>
      </Wrapper>
    );
  }
}

CurrencyPanel.propTypes = {
  baseNumber: PropTypes.number,
  baseCurrency: PropTypes.string,
  onRemoveCurrency: PropTypes.func,
  item: PropTypes.object,
};

export default CurrencyPanel;
