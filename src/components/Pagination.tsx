import React from 'react';

interface IPagination {
  page: number;
  limit: number;
  total: number;
  pages: number;
  skip: number;
}

interface PaginationProps {
  pagination: IPagination;
  setPagination: (pagination: IPagination) => {} | void;
}

export const Pagination: React.FC<PaginationProps>  = ({pagination ,setPagination}) => {

  const { page, pages} = pagination;
  console.log(":::::: Pagination page  ", page, "::::: total   ", pages);

  const paginationActiveButtons = () => {
    let firstPage, lastPage, startIntervalPage, endIntervalPage;

    if (pagination.pages > 5) {
      firstPage = 1;
      lastPage = pagination.pages;
    }
    
    
  }


  return (
    <div>
      Pagination buttons
    </div>
  );
}
