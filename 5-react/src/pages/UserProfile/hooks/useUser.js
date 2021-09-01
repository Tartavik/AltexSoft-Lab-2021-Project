import { UseApi } from '../../../Components/Hooks/UseApi';
import { useDataFetch } from '../../../Components/Hooks/UseDataFetch';

export const useUser = () => {
    const { getUser } = UseApi();
    
    const [showDataUser, fetchUser] = useDataFetch({
        fetchHandler: async (slug) => {
          const res = await getUser(slug);
    
          return res;
        },
        isLazy: true,
        initialData: [],
      });

      return {
        fetchUser,
        showDataUser,
      };
}