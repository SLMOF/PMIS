import { TableDefaults } from "@shared";

export class PaginatedResult<T> {
    page: number = TableDefaults.page;
    size: number = TableDefaults.size;
    items: T[] = [];
    totalItems: number = 0;
    totalPages: number = 0;
}
