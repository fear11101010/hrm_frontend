import Layout from "../../../../../layout/Layout";
import PageHeader from "../../../../../components/header/PageHeader";
import Content from "../../../../../components/content/Content";
import useFetch from "../../../../../hooks/useFetch";
import {
    ADMIN_MENU_ENTRY_CREATE_PAGE,
    ADMIN_MENU_ENTRY_LIST_PAGE
} from "../../../../../utils/routes/app_routes/LUNCH_ROUTES";
import {
    BRANCH_LIST_CREATE_API,
    MONTHLY_MENU_ENTRY_LIST_CREATE_API
} from "../../../../../utils/routes/api_routes/LUNCH_ROUTES";
import Loader from "../../../../../components/loader/Loader";
import useMonthAndYearList from "../../../../../hooks/useMonthAndYearList";
import {useEffect, useState} from "react";
import {API} from "../../../../../utils/axios/axiosConfig";
import {Accordion} from "react-bootstrap";

export default function AdminMenuEntryList(props){
    const [monthList,yearList] = useMonthAndYearList()
    const {data} = useFetch(BRANCH_LIST_CREATE_API)
    const [menuEntryList,setMenuEntryList] = useState([]);
    const [loading,setLoading] = useState(false);
    useEffect(()=>{
        setLoading(true);
        API.get(MONTHLY_MENU_ENTRY_LIST_CREATE_API,{
            params:{
                months:monthList?.map(v=>v.value),
                year:yearList?.map(v=>v.value)
            }
        }).then(success=>{
            setMenuEntryList(success?.data?.data)
        }).then(err=>{

        }).then(()=>setLoading(false))
    },[])
    return (
        <Layout>
            <PageHeader title="Menu Entry List"/>
            <Content>
                <Accordion defaultActiveKey="0">
                    {menuEntryList?.map((entryList,i)=>(
                        <Accordion.Item eventKey={i}>
                            <Accordion.Header>Accordion Item #1</Accordion.Header>
                            <Accordion.Body>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                                minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                aliquip ex ea commodo consequat. Duis aute irure dolor in
                                reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                                pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                                culpa qui officia deserunt mollit anim id est laborum.
                            </Accordion.Body>
                        </Accordion.Item>
                    ))}
                </Accordion>
            </Content>
            {loading && <Loader/>}
        </Layout>
    )
}