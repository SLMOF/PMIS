import { ENDPIONTS, httpService } from '@api';
import { VisitorsModel } from '@models';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
const fieldset = {
  backgroundColor: "#eeeeee"
}
interface Props {
  visitor: VisitorsModel;
  // callback?: () => Promise<void>;
}

const ReSchedules: React.FC<Props> = ({ visitor }) => {
  console.log("visitor", visitor);
  const { register, handleSubmit, errors } = useForm();
  const [isLoading, setIsLoading] = useState(false);

  const OnEdit = async (data: VisitorsModel) => {
    // e.preventDefault();
    setIsLoading(true);

    var visitorData = new VisitorsModel();
    visitorData.fullName = visitor.fullName;
    visitorData.host = visitor.host;
    visitorData.phone = visitor.phone;
    visitorData.visitorDate = data.visitorDate;
    visitorData.status = "Pending"

    console.log("editing dataaaaaaaaaaaa", visitorData)
    console.log("editing data", visitor.id)
    const res = await httpService(ENDPIONTS.Visitors).update(
      visitor.id,
      visitorData
    );
    console.log("error accured", res);
    if (res.request.status === 200) {
      Swal.fire("✅", "SuccessFully Updated .", "success");
      // callback?.();
    }
    setIsLoading(false);
  }

  return (
    <>
      <div className="container card mt-3">
        <div className="card-body">
          <div className="pb-2">
            <h5 className="card-title  fs-4  p-2 d-flex justify-content-center">
              Re Schedule Visitor
            </h5>
            <hr />
          </div>
          <form
            // className="row g-3 p-2 d-flex justify-content-center"
            onSubmit={handleSubmit(OnEdit)}
            noValidate
          >
            <fieldset className="row mt-3" style={fieldset}>
              <div className="col-12 mb-3">
                <label htmlFor="name" className="form-label">
                  {" "}
                  Visitor Date
                </label>
                <input
                  type="datetime-local"
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

export default ReSchedules