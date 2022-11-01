import UserRow from './UserRow';

const UsersListRows = ({ users, error, loading }) => {
	if (!users.length) return <p>No hay usuarios</p>;
	if (error) return <p>Error al cargar los usuarios</p>;
	if (loading) return <p>Cargando Usuarios</p>;

	return users.map(user => <UserRow key={user.id} {...user} />);
};

export default UsersListRows;
