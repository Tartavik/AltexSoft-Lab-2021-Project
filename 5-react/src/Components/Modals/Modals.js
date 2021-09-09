import { useModals } from "../../context/useAuth"

const Modals = () => {

    const { modals } =  useModals();
    return null;
    // return (
    //     <div>
    //         {
    //             modals.map((m) => {
    //                 /* m.content, m.name*/
    //                 return 
    //                 <div className={stateFormArticle ?`${newArticle.modal} ${newArticle.active}`:newArticle.modal} onClick={() => setStateArticleForm(false)}>
    //                 <div className={newArticle.modalContent} onClick={e => e.stopPropagation()}>
    //                     { m.content } 
    //                 </div>
    //             </div>
    //             })
    //         }
    //     </div>
    // )
}

export default Modals;