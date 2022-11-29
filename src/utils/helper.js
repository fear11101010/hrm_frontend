import moment from "moment";

export const getDurations=(date)=>{
    const diff = moment().diff(date);
    return moment.duration(diff);
}