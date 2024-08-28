import React from 'react';
import { Row, Col } from 'react-bootstrap';
import HtmlHead from 'components/html-head/HtmlHead';
import BreadcrumbList from 'components/breadcrumb-list/BreadcrumbList';

const ItemEntry = () => {
  const title = 'Item Entry';
  const description = 'Elearning Portal Quiz Result Page';

  // Updated sample data
  const tableData = [
    {
      id: '1',
      partyName: 'Acme Corp',
      partyAddress: '123 Elm Street',
      gstin: '27AAECA1234A1Z5',
      dlNo: 'DL-1234567',
      contactNumber: '9876543210',
      state: 'California',
      code: 'CA'
    },
    {
      id: '2',
      partyName: 'Beta Ltd.',
      partyAddress: '456 Oak Avenue',
      gstin: '29AAECA5678A1Z9',
      dlNo: 'DL-7654321',
      contactNumber: '1234567890',
      state: 'New York',
      code: 'NY'
    },
    {
      id: '3',
      partyName: 'Gamma Inc.',
      partyAddress: '789 Pine Road',
      gstin: '30AAECA9876A1Z2',
      dlNo: 'DL-1122334',
      contactNumber: '2345678901',
      state: 'Texas',
      code: 'TX'
    },
    {
      id: '4',
      partyName: 'Delta LLC',
      partyAddress: '101 Maple Lane',
      gstin: '31AAECA3456A1Z8',
      dlNo: 'DL-2233445',
      contactNumber: '3456789012',
      state: 'Florida',
      code: 'FL'
    }
  ];

  const breadcrumbs = [
    { to: '', text: 'Home' },
    { to: 'entry/item', text: 'Item Entry' },
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
            <thead className="table-header-center">
              <tr>
                <th>Id</th>
                <th>Party Name</th>
                <th>Party Address</th>
                <th>GSTIN</th>
                <th>DL NO</th>
                <th>Contact Number</th>
                <th>State</th>
                <th>Code</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((item, index) => (
                <tr key={index}>
                  <td>{item.id}</td>
                  <td>{item.partyName}</td>
                  <td>{item.partyAddress}</td>
                  <td>{item.gstin}</td>
                  <td>{item.dlNo}</td>
                  <td>{item.contactNumber}</td>
                  <td>{item.state}</td>
                  <td>{item.code}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Col>
      </Row>
    </>
  );
};

export default ItemEntry;
