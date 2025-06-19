export class PageClazz {
  pageSize: number;
  currentPage: number;
  totalRecords: number;

  constructor() {
    this.pageSize = 10;
    this.currentPage = 1;
    this.totalRecords = 0;
  }
}
