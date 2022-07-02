import { Sort } from "./Sort";
import { Filter } from "./Filter";
import { Projection } from "./Projection";
import { BaseModel } from "@models";
import { TableDefaults } from "@shared";

export class PagingOptions {
    constructor(public page: number = TableDefaults.page, public size: number = TableDefaults.size) {
    }

    private filters: Filter<BaseModel>[] = [];
    private sorts: Sort[] = [];
    private projections: string[] = ['*'];

    filter<T extends BaseModel>(filtering: (f: Filter<T>) => Filter<T>) {
        const initFilter = new Filter<T>();

        this.filters = this.filters.concat(filtering(initFilter).build());

        return this;
    }

    sort<T extends BaseModel>(field: keyof T, isAscending: boolean) {
        this.sorts.push({ field: field as string, isAscending });
        return this;
    }

    project(projection: (s: Projection) => Projection) {
        const initProjection = new Projection();
        this.projections = projection(initProjection).build();
        return this;
    }

    format() {
        const searchParam = new URLSearchParams();
        searchParam.append('page', this.page.toString());
        searchParam.append('size', this.size.toString());
        searchParam.append('select', this.projections.join(','));
        this.sorts.forEach((f) => searchParam.append(`sort`, `${f.field}.${f.isAscending}`));
        this.filters.forEach((f) => searchParam.append(`${f.field}.${f.operation}`, this.valuesFormatter(f.value)));
        return searchParam.toString()
    }

    private valuesFormatter(value: any) {
        if (Array.isArray(value)) {
            let x = '';
            value.forEach((i, idx) => {
                x += `'${i}'`;
                if (idx + 1 < value.length) x += ','
            });
            return x;
        }
        return value;
    }
}
