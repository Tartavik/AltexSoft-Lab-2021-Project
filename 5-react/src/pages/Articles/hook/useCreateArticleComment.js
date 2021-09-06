import { UseApi } from '../../../Components/Hooks/UseApi';
import { useDataFetch } from '../../../Components/Hooks/UseDataFetch';


export const useCreateArticleComment = () => {
    const { createArticalComment } = UseApi();
    
    const [showDataNewComment, fetchNewComment] = useDataFetch({
        fetchHandler: async (arg) => {
          const res = await createArticalComment(arg);
    
          return res;
        },
        isLazy: true,
        initialData: [],
      });
    
      return {
        fetchNewComment,
        showDataNewComment,
      };
}