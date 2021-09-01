import { UseApi } from '../../../Components/Hooks/UseApi';
import { useDataFetch } from '../../../Components/Hooks/UseDataFetch';
import { useEffect, useState } from "react";

export const UseHome = () => {
    const { getArticlesApi } = UseApi();
    const [articles, setArticles] = useState([]);
    
    const [showSpiner, fetchArticles] = useDataFetch({
        fetchHandler: async () => {
          const res = await getArticlesApi();
    
          setArticles(res.data.articles);
    
          return res;
        },
        isLazy: true,
        initialData: [],
      });
    
      useEffect(() => {
        fetchArticles();
      }, []);
    
      return {
        articles,
        showSpiner,
      };
}