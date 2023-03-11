import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Modal from "react-bootstrap/Modal";
import parse from "html-react-parser";
import { connect } from "react-redux";

import { CustomForm, Radio, Label, TextArea, Input } from "../utils/inputs";
import { validationSchemaReviewJob } from "../constants/schema";
import AdminService from "../services/admin.service";
import { alert, alertCustom } from "./alerts";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const FundingReviewModal = (props) => {
  const methods = useForm({ resolver: yupResolver(validationSchemaReviewJob) });

  const { data } = props;

  const { watch } = methods;
  const status = watch("approve", "");

  const onSubmit = (values) => {
    values.fundingUpdateId = data.id;
    values.fundingUpdateStatus = 2;
    // console.log(posterImg);
    // values.posterImageLink = posterImg;

    if (status === "disapprove") {
      values.fundingUpdateStatus = 3;
    }
    console.log('values', values);
    let body = { ...values }
    delete body['approve']
    AdminService.reviewFundingUpdate(body)
      .then((res) => {
        console.log(res);
        // return
        // if (res.data.status === 1) {
        //   alert("success", "Event is Successfully Reviewed");
        // } else {
        //   alert("error", res.data.message);
        // }
      })
      .catch((err) => {
        alertCustom("error", err.message, "/home");
      });
  };

  return (
    <Modal
      show={props.show}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      scrollable={true}
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          Funding Update Details
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {parse(data.title)}
        {parse(data.fundingUpdateCategory)}
        {parse(data.description)}
        <p>Client Name: {data?.createdBy}</p>
        {/* <p>Number: {data?.organisedBy?.contactNumber}</p>
        <p>Email: {data?.organisedBy?.email}</p>
        <p>Registration Fee: {data?.fees}</p>
        <p>Total Seats: {data?.totalSeats}</p> */}
        {props?.user?.admin && (
          <FormProvider {...methods}>
            <CustomForm onSubmit={onSubmit}>
              {/* <Input name={"posterImageLink"} label="Poster Image" /> */}
              <Label label="Actions" />
              <Radio
                name="approve"
                values={["approve", "disapprove"]}
                labels={["Approve", "Disapprove"]}
              />

              {status === "disapprove" && (
                <TextArea name="reasonText" label="Reasons" />
              )}
              <button className="btn btn-primary mt-2">Submit</button>
            </CustomForm>
          </FormProvider>
        )}
      </Modal.Body>
      <Modal.Footer>
        <button className="btn btn-primary" onClick={props.onHide}>
          Close
        </button>
      </Modal.Footer>
    </Modal>
  );
};

function matchStateToProps(state) {
  const { user } = state.auth;
  return {
    user,
  };
}
export default connect(matchStateToProps)(FundingReviewModal);
