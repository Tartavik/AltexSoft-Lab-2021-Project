import { UseApi } from '../../../Components/Hooks/UseApi';
import { useDataFetch } from '../../../Components/Hooks/UseDataFetch';


export const useUserArticle = () => {
    const { getArticleApi } = UseApi();
    
    const [showData, fetchArticles] = useDataFetch({
        fetchHandler: async (slug) => {
          const res = await getArticleApi(slug);
    
          return res;
        },
        isLazy: true,
        initialData: [],
      });
    
      return {
        fetchArticles,
        showData,
      };
}