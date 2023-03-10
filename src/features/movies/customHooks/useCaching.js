import { useEffect, useState } from 'react';
import { fnCacheImages, sImagePath, sPlaceHolderImagePath } from '../../../common/config';

 function useCaching() {
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        async function loadAllImages() {
            const imgs = [sPlaceHolderImagePath,
            `${sImagePath}/poster1.jpg`,
            `${sImagePath}/poster2.jpg`,
            `${sImagePath}/poster3.jpg`,
            `${sImagePath}/poster4.jpg`,
            `${sImagePath}/poster5.jpg`,
            `${sImagePath}/poster6.jpg`,
            `${sImagePath}/poster7.jpg`,
            `${sImagePath}/poster8.jpg`,
            `${sImagePath}/poster9.jpg`,
            `${sImagePath}/search.png`,
            `${sImagePath}/Back.png`,
            `${sImagePath}/nav_bar.png`,
        ];
            const promises = fnCacheImages(imgs);
            await Promise.all(promises);
            setLoading(false);
        }
        loadAllImages();
    }, []);

    return { isLoading };
};
export default useCaching;