import Layout from "../../../../../layout/Layout";
import PageHeader from "../../../../../components/header/PageHeader";
import Content from "../../../../../components/content/Content";
import { useCallback, useEffect, useState } from "react";
import useFetch from "../../../../../hooks/useFetch";
import {
  MONTHLY_MENU_ENTRY_RETRIEVE_API,
  VENDOR_MENU_LIST_BY_VENDOR_API,
} from "../../../../../utils/routes/api_routes/LUNCH_ROUTES";
import { API } from "../../../../../utils/axios/axiosConfig";
import moment from "moment";
import Loader from "../../../../../components/loader/Loader";
import { generateCalenderForCreateOrUpdate, monthAndYearList } from "../../../../../utils/helper";
import AdminMenuEntryCreateUpdateForm from "./AdminMenuEntryCreateUpdateForm";
import { useParams } from "react-router-dom";
import { error_alert } from "../../../../../components/alert/Alert";

export default function AdminMenuEntryEdit(props) {
  const { id, mappingId } = useParams();
  const [, _, currentMoment, weeklyHoliday] = monthAndYearList();
  const [loading, setLoading] = useState(false);
  const [single, setSingle] = useState(false);
  const [multiple, setMultiple] = useState(false);
  const [vendorMenuList, setVendorMenuList] = useState([]);
  const [mappingMenuEntryList, setMappingMenuEntryList] = useState([]);
  const { data, isLoading } = useFetch(MONTHLY_MENU_ENTRY_RETRIEVE_API(id, mappingId));
  const [editData, setEditData] = useState({});

  function loadMenuItem(vendor, month, year) {
    setLoading(true);
    setEditData({});
    API.get(VENDOR_MENU_LIST_BY_VENDOR_API(vendor), {
      params: {
        month,
        year,
      },
    })
      .then((success) => {
        setVendorMenuList(success?.data?.data);
        if (multiple) {
          const menuEntry = mapData(data?.data, success?.data?.data);
          const mappingMenuEntry = generateCalenderForCreateOrUpdate({ month, year, menus: success?.data?.data });
          mappingMenuEntry?.forEach((mme, i) => {
            const m = moment(mme.date);
            const mme1 = menuEntry?.mapping_menu_entry?.find(
              (v) =>
                v.day === mme.day &&
                menuEntry?.month === m.month() &&
                m.year() === menuEntry.year &&
                menuEntry.vendor === vendor
            );
            if (mme1) {
              mappingMenuEntry[i] = mme1;
            }
          });
          menuEntry.mapping_menu_entry = mappingMenuEntry;
          setEditData(menuEntry);
        } else if (single) {
          const menuEntry = mapData(data?.data, success?.data?.data);
          if (menuEntry) {
            menuEntry.vendor = vendor;
            setEditData(menuEntry);
          }
        }
      })
      .catch((err) => {
        console.log(err);
        error_alert(err?.data?.error);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  const callbackFunc = useCallback(
    (vendor, month, year) => {
      if (data?.data) {
        loadMenuItem(vendor, month, year);
      }
    },
    [editData]
  );
  useEffect(() => {
    if (data) {
      if (mappingId) {
        setSingle(true);
        setMultiple(false);
      } else {
        setMultiple(true);
        setSingle(false);
      }
      loadMenuItem(data?.data?.vendor, data?.data?.month, data?.data?.year);
    }
  }, [data]);

  const mapData = (data, menus) => {
    const menuIds = menus?.map((m) => m?.id);
    data?.mapping_menu_entry?.forEach((mme) => {
      delete mme?.menu_entry;
      const menuCheckBox = Array(menus?.length).fill({ menu: false });
      mme.weekday = moment.weekdays(moment(mme?.date).weekday());
      mme?.menus?.sort((a, b) => a?.menu_position - b?.menu_position);
      let j = 0;
      for (const m of mme?.menus) {
        const i = menuIds.indexOf(m?.id);
        if (i >= 0) {
          menuCheckBox[i] = { menu: true };
          menuCheckBox.splice(menuCheckBox.length, 0, mme?.menus[j++]);
        }
      }
      mme.menus = menuCheckBox;
    });
    return data;
  };

  return (
    <Layout>
      <PageHeader title="Menu Entry" onBack />
      <Content>
        <AdminMenuEntryCreateUpdateForm
          menus={vendorMenuList}
          callFuncWithVendorMonthYear={callbackFunc}
          monthlyData={mappingMenuEntryList}
          onSubmitData={(status) => setLoading(status)}
          update={{ single, multiple }}
          existingData={editData}
        />
      </Content>
      {loading && <Loader />}
    </Layout>
  );
}
