import { useCallback, } from 'react';

 function useObserver(observer, setPageNo, isDataLoading, isDone) {

    const lastEleRef = useCallback((node) => {
        if (isDataLoading) {
            return
        }
        if (observer && observer.current) {
            observer.current.disconnect();
        }
        observer.current = new IntersectionObserver((entrys) => {
            if (entrys[0].isIntersecting && !isDone && !isDataLoading) {
                setPageNo(prevState => (prevState + 1));
            }
        });
        if (node) {
            observer.current.observe(node);
        }
    }, [isDataLoading, isDone, setPageNo]);

    return { lastEleRef };
};
export default useObserver;