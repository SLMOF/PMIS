export class Projection {
    private selectedFields: string[] = ['*']
    private joinedTableName: string = '';
    private joinedFields: string[] = [];

    select<T>(...fields: (keyof T)[]) {

        this.selectedFields = fields as string[];

        return this;
    }

    join<T>(tableName: string, fields: (keyof T)[]) {
        this.joinedTableName = tableName;
        this.joinedFields = fields as string[];

        return this;
    }

    compute<T>(field: keyof T, functionName: string, params?: {}) {

        return this;
    }

    build(): string[] {
        return [`${this.selectedFields},${this.joinedTableName} (${this.joinedFields})`]
    }
}
