import React, { useState } from "react";
import Content from "../components/content/Content";
import Layout from "../layout/Layout";
import moment from "moment";
import { Accordion } from "react-bootstrap";

export default function Demo() {
  const [date, setDate] = useState("");

  console.log(moment(date).format("YYYY-DD-MM"));

  return (
    <>
      <Layout>
        <Content>
          <Accordion className="mb-3">
            <Accordion.Item eventKey="0">
              <Accordion.Header as={"div"}>
                <div>
                  <h3 className="header-title mb-0">3. INNOVATION</h3>
                  <h6 className="header-pretitle mb-0">(New ideas and implementation)</h6>
                </div>
              </Accordion.Header>
              <Accordion.Body></Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Content>
      </Layout>
    </>
  );
}
