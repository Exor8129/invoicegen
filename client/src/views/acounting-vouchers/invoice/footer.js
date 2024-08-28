import React from "react";
import './footer.css';

const FooterTable = () => {
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
              {/* <th className="footer-table-th" rowSpan="2">Package & Forwarding</th> */}
              {/* <th className="footer-table-th" rowSpan="2">'adasdasd    1000000     '</th> */}
            </tr>
            <tr>
              <th className="footer-table-th">Tax</th>
              <th className="footer-table-th">Amount</th>
              <th className="footer-table-th">Tax</th>
              <th className="footer-table-th">Amount</th>
            </tr>
          </thead>
          <tbody className="footer-table-body">
            {/* Add table rows here */}
            <tr>
              <td>28%</td>
              <td>1234</td>
              <td>1000</td>
              <td>18%</td>
              <td>180</td>
              <td>18%</td>
              <td>180</td>
              <td>360</td>
              {/* <td className="vhead">Total</td> */}
              {/* <td> </td> */}

            </tr>
            <tr>
              <td>18%</td>
              <td>1234</td>
              <td>1000</td>
              <td>18%</td>
              <td>180</td>
              <td>18%</td>
              <td>180</td>
              <td>360</td>
              {/* <td className="vhead">CGST</td> */}
              {/* <td> </td> */}

            </tr>
            <tr>
              <td>12%</td>
              <td>1234</td>
              <td>1000</td>
              <td>18%</td>
              <td>180</td>
              <td>18%</td>
              <td>180</td>
              <td>360</td>
              {/* <td className="vhead">SGST</td> */}
              {/* <td> </td> */}

            </tr>
            <tr>
              <td>5%</td>
              <td>1234</td>
              <td>1000</td>
              <td>18%</td>
              <td>180</td>
              <td>18%</td>
              <td>180</td>
              <td>360</td>
              {/* <td className="vhead">Round Off</td> */}
              {/* <td> </td> */}

            </tr>

            <tr>
              <td colSpan={8} className="vhead"> Rupees In Words:
                <h1 className="amntwords">Three Lakh Forty Three Thousand One Hundred Twenty Three </h1>
              </td>
              {/* <td colSpan={2} rowSpan={2} className="vhead"></td> */}
            </tr>
            <tr>
              <td colSpan={8} className="vhead"> Decleration:
                <h1 className="decleration">We declare that this invoice shows the actual price of the goods described and that all particulars are true and correct</h1>
              </td>
              {/* <td colSpan={2} className="vhead"></td> */}
            </tr>
            {/* Additional rows can go here */}
          </tbody>
        </table>
        <table className="footer-table-2 ">
          
          <tbody className="footer-table-body-2">
            <tr><td>Package& Forwarding</td>
            <td className="tablebdy">sddd</td></tr>
            <tr><td>Total</td><td>sd</td></tr>
            <tr><td>CGST</td><td>sd</td></tr>
            <tr><td>SGST</td><td>sd</td></tr>
            <tr><td>Round Off</td><td>sd</td></tr>
            <tr><td>Grand Total</td><td>sd</td></tr>
            <tr><td className="signature" colSpan={2}>sf</td></tr>

          </tbody>
        </table>

        
      </div>
      <div><h1 className="computerGen">This is a  Computer Generated Invoice</h1></div>
    </div>
  );
};

export default FooterTable;