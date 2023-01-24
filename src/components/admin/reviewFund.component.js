import { useEffect } from "react";
import AdminService from "../../services/admin.service";
import { clearLoader, setLoader } from "../../store/actions/loader";

const ReviewFund = (props) => {
    
    useEffect(() => {
        // props.dispatch(setLoader());
        AdminService.fetchFundingUpdates().then((res) => {
        //   props.dispatch(clearLoader());
          console.log(res);
        });
      }, []);
    
    return(
        <div>
            <h2>Review Funding Update</h2>
        </div>
    )
}

export default ReviewFund;