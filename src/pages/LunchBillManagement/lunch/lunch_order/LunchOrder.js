import React, { useEffect, useState } from "react";
import Content from "../../../../components/content/Content";
import PageHeader from "../../../../components/header/PageHeader";
import Layout from "../../../../layout/Layout";
import { Row, Col, Form, Table, Button, Modal } from "react-bootstrap";
import ReactSelect from "react-select";
import DatePicker from "../../../../components/date-picker/DatePicker";
import { USER_INFO } from "../../../../utils/session/token";
import moment from "moment";
import { DATE_FORMAT } from "../../../../utils/CONSTANT";
import { API } from "../../../../utils/axios/axiosConfig";
import {
  GUEST_LUNCH_POST,
  LUNCH_ORDER_POST,
  LUNCH_ORDER_RETRIEVE,
  MONTH_MAPPING,
  OFFICE_BRANCH,
  VENDOR_GET,
} from "../../../../utils/routes/api_routes/LUNCH_ROUTES";
import Loader from "../../../../components/loader/Loader";
import { error_alert, success_alert } from "../../../../components/alert/Alert";

export default function LunchOrder() {
  const user = USER_INFO();
  const [loading, setLoading] = useState(false);
  const [month, setMonth] = useState(moment().format("MMMM"));
  const [year, setYear] = useState(moment().format("YYYY"));
  const [ofc_branch, setOfc_branch] = useState([]);
  const [get_vendor, setget_vendor] = useState([]);
  const [selected_brach, setSelected_branch] = useState("");
  const [selected_vendor, setSelected_vendor] = useState("");
  const [retrieve_data, setRetrieve_data] = useState([]);
  const [bill_data, setBill_data] = useState([]);

  const [mapping, setMapping] = useState([]);
  const [resetmapping, setResetMapping] = useState([]);
  const [retrieve_menu_items, setRetrieve_menu_items] = useState([]);

  const [guest_modal, setGuest_modal] = useState(false);
  const [guest_date, setGuest_date] = useState(moment().format("YYYY-MM-DD"));
  const [guest_menu_selected, setGuest_menu_selected] = useState("");
  const [guest_isOfficial, setGuest_isOfficial] = useState(false);

  const lunchSelect = (e, date, index) => {
    mapping.map(function (d) {
      // if (d.idx === index) {
      if (d.date === moment(date).format("YYYY-MM-DD")) {
        let a = mapping.filter(function (val, i) {
          // return val.idx !== index;
          return val.date !== moment(date).format("YYYY-MM-DD");
        });
        setMapping(a);
      }
    });

    const selected_lunch = {
      date: moment(date).format("YYYY-MM-DD"),
      menu: parseInt(e.target.value),
      employee: user?.user_id,
      idx: index,
      subsidy: 5,
      month:
        month === "January"
          ? 1
          : month === "February"
          ? 2
          : month === "March"
          ? 3
          : month === "April"
          ? 4
          : month === "May"
          ? 5
          : month === "June"
          ? 6
          : month === "July"
          ? 7
          : month === "August"
          ? 8
          : month === "September"
          ? 9
          : month === "October"
          ? 10
          : month === "November"
          ? 11
          : month === "December"
          ? 12
          : "",
    };

    setMapping((prev) => [...prev, selected_lunch]);
  };

  // Get Branch
  useEffect(() => {
    setLoading(true);
    API.get(OFFICE_BRANCH)
      .then((res) => {
        setOfc_branch(res.data.data);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, []);

  //get vendor
  useEffect(() => {
    if (selected_brach !== "") {
      API.get(VENDOR_GET(selected_brach))
        .then((res) => {
          setget_vendor(res.data.data);
        })
        .catch((err) => console.log(err))
        .finally(() => setLoading(false));
    }
  }, [selected_brach]);

  //retrieve
  useEffect(() => {
    setLoading(true);
    API.get(
      LUNCH_ORDER_RETRIEVE(
        user?.user_id,
        month === "January"
          ? 1
          : month === "February"
          ? 2
          : month === "March"
          ? 3
          : month === "April"
          ? 4
          : month === "May"
          ? 5
          : month === "June"
          ? 6
          : month === "July"
          ? 7
          : month === "August"
          ? 8
          : month === "September"
          ? 9
          : month === "October"
          ? 10
          : month === "November"
          ? 11
          : month === "December"
          ? 12
          : "",
        year
      )
    )
      .then((res) => {
        if (res.data.statuscode === 200) {
          setRetrieve_data(res.data.data);
          let x = res.data.data.map((d) => ({
            date: moment(d?.date).format("YYYY-MM-DD"),
            menu: d.menu.id,
            employee: d.employee,
            subsidy: 5,
            month:
              month === "January"
                ? 1
                : month === "February"
                ? 2
                : month === "March"
                ? 3
                : month === "April"
                ? 4
                : month === "May"
                ? 5
                : month === "June"
                ? 6
                : month === "July"
                ? 7
                : month === "August"
                ? 8
                : month === "September"
                ? 9
                : month === "October"
                ? 10
                : month === "November"
                ? 11
                : month === "December"
                ? 12
                : "",
          }));
          setMapping(x);
          let a = res.data.data.map((d) => ({
            menu: d.menu.id,
            menu_name: d.menu.item,
            date: d.date,
          }));
          setRetrieve_menu_items(a);
          setBill_data(res.data);
        } else {
          setRetrieve_data([]);
        }
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, []);

  const handleMapping = (e) => {
    e.preventDefault();
    if (selected_vendor !== "" && selected_brach !== "") {
      let payload = {
        year: year,
        month:
          month === "January"
            ? 1
            : month === "February"
            ? 2
            : month === "March"
            ? 3
            : month === "April"
            ? 4
            : month === "May"
            ? 5
            : month === "June"
            ? 6
            : month === "July"
            ? 7
            : month === "August"
            ? 8
            : month === "September"
            ? 9
            : month === "October"
            ? 10
            : month === "November"
            ? 11
            : month === "December"
            ? 12
            : "",
        vendor: selected_vendor,
      };
      setLoading(true);
      API.post(MONTH_MAPPING, payload)
        .then((res) => {
          setResetMapping(res.data.data);
        })
        .catch((err) => console.log(err))
        .finally(() => setLoading(false));
    } else {
      error_alert("Please select Branch and Vendor");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    API.post(LUNCH_ORDER_POST, mapping)
      .then((res) => {
        if (res.data.statuscode === 200) {
          success_alert(res.data.message);
        } else {
          error_alert(res.data.message);
        }
      })
      .catch((err) => {})
      .finally(() => {
        setLoading(false);
      });
  };

  const handleGuestSubmit = (e) => {
    e.preventDefault();
    let payload = {
      isGuest: true,
      date: guest_date,
      menu: parseInt(guest_menu_selected),
      employee: user?.user_id,
      subsidy: guest_isOfficial ? 8 : 7,
    };

    setLoading(true);
    API.post(LUNCH_ORDER_POST, payload)
      .then((res) => {
        if (res.data.statuscode === 200) {
          success_alert(res.data.message);
        }
      })
      .catch((err) => {
        error_alert(err.response.data.message);
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
        setGuest_modal(false);
        setGuest_isOfficial(false);
      });
  };

  // BILL TABLE TEMPLATE
  const bill_table = () => {
    return (
      <Table size="sm" striped bordered>
        <thead>
          <tr>
            <th style={BILL_TH_STYLE}>Meal Self</th>
            <th style={BILL_TH_STYLE}>Meal Guest</th>
            <th style={BILL_TH_STYLE}>Self Bill</th>
            <th style={BILL_TH_STYLE}>Guest Bill</th>
            <th style={BILL_TH_STYLE}>Total</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={BILL_TD_STYLE}>{bill_data?.meal_self}</td>
            <td>{bill_data?.meal_guest}</td>
            <td>{bill_data?.self_bill}</td>
            <td>{bill_data?.guest_bill}</td>
            <td>{bill_data?.total_bill}</td>
          </tr>
        </tbody>
      </Table>
    );
  };

  return (
    <Layout>
      {loading && <Loader />}
      <PageHeader title={"Self Lunch Order Entry"} />

      <Content>
        {/* Top info part */}
        <Row>
          <Col sm="12" md="7" className="px-5 ms-auto mb-3">
            <h5 className="text-center">Monthly Bill: </h5>
            {resetmapping.length > 0 ? bill_table() : null}
          </Col>
          <hr />
          {/* Select options */}
          <Col sm="12" md="12">
            <Form>
              <Row>
                <Col sm="12" md="2">
                  <Form.Group className="mb-3">
                    <Form.Label>Year</Form.Label>
                    <DatePicker
                      dateFormat="YYYY"
                      placeholder={"select year"}
                      onChange={(e) => setYear(parseInt(moment(e?._d).format("YYYY")))}
                      value={year}
                    />
                  </Form.Group>
                </Col>
                <Col sm="12" md="2">
                  <Form.Group className="mb-3">
                    <Form.Label>Month</Form.Label>
                    <DatePicker
                      dateFormat="MM"
                      placeholder={"select month"}
                      onChange={(e) => {
                        setMonth(moment(e?._d).format("MMMM"));
                      }}
                      value={month}
                    />
                  </Form.Group>
                </Col>
                <Col sm="12" md="3">
                  <Form.Group className="mb-3">
                    <Form.Label>Branch</Form.Label>
                    <ReactSelect
                      options={ofc_branch?.map((d) => ({ label: d.name, value: d.id }))}
                      onChange={(e) => setSelected_branch(e.value)}
                    />
                  </Form.Group>
                </Col>
                <Col sm="12" md="3">
                  <Form.Group className="mb-3">
                    <Form.Label>Vendor</Form.Label>
                    <ReactSelect
                      options={get_vendor?.map((d) => ({ label: d.name, value: d.id }))}
                      onChange={(e) => setSelected_vendor(e.value)}
                    />
                  </Form.Group>
                </Col>
                <Col sm="12" md="2">
                  <Form.Label className="text-white mb-0">Vendor</Form.Label>
                  <Form.Group className="mb-3">
                    <Button onClick={handleMapping}>Save</Button>
                  </Form.Group>
                </Col>
              </Row>
            </Form>
          </Col>
          <hr />
        </Row>
        <div className="mt-4">
          {resetmapping.length > 0 ? (
            <div className="table-responsive">
              <div className="text-end">
                <Button
                  variant="info"
                  className="mb-3"
                  size="sm"
                  onClick={() => {
                    setGuest_modal(true);
                  }}
                >
                  Add Guest meal
                </Button>
              </div>
              <Table bordered className="mb-5">
                <thead>
                  <tr>
                    <th style={TH_STYLE}>#</th>
                    <th style={TH_STYLE}>Date {} </th>
                    <th style={TH_STYLE}>Day</th>
                    <th style={TH_STYLE}>Select Item</th>
                  </tr>
                </thead>
                <tbody>
                  {resetmapping?.map((d, i) => (
                    <tr>
                      <td>{i + 1}</td>
                      <td name="date">{moment(d?.date).format(DATE_FORMAT)}</td>
                      <td>{moment(d?.date).format("dddd")}</td>
                      <td>
                        <div className="d-flex justify-content-center align-items-center">
                          <Form.Select
                            onChange={(e) => {
                              if (moment(d?.date).isBefore(moment().format("YYYY-MM-DD"))) {
                                return;
                              } else {
                                lunchSelect(e, moment(d?.date).format(DATE_FORMAT), i);
                              }
                            }}
                            // value={retrieve_menu_items?.map((r) => (r.date === d.date ? r.menu : null)).find((k) => k)}
                            disabled={moment(d?.date).isBefore(moment().format("YYYY-MM-DD"))}
                          >
                            <option value="">-- select --</option>
                            <option selected>
                              {retrieve_menu_items?.map((r) => (r.date === d.date ? r.menu_name : null)).find((k) => k)}
                            </option>
                            {d.menu.map((menu, idx) => (
                              <>
                                <option value={menu?.id}>{menu?.items}</option>
                              </>
                            ))}
                          </Form.Select>
                          {/* <Button className="ms-2" size="sm" variant="danger" title="Delete">
                          <FaTrashAlt onClick={(e) => lunch_dlt(e, i)} />
                        </Button> */}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <Button onClick={handleSubmit}>Submit</Button>
            </div>
          ) : null}
        </div>
      </Content>

      {/* GUEST MEAL */}
      <Modal
        show={guest_modal}
        onHide={() => {
          setGuest_modal(false);
          setGuest_isOfficial(false);
        }}
        size="lg"
      >
        <Modal.Header closeButton>
          <h3 className="mb-0">Add Guest Meal</h3>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col sm="12" md="3">
              <Form.Group>
                <Form.Label>Date</Form.Label>
                <DatePicker
                  dateFormat="YYYY-MM-DD"
                  placeholder={"select year"}
                  onChange={(e) => setGuest_date(moment(e?._d).format("YYYY-MM-DD"))}
                  value={guest_date}
                />
              </Form.Group>
            </Col>
            <Col sm="12" md="4">
              <Form.Group>
                <Form.Label>Select Menu</Form.Label>
                <Form.Select
                  onChange={(e) => {
                    setGuest_menu_selected(e.target.value);
                  }}
                >
                  {resetmapping?.map(
                    (r) =>
                      r.date === guest_date && (
                        <>
                          <option>--select menu--</option>
                          {r?.menu.map((d) => (
                            <option value={d?.id}>{d?.items}</option>
                          ))}
                        </>
                      )
                  )}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col sm="12" md="4">
              <Form.Group>
                <Form.Label>Offical</Form.Label>
                <Form.Check
                  type={"checkbox"}
                  id={`default-${1}`}
                  label={`Check if guest is offical`}
                  onChange={() => {
                    setGuest_isOfficial(!guest_isOfficial);
                  }}
                />
              </Form.Group>
            </Col>
          </Row>
          <div className="mt-5">
            <Button onClick={handleGuestSubmit}>Submit</Button>
          </div>
        </Modal.Body>
      </Modal>
    </Layout>
  );
}

// STYLE OBJ
let TH_STYLE = { background: "#eaf4ff", color: "#4c7cc4", borderTop: "1px solid #c1dbff" };
let BILL_TH_STYLE = { padding: "4px 8px", fontSize: "12px", letterSpacing: "0px", background: "#eaf4ff", color: "#4c7cc4" };
let BILL_TD_STYLE = { padding: "4px" };

// OLD
{
  /* <tbody>
{month_length?.map((x, i) => (
  <tr>
    <td style={{ background: !isDisabled(i) ? "" : "#F7F7F7 " }}>{i + 1}</td>
    <td style={{ background: !isDisabled(i) ? "" : "#F7F7F7 " }}>
      {moment(`${moment().startOf("month").add(i, "days").format("DD")}-${month}-${year}`).format(
        DATE_FORMAT
      )}
    </td>
    <td style={{ background: !isDisabled(i) ? "" : "#F7F7F7 " }}>
      {moment(`${moment().startOf("month").add(i, "days").format("DD")}-${month}-${year}`).format("dddd")}
    </td>
    <td style={{ background: !isDisabled(i) ? "" : "#F7F7F7 " }}>
      {!isDisabled(i) && (
        <>
          <Form.Select
            onChange={(e) => {
              lunchSelect(
                e,
                moment(`${moment().startOf("month").add(i, "days").format("DD")}-${month}-${year}`).format(
                  DATE_FORMAT
                ),
                i
              );
            }}
            // disabled={i === mapping.map((d) => d.idx)}
            disabled={moment(
              moment(
                moment(`${moment().startOf("month").add(i, "days").format("DD")}-${month}-${year}`).format(
                  DATE_FORMAT
                )
              ).format("YYYY-MM-DD")
            ).isBefore(moment().format("YYYY-MM-DD"))}
          >
            {moment(`${moment().startOf("month").add(i, "days").format("DD")}-${month}-${year}`).format(
              "dddd"
            ) === "Sunday" && (
              <>
                <option value="">-- Select Item --</option>
                {sundayMenu?.map((d) => (
                  <option value={d.id}>{d.menu__item}</option>
                ))}
              </>
            )}

            {moment(`${moment().startOf("month").add(i, "days").format("DD")}-${month}-${year}`).format(
              "dddd"
            ) === "Monday" && (
              <>
                <option value="">-- Select Item --</option>
                {mondayMenu?.map((d) => (
                  <option value={d.id}>{d.menu__item}</option>
                ))}
              </>
            )}

            {moment(`${moment().startOf("month").add(i, "days").format("DD")}-${month}-${year}`).format(
              "dddd"
            ) === "Tuesday" && (
              <>
                <option value="">-- Select Item --</option>
                {tuesdayMenu?.map((d) => (
                  <option value={d.id}>{d.menu__item}</option>
                ))}
              </>
            )}

            {moment(`${moment().startOf("month").add(i, "days").format("DD")}-${month}-${year}`).format(
              "dddd"
            ) === "Wednesday" && (
              <>
                <option value="">-- Select Item --</option>
                {wednesdayMenu?.map((d) => (
                  <option value={d.id}>{d.menu__item}</option>
                ))}
              </>
            )}

            {moment(`${moment().startOf("month").add(i, "days").format("DD")}-${month}-${year}`).format(
              "dddd"
            ) === "Thursday" && (
              <>
                <option value="">-- Select Item --</option>
                {thursdayMenu?.map((d) => (
                  <option value={d.id}>{d.menu__item}</option>
                ))}
              </>
            )}
          </Form.Select>
        </>
      )}
    </td>
    <td className="text-center" style={{ background: !isDisabled(i) ? "" : "#F7F7F7 " }}>
      {!isDisabled(i) && (
        <>
          {!moment(
            moment(
              moment(`${moment().startOf("month").add(i, "days").format("DD")}-${month}-${year}`).format(
                DATE_FORMAT
              )
            ).format("YYYY-MM-DD")
          ).isBefore(moment().format("YYYY-MM-DD")) ? (
            <Button size="sm" variant="danger" title="Delete" onClick={(e) => lunch_dlt(e, i)}>
              <FaTrashAlt />
            </Button>
          ) : (
            ""
          )}
        </>
      )}
    </td>
  </tr>
))}
</tbody> */
}
