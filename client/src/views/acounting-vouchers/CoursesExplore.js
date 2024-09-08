import React, { useState } from 'react'; // Import React only once
import { Row, Col, Card, Badge } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import Rating from 'react-rating';
import HtmlHead from 'components/html-head/HtmlHead';
import BreadcrumbList from 'components/breadcrumb-list/BreadcrumbList';
import CsLineIcons from 'cs-line-icons/CsLineIcons';
import Header from './invoice/header';
import ItemTable from './invoice/content';
import FooterTable from './invoice/footer';
import Invoice from './invoice/invoice';
import TicketPopup from './ticketpopup';

const CoursesExplore = () => {
  const title = 'Sales';
  const description = 'Invoice Generator Sales Page';
  const [showPopup, setShowPopup] = useState(false);

  const breadcrumbs = [{ to: '', text: 'Home' }];
  const ticketData = {
    partyName: 'Gracemed',
    products: [
      
    ],
    assignee: 'John Doe',
  };

  const handleTicketClick = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };
  return (
    <>
      <HtmlHead title={title} description={description} />
      {/* Title and Top Buttons Start */}
      <div className="page-title-container">
        <Row>
          {/* Title Start */}
          <Col md="7">
            <h1 className="mb-0 pb-0 display-4">{title}</h1>
            <BreadcrumbList items={breadcrumbs} />
          </Col>
          {/* Title End */}
        </Row>
      </div>
      {/* Title and Top Buttons End */}

      {/* Popular Start */}
      <div className="d-flex justify-content-between">
        <h2 className="small-title">Recent Tickets</h2>
        <div className="btn btn-icon btn-icon-end btn-xs btn-background p-0">
          <span className="align-bottom" onClick={handleTicketClick}>New Ticket</span>
        </div>
        <NavLink to="/courses/list" className="btn btn-icon btn-icon-end btn-xs btn-background p-0">
          <span className="align-bottom">View All</span> <CsLineIcons icon="chevron-right" className="align-middle" size="12" />
        </NavLink>
      </div>
      <Row className="row-cols-1 row-cols-sm-2 row-cols-lg-4 g-3 mb-5">
        <Col>
          <Card className="h-100 position-relative">
            {/* Unique Ticket Number */}
            <div className="position-absolute top-0 end-0 p-3">
              <span className="badge bg-primary">Ticket #12345</span>
            </div>

            <Card.Body className="text-center">
              <h5 className="heading mb-0">
                <NavLink to="/courses/detail" className="body-link stretched-link">
                  Party Name: <strong>Gracemed</strong>
                </NavLink>
              </h5>

              <div style={{ marginTop: '1rem' }}>
                <h6 style={{ textAlign: 'left' }} className="heading">
                  Products
                </h6>
                <ol style={{ listStylePosition: 'inside', paddingLeft: '0', margin: '0', textAlign: 'left' }} className="list-group">
                  {ticketData.products.map(
                    (
                      products,
                      index // Updated to `products`
                    ) => (
                      <li key={index} style={{ marginBottom: '0.5rem', textAlign: 'left' }}>
                        <strong>{products.productName}:</strong> {products.qty} pcs
                      </li>
                    )
                  )}
                </ol>
              </div>
            </Card.Body>

            <Card.Footer className="border-0 pt-3 text-center">
              <h6 className="heading mb-2">Assigned Person:</h6>
              <p className="mb-0">
                <strong>John Doe</strong>
              </p>
            </Card.Footer>
          </Card>
        </Col>
        {showPopup && <TicketPopup onClose={handleClosePopup} partyName={ticketData.partyName} products={ticketData.products} assignee={ticketData.assignee} />}
      </Row>
      {/* Popular End */}

      {/* Trending Start */}
      <div className="d-flex justify-content-between">
        <h2 className="small-title">New Invoice</h2>
      </div>
      <Row className="row-cols-1 g-3 mb-5">
        <Col>
          <Card className="h-100" style={{ backgroundColor: '#fff', color: '#fff' }}>
            <Card.Body className="p-5">
              {/* Here you can place your invoice UI content */}
              <div className="d-flex flex-column align-items-center">
                <h3 className="mb-4">Invoice</h3>
                {/* Add your invoice content here */}
                <div className="border border-light rounded p-4" style={{ width: '210mm', height: '297mm' }}>
                  <div>
                    <Invoice />
                  </div>
                  <h5 className="text-light">Invoice Content</h5>
                  {/* Additional invoice details */}
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      {/* Trending End */}

      {/* Paths Start */}
      <h2 className="small-title">Paths</h2>
      <Row className="g-3 row-cols-1 row-cols-xl-2 row-cols-xxl-4 mb-5">
        <Col>
          <Card className="h-100">
            <Card.Body>
              <div className="text-center">
                <img src="/img/illustration/icon-performance.webp" className="theme-filter" alt="performance" />
                <div className="d-flex flex-column sh-5">
                  <NavLink to="/paths/list" className="heading stretched-link">
                    Becoming a Head Chef
                  </NavLink>
                </div>
              </div>
              <div className="text-muted">Sweet roll apple pie tiramisu bonbon sugar plum muffin sesame snaps chocolate. Lollipop halvah powder.</div>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card className="h-100">
            <Card.Body>
              <div className="text-center">
                <img src="/img/illustration/icon-experiment.webp" className="theme-filter" alt="performance" />
                <div className="d-flex flex-column sh-5">
                  <NavLink to="/paths/list" className="heading stretched-link">
                    Cooking Chemistry
                  </NavLink>
                </div>
              </div>
              <div className="text-muted">Chocolate cake marshmallow bear claw sweet. Apple pie macaroon sesame snaps candy jelly pudding.</div>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card className="h-100">
            <Card.Body>
              <div className="text-center">
                <img src="/img/illustration/icon-storage.webp" className="theme-filter" alt="performance" />
                <div className="d-flex flex-column sh-5">
                  <NavLink to="/paths/list" className="heading stretched-link">
                    Inventory Management
                  </NavLink>
                </div>
              </div>
              <div className="text-muted">Cheesecake chocolate carrot cake pie lollipop lemon drops toffee lollipop.</div>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card className="h-100">
            <Card.Body>
              <div className="text-center">
                <img src="/img/illustration/icon-accounts.webp" className="theme-filter" alt="performance" />
                <div className="d-flex flex-column sh-5">
                  <NavLink to="/paths/list" className="heading stretched-link">
                    Local Food Master
                  </NavLink>
                </div>
              </div>
              <div className="text-muted">Cake tart apple pie bear bonbon sugar plum muffin sesame snaps sweet roll gingerbread bonbon sugar.</div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      {/* Paths End */}

      {/* Sale Start */}
      <h2 className="small-title">Sale</h2>
      <Row className="g-3">
        <Col lg="6" className="position-relative">
          <Badge bg="primary" className="me-1 position-absolute e-4 t-n2 z-index-1">
            -30%
          </Badge>
          <Card className="sh-24 hover-img-scale-up">
            <img src="/img/banner/cta-horizontal-short-1.webp" className="card-img h-100 scale" alt="card image" />
            <div className="card-img-overlay d-flex flex-column justify-content-between bg-transparent">
              <div className="cta-3 mb-3 text-black w-75 w-md-50">Introduction to Sandwich Making</div>
              <div>
                <NavLink to="/courses/detail" className="btn btn-icon btn-icon-start btn-outline-primary stretched-link">
                  <CsLineIcons icon="chevron-right" /> <span>View</span>
                </NavLink>
              </div>
            </div>
          </Card>
        </Col>
        <Col lg="6" className="position-relative">
          <Badge bg="primary" className="me-1 position-absolute e-4 t-n2 z-index-1">
            -15%
          </Badge>
          <Card className="sh-24 hover-img-scale-up">
            <img src="/img/banner/cta-horizontal-short-2.webp" className="card-img h-100 scale" alt="card image" />
            <div className="card-img-overlay d-flex flex-column justify-content-between bg-transparent">
              <div className="cta-3 mb-3 text-black w-75 w-md-50">Effects of Natural Ingredients</div>
              <div>
                <NavLink to="/courses/detail" className="btn btn-icon btn-icon-start btn-outline-primary stretched-link">
                  <CsLineIcons icon="chevron-right" /> <span>View</span>
                </NavLink>
              </div>
            </div>
          </Card>
        </Col>
      </Row>
      {/* Sale End */}
    </>
  );
};

export default CoursesExplore;
