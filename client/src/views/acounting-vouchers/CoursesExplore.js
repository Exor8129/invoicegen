import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Row, Col, Card, Badge } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import HtmlHead from 'components/html-head/HtmlHead';
import BreadcrumbList from 'components/breadcrumb-list/BreadcrumbList';
import CsLineIcons from 'cs-line-icons/CsLineIcons';
import Invoice from './invoice/invoice';
import TicketPopup from './ticketpopup';
import './CoursesExplore.css';

const CoursesExplore = () => {
  const title = 'Sales';
  const description = 'Invoice Generator Sales Page';
  const [showPopup, setShowPopup] = useState(false);
  const [tickets, setTickets] = useState([]);
  const [highestTicketNumber, setHighestTicketNumber] = useState(null);

  const breadcrumbs = [{ to: '', text: 'Home' }];

  useEffect(() => {
    axios
      .get('http://localhost:3001/tickets')
      .then((response) => {
        const sortedTickets = response.data.sort((a, b) => b.ticketNumber - a.ticketNumber);
        setTickets(sortedTickets);
        const highestNumber = sortedTickets.length > 0 ? sortedTickets[0].ticketNumber : 0;
        setHighestTicketNumber(highestNumber);
      })
      .catch((error) => {
        console.error('Error fetching tickets:', error);
      });
  }, []);

  const handleTicketClick = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  // Get the top 4 tickets
  const topTickets = tickets.slice(0, 4);

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
          <span className="align-bottom" onClick={handleTicketClick}>
            New Ticket
          </span>
        </div>
        <NavLink to="/courses/list" className="btn btn-icon btn-icon-end btn-xs btn-background p-0">
          <span className="align-bottom">View All</span> <CsLineIcons icon="chevron-right" className="align-middle" size="12" />
        </NavLink>
      </div>
      <Row className="row-cols-1 row-cols-sm-2 row-cols-lg-4 g-3 mb-5">
        {topTickets.length > 0 ? (
          topTickets.map((ticket) => (
            <Col key={ticket.ticketNumber}>
              <Card className="cards h-100 position-relative">
                {/* Unique Ticket Number */}
                <div className="position-relative">
                  {/* Container for badges */}
                  <div className="d-flex justify-content-between align-items-center p-3">
                    {/* Badge on the left */}
                    <span className="badge bg-danger">Status : {ticket.ticketStatus}</span>

                    {/* Badge on the right */}
                    <span className="badge bg-primary">Ticket #{ticket.ticketNumber}</span>
                  </div>
                </div>

                <Card.Body className="text-center">
                  <h className="pname ">
                    <NavLink to="/courses/detail" className="body">
                      Party Name: <strong>{ticket.partyName}</strong>
                    </NavLink>
                  </h>

                  <div className="products">
                    <h className="heading">Products</h>
                    <ol className="list-group">
                      {ticket.products.map((product, index) => (
                        <li key={index} style={{ marginBottom: '0.1rem', textAlign: 'left' }}>
                          <strong className="qty">{product.productName}:</strong> {product.quantity} Nos
                        </li>
                      ))}
                    </ol>
                  </div>
                </Card.Body>

                <Card.Footer className="footer">
                  <div className="card-footer">
                    <h className="headings">Assigned Person:</h>
                    <p className="assinee">
                      <strong>{ticket.assignee}</strong>
                    </p>
                  </div>
                  <div className="buttons">
                    <button type="button" className="btn btn-primary btn-sm">
                      Print
                    </button>
                  </div>
                </Card.Footer>
              </Card>
            </Col>
          ))
        ) : (
          <Col>No tickets available</Col>
        )}
        {showPopup && (
          <TicketPopup
            onClose={handleClosePopup}
            partyName={topTickets.length > 0 ? topTickets[0].partyName : ''}
            products={topTickets.length > 0 ? topTickets[0].products : []}
            assignee={topTickets.length > 0 ? topTickets[0].assignee : ''}
            highestTicketNumber={highestTicketNumber}
          />
        )}
      </Row>
      {/* Popular End */}

      {/* Trending Start */}
      <div className="d-flex justify-content-between">
        <h2 className="small-title">New Invoice</h2>
      </div>
      <Row className="row-cols-1 g-3 mb-5">
        <Col>
          <Card className="invoice-main h-100" style={{ backgroundColor: '#fff', color: '#fff' }}>
            <Card.Body className="p-5">
            <div className='button-panel'><button type="button"className="btn btn-primary no-print">Print Invoice</button></div>
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
