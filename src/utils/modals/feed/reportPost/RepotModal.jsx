import React, { useEffect } from "react";
import { useState } from "react";
import { FaRegWindowClose } from "react-icons/fa";

import "./ReportModal.css";

const ReportPostModal = (props) => {
  const [reasonReport, setReasonReport] = useState(null);

  useEffect(()=>{
    setReasonReport(null);
  }, null)
  
  return (
    <>
      {props.show ? (
        <div className="reportModal-modal">
          <div className="reportModal-modal-main">
            <div className="reportModal-modal-header">
              <h3 className="reportModal-modal-title">Report</h3>
              <button
                className="reportModal-modal-btnClose"
                onClick={props.onCloseClick}
              >
                <FaRegWindowClose />
              </button>
            </div>
            <div className="reportModal-modal-body">

              <label className="reportModal-modal-reason" htmlFor="sexualContent" onClick={()=> setReasonReport("Sexual content")}>
                <input type="radio" name="reasonReport" className="reportModal-modal-choice" id="sexualContent"/>
                <span>Sexual content</span>
              </label>

              <label className="reportModal-modal-reason" htmlFor="suicide" onClick={()=> setReasonReport("Suicide or severe injury")}>
                <input type="radio" name="reasonReport" className="reportModal-modal-choice" id="suicide"/>
                <span>Suicide or severe injury</span>
              </label>

              <label className="reportModal-modal-reason" htmlFor="harassment" onClick={()=> setReasonReport("Harassment")}>
                <input type="radio" name="reasonReport" className="reportModal-modal-choice" id="harassment"/>
                <span>Harassment</span>
              </label>

              <label className="reportModal-modal-reason" htmlFor="violence" onClick={()=> setReasonReport("Violence or physical harm")}>
                <input type="radio" name="reasonReport" className="reportModal-modal-choice" id="violence"/>
                <span>Violence or physical harm</span>
              </label>

              <label className="reportModal-modal-reason" htmlFor="falseInformation" onClick={()=> setReasonReport("False information")}>
                <input type="radio" name="reasonReport" className="reportModal-modal-choice" id="falseInformation"/>
                <span>False information</span>
              </label>

              <label className="reportModal-modal-reason" htmlFor="spam" onClick={()=> setReasonReport("Spam")}>
                <input type="radio" name="reasonReport" className="reportModal-modal-choice" id="spam"/>
                <span>Spam</span>
              </label>

              <label className="reportModal-modal-reason" htmlFor="hateSpeech" onClick={()=> setReasonReport("Hate speech")}>
                <input type="radio" name="reasonReport" className="reportModal-modal-choice" id="hateSpeech"/>
                <span>Hate speech</span>
              </label>

              <label className="reportModal-modal-reason" htmlFor="terrorism" onClick={()=> setReasonReport("Terrorism")}>
                <input type="radio" name="reasonReport" className="reportModal-modal-choice" id="terrorism"/>
                <span>Terrorism</span>
              </label>

              <label className="reportModal-modal-reason" htmlFor="account" onClick={()=> setReasonReport("Fake account or account theft")}>
                <input type="radio" name="reasonReport" className="reportModal-modal-choice" id="account"/>
                <span>Fake account or account theft</span>
              </label>

              <label className="reportModal-modal-reason" htmlFor="animalAbuse" onClick={()=> setReasonReport("Animal abuse")}>
                <input type="radio" name="reasonReport" className="reportModal-modal-choice" id="animalAbuse"/>
                <span>Animal abuse</span>
              </label>

              <label className="reportModal-modal-reason" htmlFor="privacy" onClick={()=> setReasonReport("Privacy violation")}>
                <input type="radio" name="reasonReport" className="reportModal-modal-choice" id="privacy"/>
                <span>Privacy violation</span>
              </label>

              <button
                className="reportModal-modal-btnEdit"
                onClick={() => props.onSubmitClick(reasonReport)}
                disabled={!reasonReport}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default ReportPostModal;
