import { UseApi } from "../../Hooks/UseApi";
import { useDataFetch } from "../../Hooks/UseDataFetch";

export const usePost = () => {
    const { addFavoriteArticle } = UseApi();
    
    const [dataPostFavorite, fetchPostFavorite] = useDataFetch({
        fetchHandler: async (slug) => {
          const res = await addFavoriteArticle(slug);  
          return res;
        },
        isLazy: true,
        initialData: [],
      });
    
    
      return {
        dataPostFavorite,
        fetchPostFavorite,
      };
}