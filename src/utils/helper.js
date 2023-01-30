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
export const generateCalender = ({month, year, menuEntry,id}) => {
    console.log({id})
    const [, _, currentMoment, weeklyHoliday] = monthAndYearList();
    const calender = []
    const m = moment().month(month).year(year);
    for (let i = 1; i <= m.daysInMonth(); i++) {
        const dm = m.date(i);
        if (weeklyHoliday.indexOf(dm.weekday()) >= 0) continue;
        calender.push({
            day: i,
            weekday: moment.weekdays(m.date(i).weekday()),
            date: dm.toDate(),
            officeBranch: menuEntry?.mapping_menu_entry?.find(d => d?.day === i) ? menuEntry?.office_branch?.name : '---',
            vendor: menuEntry?.mapping_menu_entry?.find(d => d?.day === i) ? menuEntry?.vendor?.name : '---',
            menus: menuEntry?.mapping_menu_entry?.find(d => d?.day === i) ? menuEntry?.mapping_menu_entry?.find(d => d?.day === i)?.menus : undefined,
            disabled:currentMoment.month()===month?currentMoment.date()<i:false,
            menuEntryId:id,
            id:menuEntry?.mapping_menu_entry?.find(d => d?.day === i) ? menuEntry?.mapping_menu_entry?.find(d => d?.day === i)?.id : undefined
        })
    }
    return calender;
}
export const generateCalenderForCreateOrUpdate = ({month, year, menus}) => {
    const [, _, currentMoment, weeklyHoliday] = monthAndYearList()
    const m = moment().month(month).year(year);
    const totalDaysInAMonth = m.daysInMonth();
    const mappingMenuEntry = []
    for (let i = currentMoment.month() === m.month() ? m.date() : 1; i <= totalDaysInAMonth; i++) {
        const dm = m.date(i);
        if (weeklyHoliday.indexOf(dm.weekday()) >= 0) continue;
        mappingMenuEntry.push({
            day: i,
            weekday: moment.weekdays(m.date(i).weekday()),
            date: m.date(i).format('YYYY-MM-DD'),
            menus: menus?.map(v => false)
        })
    }
    return mappingMenuEntry;
}

export const getStatus = (statusId)=>{
    switch (statusId){
        case 1:
            return 'bg-secondary'
        case 2:
        case 8:
            return 'bg-warning'
        case 7:
        case 3:
            return 'bg-primary'
        case 4:
            return 'bg-success'
        case 5:
            return 'bg-danger'
        case 6:
            return 'bg-info'
    }
}