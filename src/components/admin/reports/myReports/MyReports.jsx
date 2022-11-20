import React, { useCallback, useEffect, useState } from "react";
import Axios from "axios";

import { base_url_reports, token, user } from "../../../../utils/constants/Constants";
import ReportsCommentDetails from "../../../../utils/modals/Admin/reports/commentDetails/ReportsCommentDetails";
import ReportsPostDetails from "../../../../utils/modals/Admin/reports/postDetails/ReportsPostDetails";

const MyReports = () => {
  const [page, setPage] = useState(0);
  const [reports, setReports] = useState([]);
  const [comment, setComment] = useState(null);
  const [post, setPost] = useState(null);
  const [showModals, setShowModals] = useState({
    commentDetails: false,
    postDetails: false,
  });

  const size = 8;

  const skipReport = useCallback(async (report) => {
    try {
      if(report.comment)
        await Axios.put(`${base_url_reports}/skip/comment/${report.comment.id}`, { headers: {"Authorization" : `Bearer ${token}`}});
      else
        await Axios.put(`${base_url_reports}/skip/post/${report.post.id}`, { headers: {"Authorization" : `Bearer ${token}`}});
      if(reports.length > 1)
        getReports();
      else{
        setReports([])
        setPage(0)
      }
    } catch (error) {
      console.log(error);
    }
  });

  const tableContent = reports.map((el) => {
    return (
      <tr key={el.id}>
        <td>
          <button
            className="reports-details-link"
            onClick={() => {
              setShowModals({ ...showModals, postDetails: true });
              setPost(el.post);
            }}
          >
            {el.post ? el.post.id : null}
          </button>
        </td>
        <td>
          <button
            className="reports-details-link"
            onClick={() => {
              setShowModals({ ...showModals, commentDetails: true });
              setComment(el.comment);
            }}
          >
            {el.comment ? el.comment.id : null}
          </button>
        </td>
        <td>{el.user.fullname}</td>
        <td>{el.reason}</td>
        <td>{el.sendedAt.split("T")[0]}</td>
        <td>
          <button className="reports-btn" onClick={() => skipReport(el)}>
            Skip
          </button>
        </td>
      </tr>
    );
  });

  const getReports = useCallback(async () => {
    try {
      let response = await Axios.get(
        `${base_url_reports}/admin/${page}/${size}/${user.id}`, { headers: {"Authorization" : `Bearer ${token}`}}
      );
      if (response.data.length > 0) setReports(response.data);
      else 
        if(page > 0) setPage(page - 1);
    } catch (error) {
      console.log(error);
    }
  });

  useEffect(() => {
    getReports();
  }, [page]);

  return (
    <>
      <div className="reports-table-display">
        <table className="reports-table">
          <thead>
            <tr>
              <th>Post</th>
              <th>Comment</th>
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
      {showModals.commentDetails ? (
        <ReportsCommentDetails
          comment={comment}
          getReports={getReports}
          setReports={setReports}
          setPage={setPage}
          reportsLength={reports.length} 
          onCloseClick={() =>
            setShowModals({ ...showModals, commentDetails: false })
          }
        />
      ) : null}
      {showModals.postDetails ? (
        <ReportsPostDetails
          showButtons
          getReports={getReports}
          setReports={setReports}
          setPage={setPage}
          reportsLength={reports.length} 
          post={post.typeShare ? post.post : post}
          onCloseClick={() =>
            setShowModals({ ...showModals, postDetails: false })
          }
        />
      ) : null}
    </>
  );
};

export default MyReports;
