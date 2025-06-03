import ProductGridWithTittle from '@/components/shared/productGridWithTittle';
import { DemoData } from '@/constants/demoData';


const FavoriteProducts = () => {
    return (
        <div>
            <ProductGridWithTittle products={DemoData} title='আমার ফেভারিট প্রোডাক্ট' />
        </div>
    )
}

export default FavoriteProducts