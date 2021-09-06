import { UseApi } from '../../../Components/Hooks/UseApi';
import { useDataFetch } from '../../../Components/Hooks/UseDataFetch';


export const useDeleteArticleComment = () => {
    const { deleteArticleComment } = UseApi();
    
    const [showDataDeleteComment, fetchDeleteComment] = useDataFetch({
        fetchHandler: async (arg) => {
          const res = await deleteArticleComment(arg);
    
          return res;
        },
        isLazy: true,
        initialData: [],
      });
    
      return {
        fetchDeleteComment,
        showDataDeleteComment,
      };
}