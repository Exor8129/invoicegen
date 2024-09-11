import React, { useState, useEffect } from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import HtmlHead from 'components/html-head/HtmlHead';
import BreadcrumbList from 'components/breadcrumb-list/BreadcrumbList';
import axios from 'axios';

const SaleEntry = () => {
  const title = 'Sale Entry';
  const description = 'Elearning Portal Quiz List Page';
  const breadcrumbs = [{ to: '', text: 'Home' }];

  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  // Fetch sale details when the component mounts
  useEffect(() => {
    const fetchSaleDetails = async () => {
      try {
        const response = await axios.get('http://localhost:3001/saleentry');
        setData(response.data);
        setFilteredData(response.data);  // Initialize with full data
      } catch (error) {
        console.error('Error fetching sale details:', error);
      }
    };

    fetchSaleDetails();
  }, []);

  // Filter data based on search query
  useEffect(() => {
    const filtered = data.filter(invoice =>
      invoice.invoiceDate.toLowerCase().includes(searchQuery.toLowerCase()) ||
      invoice.partyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      invoice.invoiceNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      invoice.Products.some(product =>
        product.productName.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
    setFilteredData(filtered);
  }, [searchQuery, data]);  // Re-filter when searchQuery or data changes

  return (
    <>
      <HtmlHead title={title} description={description} />
      <div className="page-title-container">
        <Row>
          <Col xs="8">
            <h1 className="mb-0 pb-0 display-4">{title}</h1>
            <BreadcrumbList items={breadcrumbs} />
          </Col>
          <Col xs="4">
            <div className="search-bar-container">
              <input
                className="form-control"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Type to search..."
              />
            </div>
          </Col>
        </Row>
      </div>

      <Row className="d-none d-lg-flex mb-3 g-0 custom-sort">
        <Col>
          <Row className="gx-2 px-5">
            <Col xs="1" className="text-start">
              <div className="text-muted text-medium">Invoice Date</div>
            </Col>
            <Col xs="3" className="text-start">
              <div className="text-muted text-medium">Party Name</div>
            </Col>
            <Col xs="1" className="text-start">
              <div className="text-muted text-medium">Invoice Number</div>
            </Col>
            <Col xs="3" className="text-start">
              <div className="text-muted text-medium">Product Name</div>
            </Col>
            <Col xs="1" className="text-center">
              <div className="text-muted text-medium">Quantity</div>
            </Col>
            <Col xs="1" className="text-center">
              <div className="text-muted text-medium">Rate</div>
            </Col>
            <Col xs="1" className="text-center">
              <div className="text-muted text-medium">P & F</div>
            </Col>
            <Col xs="1" className="text-center">
              <div className="text-muted text-medium">Total</div>
            </Col>
          </Row>
        </Col>
      </Row>

      <Row className="g-3 mb-5">
        {filteredData.length === 0 ? (
          <Col xs="12">
            <div>No data available.</div>
          </Col>
        ) : (
          filteredData.map((invoice, index) => (
            <Col sm="12" lg="12" key={index}>
              <Card>
                <Card.Body>
                  {invoice.Products.map((product, i) => (
                    <Row key={i} className="g-0 mb-2">
                      <Col xs="1" className="text-start">
                        {i === 0 && <div className="lh-1-5 mb-0">{invoice.invoiceDate}</div>}
                      </Col>
                      <Col xs="3" className="text-start">
                        {i === 0 && <div className="lh-1-5 mb-0">{invoice.partyName}</div>}
                      </Col>
                      <Col xs="1" className="text-start">
                        {i === 0 && <div className="lh-1-5 mb-0">{invoice.invoiceNumber}</div>}
                      </Col>
                      <Col xs="3" className="text-start">
                        <div className="lh-1-5 mb-0">{product.productName}</div>
                      </Col>
                      <Col xs="1" className="text-center">
                        <div className="lh-1-5 mb-0">{product.qty}</div>
                      </Col>
                      <Col xs="1" className="text-center">
                        <div className="lh-1-5 mb-0">{product.Rate}</div>
                      </Col>
                      <Col xs="1" className="text-center">
                        <div className="lh-1-5 mb-0">{invoice.packageForwarding}</div>
                      </Col>
                      <Col xs="1" className="text-center">
                        <div className="lh-1-5 mb-0">{product.qty * product.Rate}</div>
                      </Col>
                    </Row>
                  ))}
                </Card.Body>
              </Card>
            </Col>
          ))
        )}
      </Row>
    </>
  );
};

export default SaleEntry;
