import Layout from "../../../../../layout/Layout";
import PageHeader from "../../../../../components/header/PageHeader";
import Container from "react-bootstrap/Container";
import {Card} from "react-bootstrap";
import './holiday-calender.css';
import moment from "moment";

function HolidayCalender(props) {
    const currentMoment = moment()
    const currentMonth = currentMoment.month();
    const currentYear = currentMoment.year();
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
            days.push({date:totalDaysInPreviousMonth+d,month:previousMonth,year:previousYear})
        }
        for(let d=(i===0&&firstWeekDayCurrentMonth)||0;d<7&&firstDateOfCurrentMonth<=totalDaysInCurrentMonth;d++){
            days.push({date:firstDateOfCurrentMonth++,month:currentMonth,year:currentYear})
        }
        for(let d=(firstDateOfNextMonth===1&&lastWeekDayCurrentMonth+1)||0;d<7&&firstDateOfCurrentMonth>totalDaysInCurrentMonth;d++){
            days.push({date:firstDateOfNextMonth++,month:nextMonth,year:nextYear})
        }
        dates.push(days)
    }

    console.log('month: ',currentMonth);
    console.log('day: ',firstWeekDayCurrentMonth);
    console.log('calender: ',dates);
    return (
        <Layout>
            <PageHeader title="Holiday Calender"/>
            <Container fluid>
                <Card>
                    <Card.Body>
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
                            {dates.map(row=>(
                                <tr>
                                    {row.map(col=>(
                                        <td>
                                            <div>
                                                {col.date}
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