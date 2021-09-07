import { UseApi } from '../../../Components/Hooks/UseApi';
import { useDataFetch } from '../../../Components/Hooks/UseDataFetch';


export const useArticleComment = () => {
    const { getArticleComments } = UseApi();
    
    const [showDataComment, fetchComment] = useDataFetch({
        fetchHandler: async (slug, comm) => {
          const res = await getArticleComments(slug);
    
          return res;
        },
        isLazy: true,
        initialData: [],
      });
    
      return {
        fetchComment,
        showDataComment,
      };
}