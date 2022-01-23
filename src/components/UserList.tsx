import React, { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import { IUser } from '../types/User';
import cn from 'classnames';
import { ButtonEye } from './ButtonEye';
import { Link } from 'react-router-dom';
import AUTH_ROUTES from '../constants/index';
import { TooltipWrapper } from './comp-utils/TooltipWrapper';
import { LockFill } from 'react-bootstrap-icons';

interface UserListProps {
  users: IUser[];
  skip: number
}

const UserList: React.FC<UserListProps> = React.memo(({ users, skip }) => {   
  const { darkMode } = useContext(ThemeContext);

  if (!users.length) {
    return null;
  }

  return (
    <div className="container" style={{marginTop: "20px"}}>
        <table className={cn("table", "table-sm", "table-hover", "table-bordered", 
            {
              "table-dark": darkMode,
            }
        )}>
          <thead>
              <tr>
                  <th scope="col"><LockFill /></th>
                  <th scope="col">#</th>
                  <th scope="col">ФИО</th>
                  <th scope="col">Email</th>
                  <th scope="col">Роли</th>
                  <th scope="col">Действия</th>
              </tr>
          </thead>
          <tbody>
            {users.map((user, i: number) => (
              <tr key={user.email}>
                <td className="d-flex justify-content-center">
                  { user?.isBlocked ? <span className="btn btn-sm btn-danger"><LockFill /></span> : null }
                </td>
                <td> {/* array start from 0 need + 1 */}
                  {
                    (skip && skip > 0) 
                    ? (skip + i + 1) 
                    : (i + 1) 
                  }
                </td>
                <td>
                  {user.fullName || ""}
                </td>
                <td>
                  <TooltipWrapper data={user.email} length={10} />
                </td>
                <td>
                  {
                    (user.roles.length > 0)
                    ? user.roles.map((role: any) => ( //NEED TO REMAKE Interface
                      <span key={role}>{role}</span>
                    ))
                    : null
                  }
                </td> 
                <td className="d-flex justify-content-end">
                  <Link to={ `/${AUTH_ROUTES.USER}/${user._id}` } ><ButtonEye darkMode={darkMode} /></Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>)
})

export default UserList;
