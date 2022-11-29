import React, { useState } from "react";
import Content from "../components/content/Content";
import Layout from "../layout/Layout";
import moment from "moment";
import PageHeader from "../components/header/PageHeader";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";

export default function Demo() {
  const [date, setDate] = useState(new Date());

  console.log(moment(date).format("YYYY-DD-MM"));

  return (
    <>
      <Layout>
        <PageHeader />
        <Content>
          <Datetime
            timeFormat={false}
            onChange={(e) => {
              setDate(e._d);
            }}
          />
        </Content>
      </Layout>
    </>
  );
}
