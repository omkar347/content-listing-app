import { useCallback, useEffect, useState } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { enumApiKeys, getDummyData, fnIsScrollTouchedToBottom, throttled } from '../../../common/config';
import { actionCreatorCallMovies, selectMovies, selectPending, selectQuery } from './../moviesSlice';

export function useFetchMovies(isLoading) {
    const [jPageNo, setPageNo] = useState(0);
    const dispatch = useDispatch();
    const data = useSelector(selectMovies, shallowEqual);
    const isDataLoading = useSelector(selectPending);
    const sQuery = useSelector(selectQuery);

    const { [enumApiKeys.searchedData]: searchedData = [], [enumApiKeys.isDone]: isDone, [enumApiKeys.title]: title } = data || {};

    const handleScroll = useCallback(() => {
        const isNextCall = fnIsScrollTouchedToBottom();
        if (isNextCall && !isDone && !isDataLoading && !sQuery) {
            throttled(() => setPageNo((prevState => (prevState + 1))), 500)();
            console.log(isDataLoading);
        }
        else {
            console.log(isDataLoading);
        }
    }, [isDone, isDataLoading, sQuery]);

    // Call on initial render only
    useEffect(() => {
        if (!isLoading) {
            window.addEventListener('scroll', handleScroll);
            handleScroll();
            return () => {
                window.removeEventListener('scroll', handleScroll);
            };
        }
    }, [isLoading, handleScroll]);
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
    return { arrAllMergedData, isDone, isDataLoading, title, sQuery };
}