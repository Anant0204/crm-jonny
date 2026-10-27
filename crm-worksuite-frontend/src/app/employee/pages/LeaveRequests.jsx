import { useState, useEffect } from 'react'
import { useAuth } from '../../../context/AuthContext'
import { usePermissions } from '../../../context/PermissionsContext'
import AddButton from '../../../components/ui/AddButton'
import DataTable from '../../../components/ui/DataTable'
import RightSideModal from '../../../components/ui/RightSideModal'
import Badge from '../../../components/ui/Badge'
import Input from '../../../components/ui/Input'
import Button from '../../../components/ui/Button'
import { leaveRequestsAPI, leaveSettingsAPI } from '../../../api'
import { IoCreate, IoInformationCircle, IoEye } from 'react-icons/io5'
import Modal from '../../../components/ui/Modal'

const LeaveRequests = () => {
  const { user } = useAuth()
  const { canView, canAdd } = usePermissions()
  const userId = user?.id || localStorage.getItem('userId')
  const companyId = user?.company_id || localStorage.getItem('companyId')
  
  // Check if user can view leave requests
  if (!canView('leaveRequests')) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-primary-text mb-2">Access Denied</h2>
          <p className="text-secondary-text">You don't have permission to view leave requests.</p>
        </div>
      </div>
    )
  }
  
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [selectedLeave, setSelectedLeave] = useState(null)
  const [leaves, setLeaves] = useState([])
  const [leaveTypes, setLeaveTypes] = useState([])
  const [loading, setLoading] = useState(true)
  const [isLeaveTypeDetailsModalOpen, setIsLeaveTypeDetailsModalOpen] = useState(false)
  const [selectedLeaveTypeDetails, setSelectedLeaveTypeDetails] = useState(null)
  const [leaveBalanceForType, setLeaveBalanceForType] = useState({ used: 0, remaining: 0 })
  const [formData, setFormData] = useState({
    leave_type: '',
    start_date: '',
    end_date: '',
    reason: '',
  })

  useEffect(() => {
    if (userId && companyId) {
      fetchLeaves()
      fetchLeaveTypes()
    }
  }, [userId, companyId])

  const fetchLeaveTypes = async () => {
    try {
      const response = await leaveSettingsAPI.getAllLeaveTypes(companyId, false)
      if (response.data.success) {
        // Filter only active leave types
        const activeTypes = (response.data.data || []).filter(lt => lt.is_active !== 0 && !lt.is_archived)
        setLeaveTypes(activeTypes)
      }
    } catch (error) {
      console.error('Error fetching leave types:', error)
      // Fallback to default options if API fails
      setLeaveTypes([])
    }
  }

  const fetchLeaves = async () => {
    try {
      setLoading(true)
      const response = await leaveRequestsAPI.getAll({
        company_id: companyId,
        user_id: userId
      })
      if (response.data.success) {
        setLeaves(response.data.data || [])
      }
    } catch (error) {
      console.error('Error fetching leave requests:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    // Check permissions
    if (selectedLeave && !canEdit('leaveRequests')) {
      alert('You do not have permission to edit leave requests.')
      return
    }
    if (!selectedLeave && !canAdd('leaveRequests')) {
      alert('You do not have permission to add leave requests.')
      return
    }
    
    if (!formData.leave_type || !formData.start_date || !formData.end_date) {
      alert('Please fill all required fields')
      return
    }

    try {
      const leaveData = {
        ...formData,
        company_id: companyId,
        user_id: userId
      }
      
      if (selectedLeave) {
        await leaveRequestsAPI.update(selectedLeave.id, leaveData, { company_id: companyId })
      } else {
        await leaveRequestsAPI.create(leaveData)
      }
      alert('Leave request saved successfully!')
      setIsAddModalOpen(false)
      setIsEditModalOpen(false)
      resetForm()
      await fetchLeaves()
    } catch (error) {
      console.error('Error saving leave request:', error)
      alert(error.response?.data?.error || 'Failed to save leave request')
    }
  }

  const handleEdit = (leave) => {
    setSelectedLeave(leave)
    setFormData({
      leave_type: leave.leave_type || '',
      start_date: leave.start_date || '',
      end_date: leave.end_date || '',
      reason: leave.reason || '',
    })
    setIsEditModalOpen(true)
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this leave request?')) {
      try {
        await leaveRequestsAPI.delete(id, { company_id: companyId, user_id: userId })
        alert('Leave request deleted successfully!')
        await fetchLeaves()
      } catch (error) {
        console.error('Error deleting leave request:', error)
        alert(error.response?.data?.error || 'Failed to delete leave request')
      }
    }
  }

  const resetForm = () => {
    setFormData({
      leave_type: '',
      start_date: '',
      end_date: '',
      reason: '',
    })
    setSelectedLeave(null)
  }

  const handleViewLeaveTypeDetails = async (leaveTypeName) => {
    const leaveType = leaveTypes.find(lt => lt.name === leaveTypeName)
    if (leaveType) {
      try {
        // Fetch full details including departments and designations
        const response = await leaveSettingsAPI.getLeaveTypeById(leaveType.id, companyId)
        if (response.data.success) {
          setSelectedLeaveTypeDetails(response.data.data)
          
          // Calculate leave balance for this specific leave type
          const approvedLeavesForType = leaves.filter(
            l => (l.status === 'Approved' || l.status === 'approved') && l.leave_type === leaveTypeName
          )
          const used = approvedLeavesForType.reduce((sum, leave) => sum + (parseInt(leave.days) || 0), 0)
          const remaining = (parseInt(leaveType.total_leaves) || 0) - used
          setLeaveBalanceForType({ used, remaining })
          
          setIsLeaveTypeDetailsModalOpen(true)
        } else {
          // If API fails, use the basic data we have
          setSelectedLeaveTypeDetails(leaveType)
          const approvedLeavesForType = leaves.filter(
            l => (l.status === 'Approved' || l.status === 'approved') && l.leave_type === leaveTypeName
          )
          const used = approvedLeavesForType.reduce((sum, leave) => sum + (parseInt(leave.days) || 0), 0)
          const remaining = (parseInt(leaveType.total_leaves) || 0) - used
          setLeaveBalanceForType({ used, remaining })
          setIsLeaveTypeDetailsModalOpen(true)
        }
      } catch (error) {
        console.error('Error fetching leave type details:', error)
        // Use the basic data we have
        setSelectedLeaveTypeDetails(leaveType)
        const approvedLeavesForType = leaves.filter(
          l => (l.status === 'Approved' || l.status === 'approved') && l.leave_type === leaveTypeName
        )
        const used = approvedLeavesForType.reduce((sum, leave) => sum + (parseInt(leave.days) || 0), 0)
        const remaining = (parseInt(leaveType.total_leaves) || 0) - used
        setLeaveBalanceForType({ used, remaining })
        setIsLeaveTypeDetailsModalOpen(true)
      }
    }
  }

  const columns = [
    { 
      key: 'leave_type', 
      label: 'Leave Type',
      render: (value) => <span className="font-medium">{value || 'N/A'}</span>
    },
    { 
      key: 'start_date', 
      label: 'From',
      render: (value) => new Date(value).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      })
    },
    { 
      key: 'end_date', 
      label: 'To',
      render: (value) => new Date(value).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      })
    },
    {
      key: 'days',
      label: 'Days',
      render: (value) => <span>{value || 0}</span>
    },
    {
      key: 'status',
      label: 'Status',
      render: (value) => {
        const statusColors = {
          Approved: 'success',
          Pending: 'warning',
          Rejected: 'danger',
        }
        return <Badge variant={statusColors[value] || 'default'}>{value || 'Pending'}</Badge>
      },
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (_, row) => (
        <div className="flex items-center gap-2">
          {row.status === 'Pending' && (
            <>
              <button
                onClick={() => handleEdit(row)}
                className="p-2 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                title="Edit"
              >
                <IoCreate size={18} />
              </button>
              <button
                onClick={() => handleDelete(row.id)}
                className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors"
                title="Delete"
              >
                Delete
              </button>
            </>
          )}
        </div>
      ),
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary-text">Leave Requests</h1>
          <p className="text-secondary-text mt-1">Manage your leave requests</p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            onClick={() => {
              // Show all leave types in a list
              if (leaveTypes.length > 0) {
                setSelectedLeaveTypeDetails(leaveTypes[0])
                setIsLeaveTypeDetailsModalOpen(true)
              }
            }}
            className="flex items-center gap-2"
          >
            <IoInformationCircle size={18} />
            View Leave Types
          </Button>
          {canAdd('leaveRequests') && (
            <AddButton onClick={() => { resetForm(); setIsAddModalOpen(true) }} label="Add Leave" />
          )}
        </div>
      </div>

      {/* Leave Types Summary Card */}
      {leaveTypes.length > 0 && (
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Available Leave Types</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {leaveTypes.map((lt) => (
              <div
                key={lt.id}
                className="border border-gray-200 rounded-lg p-3 hover:border-blue-300 hover:shadow-sm transition-all cursor-pointer"
                onClick={() => handleViewLeaveTypeDetails(lt.name)}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {lt.color_code && (
                      <div
                        className="w-4 h-4 rounded"
                        style={{ backgroundColor: lt.color_code }}
                      />
                    )}
                    <span className="font-medium text-gray-900">{lt.name}</span>
                  </div>
                  <IoEye className="text-gray-400 hover:text-blue-600" size={16} />
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-gray-600">
                    <span className="font-medium">{lt.total_leaves || 0}</span> days/year
                  </p>
                  <div className="flex items-center gap-2">
                    <Badge variant={lt.paid_status === 'Paid' ? 'success' : 'warning'} className="text-xs">
                      {lt.paid_status || 'Paid'}
                    </Badge>
                    {lt.allow_carry_forward && (
                      <Badge variant="default" className="text-xs">Carry Forward</Badge>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <DataTable
        columns={columns}
        data={leaves}
        loading={loading}
        emptyMessage="No leave requests found"
      />

      <RightSideModal
        isOpen={isAddModalOpen || isEditModalOpen}
        onClose={() => {
          setIsAddModalOpen(false)
          setIsEditModalOpen(false)
          resetForm()
        }}
        title={selectedLeave ? 'Edit Leave Request' : 'Add Leave Request'}
      >
        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-primary-text">
                Leave Type <span className="text-red-500">*</span>
              </label>
              {formData.leave_type && (
                <button
                  type="button"
                  onClick={() => handleViewLeaveTypeDetails(formData.leave_type)}
                  className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700 transition-colors"
                >
                  <IoInformationCircle size={16} />
                  <span>View Details</span>
                </button>
              )}
            </div>
            <div className="relative">
              <select
                value={formData.leave_type}
                onChange={(e) => setFormData({ ...formData, leave_type: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-accent focus:border-primary-accent outline-none"
                disabled={leaveTypes.length === 0 && loading}
              >
                <option value="">
                  {loading ? 'Loading leave types...' : leaveTypes.length === 0 ? 'No leave types available' : 'Select leave type'}
                </option>
                {leaveTypes.map((lt) => (
                  <option key={lt.id} value={lt.name}>
                    {lt.name} {lt.total_leaves > 0 ? `(${lt.total_leaves} days/year)` : ''}
                  </option>
                ))}
              </select>
              {!formData.leave_type && leaveTypes.length > 0 && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex gap-1">
                  {leaveTypes.map((lt) => (
                    <button
                      key={lt.id}
                      type="button"
                      onClick={() => handleViewLeaveTypeDetails(lt.name)}
                      className="text-gray-400 hover:text-blue-600 transition-colors"
                      title={`View details for ${lt.name}`}
                    >
                      <IoEye size={16} />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
          <Input
            label="From Date"
            type="date"
            value={formData.start_date}
            onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
            required
          />
          <Input
            label="To Date"
            type="date"
            value={formData.end_date}
            onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
            required
          />
          <div>
            <label className="block text-sm font-medium text-primary-text mb-2">Reason</label>
            <textarea
              value={formData.reason}
              onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
              rows={4}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-accent focus:border-primary-accent outline-none"
              placeholder="Enter reason for leave..."
            />
          </div>
          <div className="flex gap-3 pt-4">
            <Button
              variant="outline"
              onClick={() => {
                setIsAddModalOpen(false)
                setIsEditModalOpen(false)
                resetForm()
              }}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button variant="primary" onClick={handleSave} className="flex-1">
              {selectedLeave ? 'Update' : 'Submit'} Leave Request
            </Button>
          </div>
        </div>
      </RightSideModal>

      {/* Leave Type Details Modal */}
      <Modal
        isOpen={isLeaveTypeDetailsModalOpen}
        onClose={() => {
          setIsLeaveTypeDetailsModalOpen(false)
          setSelectedLeaveTypeDetails(null)
        }}
        title={selectedLeaveTypeDetails ? `${selectedLeaveTypeDetails.name} - Details` : 'Leave Type Details'}
        size="md"
      >
        {selectedLeaveTypeDetails && (
          <div className="space-y-4">
            {/* Basic Information */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-sm font-semibold text-gray-700 mb-3">Basic Information</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Leave Type Name</label>
                  <p className="text-sm font-medium text-gray-900">{selectedLeaveTypeDetails.name}</p>
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Status</label>
                  <Badge variant={selectedLeaveTypeDetails.is_active ? 'success' : 'default'}>
                    {selectedLeaveTypeDetails.is_active ? 'Active' : 'Inactive'}
                  </Badge>
                </div>
              </div>
            </div>

            {/* Entitlement Information */}
            <div className="bg-blue-50 rounded-lg p-4">
              <h3 className="text-sm font-semibold text-gray-700 mb-3">Entitlement</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Allotment Type</label>
                  <p className="text-sm font-medium text-gray-900 capitalize">
                    {selectedLeaveTypeDetails.allotment_type || 'Yearly'}
                  </p>
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Total Leaves per Year</label>
                  <p className="text-sm font-medium text-gray-900">
                    {selectedLeaveTypeDetails.total_leaves || 0} days
                  </p>
                </div>
                {selectedLeaveTypeDetails.allotment_type === 'Monthly' && selectedLeaveTypeDetails.monthly_limit > 0 && (
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Monthly Limit</label>
                    <p className="text-sm font-medium text-gray-900">
                      {selectedLeaveTypeDetails.monthly_limit} days/month
                    </p>
                  </div>
                )}
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Paid Status</label>
                  <Badge variant={selectedLeaveTypeDetails.paid_status === 'Paid' ? 'success' : 'warning'}>
                    {selectedLeaveTypeDetails.paid_status || 'Paid'}
                  </Badge>
                </div>
              </div>
              
              {/* Your Leave Balance for this type */}
              <div className="mt-4 pt-4 border-t border-blue-200">
                <h4 className="text-xs font-semibold text-gray-700 mb-2">Your Leave Balance</h4>
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Total</label>
                    <p className="text-sm font-bold text-gray-900">{selectedLeaveTypeDetails.total_leaves || 0}</p>
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Used</label>
                    <p className="text-sm font-bold text-red-600">{leaveBalanceForType.used}</p>
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Remaining</label>
                    <p className="text-sm font-bold text-green-600">{leaveBalanceForType.remaining}</p>
                  </div>
                </div>
                <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-green-500 h-2 rounded-full transition-all"
                    style={{
                      width: `${selectedLeaveTypeDetails.total_leaves > 0 
                        ? ((leaveBalanceForType.remaining / selectedLeaveTypeDetails.total_leaves) * 100) 
                        : 0}%`
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Carry Forward Information */}
            {selectedLeaveTypeDetails.allow_carry_forward && (
              <div className="bg-green-50 rounded-lg p-4">
                <h3 className="text-sm font-semibold text-gray-700 mb-3">Carry Forward</h3>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="success">Allowed</Badge>
                  {selectedLeaveTypeDetails.max_carry_forward_limit > 0 && (
                    <span className="text-sm text-gray-600">
                      Max: {selectedLeaveTypeDetails.max_carry_forward_limit} days
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-500">
                  Unused leaves can be carried forward to the next year
                </p>
              </div>
            )}

            {/* Applicability */}
            {(selectedLeaveTypeDetails.departments?.length > 0 || selectedLeaveTypeDetails.designations?.length > 0) && (
              <div className="bg-purple-50 rounded-lg p-4">
                <h3 className="text-sm font-semibold text-gray-700 mb-3">Applicability</h3>
                {selectedLeaveTypeDetails.departments?.length > 0 && (
                  <div className="mb-3">
                    <label className="block text-xs text-gray-500 mb-1">Departments</label>
                    <div className="flex flex-wrap gap-2">
                      {selectedLeaveTypeDetails.departments.map((dept) => (
                        <Badge key={dept.id} variant="default">
                          {dept.name}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
                {selectedLeaveTypeDetails.designations?.length > 0 && (
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Designations</label>
                    <div className="flex flex-wrap gap-2">
                      {selectedLeaveTypeDetails.designations.map((desig) => (
                        <Badge key={desig.id} variant="default">
                          {desig.name}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Visual Indicator */}
            {selectedLeaveTypeDetails.color_code && (
              <div className="flex items-center gap-2">
                <label className="block text-xs text-gray-500">Color Code</label>
                <div
                  className="w-8 h-8 rounded border border-gray-300"
                  style={{ backgroundColor: selectedLeaveTypeDetails.color_code }}
                />
                <span className="text-xs text-gray-600">{selectedLeaveTypeDetails.color_code}</span>
              </div>
            )}

            <div className="flex justify-end pt-4 border-t">
              <Button
                variant="outline"
                onClick={() => {
                  setIsLeaveTypeDetailsModalOpen(false)
                  setSelectedLeaveTypeDetails(null)
                }}
              >
                Close
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}

export default LeaveRequests
