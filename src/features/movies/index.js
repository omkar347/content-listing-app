import React, { useRef } from 'react';
import { useCaching, useFetchMovies, useObserver } from './customHooks';
import SearchBar from './searchBar';
import Header from './header.js';
import MovieContainer from './movieContainer';

export function Movies() {
    const observer = useRef();
    const { isLoading } = useCaching();
    const { arrAllMergedData, title, sQuery, setPageNo, isDataLoading, isDone } = useFetchMovies();
    const { lastEleRef } = useObserver(observer, setPageNo, isDataLoading, isDone);

    const propsSearchBar = { title };
    const propsMovieContainer = { isLoading, arrAllMergedData, lastEleRef, sQuery };

    return (<div className='bg-black px-[30px] max-sm:px-[15px] min-w-xs min-h-screen'>
        <Header>
            <SearchBar {...propsSearchBar} />
        </Header>
        <MovieContainer {...propsMovieContainer} />
    </div>
    );
}