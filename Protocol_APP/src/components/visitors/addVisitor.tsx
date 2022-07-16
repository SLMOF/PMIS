import { ENDPIONTS, httpService } from '@api';
import { VisitorsModel } from '@models';
import { VisitorsViewModel } from '@viewModels';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { Navigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const fieldset = {
    backgroundColor: "#eeeeee"
}
const legend = {
    backgroundColor: "#0E1726", color: "white"
}
interface Props {
    owner?: VisitorsModel;
    callback?: () => void
}

const AddVisitor: React.FC<Props> = ({ owner, callback }) => {

    const { register, handleSubmit, errors } = useForm();
    const [isLoading, setIsLoading] = useState(false);
    // const [visitors, setVisitors] = useState<VisitorsModel[]>([]);

    const onSubmit = async (data: any, e: any) => {
        console.log("data s here ", data);
        var visitor = new VisitorsViewModel();
        visitor.fullName = data.fullName;
        visitor.host = data.host;
        visitor.phone = data.phone;
        visitor.purpose = data.Purpose;
        visitor.gender = data.gender;
        visitor.visitorDate = data.visitorDate;
        visitor.from = data.from;
        visitor.nationalId = data.nationalId;
        visitor.visitType = data.VisitType
        visitor.expectedDuration = data.ExpectedDuration;
        visitor.meetingOffice = data.MeetingOffice;
        visitor.personAccompanying = data.PersonAccompanying;
        visitor.remarks = data.Remarks;
        visitor.visitorCard = data.VisitorCard;

        var res = await httpService(ENDPIONTS.Visitors).post(visitor);
        if (res.request.status === 200) {
            Swal.fire("✅", "SuccessFully Created .", "success");
            callback?.();
            setIsLoading(false);
            e.target.reset();
            window.location.assign('/visitor/list');
            return <Navigate to={`/visitor/list`} />;
        }
        return;
    }

    return (
        <>
            <div className="container card mt-3">
                <div className="card-body">
                    <div className="">
                        <h5 className="card-title  fs-4  p-2 d-flex justify-content-center">
                            Add Visitor
                        </h5>
                        <hr />
                    </div>
                    <form
                        // className="row g-3 p-2 d-flex justify-content-center"
                        onSubmit={handleSubmit(onSubmit)}
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
                                    name="VisitorDate"
                                    id="VisitorDate"
                                    className="form-control"
                                    ref={register({ required: true })}
                                />
                                <span className="text-danger">
                                    {errors.VisitorDate && <span>This field is required.</span>}
                                </span>
                            </div>
                            <div className="col-4 mb-3">
                                <label htmlFor="name" className="form-label">
                                    {" "}
                                    Visit Host
                                </label>
                                <input
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
                                    type="Text"
                                    name="MeetingOffice"
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
                                    type="text"
                                    name="ExpectedDuration"
                                    ref={register()}
                                    className="form-control"
                                    id="ExpectedDuration"
                                />
                            </div>
                            <div className="col-4 mb-3">
                                <label htmlFor="name" className="form-label">
                                    {" "}
                                    Person Accompanying
                                </label>
                                <input
                                    type="number"
                                    name="PersonAccompanying"
                                    id="PersonAccompanying"
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
                                    type="text"
                                    name="VisitorCard"
                                    id="VisitorCard"
                                    className="form-control"
                                    ref={register()}
                                />
                            </div>

                            <div className="col-4 mb-3">
                                <label className="form-label">Visit Type</label>
                                <select
                                    className="form-control"
                                    name="VisitType"
                                    id="VisitType"
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
                                    name="Purpose"
                                    id="Purpose"
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
                                    name="Remarks"
                                    id="Remarks"
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

export default AddVisitor