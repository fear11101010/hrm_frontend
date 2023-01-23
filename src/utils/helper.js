import moment from "moment";
import {API_MEDIA} from "./axios/axiosConfig";

export const getDurations = (date) => {
    const diff = moment().diff(date);
    return moment.duration(diff);
}
export const loadFileInfo = async (filePath) => {
    try {
        const res = await API_MEDIA.get(filePath);
        const file = res?.data;
        const filePaths = filePath.split('/');
        return {
            size: `${Math.ceil(file?.size / 1024)}KB`,
            type: file?.type,
            href: URL.createObjectURL(file),
            fileName: filePaths[filePaths.length - 1]
        }
    } catch (e) {
        return {}
    }
}
export const monthAndYearList = () => {
    const weeklyHoliday = [5, 6];
    const months = moment.months('MMMM').map((month, i) => month);
    const currentMoment = moment();
    const monthList = (currentMoment.month() === 11 ? [11, 0] : [currentMoment.month(), currentMoment.month() + 1])
        .map((v, i) => ({value: v, label: months[v]}))
    const yearList = (currentMoment.month() === 11 ? [currentMoment.year(), currentMoment.year() + 1] : [currentMoment.year()])
        .map((v, i) => ({value: v, label: v}))
    return [monthList, yearList, currentMoment, weeklyHoliday]
}
export const generateCalender = ({month, year, menuEntry}) => {
    const [, _, currentMoment, weeklyHoliday] = monthAndYearList();
    const calender = []
    const m = moment().month(month).year(year);
    for (let i = 1; i <= m.daysInMonth(); i++) {
        const dm = m.date(i);
        if (weeklyHoliday.indexOf(dm.weekday()) >= 0) continue;
        calender.push({
            day: i,
            weekday: moment.weekdays(m.date(i).weekday()),
            date: m.date(i).format('YYYY-MM-DD'),
            officeBranch: menuEntry?.mapping_menu_entry?.find(d => d?.day === i) ? menuEntry?.office_branch?.name : '---',
            vendor: menuEntry?.mapping_menu_entry?.find(d => d?.day === i) ? menuEntry?.vendor?.name : '---',
            menus: menuEntry?.mapping_menu_entry?.find(d => d?.day === i) ? menuEntry?.mapping_menu_entry?.find(d => d?.day === i)?.menus : '---',
        })
    }
    return calender;
}