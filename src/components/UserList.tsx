import React, { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import { IUser } from '../types/User';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import cn from 'classnames';
import { ButtonEye } from './ButtonEye';

interface UserListProps {
  users: IUser[];
  skip: number
}

const UserList: React.FC<UserListProps> = React.memo(({users, skip}) => {   
  const {darkMode} = useContext(ThemeContext);

  if (!users.length) {
    return null;
  }

  return (
    <div className="container" style={{marginTop: "20px"}}>
        <table className={cn("table", "table-sm", "table-hover", "table-bordered", 
            {
                'table-dark': darkMode,
            }
        )}>
          <thead>
              <tr>
                  <th scope="col">#</th>
                  <th scope="col">Email</th>
                  <th scope="col">Роли</th>
                  <th scope="col">Действия</th>
              </tr>
          </thead>
          <tbody>
            {users.map((user, i: number) => (
              <tr key={user.email}>
                <td> {/* array start from 0 need + 1 */}
                  {
                    (skip && skip > 0) 
                    ? (skip + i + 1) 
                    : (i + 1) 
                  }
                </td> 
                <td>
                  {(user.email.length > 40)
                    ? (<OverlayTrigger overlay={<Tooltip id="tooltip-disabled">{user.email}</Tooltip>}>
                        <span>{user.email.slice(0, 37) + "..."}</span>
                      </OverlayTrigger>)
                    : user.email
                  }
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
                  <ButtonEye darkMode={darkMode} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>)
})

export default UserList;
