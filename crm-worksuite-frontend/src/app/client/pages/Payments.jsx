import DataTable from '../../../components/ui/DataTable'
import RightSideModal from '../../../components/ui/RightSideModal'
import Modal from '../../../components/ui/Modal'
import Input from '../../../components/ui/Input'
import Badge from '../../../components/ui/Badge'
import Button from '../../../components/ui/Button'
import { useState, useEffect } from 'react'
import { useAuth } from '../../../context/AuthContext'
import { paymentsAPI, invoicesAPI } from '../../../api'
import { IoEye, IoDownload, IoAdd, IoClose, IoCheckmark } from 'react-icons/io5'  

const Payments = () => {
  const { user } = useAuth()
  const userId = user?.id || localStorage.getItem('userId')
  const companyId = user?.company_id || localStorage.getItem('companyId')
  
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [isAddPaymentModalOpen, setIsAddPaymentModalOpen] = useState(false)
  const [selectedPayment, setSelectedPayment] = useState(null)
  const [payments, setPayments] = useState([])
  const [invoices, setInvoices] = useState([])
  const [loading, setLoading] = useState(true)
  const [paymentFormData, setPaymentFormData] = useState({
    invoice_id: '',
    amount: '',
    payment_date: new Date().toISOString().split('T')[0],
    payment_method: 'Cash',
    note: ''
  })

  useEffect(() => {
    if (userId && companyId) {
      fetchPayments()
      fetchInvoices()
    }
  }, [userId, companyId])

  const fetchInvoices = async () => {
    try {
      const response = await invoicesAPI.getAll({
        company_id: companyId,
        client_id: userId
      })
      if (response.data && response.data.success) {
        setInvoices(response.data.data || [])
      }
    } catch (error) {
      console.error('Error fetching invoices:', error)
    }
  }

  const fetchPayments = async () => {
    try {
      setLoading(true)
      const response = await paymentsAPI.getAll({
        company_id: companyId,
        client_id: userId
      })
      if (response.data.success) {
        const fetchedPayments = response.data.data || []
        const transformedPayments = fetchedPayments.map(pay => ({
          id: pay.id,
          paymentId: pay.payment_number || pay.paymentNumber || `PAY-${pay.id}`,
          invoice: pay.invoice_number || pay.invoiceNumber || `INV-${pay.invoice_id || pay.invoiceId}`,
          amount: parseFloat(pay.amount || 0),
          date: pay.payment_date ? new Date(pay.payment_date).toLocaleDateString() : 'N/A',
          mode: pay.payment_method || pay.paymentMethod || 'N/A',
          status: pay.status || 'Completed',
          ...pay
        }))
        setPayments(transformedPayments)
      }
    } catch (error) {
      console.error('Error fetching payments:', error)
    } finally {
      setLoading(false)
    }
  }

  const columns = [
    { key: 'paymentId', label: 'Payment ID' },
    { key: 'invoice', label: 'Invoice' },
    {
      key: 'amount',
      label: 'Amount',
      render: (value) => `$${value.toLocaleString()}`,
    },
    { key: 'date', label: 'Date' },
    { key: 'mode', label: 'Payment Mode' },
    {
      key: 'status',
      label: 'Status',
      render: (value) => (
        <Badge variant={value === 'Completed' ? 'success' : 'warning'}>{value}</Badge>
      ),
    },
  ]

  const handleView = (payment) => {
    setSelectedPayment(payment)
    setIsViewModalOpen(true)
  }

  const handleAddPayment = async () => {
    if (!paymentFormData.invoice_id) {
      alert('Please select an invoice')
      return
    }
    if (!paymentFormData.amount || parseFloat(paymentFormData.amount) <= 0) {
      alert('Please enter a valid payment amount')
      return
    }
    if (!paymentFormData.payment_method) {
      alert('Please select a payment method')
      return
    }

    try {
      const paymentData = {
        invoice_id: parseInt(paymentFormData.invoice_id),
        company_id: companyId,
        user_id: userId,
        amount: parseFloat(paymentFormData.amount),
        paid_on: paymentFormData.payment_date,
        payment_method: paymentFormData.payment_method,
        remark: paymentFormData.note || null
      }

      const response = await paymentsAPI.create(paymentData)
      if (response.data.success) {
        alert('Payment added successfully!')
        setIsAddPaymentModalOpen(false)
        setPaymentFormData({
          invoice_id: '',
          amount: '',
          payment_date: new Date().toISOString().split('T')[0],
          payment_method: 'Cash',
          note: ''
        })
        await fetchPayments()
        await fetchInvoices()
      } else {
        alert(response.data.error || 'Failed to add payment')
      }
    } catch (error) {
      console.error('Error adding payment:', error)
      alert(error.response?.data?.error || 'Failed to add payment')
    }
  }

  const actions = (row) => (
    <div className="flex items-center justify-end gap-2">
      <button
        onClick={(e) => {
          e.stopPropagation()
          handleView(row)
        }}
        className="p-2 text-primary-accent hover:bg-primary-accent hover:bg-opacity-10 rounded transition-colors"
        title="View Details"
      >
        <IoEye size={18} />
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation()
          alert(`Downloading receipt for ${row.paymentId}...`)
        }}
        className="p-2 text-secondary-accent hover:bg-secondary-accent hover:bg-opacity-10 rounded transition-colors"
        title="Download Receipt"
      >
        <IoDownload size={18} />
      </button>
    </div>
  )

  // Get invoices with pending due amounts
  const invoicesWithDue = invoices.filter(inv => {
    const total = parseFloat(inv.total || 0)
    const paid = parseFloat(inv.paid || inv.paid_amount || 0)
    const dueAmount = total - paid
    return dueAmount > 0
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary-text">Payments</h1>
          <p className="text-secondary-text mt-1">View your payment history</p>
        </div>
        <Button
          onClick={() => setIsAddPaymentModalOpen(true)}
          className="flex items-center gap-2"
        >
          <IoAdd size={18} />
          Add Payment
        </Button>
      </div>

      {loading ? (
        <div className="text-center py-8">
          <p className="text-secondary-text">Loading payments...</p>
        </div>
      ) : (
        <DataTable
          columns={columns}
          data={payments}
          searchPlaceholder="Search payments..."
          filters={true}
          filterConfig={[
            { key: 'status', label: 'Status', type: 'select', options: ['Completed', 'Pending', 'Failed'] },
            { key: 'mode', label: 'Payment Mode', type: 'select', options: ['Bank Transfer', 'Credit Card', 'PayPal', 'Cash'] },
            { key: 'date', label: 'Date', type: 'daterange' },
          ]}
          actions={actions}
          bulkActions={false}
        />
      )}

      <RightSideModal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        title="Payment Details"
      >
        {selectedPayment && (
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-secondary-text">Payment ID</label>
              <p className="text-primary-text mt-1 text-base">{selectedPayment.paymentId}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-secondary-text">Invoice</label>
              <p className="text-primary-text mt-1 text-base">{selectedPayment.invoice}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-secondary-text">Amount</label>
              <p className="text-primary-text mt-1 text-base">${selectedPayment.amount.toLocaleString()}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-secondary-text">Date</label>
              <p className="text-primary-text mt-1 text-base">{selectedPayment.date}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-secondary-text">Payment Mode</label>
              <p className="text-primary-text mt-1 text-base">{selectedPayment.mode}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-secondary-text">Status</label>
              <div className="mt-1">
                <Badge variant={selectedPayment.status === 'Completed' ? 'success' : 'warning'}>
                  {selectedPayment.status}
                </Badge>
              </div>
            </div>
            <div className="flex gap-3 pt-4 border-t border-gray-200">
              <Button
                variant="outline"
                onClick={() => setIsViewModalOpen(false)}
                className="flex-1"
              >
                Close
              </Button>
            </div>
          </div>
        )}
      </RightSideModal>

      {/* Add Payment Modal */}
      <Modal
        isOpen={isAddPaymentModalOpen}
        onClose={() => {
          setIsAddPaymentModalOpen(false)
          setPaymentFormData({
            invoice_id: '',
            amount: '',
            payment_date: new Date().toISOString().split('T')[0],
            payment_method: 'Cash',
            note: ''
          })
        }}
        title="Add Payment"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Invoice <span className="text-red-500">*</span>
            </label>
            {invoicesWithDue.length > 0 ? (
              <select
                value={paymentFormData.invoice_id}
                onChange={(e) => {
                  const selectedInvoiceId = e.target.value
                  const selectedInvoice = invoices.find(inv => inv.id === parseInt(selectedInvoiceId))
                  setPaymentFormData({
                    ...paymentFormData,
                    invoice_id: selectedInvoiceId,
                    amount: selectedInvoice ? (parseFloat(selectedInvoice.total || 0) - parseFloat(selectedInvoice.paid || selectedInvoice.paid_amount || 0)).toFixed(2) : ''
                  })
                }}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-accent focus:border-primary-accent outline-none"
                required
              >
                <option value="">-- Select Invoice --</option>
                {invoicesWithDue.map(invoice => {
                  const invoiceNumber = invoice.invoice_number || `INV#${invoice.id}`
                  const total = parseFloat(invoice.total || 0)
                  const paid = parseFloat(invoice.paid || invoice.paid_amount || 0)
                  const dueAmount = total - paid
                  return (
                    <option key={invoice.id} value={invoice.id}>
                      {invoiceNumber} - ${total.toFixed(2)} (Due: ${dueAmount.toFixed(2)})
                    </option>
                  )
                })}
              </select>
            ) : (
              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-sm text-yellow-800">
                  <strong>No unpaid invoices found.</strong> All invoices are paid or no invoices exist.
                </p>
              </div>
            )}
          </div>
          <Input
            label="Payment Amount"
            type="number"
            step="0.01"
            min="0"
            value={paymentFormData.amount}
            onChange={(e) => setPaymentFormData({ ...paymentFormData, amount: e.target.value })}
            placeholder="Enter payment amount"
            required
          />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Payment Method</label>
            <select
              value={paymentFormData.payment_method}
              onChange={(e) => setPaymentFormData({ ...paymentFormData, payment_method: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-accent focus:border-primary-accent outline-none"
              required
            >
              <option value="Cash">Cash</option>
              <option value="Bank Transfer">Bank Transfer</option>
              <option value="Credit Card">Credit Card</option>
              <option value="Debit Card">Debit Card</option>
              <option value="Cheque">Cheque</option>
              <option value="Online Payment">Online Payment</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <Input
            label="Payment Date"
            type="date"
            value={paymentFormData.payment_date}
            onChange={(e) => setPaymentFormData({ ...paymentFormData, payment_date: e.target.value })}
            required
          />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Note (Optional)</label>
            <textarea
              value={paymentFormData.note}
              onChange={(e) => setPaymentFormData({ ...paymentFormData, note: e.target.value })}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-accent focus:border-primary-accent outline-none resize-none"
              placeholder="Add a note about this payment..."
            />
          </div>
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200">
            <Button
              variant="outline"
              onClick={() => {
                setIsAddPaymentModalOpen(false)
                setPaymentFormData({
                  invoice_id: '',
                  amount: '',
                  payment_date: new Date().toISOString().split('T')[0],
                  payment_method: 'Cash',
                  note: ''
                })
              }}
            >
              <IoClose size={16} className="mr-1" /> Cancel
            </Button>
            <Button
              onClick={handleAddPayment}
              disabled={invoicesWithDue.length === 0}
            >
              <IoCheckmark size={18} className="mr-1" /> Add Payment
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default Payments
