import React, { memo, useCallback, useEffect, useState } from 'react'; 

const LazyImage = (props) => {
    const { placeHoderSrc, alt, ...propsImg } = props;
    const [src, setSrc] = useState(propsImg.src);
    const handleOnError = useCallback(() => {
        setSrc(placeHoderSrc);
    }, [placeHoderSrc]);
    useEffect(() => {
        setSrc(propsImg.src);
    }, [propsImg.src]);
    return  <img {...propsImg} alt={alt} src={src} onError={handleOnError} />;
};
export default memo(LazyImage);

