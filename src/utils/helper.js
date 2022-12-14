import moment from "moment";
import {API_MEDIA} from "./axios/axiosConfig";

export const getDurations=(date)=>{
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
            fileName:filePaths[filePaths.length-1]
        }
    } catch (e) {
        return {}
    }
}