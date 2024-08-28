import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import HtmlHead from 'components/html-head/HtmlHead';
import BreadcrumbList from 'components/breadcrumb-list/BreadcrumbList';
import CsLineIcons from 'cs-line-icons/CsLineIcons';

const PurchaseEntry = () => {
  const title = 'Purchase Entry';
  const description = 'Elearning Portal Quiz Detail Page';

  const breadcrumbs = [
    { to: '', text: 'Home' },
    { to: 'quiz/list', text: 'Purchase Entry' },
  ];

  // Sample data
  const tableData = [
    {
      date: '2024-08-01',
      partyName: 'Acme Corp',
      invoiceNumber: 'INV-001',
      purchaseNumber: 'PUR-123',
      productName: 'Product A',
      quantity: 10,
      rate: '$20.00',
      amount: '$200.00'
    },
    {
      date: '2024-08-02',
      partyName: 'Beta Ltd.',
      invoiceNumber: 'INV-002',
      purchaseNumber: 'PUR-124',
      productName: 'Product B',
      quantity: 5,
      rate: '$50.00',
      amount: '$250.00'
    },
    {
      date: '2024-08-03',
      partyName: 'Gamma Inc.',
      invoiceNumber: 'INV-003',
      purchaseNumber: 'PUR-125',
      productName: 'Product C',
      quantity: 8,
      rate: '$30.00',
      amount: '$240.00'
    },
    {
      date: '2024-08-04',
      partyName: 'Delta LLC',
      invoiceNumber: 'INV-004',
      purchaseNumber: 'PUR-126',
      productName: 'Product D',
      quantity: 12,
      rate: '$25.00',
      amount: '$300.00'
    }
  ];

  return (
    <>
      <HtmlHead title={title} description={description} />
      {/* Title and Top Buttons Start */}
      <div className="page-title-container">
        <Row className="g-0">
          {/* Title Start */}
          <Col className="col-auto mb-sm-0 me-auto">
            <h1 className="mb-0 pb-0 display-4">{title}</h1>
            <BreadcrumbList items={breadcrumbs} />
          </Col>
          <Col xs="4">
            <div className="search-bar-container">
              <input className="form-control" list="datalistOptions" id="exampleDataList" placeholder="Type to search..." />
            </div>
          </Col>
          {/* Title End */}

         
        </Row>
      </div>
      {/* Title and Top Buttons End */}

      <Row className="g-5">
        <Col>
          <table className="table table-hover">
            <thead>
              <tr>
                <th>Date</th>
                <th>Party Name</th>
                <th>Invoice Number</th>
                <th>Purchase Number</th>
                <th>Product Name</th>
                <th>Quantity</th>
                <th>Rate</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((item, index) => (
                <tr key={index}>
                  <td>{item.date}</td>
                  <td>{item.partyName}</td>
                  <td>{item.invoiceNumber}</td>
                  <td>{item.purchaseNumber}</td>
                  <td>{item.productName}</td>
                  <td>{item.quantity}</td>
                  <td>{item.rate}</td>
                  <td>{item.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Col>
      </Row>
    </>
  );
};

export default PurchaseEntry;
