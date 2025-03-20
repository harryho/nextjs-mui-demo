import EnhancedTable from "../../components/table/EnhancedTable";
import * as OrderService from "../../services/orderService";


export default function OrdersPage() {

    const headCells:  Record<string, any>[] = [
        { id: 'orderId', label: 'Order Number' },
        { id: 'itemsummary', label: 'Item' },
        { id: 'amount', label: 'Total Amount', align: 'left' },
        // { id: 'discount', label: 'Discount', align: 'right' },
        { id: 'promoCode', label: 'Promote Code', align: 'center' },
        { id: 'customer', label: 'Customer', align: 'left' },
        { id: 'isDelayed', label: 'Is Delayed', align: 'center' },
    
        { id: 'status', label: 'Status' },
        { id: '' },
    ]
    return(
        <EnhancedTable redirectRoute={"/orders"}
        headCells={headCells} />
    )
}


