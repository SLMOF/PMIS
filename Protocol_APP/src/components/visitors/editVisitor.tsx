import { ENDPIONTS, httpService } from '@api';
import { VisitorsModel } from '@models';
import { VisitorsViewModel } from '@viewModels';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';

const fieldset = {
    backgroundColor: "#eeeeee"
}
const legend = {
    backgroundColor: "#0E1726", color: "white"
}

interface Props {
    visitor: VisitorsModel;
    callback?: () => Promise<void>;
}

const EditVisitor: React.FC<Props> = ({ visitor, callback }) => {
    console.log("editing Visitor data", visitor);
    const [visitors, setVisitors] = useState<VisitorsModel>();
    const { register, handleSubmit, errors } = useForm();
    const [isLoading, setIsLoading] = useState(false);

    const OnEdit = async (data: VisitorsModel, e: any) => {
        e.preventDefault();
        setIsLoading(true);

        var visitorData = new VisitorsModel();
        visitorData.fullName = data.fullName;
        visitorData.host = data.host;
        visitorData.phone = data.phone;
        visitorData.purpose = data.purpose;
        visitorData.gender = data.gender;
        visitorData.visitorDate = data.visitorDate;
        visitorData.from = data.from;
        visitorData.nationalId = data.nationalId;
        visitorData.visitType = data.visitType
        visitorData.expectedDuration = data.expectedDuration;
        visitorData.meetingOffice = data.meetingOffice;
        visitorData.personAccompanying = data.personAccompanying;
        visitorData.remarks = data.remarks;
        visitorData.visitorCard = data.visitorCard;

        console.log("editing data", visitorData)
        console.log("editing data", visitor.id)
        const res = await httpService(ENDPIONTS.Visitors).update(
            visitor.id,
            visitorData
        );
        console.log("error accured", res);
        if (res.request.status === 200) {
            Swal.fire("✅", "SuccessFully Updated .", "success");
            callback?.();
        }
        setIsLoading(false);
    }
    return (
        <>
            <div className="container card mt-3">
                <div className="card-body">
                    <div className="pb-2">
                        <h5 className="card-title  fs-4  p-2 d-flex justify-content-center">
                            Edit Visitor
                        </h5>
                        <hr />
                    </div>
                    <form
                        // className="row g-3 p-2 d-flex justify-content-center"
                        onSubmit={handleSubmit(OnEdit)}
                        noValidate
                    >
                        <fieldset className="row" style={fieldset}>
                            <legend style={legend}>Personal Information</legend>
                            <div className="col-4 mb-3">
                                <label htmlFor="name" className="form-label">
                                    {" "}
                                    Full Name
                                </label>
                                <input
                                    defaultValue={visitor?.fullName}
                                    type="text"
                                    name="fullName"
                                    id="fullName"
                                    className="form-control"
                                    ref={register({ required: true })}
                                />
                                <span className="text-danger">
                                    {errors.fullName && <span>This field is required.</span>}
                                </span>
                            </div>
                            <div className="col-4 mb-3">
                                <label htmlFor="name" className="form-label">
                                    {" "}
                                    Phone Number
                                </label>
                                <input
                                    type="phone"
                                    defaultValue={visitor?.phone}
                                    name="phone"
                                    id="phone"
                                    className="form-control"
                                    ref={register({ required: true })}
                                />
                                <span className="text-danger">
                                    {errors.phoneNumber && <span>This field is required.</span>}
                                </span>
                            </div>
                            <div className="col-4 mb-3">
                                <label htmlFor="name" className="form-label">
                                    {" "}
                                    Gender
                                </label>
                                {/* <input
              type="text"
              name="gender"
              id="gender"
              className="form-control"
              ref={register({ required: true })}
            /> */}
                                <select
                                    defaultValue={visitor?.gender}
                                    name="gender"
                                    id="gender"
                                    className="form-control"
                                    ref={register()}
                                >
                                    <option value=""></option>
                                    <option value="Female">Female</option>
                                    <option value="Male">Male</option>
                                </select>
                                <span className="text-danger">
                                    {errors.gender && <span>This field is required.</span>}
                                </span>
                            </div>
                            <div className="col-4 mb-3">
                                <label htmlFor="nationalId" className="form-label">
                                    National ID
                                </label>
                                <input
                                    type="text"
                                    defaultValue={visitor?.nationalId}
                                    name="nationalId"
                                    ref={register()}
                                    className="form-control"
                                    id="nationalId"
                                />
                                <span className="text-danger">
                                    {errors.nationalId && <span>This field is required.</span>}
                                </span>
                            </div>


                        </fieldset>

                        <fieldset className="row mt-3" style={fieldset}>
                            <legend style={legend}>Visitor Information</legend>
                            <div className="col-4 mb-3">
                                <label htmlFor="name" className="form-label">
                                    {" "}
                                    Visitor Date
                                </label>
                                <input
                                    type="Date"
                                    // defaultValue={visitor?.visitorDate.toLocaleDateString('en-CA')}
                                    name="visitorDate"
                                    id="visitorDate"
                                    className="form-control"
                                    ref={register({ required: true })}
                                />
                                <span className="text-danger">
                                    {errors.visitorDate && <span>This field is required.</span>}
                                </span>
                            </div>
                            <div className="col-4 mb-3">
                                <label htmlFor="name" className="form-label">
                                    {" "}
                                    Visit Host
                                </label>
                                <input
                                    defaultValue={visitor?.host}
                                    type="text"
                                    name="host"
                                    id="host"
                                    className="form-control"
                                    ref={register()}
                                />
                                <span className="text-danger">
                                    {errors.host && <span>This field is required.</span>}
                                </span>
                            </div>
                            <div className="col-4 mb-3">
                                <label htmlFor="from" className="form-label">
                                    {" "}
                                    From
                                </label>
                                <input
                                    defaultValue={visitor?.from}
                                    type="text"
                                    name="from"
                                    id="from"
                                    className="form-control"
                                    ref={register()}
                                />
                                <span className="text-danger">
                                    {errors.from && <span>This field is required.</span>}
                                </span>
                            </div>
                            <div className="col-4 mb-3">
                                <label htmlFor="name" className="form-label">
                                    Meeting Office
                                </label>
                                <input
                                    defaultValue={visitor?.meetingOffice}
                                    type="Text"
                                    name="meetingOffice"
                                    id="MeetingOffice"
                                    className="form-control"
                                    ref={register()}
                                />
                            </div>
                            <div className="col-4 mb-3">
                                <label htmlFor="ExpectedDuration" className="form-label">
                                    Expected Duration
                                </label>
                                <input
                                    defaultValue={visitor?.expectedDuration}
                                    type="text"
                                    name="expectedDuration"
                                    ref={register()}
                                    className="form-control"
                                    id="expectedDuration"
                                />
                            </div>
                            <div className="col-4 mb-3">
                                <label htmlFor="name" className="form-label">
                                    {" "}
                                    Person Accompanying
                                </label>
                                <input
                                    defaultValue={visitor?.personAccompanying}
                                    type="number"
                                    name="personAccompanying"
                                    id="personAccompanying"
                                    className="form-control"
                                    ref={register()}
                                />
                            </div>
                            <div className="col-4 mb-3">
                                <label htmlFor="name" className="form-label">
                                    {" "}
                                    Visitor Card
                                </label>
                                <input
                                    defaultValue={visitor?.visitorCard}
                                    type="text"
                                    name="visitorCard"
                                    id="visitorCard"
                                    className="form-control"
                                    ref={register()}
                                />
                            </div>

                            <div className="col-4 mb-3">
                                <label className="form-label">Visit Type</label>
                                <select
                                    defaultValue={visitor?.visitType}
                                    className="form-control"
                                    name="visitType"
                                    id="visitType"
                                    aria-label="Default select example"
                                    ref={register()}
                                >
                                    <option></option>
                                    {/* {employeeType?.map((e: employeeType, i: number) => {
                                    return (
                                        <option key={i} value={e?.id}>
                                            {e?.type}
                                        </option>
                                    );
                                })} */}
                                </select>
                                <span className="text-danger">
                                    {errors.VisitType && <span>This field is required.</span>}
                                </span>
                            </div>
                            <div className="col-12">
                                <label htmlFor="name" className="form-label">
                                    {" "}
                                    Purpose
                                </label>
                                <textarea
                                    defaultValue={visitor?.purpose}
                                    name="purpose"
                                    id="purpose"
                                    className="form-control"
                                    rows={4}
                                    ref={register()}
                                ></textarea>
                            </div>
                            <div className="col-12">
                                <label htmlFor="Remarks" className="form-label">
                                    {" "}
                                    Remark
                                </label>
                                <textarea
                                    defaultValue={visitor?.remarks}
                                    name="remarks"
                                    id="remarks"
                                    className="form-control"
                                    rows={4}
                                    ref={register()}
                                ></textarea>
                            </div>
                            <div className="col-4 mb-3"></div>
                        </fieldset>

                        <div className="row">
                            <div className="col">
                                <div className="row float-left">
                                    <div className="col-2">
                                        <button type="button" disabled={isLoading} className='btn btn-danger mt-5' >Cancel</button>
                                    </div>
                                </div>
                            </div>
                            <div className="col">
                                <div className="row float-right">
                                    <div className="col-2">
                                        <button type="submit" disabled={isLoading} className='btn btn-secondary mt-5' >Submit</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </form>
                </div>
            </div>
        </>
    )
}

export default EditVisitor