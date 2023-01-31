import Layout from "../../../../../layout/Layout";
import PageHeader from "../../../../../components/header/PageHeader";
import Content from "../../../../../components/content/Content";
import {useEffect, useState} from "react";
import useFetch from "../../../../../hooks/useFetch";
import {
    BRANCH_LIST_CREATE_API, MONTHLY_MENU_ENTRY_RETRIEVE_UPDATE_API,
    VENDOR_MENU_LIST_BY_VENDOR_API
} from "../../../../../utils/routes/api_routes/LUNCH_ROUTES";
import {API} from "../../../../../utils/axios/axiosConfig";
import moment from "moment";
import Loader from "../../../../../components/loader/Loader";
import {generateCalenderForCreateOrUpdate, monthAndYearList} from "../../../../../utils/helper";
import AdminMenuEntryCreateUpdateForm from "./AdminMenuEntryCreateUpdateForm";
import {useParams} from "react-router-dom";


export default function AdminMenuEntryEdit(props) {
    const {id,mappingId} = useParams();
    const [, _, currentMoment, weeklyHoliday] = monthAndYearList()
    const [loading, setLoading] = useState(false);
    const [single, setSingle] = useState(false);
    const [multiple, setMultiple] = useState(false);
    const [vendorMenuList, setVendorMenuList] = useState([]);
    const [mappingMenuEntryList, setMappingMenuEntryList] = useState([]);
    const {data,isLoading} = useFetch(MONTHLY_MENU_ENTRY_RETRIEVE_UPDATE_API(id,mappingId))
    const [editData,setEditData] = useState({})

    function loadMenuItem(vendor, month, year) {
        API.get(VENDOR_MENU_LIST_BY_VENDOR_API(vendor)).then(success => {
            setVendorMenuList(success?.data?.data)
            const menus = Array(success?.data?.data?.length).fill({menu:false});
            if(multiple){
                const mappingMenuEntry = generateCalenderForCreateOrUpdate({month,year,menus:success?.data?.data})
                setMappingMenuEntryList(mappingMenuEntry)
            } else if(single){
                data?.data?.mapping_menu_entry?.forEach(mme=>{
                    delete mme?.menu_entry;
                    mme.weekday = moment.weekdays(moment(mme?.date).weekday());
                    const menuIds = success?.data?.data?.map(m=>m?.id)
                    let j=0;
                    for(const m of mme?.menus){
                        const i = menuIds.indexOf(m?.id)
                        if(i>=0){
                            menus[i] = {menu:true};
                            menus.splice(menus.length,0,mme?.menus[j++])
                        }
                    }
                    mme.menus = menus
                })
                setEditData(data?.data)
            }
        }).then(err => {

        })
    }
    useEffect(()=>{
        if(data){
            if(mappingId){
                setSingle(true)
                setMultiple(false)
            } else {
                setMultiple(true)
                setSingle(false)
            }
            loadMenuItem(data?.data?.vendor,data?.data?.month,data?.data?.year)
        }
    },[data])

    return (
        <Layout>
            <PageHeader title="Menu Entry" onBack/>
            <Content>
                <AdminMenuEntryCreateUpdateForm menus={vendorMenuList} callFuncWithVendorMonthYear={loadMenuItem}
                                                monthlyData={mappingMenuEntryList}
                                                onSubmitData={(status)=>setLoading(status)}
                                                update={{single,multiple}}
                                                existingData={editData}/>
            </Content>
            {loading && <Loader/>}
        </Layout>
    )
}