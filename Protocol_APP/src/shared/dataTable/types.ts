
import { IconType } from 'react-icons';

export interface ComplexHeader {
    key: string;
    title?: string;
    format?: ColumnValueType;
    formatter?: (value: any) => string;
    renderer?: Renderer;
    sortable?: boolean;
    hide?: (value: any) => boolean;
    total?: Total;
    compute?: Computation;
    currency?: (val: any) => string;
}

export type Computation = <T>(row: T) => unknown;

export type Renderer = { condition: (value: any) => boolean, ifTrue: string, ifFalse: string };
export type TableHeaders = string | ComplexHeader;

export interface Action {
    key: string;
    click: (param?: any) => void;
    color?: 'success' | 'primary' | 'info' | 'danger' | 'warning' | 'dark';
    icon?: IconType;
    title?: string;
    hide?: (value: any) => boolean;
    disable?: (value: any) => boolean;
}

export interface DropDownAction {
    key: string;
    click: (param?: any) => void;
    title?: string;
    hide?: (value: any) => boolean;
    disable?: (value: any) => boolean;
}

export type Total = {
    message?: string;
    colSpan?: number;
    format: ColumnValueType | 'counter'
}

export type ColumnValueType = 'string' | 'number' | 'currency' | 'percent' | 'dateTime' | 'date' | 'none';

export function getKeyValue(obj: any, key: string) {
    const keys = key.split('.');
    let data: any = obj;

    // We don't need a loop in most cases, as most fields will not contain dots or sub fields.
    // I think loop would work just fine too. 🤔
    if (keys.length === 1) {
        data = data[keys[0]];
    } else for (const i in keys) {
        const key = keys[i];

        if (typeof (key) === 'function') continue;

        if (key.endsWith('?')) {
            if (!data[key.replace('?', '')]) {
                data = '';
                break;
            }

            data = data[key.replace('?', '')];
            continue;
        }

        data = data[key];
    }

    return data;
}

export type CustomizedFields = ComplexHeader & {
    shown: boolean
};

export type FilterableType = 'text' | 'date' | 'number' | 'select' | 'dateRange'

export interface Filterable<T> {
    key: (keyof T),
    format: FilterableType
    data?: { id: number | string, name: string }[]
    showOperations?: boolean
}
