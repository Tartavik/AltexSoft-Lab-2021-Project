import { UseApi } from '../../../Components/Hooks/UseApi';
import { useDataFetch } from '../../../Components/Hooks/UseDataFetch';
import { useEffect } from 'react';

export const useTag = () => {
    const { getTag } = UseApi();
    
    const [dataTegs, fetchTags] = useDataFetch({
        fetchHandler: async () => {
          const res = await getTag();
    
          return res;
        },
        isLazy: true,
        initialData: [],
      });

      useEffect(()=>{
        fetchTags()
      },[])
    
      return {
        dataTegs,
        fetchTags,
      };
}