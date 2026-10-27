import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../../context/AuthContext'
import Card from '../../../components/ui/Card'
import Badge from '../../../components/ui/Badge'
import Button from '../../../components/ui/Button'
import { dashboardAPI, invoicesAPI, paymentsAPI, projectsAPI, contractsAPI, estimatesAPI, clientsAPI, messagesAPI, tasksAPI } from '../../../api'
import { useSettings } from '../../../context/SettingsContext'
import { 
  IoDocumentText, 
  IoCash, 
  IoNotifications, 
  IoArrowForward,
  IoCheckmarkCircle,
  IoTime,
  IoAlertCircle,
  IoFolderOpen,
  IoReceipt,
  IoCard,
  IoPerson,
  IoSettings,
  IoAdd,
  IoEye
} from 'react-icons/io5'

const ClientDashboard = () => {
  const navigate = useNavigate()
  const { user } = useAuth()
  const { formatCurrency } = useSettings()
  const [loading, setLoading] = useState(true)
  const [dashboardStats, setDashboardStats] = useState({
    my_projects: 0,
    my_tasks: 0,
    outstanding_invoices: 0,
    total_payments: 0
  })
  const [openInvoices, setOpenInvoices] = useState([])
  const [upcomingPayments, setUpcomingPayments] = useState([])
  const [recentActivity, setRecentActivity] = useState([])
  const [announcements, setAnnouncements] = useState([])
  const [projects, setProjects] = useState([])
  const [recentProjects, setRecentProjects] = useState([])
  const [workData, setWorkData] = useState({ projects: [], tasks: [] })
  const [financeData, setFinanceData] = useState({ invoices: [], payments: [], estimates: [], contracts: [], credit_notes: [] })
  const [contractsCount, setContractsCount] = useState(0)
  const [estimatesCount, setEstimatesCount] = useState(0)
  const [creditNotesCount, setCreditNotesCount] = useState(0)
  const [contactsCount, setContactsCount] = useState(0)
  const [recentMessages, setRecentMessages] = useState([])
  const [tasksOverview, setTasksOverview] = useState({ total: 0, completed: 0, pending: 0, inProgress: 0 })
  const [myTasks, setMyTasks] = useState([])
  const [projectsOverview, setProjectsOverview] = useState({ open: 0, completed: 0, hold: 0, progress: 0 })
  const [invoiceOverview, setInvoiceOverview] = useState({ 
    overdue: 0, overdueAmount: 0,
    notPaid: 0, notPaidAmount: 0,
    partiallyPaid: 0, partiallyPaidAmount: 0,
    fullyPaid: 0, fullyPaidAmount: 0,
    draft: 0, draftAmount: 0,
    totalInvoiced: 0,
    totalDue: 0
  })

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      setLoading(true)
      
      // Get user_id, company_id, and client_id
      const userId = user?.id || localStorage.getItem('userId')
      const companyId = parseInt(user?.company_id || localStorage.getItem('companyId') || 1, 10)
      const clientId = user?.client_id || localStorage.getItem('clientId')
      const params = { user_id: userId, company_id: companyId, client_id: clientId || userId }
      
      // Fetch dashboard stats
      const statsResponse = await dashboardAPI.getClientStats(params)
      if (statsResponse.data.success) {
        const stats = statsResponse.data.data
        setDashboardStats(stats)
        setContractsCount(stats.contracts_count || 0)
        setEstimatesCount(stats.estimates_count || 0)
        setCreditNotesCount(stats.credit_notes_count || 0)
        setContactsCount(stats.contacts_count || 0)
      }

      // Fetch work data
      try {
        const workResponse = await dashboardAPI.getClientWork(params)
        if (workResponse.data.success) {
          setWorkData(workResponse.data.data)
        }
      } catch (error) {
        console.error('Error fetching work data:', error)
      }

      // Fetch finance data
      try {
        const financeResponse = await dashboardAPI.getClientFinance(params)
        if (financeResponse.data.success) {
          const finance = financeResponse.data.data
          setFinanceData(finance)
          // Update counts from finance data
          if (finance.estimates) setEstimatesCount(finance.estimates.length)
          if (finance.contracts) setContractsCount(finance.contracts.length)
          if (finance.credit_notes) setCreditNotesCount(finance.credit_notes.length)
        }
      } catch (error) {
        console.error('Error fetching finance data:', error)
      }

      // Fetch client contacts count
      try {
        // Get current client ID from user
        const clientsResponse = await clientsAPI.getAll({ company_id: companyId })
        if (clientsResponse.data.success && clientsResponse.data.data.length > 0) {
          const client = clientsResponse.data.data.find(c => c.owner_id === user?.id) || clientsResponse.data.data[0]
          if (client && client.id) {
            const contactsResponse = await clientsAPI.getContacts(client.id, { company_id: companyId })
            if (contactsResponse.data.success) {
              setContactsCount(contactsResponse.data.data?.length || 0)
            }
          }
        }
      } catch (error) {
        console.error('Error fetching contacts:', error)
      }

      // Fetch all invoices - filter by client (for overview stats)
      const invoicesResponse = await invoicesAPI.getAll({ 
        page: 1, 
        pageSize: 100, // Get more for overview stats
        company_id: companyId,
        client_id: clientId || userId
      })
      let transformedInvoices = []
      if (invoicesResponse.data.success) {
        const invoices = invoicesResponse.data.data || []
        transformedInvoices = invoices.map(inv => {
          const dueDate = new Date(inv.due_date || inv.dueDate)
          const today = new Date()
          const daysOverdue = Math.max(0, Math.floor((today - dueDate) / (1000 * 60 * 60 * 24)))
          return {
            id: inv.id,
            invoiceNo: inv.invoice_number || inv.invoiceNumber || `INV-${inv.id}`,
            amount: parseFloat(inv.total || inv.amount || 0),
            dueDate: inv.due_date || inv.dueDate,
            status: inv.status || 'Unpaid',
            daysOverdue: daysOverdue
          }
        })
        
        // Filter open invoices (unpaid/overdue) for display
        const openInvoicesList = transformedInvoices.filter(inv => 
          inv.status === 'Unpaid' || inv.status === 'unpaid' || inv.daysOverdue > 0
        ).slice(0, 5)
        setOpenInvoices(openInvoicesList)
        
        // Calculate invoice overview statistics
        const overdue = transformedInvoices.filter(inv => inv.daysOverdue > 0)
        const notPaid = transformedInvoices.filter(inv => inv.status === 'Unpaid' || inv.status === 'unpaid')
        const partiallyPaid = transformedInvoices.filter(inv => inv.status === 'Partially Paid' || inv.status === 'partially_paid')
        const fullyPaid = transformedInvoices.filter(inv => inv.status === 'Paid' || inv.status === 'paid' || inv.status === 'Fully Paid')
        const draft = transformedInvoices.filter(inv => inv.status === 'Draft' || inv.status === 'draft')
        
        setInvoiceOverview({
          overdue: overdue.length,
          overdueAmount: overdue.reduce((sum, inv) => sum + inv.amount, 0),
          notPaid: notPaid.length,
          notPaidAmount: notPaid.reduce((sum, inv) => sum + inv.amount, 0),
          partiallyPaid: partiallyPaid.length,
          partiallyPaidAmount: partiallyPaid.reduce((sum, inv) => sum + inv.amount, 0),
          fullyPaid: fullyPaid.length,
          fullyPaidAmount: fullyPaid.reduce((sum, inv) => sum + inv.amount, 0),
          draft: draft.length,
          draftAmount: draft.reduce((sum, inv) => sum + inv.amount, 0),
          totalInvoiced: transformedInvoices.reduce((sum, inv) => sum + inv.amount, 0),
          totalDue: overdue.reduce((sum, inv) => sum + inv.amount, 0) + notPaid.reduce((sum, inv) => sum + inv.amount, 0)
        })
      }

      // Fetch upcoming payments - filter by client
      const paymentsResponse = await paymentsAPI.getAll({ 
        page: 1, 
        pageSize: 5,
        company_id: companyId,
        client_id: clientId || userId
      })
      if (paymentsResponse.data.success) {
        const payments = paymentsResponse.data.data || []
        const transformedPayments = payments.map(pay => ({
          id: pay.id,
          description: pay.description || `Payment #${pay.id}`,
          amount: parseFloat(pay.amount || 0),
          dueDate: pay.payment_date || pay.paymentDate || pay.created_at
        }))
        setUpcomingPayments(transformedPayments)
      }

      // Fetch projects - filter by client
      const projectsResponse = await projectsAPI.getAll({ 
        page: 1, 
        pageSize: 100, // Get more for overview stats
        company_id: companyId,
        client_id: clientId || userId
      })
      if (projectsResponse.data.success) {
        const allProjects = projectsResponse.data.data || []
        setProjects(allProjects)
        // Get recent 5 projects
        setRecentProjects(allProjects.slice(0, 5))
        
        // Calculate projects overview
        const open = allProjects.filter(p => p.status === 'in_progress' || p.status === 'In Progress' || p.status === 'active' || p.status === 'Active').length
        const completed = allProjects.filter(p => p.status === 'completed' || p.status === 'Completed' || p.status === 'done').length
        const hold = allProjects.filter(p => p.status === 'hold' || p.status === 'Hold' || p.status === 'on_hold').length
        const totalProjects = allProjects.length
        const totalProgress = totalProjects > 0 
          ? Math.round(allProjects.reduce((sum, p) => sum + (parseFloat(p.progress) || 0), 0) / totalProjects)
          : 0
        
        setProjectsOverview({
          open,
          completed,
          hold,
          progress: totalProgress
        })
      }

      // Fetch tasks for client
      try {
        const tasksResponse = await tasksAPI.getAll({ 
          company_id: companyId,
          client_id: clientId || userId
        })
        if (tasksResponse.data.success) {
          const allTasks = tasksResponse.data.data || []
          setMyTasks(allTasks.slice(0, 5))
          
          // Calculate tasks overview
          const completed = allTasks.filter(t => t.status === 'Done' || t.status === 'done' || t.status === 'Complete' || t.status === 'complete').length
          const pending = allTasks.filter(t => t.status === 'Incomplete' || t.status === 'incomplete').length
          const inProgress = allTasks.filter(t => t.status === 'Doing' || t.status === 'doing').length
          
          setTasksOverview({
            total: allTasks.length,
            completed,
            pending,
            inProgress
          })
        }
      } catch (error) {
        console.error('Error fetching tasks:', error)
      }

      // Fetch recent messages
      try {
        const messagesResponse = await messagesAPI.getAll({ 
          company_id: companyId,
          user_id: userId,
          page: 1,
          pageSize: 5
        })
        if (messagesResponse.data.success) {
          setRecentMessages(messagesResponse.data.data || [])
        }
      } catch (error) {
        console.error('Error fetching messages:', error)
        setRecentMessages([])
      }

      // Fetch recent activity
      try {
        const activityResponse = await dashboardAPI.getClientActivity(params)
        if (activityResponse.data.success) {
          setRecentActivity(activityResponse.data.data || [])
        }
      } catch (error) {
        console.error('Error fetching activity:', error)
        // Fallback to invoices-based activity
        const activity = []
        if (transformedInvoices.length > 0) {
          transformedInvoices.slice(0, 3).forEach(inv => {
            activity.push({
              id: `inv-${inv.id}`,
              message: `Invoice ${inv.invoiceNo} ${inv.status === 'Overdue' ? 'is overdue' : 'sent'}`,
              date: inv.dueDate,
              type: 'invoice'
            })
          })
        }
        setRecentActivity(activity)
      }

      // Fetch announcements
      try {
        const announcementsResponse = await dashboardAPI.getClientAnnouncements(params)
        if (announcementsResponse.data.success) {
          const announceData = announcementsResponse.data.data || []
          setAnnouncements(announceData.map(a => ({
            id: a.id,
            title: a.title || 'Announcement',
            content: a.message || a.content || '',
            date: a.created_at
          })))
        }
      } catch (error) {
        console.error('Error fetching announcements:', error)
        setAnnouncements([])
      }

    } catch (error) {
      console.error('Error fetching dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  const totalOpenInvoices = openInvoices.reduce((sum, inv) => sum + inv.amount, 0)
  const totalUpcomingPayments = upcomingPayments.reduce((sum, pay) => sum + pay.amount, 0)

  const stats = [
    { 
      label: 'Open Invoices', 
      value: openInvoices.length.toString(), 
      subtitle: `$${totalOpenInvoices.toLocaleString()}`,
      icon: IoDocumentText, 
      color: 'text-warning',
      bgColor: 'bg-warning/10',
      path: '/app/client/invoices'
    },
    { 
      label: 'Upcoming Payments', 
      value: upcomingPayments.length.toString(), 
      subtitle: `$${totalUpcomingPayments.toLocaleString()}`,
      icon: IoCash, 
      color: 'text-primary-accent',
      bgColor: 'bg-primary-accent/10',
      path: '/app/client/payments'
    },
    { 
      label: 'Outstanding Amount', 
      value: `$${dashboardStats.outstanding_invoices?.toLocaleString() || '0'}`, 
      subtitle: 'Total due',
      icon: IoNotifications, 
      color: 'text-secondary-accent',
      bgColor: 'bg-secondary-accent/10',
      path: '/app/client/invoices'
    },
    { 
      label: 'Active Projects', 
      value: dashboardStats.my_projects?.toString() || '0', 
      subtitle: 'In progress',
      icon: IoFolderOpen, 
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
      path: '/app/client/projects'
    },
  ]

  // Quick Access Menu Items organized by category
  const quickAccessMenus = [
    {
      category: 'Work',
      items: [
        { label: 'Contracts', icon: IoDocumentText, path: '/app/client/contracts', color: 'text-blue-600', bgColor: 'bg-blue-100', count: contractsCount.toString() },
        { label: 'Projects', icon: IoFolderOpen, path: '/app/client/projects', color: 'text-purple-600', bgColor: 'bg-purple-100', count: workData.projects?.length?.toString() || dashboardStats.my_projects?.toString() || '0' },
        { label: 'Tasks', icon: IoCheckmarkCircle, path: '/app/client/tasks', color: 'text-orange-600', bgColor: 'bg-orange-100', count: workData.tasks?.length?.toString() || dashboardStats.my_tasks?.toString() || '0' },
      ]
    },
    {
      category: 'Finance',
      items: [
        { label: 'Invoices', icon: IoReceipt, path: '/app/client/invoices', color: 'text-indigo-600', bgColor: 'bg-indigo-100', count: financeData.invoices?.length?.toString() || openInvoices.length.toString() },
        { label: 'Estimates', icon: IoDocumentText, path: '/app/client/estimates', color: 'text-teal-600', bgColor: 'bg-teal-100', count: estimatesCount.toString() },
        { label: 'Payments', icon: IoCash, path: '/app/client/payments', color: 'text-green-600', bgColor: 'bg-green-100', count: financeData.payments?.length?.toString() || upcomingPayments.length.toString() },
        { label: 'Credit Notes', icon: IoCard, path: '/app/client/credit-notes', color: 'text-yellow-600', bgColor: 'bg-yellow-100', count: creditNotesCount.toString() },
      ]
    },
    {
      category: 'Account',
      items: [
        { label: 'Profile', icon: IoPerson, path: '/app/client/profile', color: 'text-pink-600', bgColor: 'bg-pink-100', count: 'View' },
        { label: 'Notifications', icon: IoNotifications, path: '/app/client/notifications', color: 'text-red-600', bgColor: 'bg-red-100', count: recentActivity.length.toString() },
        { label: 'Settings', icon: IoSettings, path: '/app/client/settings', color: 'text-gray-600', bgColor: 'bg-gray-100', count: 'Config' },
      ]
    },
  ]

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Branded Welcome Banner */}
      <Card className="p-4 sm:p-6 bg-gradient-to-r from-primary-accent to-secondary-accent rounded-lg shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex-1 min-w-0">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-1 sm:mb-2 truncate">
              Welcome back, {user?.name || user?.email || 'Client'}
            </h1>
            <p className="text-white/90 text-xs sm:text-sm md:text-base">Here's a summary of your account</p>
          </div>
          <div className="hidden sm:flex w-14 h-14 md:w-20 md:h-20 bg-white/20 rounded-full items-center justify-center flex-shrink-0 ml-4">
            <span className="text-xl md:text-2xl font-bold text-white">
              {(user?.name || user?.email || 'C').charAt(0).toUpperCase()}
            </span>
          </div>
        </div>
      </Card>

      {loading && (
        <div className="text-center py-8">
          <p className="text-secondary-text">Loading dashboard data...</p>
        </div>
      )}

      {/* Top Metrics Bar - 4 Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <Card 
              key={index} 
              className="p-4 sm:p-5 md:p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => navigate(stat.path)}
            >
              <div className="flex items-start justify-between">
                <div className="min-w-0 flex-1">
                  <p className="text-xs sm:text-sm text-secondary-text mb-1 truncate">{stat.label}</p>
                  <p className="text-xl sm:text-2xl md:text-3xl font-bold text-primary-text mb-1">{stat.value}</p>
                  <p className="text-xs sm:text-sm text-secondary-text">{stat.subtitle}</p>
                </div>
                <div className={`${stat.color} ${stat.bgColor} p-3 rounded-lg flex-shrink-0 ml-2`}>
                  <Icon size={24} className="sm:w-6 sm:h-6" />
                </div>
              </div>
            </Card>
          )
        })}
      </div>

      {/* Projects & Invoice Overview Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Projects Overview */}
        <Card className="p-4 sm:p-5 bg-white rounded-lg shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <IoFolderOpen className="text-blue-600" size={20} />
            <h3 className="font-semibold text-primary-text">Projects Overview</h3>
          </div>
          <div className="flex items-center justify-between mb-4">
            <div className="text-center">
              <p className="text-2xl sm:text-3xl font-bold text-blue-600">{projectsOverview.open}</p>
              <p className="text-xs text-secondary-text">Open</p>
            </div>
            <div className="text-center">
              <p className="text-2xl sm:text-3xl font-bold text-green-600">{projectsOverview.completed}</p>
              <p className="text-xs text-secondary-text">Completed</p>
            </div>
            <div className="text-center">
              <p className="text-2xl sm:text-3xl font-bold text-orange-600">{projectsOverview.hold}</p>
              <p className="text-xs text-secondary-text">Hold</p>
            </div>
          </div>
          <div className="mb-4">
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
              <div
                className="h-3 rounded-full transition-all"
                style={{
                  width: `${projectsOverview.progress}%`,
                  background: 'linear-gradient(90deg, #3B82F6 0%, #22C55E 100%)'
                }}
              />
            </div>
            <p className="text-center text-sm text-secondary-text mt-1">Overall Progress {projectsOverview.progress}%</p>
          </div>
        </Card>

        {/* Invoice Overview */}
        <Card className="p-4 sm:p-5 bg-white rounded-lg shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <IoReceipt className="text-orange-600" size={20} />
            <h3 className="font-semibold text-primary-text">Invoice Overview</h3>
          </div>
          <div className="space-y-2 sm:space-y-3">
            {/* Overdue */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 min-w-[100px]">
                <span className="text-red-500 font-bold text-sm sm:text-base">{invoiceOverview.overdue}</span>
                <span className="text-xs sm:text-sm text-secondary-text">Overdue</span>
              </div>
              <div className="flex items-center gap-2 flex-1 justify-end">
                <div className="w-16 sm:w-24 h-2 bg-red-500 rounded-full"></div>
                <span className="text-xs sm:text-sm font-medium min-w-[60px] sm:min-w-[80px] text-right">{formatCurrency(invoiceOverview.overdueAmount)}</span>
              </div>
            </div>
            {/* Not paid */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 min-w-[100px]">
                <span className="text-orange-500 font-bold text-sm sm:text-base">{invoiceOverview.notPaid}</span>
                <span className="text-xs sm:text-sm text-secondary-text">Not paid</span>
              </div>
              <div className="flex items-center gap-2 flex-1 justify-end">
                <div className="w-12 sm:w-20 h-2 bg-orange-400 rounded-full"></div>
                <span className="text-xs sm:text-sm font-medium min-w-[60px] sm:min-w-[80px] text-right">{formatCurrency(invoiceOverview.notPaidAmount)}</span>
              </div>
            </div>
            {/* Partially paid */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 min-w-[100px]">
                <span className="text-yellow-500 font-bold text-sm sm:text-base">{invoiceOverview.partiallyPaid}</span>
                <span className="text-xs sm:text-sm text-secondary-text">Partially paid</span>
              </div>
              <div className="flex items-center gap-2 flex-1 justify-end">
                <div className="w-20 sm:w-28 h-2 bg-yellow-400 rounded-full"></div>
                <span className="text-xs sm:text-sm font-medium min-w-[60px] sm:min-w-[80px] text-right">{formatCurrency(invoiceOverview.partiallyPaidAmount)}</span>
              </div>
            </div>
            {/* Fully paid */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 min-w-[100px]">
                <span className="text-blue-600 font-bold text-sm sm:text-base">{invoiceOverview.fullyPaid}</span>
                <span className="text-xs sm:text-sm text-secondary-text">Fully paid</span>
              </div>
              <div className="flex items-center gap-2 flex-1 justify-end">
                <div className="w-24 sm:w-32 h-2 bg-blue-600 rounded-full"></div>
                <span className="text-xs sm:text-sm font-medium min-w-[60px] sm:min-w-[80px] text-right">{formatCurrency(invoiceOverview.fullyPaidAmount)}</span>
              </div>
            </div>
          </div>
          <div className="pt-4 mt-4 border-t border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-secondary-text">Total Invoiced</p>
                <p className="text-lg sm:text-xl font-bold text-primary-text">{formatCurrency(invoiceOverview.totalInvoiced)}</p>
              </div>
              <div className="text-right">
                <p className="text-xs sm:text-sm text-secondary-text">Total Due</p>
                <p className="text-lg sm:text-xl font-bold text-red-600">{formatCurrency(invoiceOverview.totalDue)}</p>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <Card className="p-4 sm:p-5 bg-white rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div className="min-w-0 flex-1">
              <p className="text-xs sm:text-sm text-secondary-text mb-1">Open Invoices</p>
              <p className="text-xl sm:text-2xl font-bold text-primary-text">{openInvoices.length}</p>
              <p className="text-xs text-secondary-text mt-1">${totalOpenInvoices.toLocaleString()}</p>
            </div>
            <div className="text-warning bg-warning/10 p-3 rounded-lg flex-shrink-0 ml-2">
              <IoDocumentText className="text-warning" size={24} />
            </div>
          </div>
        </Card>
        <Card className="p-4 sm:p-5 bg-white rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div className="min-w-0 flex-1">
              <p className="text-xs sm:text-sm text-secondary-text mb-1">Upcoming Payments</p>
              <p className="text-xl sm:text-2xl font-bold text-primary-text">{upcomingPayments.length}</p>
              <p className="text-xs text-secondary-text mt-1">${totalUpcomingPayments.toLocaleString()}</p>
            </div>
            <div className="text-primary-accent bg-primary-accent/10 p-3 rounded-lg flex-shrink-0 ml-2">
              <IoCash className="text-primary-accent" size={24} />
            </div>
          </div>
        </Card>
        <Card className="p-4 sm:p-5 bg-white rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div className="min-w-0 flex-1">
              <p className="text-xs sm:text-sm text-secondary-text mb-1">Recent Activity</p>
              <p className="text-xl sm:text-2xl font-bold text-primary-text">{recentActivity.length}</p>
              <p className="text-xs text-secondary-text mt-1">Last 30 days</p>
            </div>
            <div className="text-secondary-accent bg-secondary-accent/10 p-3 rounded-lg flex-shrink-0 ml-2">
              <IoNotifications className="text-secondary-accent" size={24} />
            </div>
          </div>
        </Card>
        <Card className="p-4 sm:p-5 bg-white rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div className="min-w-0 flex-1">
              <p className="text-xs sm:text-sm text-secondary-text mb-1">Announcements</p>
              <p className="text-xl sm:text-2xl font-bold text-primary-text">{announcements.length}</p>
              <p className="text-xs text-secondary-text mt-1">Unread</p>
            </div>
            <div className="text-blue-500 bg-blue-100 p-3 rounded-lg flex-shrink-0 ml-2">
              <IoAlertCircle className="text-blue-500" size={24} />
            </div>
          </div>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="flex flex-wrap gap-2">
        <Button 
          variant="primary" 
          onClick={() => navigate('/app/client/invoices')}
          className="flex items-center gap-2"
        >
          <IoCash size={18} />
          Pay Invoice
        </Button>
        <Button 
          variant="outline" 
          onClick={() => navigate('/app/client/invoices')}
          className="flex items-center gap-2"
        >
          <IoEye size={18} />
          View All Invoices
        </Button>
        <Button 
          variant="outline" 
          onClick={() => navigate('/app/client/contracts')}
          className="flex items-center gap-2"
        >
          View Contracts
        </Button>
      </div>

      {/* Quick Access Menu Items */}
      {quickAccessMenus.map((section, sectionIndex) => (
        <Card key={sectionIndex} className="p-4 sm:p-5 md:p-6 bg-white rounded-lg shadow-sm">
          <h2 className="text-lg sm:text-xl font-semibold text-primary-text mb-4">{section.category}</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4">
            {section.items.map((item, itemIndex) => {
              const Icon = item.icon
              return (
                <button
                  key={itemIndex}
                  onClick={() => navigate(item.path)}
                  className="group p-4 rounded-lg border border-gray-200 hover:border-primary-accent hover:shadow-md transition-all text-left bg-white hover:bg-primary-accent/5"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className={`${item.color} ${item.bgColor} p-2 rounded-lg`}>
                      <Icon size={20} />
                    </div>
                    {item.count && (
                      <Badge variant="default" className="text-xs">
                        {item.count}
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm font-medium text-primary-text group-hover:text-primary-accent transition-colors">
                    {item.label}
                  </p>
                  <div className="flex items-center gap-1 mt-2 text-xs text-secondary-text group-hover:text-primary-accent transition-colors">
                    <span>Open</span>
                    <IoArrowForward size={12} />
                  </div>
                </button>
              )
            })}
          </div>
        </Card>
      ))}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Open Invoices */}
        <Card className="p-4 sm:p-5 bg-white rounded-lg shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg sm:text-xl font-semibold text-primary-text flex items-center gap-2">
              <IoDocumentText className="text-primary-accent" size={24} />
              Open Invoices
            </h2>
            <Button 
              variant="ghost" 
              onClick={() => navigate('/app/client/invoices')}
              className="text-sm flex items-center gap-1"
            >
              View All
              <IoArrowForward size={16} />
            </Button>
          </div>
          <div className="space-y-3">
            {openInvoices.length === 0 ? (
              <div className="text-center py-8 text-secondary-text">
                <p>No open invoices</p>
              </div>
            ) : (
              openInvoices.map((invoice) => (
                <div 
                  key={invoice.id} 
                  className="p-4 rounded-lg border border-gray-200 hover:border-primary-accent/50 transition-colors"
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex-1">
                      <h3 className="font-semibold text-sm sm:text-base text-primary-text">{invoice.invoiceNo}</h3>
                      <p className="text-lg font-bold text-primary-text mt-1">${invoice.amount.toLocaleString()}</p>
                    </div>
                    <Badge variant={invoice.status === 'Overdue' ? 'danger' : 'warning'}>
                      {invoice.status}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-2 text-xs text-secondary-text">
                      <IoTime size={14} />
                      <span>Due: {new Date(invoice.dueDate).toLocaleDateString()}</span>
                      {invoice.daysOverdue > 0 && (
                        <span className="text-danger">({invoice.daysOverdue} days overdue)</span>
                      )}
                    </div>
                    <Button 
                      variant="primary" 
                      size="sm"
                      onClick={() => navigate(`/app/client/invoices?pay=${invoice.id}`)}
                    >
                      Pay Now
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </Card>

        {/* Upcoming Payments */}
        <Card className="p-4 sm:p-5 bg-white rounded-lg shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg sm:text-xl font-semibold text-primary-text flex items-center gap-2">
              <IoCash className="text-primary-accent" size={24} />
              Upcoming Payments
            </h2>
          </div>
          <div className="space-y-3">
            {upcomingPayments.length === 0 ? (
              <div className="text-center py-8 text-secondary-text">
                <p>No upcoming payments</p>
              </div>
            ) : (
              upcomingPayments.map((payment) => (
              <div 
                key={payment.id} 
                className="p-4 rounded-lg border border-gray-200 bg-gray-50"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <h3 className="font-semibold text-sm sm:text-base text-primary-text">{payment.description}</h3>
                    <p className="text-lg font-bold text-primary-text mt-1">${payment.amount.toLocaleString()}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-secondary-text">Due</p>
                    <p className="text-sm font-medium text-primary-text">
                      {new Date(payment.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </p>
                  </div>
                </div>
              </div>
              ))
            )}
          </div>
        </Card>
      </div>

      {/* Announcements */}
      <Card className="p-4 sm:p-5 bg-white rounded-lg shadow-sm">
        <h2 className="text-lg sm:text-xl font-semibold text-primary-text mb-4 flex items-center gap-2">
          <IoNotifications className="text-primary-accent" size={24} />
          Announcements
        </h2>
        <div className="space-y-3">
          {announcements.length === 0 ? (
            <div className="text-center py-8 text-secondary-text">
              <p>No announcements</p>
            </div>
          ) : (
            announcements.map((announcement) => (
            <div 
              key={announcement.id} 
              className="p-4 rounded-lg border border-gray-200 bg-blue-50/50 hover:bg-blue-50 transition-colors cursor-pointer"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1">
                  <h3 className="font-semibold text-sm sm:text-base text-primary-text mb-1">{announcement.title}</h3>
                  <p className="text-sm text-secondary-text">{announcement.content}</p>
                </div>
                <span className="text-xs text-secondary-text whitespace-nowrap">
                  {new Date(announcement.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </span>
              </div>
            </div>
            ))
          )}
        </div>
      </Card>

      {/* Recent Activity */}
      <Card className="p-4 sm:p-5 bg-white rounded-lg shadow-sm">
        <h2 className="text-lg sm:text-xl font-semibold text-primary-text mb-4">Recent Activity</h2>
        <div className="space-y-3">
          {recentActivity.length === 0 ? (
            <div className="text-center py-8 text-secondary-text">
              <p>No recent activity</p>
            </div>
          ) : (
            recentActivity.map((activity) => (
            <div 
              key={activity.id} 
              className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="w-2 h-2 rounded-full bg-primary-accent mt-2 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm text-primary-text">{activity.message}</p>
                <p className="text-xs text-secondary-text mt-1">
                  {new Date(activity.date).toLocaleDateString('en-US', { 
                    month: 'long', 
                    day: 'numeric', 
                    year: 'numeric' 
                  })}
                </p>
              </div>
            </div>
            ))
          )}
        </div>
      </Card>

      {/* Recent Projects Section */}
      <Card className="p-4 sm:p-5 bg-white rounded-lg shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg sm:text-xl font-semibold text-primary-text flex items-center gap-2">
            <IoFolderOpen className="text-primary-accent" size={24} />
            Recent Projects
          </h2>
          <Button 
            variant="ghost" 
            onClick={() => navigate('/app/client/projects')}
            className="text-sm flex items-center gap-1"
          >
            View All
            <IoArrowForward size={16} />
          </Button>
        </div>
        <div className="space-y-3">
          {recentProjects.length === 0 ? (
            <div className="text-center py-8 text-secondary-text">
              <p>No projects found</p>
            </div>
          ) : (
            recentProjects.map((project) => (
              <div 
                key={project.id} 
                className="p-4 rounded-lg border border-gray-200 hover:border-primary-accent/50 transition-colors cursor-pointer"
                onClick={() => navigate(`/app/client/projects/${project.id}`)}
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex-1">
                    <h3 className="font-semibold text-sm sm:text-base text-primary-text">{project.project_name || project.name || 'Untitled Project'}</h3>
                    <p className="text-xs text-secondary-text mt-1">
                      {project.description ? (project.description.length > 100 ? project.description.substring(0, 100) + '...' : project.description) : 'No description'}
                    </p>
                  </div>
                  <Badge variant={
                    project.status === 'completed' || project.status === 'Completed' ? 'success' :
                    project.status === 'in_progress' || project.status === 'In Progress' ? 'info' :
                    'warning'
                  }>
                    {project.status || 'Active'}
                  </Badge>
                </div>
                <div className="flex items-center gap-4 mt-3 text-xs text-secondary-text">
                  {project.deadline && (
                    <div className="flex items-center gap-1">
                      <IoTime size={14} />
                      <span>Due: {new Date(project.deadline).toLocaleDateString()}</span>
                    </div>
                  )}
                  {project.progress !== undefined && (
                    <div className="flex items-center gap-1">
                      <span>Progress: {project.progress || 0}%</span>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </Card>

      {/* Tasks Overview Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <Card className="p-4 sm:p-5 bg-white rounded-lg shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg sm:text-xl font-semibold text-primary-text flex items-center gap-2">
              <IoCheckmarkCircle className="text-primary-accent" size={24} />
              Tasks Overview
            </h2>
            <Button 
              variant="ghost" 
              onClick={() => navigate('/app/client/tasks')}
              className="text-sm flex items-center gap-1"
            >
              View All
              <IoArrowForward size={16} />
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <p className="text-2xl font-bold text-blue-600">{tasksOverview.total}</p>
              <p className="text-xs text-secondary-text mt-1">Total Tasks</p>
            </div>
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <p className="text-2xl font-bold text-green-600">{tasksOverview.completed}</p>
              <p className="text-xs text-secondary-text mt-1">Completed</p>
            </div>
            <div className="text-center p-3 bg-orange-50 rounded-lg">
              <p className="text-2xl font-bold text-orange-600">{tasksOverview.inProgress}</p>
              <p className="text-xs text-secondary-text mt-1">In Progress</p>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <p className="text-2xl font-bold text-gray-600">{tasksOverview.pending}</p>
              <p className="text-xs text-secondary-text mt-1">Pending</p>
            </div>
          </div>
          {myTasks.length > 0 && (
            <div className="space-y-2 mt-4">
              <p className="text-sm font-medium text-primary-text mb-2">My Recent Tasks</p>
              {myTasks.slice(0, 3).map((task) => (
                <div 
                  key={task.id}
                  className="p-3 rounded-lg border border-gray-200 hover:border-primary-accent/50 transition-colors cursor-pointer"
                  onClick={() => navigate(`/app/client/tasks`)}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-primary-text">{task.title || 'Untitled Task'}</h4>
                      <p className="text-xs text-secondary-text mt-1">
                        {task.description ? (task.description.length > 50 ? task.description.substring(0, 50) + '...' : task.description) : 'No description'}
                      </p>
                    </div>
                    <Badge variant={
                      task.status === 'Done' || task.status === 'done' ? 'success' :
                      task.status === 'Doing' || task.status === 'doing' ? 'info' :
                      'warning'
                    }>
                      {task.status || 'Pending'}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>

        {/* Recent Messages Section */}
        <Card className="p-4 sm:p-5 bg-white rounded-lg shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg sm:text-xl font-semibold text-primary-text flex items-center gap-2">
              <IoNotifications className="text-primary-accent" size={24} />
              Recent Messages
            </h2>
            <Button 
              variant="ghost" 
              onClick={() => navigate('/app/client/messages')}
              className="text-sm flex items-center gap-1"
            >
              View All
              <IoArrowForward size={16} />
            </Button>
          </div>
          <div className="space-y-3">
            {recentMessages.length === 0 ? (
              <div className="text-center py-8 text-secondary-text">
                <p>No messages</p>
              </div>
            ) : (
              recentMessages.map((message) => (
                <div 
                  key={message.id} 
                  className="p-4 rounded-lg border border-gray-200 hover:border-primary-accent/50 transition-colors cursor-pointer"
                  onClick={() => navigate('/app/client/messages')}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="text-sm font-medium text-primary-text">
                          {message.sender_name || message.from_name || 'Unknown'}
                        </h4>
                        {!message.is_read && (
                          <span className="w-2 h-2 rounded-full bg-primary-accent"></span>
                        )}
                      </div>
                      <p className="text-sm text-secondary-text line-clamp-2">
                        {message.message || message.content || message.subject || 'No message content'}
                      </p>
                    </div>
                    <span className="text-xs text-secondary-text whitespace-nowrap">
                      {message.created_at ? new Date(message.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : ''}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </Card>
      </div>
    </div>
  )
}

export default ClientDashboard
