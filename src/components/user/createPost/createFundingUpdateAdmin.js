import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";

import "bootstrap/dist/css/bootstrap.min.css";
import { connect, useSelector } from "react-redux";

import { yupResolver } from "@hookform/resolvers/yup";
import { validationSchemaFundingUpdate, validationSchemaFundingUpdateAdmin } from "../../../constants/schema";

import { renderStatesNew } from "../../../services/render-services";
import { clearLoader, setLoader } from "../../../store/actions/loader";
import MyEditor from "../../../helpers/editor";

import UserService from "../../../services/user.service";
import { alertCustom } from "../../../helpers/alerts";
import { useLocation } from "react-router-dom";
import Multiselect from "multiselect-react-dropdown";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import { QUESTIONS } from "../../../constants/variables";
let csrSectionSet = new Set();
const Info = (props) => {
  const { reason } = props;
  return (
    <OverlayTrigger
      delay={{ hide: 450, show: 300 }}
      overlay={(props) => (
        <Tooltip {...props}>
          <p>{reason[0]}</p>
          <p>{reason[1]}</p>
        </Tooltip>
      )}
      placement="top"
    >
      <i className="fa fa-info-circle" />
    </OverlayTrigger>
  );
};
const FormControlLabelPosition = (props) => {
  const { csrList, setCSRSection } = props;

  const handleChangeCheckbox = (e) => {
    if (e.target.checked) {
      csrSectionSet.add(e.target.value);
    } else {
      csrSectionSet.delete(e.target.value);
    }
    console.log(csrSectionSet);
    setCSRSection(csrSectionSet);
  };
  return (
    <FormControl component="fieldset">
      <FormGroup aria-label="position" row>
        {csrList.map((item, index) => {
          return (
            <>
              <FormControlLabel
                className="w-25"
                value={item.identifier}
                control={
                  <Checkbox
                    size="large"
                    onChange={handleChangeCheckbox}
                    inputProps={{ "aria-label": "controlled" }}
                  />
                }
                label={
                  <>
                    <span className="me-2">{item.sectionText}</span>
                    <Info reason={QUESTIONS[index]} />
                  </>
                }
                labelPlacement="end"
                key={index}
              />
            </>
          );
        })}
      </FormGroup>
    </FormControl>
  );
};
const FundingUpdateAdmin = (props) => {
  const [csrSection, setCSRSection] = useState([]);
  const [cities, setCities] = useState();
  const [thematicArea, setThematicArea] = useState([]);
  const [selectedCities, setSelectedCities] = useState([]);
  const [gender, setGender] = useState([]);
  const [size, setSize] = useState(false);
  const [prev, setPrev] = useState(false);
  const { user } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({ resolver: yupResolver(validationSchemaFundingUpdateAdmin) });
  const onChangeState = (e) => {
    // eslint-disable-next-line
    var __FOUND = props.fuDataBean.stateBeans.find(function (states, index) {
      // eslint-disable-next-line
      if (states.id === e.target.value) return true; // eslint-disable-next-line
    });

    setCities(__FOUND.cityBeans);
  };
  const location = useLocation();
  console.log('errors', errors);
  console.log('props', props);
  const onSubmit = (values) => {
    let csrSections = [...csrSection];
    props.dispatch(setLoader());

    const data = {
      title: values.fuTitle,
      description: values.description,
      applicationDeadline: new Date(values.applicationDeadline).getTime(),
      termsAndConditions: "true",
      location: "",
      thematicAreaList: thematicArea,
      externalLink: values.externalLink,
      postedBy: values.postedBy,
      cities: selectedCities,
    };
    console.log('data', data);
// return
    UserService.createFundingUpdate(data)
      .then((res) => {
        props.dispatch(clearLoader());
        console.log('res', res);
        if (res.data.status === 1) {
          alertCustom("success", "Successfully Created", "/home");
        } else {
          alertCustom("error", res.data.message, "/home");
        }
      })
      .catch((error) => {
        console.log('error.response', error.response);
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        alertCustom("error", message, "/home");
      });
  };

  const handleThematicArea = (e) => {
    let temp = [];
    e.forEach((item) => {
      temp.push(item.id);
    });
    setThematicArea(temp);
  };
  const handleSelectedCities = (e) => {
    let temp = [];
    e.forEach((item) => {
      temp.push(item.id);
    });

    setSelectedCities(temp);
  };
  const handleGender = (e) => {
    let temp = [];
    e.forEach((item) => {
      temp.push(item.id);
    });
    setGender(temp);
  };

  const handleSize = (e) => {
    setSize(e.target.checked);
  };
  const handlePrevious = (e) => {
    setPrev(e.target.checked);
  };
  const [fuType, setFuType] = useState("");

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mx-auto">
        <h1>
          Create Funding Proposal{" "}
          <span className="ms-2 expire-text-box p-2">
            {location.state ? location.state.expiryText : ''}
          </span>
          <span className="ms-2 in-review p-2">
            {location.state ? location.state.package ? " Premium " : "Standard" : ''}
          </span>
        </h1>
      </div>

      {props && props.fuDataBean && (
        <div>
          {" "}
          <div className="custom-card p-4">
            <h4>Details</h4>

            <div className="form-group">
              <label htmlFor="fuTitle">Funding Update Title</label>
              <input
                className={
                  errors.fuTitle ? "form-control is-invalid" : "form-control"
                }
                type="text"
                {...register("fuTitle")}
              />
              {errors.fuTitle && errors.fuTitle.message ? (
                <div className="invalid-feedback">{errors.fuTitle.message}</div>
              ) : null}
            </div>
           
            <div className="form-group">
              <label htmlFor="description"> Funding Description </label>
              <Controller
                name="description"
                control={control}
                rules={{ required: true }}
                className={
                  errors.description
                    ? "form-control is-invalid"
                    : "form-control"
                }
                render={(field) => <MyEditor {...field} errors={errors} />}
              />
              <small className="text-danger">
                {errors.description && errors.description.message}
              </small>
            </div>

            <div className="form-group">
              <div className="font-bold text-current">Thematic Area</div>
              <Multiselect
                isObject={true}
                onRemove={handleThematicArea}
                onSelect={handleThematicArea}
                options={props.fuDataBean.thematicAreaBeans}
                displayValue="name"
              />
            </div>

         
            {fuType === "Offline" && (
              <div className="row">
                <label>Location</label>
                <div className="col-6 form-group">
                  <select onChange={onChangeState} className="form-select">
                    {renderStatesNew(props.fuDataBean.stateBeans)}
                  </select>
                </div>
                <div className="col-6 form-group">
                  <Multiselect
                    isObject={true}
                    onRemove={handleSelectedCities}
                    onSelect={handleSelectedCities}
                    options={cities}
                    displayValue="name"
                  />
                </div>
              </div>
            )}
            
            <div className="form-group">
              <label htmlFor="postedBy">
                Posted By{" "}
                <span className="text-muted">
                  <em>
                    ( Name of Organization/Organizer/SPOC/Contact Person )
                  </em>
                </span>
              </label>
              <input
                {...register("postedBy")}
                className={
                  errors.postedBy ? "form-control is-invalid" : "form-control"
                }
              />
              {errors.postedBy && errors.postedBy.message ? (
                <div className="invalid-feedback">
                  {errors.postedBy.message}
                </div>
              ) : null}
            </div>
            <div className="form-group">
              <label htmlFor="postedBy">
                External Link{" "}
              </label>
              <input
                {...register("externalLink")}
                className={
                  errors.postedBy ? "form-control is-invalid" : "form-control"
                }
              />
              {errors.postedBy && errors.postedBy.message ? (
                <div className="invalid-feedback">
                  {errors.externalLink.message}
                </div>
              ) : null}
            </div>

            <div className="form-group">
              <label htmlFor="applicationDeadline">
                Last Date of Submission{" "}
                <span className="text-danger">
                  <em>
                    ( *Note - The post will be deleted after Last Date of
                    Application or if the post expires )
                  </em>
                </span>
              </label>
              <input
                {...register("applicationDeadline")}
                className={
                  errors.applicationDeadline
                    ? "form-control is-invalid"
                    : "form-control"
                }
                type="date"
              />
              {errors.applicationDeadline &&
                errors.applicationDeadline.message ? (
                <div className="invalid-feedback">
                  {errors.applicationDeadline.message}
                </div>
              ) : null}
            </div>
            <div className="form-group form-check">
              <input
                {...register("terms")}
                className={
                  errors.terms
                    ? "form-check-input is-invalid"
                    : "form-check-input"
                }
                type="checkbox"
              ></input>
              <label htmlFor="terms" className="form-check-label">
                I Agree to Glocal Bodh
                <span>
                  <a
                    href="/rfpPolicy"
                    style={{ color: "#0057A8", textDecoration: "none" }}
                    target="_blank"
                  >
                    {" "}
                    Posting Policy
                  </a>
                </span>
                ,
                <span>
                  <a
                    href="/terms"
                    style={{ color: "#0057A8", textDecoration: "none" }}
                    target="_blank"
                  >
                    Terms of Service
                  </a>
                </span>
                {" and "}
                <span>
                  <a
                    href="/privacyPolicy"
                    style={{ color: "#0057A8", textDecoration: "none" }}
                    target="_blank"
                  >
                    Privacy Policy
                  </a>
                </span>
              </label>
              {errors.terms && errors.terms.message ? (
                <div className="invalid-feedback">{errors.terms.message}</div>
              ) : null}
            </div>
            <div className="form-group mt-2 text-center">
              <button
                type="submit"
                className="btn btn-primary mt-2 btn-lg"
                disabled={props.isLoading}
              >
                {props.isLoading ? "Please wait..." : "Submit"}
              </button>
            </div>
          </div>
        </div>
      )}
    </form>
  );
};
function mapStateToProps(state) {
  const { isLoading } = state.loader;
  const { states } = state.states;
  const { fuDataBean } = state.fuData;

  return {
    isLoading,
    states,
    fuDataBean,
  };
}

export default connect(mapStateToProps)(FundingUpdateAdmin);
