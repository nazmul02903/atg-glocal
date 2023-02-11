import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  Card,
  Button,
  CardImg,
  CardTitle,
  CardBody,
  Container,
  Row,
  Col,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import "../../assets/youtube.css";
import "../../assets/whatsapp.css";
import imgJob from "../../assets/Icons/reports.svg";
import imgEvents from "../../assets/Icons/events.svg";
import imgRFP from "../../assets/Icons/RFP.svg";
import imgFunding from "../../assets/Icons/fundig-updates.svg";
import imgWorkshop from "../../assets/Icons/workshop.svg";
import imgAwards from "../../assets/Icons/reports.svg";
import EventAwardIcon from "../../assets/event_awards.svg";
import EventWorkshopIcon from "../../assets/event_workshop.svg";
import EventExhibitionIcon from "../../assets/event_exhibition.svg";
import YouTube from "../../assets/YouTube.png";
import Popup from "../../helpers/popup";
import "../../assets/popup.css";
// import imgEvents from "../../assets/Icons/events.svg";
// import imgRFP from "../../assets/Icons/RFP.svg";
// import imgFunding from "../../assets/Icons/Fundings.svg";
// import imgWorkshop from "../../assets/Icons/workshop.svg";
// import imgAwards from "../../assets/Icons/awards.svg";

