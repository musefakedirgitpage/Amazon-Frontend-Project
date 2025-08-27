import numeral from "numeral"

const CurrencyFormater = ({ amount }) => {
  let formatedAmount = numeral(amount).format("$0,00")
  return <div>{formatedAmount}</div>;
};

export default CurrencyFormater
