import { useEffect, useState } from 'react';
import { paginateUsers, useFilters } from '../lib/hooks/useFilters';
import { useUsers } from '../lib/hooks/useUser';
import {
	filterActiveUsers,
	filterUsersByName,
	sortUsers
} from '../lib/users/filterUsers';
import UserListPagination from './UserListPagination';
import style from './UsersList.module.css';
import UsersListFilters from './UsersListFilters';
import UsersListRows from './UsersListRows';

const UsersList = () => {
	const {
		filters,
		setSearch,
		setOnlyActive,
		setSortBy,
		setPage,
		setItemsPerPage
	} = useFilters();

	const { users, totalPages, error, loading } = useUsers(filters);

	return (
		<div className={style.wrapper}>
			<h1 className={style.title}>Listado de usuarios</h1>
			<UsersListFilters
				search={filters.search}
				onlyActive={filters.onlyActive}
				sortBy={filters.sortBy}
				setSearch={setSearch}
				setOnlyActive={setOnlyActive}
				setSortBy={setSortBy}
			/>
			<UsersListRows users={users} error={error} loading={loading} />
			<UserListPagination
				page={filters.page}
				setPage={setPage}
				itemsPerPage={filters.itemsPerPage}
				setItemsPerPage={setItemsPerPage}
				totalPages={totalPages}
			/>
		</div>
	);
};

export default UsersList;
