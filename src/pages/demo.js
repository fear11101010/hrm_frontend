import React, { useState } from "react";
import Content from "../components/content/Content";
import Layout from "../layout/Layout";
import moment from "moment";

export default function Demo() {
  const [date, setDate] = useState("");

  console.log(moment(date).format("YYYY-DD-MM"));

  return (
    <>
      <Layout>
        <Content></Content>
      </Layout>
    </>
  );
}
