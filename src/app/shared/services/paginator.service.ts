import { Injectable } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';

@Injectable({
  providedIn: 'root'
})
export class PaginatorService {

  constructor() {}

  static getDutchPaginatorIntl(): MatPaginatorIntl {

    const dutchRangeLabel = (page: number, pageSize: number, length: number) => {
      
      if (length == 0 || pageSize == 0) { return `0 из ${length}`; }
      
      length = Math.max(length, 0);
    
      const startIndex = page * pageSize;
    
      // If the start index exceeds the list length, do not try and fix the end index to the end.
      const endIndex = startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;
    
      return `${startIndex + 1} - ${endIndex} из ${length}`;
    }
  
    const paginatorIntl = new MatPaginatorIntl();
    
    paginatorIntl.itemsPerPageLabel = 'Кол-во записей на странице:';
    paginatorIntl.nextPageLabel     = 'Следующая страница';
    paginatorIntl.previousPageLabel = 'Предыдущая страница';
    paginatorIntl.firstPageLabel    = 'Первая страница';
    paginatorIntl.lastPageLabel     = 'Последняя страница';
    paginatorIntl.getRangeLabel     = dutchRangeLabel;
    
    return paginatorIntl;
  }
}
