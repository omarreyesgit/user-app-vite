import style from './UserList.module.css';
import { useState } from 'react';
import UserListFilters from './UserListFilters';
import UsersListRows from './UsersListRows';
import { UserContext } from '../lib/context/UsersContext';

const UserList = ({ initialUsers }) => {
	const { search, onlyActive, sortBy, ...setFiltersFunctions } = getState();
	const { users, toggleUserActive } = useUsers(initialUsers);
	let usersFiltered = filterUsersByName(users, search);
	usersFiltered = filterActiveUser(usersFiltered, onlyActive);
	usersFiltered = sortUsers(usersFiltered, sortBy);

	return (
		<div className={style.wrapper}>
			<h1>Listado de Usuarios</h1>
			<UserListFilters
				search={search}
				onlyActive={onlyActive}
				sortBy={sortBy}
				{...setFiltersFunctions}
			/>
			<UserContext.Provider value={{ toggleUserActive }}>
				<UsersListRows users={usersFiltered} />
			</UserContext.Provider>
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
	const setOnlyActive = onlyActive => setFilters({ ...filters, onlyActive });
	const setSortBy = sortBy => setFilters({ ...filters, sortBy });
	return { ...filters, setSearch, setOnlyActive, setSortBy };
};
const useUsers = initialUsers => {
	const [users, setUsers] = useState(initialUsers);
	const toggleUserActive = userId => {
		const newUsers = [...users];
		const userIndex = newUsers.findIndex(user => user.id === userId);
		if (userIndex === -1) return;
		newUsers[userIndex].active = !newUsers[userIndex].active;
		setUsers(newUsers);
	};
	return { users, toggleUserActive };
};
const filterUsersByName = (users, search) => {
	if (!search) return [...users];
	const lowerCaseName = search?.toLowerCase();

	return users.filter(user =>
		user.name.toLowerCase().startsWith(lowerCaseName)
	);
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
		default:
			return sortedUsers;
	}
};

export default UserList;
