import { getSuppliersList } from "@/app/actions/suppliers"
import AddSupplierForm from "./AddSupplierForm"
import SuppliersTable from "./SuppliersTable"

const SuppliersPage = async () => {
  const suppliers = await getSuppliersList()

  return (
    <div>
      <h1>Управление поставщиками</h1>

      <SuppliersTable suppliers={suppliers} />
      <AddSupplierForm />

    </div>
  )
}

export default SuppliersPage