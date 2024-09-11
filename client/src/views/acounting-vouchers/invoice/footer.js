import React from "react";
import './footer.css';

// Function to convert numbers to words
const numberToWords = (num) => {
  if (num === 0) return 'Zero';

  const units = [
    'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine',
    'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'
  ];
  const tens = [
    '', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'
  ];
  const largeNumbers = ['Thousand', 'Lakh', 'Crore'];

  const convertToWords = (n) => {
    if (n < 20) return units[n - 1];
    if (n < 100) return `${tens[Math.floor(n / 10)]}${n % 10 !== 0 ? ` ${units[n % 10 - 1]}` : ''}`;
    if (n < 1000) return `${units[Math.floor(n / 100) - 1]} Hundred${n % 100 !== 0 ? ` and ${convertToWords(n % 100)}` : ''}`;

    if (n < 100000) return `${convertToWords(Math.floor(n / 1000))} Thousand${n % 1000 !== 0 ? ` ${convertToWords(n % 1000)}` : ''}`;
    if (n < 10000000) return `${convertToWords(Math.floor(n / 100000))} Lakh${n % 100000 !== 0 ? ` ${convertToWords(n % 100000)}` : ''}`;
    if (n < 1000000000) return `${convertToWords(Math.floor(n / 10000000))} Crore${n % 10000000 !== 0 ? ` ${convertToWords(n % 10000000)}` : ''}`;
    return ''; // This is just for safety, shouldn't be reached in normal cases.
  };

  return convertToWords(num);
};


const FooterTable = ({ totalAmount, totalCGST, totalSGST,taxRateToHSNMapping}) => {
  // Ensure totals are numbers and format them correctly
  const amount = parseFloat(totalAmount).toFixed(2) || 0;
  const cgst = parseFloat(totalCGST).toFixed(2) || 0;
  const sgst = parseFloat(totalSGST).toFixed(2) || 0;

  console.log(taxRateToHSNMapping);
  const sortedTaxRates = Object.keys(taxRateToHSNMapping).sort((a, b) => parseFloat(b) - parseFloat(a));

  // Calculate grand total and round it
  const grandTotal = parseFloat(amount)+parseFloat(cgst)+parseFloat(sgst);
  
  const roundedGrandTotal = parseFloat(Math.round(grandTotal));
  
  // Calculate round off
  const roundoff = (roundedGrandTotal - grandTotal).toFixed(2);

  // Convert grand total to words
  const grandTotalInWords = numberToWords(roundedGrandTotal);

  return (
    <div className="table-container">
      <div className="table-wrapper">
        <table className="footer-table">
          <thead className="footer-table-head">
            <tr>
              <th className="footer-table-th" rowSpan="2">Class</th>
              <th className="footer-table-th" rowSpan="2">HSN/SAC</th>
              <th className="footer-table-th" rowSpan="2">Taxable Value</th>
              <th className="footer-table-th" colSpan="2">Central Tax</th>
              <th className="footer-table-th" colSpan="2">State Tax</th>
              <th className="footer-table-th" rowSpan="2">Total Tax Amount</th>
            </tr>
            <tr>
              <th className="footer-table-th">Tax</th>
              <th className="footer-table-th">Amount</th>
              <th className="footer-table-th">Tax</th>
              <th className="footer-table-th">Amount</th>
            </tr>
          </thead>
          <tbody className="footer-table-body">
          {sortedTaxRates.map((taxRate) => {
            const { hsnCodes, totalAmounts } = taxRateToHSNMapping[taxRate];
            
            // Assuming CGST and SGST rates are half of the taxRate
            const cgstRate = parseFloat(taxRate) / 2;
            const sgstRate = parseFloat(taxRate) / 2;
            const cgstAmount = (parseFloat(totalAmounts) * (cgstRate / 100)).toFixed(2);
            const sgstAmount = (parseFloat(totalAmounts) * (sgstRate / 100)).toFixed(2);
            const totalTaxAmount = (parseFloat(cgstAmount) + parseFloat(sgstAmount)).toFixed(2);

            return (
              <tr key={taxRate}>
                <td>{taxRate}</td>
                <td>{hsnCodes}</td>
                <td>{parseFloat(totalAmounts)}</td>
                <td>{cgstRate}%</td>
                <td>{cgstAmount}</td>
                <td>{sgstRate}%</td>
                <td>{sgstAmount}</td>
                <td>{totalTaxAmount}</td>
              </tr>
            );
          })}
          <tr>
            <td colSpan={8} className="vhead">Rupees In Words:
              <h1 className="amntwords">{grandTotalInWords}</h1>
            </td>
          </tr>
          <tr>
            <td colSpan={8} className="vhead">Declaration:
              <h1 className="decleration">We declare that this invoice shows the actual price of the goods described and that all particulars are true and correct</h1>
            </td>
          </tr>
        </tbody>
        </table>
        <table className="footer-table-2">
          <tbody className="footer-table-body-2">
            <tr><td className="totals">Total Taxable</td><td>{totalAmount}</td></tr>
            <tr><td>CGST</td><td>{cgst}</td></tr>
            <tr><td>SGST</td><td>{sgst}</td></tr>
            <tr><td>Round Off</td><td>{roundoff}</td></tr>
            <tr><td>Grand Total</td><td>{roundedGrandTotal}</td></tr>
            <tr><td className="signature" colSpan={2}>sf</td></tr>
          </tbody>
        </table>
      </div>
      <div><h1 className="computerGen">This is a Computer Generated Invoice</h1></div>
    </div>
  );
};

export default FooterTable;
