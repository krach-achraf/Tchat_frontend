import React, { useLayoutEffect, useState } from "react";

import AdminHeader from "../../../components/admin/AdminHeader";
import AdminPannel from "../../../components/admin/AdminPannel";

import "./Reports.css";
import ReportsCommentsOrPosts from "../../../components/admin/reports/reportsCommentsPosts/ReportsCommentsOrPosts";
import MyReports from "../../../components/admin/reports/myReports/MyReports";
import { authorities, user } from "../../../utils/constants/Constants";
import { useHistory } from "react-router-dom";

const Reports = () => {

  const history = useHistory();
  
  useLayoutEffect(() => {
    if (user == null) history.push("/");
    else{
      if(!authorities.includes("ROLE_USER"))
      history.push("/admin_home");
    }
  }, []);

  const [show, setShow] = useState({
    reportsPosts: true,
    reportsComments: false,
    myReports: false,
  });

  return (
    <div className="reports-management">
      <AdminHeader />
      <AdminPannel />
      <div className="reports-management-main">
        <div className="reports-options">
            
          <button
            className="reports-option"
            onClick={() =>
              setShow({
                reportsComments: false,
                myReports: false,
                reportsPosts: true,
              })
            }
          >
            Posts
          </button>

          <button
            className="reports-option"
            onClick={() =>
              setShow({
                reportsPosts: false,
                myReports: false,
                reportsComments: true,
              })
            }
          >
            Comments
          </button>

          <button
            className="reports-option"
            onClick={() =>
              setShow({
                reportsComments: false,
                reportsPosts: false,
                myReports: true,
              })
            }
          >
            My reports
          </button>

        </div>

        <hr className="hrReports" />


        {show.reportsComments ? <ReportsCommentsOrPosts show='comments'/> : null}
        {show.reportsPosts ? <ReportsCommentsOrPosts show='posts'/> : null}
        {show.myReports ? <MyReports /> : null}
      </div>
    </div>
  );
};

export default Reports;
