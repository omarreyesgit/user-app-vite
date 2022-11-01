import { useEffect, useState } from 'react';
import {
	filterActiveUsers,
	filterUsersByName,
	sortUsers
} from '../users/filterUsers';
import { paginateUsers } from './useFilters';

const fetchUsers = async (setData, setError, signal) => {
	try {
		const res = await fetch('http://localhost:4000/users', { signal });
		if (res.ok) {
			const data = await res.json();
			setData(data);
		} else {
			setError();
		}
		//todo error
	} catch (error) {
		//todo error
		setError();
	}
};
const getUsersToDisplay = (
	users,
	{ search, onlyActive, sortBy, page, itemsPerPage }
) => {
	let usersFiltered = filterActiveUsers(users, onlyActive);
	usersFiltered = filterUsersByName(usersFiltered, search);
	usersFiltered = sortUsers(usersFiltered, sortBy);
	const { paginatedUsers, totalPages } = paginateUsers(
		usersFiltered,
		page,
		itemsPerPage
	);
	return { paginatedUsers, totalPages };
};
export const useUsers = filters => {
	const [users, setUsers] = useState({
		data: [],
		loading: true,
		error: false
	});
	const setData = newData =>
		setUsers({
			data: newData,
			loading: false,
			error: false
		});
	const setError = () =>
		setUsers({
			data: [],
			loading: false,
			error: true
		});

	useEffect(() => {
		const controler = new AbortController();

		fetchUsers(setData, setError, controler.signal);
		return () => controler.abort();
	}, []);

	const { paginatedUsers, totalPages } = getUsersToDisplay(users.data, filters);

	return {
		users: paginatedUsers,
		totalPages,
		error: users.error,
		loading: users.loading
	};
};
