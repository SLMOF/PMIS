import { ENDPIONTS, httpService } from '@api';
import { VisitorsModel } from '@models';
import React, { useCallback, useEffect, useState } from 'react'

const fieldset = {
    backgroundColor: "#330022",
    height: "50px",
    display: "block",
    width: "90%",
    padding: "4px"
}
const titile = {
    fontSize: "25px",
    color: "#FFFF",
    paddingLeft: "8px"
}
const body = {
    backgroundColor: "#ffff",
    marginTop: "60px",
    padding: "0px",
    marginLeft: "4px"
}

interface Props {
    visitorId?: number;
}

const VisitorDetails: React.FC<Props> = ({ visitorId }) => {
    const [visitors, setVisitors] = useState<VisitorsModel>(new VisitorsModel());
    const [isFetchingPage, setIsFetchingPage] = useState(true);
    const [refreshPage, setRefreshPage] = useState(false);


    const fetchVisitors = useCallback(async () => {
        var res = await httpService(ENDPIONTS.Visitors).getById(visitorId);
        setVisitors(res?.data);
        setIsFetchingPage(false);
        setRefreshPage(false);
    }, [visitorId])

    useEffect(() => {
        fetchVisitors();
    }, [fetchVisitors, refreshPage])

    console.log("Id is", visitorId)
    console.log("data is", visitors)
    return (
        <div className="row" style={body}>
            <div className="offset-1">
                {/* <div className="col-3">
                    <img alt="avatar" src={employee?.profileImgUrl ? employee.profileImgUrl : `/assets/img/avatar.png`} style={{ width: "12rem" }} className="rounded" />
                    
                </div> */}
            </div>
            <div className="col-10 mt-5">
                <div style={fieldset} className="col-12 mb-3">
                    <p style={titile} >
                        Visitor Detail</p>
                </div>
                <fieldset className="row mb-3">
                    <legend>Personal Information</legend>
                    <label className="col-4  mb-3">Full Name: <span className="font-weight-bold">{visitors?.fullName}</span></label>
                    <label className="col-4 mb-3">Gender:  <span className="font-weight-bold">{visitors?.gender}</span></label>
                    <label className="col-4 mb-3">National Id:  <span className="font-weight-bold">{visitors?.nationalId}</span></label>
                    <label className="col-4 mb-3">Phone Number:  <span className="font-weight-bold">{visitors?.phone}</span></label>
                </fieldset>
                <fieldset className="row mb-3">
                    <legend>Visitor Information</legend>
                    <label className="col-4 mb-3">Visitor Date:  <span className="font-weight-bold">{visitors?.visitorDate}</span></label>
                    <label className="col-4 mb-3">Visit Host:  <span className="font-weight-bold">{visitors?.host}</span></label>
                    <label className="col-4 mb-3">Visitor From:  <span className="font-weight-bold">{visitors?.from}</span></label>
                    <label className="col-4 mb-3">Meeting Office:  <span className="font-weight-bold">{visitors?.meetingOffice}</span></label>
                    <label className="col-4 mb-3">Expected Duration:  <span className="font-weight-bold">{visitors?.expectedDuration}</span></label>
                    <label className="col-4 mb-3">Person Accompanying:  <span className="font-weight-bold">{visitors?.personAccompanying}</span></label>
                    <label className="col-4 mb-3">Visitor Card:  <span className="font-weight-bold">{visitors?.visitorCard}</span></label>
                    <label className="col-4 mb-3">Visit Type:   <span className="font-weight-bold">{visitors?.visitType}</span></label>
                </fieldset>
                <fieldset className="row mb-3">
                    <legend className="font-weight-bold">Purpose</legend>
                    <label className="col-4 mb-3">Purpose:   <span className="font-weight-bold">{visitors?.purpose}</span></label>
                    <label className="col-4 mb-3">Remarks:  <span className="font-weight-bold">{visitors?.remarks}</span></label>
                </fieldset>
            </div>
        </div>
    )
}

export default VisitorDetails