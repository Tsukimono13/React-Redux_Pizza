import React from 'react';
import ReactPaginate from "react-paginate";
import styles from './Pagination.module.scss'

type PropsType = {
    currentPage: number
    onChangePage: (page: number) => void
}
const Pagination: React.FC<PropsType> = ({currentPage, onChangePage}) => {
    return (
        <ReactPaginate
            className={styles.root}
            breakLabel="..."
            nextLabel=">"
            previousLabel="<"
            onPageChange={(event) => onChangePage(event.selected + 1)}
            pageRangeDisplayed={4}
            pageCount={3}
            forcePage={currentPage - 1}
        />
    );
};

export default Pagination;