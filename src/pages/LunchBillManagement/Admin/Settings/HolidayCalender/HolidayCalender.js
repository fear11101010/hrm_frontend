import Layout from "../../../../../layout/Layout";
import PageHeader from "../../../../../components/header/PageHeader";
import Container from "react-bootstrap/Container";
import {Badge, Button, Card, Form, Modal, Row} from "react-bootstrap";
import './holiday-calender.css';
import moment from "moment";
import {useEffect, useState} from "react";
import Select from "../../../../../components/select/Select";
import {FaEdit, FaPlus, FaSave, FaTrash} from "react-icons/fa";
import useFetchV2 from "../../../../../hooks/useFetchV2";
import {
    HOLIDAY_LIST_CREATE_API,
    HOLIDAY_UPDATE_API,
    WEEKEND_LIST_CREATE_API
} from "../../../../../utils/routes/api_routes/LUNCH_ROUTES";
import Loader from "../../../../../components/loader/Loader";
import {API} from "../../../../../utils/axios/axiosConfig";
import {Controller} from "react-hook-form";
import DatePicker from "../../../../../components/date-picker/DatePicker";
import {error_alert, success_alert} from "../../../../../components/alert/Alert";
import {FcCancel} from "react-icons/fc";

function HolidayCalender(props) {
    const [weekendList] = useFetchV2(WEEKEND_LIST_CREATE_API)
    const weekend = weekendList?.data?.map(w=>(w?.weekend+1)%7)
    const months = moment.months('MMMM').map((month, i) => ({value: i, label: month}));
    const years = Array.from({length: 11}, (v, i) => i + moment().year())
        .map(year => ({value: year, label: year}));
    console.log('weekend: ', weekend);
    const [selectedMonth, setSelectedMonth] = useState(months.find(month => month.value === moment().month()))
    const [selectedYear, setSelectedYear] = useState(years.find(year => year.value === moment().year()))
    const [calender, setCalender] = useState([])
    const [show, setShow] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [selectedDate, setSelectedDate] = useState(null)
    const [holidayData, setHolidayData] = useState(null)
    const [type, setType] = useState('single')
    const [fromDate, setFromDate] = useState()
    const [toDate, setToDate] = useState()
    const [holidayTitle, setHolidayTitle] = useState()
    const [showCreateFrom, setShowCreateFrom] = useState(false)
    const [editHoliday, setEditHoliday] = useState([])

    function loadHolidayData() {
        setIsLoading(true)
        API.get(HOLIDAY_LIST_CREATE_API, {
            params: {
                month: selectedMonth?.value + 1,
                year: selectedYear?.value,
            }
        }).then(success => {
            const data = success?.data?.data?.reduce((acc, curr) => {
                const m = moment(curr?.date)
                const obj = {
                    date: m.date(),
                    month: m.month(),
                    year: m.year(),
                    holiday: [{id: curr.id, holiday_name: curr.holiday_name}]
                };
                const f = acc.find(ed => ed.date === obj.date && ed.month === obj.month && ed.year === obj.year)
                if (f) {
                    f.holiday.push({id: curr.id, holiday_name: curr.holiday_name})
                } else {
                    acc.push(obj)
                }
                return acc;
            }, [])
            setHolidayData(data)
        }).catch(err => {
            console.log(err)
        }).finally(() => {
            setIsLoading(false)
        })
    }

    useEffect(() => {
        if (selectedYear && selectedMonth && holidayData) {
            const currentMoment = moment().year(selectedYear.value).month(selectedMonth.value)
            const currentMonth = selectedMonth.value;
            const currentYear = selectedYear.value;
            let firstDateOfCurrentMonth = 1;
            const totalDaysInCurrentMonth = currentMoment.daysInMonth();
            const firstWeekDayCurrentMonth = currentMoment.date(1).day();
            const lastWeekDayCurrentMonth = currentMoment.date(totalDaysInCurrentMonth).day();

            // previous month, year etc ....
            const previousMonth = currentMonth - 1 < 0 ? 11 : currentMonth - 1;
            const previousYear = currentYear - 1;
            const totalDaysInPreviousMonth = moment().month(previousMonth).year(previousYear).daysInMonth() - firstWeekDayCurrentMonth + 1;
            // const lastWeekDayPreviousMonth = moment().month(previousMonth).year(previousYear).date(totalDaysInPreviousMonth).day();

            // next month, year etc .....
            const nextMonth = currentMonth + 1 > 11 ? 0 : currentMonth + 1;
            const nextYear = currentYear + 1;
            let firstDateOfNextMonth = 1;
            const dates = [];
            for (let i = 0; i < 6; i++) {
                const days = [];
                for (let d = 0; d < firstWeekDayCurrentMonth && i === 0; d++) {
                    days.push({
                        date: totalDaysInPreviousMonth + d,
                        month: previousMonth,
                        year: previousYear,
                        weekday: d
                    })
                }
                for (let d = (i === 0 && firstWeekDayCurrentMonth) || 0; d < 7 && firstDateOfCurrentMonth <= totalDaysInCurrentMonth; d++) {
                    days.push({date: firstDateOfCurrentMonth++, month: currentMonth, year: currentYear, weekday: d})
                }
                for (let d = (firstDateOfNextMonth === 1 && lastWeekDayCurrentMonth + 1) || 0; d < 7 && firstDateOfCurrentMonth > totalDaysInCurrentMonth; d++) {
                    days.push({date: firstDateOfNextMonth++, month: nextMonth, year: nextYear, weekday: d})
                }
                dates.push(days.map(d => (
                    {
                        ...d,
                        isHoliday: holidayData?.find(ed => ed.date === d.date && ed.month === d.month && ed.year === d.year) !== undefined,
                        holidays: holidayData?.find(ed => ed.date === d.date && ed.month === d.month && ed.year === d.year)?.holiday
                    }
                )))
            }
            setCalender(dates)
        }
    }, [selectedYear, selectedMonth, holidayData])
    useEffect(() => {
        if (selectedMonth && selectedYear) {
            loadHolidayData()
        }
    }, [selectedMonth, selectedYear])

    function showHolidayDialog(e, data) {
        e.preventDefault();
        const hd = {...data}
        hd?.holidays?.forEach(v => {
            v.holiday_name_tmp = `${v.holiday_name}`
        })
        setSelectedDate(hd);
        setEditHoliday(data?.holidays?.map(_ => false))
        resetForm()
        setShow(true);
    }

    function handleClose() {
        setShow(false);
    }

    function resetForm() {
        setFromDate(moment(`${selectedDate?.year}-${String(selectedDate?.month + 1).padStart(2, '0')}-${String(selectedDate?.date).padStart(2, '0')}`).format('DD MMM, YYYY'))
        setToDate('');
        setHolidayTitle('')
    }

    function createHoliday(e) {
        e.preventDefault();
        const dates = [];
        if (type === 'range') {
            const now = moment(fromDate).clone();
            while (now.isSameOrBefore(toDate)) {
                dates.push(now.format('YYYY-MM-DD'));
                now.add(1, 'days');
            }
        } else {
            dates.push(moment(fromDate).format('YYYY-MM-DD'))
        }
        const data = [
            {
                holiday_name: holidayTitle,
                date: dates
            }
        ]
        console.log({dates})
        setIsLoading(true);
        API.post(HOLIDAY_LIST_CREATE_API, data).then(success => {
            success_alert("Holiday created successfully")
        }).catch(err => {
            error_alert("An error occur while creating Holiday. Please try again later")
        }).finally(() => {
            setIsLoading(false)
            setShow(false)
            loadHolidayData()
        })
    }

    function showHolidayCreateForm(e) {
        e.preventDefault();
        setShowCreateFrom(true)
        resetForm()
    }

    function enableHolidayEdit(e, i) {
        setEditHoliday(h => {
            const d = h.map(_ => false);
            d[i] = true;
            return d;
        })
        setSelectedDate(sd => {
            const d = {...sd};
            d.holidays?.forEach(v => {
                v.holiday_name_tmp = `${v.holiday_name}`
            })
            return d;
        })
    }

    function deleteHoliday(e, i) {
        setEditHoliday(h => {
            const d = h.map(_ => false);
            delete d[i];
            return d;
        })
        setSelectedDate(sd => {
            const d = {...sd};
            delete d.holidays[i]
            return d;
        })
    }

    function changeHoliday(e, i) {
        setSelectedDate(sd => {
            const d = {...sd};
            d.holidays[i].holiday_name_tmp = e.target.value
            return d;
        })
    }

    useEffect(() => {
        if (!show) {
            setShowCreateFrom(false)
        }
    }, [show])

    function updateHoliday(e, i) {
        const m = moment();
        const date = m.year(selectedDate?.year).month(selectedDate?.month).date(selectedDate?.date).format('YYYY-MM-DD')
        const holiday_name = selectedDate?.holidays[i]?.holiday_name_tmp
        const id = selectedDate?.holidays[i]?.id
        setIsLoading(true);
        API.put(HOLIDAY_UPDATE_API(id), {holiday_name,date}).then(success => {
            if(success?.data?.success){
                success_alert("Holiday updated successfully")
                setSelectedDate(sd => {
                    const d = {...sd};
                    d.holidays[i].holiday_name = `${holiday_name}`
                    return d;
                })
                setEditHoliday(h => h.map(_ => false))
            } else {
                error_alert("An error occur while updating Holiday. Please try again later")
            }
        }).catch(err => {
            error_alert("An error occur while updating Holiday. Please try again later")
        }).finally(() => {
            setIsLoading(false)
            setShow(false)

        })
    }

    function cancelEdit(e, i) {
        setEditHoliday(h => h.map(_ => false))
        setSelectedDate(sd => {
            const d = {...sd};
            d.holidays[i].holiday_name_tmp = `${d.holidays[i].holiday_name}`
            return d;
        })
    }

    return (
        <>
            <Layout>
                <PageHeader title="Holiday Calender"/>
                <Container fluid>
                    <Card>
                        <Card.Body>
                            <div className="d-flex justify-content-center mb-3">
                                <div className="me-2">
                                    <Select options={months} value={selectedMonth} onChange={v => setSelectedMonth(v)}/>
                                </div>
                                <div>
                                    <Select options={years} value={selectedYear} onChange={v => setSelectedYear(v)}/>
                                </div>
                            </div>
                            <table id="holiday-calender">
                                <thead>
                                <tr>
                                    <td>
                                        <strong className="d-none d-sm-none d-lg-inline">Sunday</strong>
                                        <strong className="d-lg-none d-sm-inline">Sun</strong>
                                    </td>
                                    <td>
                                        <strong className="d-none d-sm-none d-lg-inline">Monday</strong>
                                        <strong className="d-lg-none d-sm-inline">Mon</strong>
                                    </td>
                                    <td>
                                        <strong className="d-none d-sm-none d-lg-inline">Tuesday</strong>
                                        <strong className="d-lg-none d-sm-inline">Tues</strong>
                                    </td>
                                    <td>
                                        <strong className="d-none d-sm-none d-lg-inline">Wednesday</strong>
                                        <strong className="d-lg-none d-sm-inline">Wed</strong>
                                    </td>
                                    <td>
                                        <strong className="d-none d-sm-none d-lg-inline">Thursday</strong>
                                        <strong className="d-lg-none d-sm-inline">Thur</strong>
                                    </td>
                                    <td>
                                        <strong className="d-none d-sm-none d-lg-inline">Friday</strong>
                                        <strong className="d-lg-none d-sm-inline">Fri</strong>
                                    </td>
                                    <td>
                                        <strong className="d-none d-sm-none d-lg-inline">Saturday</strong>
                                        <strong className="d-lg-none d-sm-inline">Sat</strong>
                                    </td>
                                </tr>
                                </thead>
                                <tbody>
                                {calender?.map(row => (
                                    <tr>
                                        {row.map(col => (
                                            <td onClick={e => showHolidayDialog(e, col)}>
                                                <div
                                                    className={weekend.indexOf(col.weekday) >= 0 || col?.isHoliday ? 'text-danger' : (col.year !== selectedYear.value || col.month !== selectedMonth.value) ? 'text-muted' : ''}>
                                                    {col.date}
                                                </div>
                                                {col?.isHoliday && col?.holidays?.map(d => (
                                                    <div className="">
                                                        <Badge bg="danger">{d?.holiday_name}</Badge>
                                                    </div>
                                                ))}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </Card.Body>
                    </Card>
                </Container>
            </Layout>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{moment(`${selectedDate?.year}-${String(selectedDate?.month + 1).padStart(2, '0')}-${String(selectedDate?.date).padStart(2, '0')}`).format('DD MMM, YYYY')}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {!showCreateFrom && (!selectedDate?.holidays || !Array.isArray(selectedDate?.holidays)) && (
                        <h2 className="d-flex justify-content-center p-4 text text-secondary">
                            No Holiday available
                        </h2>
                    )}
                    {!showCreateFrom && selectedDate?.holidays && Array.isArray(selectedDate?.holidays) && (
                        <ul className="holiday">
                            {selectedDate?.holidays?.map((holiday, i) => (
                                <li contentEditable={false}
                                    className="d-flex justify-content-between align-items-center">
                                    <div style={{flex: 1}}>
                                        {!editHoliday[i] ? holiday?.holiday_name : (
                                            <Form.Control value={holiday?.holiday_name_tmp}
                                                          onChange={e => changeHoliday(e, i)}/>
                                        )}
                                    </div>
                                    <div className="ms-2">
                                        {!editHoliday[i] && (
                                            <>
                                                <Button onClick={e => enableHolidayEdit(e, i)} variant="primary me-2"
                                                        size="sm">
                                                    <FaEdit/>
                                                </Button>
                                                <Button onClick={e => deleteHoliday(e, i)} variant="danger" size="sm">
                                                    <FaTrash/>
                                                </Button>
                                            </>)}
                                        {editHoliday[i] && (
                                            <>
                                                <Button onClick={e => updateHoliday(e, i)} variant="primary me-2"
                                                        size="sm">
                                                    <FaSave/>
                                                </Button>
                                                <Button onClick={e => cancelEdit(e, i)} variant="light" size="sm">
                                                    <FcCancel/>
                                                </Button>
                                            </>
                                        )}

                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                    {showCreateFrom && (
                        <Form onSubmit={createHoliday} className="shadow p-3" style={{borderRadius: '10px'}}>
                            <Form.Group className="mb-4">
                                <Form.Label>{type === 'single' ? 'Date' : 'From Date'}</Form.Label>
                                <DatePicker
                                    placeholder={"Select Date"}
                                    dateFormat={"DD-MM-YYYY"}
                                    value={fromDate && moment(fromDate).format("DD MMM, YYYY")}
                                    onChange={(e) => setFromDate(moment(e?._d).format("DD MMM, YYYY"))}
                                    disabled={true}
                                />
                            </Form.Group>
                            <Form.Group className="mb-4">
                                <Form.Label>Holiday Title</Form.Label>
                                <Form.Control placeholder="Enter Title" value={holidayTitle}
                                              onChange={e => setHolidayTitle(e.target.value)}/>
                            </Form.Group>
                            <div className="d-flex justify-content-end mb-4">
                                <Button type="submit" className="me-3" variant="primary">
                                    Create Holiday
                                </Button>
                                <Button onClick={e => {
                                    e.preventDefault();
                                    setShowCreateFrom(false)
                                }} variant="primary">
                                    Cancel
                                </Button>
                            </div>
                        </Form>
                    )}
                    {!showCreateFrom && (
                        <div className="d-flex justify-content-end">
                            <Button onClick={showHolidayCreateForm} variant="primary">
                                Add Holiday
                            </Button>
                        </div>
                    )}
                </Modal.Body>
            </Modal>
            {isLoading && <Loader/>}
        </>
    )
}

export default HolidayCalender;