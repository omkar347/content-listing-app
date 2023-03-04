export const sBasePath = `${process.env.PUBLIC_URL}/`;
export const sApiPath = `${sBasePath}resources/API`;
export const sImagePath = `${sBasePath}resources/Slices`;
export const sPlaceHolderImagePath = `${sImagePath}/placeholder_for_missing_posters.png`;
export const sSearchImagePath = `${sImagePath}/search.png`;
export const sBackImagePath = `${sImagePath}/Back.png`;
export const sLoadingText = `Loading...`;
export const enumApiKeys = {
    contentItems: 'content-items',
    pageNumRequested: 'page-num-requested',
    pageSizeRequested: 'page-size-requested',
    pageSizeReturned: 'page-size-returned',
    title: 'title',
    totalContentItems: 'total-content-items',
    content: 'content',
    name: 'name',
    posterImage: 'poster-image',
    allPagesData: 'allPagesData',
    isDone: 'isDone',
    searchedData: 'searchedData',
};

export const fnCacheImages = (arrImgs) => {
    const promises = arrImgs.map((src) => {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.src = src;
            img.onload = resolve;
            img.onerror = reject;
        });
    });
    return promises;
}
export const fnIsScrollTouchedToBottom = () => {
    const $html = document.documentElement
    const jTotalHeight = $html.scrollHeight;
    const jViewportHeight = window.innerHeight;
    const jSrollTop = $html.scrollTop;
    if ((jViewportHeight + jSrollTop) >= (jTotalHeight - 50)) {
        return true;
    }
    return false;
}
export const getDummyData = (jLen) => {
    const arrDummyData = [];
    for (let jN = 0; jN < jLen; jN++) {
        arrDummyData.push({
            "name": sLoadingText,
            "poster-image": "placeholder_for_missing_posters.png",
        },);
    }
    return arrDummyData;
}

export const filterDataByQuery = (arrAllMergedData, sQuery) => {
    let arrSearchedData = arrAllMergedData;
    if (arrAllMergedData && arrAllMergedData.length && sQuery) {
        arrSearchedData = arrAllMergedData.filter((ele) => {
            const sName = ele[enumApiKeys.name].toLocaleLowerCase();
            return sName && sName.includes(sQuery.toLocaleLowerCase());
        });
    }
    return arrSearchedData;
}

export const throttled = (fn, delay) => {
    let last = 0;
    return (...arg) => {
        let now = new Date().getTime();
        if (now - last > delay) {
            last = now;
            fn.apply(null, arg);
        }

    }
}