import { UseApi } from '../../../Hooks/UseApi';
import { useDataFetch } from '../../../Hooks/UseDataFetch';

export const useSingupForm = () => {
  
    const { registerUser } = UseApi();

    const [showDataReg, regUser] = useDataFetch({
      fetchHandler: async (obj) => {
        try{
          const res = await registerUser(obj);
          console.log(res);

          return res; 
        }catch(e){
          return e;
        }
  
        },
        isLazy: true,
        initialData: [],
      });

      return {
        showDataReg: showDataReg,
        regUser: regUser,

      };
}