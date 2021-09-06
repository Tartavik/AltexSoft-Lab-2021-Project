import { UseApi } from '../../Components/Hooks/UseApi';
import { useDataFetch } from '../../Components/Hooks/UseDataFetch';

export const useCreateArticle = () => {
    const { createArticle } = UseApi();
    
    const [showDataArticle, fetchArticle] = useDataFetch({
        fetchHandler: async (body) => {
            console.log(body);
          const res = await createArticle(body);
    
          return res;
        },
        isLazy: true,
        initialData: [],
      });

      return {
        fetchArticle,
        showDataArticle,
      };
}