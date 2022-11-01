import PageSelector from './forms/PageSelector';
import Select from './forms/Select';
import style from './UserListPagination.module.css';
const UserListPagination = ({
	page,
	setPage,
	itemsPerPage,
	setItemsPerPage,
	totalPages
}) => {
	return (
		<div className={style.wrapper}>
			<div className={style.itemsPerPage}>
				<Select
					value={itemsPerPage}
					onChange={e => setItemsPerPage(Number(e.target.value))}
				>
					<option value={1}>1</option>
					<option value={2}>2</option>
					<option value={3}>3</option>
				</Select>
				<p>Elementos por página</p>
			</div>
			<PageSelector page={page} totalPages={totalPages} setPage={setPage} />
		</div>
	);
};

export default UserListPagination;
