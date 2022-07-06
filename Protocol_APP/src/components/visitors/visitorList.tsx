import { ENDPIONTS, httpService } from '@api';
import { MyContainer } from '@components';
import { VisitorsModel } from '@models'
import { Action, ComplexHeader, Table } from '@shared';
import React, { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import EditVisitor from './editVisitor';

const VisitorList = () => {
    const [visitors, setVisitors] = useState<VisitorsModel[]>([]);
    const [isFetchingPage, setIsFetchingPage] = useState(true);
    const MySwal = withReactContent(Swal);
    const navigate = useNavigate();


    const fetchVisitors = useCallback(async () => {
        var res = await httpService(ENDPIONTS.Visitors).getAll();
        setVisitors(res.data);
        setIsFetchingPage(false);
    }, [])

    useEffect(() => {
        fetchVisitors();
    }, [fetchVisitors])

    const onEditClickHandler = (e: VisitorsModel) => {
        //  navigate('/taxpayers/edit', {state:t});
        MySwal.fire({
            showConfirmButton: false,
            allowOutsideClick: false,
            showCloseButton: true,
            width: "80%",
            html: <EditVisitor visitor={e} callback={fetchVisitors} />,
        });
    };

    const headers: ComplexHeader[] = [
        { key: "fullName", title: "Name" },
        { key: "phone", title: "Phone" },
        { key: "host", title: "Host" },
        { key: "visitorDate", title: "Visiting Date", format: "date" },
        { key: "purpose", title: "Purpose" },
        // { key: "From?", title: "From" },
        // { key: "NationalId", title: "National ID" },
        // { key: "VisitType", title: "Visit Type" },
        // { key: "NationalId", title: "National ID" },
        { key: "expectedDuration", title: "Expected Duration" },
        // { key: "MeetingOffice", title: "Meeting Office" },
        // { key: "PersonAccompanying", title: "PersonAccompanying" },
        // { key: "Remarks", title: "Remarks" },
        // { key: "VisitorCard", title: "Visitor Card" },
        // { key: "Department?.name", title: "Department" },
    ];

    const actions: Action[] = [
        {
            key: "1",
            click: (e: VisitorsModel) => {
                navigate("/visitor/details", { state: e.id });
            },
            title: "Details",
            color: "dark",
        },

        {
            key: "2",
            click: (e: VisitorsModel) => {
                onEditClickHandler(e);
            },
            title: "Edit",
            color: "warning",
        },
    ];

    const onSubmit = async () => { }
    return (
        <MyContainer title='Visitors List' head='Visitors List' size='col-12' >
            <Table data={visitors} headers={headers} showCounter isFetchingPage={isFetchingPage} actions={actions} />
        </MyContainer>
    )
}

export default VisitorList