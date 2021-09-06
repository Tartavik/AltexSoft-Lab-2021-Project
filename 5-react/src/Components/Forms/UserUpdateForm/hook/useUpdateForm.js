import { UseApi } from '../../../../Components/Hooks/UseApi';
import { useDataFetch } from '../../../../Components/Hooks/UseDataFetch';

export const useUpdateForm = () => {
    const { updateUserProfile  } = UseApi();   
    
    const [showDataUpdateUser, updateUser] = useDataFetch({
        fetchHandler: async (body) => {
            try{
                const res = await updateUserProfile(body);
                return res;   
            }catch(e) {
                return e;
            }

        },
        isLazy: true,
        initialData: [],
    });

    return {
        updateUser,
        showDataUpdateUser,
    }

}