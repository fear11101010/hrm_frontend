import React, { useState } from "react";
import Content from "../components/content/Content";
import Layout from "../layout/Layout";
import moment from "moment";
import PageHeader from "../components/header/PageHeader";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function Demo() {
  const [date, setDate] = useState(new Date());

  console.log(moment(date).format("YYYY-DD-MM"));

  return (
    <>
      <Layout>
        <PageHeader />
        <Content>
          <DatePicker selected={date} className="form-control" onChange={(date) => setDate(date)} />
        </Content>
      </Layout>
    </>
  );
}
