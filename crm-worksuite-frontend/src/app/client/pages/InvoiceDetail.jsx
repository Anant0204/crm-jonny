import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAuth } from '../../../context/AuthContext'
import { useTheme } from '../../../context/ThemeContext'
import { useSettings } from '../../../context/SettingsContext'
import { invoicesAPI, companiesAPI, paymentsAPI } from '../../../api'
import Modal from '../../../components/ui/Modal'
import Input from '../../../components/ui/Input'
import Button from '../../../components/ui/Button'
import { 
  IoArrowBack, 
  IoDownload, 
  IoPrint,
  IoEye,
  IoDocument,
  IoAdd,
  IoClose,
  IoCheckmark
} from 'react-icons/io5'
import { FaEye, FaPrint, FaRegFilePdf, FaDownload } from 'react-icons/fa'

const InvoiceDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()
  const { theme } = useTheme()
  const { getCompanyInfo, formatCurrency } = useSettings()
  
  const companyId = parseInt(user?.company_id || localStorage.getItem('companyId') || 1, 10)
  
  const [invoice, setInvoice] = useState(null)
  const [loading, setLoading] = useState(true)
  const [companyInfo, setCompanyInfo] = useState(null)
  const [isAddPaymentModalOpen, setIsAddPaymentModalOpen] = useState(false)
  const [paymentFormData, setPaymentFormData] = useState({
    amount: '',
    payment_date: new Date().toISOString().split('T')[0],
    payment_method: 'Cash',
    note: ''
  })
  const [payments, setPayments] = useState([])

  useEffect(() => {
    fetchInvoice()
    fetchCompanyInfo()
    fetchPayments()
  }, [id, companyId])

  const fetchPayments = async () => {
    try {
      const response = await paymentsAPI.getAll({
        company_id: companyId,
        invoice_id: id
      })
      if (response.data && response.data.success) {
        setPayments(response.data.data || [])
      }
    } catch (error) {
      console.error('Error fetching payments:', error)
    }
  }

  const fetchCompanyInfo = async () => {
    try {
      const response = await companiesAPI.getById(companyId)
      if (response.data && response.data.success) {
        setCompanyInfo(response.data.data)
      }
    } catch (error) {
      console.error('Error fetching company info:', error)
    }
  }

  const fetchInvoice = async () => {
    try {
      setLoading(true)
      const response = await invoicesAPI.getById(id, { company_id: companyId })
      if (response.data && response.data.success) {
        const inv = response.data.data
        // Calculate paid amount from payments if not available
        const paidAmount = parseFloat(inv.paid_amount || inv.paid || 0)
        const totalAmount = parseFloat(inv.total || inv.amount || 0)
        // Always calculate unpaid amount: total - paid (don't trust backend unpaid if it's wrong)
        const unpaidAmount = Math.max(0, totalAmount - paidAmount)
        
        // Determine status based on paid/unpaid amounts
        let invoiceStatus = inv.status || 'Unpaid'
        if (unpaidAmount <= 0 && paidAmount > 0) {
          invoiceStatus = 'Paid'
        } else if (paidAmount > 0 && unpaidAmount > 0) {
          invoiceStatus = 'Partially Paid'
        } else if (paidAmount === 0) {
          invoiceStatus = 'Unpaid'
        }
        
        setInvoice({
          ...inv,
          invoiceNo: inv.invoice_number || `INV#${String(inv.id).padStart(3, '0')}`,
          amount: totalAmount,
          paid_amount: paidAmount,
          unpaid_amount: unpaidAmount,
          items: inv.items || [],
          status: invoiceStatus
        })
      }
    } catch (error) {
      console.error('Error fetching invoice:', error)
    } finally {
      setLoading(false)
    }
  }

  const company = companyInfo || getCompanyInfo() || {}
  const companyName = company.name || company.company_name || 'Company'

  const getStatusColor = (status) => {
    switch (status) {
      case 'Fully Paid':
      case 'Paid':
        return '#10b981'
      case 'Overdue':
        return '#ef4444'
      case 'Credited':
        return '#8b5cf6'
      case 'Partially Paid':
        return '#3b82f6'
      default:
        return '#f59e0b'
    }
  }

  const getStatusLabel = (status) => {
    if (status === 'Credited') return 'Credit Note'
    return 'Invoice'
  }

  const generateInvoiceHTML = () => {
    if (!invoice) return ''
    
    const items = invoice.items || []
    const subTotal = parseFloat(invoice.sub_total || invoice.total || invoice.amount || 0)
    const discount = parseFloat(invoice.discount || 0)
    const tax = parseFloat(invoice.tax || 0)
    const total = parseFloat(invoice.total || invoice.amount || 0)
    const balanceDue = total - parseFloat(invoice.paid_amount || 0)
    
    const billDate = invoice.bill_date || invoice.issue_date || invoice.created_at
    const dueDate = invoice.due_date
    const statusColor = getStatusColor(invoice.status)
    const primaryColor = theme.primaryAccent || '#0891b2'
    
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Invoice ${invoice.invoiceNo}</title>
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: #f8fafc; color: #333; }
          .download-btn { 
            display: block; 
            width: fit-content; 
            margin: 20px auto; 
            padding: 10px 30px; 
            background: white; 
            border: 1px solid #e5e7eb; 
            border-radius: 8px; 
            cursor: pointer; 
            font-size: 14px;
            color: #374151;
          }
          .download-btn:hover { background: #f9fafb; }
          .invoice-container { 
            max-width: 800px; 
            margin: 0 auto 40px; 
            background: white; 
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); 
            padding: 40px;
          }
          .header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 40px; }
          .logo-section { }
          .logo { display: flex; align-items: center; gap: 10px; }
          .logo-icon { 
            width: 50px; 
            height: 50px; 
            background: ${primaryColor}; 
            border-radius: 10px; 
            display: flex; 
            align-items: center; 
            justify-content: center;
            color: white;
            font-size: 24px;
            font-weight: bold;
          }
          .logo-text { font-size: 28px; font-weight: bold; color: ${primaryColor}; letter-spacing: 1px; }
          .invoice-badge { text-align: right; }
          .badge-label { 
            display: inline-block; 
            background: ${statusColor}; 
            color: white; 
            padding: 6px 16px; 
            border-radius: 4px; 
            font-weight: bold; 
            font-size: 14px; 
            margin-bottom: 8px;
          }
          .invoice-meta { font-size: 13px; color: #6b7280; line-height: 1.8; text-align: right; }
          .invoice-meta strong { color: #374151; }
          
          .parties { display: flex; justify-content: space-between; margin-bottom: 40px; }
          .party { max-width: 45%; }
          .party-name { font-size: 16px; font-weight: bold; color: #111827; margin-bottom: 8px; }
          .party-details { font-size: 13px; color: #6b7280; line-height: 1.8; }
          .party-details a { color: ${primaryColor}; text-decoration: none; }
          .bill-to-label { font-size: 13px; color: #6b7280; margin-bottom: 4px; }
          
          .items-table { width: 100%; border-collapse: collapse; margin-bottom: 30px; }
          .items-table th { 
            background: ${primaryColor}; 
            color: white; 
            padding: 14px 16px; 
            text-align: left; 
            font-size: 13px; 
            font-weight: 600; 
          }
          .items-table th:nth-child(2) { text-align: center; }
          .items-table th:nth-child(3), .items-table th:nth-child(4) { text-align: right; }
          .items-table td { padding: 16px; border-bottom: 1px solid #e5e7eb; font-size: 14px; vertical-align: top; }
          .items-table td:nth-child(2) { text-align: center; }
          .items-table td:nth-child(3), .items-table td:nth-child(4) { text-align: right; }
          .item-name { font-weight: 600; color: #111827; margin-bottom: 4px; }
          .item-desc { font-size: 12px; color: ${primaryColor}; line-height: 1.5; }
          
          .totals { display: flex; justify-content: flex-end; }
          .totals-box { width: 300px; }
          .total-row { 
            display: flex; 
            justify-content: space-between; 
            padding: 12px 16px; 
            font-size: 14px; 
            border-bottom: 1px solid #e5e7eb;
          }
          .total-row.balance { 
            background: #1f2937; 
            color: white; 
            font-weight: bold; 
            font-size: 15px; 
            border: none;
            margin-top: 8px;
          }
          
          @media print {
            body { background: white; }
            .download-btn { display: none; }
            .invoice-container { box-shadow: none; margin: 0; }
            .items-table th, .total-row.balance { print-color-adjust: exact; -webkit-print-color-adjust: exact; }
          }
        </style>
      </head>
      <body>
        <button class="download-btn" onclick="window.print()">Download PDF</button>
        
        <div class="invoice-container">
          <div class="header">
            <div class="logo-section">
              <div class="logo">
                <div class="logo-icon">${companyName.charAt(0).toUpperCase()}</div>
                <span class="logo-text">${companyName}</span>
              </div>
            </div>
            <div class="invoice-badge">
              <div class="badge-label">${getStatusLabel(invoice.status)}</div>
              <div class="invoice-meta">
                <p>ID: <strong>${invoice.invoiceNo}</strong></p>
                <p>Date: <strong>${billDate ? new Date(billDate).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }) : '-'}</strong></p>
                ${invoice.main_invoice ? `<p>Main invoice: <strong>${invoice.main_invoice}</strong></p>` : ''}
              </div>
            </div>
          </div>
          
          <div class="parties">
            <div class="party">
              <div class="party-name">${companyName}</div>
              <div class="party-details">
                ${company.address ? company.address + '<br>' : ''}
                ${company.city ? company.city + ', ' : ''}${company.state ? company.state : ''}${company.postal_code ? ' ' + company.postal_code : ''}<br>
                ${company.phone ? 'Phone: ' + company.phone + '<br>' : ''}
                ${company.email ? 'Email: <a href="mailto:' + company.email + '">' + company.email + '</a><br>' : ''}
                ${company.website ? 'Website: <a href="' + company.website + '">' + company.website + '</a>' : ''}
              </div>
            </div>
            <div class="party" style="text-align: right;">
              <div class="bill-to-label">Bill To</div>
              <div class="party-name">${invoice.client_name || 'Client'}</div>
              <div class="party-details">
                ${invoice.client_address ? invoice.client_address + '<br>' : ''}
                ${invoice.client_city ? invoice.client_city + '<br>' : ''}
                ${invoice.client_state ? invoice.client_state + '<br>' : ''}
                ${invoice.client_country || ''}
              </div>
            </div>
          </div>
          
          <table class="items-table">
            <thead>
              <tr>
                <th>Item</th>
                <th>Quantity</th>
                <th>Rate</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              ${items.length > 0 ? items.map(item => `
                <tr>
                  <td>
                    <div class="item-name">${item.item_name || item.name || 'Item'}</div>
                    ${item.description ? `<div class="item-desc">${item.description.replace(/\n/g, '<br>')}</div>` : ''}
                  </td>
                  <td>${item.quantity || 1} ${item.unit || 'PC'}</td>
                  <td>$${parseFloat(item.unit_price || item.rate || item.price || 0).toFixed(2)}</td>
                  <td>${invoice.status === 'Credited' ? '-' : ''}$${parseFloat(item.amount || item.total || 0).toFixed(2)}</td>
                </tr>
              `).join('') : `
                <tr>
                  <td>
                    <div class="item-name">Invoice Amount</div>
                  </td>
                  <td>1 PC</td>
                  <td>$${total.toFixed(2)}</td>
                  <td>$${total.toFixed(2)}</td>
                </tr>
              `}
            </tbody>
          </table>
          
          <div class="totals">
            <div class="totals-box">
              <div class="total-row">
                <span>Sub Total</span>
                <span>${invoice.status === 'Credited' ? '-' : ''}$${subTotal.toFixed(2)}</span>
              </div>
              ${discount > 0 ? `
              <div class="total-row">
                <span>Discount</span>
                <span>-$${discount.toFixed(2)}</span>
              </div>
              ` : ''}
              ${tax > 0 ? `
              <div class="total-row">
                <span>Tax</span>
                <span>$${tax.toFixed(2)}</span>
              </div>
              ` : ''}
              <div class="total-row balance">
                <span>Balance Due</span>
                <span>${invoice.status === 'Credited' ? '-' : ''}$${balanceDue.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </body>
      </html>
    `
  }

  const handleDownloadPDF = () => {
    const invoiceHTML = generateInvoiceHTML()
    const printWindow = window.open('', '_blank')
    printWindow.document.write(invoiceHTML)
    printWindow.document.close()
  }

  const handlePrint = () => {
    const invoiceHTML = generateInvoiceHTML()
    const printWindow = window.open('', '_blank')
    printWindow.document.write(invoiceHTML)
    printWindow.document.close()
    setTimeout(() => printWindow.print(), 300)
  }

  const handleAddPayment = async () => {
    if (!paymentFormData.amount || parseFloat(paymentFormData.amount) <= 0) {
      alert('Please enter a valid payment amount')
      return
    }
    if (!paymentFormData.payment_method) {
      alert('Please select a payment method')
      return
    }

    try {
      const userId = parseInt(localStorage.getItem('userId') || 1, 10)
      const paymentData = {
        invoice_id: parseInt(id),
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
          amount: '',
          payment_date: new Date().toISOString().split('T')[0],
          payment_method: 'Cash',
          note: ''
        })
        // Refresh invoice and payments to show updated status
        // Add small delay to ensure backend has updated the invoice
        setTimeout(async () => {
          await fetchInvoice()
          await fetchPayments()
        }, 500)
      } else {
        alert(response.data.error || 'Failed to add payment')
      }
    } catch (error) {
      console.error('Error adding payment:', error)
      alert(error.response?.data?.error || 'Failed to add payment')
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-primary-accent border-t-transparent"></div>
          <p className="text-secondary-text mt-4">Loading invoice...</p>
        </div>
      </div>
    )
  }

  if (!invoice) {
    return (
      <div className="text-center py-12">
        <p className="text-secondary-text">Invoice not found</p>
        <button
          onClick={() => navigate('/app/client/invoices')}
          className="mt-4 text-primary-accent hover:underline"
        >
          Back to Invoices
        </button>
      </div>
    )
  }

  const items = invoice.items || []
  const subTotal = parseFloat(invoice.sub_total || invoice.total || invoice.amount || 0)
  const discount = parseFloat(invoice.discount || 0)
  const tax = parseFloat(invoice.tax || 0)
  const total = parseFloat(invoice.total || invoice.amount || 0)
  
  // Calculate paid amount from payments array if available (more accurate)
  const paidFromPayments = payments.reduce((sum, payment) => {
    return sum + parseFloat(payment.amount || 0)
  }, 0)
  
  // Use payments total if available, otherwise use invoice paid_amount
  const paid = paidFromPayments > 0 ? paidFromPayments : parseFloat(invoice.paid_amount || invoice.paid || 0)
  
  // Calculate balance due - always calculate from total - paid to ensure accuracy
  let balanceDue = total - paid
  // Ensure non-negative
  balanceDue = Math.max(0, isNaN(balanceDue) ? 0 : balanceDue)
  
  // Determine if invoice can accept payments
  // Show button if: balance due > 0 AND invoice is not credited
  // We check balance first, then status (more reliable than status alone)
  const invoiceStatus = (invoice.status || '').toLowerCase()
  const isCredited = invoiceStatus === 'credited' || invoiceStatus === 'credit note'
  // Show button if there's any balance due and it's not a credit note
  const canAddPayment = balanceDue > 0 && !isCredited
  
  // Debug logging
  console.log('Invoice Detail - Balance Calculation:', {
    invoice_id: invoice.id,
    invoice_number: invoice.invoiceNo,
    total: total,
    paid_from_invoice: parseFloat(invoice.paid_amount || invoice.paid || 0),
    paid_from_payments: paidFromPayments,
    paid_final: paid,
    balanceDue: balanceDue,
    status: invoice.status,
    canAddPayment: canAddPayment,
    unpaid_amount: invoice.unpaid_amount
  })
  const billDate = invoice.bill_date || invoice.issue_date || invoice.created_at
  const statusColor = getStatusColor(invoice.status)
  const primaryColor = theme.primaryAccent || '#0891b2'

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/app/client/invoices')}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <IoArrowBack size={20} />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-primary-text">Invoice Details</h1>
            <p className="text-secondary-text text-sm">{invoice.invoiceNo}</p>
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          {/* Show Add Payment button if invoice can accept payments */}
          {canAddPayment && (
            <button
              onClick={() => {
                // Auto-fill amount with balance due when opening modal
                setPaymentFormData({
                  amount: balanceDue > 0 ? balanceDue.toFixed(2) : '',
                  payment_date: new Date().toISOString().split('T')[0],
                  payment_method: 'Cash',
                  note: ''
                })
                setIsAddPaymentModalOpen(true)
              }}
              className="flex items-center gap-2 px-4 py-2 text-white rounded-lg transition-colors hover:opacity-90"
              style={{ backgroundColor: primaryColor }}
            >
              <IoAdd size={18} />
              <span className="text-sm font-medium">Add Payment</span>
            </button>
          )}
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <IoPrint size={18} />
            <span className="text-sm font-medium">Print</span>
          </button>
          <button
            onClick={handleDownloadPDF}
            className="flex items-center gap-2 px-4 py-2 text-white rounded-lg transition-colors"
            style={{ backgroundColor: primaryColor }}
          >
            <IoDownload size={18} />
            <span className="text-sm font-medium">Download PDF</span>
          </button>
        </div>
      </div>

      {/* Invoice Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Download PDF Button */}
        <div className="flex justify-center py-4 border-b border-gray-100 bg-gray-50">
          <button
            onClick={handleDownloadPDF}
            className="px-6 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Download PDF
          </button>
        </div>

        {/* Invoice Content */}
        <div className="p-6 sm:p-10">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start gap-6 mb-10">
            {/* Company Logo */}
            <div className="flex items-center gap-3">
              <div 
                className="w-14 h-14 rounded-xl flex items-center justify-center text-white text-2xl font-bold"
                style={{ backgroundColor: primaryColor }}
              >
                {companyName.charAt(0).toUpperCase()}
              </div>
              <span className="text-3xl font-bold" style={{ color: primaryColor }}>
                {companyName}
              </span>
            </div>

            {/* Invoice Badge */}
            <div className="text-right">
              <div 
                className="inline-block px-4 py-1.5 rounded text-white text-sm font-bold mb-3"
                style={{ backgroundColor: statusColor }}
              >
                {invoice.status || 'Unpaid'}
              </div>
              <div className="text-sm text-gray-500 space-y-1">
                <p>ID: <span className="text-gray-800 font-semibold">{invoice.invoiceNo}</span></p>
                <p>Date: <span className="text-gray-800 font-semibold">
                  {billDate ? new Date(billDate).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }) : '-'}
                </span></p>
                {invoice.main_invoice && (
                  <p>Main invoice: <span className="text-gray-800 font-semibold">{invoice.main_invoice}</span></p>
                )}
              </div>
            </div>
          </div>

          {/* Company & Client Info */}
          <div className="flex flex-col sm:flex-row justify-between gap-8 mb-10">
            {/* Company Info */}
            <div>
              <p className="font-bold text-gray-900 text-lg mb-2">{companyName}</p>
              <div className="text-sm text-gray-500 space-y-1">
                {company.address && <p>{company.address}</p>}
                {(company.city || company.state || company.postal_code) && (
                  <p>{company.city}{company.city && company.state ? ', ' : ''}{company.state} {company.postal_code}</p>
                )}
                {company.phone && <p>Phone: {company.phone}</p>}
                {company.email && <p>Email: <a href={`mailto:${company.email}`} className="hover:underline" style={{ color: primaryColor }}>{company.email}</a></p>}
                {company.website && <p>Website: <a href={company.website} className="hover:underline" style={{ color: primaryColor }}>{company.website}</a></p>}
              </div>
            </div>

            {/* Client Info */}
            <div className="sm:text-right">
              <p className="text-sm text-gray-500 mb-1">Bill To</p>
              <p className="font-bold text-gray-900 text-lg mb-2">{invoice.client_name || user?.name || 'Client'}</p>
              <div className="text-sm text-gray-500 space-y-1">
                {invoice.client_address && <p>{invoice.client_address}</p>}
                {invoice.client_city && <p>{invoice.client_city}</p>}
                {invoice.client_state && <p>{invoice.client_state}</p>}
                {invoice.client_country && <p>{invoice.client_country}</p>}
              </div>
            </div>
          </div>

          {/* Items Table */}
          <div className="overflow-x-auto mb-8">
            <table className="w-full">
              <thead>
                <tr style={{ backgroundColor: primaryColor }}>
                  <th className="text-left py-4 px-5 text-sm font-semibold text-white">Item</th>
                  <th className="text-center py-4 px-5 text-sm font-semibold text-white">Quantity</th>
                  <th className="text-right py-4 px-5 text-sm font-semibold text-white">Rate</th>
                  <th className="text-right py-4 px-5 text-sm font-semibold text-white">Total</th>
                </tr>
              </thead>
              <tbody>
                {items.length > 0 ? (
                  items.map((item, idx) => (
                    <tr key={idx} className="border-b border-gray-100">
                      <td className="py-5 px-5">
                        <p className="font-semibold text-gray-900">{item.item_name || item.name || 'Item'}</p>
                        {item.description && (
                          <p className="text-sm mt-1 whitespace-pre-line" style={{ color: primaryColor }}>{item.description}</p>
                        )}
                      </td>
                      <td className="py-5 px-5 text-center text-gray-600">{item.quantity || 1} {item.unit || 'PC'}</td>
                      <td className="py-5 px-5 text-right text-gray-600">${parseFloat(item.unit_price || item.rate || 0).toFixed(2)}</td>
                      <td className="py-5 px-5 text-right font-semibold text-gray-900">
                        {invoice.status === 'Credited' ? '-' : ''}${parseFloat(item.amount || item.total || 0).toFixed(2)}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr className="border-b border-gray-100">
                    <td className="py-5 px-5">
                      <p className="font-semibold text-gray-900">Invoice Amount</p>
                    </td>
                    <td className="py-5 px-5 text-center text-gray-600">1 PC</td>
                    <td className="py-5 px-5 text-right text-gray-600">${total.toFixed(2)}</td>
                    <td className="py-5 px-5 text-right font-semibold text-gray-900">${total.toFixed(2)}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Totals */}
          <div className="flex justify-end">
            <div className="w-full sm:w-80">
              <div className="flex justify-between py-3 px-5 border-b border-gray-100">
                <span className="text-gray-600">Sub Total</span>
                <span className="font-medium text-gray-900">
                  {invoice.status === 'Credited' ? '-' : ''}${subTotal.toFixed(2)}
                </span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between py-3 px-5 border-b border-gray-100">
                  <span className="text-gray-600">Discount</span>
                  <span className="font-medium text-red-600">-${discount.toFixed(2)}</span>
                </div>
              )}
              {tax > 0 && (
                <div className="flex justify-between py-3 px-5 border-b border-gray-100">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-medium text-gray-900">${tax.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between py-4 px-5 bg-gray-800 text-white mt-2 rounded-lg">
                <span className="font-semibold">Balance Due</span>
                <span className="font-bold text-lg">
                  {invoice.status === 'Credited' ? '-' : ''}${balanceDue.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons Footer */}
        <div className="px-6 sm:px-10 pb-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-gray-100">
            <button
              onClick={handleDownloadPDF}
              className="flex flex-col items-center gap-2 p-4 hover:bg-gray-50 rounded-xl transition-colors group"
            >
              <div 
                className="w-10 h-10 rounded-lg flex items-center justify-center transition-colors"
                style={{ backgroundColor: `${primaryColor}15`, color: primaryColor }}
              >
                <FaEye size={16} />
              </div>
              <span className="text-xs font-semibold text-gray-600">Preview</span>
            </button>
            <button
              onClick={handlePrint}
              className="flex flex-col items-center gap-2 p-4 hover:bg-green-50 rounded-xl transition-colors group"
            >
              <div className="w-10 h-10 rounded-lg bg-green-50 text-green-600 flex items-center justify-center group-hover:bg-green-100 transition-colors">
                <FaPrint size={16} />
              </div>
              <span className="text-xs font-semibold text-gray-600">Print</span>
            </button>
            <button
              onClick={handleDownloadPDF}
              className="flex flex-col items-center gap-2 p-4 hover:bg-red-50 rounded-xl transition-colors group"
            >
              <div className="w-10 h-10 rounded-lg bg-red-50 text-red-600 flex items-center justify-center group-hover:bg-red-100 transition-colors">
                <FaRegFilePdf size={16} />
              </div>
              <span className="text-xs font-semibold text-gray-600">View PDF</span>
            </button>
            <button
              onClick={handleDownloadPDF}
              className="flex flex-col items-center gap-2 p-4 hover:bg-blue-50 rounded-xl transition-colors group"
            >
              <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                <FaDownload size={16} />
              </div>
              <span className="text-xs font-semibold text-gray-600">Download</span>
            </button>
          </div>
        </div>
      </div>

      {/* Payment History Section */}
      {payments.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Payment History</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Date</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Method</th>
                  <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">Amount</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Note</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((payment) => (
                  <tr key={payment.id} className="border-b border-gray-100">
                    <td className="py-3 px-4 text-sm text-gray-600">
                      {payment.paid_on ? new Date(payment.paid_on).toLocaleDateString('en-GB', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric'
                      }) : '-'}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">
                      {payment.payment_method || payment.offline_payment_method || payment.payment_gateway || '-'}
                    </td>
                    <td className="py-3 px-4 text-sm font-semibold text-gray-900 text-right">
                      ${parseFloat(payment.amount || 0).toFixed(2)}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">
                      {payment.remark || payment.note || '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add Payment Modal */}
      <Modal
        isOpen={isAddPaymentModalOpen}
        onClose={() => {
          setIsAddPaymentModalOpen(false)
          setPaymentFormData({
            amount: '',
            payment_date: new Date().toISOString().split('T')[0],
            payment_method: 'Cash',
            note: ''
          })
        }}
        title="Add Payment"
      >
        <div className="space-y-4">
          {/* Invoice Number - Pre-filled */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Invoice Number <span className="text-gray-500 text-xs font-normal">(Pre-filled)</span>
            </label>
            <input
              type="text"
              value={invoice?.invoiceNo || invoice?.invoice_number || `INV#${String(invoice?.id || id).padStart(3, '0')}`}
              disabled
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-600 font-medium"
              readOnly
            />
          </div>
          
          {/* Amount Due - Display */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Amount Due <span className="text-gray-500 text-xs font-normal">(Remaining Balance)</span>
            </label>
            <input
              type="text"
              value={`$${balanceDue.toFixed(2)}`}
              disabled
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-600 font-semibold text-lg"
              readOnly
            />
            <p className="text-xs text-gray-500 mt-1">
              Total Invoice: ${total.toFixed(2)} | Paid: ${paid.toFixed(2)} | Due: ${balanceDue.toFixed(2)}
            </p>
          </div>
          <Input
            label="Payment Amount"
            type="number"
            step="0.01"
            min="0"
            max={balanceDue}
            value={paymentFormData.amount || (balanceDue > 0 ? balanceDue.toFixed(2) : '')}
            onChange={(e) => {
              const value = e.target.value
              // Ensure value doesn't exceed balance due
              const numValue = parseFloat(value) || 0
              const finalValue = numValue > balanceDue ? balanceDue.toFixed(2) : value
              setPaymentFormData({ ...paymentFormData, amount: finalValue })
            }}
            placeholder={balanceDue > 0 ? `Enter amount (max: $${balanceDue.toFixed(2)})` : 'Enter payment amount'}
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
              className="text-white"
              style={{ backgroundColor: primaryColor }}
            >
              <IoCheckmark size={18} className="mr-1" /> Add Payment
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default InvoiceDetail

