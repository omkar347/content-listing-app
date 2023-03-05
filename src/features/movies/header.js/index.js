import { memo } from "react";
import { sBackImagePath } from "../../../common/config";

const Header = memo(({ children }) => {
    return <header className="sticky top-0 z-30 flex items-center w-full max-sm:h-[96px] max-md:h-[144px] max-lg:h-[192px] bg-[url('./../public/resources/Slices/nav_bar.png')] bg-no-repeat bg-cover">
        <div className="bg-transparent items-center justify-between w-full flex mb-5 overflow-hidden" >
            <div className="w-max flex flex-row hover:bg-white/30 cursor-pointer">
                <img src={sBackImagePath} alt='Back' className="w-full py-4 pr-4"/>;
            </div>
            {
                children
            }
        </div>
    </header>
});
export default Header;