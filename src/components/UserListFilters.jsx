import InputCheckBox from './forms/InputCheckBox';
import InputSearch from './forms/InputSearch';
import Select from './forms/Select';
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
		<div className={style.form}>
			<div className={style.row}>
				<InputSearch
					value={search}
					onChange={e => setSearch(e.target.value)}
					placeholder='Buscar...'
				/>
				<Select
					value={sortBy}
					onChange={e => setSortBy(Number(e.target.value))}
				>
					<option value={0}>Por Defecto</option>
					<option value={1}>Por Nombre</option>
					<option value={2}>Por Rol</option>
					{!onlyActive && <option value={3}>Por Activos</option>}
				</Select>
			</div>
			<div className={style.row}>
				<div className={style.active}>
					<InputCheckBox
						className={style.checkbox}
						checked={onlyActive}
						onChange={e => setOnlyActive(e.target.checked)}
					/>
					<p>Mostrar solo Activos</p>
				</div>
			</div>
		</div>
	);
};

export default UserListFilters;
