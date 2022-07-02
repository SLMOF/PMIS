import { ENDPIONTS, httpService } from '@api';
import { MyContainer } from '@components';
import { VisitorsModel } from '@models'
import { ComplexHeader, Table } from '@shared';
import React, { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const VisitorList = () => {
    const [visitors, setVisitors] = useState<VisitorsModel[]>([]);
    const [isFetchingPage, setIsFetchingPage] = useState(true);
    const { register, handleSubmit, errors } = useForm();
    const MySwal = withReactContent(Swal);

    const fetchVisitors = useCallback(async () => {
        var res = await httpService(ENDPIONTS.Visitors).getAll();
        setVisitors(res.data);
        setIsFetchingPage(false);
    }, [])

    useEffect(() => {
        fetchVisitors();
    }, [fetchVisitors])

    const headers: ComplexHeader[] = [
        { key: "fullName", title: "Name" },
        { key: "Phone", title: "Phone" },
        { key: "Host", title: "Host" },
        { key: "VisitorDate", title: "Visiting Date" },
        { key: "Purpose", title: "Purpose" },
        // { key: "From?", title: "From" },
        // { key: "NationalId", title: "National ID" },
        // { key: "VisitType", title: "Visit Type" },
        // { key: "NationalId", title: "National ID" },
        // { key: "ExpectedDuration", title: "Expected Duration" },
        // { key: "MeetingOffice", title: "Meeting Office" },
        // { key: "PersonAccompanying", title: "PersonAccompanying" },
        // { key: "Remarks", title: "Remarks" },
        // { key: "VisitorCard", title: "Visitor Card" },
        { key: "Department?.name", title: "Department" },
    ];

    const onSubmit = async () => { }
    return (
        <MyContainer title='Visitors List' head='Visitors List' size='col-12' >
            <Table data={visitors} headers={headers} showCounter isFetchingPage={isFetchingPage} />
        </MyContainer>
    )
}

export default VisitorList