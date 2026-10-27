import { useState, useEffect } from 'react'
import { leaveSettingsAPI } from '../../../../api/leaveSettings'
import { departmentsAPI } from '../../../../api/departments'
import { positionsAPI } from '../../../../api/positions'
import { toast } from 'react-hot-toast'
import Button from '../../../../components/ui/Button'
import Input from '../../../../components/ui/Input'
import RightSideModal from '../../../../components/ui/RightSideModal'
import DataTable from '../../../../components/ui/DataTable'
import { IoAdd, IoTrash, IoCalendar, IoPencil, IoArchive, IoRefresh, IoCheckmarkCircle } from 'react-icons/io5'

const LeaveSettings = () => {
    // Get company ID
    const getCompanyId = () => {
        const user = JSON.parse(localStorage.getItem('user') || '{}')
        return parseInt(user.company_id || localStorage.getItem('companyId') || 1, 10)
    }

    const companyId = getCompanyId()

    // Main state
    const [activeTab, setActiveTab] = useState('leave-types') // 'leave-types', 'general-settings', 'archived'
    const [leaveTypes, setLeaveTypes] = useState([])
    const [archivedLeaveTypes, setArchivedLeaveTypes] = useState([])
    const [generalSettings, setGeneralSettings] = useState({
        count_leaves_from: 'start_of_year',
        year_starts_from: 'January',
        reporting_manager_can: 'Approve'
    })
    const [loading, setLoading] = useState(false)
    const [departments, setDepartments] = useState([])
    const [designations, setDesignations] = useState([])

    // Modal state
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isEditMode, setIsEditMode] = useState(false)
    const [editingLeaveType, setEditingLeaveType] = useState(null)
    const [activeModalTab, setActiveModalTab] = useState('general') // 'general', 'entitlement', 'applicability'

    // Form Data
    const [formData, setFormData] = useState({
        name: '',
        allotment_type: 'Yearly',
        total_leaves: 0,
        monthly_limit: 0,
        paid_status: 'Paid',
        color_code: '#3B82F6',
        allow_carry_forward: false,
        max_carry_forward_limit: 0,
        departments: [],
        designations: [],
        is_active: true
    })

    useEffect(() => {
        fetchData()
    }, [activeTab])

    const fetchData = async () => {
        try {
            setLoading(true)
            console.log('=== FETCHING LEAVE SETTINGS DATA ===')
            console.log('Company ID:', companyId)
            console.log('Active Tab:', activeTab)
            console.log('Include Archived:', activeTab === 'archived')
            
            const [leaveTypesRes, settingsRes, deptsRes, posRes] = await Promise.all([
                leaveSettingsAPI.getAllLeaveTypes(companyId, activeTab === 'archived'),
                leaveSettingsAPI.getGeneralSettings(companyId),
                departmentsAPI.getAll({ company_id: companyId }),
                positionsAPI.getAll({ company_id: companyId })
            ])

            console.log('=== LEAVE TYPES RESPONSE ===')
            console.log('Response:', leaveTypesRes)
            console.log('Response Data:', leaveTypesRes.data)

            if (leaveTypesRes.data && leaveTypesRes.data.success) {
                const leaveTypesData = leaveTypesRes.data.data || []
                console.log('Leave Types Data:', leaveTypesData)
                if (activeTab === 'archived') {
                    setArchivedLeaveTypes(leaveTypesData)
                } else {
                    setLeaveTypes(leaveTypesData)
                }
            } else {
                console.warn('Leave types response not successful:', leaveTypesRes.data)
            }

            if (settingsRes.data.success) {
                const settingsData = settingsRes.data.data || {}
                setGeneralSettings({
                    count_leaves_from: settingsData.count_leaves_from || 'start_of_year',
                    year_starts_from: settingsData.year_starts_from || 'January',
                    reporting_manager_can: settingsData.reporting_manager_can || 'Approve'
                })
            }

            if (deptsRes.data.success) {
                setDepartments(deptsRes.data.data || [])
            }

            if (posRes.data.success) {
                setDesignations(posRes.data.data || [])
            }
        } catch (error) {
            console.error(error)
            toast.error('Failed to load data')
        } finally {
            setLoading(false)
        }
    }

    const handleOpenModal = (leaveType = null) => {
        if (leaveType) {
            setIsEditMode(true)
            setEditingLeaveType(leaveType)
            setFormData({
                name: leaveType.name || '',
                allotment_type: leaveType.allotment_type || 'Yearly',
                total_leaves: leaveType.total_leaves || 0,
                monthly_limit: leaveType.monthly_limit || 0,
                paid_status: leaveType.paid_status || 'Paid',
                color_code: leaveType.color_code || '#3B82F6',
                allow_carry_forward: leaveType.allow_carry_forward || false,
                max_carry_forward_limit: leaveType.max_carry_forward_limit || 0,
                departments: (leaveType.departments || []).map(d => d.id),
                designations: (leaveType.designations || []).map(d => d.id),
                is_active: leaveType.is_active !== undefined ? leaveType.is_active : true
            })
        } else {
            setIsEditMode(false)
            setEditingLeaveType(null)
            setFormData({
                name: '',
                allotment_type: 'Yearly',
                total_leaves: 0,
                monthly_limit: 0,
                paid_status: 'Paid',
                color_code: '#3B82F6',
                allow_carry_forward: false,
                max_carry_forward_limit: 0,
                departments: [],
                designations: [],
                is_active: true
            })
        }
        setActiveModalTab('general')
        setIsModalOpen(true)
    }

    const handleCloseModal = () => {
        setIsModalOpen(false)
        setIsEditMode(false)
        setEditingLeaveType(null)
        setActiveModalTab('general')
    }

    const handleSave = async (e) => {
        if (e) {
            e.preventDefault()
            e.stopPropagation()
        }
        
        try {
            console.log('=== HANDLE SAVE CALLED ===')
            console.log('Form Data:', JSON.stringify(formData, null, 2))
            console.log('Is Edit Mode:', isEditMode)
            console.log('Company ID:', companyId)
            console.log('FormData.name:', formData.name)
            console.log('FormData.total_leaves:', formData.total_leaves)
            console.log('FormData.allotment_type:', formData.allotment_type)
            
            // Validation with detailed logging
            if (!formData.name || !formData.name.trim()) {
                console.error('VALIDATION FAILED: Name is required')
                alert('Leave type name is required') // Temporary debug
                toast.error('Leave type name is required')
                return
            }

            if (!formData.allotment_type) {
                console.error('VALIDATION FAILED: Allotment type is required')
                alert('Leave allotment type is required') // Temporary debug
                toast.error('Leave allotment type is required')
                return
            }
            
            console.log('✅ All validations passed')

            const submitData = {
                name: formData.name.trim(),
                allotment_type: formData.allotment_type,
                total_leaves: parseInt(formData.total_leaves) || 0,
                monthly_limit: formData.allotment_type === 'Monthly' ? (parseInt(formData.monthly_limit) || 0) : 0,
                paid_status: formData.paid_status || 'Paid',
                color_code: formData.color_code || '#3B82F6',
                allow_carry_forward: formData.allow_carry_forward || false,
                max_carry_forward_limit: parseInt(formData.max_carry_forward_limit) || 0,
                departments: Array.isArray(formData.departments) ? formData.departments : [],
                designations: Array.isArray(formData.designations) ? formData.designations : [],
                is_active: formData.is_active !== undefined ? formData.is_active : true
            }

            console.log('=== SUBMITTING LEAVE TYPE DATA ===')
            console.log('Submit Data:', JSON.stringify(submitData, null, 2))
            console.log('Company ID:', companyId)

            if (isEditMode && editingLeaveType) {
                console.log('Calling updateLeaveType API...')
                const response = await leaveSettingsAPI.updateLeaveType(editingLeaveType.id, companyId, submitData)
                console.log('Update response:', response)
                toast.success('Leave type updated successfully')
            } else {
                console.log('🚀 Calling createLeaveType API...')
                console.log('API Endpoint: POST /leave-settings/leave-types')
                console.log('Company ID:', companyId)
                console.log('Request Body:', JSON.stringify(submitData, null, 2))
                console.log('Query Params: company_id=' + companyId)
                
                try {
                    console.log('📡 Making API call...')
                    const response = await leaveSettingsAPI.createLeaveType(companyId, submitData)
                    console.log('✅ === CREATE RESPONSE ===')
                    console.log('Response:', response)
                    console.log('Response Status:', response?.status)
                    console.log('Response Data:', response?.data)
                    
                    if (response?.data?.success) {
                        alert('Success! Leave type created.') // Temporary debug
                        toast.success('Leave type created successfully')
                        handleCloseModal()
                        await fetchData()
                    } else {
                        console.error('❌ API returned success=false')
                        throw new Error(response?.data?.error || 'Failed to create leave type')
                    }
                } catch (apiError) {
                    console.error('❌ === API ERROR ===')
                    console.error('Error:', apiError)
                    console.error('Error Response:', apiError.response)
                    console.error('Error Response Data:', apiError.response?.data)
                    console.error('Error Response Status:', apiError.response?.status)
                    alert('API Error: ' + (apiError.response?.data?.error || apiError.message)) // Temporary debug
                    throw apiError // Re-throw to be caught by outer catch
                }
            }

            // Only close modal and refresh if not in create block (it's handled there)
            if (isEditMode && editingLeaveType) {
                handleCloseModal()
                await fetchData()
            }
        } catch (error) {
            console.error('=== ERROR SAVING LEAVE TYPE ===')
            console.error('Error object:', error)
            console.error('Error message:', error.message)
            console.error('Error response:', error.response)
            console.error('Error response data:', error.response?.data)
            console.error('Error response status:', error.response?.status)
            
            const errorMessage = error.response?.data?.error || 
                               error.response?.data?.details || 
                               error.message || 
                               'An error occurred'
            toast.error(errorMessage || (isEditMode ? 'Failed to update leave type' : 'Failed to create leave type'))
        }
    }

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this leave type?')) return
        try {
            await leaveSettingsAPI.deleteLeaveType(id, companyId)
            toast.success('Leave type deleted successfully')
            fetchData()
        } catch (error) {
            console.error(error)
            toast.error('Failed to delete leave type')
        }
    }

    const handleArchive = async (id) => {
        if (!window.confirm('Are you sure you want to archive this leave type?')) return
        try {
            await leaveSettingsAPI.archiveLeaveType(id, companyId)
            toast.success('Leave type archived successfully')
            fetchData()
        } catch (error) {
            console.error(error)
            toast.error('Failed to archive leave type')
        }
    }

    const handleRestore = async (id) => {
        try {
            await leaveSettingsAPI.restoreLeaveType(id, companyId)
            toast.success('Leave type restored successfully')
            fetchData()
        } catch (error) {
            console.error(error)
            toast.error('Failed to restore leave type')
        }
    }

    const handleSaveGeneralSettings = async () => {
        try {
            await leaveSettingsAPI.updateGeneralSettings(companyId, generalSettings)
            toast.success('General settings saved successfully')
        } catch (error) {
            console.error(error)
            toast.error('Failed to save general settings')
        }
    }

    // Table columns for active leave types
    const columns = [
        {
            key: 'name',
            label: 'Leave Type',
            render: (val, row) => (
                <div className="flex items-center gap-2">
                    <span className="w-4 h-4 rounded-full" style={{ backgroundColor: row.color_code || '#3B82F6' }}></span>
                    <span className="font-medium text-gray-900">{val}</span>
                </div>
            )
        },
        {
            key: 'allotment_type',
            label: 'Leave Allotment Type',
            render: (val) => (
                <span className="text-gray-700">{val || 'Yearly'}</span>
            )
        },
        {
            key: 'total_leaves',
            label: 'No. of Leaves',
            render: (val) => (
                <span className="font-semibold text-gray-900">{val || 0}</span>
            )
        },
        {
            key: 'monthly_limit',
            label: 'Monthly Limit',
            render: (val, row) => (
                <span className="text-gray-700">
                    {row.allotment_type === 'Monthly' ? (val || 0) : 'N/A'}
                </span>
            )
        },
        {
            key: 'paid_status',
            label: 'Leave Paid Status',
            render: (val) => (
                val === 'Paid' 
                    ? <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded text-xs font-semibold">Paid</span>
                    : <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded text-xs">Unpaid</span>
            )
        },
        {
            key: 'departments',
            label: 'Department',
            render: (val) => (
                <span className="text-gray-700 text-sm">
                    {val && val.length > 0 
                        ? `${val.length} ${val.length === 1 ? 'dept' : 'depts'}` 
                        : 'All Departments'}
                </span>
            )
        },
        {
            key: 'designations',
            label: 'Designation',
            render: (val) => (
                <span className="text-gray-700 text-sm">
                    {val && val.length > 0 
                        ? `${val.length} ${val.length === 1 ? 'designation' : 'designations'}` 
                        : 'All Designations'}
                </span>
            )
        },
        {
            key: 'is_active',
            label: 'Status',
            render: (val) => (
                val 
                    ? <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded text-xs font-semibold">Active</span>
                    : <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded text-xs">Inactive</span>
            )
        }
    ]

    const actions = (row) => (
        <div className="flex items-center gap-1">
            <button
                onClick={() => handleOpenModal(row)}
                className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                title="Edit"
            >
                <IoPencil size={18} />
            </button>
            <button
                onClick={() => handleArchive(row.id)}
                className="p-2 text-gray-400 hover:text-orange-500 hover:bg-orange-50 rounded-lg transition-colors"
                title="Archive"
            >
                <IoArchive size={18} />
            </button>
            <button
                onClick={() => handleDelete(row.id)}
                className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                title="Delete"
            >
                <IoTrash size={18} />
            </button>
        </div>
    )

    const archivedActions = (row) => (
        <div className="flex items-center gap-1">
            <button
                onClick={() => handleRestore(row.id)}
                className="p-2 text-gray-400 hover:text-green-500 hover:bg-green-50 rounded-lg transition-colors"
                title="Restore"
            >
                <IoRefresh size={18} />
            </button>
            <button
                onClick={() => handleDelete(row.id)}
                className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                title="Permanently Delete"
            >
                <IoTrash size={18} />
            </button>
        </div>
    )

    const months = ['January', 'February', 'March', 'April', 'May', 'June', 
                   'July', 'August', 'September', 'October', 'November', 'December']

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Header */}
            <div>
                <h2 className="text-xl font-bold text-gray-900 tracking-tight">Leave Settings</h2>
                <p className="text-gray-500 text-sm">Configure leave types and policies</p>
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
                <div className="flex items-center gap-1 border-b border-gray-200 px-6">
                    <button
                        onClick={() => setActiveTab('leave-types')}
                        className={`px-4 py-3 border-b-2 font-medium transition-colors ${
                            activeTab === 'leave-types'
                                ? 'border-primary-accent text-primary-accent'
                                : 'border-transparent text-gray-600 hover:text-gray-900'
                        }`}
                    >
                        Leave Type Settings
                    </button>
                    <button
                        onClick={() => setActiveTab('general-settings')}
                        className={`px-4 py-3 border-b-2 font-medium transition-colors ${
                            activeTab === 'general-settings'
                                ? 'border-primary-accent text-primary-accent'
                                : 'border-transparent text-gray-600 hover:text-gray-900'
                        }`}
                    >
                        Leaves General Settings
                    </button>
                    <button
                        onClick={() => setActiveTab('archived')}
                        className={`px-4 py-3 border-b-2 font-medium transition-colors ${
                            activeTab === 'archived'
                                ? 'border-primary-accent text-primary-accent'
                                : 'border-transparent text-gray-600 hover:text-gray-900'
                        }`}
                    >
                        Archived Leaves Type
                    </button>
                </div>

                {/* Tab Content */}
                <div className="p-6">
                    {/* Leave Types Tab */}
                    {activeTab === 'leave-types' && (
                        <div className="space-y-6">
                            <div className="flex justify-between items-center">
                                <div className="flex items-center gap-2">
                                    <div className="p-2 bg-purple-50 text-purple-600 rounded-lg">
                                        <IoCalendar size={20} />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-900">Leave Types</h3>
                                        <p className="text-xs text-gray-500">Define leaves available to employees</p>
                                    </div>
                                </div>
                                <Button
                                    size="sm"
                                    onClick={() => handleOpenModal()}
                                    className="shadow-[0_4px_0_0_rgba(0,0,0,0.05)] border-b-4 border-gray-100 active:shadow-none active:border-0 active:translate-y-1 transition-all"
                                >
                                    <IoAdd className="mr-1" /> Add New Leave Type
                                </Button>
                            </div>

                            <DataTable
                                columns={columns}
                                data={leaveTypes}
                                loading={loading}
                                actions={actions}
                                emptyMessage="No leave types configured."
                            />
                        </div>
                    )}

                    {/* General Settings Tab */}
                    {activeTab === 'general-settings' && (
                        <div className="space-y-6 max-w-2xl">
                            <div className="flex items-center gap-2 mb-6">
                                <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                                    <IoCheckmarkCircle size={20} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900">General Settings</h3>
                                    <p className="text-xs text-gray-500">Configure global leave policies</p>
                                </div>
                            </div>

                            <div className="space-y-6">
                                {/* Count leaves from */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-3">
                                        Count leaves from
                                    </label>
                                    <div className="space-y-2">
                                        <label className="flex items-center gap-2 cursor-pointer">
                                            <input
                                                type="radio"
                                                name="count_leaves_from"
                                                value="date_of_joining"
                                                checked={generalSettings.count_leaves_from === 'date_of_joining'}
                                                onChange={(e) => setGeneralSettings({ ...generalSettings, count_leaves_from: e.target.value })}
                                                className="text-primary-accent focus:ring-primary-accent"
                                            />
                                            <span className="text-gray-700">Count leaves from date of joining</span>
                                        </label>
                                        <label className="flex items-center gap-2 cursor-pointer">
                                            <input
                                                type="radio"
                                                name="count_leaves_from"
                                                value="start_of_year"
                                                checked={generalSettings.count_leaves_from === 'start_of_year'}
                                                onChange={(e) => setGeneralSettings({ ...generalSettings, count_leaves_from: e.target.value })}
                                                className="text-primary-accent focus:ring-primary-accent"
                                            />
                                            <span className="text-gray-700">Count leaves from start of the year</span>
                                        </label>
                                    </div>
                                </div>

                                {/* Year starts from */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Year starts from
                                    </label>
                                    <select
                                        value={generalSettings.year_starts_from || 'January'}
                                        onChange={(e) => setGeneralSettings({ ...generalSettings, year_starts_from: e.target.value })}
                                        className="w-full rounded-lg border-gray-300 focus:ring-primary-accent focus:border-primary-accent text-sm p-2.5"
                                    >
                                        {months.map(month => (
                                            <option key={month} value={month}>{month}</option>
                                        ))}
                                    </select>
                                </div>

                                {/* Reporting manager can */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Reporting manager can
                                    </label>
                                    <select
                                        value={generalSettings.reporting_manager_can || 'Approve'}
                                        onChange={(e) => setGeneralSettings({ ...generalSettings, reporting_manager_can: e.target.value })}
                                        className="w-full rounded-lg border-gray-300 focus:ring-primary-accent focus:border-primary-accent text-sm p-2.5"
                                    >
                                        <option value="Approve">Approve the leave</option>
                                        <option value="Pre-Approve">Pre-Approve the leave</option>
                                    </select>
                                </div>

                                <div className="flex justify-end pt-4">
                                    <Button onClick={handleSaveGeneralSettings}>
                                        Save Settings
                                    </Button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Archived Tab */}
                    {activeTab === 'archived' && (
                        <div className="space-y-6">
                            <div className="flex items-center gap-2">
                                <div className="p-2 bg-orange-50 text-orange-600 rounded-lg">
                                    <IoArchive size={20} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900">Archived Leave Types</h3>
                                    <p className="text-xs text-gray-500">View and manage archived leave types</p>
                                </div>
                            </div>

                            <DataTable
                                columns={columns}
                                data={archivedLeaveTypes}
                                loading={loading}
                                actions={archivedActions}
                                emptyMessage="No archived leave types."
                            />
                        </div>
                    )}
                </div>
            </div>

            {/* Add/Edit Modal */}
            <RightSideModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                title={isEditMode ? 'Edit Leave Type' : 'Add New Leave Type'}
                width="w-[600px]"
            >
                <div className="space-y-6">
                    {/* Modal Tabs */}
                    <div className="flex items-center gap-1 border-b border-gray-200">
                        <button
                            onClick={() => setActiveModalTab('general')}
                            className={`px-4 py-2 border-b-2 font-medium text-sm transition-colors ${
                                activeModalTab === 'general'
                                    ? 'border-primary-accent text-primary-accent'
                                    : 'border-transparent text-gray-600 hover:text-gray-900'
                            }`}
                        >
                            General
                        </button>
                        <button
                            onClick={() => setActiveModalTab('entitlement')}
                            className={`px-4 py-2 border-b-2 font-medium text-sm transition-colors ${
                                activeModalTab === 'entitlement'
                                    ? 'border-primary-accent text-primary-accent'
                                    : 'border-transparent text-gray-600 hover:text-gray-900'
                            }`}
                        >
                            Entitlement
                        </button>
                        <button
                            onClick={() => setActiveModalTab('applicability')}
                            className={`px-4 py-2 border-b-2 font-medium text-sm transition-colors ${
                                activeModalTab === 'applicability'
                                    ? 'border-primary-accent text-primary-accent'
                                    : 'border-transparent text-gray-600 hover:text-gray-900'
                            }`}
                        >
                            Applicability
                        </button>
                    </div>

                    {/* General Tab */}
                    {activeModalTab === 'general' && (
                        <div className="space-y-4 pt-4">
                            <Input
                                label="Leave Type"
                                placeholder="e.g. Privilege Leave"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                required
                            />
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Leave Allotment Type
                                </label>
                                <select
                                    value={formData.allotment_type}
                                    onChange={(e) => setFormData({ ...formData, allotment_type: e.target.value })}
                                    className="w-full rounded-lg border-gray-300 focus:ring-primary-accent focus:border-primary-accent text-sm p-2.5"
                                >
                                    <option value="Monthly">Monthly</option>
                                    <option value="Yearly">Yearly</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Leave Paid Status
                                </label>
                                <select
                                    value={formData.paid_status}
                                    onChange={(e) => setFormData({ ...formData, paid_status: e.target.value })}
                                    className="w-full rounded-lg border-gray-300 focus:ring-primary-accent focus:border-primary-accent text-sm p-2.5"
                                >
                                    <option value="Paid">Paid</option>
                                    <option value="Unpaid">Unpaid</option>
                                </select>
                            </div>
                            <Input
                                type="color"
                                label="Color Code"
                                value={formData.color_code}
                                onChange={(e) => setFormData({ ...formData, color_code: e.target.value })}
                                className="h-[42px] p-1"
                            />
                        </div>
                    )}

                    {/* Entitlement Tab */}
                    {activeModalTab === 'entitlement' && (
                        <div className="space-y-4 pt-4">
                            <Input
                                type="number"
                                label="No. of Leaves per year"
                                placeholder="Enter number of leaves"
                                value={formData.total_leaves || ''}
                                onChange={(e) => {
                                    const val = e.target.value === '' ? 0 : parseInt(e.target.value) || 0
                                    setFormData({ ...formData, total_leaves: val })
                                }}
                                min="1"
                                required
                            />
                            {formData.allotment_type === 'Monthly' && (
                                <Input
                                    type="number"
                                    label="Monthly limit"
                                    placeholder="0"
                                    value={formData.monthly_limit}
                                    onChange={(e) => setFormData({ ...formData, monthly_limit: parseInt(e.target.value) || 0 })}
                                />
                            )}
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={formData.allow_carry_forward}
                                    onChange={(e) => setFormData({ ...formData, allow_carry_forward: e.target.checked })}
                                    className="rounded text-primary-accent focus:ring-primary-accent"
                                />
                                <span className="text-sm text-gray-700">Carry forward allowed</span>
                            </label>
                            {formData.allow_carry_forward && (
                                <Input
                                    type="number"
                                    label="Max carry forward limit"
                                    placeholder="0"
                                    value={formData.max_carry_forward_limit}
                                    onChange={(e) => setFormData({ ...formData, max_carry_forward_limit: parseInt(e.target.value) || 0 })}
                                />
                            )}
                        </div>
                    )}

                    {/* Applicability Tab */}
                    {activeModalTab === 'applicability' && (
                        <div className="space-y-4 pt-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Applicable Departments
                                </label>
                                <div className="border border-gray-300 rounded-lg p-3 max-h-48 overflow-y-auto space-y-2">
                                    {departments.length === 0 ? (
                                        <p className="text-sm text-gray-500">No departments available</p>
                                    ) : (
                                        departments.map(dept => (
                                            <label key={dept.id} className="flex items-center gap-2 cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    checked={formData.departments.includes(dept.id)}
                                                    onChange={(e) => {
                                                        if (e.target.checked) {
                                                            setFormData({ ...formData, departments: [...formData.departments, dept.id] })
                                                        } else {
                                                            setFormData({ ...formData, departments: formData.departments.filter(id => id !== dept.id) })
                                                        }
                                                    }}
                                                    className="rounded text-primary-accent focus:ring-primary-accent"
                                                />
                                                <span className="text-sm text-gray-700">{dept.name}</span>
                                            </label>
                                        ))
                                    )}
                                </div>
                                {formData.departments.length === 0 && (
                                    <p className="text-xs text-gray-500 mt-1">Leave empty to apply to all departments</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Applicable Designations
                                </label>
                                <div className="border border-gray-300 rounded-lg p-3 max-h-48 overflow-y-auto space-y-2">
                                    {designations.length === 0 ? (
                                        <p className="text-sm text-gray-500">No designations available</p>
                                    ) : (
                                        designations.map(desig => (
                                            <label key={desig.id} className="flex items-center gap-2 cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    checked={formData.designations.includes(desig.id)}
                                                    onChange={(e) => {
                                                        if (e.target.checked) {
                                                            setFormData({ ...formData, designations: [...formData.designations, desig.id] })
                                                        } else {
                                                            setFormData({ ...formData, designations: formData.designations.filter(id => id !== desig.id) })
                                                        }
                                                    }}
                                                    className="rounded text-primary-accent focus:ring-primary-accent"
                                                />
                                                <span className="text-sm text-gray-700">{desig.name}</span>
                                            </label>
                                        ))
                                    )}
                                </div>
                                {formData.designations.length === 0 && (
                                    <p className="text-xs text-gray-500 mt-1">Leave empty to apply to all designations</p>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Modal Actions */}
                    <div className="flex justify-end gap-3 pt-4 border-t border-gray-200" onClick={(e) => e.stopPropagation()}>
                        <Button 
                            variant="outline" 
                            onClick={(e) => {
                                e.preventDefault()
                                e.stopPropagation()
                                handleCloseModal()
                            }}
                            type="button"
                        >
                            Cancel
                        </Button>
                        <Button 
                            onClick={(e) => {
                                e.preventDefault()
                                e.stopPropagation()
                                
                                // Force log immediately
                                alert('Button clicked!') // Temporary debug
                                console.log('=== SAVE BUTTON CLICKED ===')
                                console.log('Event:', e)
                                console.log('Form Data:', formData)
                                console.log('Company ID:', companyId)
                                console.log('Is Edit Mode:', isEditMode)
                                
                                // Call handleSave directly
                                handleSave(e).then(() => {
                                    console.log('handleSave completed successfully')
                                }).catch((error) => {
                                    console.error('=== BUTTON ERROR ===')
                                    console.error('Error in button onClick:', error)
                                    console.error('Error response:', error.response)
                                    console.error('Error message:', error.message)
                                    if (error.response) {
                                        toast.error(error.response.data?.error || error.response.data?.details || 'Failed to save leave type')
                                    } else {
                                        toast.error(error.message || 'Failed to save leave type')
                                    }
                                })
                            }}
                            type="button"
                            variant="primary"
                        >
                            {isEditMode ? 'Update' : 'Create'} Leave Type
                        </Button>
                    </div>
                </div>
            </RightSideModal>
        </div>
    )
}

export default LeaveSettings
