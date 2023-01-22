import moment from "moment";

export default function useMonthAndYearList(){
    const weeklyHoliday = [5, 6];
    const months = moment.months('MMMM').map((month, i) => month);
    const currentMoment = moment();
    const monthList = (currentMoment.month() === 11 ? [11, 0] : [currentMoment.month(), currentMoment.month() + 1])
        .map((v, i) => ({value: v, label: months[v]}))
    const yearList = (currentMoment.month() === 11 ? [currentMoment.year(), currentMoment.year() + 1] : [currentMoment.year()])
        .map((v, i) => ({value: v, label: v}))
    return [monthList,yearList,currentMoment,weeklyHoliday]
}