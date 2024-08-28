import React, { useState } from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import HtmlHead from 'components/html-head/HtmlHead';
import BreadcrumbList from 'components/breadcrumb-list/BreadcrumbList';

const SaleEntry = () => {
  const title = 'Sale Entry';
  const description = 'Elearning Portal Quiz List Page';

  const breadcrumbs = [{ to: '', text: 'Home' }];

  // Sample data
  const data = [
    {
      invoiceDate: '12/6/2024',
      partyName: 'Exor Medical Systems',
      invoiceNumber: '2314/24-24',
      products: [
        { productName: 'Non Vented Bipap Mask MSI', quantity: 10, rate: 725, pAndF: 100, total: 7350 },
        { productName: 'Oxygen Concentrator', quantity: 5, rate: 1500, pAndF: 200, total: 8500 },
      ],
    },
    {
      invoiceDate: '13/6/2024',
      partyName: 'HealthCorp Ltd.',
      invoiceNumber: '2315/24-25',
      products: [
        { productName: 'Ventilator Mask', quantity: 15, rate: 800, pAndF: 120, total: 12400 },
        { productName: 'Nebulizer Kit', quantity: 20, rate: 120, pAndF: 30, total: 2460 },
        { productName: 'Ventilator Mask', quantity: 15, rate: 800, pAndF: 120, total: 12400 },
        { productName: 'Nebulizer Kit', quantity: 20, rate: 120, pAndF: 30, total: 2460 },
        { productName: 'Ventilator Mask', quantity: 15, rate: 800, pAndF: 120, total: 12400 },
        { productName: 'Nebulizer Kit', quantity: 20, rate: 120, pAndF: 30, total: 2460 },
      ],
    },
    {
      invoiceDate: '13/6/2024',
      partyName: 'HealthCorp Ltd.',
      invoiceNumber: '2315/24-25',
      products: [
        { productName: 'Ventilator Mask', quantity: 15, rate: 800, pAndF: 120, total: 12400 },
        { productName: 'Nebulizer Kit', quantity: 20, rate: 120, pAndF: 30, total: 2460 },
        { productName: 'Ventilator Mask', quantity: 15, rate: 800, pAndF: 120, total: 12400 },
        { productName: 'Nebulizer Kit', quantity: 20, rate: 120, pAndF: 30, total: 2460 },
        { productName: 'Ventilator Mask', quantity: 15, rate: 800, pAndF: 120, total: 12400 },
        { productName: 'Nebulizer Kit', quantity: 20, rate: 120, pAndF: 30, total: 2460 },
      ],
    },
    {
      invoiceDate: '13/6/2024',
      partyName: 'HealthCorp Ltd.',
      invoiceNumber: '2315/24-25',
      products: [
        { productName: 'Ventilator Mask', quantity: 15, rate: 800, pAndF: 120, total: 12400 },
        { productName: 'Nebulizer Kit', quantity: 20, rate: 120, pAndF: 30, total: 2460 },
        { productName: 'Ventilator Mask', quantity: 15, rate: 800, pAndF: 120, total: 12400 },
        { productName: 'Nebulizer Kit', quantity: 20, rate: 120, pAndF: 30, total: 2460 },
        { productName: 'Ventilator Mask', quantity: 15, rate: 800, pAndF: 120, total: 12400 },
        { productName: 'Nebulizer Kit', quantity: 20, rate: 120, pAndF: 30, total: 2460 },
      ],
    },
    {
      invoiceDate: '13/6/2024',
      partyName: 'HealthCorp Ltd.',
      invoiceNumber: '2315/24-25',
      products: [
        { productName: 'Ventilator Mask', quantity: 15, rate: 800, pAndF: 120, total: 12400 },
        { productName: 'Nebulizer Kit', quantity: 20, rate: 120, pAndF: 30, total: 2460 },
        { productName: 'Ventilator Mask', quantity: 15, rate: 800, pAndF: 120, total: 12400 },
        { productName: 'Nebulizer Kit', quantity: 20, rate: 120, pAndF: 30, total: 2460 },
        { productName: 'Ventilator Mask', quantity: 15, rate: 800, pAndF: 120, total: 12400 },
        { productName: 'Nebulizer Kit', quantity: 20, rate: 120, pAndF: 30, total: 2460 },
      ],
    },
    {
      invoiceDate: '13/6/2024',
      partyName: 'HealthCorp Ltd.',
      invoiceNumber: '2315/24-25',
      products: [
        { productName: 'Ventilator Mask', quantity: 15, rate: 800, pAndF: 120, total: 12400 },
        { productName: 'Nebulizer Kit', quantity: 20, rate: 120, pAndF: 30, total: 2460 },
        { productName: 'Ventilator Mask', quantity: 15, rate: 800, pAndF: 120, total: 12400 },
        { productName: 'Nebulizer Kit', quantity: 20, rate: 120, pAndF: 30, total: 2460 },
        { productName: 'Ventilator Mask', quantity: 15, rate: 800, pAndF: 120, total: 12400 },
        { productName: 'Nebulizer Kit', quantity: 20, rate: 120, pAndF: 30, total: 2460 },
      ],
    },
    {
      invoiceDate: '13/6/2024',
      partyName: 'HealthCorp Ltd.',
      invoiceNumber: '2315/24-25',
      products: [
        { productName: 'Ventilator Mask', quantity: 15, rate: 800, pAndF: 120, total: 12400 },
        { productName: 'Nebulizer Kit', quantity: 20, rate: 120, pAndF: 30, total: 2460 },
        { productName: 'Ventilator Mask', quantity: 15, rate: 800, pAndF: 120, total: 12400 },
        { productName: 'Nebulizer Kit', quantity: 20, rate: 120, pAndF: 30, total: 2460 },
        { productName: 'Ventilator Mask', quantity: 15, rate: 800, pAndF: 120, total: 12400 },
        { productName: 'Nebulizer Kit', quantity: 20, rate: 120, pAndF: 30, total: 2460 },
      ],
    },
    {
      invoiceDate: '13/6/2024',
      partyName: 'HealthCorp Ltd.',
      invoiceNumber: '2315/24-25',
      products: [
        { productName: 'Ventilator Mask', quantity: 15, rate: 800, pAndF: 120, total: 12400 },
        { productName: 'Nebulizer Kit', quantity: 20, rate: 120, pAndF: 30, total: 2460 },
        { productName: 'Ventilator Mask', quantity: 15, rate: 800, pAndF: 120, total: 12400 },
        { productName: 'Nebulizer Kit', quantity: 20, rate: 120, pAndF: 30, total: 2460 },
        { productName: 'Ventilator Mask', quantity: 15, rate: 800, pAndF: 120, total: 12400 },
        { productName: 'Nebulizer Kit', quantity: 20, rate: 120, pAndF: 30, total: 2460 },
      ],
    },
    {
      invoiceDate: '13/6/2024',
      partyName: 'HealthCorp Ltd.',
      invoiceNumber: '2315/24-25',
      products: [
        { productName: 'Ventilator Mask', quantity: 15, rate: 800, pAndF: 120, total: 12400 },
        { productName: 'Nebulizer Kit', quantity: 20, rate: 120, pAndF: 30, total: 2460 },
        { productName: 'Ventilator Mask', quantity: 15, rate: 800, pAndF: 120, total: 12400 },
        { productName: 'Nebulizer Kit', quantity: 20, rate: 120, pAndF: 30, total: 2460 },
        { productName: 'Ventilator Mask', quantity: 15, rate: 800, pAndF: 120, total: 12400 },
        { productName: 'Nebulizer Kit', quantity: 20, rate: 120, pAndF: 30, total: 2460 },
      ],
    },
    {
      invoiceDate: '13/6/2024',
      partyName: 'HealthCorp Ltd.',
      invoiceNumber: '2315/24-25',
      products: [
        { productName: 'Ventilator Mask', quantity: 15, rate: 800, pAndF: 120, total: 12400 },
        { productName: 'Nebulizer Kit', quantity: 20, rate: 120, pAndF: 30, total: 2460 },
        { productName: 'Ventilator Mask', quantity: 15, rate: 800, pAndF: 120, total: 12400 },
        { productName: 'Nebulizer Kit', quantity: 20, rate: 120, pAndF: 30, total: 2460 },
        { productName: 'Ventilator Mask', quantity: 15, rate: 800, pAndF: 120, total: 12400 },
        { productName: 'Nebulizer Kit', quantity: 20, rate: 120, pAndF: 30, total: 2460 },
      ],
    },
    {
      invoiceDate: '13/6/2024',
      partyName: 'HealthCorp Ltd.',
      invoiceNumber: '2315/24-25',
      products: [
        { productName: 'Ventilator Mask', quantity: 15, rate: 800, pAndF: 120, total: 12400 },
        { productName: 'Nebulizer Kit', quantity: 20, rate: 120, pAndF: 30, total: 2460 },
        { productName: 'Ventilator Mask', quantity: 15, rate: 800, pAndF: 120, total: 12400 },
        { productName: 'Nebulizer Kit', quantity: 20, rate: 120, pAndF: 30, total: 2460 },
        { productName: 'Ventilator Mask', quantity: 15, rate: 800, pAndF: 120, total: 12400 },
        { productName: 'Nebulizer Kit', quantity: 20, rate: 120, pAndF: 30, total: 2460 },
      ],
    },
    // Add more sample data as needed
  ];


  // State for search query
  const [searchQuery, setSearchQuery] = useState('');

  // Filter data based on search query
  const filteredData = data.filter(invoice =>
    invoice.invoiceDate.toLowerCase().includes(searchQuery.toLowerCase()) ||
    invoice.partyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    invoice.invoiceNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
    invoice.products.some(product =>
      product.productName.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  return (
    <>
      <HtmlHead title={title} description={description} />
      {/* Title and Top Buttons Start */}
      <div className="page-title-container">
        <Row>
          {/* Title Start */}
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
          {/* Search Bar */}
          {/* Title End */}
        </Row>
      </div>
      {/* Title and Top Buttons End */}

      {/* Header Row */}
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

      {/* Map through the filtered data and render cards */}
      <Row className="g-3 mb-5">
        {filteredData.map((invoice, index) => (
          <Col sm="12" lg="12" key={index}>
            <Card>
              <Card.Body>
                {invoice.products.length > 0 && (
                  <>
                    {/* Display the first product in the header-like row */}
                    <Row className="g-0 mb-2">
                      <Col xs="1" className="text-start">
                        <div className="lh-1-5 mb-0">{invoice.invoiceDate}</div> {/* Invoice Date */}
                      </Col>
                      <Col xs="3" className="text-start">
                        <div className="lh-1-5 mb-0">{invoice.partyName}</div> {/* Party Name */}
                      </Col>
                      <Col xs="1" className="text-start">
                        <div className="lh-1-5 mb-0">{invoice.invoiceNumber}</div> {/* Invoice Number */}
                      </Col>
                      <Col xs="3" className="text-start">
                        <div className="lh-1-5 mb-0">{invoice.products[0].productName}</div> {/* Product Name */}
                      </Col>
                      <Col xs="1" className="text-center">
                        <div className="lh-1-5 mb-0">{invoice.products[0].quantity}</div> {/* Quantity */}
                      </Col>
                      <Col xs="1" className="text-center">
                        <div className="lh-1-5 mb-0">{invoice.products[0].rate}</div> {/* Rate */}
                      </Col>
                      <Col xs="1" className="text-center">
                        <div className="lh-1-5 mb-0">{invoice.products[0].pAndF}</div> {/* P & F */}
                      </Col>
                      <Col xs="1" className="text-center">
                        <div className="lh-1-5 mb-0">{invoice.products[0].total}</div> {/* Total */}
                      </Col>
                    </Row>
                    {/* Display the rest of the products */}
                    {invoice.products.slice(1).map((product, i) => (
                      <Row key={i} className="g-0 mb-2">
                        <Col xs="1" className="text-start" />
                        <Col xs="3" className="text-start" />
                        <Col xs="1" className="text-start" />
                        <Col xs="3" className="text-start">
                          <div className="lh-1-5 mb-0">{product.productName}</div> {/* Product Name */}
                        </Col>
                        <Col xs="1" className="text-center">
                          <div className="lh-1-5 mb-0">{product.quantity}</div> {/* Quantity */}
                        </Col>
                        <Col xs="1" className="text-center">
                          <div className="lh-1-5 mb-0">{product.rate}</div> {/* Rate */}
                        </Col>
                        <Col xs="1" className="text-center">
                          <div className="lh-1-5 mb-0">{product.pAndF}</div> {/* P & F */}
                        </Col>
                        <Col xs="1" className="text-center">
                          <div className="lh-1-5 mb-0">{product.total}</div> {/* Total */}
                        </Col>
                      </Row>
                    ))}
                  </>
                )}
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default SaleEntry;
