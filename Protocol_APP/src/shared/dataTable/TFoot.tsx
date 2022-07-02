//  ---------------------------------------------------------------------------------
//  Copyright © SomDigital. All rights reserved.
//  ---------------------------------------------------------------------------------

import React from 'react';

import { ComplexHeader } from './types';

interface Props {
    headers: ComplexHeader[];
    hasActions?: boolean;
    totals?: { [key: string]: number };
}

export const TFoot: React.FC<Props> = (props) => {
    if (props.totals && Object.keys(props.totals).length > 0) {
        const totalFields = props.headers.filter(f => f.total) ?? [];

        return (
            <tfoot >
                <tr>
                    {totalFields.map(field => {
                        const total = props.totals![field.key];
                        const formattedValue = field.total?.format === 'currency' ? total.toCurrency() : total.format();

                        let className = field.format === "currency" ? "text-center" : "";
                        className = field.format === "number" ? "text-center" : "";


                        return (
                            <th key={`totals-${field.key}`} colSpan={field.total?.colSpan} className={className}>
                                {field.total?.message} {formattedValue}
                            </th>
                        );
                    })
                    }
                </tr>
            </tfoot>
        );
    }

    return (
        <tfoot>
            <tr>
                {props.headers.map((header, index) => {
                    if (typeof header == 'string') {
                        return (<th key={`heading-${index}`}>{header}</th>);
                    }

                    return (
                        <th key={`heading-${header.key}`}>{header.title ? header.title : header.key}</th>
                    );
                })}

                {props.hasActions && (
                    <th className="text-center" key={'actions'}>Actions</th>
                )}
            </tr>
        </tfoot>
    );
}