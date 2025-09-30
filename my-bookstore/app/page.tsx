import Selection from "@/components/Ui/selection/Selection";
import styles from './page.module.css'
import SelectionWrapper from "@/components/server/SelectionWrapper";

export default function Home() {
  return (
    <>
    
    <div className={styles.home}>
       <div className={styles.home__container}>
        <SelectionWrapper title='BestSellers' type='bestsellers'></SelectionWrapper>
        <SelectionWrapper title='Popular' type='popular'></SelectionWrapper>
       
       </div>
    </div>
    
   
       </>
   
  )
}
