//  ---------------------------------------------------------------------------------
//  Copyright © SomDigital. All rights reserved.
//  ---------------------------------------------------------------------------------

import { DateHelpers, DropDownAction, MyBarLoader } from '@shared';
import React from 'react';

import { Action, ColumnValueType, ComplexHeader, getKeyValue } from './types';

interface Props {
    data: unknown[];
    headers: ComplexHeader[];
    actions?: Action[];
    dropDownActions?: DropDownAction[];
    showCounter?: boolean;
    isFetchingPage?: boolean
}

export const TBody: React.FC<Props> = (props) => {

    if (props.isFetchingPage) {
        return (
            <tbody>
                <tr>
                    <td colSpan={(props.showCounter ? 1 : 0) + props.headers.length + (props.actions?.length ?? 0)}>
                        <div className="row justify-content-center">
                            <MyBarLoader />
                        </div>
                    </td>
                </tr>
            </tbody>
        )
    }

    if (!props.data || props.data.length < 1) {
        return (
            <tbody>
                <tr>
                    <td colSpan={(props.showCounter ? 1 : 0) + props.headers.length + (props.actions?.length ?? 0)}>
                        <div className="row justify-content-center">
                            No data...
                        </div>
                    </td>
                </tr>
            </tbody>
        );
    }

    const renderRow = (currentRow: any, index: number) => {
        const headers = props.headers;

        return (
            <tr key={`row-${index}`} >
                {props.showCounter && <td className="text-center">{index + 1}</td>}

                {headers.map(header => {
                    let data = header.compute ? header.compute(currentRow) : getKeyValue(currentRow, header.key);
                    data = header.formatter ? header.formatter(data) : data;

                    const classes = header.renderer && header.renderer.condition(currentRow) ? header.renderer.ifTrue : header.renderer?.ifFalse;
                    return renderCell(data, header, currentRow, classes);
                })}

                {props.actions && (
                    <td className="text-center">
                        <ul className="table-controls">
                            {props.actions.map(action => renderAction(action, currentRow))}
                        </ul>
                    </td>
                )}

                {props.dropDownActions && (
                    <td className="text-center">
                        <ul className="table-controls">
                            <div className="dropdown  custom-dropdown">
                                <a className="dropdown-toggle" href="#" role="button" id="dropdownMenuLink-2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-more-horizontal"><circle cx={12} cy={12} r={1} /><circle cx={19} cy={12} r={1} /><circle cx={5} cy={12} r={1} /></svg>
                                </a>
                                <div className="dropdown-menu" aria-labelledby="dropdownMenuLink-2">
                                    {props.dropDownActions.map(action => renderDropDownActions(action, currentRow))}
                                </div>
                            </div>
                        </ul>
                    </td>
                )}
            </tr>
        );
    };

    const renderCell = (value: any, header: ComplexHeader, row: any, classes?: string, colSpan?: number) => {
        const currency = header.currency && header.currency(row);
        const key = 'column-' + Math.random();
        const className = header.format === 'currency' || header.format === 'number' || header.format === 'percent' ? 'text-center' : '';

        if (header.format === 'currency') {
            let val = parseFloat(value) || 0;
            if (val < 0 && val > -0.01) {
                val = 0;
            }

            if (currency)
                value = val.toCurrency(currency);
            else
                value = val.toCurrency();
        }

        if (header.format === 'number') {
            value = (value as number).toFixed && true ? (value as number).format() : value;
        }

        if (header.format === 'percent') {
            value = '%' + value;
        }

        if (header.format === 'dateTime') {
            value = new Date(value).toLocaleString();
        }

        if (header.format === 'date') {
            value = DateHelpers.dashedDate(new Date(value));
        }

        if (header.format === 'string') {
            value = value?.toString();
        }

        const endResult = (<span className={classes}>{value}</span>);

        return (<td key={key} className={className} colSpan={colSpan}>{endResult}</td>);
    };

    const renderDropDownActions = (action: DropDownAction, row: any) => {
        return (
            <li key={action.key}>
                {/* <button type="button" onClick={(e: any) => handleClick(e, action, row)}
                    className={"btn btn-sm btn-" + action.color}>
                    {action.title}
                </button> */}
                <a href="/#" className="dropdown-item" onClick={(e: any) => handleDropDownItemClick(e, action, row)} >{action.title}</a>
            </li>
        );
    }

    const renderAction = (action: Action, row: any) => {
        const isHidden = action.hide && action.hide(row);
        const isDisabled = action.disable && action.disable(row);
        if (isHidden) {
            return (<></>);
        }

        if (isDisabled) {
            return (<li key={action.key}>
                <button type="button" className={"btn btn-sm btn-" + action.color} disabled>
                    {action.title}
                </button>
            </li>);
        }

        if (action.icon) {
            // Render an icon button.
            return (
                <li key={action.key}>
                    <a href="#!" role="button" onClick={(e) => handleClick(e, action, row)}
                        data-toggle="tooltip" data-placement="top" title={action.title}
                        className={'text-' + action.color}>
                        <action.icon />
                    </a>
                </li>
            );
        }

        return (
            <li key={action.key}>
                <button type="button" onClick={(e: any) => handleClick(e, action, row)}
                    className={"btn btn-sm btn-" + action.color}>
                    {action.title}
                </button>
                {/* <a href="#!" onClick={(e) => handleClick(e, action, row)}
                    className={"btn btn-sm rounded btn-" + action.color}>
                    {action.title}
                </a> */}
            </li>
        );
    };

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, action: Action, row: any) => {
        action.click(row);
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDropDownItemClick = (e: React.MouseEvent<HTMLAnchorElement>, action: DropDownAction, row: any) => {
        action.click(row);
        e.preventDefault();
        e.stopPropagation();
    };

    return (
        <tbody>
            {props.data.map((row, index) => renderRow(row, index))}
        </tbody>
    );
}
