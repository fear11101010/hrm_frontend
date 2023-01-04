import React, {useEffect, useState} from "react";

function Pagination({data, rowPerPage, onPageChange, total}) {
    // debugger
    const totalNumberOfPage = Math.ceil(total / rowPerPage);
    const [currentPage, setCurrentPage] = useState(1);
    const pages = [...Array.from({length: totalNumberOfPage||1}, (_, i) => i + 1)];
    const onPageSelect = (e, page) => {
        e.preventDefault();
        setCurrentPage(page);
        if (onPageChange) {
            onPageChange(page,total && onPageChange(page,data?.slice((page - 1) * rowPerPage,page * rowPerPage)));
        }
    }
    useEffect(() => {
        setCurrentPage(1);
        if (onPageChange) {
            onPageChange(1);
        }
    }, [rowPerPage])
    return (
        <>
            <ul className="list-pagination-prev pagination pagination-tabs card-pagination">
                <li className="page-item">
                    <a href="#" className="page-link ps-0 pe-4 border-end"
                       onClick={e => currentPage - 1 > 0 ? onPageSelect(e, currentPage - 1) : e.preventDefault()}>
                        <i className="fe fe-arrow-left me-1"></i> Prev
                    </a>
                </li>
            </ul>
            <ul className="list-pagination pagination pagination-tabs card-pagination">
                {
                    pages.map(page => (
                        <li key={`page_${page}`} className={currentPage === page ? "active" : ""}>
                            <a href="#" className="page" onClick={e => onPageSelect(e, page)}>{page}</a>
                        </li>
                    ))
                }
            </ul>
            <ul className="list-pagination-next pagination pagination-tabs card-pagination">
                <li className="page-item">
                    <a href="#" className="page-link ps-4 pe-0 border-start"
                       onClick={e => currentPage + 1 <= totalNumberOfPage ? onPageSelect(e, currentPage + 1) : e.preventDefault()}>
                        <i className="fe fe-arrow-right ms-1"></i> Next
                    </a>
                </li>
            </ul>
        </>
    );
}

export default Pagination