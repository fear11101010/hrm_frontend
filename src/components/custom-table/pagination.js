import React, {useEffect, useState} from "react";

function Pagination({data, rowPerPage, onPageChange}) {
    const totalNumberOfPage = Math.ceil(data?.length / rowPerPage);
    const [currentPage, setCurrentPage] = useState(1);
    const pages = [...Array.from({length: totalNumberOfPage}, (_, i) => i + 1)];
    const onPageSelect = (e, page) => {
        e.preventDefault();
        setCurrentPage(page);
        if (onPageChange) {
            onPageChange(page);
        }
    }
    useEffect(() => {
        setCurrentPage(1);
    }, [data])
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
                {/*<li>
                    <a href="#" className="page">2</a>
                </li>
                <li>
                    <a href="#" className="page">3</a>
                </li>*/}
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