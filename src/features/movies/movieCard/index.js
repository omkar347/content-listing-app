import { memo } from "react";
import { enumApiKeys, sImagePath, sPlaceHolderImagePath } from "../../../common/config";
import LazyImage from "../../../common/lazyImage"; 

const MovieCard = ({ [enumApiKeys.posterImage]: posterImage, [enumApiKeys.name]: name }) => {
    const propsLazyImage = {
        className: "h-full w-full object-cover",
        src: `${sImagePath}/${posterImage}`,
        alt: `${name}`,
        placeHoderSrc: `${sPlaceHolderImagePath}`,
        loading: "lazy"
    }; 
    return <div className={'basis-1/3 flex-1'}>
        <div className="flex flex-col">
            <div className="h-full w-full shrink-0 bg-[url('./../public/resources/Slices/placeholder_for_missing_posters.png')]">
                <LazyImage {...propsLazyImage} />
            </div>
            <div className="pt-[24px] max-sm:pt-[12px] text-left">
                <div className="uppercase text-[36pt] max-sm:text-[12pt] max-md:text-[18pt] max-lg:text-[24pt] text-white font-light whitespace-nowrap text-ellipsis overflow-hidden" title={name}>{name}</div>
            </div>
        </div>
    </div>
};

export default memo(MovieCard);