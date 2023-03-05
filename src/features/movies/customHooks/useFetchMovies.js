import { useEffect, useMemo, useState } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { enumApiKeys, getDummyData, } from '../../../common/config';
import { actionCreatorCallMovies, selectMovies, selectPending, selectQuery } from './../moviesSlice';

function useFetchMovies() {
    const [jPageNo, setPageNo] = useState(0);
    const dispatch = useDispatch();
    const data = useSelector(selectMovies, shallowEqual);
    const isDataLoading = useSelector(selectPending);
    const sQuery = useSelector(selectQuery);

    const { [enumApiKeys.searchedData]: searchedData = [], [enumApiKeys.isDone]: isDone, [enumApiKeys.title]: title } = data || {};

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

    // Show some buffer data untill next records comes;
    let arrAllMergedData = useMemo(() => {
        if (isDataLoading) {
            return [...searchedData, ...getDummyData(20)];
        }
        return searchedData;
    }, [isDataLoading, searchedData]);

    return { arrAllMergedData, isDone, isDataLoading, title, sQuery, setPageNo };
};
export default useFetchMovies;