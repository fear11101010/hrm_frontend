import { Button, Col, Container, Image, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { LOGIN_PAGE } from "../../utils/routes/app_routes/APP_ROUTES";
import "./landing.css";
import NavbarPublic from "./Navbar";
import Lottie from "lottie-react";
import landingAnimation from "./hr-illustration.json";
import { GET_TOKEN, USER_INFO } from "../../utils/session/token";
import InnerLanding from "../InnerLanding/InnerLanding";
export default function Landing() {
  const token = GET_TOKEN();
  return token ? (
    <InnerLanding />
  ) : (
    <div className="landing" style={{ backgroundColor: "#fff" }}>
      <div>
        <NavbarPublic />
        <Container>
          <Row className="content" style={{ height: "85vh" }}>
            <Col sm="12" md={{ span: 6, order: 0 }} xs={{ order: 1 }}>
              <h1 className="mb-3"> DataSoft HR & Admin Ticketing System</h1>
              <h4 className="mb-4" style={{ fontWeight: 400 }}>
                DataSoft HR & Admin Ticketing System is a robust platform for tackling internal admin and HR issues. Through
                this system, users can generate tickets on Admin and HR issues and receive prompt service
              </h4>
            </Col>
            <Col sm="12" md={{ span: 6, order: 0 }} xs={{ order: 0 }} className="text-end">
              <Image src={process.env.PUBLIC_URL + "ticketing.jpg"} />
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}

{
  // <div className="landing">
  //   <div>
  //     <NavbarPublic />
  //     <Container>
  //       <Row className="content">
  //         <Col sm="12" md={{ span: 5, order: 0 }} xs={{ order: 1 }}>
  //           <h1 className="mb-3">
  //             Performance Appraisals <br /> For Human Resources
  //           </h1>
  //           <h4 className="mb-4" style={{ fontWeight: 400 }}>
  //             Evaluate employee performance by combining a multitude of employee performance parameters, whether
  //             quantitative, qualitative or both, in order to optimize your performance management process while reducing
  //             rater bias.
  //           </h4>
  //         </Col>
  //         <Col sm="12" md={{ span: 7, order: 0 }} xs={{ order: 0 }}>
  //           <Lottie animationData={landingAnimation} style={{ width: "90%", margin: "auto" }} />
  //         </Col>
  //       </Row>
  //     </Container>
  //   </div>
  // </div>;
}
