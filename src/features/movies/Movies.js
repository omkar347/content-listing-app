import React from 'react';
import { useFetchMovies } from './customHooks/useFetchMovies';
import SearchBar from './searchBar';
import MovieCard from './movieCard';
import { useCachinmg } from './customHooks/useCaching';
import NoDataFound from '../../common/noDataFound';
import { sLoadingText } from '../../common/config';

export function Movies() {
    const { isLoading } = useCachinmg();
    const { arrAllMergedData, title, sQuery } = useFetchMovies(isLoading);
    const propsSearchBar = { title };
    let nodeListing = null;
    if (!isLoading) {
        nodeListing = <div className={'grid gap-x-[30px] gap-y-[90px] max-sm:gap-x-[15px] max-sm:gap-y-[45px] grid-cols-3 mt-[36px] max-sm:mt-[18px] '}>
            {
                arrAllMergedData && arrAllMergedData.length && arrAllMergedData.map((objEle, jIndex) => {
                    const propsMovieCard = {
                        key: jIndex,
                        ...objEle,
                    };
                    return <MovieCard {...propsMovieCard} />;
                })
            }
        </div>;
        if (sQuery && !(arrAllMergedData && arrAllMergedData.length)) {
            nodeListing = <NoDataFound title={'No Movies Found.'} />
        }
    }
    else{
        nodeListing = <NoDataFound title={sLoadingText} />
    } 
    return (<div className='bg-black px-[30px] max-sm:px-[15px] min-w-xs min-h-screen'>
        <header className="sticky top-0 z-30 flex items-center w-full h-[192px] max-sm:h-[132px] bg-[url('./../public/resources/Slices/nav_bar.png')] bg-no-repeat bg-cover">
            <div className="bg-transparent items-center justify-between w-full flex mb-5 overflow-hidden" >
                <SearchBar {...propsSearchBar} />
            </div>
        </header>
        {
            nodeListing
        }
    </div>
    );
}