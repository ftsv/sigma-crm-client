import React from 'react';
import { Button } from 'react-bootstrap';
import cn from 'classnames';

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
  maxButtons?: number;
  roundButtons?: boolean;
}

/* TODO Pagination:
round buttons available
limit per page
*/

export const Pagination: React.FC<PaginationProps>  = React.memo(({
  pagination ,
  setPagination, 
  maxButtons = 5,
}) => {

  const { page, pages} = pagination;
  // let maxButtons = 5;
  const buttonsArray: number[] = [];
  let finalArray: any[] = [];

  const paginationArray = () => {
    for (let i = 1 ; i < (pages + 1); i++) {
      buttonsArray.push(i);
    }

    if ( pages <= maxButtons + 3 || pages <= 5) {
      finalArray = [];
      finalArray = [...buttonsArray];
    } else if (pages >= maxButtons) {
      if (page <= maxButtons) {
        buttonsArray.splice(0, maxButtons).forEach(i => finalArray.push(i));
        finalArray.push(
          '>',
          '...',
          buttonsArray[buttonsArray.length - 1],
          );
      } else if (page >= (pages - maxButtons + 1)) {
        finalArray.push(
          buttonsArray[0],
          '..',
          '<',
          );
        buttonsArray.splice(pages - maxButtons, maxButtons).forEach(i => finalArray.push(i));
      } else if (page > maxButtons) {
        finalArray.push(
          buttonsArray[0],
          '..',
          '<',
          );
        buttonsArray.splice(page - 1 - Math.floor(maxButtons / 2), maxButtons ).map(num => finalArray.push(num));
        finalArray.push(
          '>',
          '...',
          buttonsArray[buttonsArray.length - 1],
          );
      }
    }

    return (
      <div className="d-flex justify-content-center m-1">
        {finalArray.map(btn => {
          if (typeof btn === 'number') {
            return (
              <Button
                key={btn}
                type="button"
                onClick={() => setPagination({...pagination, page: (btn) })}
                className={cn("btn", "btn-sm", "btn-outline-*",
                {
                  // "btn-outline-warning": btn !== page,
                  "btn-primary": btn === page,
                }
                )}
                style={{
                  marginLeft: "5px",
                  width: "3rem",
                }}
                disabled={(btn === page) ? true : false}
              >
                {btn}
              </Button>
            )}

          if (btn === '...' && finalArray.indexOf(btn) > finalArray.length - maxButtons) {
            console.log(finalArray.indexOf(btn) > finalArray.length - maxButtons);
            return (
              <Button
                key={btn}
                type="button"
                // onClick={() => setPagination({...pagination, page: ((page + maxButtons) <= pages) ? (page + maxButtons) : pages})}
                disabled={true}
                className="btn btn-sm btn-outline-primary"
                style={{
                  marginLeft: '5px',
                }}
              >
                {btn}
              </Button>
            )}

          if (btn === '<') {
            return (
              <Button
                key={btn}
                type="button"
                onClick={() => setPagination({...pagination, page: page - 1})}
                className="btn btn-sm"
                style={{
                  marginLeft: '5px',
                  width: "2rem",
                }}
              >
                {btn}
              </Button>
            )}

          if (btn === '>') {
            return (
              <Button
                key={btn}
                type="button"
                onClick={() => setPagination({...pagination, page: page + 1})}
                className="btn btn-sm"
                style={{
                  marginLeft: '5px',
                  width: "2rem",
                  // borderRadius: roundButtons ? "100%" : "0px",
                }}
              >
                {btn}
              </Button>
            )}

          if (btn === '..') {
            console.log(finalArray.indexOf(btn) < maxButtons);
            return (
              <Button
                key={btn}
                type="button"
                // onClick={() => setPagination({...pagination, page: ((page - maxButtons) > 0) ? (page - maxButtons) : 1})}
                disabled={true}
                className="btn btn-sm btn-outline-primary"
                style={{
                  marginLeft: '5px',
                }}
              >
                {btn}
              </Button>
            )}
        }) || null}
      </div>
    )
  }

  return (
    <div>
      <span>{paginationArray()}</span>
    </div>
  );
});
