import React, { useCallback, useEffect, useState } from "react";
import Axios from "axios";

import {
  base_url_reports,
  token,
  user,
} from "../../../../utils/constants/Constants";

const ReportsCommentsOrPosts = (props) => {
  const [page, setPage] = useState(0);
  const [reports, setReports] = useState([]);

  const size = 8;
  const setStateReportOnReview = useCallback(async (reportId) => {
    try {
      await Axios.put(`${base_url_reports}/on-review/${reportId}/${user.id}`, {},{
        headers: { Authorization: `Bearer ${token}` },
      });
      if (reports.length > 1) getReports();
      else {
        setReports([]);
        setPage(0);
      }
    } catch (error) {
      console.log(error);
    }
  });

  const tableContent = reports.map((el) => {
    return (
      <tr key={el.id}>
        <td>{props.show == "comments" ? el.comment.id : el.post.id}</td>
        <td>{el.user.fullname}</td>
        <td>{el.reason}</td>
        <td>{el.sendedAt.split("T")[0]}</td>
        <td>
          <button
            className="reports-btn"
            onClick={() => setStateReportOnReview(el.id)}
          >
            On review
          </button>
        </td>
      </tr>
    );
  });

  useEffect(() => {
    getReports();
  }, [page]);

  const getReports = useCallback(async () => {
    try {
      let response = await Axios.get(
        `${base_url_reports}/${page}/${size}/${props.show}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.data.length > 0) setReports(response.data);
      else if (page > 0) setPage(page - 1);
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <div className="reports-table-display">
      <table className="reports-table">
        <thead>
          <tr>
            {props.show == "comments" ? <th>Comment</th> : <th>Post</th>}
            <th>User</th>
            <th>Reason</th>
            <th>Sended at</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{tableContent}</tbody>
      </table>
      <div className="list-pagination">
        <button
          className="btn-previous"
          onClick={() => {
            if (page > 0) setPage(page - 1);
          }}
        >
          Previous
        </button>
        <button
          className="btn-next"
          onClick={() => {
            setPage(page + 1);
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ReportsCommentsOrPosts;
