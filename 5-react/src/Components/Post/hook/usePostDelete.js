import { UseApi } from "../../Hooks/UseApi";
import { useDataFetch } from "../../Hooks/UseDataFetch";

export const usePostDelete = () => {
    const { deleteFavoriteArticle } = UseApi();
    
    const [dataPostDeleteFavorite, fetchPostDeleteFavorite] = useDataFetch({
        fetchHandler: async (slug) => {
          const res = await deleteFavoriteArticle(slug);  
          return res;
        },
        isLazy: true,
        initialData: [],
      });
    
    
      return {
        dataPostDeleteFavorite,
        fetchPostDeleteFavorite,
      };
}