import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { groupsAPI } from '../../api'
import { IoClose, IoPeople, IoPerson, IoMail, IoTrash, IoCheckmarkCircle } from 'react-icons/io5'

const ViewGroupMembersModal = ({ isOpen, onClose, groupId, userId, companyId, userRole, isCreator = false, onMemberRemoved }) => {
  const [members, setMembers] = useState([])
  const [loading, setLoading] = useState(false)
  const [removingMemberId, setRemovingMemberId] = useState(null)

  useEffect(() => {
    if (isOpen && groupId && userId && companyId) {
      fetchMembers()
    }
  }, [isOpen, groupId, userId, companyId])

  const fetchMembers = async () => {
    try {
      setLoading(true)
      const response = await groupsAPI.getById(groupId, {
        user_id: userId,
        company_id: companyId
      })
      if (response.data.success) {
        setMembers(response.data.data.members || [])
      }
    } catch (error) {
      console.error('Error fetching group members:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleRemoveMember = async (memberId) => {
    if (!isCreator) {
      alert('Only group creator can remove members')
      return
    }

    if (memberId === parseInt(userId)) {
      alert('You cannot remove yourself from the group')
      return
    }

    if (!confirm(`Are you sure you want to remove this member from the group?`)) {
      return
    }

    try {
      setRemovingMemberId(memberId)
      const response = await groupsAPI.removeMember(groupId, memberId, {
        user_id: userId,
        company_id: companyId
      })

      if (response.data.success) {
        // Remove member from local state
        setMembers(prev => prev.filter(m => m.id !== memberId))
        if (onMemberRemoved) {
          onMemberRemoved()
        }
      }
    } catch (error) {
      console.error('Error removing member:', error)
      alert(error.response?.data?.error || 'Failed to remove member')
    } finally {
      setRemovingMemberId(null)
    }
  }

  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      
      const handleEscape = (e) => {
        if (e.key === 'Escape') onClose()
      }
      document.addEventListener('keydown', handleEscape)
      
      return () => {
        document.body.style.overflow = originalOverflow || ''
        document.removeEventListener('keydown', handleEscape)
      }
    }
  }, [isOpen, onClose])

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
        <div className="p-4 sm:p-6 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary-accent flex items-center justify-center">
              <IoPeople size={20} className="text-white" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-primary-text">Group Members</h2>
              <p className="text-sm text-secondary-text">{members.length} member{members.length !== 1 ? 's' : ''}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0"
            aria-label="Close modal"
          >
            <IoClose size={24} className="text-gray-600" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6" style={{ maxHeight: 'calc(90vh - 140px)' }}>
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-accent mx-auto"></div>
              <p className="mt-4 text-secondary-text">Loading members...</p>
            </div>
          ) : members.length === 0 ? (
            <div className="text-center py-12">
              <IoPeople size={64} className="mx-auto mb-4 text-gray-300" />
              <p className="text-lg font-medium text-primary-text">No members found</p>
              <p className="text-sm text-secondary-text mt-2">This group has no members yet.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {members.map((member) => {
                const isCurrentUser = member.id === parseInt(userId)
                const isRemoving = removingMemberId === member.id
                
                return (
                  <div
                    key={member.id}
                    className={`p-4 border border-gray-200 rounded-lg hover:shadow-md transition-all ${
                      isCurrentUser ? 'bg-blue-50 border-blue-200' : 'bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 flex-1 min-w-0">
                        {/* Avatar */}
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                          isCurrentUser ? 'bg-primary-accent' : 'bg-gray-300'
                        }`}>
                          {isCurrentUser ? (
                            <IoCheckmarkCircle size={24} className="text-white" />
                          ) : (
                            <span className="text-white font-semibold text-sm">
                              {member.name ? member.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() : '?'}
                            </span>
                          )}
                        </div>

                        {/* Member Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <h4 className="font-semibold text-primary-text truncate">
                              {member.name || member.email}
                              {isCurrentUser && (
                                <span className="ml-2 text-xs text-primary-accent font-normal">(You)</span>
                              )}
                            </h4>
                          </div>
                          <div className="flex items-center gap-2 mt-1 flex-wrap">
                            <div className="flex items-center gap-1 text-xs text-secondary-text">
                              <IoMail size={14} />
                              <span className="truncate">{member.email}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 mt-2">
                            {member.role && (
                              <span className={`text-xs px-2 py-0.5 rounded ${
                                member.role === 'CLIENT' 
                                  ? 'bg-green-100 text-green-700' 
                                  : member.role === 'EMPLOYEE'
                                  ? 'bg-blue-100 text-blue-700'
                                  : member.role === 'ADMIN'
                                  ? 'bg-purple-100 text-purple-700'
                                  : 'bg-gray-100 text-gray-700'
                              }`}>
                                {member.role_display || member.role}
                              </span>
                            )}
                            {member.joined_at && (
                              <span className="text-xs text-secondary-text">
                                Joined {new Date(member.joined_at).toLocaleDateString()}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Remove Button (only for creator, not for current user) */}
                      {isCreator && !isCurrentUser && (
                        <button
                          onClick={() => handleRemoveMember(member.id)}
                          disabled={isRemoving}
                          className="ml-4 p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
                          title="Remove member"
                        >
                          {isRemoving ? (
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-red-500"></div>
                          ) : (
                            <IoTrash size={20} />
                          )}
                        </button>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-6 border-t border-gray-200 flex items-center justify-end sticky bottom-0 bg-white">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-primary-accent text-white rounded-lg hover:bg-primary-accent/90 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )

  return createPortal(modalContent, document.body)
}

export default ViewGroupMembersModal

