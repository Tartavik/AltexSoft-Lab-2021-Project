import { UseApi } from "../../Hooks/UseApi";
import { useDataFetch } from "../../Hooks/UseDataFetch";

export const useDeleteArticle = () => {
    const { deleteArticle } = UseApi();
    
    const [dataDeleteArticle, fetchDeleteArticle] = useDataFetch({
        fetchHandler: async (slug) => {
          const res = await deleteArticle(slug);  
          return res;
        },
        isLazy: true,
        initialData: [],
      });
    
    
      return {
        dataDeleteArticle,
        fetchDeleteArticle,
      };
}