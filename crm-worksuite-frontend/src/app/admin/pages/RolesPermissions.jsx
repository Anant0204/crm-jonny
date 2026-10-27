/**
 * Roles & Permissions Management Page
 * Full-featured roles and permissions system with dynamic modules
 * Route: /app/admin/settings/roles-permissions
 */

import { useState, useEffect } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import AddButton from '../../../components/ui/AddButton'
import DataTable from '../../../components/ui/DataTable'
import RightSideModal from '../../../components/ui/RightSideModal'
import Modal from '../../../components/ui/Modal'
import Input from '../../../components/ui/Input'
import Button from '../../../components/ui/Button'
import Card from '../../../components/ui/Card'
import Badge from '../../../components/ui/Badge'
import { 
  IoCreate, 
  IoTrash, 
  IoEye, 
  IoSettingsOutline, 
  IoChevronDown, 
  IoChevronUp, 
  IoCheckmarkCircle, 
  IoArrowBack,
  IoPeople,
  IoLockClosed,
  IoAdd,
  IoClose,
  IoShieldCheckmark,
  IoPerson,
  IoCheckmark,
  IoCloseCircle
} from 'react-icons/io5'
import rolesAPI from '../../../api/roles'
import { usersAPI } from '../../../api'

const RolesPermissions = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const companyId = parseInt(localStorage.getItem('companyId') || 1, 10)
  
  const [loading, setLoading] = useState(false)
  const [roles, setRoles] = useState([])
  const [modules, setModules] = useState([])
  const [selectedRole, setSelectedRole] = useState(null)
  const [selectedRoleUsers, setSelectedRoleUsers] = useState([])
  const [allUsers, setAllUsers] = useState([])
  
  // Modals
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isPermissionModalOpen, setIsPermissionModalOpen] = useState(false)
  const [isUsersModalOpen, setIsUsersModalOpen] = useState(false)
  const [isAssignUserModalOpen, setIsAssignUserModalOpen] = useState(false)
  
  // Form data
  const [roleFormData, setRoleFormData] = useState({
    role_name: '',
    description: ''
  })
  
  // Permissions data: { [moduleKey]: { can_view, can_add, can_edit, can_delete } }
  const [permissionsData, setPermissionsData] = useState({})
  
  // Filter states
  const [roleTypeFilter, setRoleTypeFilter] = useState('ALL') // ALL, ADMIN, EMPLOYEE, CLIENT
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    fetchRoles()
    fetchModules()
  }, [])

  useEffect(() => {
    if (selectedRole && isPermissionModalOpen) {
      fetchRolePermissions()
    }
  }, [selectedRole, isPermissionModalOpen])

  /**
   * Fetch all roles
   */
  const fetchRoles = async () => {
    try {
      setLoading(true)
      const response = await rolesAPI.getAll({ company_id: companyId })
      if (response.data.success) {
        setRoles(response.data.data || [])
      } else {
        toast.error(response.data.error || 'Failed to load roles')
      }
    } catch (error) {
      console.error('Error fetching roles:', error)
      toast.error('Failed to load roles')
    } finally {
      setLoading(false)
    }
  }

  /**
   * Fetch all modules (dynamic)
   */
  const fetchModules = async () => {
    try {
      const response = await rolesAPI.getModules({ company_id: companyId })
      if (response.data.success) {
        setModules(response.data.data || [])
      }
    } catch (error) {
      console.error('Error fetching modules:', error)
      // Fallback to default modules if API fails
      setModules([
        { module_key: 'dashboard', module_name: 'Dashboard', module_type: 'ALL' },
        { module_key: 'projects', module_name: 'Projects', module_type: 'ALL' },
        { module_key: 'tasks', module_name: 'Tasks', module_type: 'ALL' },
      ])
    }
  }

  /**
   * Fetch role permissions
   */
  const fetchRolePermissions = async () => {
    if (!selectedRole) return
    
    try {
      setLoading(true)
      const response = await rolesAPI.getPermissions(selectedRole.id, { company_id: companyId })
      
      if (response.data.success) {
        const dbPerms = response.data.data || []
        const permsMap = {}
        
        // Initialize all modules with false permissions
        modules.forEach(module => {
          permsMap[module.module_key] = {
            can_view: false,
            can_add: false,
            can_edit: false,
            can_delete: false
          }
        })
        
        // Update with database permissions
        dbPerms.forEach(p => {
          if (permsMap[p.module]) {
            permsMap[p.module] = {
              can_view: !!p.can_view,
              can_add: !!p.can_add,
              can_edit: !!p.can_edit,
              can_delete: !!p.can_delete
            }
          }
        })
        
        setPermissionsData(permsMap)
      }
    } catch (error) {
      console.error('Error fetching permissions:', error)
      toast.error('Failed to load permissions')
    } finally {
      setLoading(false)
    }
  }

  /**
   * Fetch users with this role
   */
  const fetchRoleUsers = async (roleId) => {
    try {
      const response = await rolesAPI.getUsers(roleId, { company_id: companyId })
      if (response.data.success) {
        setSelectedRoleUsers(response.data.data || [])
      }
    } catch (error) {
      console.error('Error fetching role users:', error)
      toast.error('Failed to load users')
    }
  }

  /**
   * Fetch all users for assignment
   */
  const fetchAllUsers = async () => {
    try {
      const response = await usersAPI.getAll({ company_id: companyId })
      if (response.data.success) {
        setAllUsers(response.data.data || [])
      }
    } catch (error) {
      console.error('Error fetching users:', error)
    }
  }

  /**
   * Handle add role
   */
  const handleAddRole = async () => {
    if (!roleFormData.role_name || !roleFormData.role_name.trim()) {
      toast.error('Role name is required')
      return
    }

    try {
      const response = await rolesAPI.create({
        role_name: roleFormData.role_name.trim(),
        description: roleFormData.description || ''
      }, { company_id: companyId })

      if (response.data.success) {
        toast.success('Role created successfully!')
        setIsAddModalOpen(false)
        setRoleFormData({ role_name: '', description: '' })
        await fetchRoles()
      } else {
        toast.error(response.data.error || 'Failed to create role')
      }
    } catch (error) {
      console.error('Error creating role:', error)
      toast.error(error.response?.data?.error || 'Failed to create role')
    }
  }

  /**
   * Handle delete role
   */
  const handleDeleteRole = async (role) => {
    if (role.is_system_role) {
      toast.error('System roles cannot be deleted')
      return
    }

    if (!window.confirm(`Are you sure you want to delete the role "${role.role_name}"? This action cannot be undone.`)) {
      return
    }

    try {
      const response = await rolesAPI.delete(role.id, { company_id: companyId })
      if (response.data.success) {
        toast.success('Role deleted successfully!')
        await fetchRoles()
      } else {
        toast.error(response.data.error || 'Failed to delete role')
      }
    } catch (error) {
      console.error('Error deleting role:', error)
      toast.error(error.response?.data?.error || 'Failed to delete role')
    }
  }

  /**
   * Open permissions modal
   */
  const openPermissionModal = async (role) => {
    setSelectedRole(role)
    setIsPermissionModalOpen(true)
  }

  /**
   * Open users modal
   */
  const openUsersModal = async (role) => {
    setSelectedRole(role)
    setIsUsersModalOpen(true)
    await fetchRoleUsers(role.id)
  }

  /**
   * Handle permission change
   */
  const handlePermissionChange = (moduleKey, permissionType, value) => {
    setPermissionsData(prev => ({
      ...prev,
      [moduleKey]: {
        ...prev[moduleKey] || { can_view: false, can_add: false, can_edit: false, can_delete: false },
        [permissionType]: value
      }
    }))
  }

  /**
   * Toggle full access for a module
   */
  const handleFullAccessToggle = (moduleKey, value) => {
    setPermissionsData(prev => ({
      ...prev,
      [moduleKey]: {
        can_view: value,
        can_add: value,
        can_edit: value,
        can_delete: value
      }
    }))
  }

  /**
   * Save permissions
   */
  const savePermissions = async () => {
    if (!selectedRole) return

    try {
      setLoading(true)
      
      // Convert permissions data to array format
      const permissionsArray = Object.entries(permissionsData).map(([module, perms]) => ({
        module,
        can_view: perms.can_view || false,
        can_add: perms.can_add || false,
        can_edit: perms.can_edit || false,
        can_delete: perms.can_delete || false
      }))

      const response = await rolesAPI.updatePermissions(
        selectedRole.id, 
        permissionsArray,
        { company_id: companyId }
      )

      if (response.data.success) {
        toast.success('Permissions updated successfully! Users with this role may need to refresh their browser to see menu changes.')
        setIsPermissionModalOpen(false)
        setSelectedRole(null)
        setPermissionsData({})
      } else {
        toast.error(response.data.error || 'Failed to update permissions')
      }
    } catch (error) {
      console.error('Error saving permissions:', error)
      toast.error(error.response?.data?.error || 'Failed to update permissions')
    } finally {
      setLoading(false)
    }
  }

  /**
   * Assign role to user
   */
  const handleAssignRole = async (userId) => {
    if (!selectedRole) return

    try {
      const response = await rolesAPI.assignToUser(
        selectedRole.id,
        { user_id: userId },
        { company_id: companyId }
      )

      if (response.data.success) {
        toast.success('Role assigned successfully!')
        setIsAssignUserModalOpen(false)
        await fetchRoleUsers(selectedRole.id)
        await fetchRoles() // Refresh to update user count
      } else {
        toast.error(response.data.error || 'Failed to assign role')
      }
    } catch (error) {
      console.error('Error assigning role:', error)
      toast.error(error.response?.data?.error || 'Failed to assign role')
    }
  }

  /**
   * Remove role from user
   */
  const handleRemoveRole = async (userId) => {
    if (!selectedRole) return

    if (!window.confirm('Are you sure you want to remove this role from the user?')) {
      return
    }

    try {
      const response = await rolesAPI.removeFromUser(
        selectedRole.id,
        userId,
        { company_id: companyId }
      )

      if (response.data.success) {
        toast.success('Role removed successfully!')
        await fetchRoleUsers(selectedRole.id)
        await fetchRoles() // Refresh to update user count
      } else {
        toast.error(response.data.error || 'Failed to remove role')
      }
    } catch (error) {
      console.error('Error removing role:', error)
      toast.error(error.response?.data?.error || 'Failed to remove role')
    }
  }

  /**
   * Filter roles
   */
  const filteredRoles = roles.filter(role => {
    // Type filter
    if (roleTypeFilter !== 'ALL') {
      const roleNameUpper = role.role_name?.toUpperCase() || ''
      if (roleTypeFilter === 'ADMIN' && !roleNameUpper.includes('ADMIN')) return false
      if (roleTypeFilter === 'EMPLOYEE' && !roleNameUpper.includes('EMPLOYEE')) return false
      if (roleTypeFilter === 'CLIENT' && !roleNameUpper.includes('CLIENT')) return false
    }
    
    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      const matchesName = role.role_name?.toLowerCase().includes(query)
      const matchesDesc = role.description?.toLowerCase().includes(query)
      if (!matchesName && !matchesDesc) return false
    }
    
    return true
  })

  /**
   * Get filtered modules by type
   */
  const getModulesByType = (type) => {
    if (type === 'ALL') return modules
    return modules.filter(m => m.module_type === type || m.module_type === 'ALL')
  }

  /**
   * Get module icon (placeholder - you can enhance this)
   */
  const getModuleIcon = (moduleKey) => {
    // Return a simple icon component or use a mapping
    return IoLockClosed
  }

  const columns = [
    {
      key: 'role_name',
      label: 'Role Name',
      render: (val, row) => (
        <div className="flex items-center gap-2">
          <span className="font-semibold text-primary-text">{val}</span>
          {row.is_system_role && (
            <Badge className="bg-blue-100 text-blue-800 text-xs">System</Badge>
          )}
        </div>
      )
    },
    {
      key: 'description',
      label: 'Description',
      render: (val) => <span className="text-secondary-text">{val || '-'}</span>
    },
    {
      key: 'user_count',
      label: 'Users',
      render: (val) => (
        <span className="text-secondary-text">{val || 0} user(s)</span>
      )
    },
  ]

  const actions = (row) => (
    <div className="flex items-center justify-end gap-2">
      <button
        onClick={() => openUsersModal(row)}
        className="p-2 text-blue-600 hover:bg-blue-50 rounded transition-colors"
        title="View Users"
      >
        <IoPeople size={18} />
      </button>
      <button
        onClick={() => openPermissionModal(row)}
        className="p-2 text-primary-accent hover:bg-primary-accent/10 rounded transition-colors"
        title="Manage Permissions"
      >
        <IoSettingsOutline size={18} />
      </button>
      {!row.is_system_role && (
        <button
          onClick={() => handleDeleteRole(row)}
          className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors"
          title="Delete Role"
        >
          <IoTrash size={18} />
        </button>
      )}
    </div>
  )

  return (
    <div className="space-y-6 p-4 sm:p-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-primary-text flex items-center gap-2">
            <IoShieldCheckmark className="text-primary-accent" size={28} />
            Roles & Permissions
          </h1>
          <p className="text-secondary-text mt-1">
            Manage user roles and granular access controls for all modules
          </p>
        </div>
        <AddButton onClick={() => setIsAddModalOpen(true)} label="Add New Role" />
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search roles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-accent focus:border-primary-accent outline-none"
          />
        </div>
        <select
          value={roleTypeFilter}
          onChange={(e) => setRoleTypeFilter(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-accent focus:border-primary-accent outline-none"
        >
          <option value="ALL">All Roles</option>
          <option value="ADMIN">Admin Roles</option>
          <option value="EMPLOYEE">Employee Roles</option>
          <option value="CLIENT">Client Roles</option>
        </select>
      </div>

      {/* Roles Table */}
      <Card className="p-0 overflow-hidden">
        <DataTable
          columns={columns}
          data={filteredRoles}
          searchPlaceholder="Search roles..."
          actions={actions}
          loading={loading}
          emptyMessage="No roles found. Create your first role to get started."
        />
      </Card>

      {/* Add Role Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => {
          setIsAddModalOpen(false)
          setRoleFormData({ role_name: '', description: '' })
        }}
        title="Create New Role"
      >
        <div className="space-y-4">
          <Input
            label="Role Name"
            placeholder="e.g. Sales Manager, Project Lead"
            value={roleFormData.role_name}
            onChange={(e) => setRoleFormData({ ...roleFormData, role_name: e.target.value })}
            required
          />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-accent focus:border-primary-accent outline-none resize-y"
              rows={3}
              value={roleFormData.description}
              onChange={(e) => setRoleFormData({ ...roleFormData, description: e.target.value })}
              placeholder="Describe the role and its responsibilities..."
            />
          </div>
          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button
              variant="outline"
              onClick={() => {
                setIsAddModalOpen(false)
                setRoleFormData({ role_name: '', description: '' })
              }}
            >
              Cancel
            </Button>
            <Button onClick={handleAddRole}>
              Create Role
            </Button>
          </div>
        </div>
      </Modal>

      {/* Permissions Modal */}
      <RightSideModal
        isOpen={isPermissionModalOpen}
        onClose={() => {
          setIsPermissionModalOpen(false)
          setSelectedRole(null)
          setPermissionsData({})
        }}
        title={`Permissions: ${selectedRole?.role_name || ''}`}
        width="w-full max-w-4xl"
      >
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-accent"></div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-800">
                <strong>Configure permissions:</strong> Select which actions users with this role can perform for each module.
                Use "Full Access" to enable all permissions at once, or expand to set individual permissions.
              </p>
            </div>

            {/* Modules List */}
            <div className="space-y-3 max-h-[600px] overflow-y-auto">
              {modules.map((module) => {
                const permissions = permissionsData[module.module_key] || {
                  can_view: false,
                  can_add: false,
                  can_edit: false,
                  can_delete: false
                }
                const hasFullAccess = permissions.can_view && permissions.can_add && 
                                     permissions.can_edit && permissions.can_delete
                const hasAnyAccess = permissions.can_view || permissions.can_add || 
                                   permissions.can_edit || permissions.can_delete

                return (
                  <div
                    key={module.module_key}
                    className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3 flex-1">
                        <div className="w-10 h-10 rounded-lg bg-primary-accent/10 flex items-center justify-center">
                          <IoLockClosed className="text-primary-accent" size={20} />
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold text-primary-text">{module.module_name}</p>
                          <p className="text-xs text-secondary-text">{module.description || module.module_key}</p>
                          <Badge className="mt-1 text-xs">
                            {module.module_type}
                          </Badge>
                        </div>
                      </div>
                    </div>

                    {/* Permissions Grid */}
                    <div className="ml-13 mt-3 pt-3 border-t border-gray-200">
                      <div className="grid grid-cols-5 gap-3">
                        {/* Full Access */}
                        <label className={`flex flex-col items-center gap-2 p-3 rounded-lg border cursor-pointer transition-colors ${
                          hasFullAccess 
                            ? 'bg-blue-50 border-blue-500' 
                            : 'bg-white border-gray-300 hover:bg-gray-50'
                        }`}>
                          <input
                            type="checkbox"
                            checked={hasFullAccess}
                            onChange={(e) => handleFullAccessToggle(module.module_key, e.target.checked)}
                            className="w-5 h-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                          />
                          <span className="text-xs font-medium text-center">Full Access</span>
                        </label>

                        {/* View */}
                        <label className={`flex flex-col items-center gap-2 p-3 rounded-lg border cursor-pointer transition-colors ${
                          permissions.can_view 
                            ? 'bg-blue-50 border-blue-500' 
                            : 'bg-white border-gray-300 hover:bg-gray-50'
                        }`}>
                          <input
                            type="checkbox"
                            checked={permissions.can_view}
                            onChange={(e) => handlePermissionChange(module.module_key, 'can_view', e.target.checked)}
                            className="w-5 h-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                          />
                          <span className="text-xs font-medium text-center">View</span>
                        </label>

                        {/* Add */}
                        <label className={`flex flex-col items-center gap-2 p-3 rounded-lg border cursor-pointer transition-colors ${
                          permissions.can_add 
                            ? 'bg-green-50 border-green-500' 
                            : 'bg-white border-gray-300 hover:bg-gray-50'
                        }`}>
                          <input
                            type="checkbox"
                            checked={permissions.can_add}
                            onChange={(e) => handlePermissionChange(module.module_key, 'can_add', e.target.checked)}
                            className="w-5 h-5 text-green-600 rounded border-gray-300 focus:ring-green-500"
                          />
                          <span className="text-xs font-medium text-center">Add</span>
                        </label>

                        {/* Edit */}
                        <label className={`flex flex-col items-center gap-2 p-3 rounded-lg border cursor-pointer transition-colors ${
                          permissions.can_edit 
                            ? 'bg-yellow-50 border-yellow-500' 
                            : 'bg-white border-gray-300 hover:bg-gray-50'
                        }`}>
                          <input
                            type="checkbox"
                            checked={permissions.can_edit}
                            onChange={(e) => handlePermissionChange(module.module_key, 'can_edit', e.target.checked)}
                            className="w-5 h-5 text-yellow-600 rounded border-gray-300 focus:ring-yellow-500"
                          />
                          <span className="text-xs font-medium text-center">Edit</span>
                        </label>

                        {/* Delete */}
                        <label className={`flex flex-col items-center gap-2 p-3 rounded-lg border cursor-pointer transition-colors ${
                          permissions.can_delete 
                            ? 'bg-red-50 border-red-500' 
                            : 'bg-white border-gray-300 hover:bg-gray-50'
                        }`}>
                          <input
                            type="checkbox"
                            checked={permissions.can_delete}
                            onChange={(e) => handlePermissionChange(module.module_key, 'can_delete', e.target.checked)}
                            className="w-5 h-5 text-red-600 rounded border-gray-300 focus:ring-red-500"
                          />
                          <span className="text-xs font-medium text-center">Delete</span>
                        </label>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t">
              <Button
                variant="outline"
                onClick={() => {
                  setIsPermissionModalOpen(false)
                  setSelectedRole(null)
                  setPermissionsData({})
                }}
              >
                Cancel
              </Button>
              <Button onClick={savePermissions} disabled={loading}>
                {loading ? 'Saving...' : 'Save Permissions'}
              </Button>
            </div>
          </div>
        )}
      </RightSideModal>

      {/* Users Modal */}
      <RightSideModal
        isOpen={isUsersModalOpen}
        onClose={() => {
          setIsUsersModalOpen(false)
          setSelectedRole(null)
          setSelectedRoleUsers([])
        }}
        title={`Users with Role: ${selectedRole?.role_name || ''}`}
        width="w-full max-w-2xl"
      >
        <div className="space-y-4">
          <div className="flex justify-end">
            <Button
              onClick={async () => {
                await fetchAllUsers()
                setIsAssignUserModalOpen(true)
              }}
              className="flex items-center gap-2"
            >
              <IoAdd size={18} />
              Assign User
            </Button>
          </div>

          {selectedRoleUsers.length === 0 ? (
            <div className="text-center py-12 text-secondary-text">
              <IoPeople size={48} className="mx-auto mb-3 text-gray-300" />
              <p>No users assigned to this role</p>
            </div>
          ) : (
            <div className="space-y-2">
              {selectedRoleUsers.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary-accent/20 flex items-center justify-center">
                      <IoPerson className="text-primary-accent" size={20} />
                    </div>
                    <div>
                      <p className="font-medium text-primary-text">{user.name}</p>
                      <p className="text-sm text-secondary-text">{user.email}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleRemoveRole(user.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors"
                    title="Remove Role"
                  >
                    <IoClose size={18} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </RightSideModal>

      {/* Assign User Modal */}
      <Modal
        isOpen={isAssignUserModalOpen}
        onClose={() => {
          setIsAssignUserModalOpen(false)
        }}
        title="Assign User to Role"
      >
        <div className="space-y-4">
          <p className="text-sm text-secondary-text">
            Select a user to assign the role "{selectedRole?.role_name}"
          </p>
          
          <div className="max-h-[400px] overflow-y-auto space-y-2">
            {allUsers
              .filter(user => !selectedRoleUsers.find(ru => ru.id === user.id))
              .map((user) => (
                <div
                  key={user.id}
                  onClick={() => handleAssignRole(user.id)}
                  className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary-accent/20 flex items-center justify-center">
                      <IoPerson className="text-primary-accent" size={20} />
                    </div>
                    <div>
                      <p className="font-medium text-primary-text">{user.name}</p>
                      <p className="text-sm text-secondary-text">{user.email}</p>
                    </div>
                  </div>
                  <IoCheckmark className="text-primary-accent" size={20} />
                </div>
              ))}
            
            {allUsers.filter(user => !selectedRoleUsers.find(ru => ru.id === user.id)).length === 0 && (
              <div className="text-center py-8 text-secondary-text">
                <p>All users are already assigned to this role</p>
              </div>
            )}
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default RolesPermissions
