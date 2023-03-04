import { memo, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sBackImagePath, sSearchImagePath } from "../../../common/config";
import { searchForData, selectQuery } from "../moviesSlice";
import Input from "./Input";

const SearchBar = ({ title }) => {
    const sQuery = useSelector(selectQuery);
    const dispatch = useDispatch();
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const handleChangeSearch = useCallback((event) => {
        let value = event.target.value.trim();
        dispatch(searchForData(value));
    }, [dispatch]);
    const propsInput = { 
        type: "text",
        className: "font-bold uppercase w-full py-[12px] pl-4 text-gray-700 bg-gray-100 leading-tight focus:outline-none focus:shadow-outline transition-transform transition-opacity text-[14pt]",
        placeholder: "Type to search...",
        onChange: handleChangeSearch,
        value: sQuery,
    };
    let nodeTitle = <Input {...propsInput} />;
    let nodeSvgSearch = <svg className="w-12 h-12 text-white dark:text-gray-400" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path>
    </svg>;
    if (!isSearchOpen) {
        const propsDiv = {
            className: "font-bold uppercase w-full py-4 pl-4 text-[40pt] max-sm:text-[20pt] max-md:text-[30pt] max-lg:text-[35pt] text-white whitespace-nowrap text-ellipsis overflow-hidden",
        };
        nodeTitle = <div {...propsDiv}>{title}</div>;
        nodeSvgSearch = <img src={sSearchImagePath} alt='Search' />;
    }
    const onSearchClick = useCallback(() => {
        setIsSearchOpen(prevState => {
            if (prevState) {
                dispatch(searchForData(''));
            }
            return !prevState;
        });
    }, [dispatch]);
    return <>
        <div className="w-max flex flex-row mr-1 hover:bg-white/30 cursor-pointer">
            <img src={sBackImagePath} alt='Back' />;
        </div>
        {
            nodeTitle
        }
        <div className="pl-1 bg-transparent hover:bg-white/30 cursor-pointer z-10" onClick={onSearchClick}>
            {
                nodeSvgSearch
            }
        </div>

    </>
};

export default memo(SearchBar);