import React from 'react';
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
  darkMode?: boolean;
  contentLoading?: boolean;
  total?: boolean;
  limit?: boolean;
}

/* TODO Pagination:
round buttons available
limit per page make dynamic
*/

export const Pagination: React.FC<PaginationProps>  = React.memo(({
  pagination ,
  setPagination, 
  maxButtons = 5,
  darkMode = false,
  contentLoading = true,
  total = false,
  limit = false,
}) => {

  const { page, pages} = pagination;
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
      <div className="d-flex justify-content-center">
        <nav aria-label="Page navigation">
          <ul className={cn("pagination", "pagination-sm", {
              "color-white": darkMode,
            })}
          >
            {finalArray.map(btn => {
              if (typeof btn === 'number') {
                if (btn !== page) {
                  return (
                    <li className="page-item" key={btn}>
                      <span
                        key={btn}
                        onClick={() => setPagination({...pagination, page: (btn) })}
                        className={cn("page-link", "text-reset", {
                          "bg-dark": darkMode,
                        })} 
                        role="button"
                        aria-disabled={contentLoading && "true"}

                      >
                        {btn}
                      </span>
                    </li>
                  )     
                }
                return (
                  <li className="page-item active" aria-current="page" key={btn}>
                    <span
                      key={btn}
                      onClick={() => setPagination({...pagination, page: (btn) })}
                      className="page-link"
                    >
                      {btn}
                    </span>
                    </li>
                )
              }

              if (btn === '<') {
                return (
                  <li className="page-item" key={btn}>
                    <a
                      key={btn}
                      onClick={() => setPagination({...pagination, page: page - 1})}
                      className={cn("page-link", "text-reset", {
                        "bg-dark": darkMode,
                      })} 
                      role="button"
                    >
                      {btn}
                    </a>
                  </li>
                )}

              if (btn === '>') {
                return (
                  <li className="page-item" key={btn}>
                    <a
                      key={btn}
                      onClick={() => setPagination({...pagination, page: page + 1})}
                      className={cn("page-link", "text-reset", {
                        "bg-dark": darkMode,
                      })}
                      role="button"
                      aria-disabled={contentLoading && true}
                    >
                      {btn}
                    </a>
                  </li>
                )}

              if (btn === '...' && finalArray.indexOf(btn) > finalArray.length - maxButtons) {
                return (
                  <li className="page-item" key={btn}>
                    <span 
                      key={btn} 
                      className={cn("page-link", "text-reset", {
                        "bg-dark": darkMode,
                      })}
                    > 
                      {btn} 
                    </span>
                  </li>)
              }

              if (btn === '..') {
                return (
                  <li className="page-item" key={btn}>
                    <span 
                      key={btn} 
                      className={cn("page-link", "text-reset", {
                        "bg-dark": darkMode,
                      })}
                    > 
                      {btn} 
                    </span>
                  </li>)
              }
            }) || null}
          </ul>
        </nav>
      </div>
    )
  }

  return (
    <div className="d-flex justify-content-between align-items-center m-1">
      {total 
        ? <span>Итого: <span>{pagination.total}</span></span> 
        : <span></span>
      }
      <span>{paginationArray()}</span>
      {limit 
        ? <span>
            <select
              name="limit"
              className={cn({
                "bg-dark text-white": darkMode,
              })}
              value={pagination.limit}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setPagination({...pagination, limit: parseInt(e.target.value) })}
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </select>
          </span>
        : <span></span>
      }
    </div>
  );
});
