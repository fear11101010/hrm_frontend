import Layout from "../../../../../layout/Layout";
import PageHeader from "../../../../../components/header/PageHeader";
import Content from "../../../../../components/content/Content";
import useFetch from "../../../../../hooks/useFetch";
import {
    ADMIN_MENU_ENTRY_CREATE_PAGE,
    ADMIN_MENU_ENTRY_LIST_PAGE
} from "../../../../../utils/routes/app_routes/LUNCH_ROUTES";
import {MONTHLY_MENU_ENTRY_LIST_CREATE_API} from "../../../../../utils/routes/api_routes/LUNCH_ROUTES";
import Loader from "../../../../../components/loader/Loader";
import useMonthAndYearList from "../../../../../hooks/useMonthAndYearList";

export default function AdminMenuEntryList(props){
    const [monthList,yearList] = useMonthAndYearList()
    const {data,isLoading} = useFetch(MONTHLY_MENU_ENTRY_LIST_CREATE_API)
    return (
        <Layout>
            <PageHeader title="Menu Entry List"/>
            <Content>

            </Content>
            {isLoading && <Loader/>}
        </Layout>
    )
}