import { memo } from "react";
import { sLoadingText } from "../../../common/config";
import NoDataFound from "../../../common/noDataFound";
import MovieCard from "../movieCard";

const MovieContainer = ({ isLoading, arrAllMergedData, lastEleRef, sQuery }) => {
    let nodeListing = null;
    if (!isLoading) {
        nodeListing = <div className={'grid gap-x-[30px] gap-y-[90px] max-sm:gap-x-[15px] max-sm:gap-y-[45px] grid-cols-3 mt-[36px] max-sm:mt-[18px] '}>
            {
                arrAllMergedData && arrAllMergedData.length && arrAllMergedData.map((objEle, jIndex) => {
                    const isLastEle = arrAllMergedData.length - 1 === jIndex;
                    const propsMovieCard = {
                        key: jIndex,
                        ...objEle,
                        ref: lastEleRef,
                        isLastEle
                    };
                    return <MovieCard {...propsMovieCard} />;
                })
            }
        </div>;
        if (sQuery && !(arrAllMergedData && arrAllMergedData.length)) {
            nodeListing = <NoDataFound title={'No Movies Found.'} />
        }
    }
    else {
        nodeListing = <NoDataFound title={sLoadingText} />
    }
    return nodeListing;
};
export default memo(MovieContainer);