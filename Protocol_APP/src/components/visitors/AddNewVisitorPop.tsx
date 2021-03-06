import { ENDPIONTS, httpService } from '@api';
import { VisitorsModel } from '@models';
import { VisitorsViewModel } from '@viewModels';
import React, { useState, useEffect } from 'react'
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

const AddNewVisitorPop: React.FC<Props> = ({ callback }) => {

    const { register, handleSubmit, errors } = useForm();
    const [isLoading, setIsLoading] = useState(false);
    // const [visitors, setVisitors] = useState<VisitorsModel[]>([]);

    const onSubmit = async (data: any, e: any) => {
        console.log("data s here ", data);
        var visitor = new VisitorsViewModel();
        visitor.fullName = data.fullName;
        visitor.phone = data.phone;
        visitor.visitorDate = data.VisitorDate.toLocaleString();
        visitor.expectedDuration = data.ExpectedDuration;
        console.log("sending data", visitor);
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




                        </fieldset>

                        <fieldset className="row mt-3" style={fieldset}>
                            <legend style={legend}>Visitor Information</legend>
                            <div className="col-4 mb-3">
                                <label htmlFor="name" className="form-label">
                                    Visitor Date
                                </label>
                                <input
                                    type="datetime-local"
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
                                <label htmlFor="ExpectedDuration" className="form-label">
                                    Expected Duration(Minutes)
                                </label>
                                <input
                                    type="number"
                                    name="ExpectedDuration"
                                    ref={register()}
                                    className="form-control"
                                    id="ExpectedDuration"
                                />
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

export default AddNewVisitorPop