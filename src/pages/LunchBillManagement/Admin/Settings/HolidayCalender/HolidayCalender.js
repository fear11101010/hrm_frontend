import Layout from "../../../../../layout/Layout";
import PageHeader from "../../../../../components/header/PageHeader";
import Container from "react-bootstrap/Container";
import {Button, Card} from "react-bootstrap";
import './holiday-calender.css';
import moment from "moment";
import {useEffect, useState} from "react";
import Select from "../../../../../components/select/Select";
import {FaPlus} from "react-icons/fa";

function HolidayCalender(props) {
    const weekend = [5,6]
    const months = moment.months('MMMM').map((month,i)=>({value:i,label:month}));
    const years = Array.from({length:11},(v,i)=>i+moment().year())
        .map(year=>({value:year,label:year}));
    console.log('Months: ',months);
    console.log('Years: ',years);
    const [selectedMonth,setSelectedMonth] = useState(months.find(month=>month.value===moment().month()))
    const [selectedYear,setSelectedYear] = useState(years.find(year=>year.value===moment().year()))
    const [calender,setCalender] = useState([])

    useEffect(()=>{
        if(selectedYear && selectedMonth){
            const currentMoment = moment().year(selectedYear.value).month(selectedMonth.value)
            const currentMonth = selectedMonth.value;
            const currentYear = selectedYear.value;
            let firstDateOfCurrentMonth = 1;
            const totalDaysInCurrentMonth = currentMoment.daysInMonth();
            const firstWeekDayCurrentMonth = currentMoment.date(1).day();
            const lastWeekDayCurrentMonth = currentMoment.date(totalDaysInCurrentMonth).day();

            // previous month, year etc ....
            const previousMonth = currentMonth-1<0?11:currentMonth-1;
            const previousYear = currentYear-1;
            const totalDaysInPreviousMonth = moment().month(previousMonth).year(previousYear).daysInMonth()-firstWeekDayCurrentMonth+1;
            // const lastWeekDayPreviousMonth = moment().month(previousMonth).year(previousYear).date(totalDaysInPreviousMonth).day();

            // next month, year etc .....
            const nextMonth = currentMonth+1>11?0:currentMonth+1;
            const nextYear = currentYear+1;
            let firstDateOfNextMonth = 1;
            const dates = [];
            for(let i=0;i<6;i++){
                const days = [];
                for(let d=0;d<firstWeekDayCurrentMonth&&i===0;d++){
                    days.push({date:totalDaysInPreviousMonth+d,month:previousMonth,year:previousYear,weekday:d})
                }
                for(let d=(i===0&&firstWeekDayCurrentMonth)||0;d<7&&firstDateOfCurrentMonth<=totalDaysInCurrentMonth;d++){
                    days.push({date:firstDateOfCurrentMonth++,month:currentMonth,year:currentYear,weekday:d})
                }
                for(let d=(firstDateOfNextMonth===1&&lastWeekDayCurrentMonth+1)||0;d<7&&firstDateOfCurrentMonth>totalDaysInCurrentMonth;d++){
                    days.push({date:firstDateOfNextMonth++,month:nextMonth,year:nextYear,weekday:d})
                }
                dates.push(days)
            }
            setCalender(dates)
        }
    },[selectedYear,selectedMonth])

    // console.log('month: ',currentMonth);
    // console.log('day: ',firstWeekDayCurrentMonth);
    // console.log('calender: ',dates);
    return (
        <Layout>
            <PageHeader title="Holiday Calender"/>
            <Container fluid>
                <Card>
                    <Card.Body>
                        <div className="d-flex justify-content-center mb-3">
                            <div className="me-2">
                                <Select options={months} value={selectedMonth} onChange={v=>setSelectedMonth(v)}/>
                            </div>
                            <div>
                                <Select options={years} value={selectedYear} onChange={v=>setSelectedYear(v)}/>
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
                            {calender?.map(row=>(
                                <tr>
                                    {row.map(col=>(
                                        <td>
                                            <div className={weekend.indexOf(col.weekday)>=0?'text-danger':(col.year!==selectedYear.value || col.month!==selectedMonth.value)?'text-muted':''}>
                                                {col.date}
                                                <div className={'d-flex justify-content-end align-items-end'} style={{height:'60px'}}>
                                                <Button variant="primary" size="sm"  className="mb-0" style={{borderRadius:'50%'}}>
                                                    <FaPlus size={10}/>
                                                </Button>
                                                </div>
                                            </div>
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
    )
}

export default HolidayCalender;