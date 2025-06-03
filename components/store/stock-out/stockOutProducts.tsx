import ProductGridWithTittle from '@/components/shared/productGridWithTittle'
import { DemoData } from '@/constants/demoData'
import React from 'react'

const StockOutProducts = () => {
    return (
        <div>
            <ProductGridWithTittle products={DemoData} title='স্টক আউট প্রোডাক্ট' />
        </div>
    )
}

export default StockOutProducts