const HomeAdmin = (props) => {
  // const [dropdownOpen, setDropdownOpen] = useState(false);
  // const { paidModulesBean } = props;
  const paidModulesBean = []
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen((prevState) => !prevState);

  function getPaidModule(id) {
    let data;
    const allowedSection = paidModulesBean.filter(
      (paidModulesBean) => paidModulesBean.active === true
    );
    const section = allowedSection.find(
      (paidModulesBean) => paidModulesBean.id === id
    );

    if (section) {
      data = {
        expiryDate: section.expiryDateText,
        packageMode: section.premium,
      };

      return data;
    }
    return {
      expiryDate: "",
      packageMode: "",
    };
  }
  // const toggle = () => setDropdownOpen((prevState) => !prevState);
  return (
    <Container>
      <Row>
        <Col xs={12} sm={3}>
          <Card className="custom-card">
            <CardImg
              className="mx-auto"
              src={imgJob}
              alt="Card image cap"
              style={{ width: "50%", height: "100px" }}
            />
            <CardBody className="text-center">
              <CardTitle tag="h5">Review Jobs</CardTitle>
              <Link to="/admin/reviewJob">
                <Button className="mt-3" color="primary">
                  Review
                </Button>
              </Link>
            </CardBody>
          </Card>
        </Col>
        {/* Review Events Card */}
        <Col xs={12} sm={3}>
          <Card className="custom-card">
            <CardImg
              className="mx-auto"
              src={imgJob}
              alt="Card image cap"
              style={{ width: "50%", height: "100px" }}
            />
            <CardBody className="text-center">
              <CardTitle tag="h5">Review Events</CardTitle>
              <Link to="/admin/reviewEvent">
                <Button className="mt-3" color="primary">
                  Review
                </Button>
              </Link>
            </CardBody>
          </Card>
        </Col>
        {/* Review Funding Update Card */}
        <Col xs={12} sm={3}>
          <Card className="custom-card">
            <CardImg
              className="mx-auto"
              src={imgJob}
              alt="Card image cap"
              style={{ width: "50%", height: "100px" }}
            />
            <CardBody className="text-center">
              <CardTitle tag="h5">Review Funding</CardTitle>
              <Link to="/admin/reviewFund">
                <Button className="mt-3" color="primary">
                  Review
                </Button>
              </Link>
            </CardBody>
          </Card>
        </Col>
        <Col xs={12} sm={3}>
          <Card className="custom-card">
            <CardImg
              className="mx-auto"
              src={imgJob}
              alt="Card image cap"
              style={{ width: "50%", height: "100px" }}
            />
            <CardBody className="text-center">
              <CardTitle tag="h5">News</CardTitle>
              <Link to="/admin/createNews">
                <Button className="mt-3" color="primary">
                  Create
                </Button>
              </Link>
            </CardBody>
          </Card>
        </Col>

        <Col xs={12} sm={3}>
          <Card className="custom-card">
            <CardImg
              className="mx-auto"
              src={imgJob}
              alt="Card image cap"
              style={{ width: "50%", height: "100px" }}
            />
            <CardBody className="text-center">
              <CardTitle tag="h5">Manage Users</CardTitle>
              <Link to="/admin/manageUsers">
                <Button className="mt-3" color="primary">
                  Explore
                </Button>
              </Link>
            </CardBody>
          </Card>
        </Col>

        <Col xs={12} sm={3}>
          <Card className="custom-card">
            <CardImg
              className="mx-auto"
              src={imgJob}
              alt="Card image cap"
              style={{ width: "50%", height: "100px" }}
            />
            <CardBody className="text-center">
              <CardTitle tag="h5">GC List</CardTitle>
              <Link to="/admin/gcData">
                <Button className="mt-3" color="primary">
                  Explore
                </Button>
              </Link>
            </CardBody>
          </Card>
        </Col>
        <Col xs={12} sm={3}>
          <Card className="custom-card">
            <CardImg
              className="mx-auto"
              src={imgJob}
              alt="Card image cap"
              style={{ width: "50%", height: "100px" }}
            />
            <CardBody className="text-center">
              <CardTitle tag="h5">User List</CardTitle>
              <Link to="/admin/newUserList">
                <Button className="mt-3" color="primary">
                  Search
                </Button>
              </Link>
            </CardBody>
          </Card>
        </Col>

        {/* <Col xs={12} sm={3}>
          <Card className="custom-card">
            <CardImg
              className="mx-auto"
              src={imgJob}
              alt="Card image cap"
              style={{ width: "50%", height: "100px" }}
            />
            <CardBody className="text-center">
              <CardTitle tag="h5">Review Events</CardTitle>
              <Link to="/admin/reviewEvent">
                <Button className="mt-3" color="primary">
                  Review
                </Button>
              </Link>
            </CardBody>
          </Card>
        </Col>
        <Col xs={12} sm={3}>
          <Card className="custom-card">
            <CardImg
              className="mx-auto"
              src={imgJob}
              alt="Card image cap"
              style={{ width: "50%", height: "100px" }}
            />
            <CardBody className="text-center">
              <CardTitle tag="h5">Review Funding</CardTitle>
              <Link to="/admin/reviewFund">
                <Button className="mt-3" color="primary">
                  Review
                </Button>
              </Link>
            </CardBody>
          </Card>
        </Col> */}
      
        <Col xs={12} sm={3}>
          {/* <Card className="custom-card">
            <CardImg
              className="mx-auto"
              src={imgJob}
              alt="Card image cap"
              style={{ width: "50%", height: "100px" }}
            />
            <CardBody className="text-center">
              <CardTitle tag="h5">User List</CardTitle>
              <Link to="/admin/dashboard/events">
                <Button className="mt-3" color="primary">
                  dashboard
                </Button>
              </Link>
            </CardBody>
          </Card> */}
        </Col>
        <Col xs={12} sm={3}>
          <Card
            className="custom-card"
          >
            <CardImg
              className="mx-auto"
              src={imgJob}
              alt="Card image cap"
              style={{ width: "50%", height: "81px" }}
            />
            <CardBody className="text-center">
              <CardTitle>
                <h6>Lets Start Posting a Job</h6>
              </CardTitle>

              <Button
                className="mt-2"
                color="primary"
                style={{ textDecoration: "none" }}
              >
                {" "}
                <Link
                  to={{
                    pathname: "/user/create/job",
                    state: {
                      expiryText: getPaidModule("1").expiryDate,
                      package: getPaidModule("1").packageMode,
                    },
                  }}
                  style={{ textDecoration: "none" }}
                >
                  Create
                </Link>
              </Button>
            </CardBody>
          </Card>
        </Col>
        <Col xs={12} sm={3}>
          <Card
            className="custom-card">
            <CardImg
              className="mx-auto"
              src={imgEvents}
              alt="Card image cap"
              style={{ width: "50%", height: "81px" }}
            />
            <CardBody className="text-center">
              <CardTitle>
                <h6>Create Event, Workshop ...</h6>
              </CardTitle>
              <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                <DropdownToggle caret color="primary" className="mt-2">
                  Create
                </DropdownToggle>
                <DropdownMenu style={{ width: "270px" }}>
                  {/* <DropdownItem disabled={isActive("2")}> */}
                  <DropdownItem className="py-2" >
                    <Link
                      to={{
                        pathname: "/user/create/event/workshopEvent",
                        state: {
                          expiryText: getPaidModule("2").expiryDate,
                          package: getPaidModule("2").packageMode,
                        },
                      }}
                      style={{ textDecoration: "none" }}
                      className="flex items-center"
                    >
                      <div className="flex items-center mr-2">
                        <img
                          className="inline"
                          src={EventWorkshopIcon}
                          width="30"
                          alt="workshop"
                        />
                      </div>
                      Workshops and Training
                    </Link>
                  </DropdownItem>
                  {/* <DropdownItem disabled={isActive("3")}> */}
                  <DropdownItem className="py-2">
                    <Link
                      to={{
                        pathname: "/user/create/event/awardEvent",
                        state: {
                          expiryText: getPaidModule("3").expiryDate,
                          package: getPaidModule("3").packageMode,
                        },
                      }}
                      style={{ textDecoration: "none" }}
                      className="flex items-center"
                    >
                      <div className="flex items-center mr-2">
                        <img
                          className="inline"
                          src={EventAwardIcon}
                          width="30"
                          alt="workshop"
                        />
                      </div>
                      Awards/Competitions
                    </Link>
                  </DropdownItem>
                  {/* <DropdownItem disabled={isActive("4")}> */}
                  <DropdownItem className="py-2">
                    <Link
                      to={{
                        pathname: "/user/create/event/exhibitionEvent",
                        state: {
                          expiryText: getPaidModule("4").expiryDate,
                          package: getPaidModule("4").packageMode,
                        },
                      }}
                      style={{ textDecoration: "none" }}
                      className="flex items-center"
                    >
                      <div className="flex items-center mr-2">
                        <img
                          className="inline"
                          src={EventExhibitionIcon}
                          width="30"
                          alt="workshop"
                        />
                      </div>
                      Event/Exhibition{" "}
                    </Link>
                  </DropdownItem>


                  {/* <DropdownItem disabled={isActive("8")} className="mt-2"> */}
                  {/* <DropdownItem className="mt-2">
                    <Link
                      to={{
                        pathname: "/user/fundingUpdateNew",
                        state: {
                          expiryText: getPaidModule("8").expiryDate,
                          package: getPaidModule("8").packageMode,
                        },
                      }}
                      style={{ textDecoration: "none" }}
                    >
                      <span>
                        <img
                          className="inline"
                          src={imgAwards}
                          width="50"
                          alt="workshop"
                        />
                      </span>
                      Funding Update New
                    </Link>
                  </DropdownItem> */}
                </DropdownMenu>
              </Dropdown>
            </CardBody>
          </Card>
        </Col>
      
        <Col xs={12} sm={3}>
          <Card
            className="custom-card"
          // className={
          //   isActive("8") ? "disabled-card custom-card" : "custom-card"
          // }
          >
            <CardImg
              className="mx-auto"
              src={imgFunding}
              alt="Card image cap"
              style={{ width: "", height: "81px" }}
            />
            <CardBody className="text-center">
              <CardTitle>
                <h6>Create NGO search</h6>
              </CardTitle>

              <Button className="mt-2" color="primary">
                <Link
                  to={{
                    pathname: "/user/create/fundingUpdate",
                    state: {
                      expiryText: getPaidModule("8").expiryDate,
                      package: getPaidModule("8").packageMode,
                    },
                  }}
                  style={{ textDecoration: "none" }}
                >
                  Create{" "}
                </Link>
              </Button>
            </CardBody>
          </Card>
        </Col>
        </Row>
  
    </Container>
  );
};

export default HomeAdmin;
