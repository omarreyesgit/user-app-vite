import { useContext } from 'react';
import { UserContext } from '../lib/context/UsersContext';
import UserRole from './UserRole';
import style from './UserRow.module.css';
import UserStatus from './UserStatus';
const UserRow = ({ name, active, role, id }) => {
	const { toggleUserActive } = useContext(UserContext);
	return (
		<div className={style.wrapper}>
			<div className={style.name}>
				<span>{name}</span>
			</div>
			<div className={style.status}>
				<UserStatus active={active} />
			</div>
			<div className={style.role}>
				<UserRole role={role} />
			</div>
			<div className={style.action}>
				<button
					onClick={() => {
						toggleUserActive(id);
					}}
				>
					{active ? 'Desactivar' : 'Activar'}
				</button>
			</div>
		</div>
	);
};
export default UserRow;
