import { useCallback, useEffect, useState } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { enumApiKeys, getDummyData, fnIsScrollTouchedToBottom, throttled } from '../../../common/config';
import { actionCreatorCallMovies, selectMovies, selectPending, selectQuery } from './../moviesSlice';

export function useFetchMovies(observer) {
    const [jPageNo, setPageNo] = useState(0);
    const dispatch = useDispatch();
    const data = useSelector(selectMovies, shallowEqual);
    const isDataLoading = useSelector(selectPending);
    const sQuery = useSelector(selectQuery);

    const { [enumApiKeys.searchedData]: searchedData = [], [enumApiKeys.isDone]: isDone, [enumApiKeys.title]: title } = data || {};

    const lastEleRef = useCallback((node) => {
        if (isDataLoading) {
            return
        }
        if (observer && observer.current) {
            observer.current.disconnect();
        }
        observer.current = new IntersectionObserver((entrys) => {
            if (entrys[0].isIntersecting && !isDone && !isDataLoading) {
                setPageNo(prevState => (prevState + 1));
            }
        });
        if (node) {
            observer.current.observe(node);
        }
    }, [isDataLoading, isDone]);

    // Call on initial render only
    useEffect(() => {
        setPageNo(prevState => (prevState + 1));
    }, []);
    // Call when page no is changed
    useEffect(() => {
        if (jPageNo) {
            dispatch(actionCreatorCallMovies(jPageNo));
        }
    }, [jPageNo, dispatch]);
    let arrAllMergedData = [...searchedData];
    // Show some buffer data untill next records comes;
    if (isDataLoading) {
        arrAllMergedData = [...arrAllMergedData, ...getDummyData(20)];
    }
    return { arrAllMergedData, isDone, isDataLoading, title, sQuery, lastEleRef };
}