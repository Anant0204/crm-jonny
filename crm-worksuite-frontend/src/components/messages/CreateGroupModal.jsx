import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { groupsAPI, messagesAPI } from '../../api'
import { IoClose, IoPeople, IoCheckmark, IoPerson, IoSearch } from 'react-icons/io5'

const CreateGroupModal = ({ isOpen, onClose, userId, companyId, userRole, onGroupCreated }) => {
  const [groupName, setGroupName] = useState('')
  const [description, setDescription] = useState('')
  const [availableUsers, setAvailableUsers] = useState([])
  const [selectedMembers, setSelectedMembers] = useState([])
  const [loading, setLoading] = useState(false)
  const [creating, setCreating] = useState(false)
  const [memberTab, setMemberTab] = useState('all') // 'all', 'clients', 'employees'
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    if (isOpen && userId && companyId) {
      fetchAvailableUsers()
      // Reset form when modal opens
      setGroupName('')
      setDescription('')
      setSelectedMembers([])
      setMemberTab('all')
      setSearchQuery('')
      
      // Lock body scroll when modal is open
      const originalOverflow = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      
      // Handle escape key
      const handleEscape = (e) => {
        if (e.key === 'Escape') onClose()
      }
      document.addEventListener('keydown', handleEscape)
      
      return () => {
        document.body.style.overflow = originalOverflow || ''
        document.removeEventListener('keydown', handleEscape)
      }
    }
  }, [isOpen, userId, companyId, onClose])

  const fetchAvailableUsers = async () => {
    try {
      setLoading(true)
      // Use groups API to get users available for group creation
      const response = await groupsAPI.getAvailableUsers({
        user_id: userId,
        company_id: companyId,
        user_role: userRole
      })
      if (response.data.success) {
        setAvailableUsers(response.data.data || [])
      }
    } catch (error) {
      console.error('Error fetching available users:', error)
      // Fallback to messages API if groups API fails
      try {
        const fallbackResponse = await messagesAPI.getAvailableUsers({
          user_id: userId,
          company_id: companyId,
          user_role: userRole
        })
        if (fallbackResponse.data.success) {
          setAvailableUsers(fallbackResponse.data.data || [])
        }
      } catch (fallbackError) {
        console.error('Error fetching available users (fallback):', fallbackError)
      }
    } finally {
      setLoading(false)
    }
  }

  const toggleMember = (userId) => {
    setSelectedMembers(prev => {
      if (prev.includes(userId)) {
        return prev.filter(id => id !== userId)
      } else {
        return [...prev, userId]
      }
    })
  }

  const handleCreateGroup = async (e) => {
    e.preventDefault()
    if (!groupName.trim() || selectedMembers.length === 0) {
      alert('Please enter a group name and select at least one member')
      return
    }

    try {
      setCreating(true)
      const response = await groupsAPI.create({
        name: groupName.trim(),
        description: description.trim() || null,
        member_ids: selectedMembers,
        user_id: userId,
        company_id: companyId
      })

      if (response.data.success) {
        setGroupName('')
        setDescription('')
        setSelectedMembers([])
        setMemberTab('all')
        onGroupCreated(response.data.data)
        onClose()
      }
    } catch (error) {
      console.error('Error creating group:', error)
      alert(error.response?.data?.error || 'Failed to create group')
    } finally {
      setCreating(false)
    }
  }

  if (!isOpen) return null

  const modalContent = (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[99999] overscroll-contain"
      style={{ zIndex: 99999 }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div 
        className="bg-white rounded-lg shadow-xl w-full max-w-[95vw] sm:max-w-2xl max-h-[90vh] overflow-hidden flex flex-col mx-4 my-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-primary-text">Create New Group</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <IoClose size={24} className="text-gray-600" />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleCreateGroup} className="flex-1 overflow-y-auto p-4 sm:p-6" style={{ maxHeight: 'calc(90vh - 140px)' }}>
          {/* Group Name */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-primary-text mb-2">
              Group Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              placeholder="Enter group name"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-accent focus:border-primary-accent outline-none"
              required
              maxLength={255}
            />
          </div>

          {/* Description */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-primary-text mb-2">
              Description (Optional)
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter group description"
              rows={3}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-accent focus:border-primary-accent outline-none resize-none"
              maxLength={500}
            />
          </div>

          {/* Select Members */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-primary-text">
                Select Members <span className="text-red-500">*</span>
              </label>
              {selectedMembers.length > 0 && (
                <span className="text-sm font-semibold text-primary-accent">
                  {selectedMembers.length} selected
                </span>
              )}
            </div>
            
            {/* Tabs for filtering */}
            {availableUsers.length > 0 && (
              <div className="flex border-b border-gray-200 mb-3 bg-gray-50 rounded-t-lg">
                <button
                  type="button"
                  onClick={() => {
                    setMemberTab('all')
                    setSearchQuery('')
                  }}
                  className={`flex-1 px-4 py-3 text-sm font-medium transition-colors border-b-2 ${
                    memberTab === 'all'
                      ? 'border-primary-accent text-primary-accent bg-white'
                      : 'border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  All ({availableUsers.length})
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setMemberTab('clients')
                    setSearchQuery('')
                  }}
                  className={`flex-1 px-4 py-3 text-sm font-medium transition-colors border-b-2 flex items-center justify-center gap-2 ${
                    memberTab === 'clients'
                      ? 'border-primary-accent text-primary-accent bg-white'
                      : 'border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <IoPerson size={18} />
                  Clients ({availableUsers.filter(u => u.role === 'CLIENT').length})
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setMemberTab('employees')
                    setSearchQuery('')
                  }}
                  className={`flex-1 px-4 py-3 text-sm font-medium transition-colors border-b-2 flex items-center justify-center gap-2 ${
                    memberTab === 'employees'
                      ? 'border-primary-accent text-primary-accent bg-white'
                      : 'border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <IoPeople size={18} />
                  Employees ({availableUsers.filter(u => u.role === 'EMPLOYEE').length})
                </button>
              </div>
            )}

            {/* Search Bar */}
            {availableUsers.length > 0 && (
              <div className="mb-3">
                <div className="relative">
                  <IoSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={`Search ${memberTab === 'clients' ? 'clients' : memberTab === 'employees' ? 'employees' : 'users'}...`}
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-accent focus:border-primary-accent outline-none text-sm"
                  />
                </div>
              </div>
            )}

            {loading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-accent mx-auto"></div>
                <p className="mt-2 text-secondary-text">Loading users...</p>
              </div>
            ) : (
              <div className="border border-gray-300 rounded-lg max-h-64 sm:max-h-80 overflow-y-auto bg-white">
                {(() => {
                  // Filter users based on selected tab and search query
                  let filteredUsers = availableUsers.filter(user => {
                    // Filter by tab
                    if (memberTab === 'clients') {
                      if (user.role !== 'CLIENT') return false
                    } else if (memberTab === 'employees') {
                      if (user.role !== 'EMPLOYEE') return false
                    }
                    
                    // Filter by search query
                    if (searchQuery.trim()) {
                      const query = searchQuery.toLowerCase()
                      return (
                        user.name?.toLowerCase().includes(query) ||
                        user.display_name?.toLowerCase().includes(query) ||
                        user.email?.toLowerCase().includes(query)
                      )
                    }
                    
                    return true
                  })

                  if (filteredUsers.length === 0) {
                    return (
                      <div className="p-6 text-center text-secondary-text">
                        <IoPeople size={48} className="mx-auto mb-2 text-gray-300" />
                        <p className="font-medium">
                          {searchQuery 
                            ? `No ${memberTab === 'clients' ? 'clients' : memberTab === 'employees' ? 'employees' : 'users'} found matching "${searchQuery}"`
                            : `No ${memberTab === 'clients' ? 'clients' : memberTab === 'employees' ? 'employees' : 'users'} available`
                          }
                        </p>
                        {!searchQuery && (
                          <p className="text-xs mt-1">Add {memberTab === 'clients' ? 'clients' : memberTab === 'employees' ? 'employees' : 'users'} to your company first</p>
                        )}
                      </div>
                    )
                  }

                  return (
                    <div className="divide-y divide-gray-200">
                      {filteredUsers.map((user) => {
                        const isSelected = selectedMembers.includes(user.id)
                        return (
                          <div
                            key={user.id}
                            onClick={() => toggleMember(user.id)}
                            className={`p-4 cursor-pointer transition-all flex items-center justify-between ${
                              isSelected 
                                ? 'bg-blue-50 border-l-4 border-l-primary-accent hover:bg-blue-100' 
                                : 'hover:bg-gray-50'
                            }`}
                          >
                            <div className="flex items-center gap-3 flex-1 min-w-0">
                              <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                                isSelected ? 'bg-primary-accent' : 'bg-gray-300'
                              }`}>
                                {isSelected ? (
                                  <IoCheckmark size={20} className="text-white" />
                                ) : (
                                  <span className="text-white font-semibold text-sm">
                                    {user.name ? user.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() : '?'}
                                  </span>
                                )}
                              </div>
                              <div className="flex-1 min-w-0">
                                <h4 className="font-semibold text-primary-text truncate">{user.name || user.display_name}</h4>
                                <p className="text-xs text-secondary-text truncate">{user.email}</p>
                                {user.role && (
                                  <span className={`text-xs px-2 py-0.5 rounded mt-1 inline-block ${
                                    user.role === 'CLIENT' 
                                      ? 'bg-green-100 text-green-700' 
                                      : user.role === 'EMPLOYEE'
                                      ? 'bg-blue-100 text-blue-700'
                                      : 'bg-gray-100 text-gray-700'
                                  }`}>
                                    {user.role_display || user.role}
                                  </span>
                                )}
                              </div>
                            </div>
                            {isSelected && (
                              <div className="flex-shrink-0 ml-2">
                                <div className="w-6 h-6 rounded-full bg-primary-accent flex items-center justify-center">
                                  <IoCheckmark size={16} className="text-white" />
                                </div>
                              </div>
                            )}
                          </div>
                        )
                      })}
                    </div>
                  )
                })()}
              </div>
            )}
          </div>
        </form>

        {/* Footer */}
        <div className="p-4 sm:p-6 border-t border-gray-200 flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-3 sticky bottom-0 bg-white">
          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-2.5 border border-gray-300 rounded-lg text-primary-text hover:bg-gray-50 transition-colors"
            disabled={creating}
          >
            Cancel
          </button>
          <button
            type="submit"
            onClick={handleCreateGroup}
            disabled={creating || !groupName.trim() || selectedMembers.length === 0}
            className="w-full sm:w-auto px-6 py-2.5 bg-primary-accent text-white rounded-lg hover:bg-primary-accent/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {creating ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                Creating...
              </>
            ) : (
              <>
                <IoPeople size={18} />
                Create Group
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )

  return createPortal(modalContent, document.body)
}

export default CreateGroupModal

