import style from './UserList.module.css';
import { useState } from 'react';
import UserListFilters from './UserListFilters';
import UsersListRows from './UsersListRows';

const UserList = ({ initialUsers }) => {
	const { search, onlyActive, sortBy, ...setFiltersFunctions } = getState();
	const { users } = useUsers(initialUsers);
	let usersFiltered = filterUsersByName(users, search);
	usersFiltered = filterActiveUser(usersFiltered, onlyActive);
	usersFiltered = sortUsers(usersFiltered, sortBy);

	return (
		<div className={style.wrapper}>
			<h1 className={style.title}>Listado de Usuarios</h1>
			<UserListFilters
				search={search}
				onlyActive={onlyActive}
				sortBy={sortBy}
				{...setFiltersFunctions}
			/>

			<UsersListRows users={usersFiltered} />
		</div>
	);
};

const getState = () => {
	const [filters, setFilters] = useState({
		search: '',
		onlyActive: false,
		sortBy: 0
	});
	const setSearch = search => setFilters({ ...filters, search });
	const setOnlyActive = onlyActive => {
		if (onlyActive && filters.sortBy === 3) {
			setFilters({ ...filters, sortBy: 0, onlyActive });
		} else {
			setFilters({ ...filters, onlyActive });
		}
	};
	const setSortBy = sortBy => setFilters({ ...filters, sortBy });
	return { ...filters, setSearch, setOnlyActive, setSortBy };
};
const useUsers = initialUsers => {
	const [users, setUsers] = useState(initialUsers);

	return { users };
};
const filterUsersByName = (users, search) => {
	if (!search) return [...users];
	const lowerCaseName = search?.toLowerCase();

	return users.filter(user => user.name.toLowerCase().includes(lowerCaseName));
};
const filterActiveUser = (users, active) => {
	if (!active) return users;

	return users.filter(user => user.active);
};

const sortUsers = (users, sortBy) => {
	const sortedUsers = [...users];
	switch (sortBy) {
		case 1:
			return sortedUsers.sort((a, b) => {
				if (a.name > b.name) return 1;
				if (a.name < b.name) return -1;
				return 0;
			});
		case 2:
			return sortedUsers.sort((a, b) => {
				if (a.role === b.role) return 0;
				if (a.role === 'teacher') return -1;
				if (a.role === 'student' && b.role === 'other') return -1;
				return 1;
			});
		case 3:
			return sortedUsers.sort((a, b) => {
				if (a.active === b.active) return 0;
				if (a.active && !b.active) return -1;
				return 1;
			});
		default:
			return sortedUsers;
	}
};

export default UserList;
