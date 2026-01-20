
import { Modal, Button } from "antd";

const PrintInvoice = ({ isModalOpen, setIsModalOpen, customer }) => {

  return (
    <Modal
      title="Print Invoice"
      open={isModalOpen}
      footer={false}
      onCancel={() => setIsModalOpen(false)}
      width={800}

    >
      <section className="py-20 bg-black">
        <div className="max-w-5xl mx-auto bg-white px-6">
          <article className="overflow-hidden">
            <div className="logo my-6">
              <h2 className="text-4xl font-bold text-slate-700">POS APP</h2>
            </div>
            <div className="bill-details">
              <div className="grid sm:grid-cols-4 grid-cols-3 gap-12">
                <div className="text-md text-slate-500">
                  <p className="font-bold text-slate-700">Invoice Details:</p>
                  <p>Unwrapped</p>
                  <p>Bagdat Avenue 123</p>
                  <p>Caddebostan</p>
                  <p>Istanbul 1234</p>
                </div>
                <div className="text-md text-slate-500">
                  <p className="font-bold text-slate-700">Invoice</p>
                  <p>Unwrapped</p>
                  <p>Bagdat Avenue 123</p>
                  <p>Caddebostan</p>
                  <p>Istanbul 1234</p>
                </div>
                <div className="text-md text-slate-500">
                  <div>
                    <p className="font-bold text-slate-700">Invoice Number:</p>
                    <p>000{Math.floor(Math.random() * 100)}</p>
                  </div>
                  <div>
                    <p className="font-bold text-slate-700 mt-2">Date of Issue:</p>
                    <p>{customer?.createdAt.substring(0,10)}</p>
                  </div>
                </div>
                <div className="text-md text-slate-500 sm:block hidden">
                  <div>
                    <p className="font-bold text-slate-700">Terms:</p>
                    <p>20 Days</p>
                  </div>
                  <div>
                    <p className="font-bold text-slate-700 mt-2">Due:</p>
                    <p>2027-09-16</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bill-table-area mt-8">
              <table className="min-w-full divide-y divide-slate-500 overflow-hidden">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th scope="col" className="py-3.5 text-left text-sm font-normal text-slate-700 md:pl-0 sm:table-cell hidden">Image</th>
                    <th scope="col" className="py-3.5 text-left text-sm font-normal text-slate-700 sm:pl-6 md:pl-0 sm:table-cell hidden">Title</th>
                    <th colSpan={4} scope="col" className="w-full py-3.5 text-left text-sm font-normal text-slate-700 sm:pl-6 md:pl-0 sm:hidden">Title</th>
                    <th scope="col" className="py-3.5 text-center text-sm font-normal text-slate-700 sm:pl-6 md:pl-0 sm:table-cell hidden">Price</th>
                    <th scope="col" className="py-3.5 text-center text-sm font-normal text-slate-700 sm:pl-6 md:pl-0 sm:table-cell hidden">Count</th>
                    <th scope="col" className="py-3.5 text-end text-sm font-normal text-slate-700 sm:pl-6 md:pl-0 ">Total Price</th>
                  </tr>
                </thead>
                <tbody>
                  {customer?.cartItems.map((item) => (
                    <tr className="border-b border-t border-slate-200">
                      <td className="py-4 sm:table-cell hidden">
                        <img src={item.img} alt="" className="w-12 h-12 object-cover" />
                      </td>
                      <td className="py-4 sm:table-cell hidden">
                        <div className="flex flex-col">
                          <span className="font-medium">{item.title}</span>
                          <span className="sm:hidden inline-block text-xs">Unit Price {item.price}$</span>
                        </div>

                      </td>
                      <td className="py-4 sm:hidden" colSpan={4}>
                        <div className="flex flex-col">
                          <span className="font-medium">{item.title}</span>
                          <span className="sm:hidden inline-block text-xs">Unit Price {item.price}$</span>
                        </div>

                      </td>
                      <td className="py-4 text-center sm:table-cell hidden">
                        <span>{item.price}$</span>
                      </td>
                      <td className="py-4 pl-10 sm:text-center text-right sm:table-cell hidden">
                        <span>{item.quantity}</span>
                      </td>
                      <td className="py-4 pl-11 text-end">
                        <span>{item.price * item.quantity}$</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <th className="text-right pt-6 sm:table-cell hidden" colSpan="4" scope="row">
                      <span className="font-normal text-slate-700">Sub Total</span>
                    </th>
                    <th className="text-left pt-4 sm:hidden" colSpan="4" scope="row">
                      <p className="font-normal text-slate-700">Sub Total</p>
                    </th>
                    <th className="text-right pt-6" scope="row">
                      <span className="font-normal text-slate-700">{customer?.subTotal}$</span>
                    </th>
                  </tr>
                  <tr>
                    <th className="text-right pt-6 sm:table-cell hidden" colSpan="4" scope="row">
                      <span className="font-normal text-slate-700">VAT</span>
                    </th>
                    <th className="text-left pt-6 sm:hidden" colSpan="4" scope="row">
                      <p className="font-normal text-slate-700">VAT</p>
                    </th>
                    <th className="text-right pt-6" scope="row">
                      <span className="font-normal text-red-600">{customer?.tax}$</span>
                    </th>
                  </tr>
                  <tr>
                    <th className="text-right pt-6 sm:table-cell hidden" colSpan="4" scope="row">
                      <span className="font-normal text-slate-700">Total</span>
                    </th>
                    <th className="text-left pt-6 sm:hidden" colSpan="4" scope="row">
                      <p className="font-normal text-slate-700">Total</p>
                    </th>
                    <th className="text-right pt-6" scope="row">
                      <span className="font-normal text-slate-700">{customer?.totalAmount}$</span>
                    </th>
                  </tr>
                </tfoot>
              </table>
              <div className="py-4">

              </div>
            </div>
          </article>
        </div>
      </section>
      <div className="flex justify-end mt-4">
        <Button type="primary" size="large">Print</Button>
      </div>
    </Modal>
  )
}

export default PrintInvoice