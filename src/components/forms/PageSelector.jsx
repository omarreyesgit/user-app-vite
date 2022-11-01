import IconButton from '../buttons/IconButton';
import ArrowLeftIcon from '../icons/ArrowLeftIcon';
import ArrowRightIcon from '../icons/ArrowRightIcon';
import style from './PageSelector.module.css';
const PageSelector = ({ page, setPage, totalPages }) => {
	const isFirstPage = page === 1;
	const isLastPage = page === totalPages || totalPages === 0;
	return (
		<div className={style.warapper}>
			<IconButton
				disabled={isFirstPage}
				filled
				icon={ArrowLeftIcon}
				onClick={() => setPage(page - 1)}
			/>
			<span>
				Página {page} de {totalPages || 1}
			</span>
			<IconButton
				disabled={isLastPage}
				filled
				icon={ArrowRightIcon}
				onClick={() => setPage(page + 1)}
			/>
		</div>
	);
};

export default PageSelector;
