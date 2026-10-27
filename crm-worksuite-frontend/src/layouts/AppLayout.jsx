import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Sidebar from '../components/layout/Sidebar'
import TopBar from '../components/layout/TopBar'
import PwaInstallPrompt from '../components/ui/PwaInstallPrompt'
import { useAuth } from '../context/AuthContext'
import { usePermissions } from '../context/PermissionsContext'

// Map path (prefix) to moduleKey for EMPLOYEE and CLIENT – so role permissions apply to routes too
const EMPLOYEE_PATH_TO_MODULE = {
  '/app/employee/dashboard': 'dashboard',
  '/app/employee/my-tasks': 'myTasks',
  '/app/employee/my-projects': 'myProjects',
  '/app/employee/time-tracking': 'timeTracking',
  '/app/employee/calendar': 'events',
  '/app/employee/my-profile': 'myProfile',
  '/app/employee/my-documents': 'documents',
  '/app/employee/attendance': 'attendance',
  '/app/employee/leave-requests': 'leaveRequests',
  '/app/employee/messages': 'messages',
  '/app/employee/tickets': 'tickets',
  '/app/employee/settings': 'myProfile',
}
const CLIENT_PATH_TO_MODULE = {
  '/app/client/dashboard': 'dashboard',
  '/app/client/projects': 'projects',
  '/app/client/proposals': 'proposals',
  '/app/client/store': 'store',
  '/app/client/files': 'files',
  '/app/client/billing': 'billing',
  '/app/client/invoices': 'invoices',
  '/app/client/payments': 'payments',
  '/app/client/subscriptions': 'subscriptions',
  '/app/client/orders': 'orders',
  '/app/client/notes': 'notes',
  '/app/client/contracts': 'contracts',
  '/app/client/tickets': 'tickets',
  '/app/client/messages': 'messages',
}

const getModuleKeyForPath = (pathname, role) => {
  const map = role === 'EMPLOYEE' ? EMPLOYEE_PATH_TO_MODULE : role === 'CLIENT' ? CLIENT_PATH_TO_MODULE : null
  if (!map) return null
  // Exact match first
  if (map[pathname]) return map[pathname]
  // Prefix match (e.g. /app/employee/my-tasks/123 -> myTasks)
  const sorted = Object.keys(map).sort((a, b) => b.length - a.length)
  for (const path of sorted) {
    if (pathname === path || pathname.startsWith(path + '/')) return map[path]
  }
  return null
}

const AppLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const { user } = useAuth()
  const { canView, loading: permissionsLoading } = usePermissions()

  // Detect any detail page (project, lead, client, task, employee)
  const isDetailPage = /\/app\/admin\/(projects|leads|clients|tasks|employees)\/\d+/.test(location.pathname)

  // Route guard: EMPLOYEE/CLIENT – if they don't have can_view for this path's module, redirect to dashboard
  useEffect(() => {
    if (permissionsLoading || !user || (user.role !== 'EMPLOYEE' && user.role !== 'CLIENT')) return
    const moduleKey = getModuleKeyForPath(location.pathname, user.role)
    if (!moduleKey) return
    if (canView(moduleKey) === false) {
      const dashboardPath = user.role === 'EMPLOYEE' ? '/app/employee/dashboard' : '/app/client/dashboard'
      navigate(dashboardPath, { replace: true })
    }
  }, [location.pathname, user, canView, permissionsLoading, navigate])

  // Removed auto-close logic to keep sidebar persistent

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-main-bg">
      {/* PWA Install Prompt - shows when available */}
      <PwaInstallPrompt />

      {/* TopBar – show menu button always */}
      <TopBar
        onMenuClick={() => setSidebarOpen(true)}
        isSidebarCollapsed={sidebarCollapsed}
        onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
        hideMenuButton={false}
      />
      <div className="flex relative w-full">
        {/* Main navigation sidebar */}
        <Sidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          isCollapsed={sidebarCollapsed}
          onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        />
        <div
          className={`flex-1 flex flex-col transition-all duration-300 ease-smooth min-h-screen w-full relative z-10 pt-14 lg:pt-14 ${sidebarCollapsed
            ? 'ml-0 lg:ml-16'
            : 'ml-0 lg:ml-56'
            }`}
        >
          <main className={`flex-1 w-full max-w-full overflow-x-hidden relative z-10 ${isDetailPage ? 'p-0' : 'p-3 lg:p-4'
            }`}
          >
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  )
}

export default AppLayout
