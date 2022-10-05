import style from './UserListFilters.module.css';
const UserListFilters = ({
	search,
	setSearch,
	onlyActive,
	setOnlyActive,
	sortBy,
	setSortBy
}) => {
	return (
		<form className={style.form}>
			<input
				type='text'
				value={search}
				onChange={e => setSearch(e.target.value)}
			/>
			<div className={style.active}>
				<input
					type='checkbox'
					checked={onlyActive}
					onChange={e => setOnlyActive(e.target.checked)}
				/>
				<span>Solo Activos</span>
			</div>
			<select value={sortBy} onChange={e => setSortBy(Number(e.target.value))}>
				<option value={0}>Por Defecto</option>
				<option value={1}>Por Nombre</option>
			</select>
		</form>
	);
};

export default UserListFilters;
