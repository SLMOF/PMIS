import { ENDPIONTS, httpService } from '@api';
import { ReSchedules } from '@components';
import { VisitorsModel } from '@models';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

interface Props {
    visitor: VisitorsModel;
    callback?: () => Promise<void>;
}


const Actions: React.FC<Props> = ({ visitor, callback }) => {

    const [visitors, setVisitors] = useState<VisitorsModel>();
    const { register, handleSubmit, errors } = useForm();
    const [isLoading, setIsLoading] = useState(false);
    const MySwal = withReactContent(Swal);
    const onAccept = async (e: any) => {
        e.preventDefault();
        setIsLoading(true);

        var visitorData = new VisitorsModel();
        visitorData.fullName = visitor.fullName;
        visitorData.phone = visitor.phone;
        visitorData.visitorDate = visitor.visitorDate;
        visitorData.expectedDuration = visitor.expectedDuration;
        visitorData.status = "Accepted"
        const res = await httpService(ENDPIONTS.Visitors).update(
            visitor.id,
            visitorData
        );
        console.log("error accured", res);
        if (res.request.status === 200) {
            Swal.fire("✅", "SuccessFully Accepted .", "success");
            callback?.();
        }
        setIsLoading(false);
    }

    const onReject = async (e: any) => {
        e.preventDefault();
        setIsLoading(true);

        var visitorData = new VisitorsModel();
        visitorData.fullName = visitor.fullName;
        visitorData.phone = visitor.phone;
        visitorData.visitorDate = visitor.visitorDate;
        visitorData.expectedDuration = visitor.expectedDuration;
        visitorData.status = "Pending"
        // const res = await httpService(ENDPIONTS.Visitors).update(
        //     visitor.id,
        //     visitorData
        // );
        // console.log("error accured", res);
        // if (res.request.status === 200) {
        //     Swal.fire("✅", "SuccessFully Rejected .", "warning");
        //     callback?.();
        // }
        setIsLoading(false);
    }

    const onReschedule = async (e: any) => {
        e.preventDefault();
        setIsLoading(true);
        MySwal.fire({
            showConfirmButton: false,
            allowOutsideClick: false,
            showCloseButton: true,
            width: "30%",
            html: <ReSchedules visitor={visitor} />,
        });
        // setIsLoading(false);
    }


    return (
        <div className="widget-header" style={{ height: "80px", alignItems: "center", alignContent: "center", justifyContent: "center", display: "flex" }}>

            <button className="btn btn-secondary btn-rounded mb-2 " style={{ fontSize: "22px" }} onClick={onAccept}>Accept</button>
            <button className="btn btn-primary btn-rounded mb-2 ml-4" style={{ fontSize: "22px" }} onClick={onReschedule}>Re-Schedule</button>
            <button className="btn btn-danger btn-rounded mb-2 ml-4" style={{ fontSize: "22px" }} onClick={onReject}>Reject</button>
        </div >

    )
}

export default Actions