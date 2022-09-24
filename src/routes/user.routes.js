import React from "react";

import ProtectedRoute from "./protectedRoutes";

import KycStatus from "../components/user/kycStatus.component";
import CreateJob from "../components/user/forms/createJobPost";
import AwardEvent from "../components/user/forms/events/awardEvent";
import WorkshopEvent from "../components/user/forms/events/workshopEvent";
import ExhibitionEvent from "../components/user/forms/events/exhibitionEvent";

import RFP from "../components/user/forms/createRFP";
import UpdateKYC from "../components/user/forms/updateKYC";
import MyJobs from "../components/user/myJobs.component";
import UpdateJob from "../components/user/forms/updateJob";
import Academics from "../components/user/forms/createAcademics";
import CSRForm from "../components/csr/csrForm";
import NgoFundingUpdate from "../components/user/ngoFundingUpdate";
import FundingUpdateNew from "../components/user/forms/createFundingupdateNew";
import FundingUpdateOld from "../components/user/forms/createFundingUpdateOld";
import MyFu from "../components/user/myFu.comonent";

import { Switch } from "react-router-dom";
import WorkshopEventDetails from "../components/user/workshopEventDetails";

const UserRoutes = () => {
  return (
    <div>
      <Switch>
        <ProtectedRoute exact path="/user/kycstatus" component={KycStatus} />
        <ProtectedRoute exact path="/user/createJob" component={CreateJob} />
        <ProtectedRoute exact path="/user/updateJob" component={UpdateJob} />
        <ProtectedRoute
          exact
          path="/user/event/workshopEvent"
          component={WorkshopEvent}
        />
        <ProtectedRoute
          exact
          path="/user/event/awardEvent"
          component={AwardEvent}
        />
        <ProtectedRoute exact path="/user/rfp" component={RFP} />
        <ProtectedRoute
          exact
          path="/user/fundingUpdateNew"
          component={FundingUpdateNew}
        />
        <ProtectedRoute
          exact
          path="/user/fundingUpdateOld"
          component={FundingUpdateOld}
        />
        <ProtectedRoute
          exact
          path="/user/event/exhibitionEvent"
          component={ExhibitionEvent}
        />
        <ProtectedRoute exact path="/user/academics" component={Academics} />
        <ProtectedRoute exact path="/user/updateKYC" component={UpdateKYC} />
        <ProtectedRoute exact path="/user/myJobs" component={MyJobs} />
        <ProtectedRoute exact path="/user/myFu" component={MyFu} />
        <ProtectedRoute exact path="/csrForm" component={CSRForm} />
        <ProtectedRoute
          exact
          path="/fundingUpdate/ngo/:id"
          component={NgoFundingUpdate}
        />
        <ProtectedRoute
          exact
          path="/event/workshop/:id"
          component={WorkshopEventDetails}
        />
      </Switch>
    </div>
  );
};
export default UserRoutes;
