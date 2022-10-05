import style from './UserRole.module.css';
const ROLE_STYLE = {
	teacher: ['Profesor', style.teacher],
	student: ['Alumno', style.student],
	other: ['Otro', style.other]
};
const UserRole = ({ role }) => {
	const [roleName, roleClassName] = ROLE_STYLE[role] || ROLE_STYLE.other;
	return <span className={`${style.role} ${roleClassName}`}>{roleName}</span>;
};

export default UserRole;
