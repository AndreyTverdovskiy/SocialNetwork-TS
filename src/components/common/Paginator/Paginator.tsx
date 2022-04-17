import React, {useState} from "react";
import styles from "./Paginator.module.css";

type PaginatorPropsType = {
    totalUsersCount: number,
    pageSize: number,
    currentPage: number,

    onPageChanged: (page: number) => void,
}


let Paginator = (props: PaginatorPropsType) => {
    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize)
    let pages = [];

    for (let i = 1; i < pagesCount; i++) {
        pages.push(i)
    }

    let portionSize = 10;
    let portionCount = Math.ceil(pagesCount / portionSize)
    let [portionNumber, setPortionNumber] = useState(1);
    let leftPortionNumberPage = (portionNumber - 1) * portionSize + 1;
    let rightPortionNumberPage = portionNumber * portionSize;

    const onLastPageClick = () => {
        props.onPageChanged(portionCount)
        setPortionNumber(portionCount)
    }

    return <div className={styles.paginator}>
        {portionNumber > 1 &&
            <button onClick={() => {
                setPortionNumber(portionNumber - 1)
            }}> Prev </button>}
        {pages
            .filter(p => p >= leftPortionNumberPage && p <= rightPortionNumberPage)
            .map((p) => {
                return <div
                    key={p}
                    className={props.currentPage === p ? styles.selectedPage : ''}
                    onClick={() => {
                        props.onPageChanged(p)
                    }}>
                        {p}
                    </div>
            })}

        {portionCount > portionNumber &&
            <button onClick={() => {
                setPortionNumber(portionNumber + 1)
            }}> Next </button>}

        {
            portionNumber !== portionCount &&
            <>
                <div> Total pages: </div>
                <div onClick={onLastPageClick}> {pagesCount} </div>
            </>
        }

    </div>
}
export default Paginator