import { useState, useEffect, useCallback, useRef } from 'react'
import { useAuth } from '../../../context/AuthContext'
import Card from '../../../components/ui/Card'
import Badge from '../../../components/ui/Badge'
import { messagesAPI, groupsAPI } from '../../../api'
import CreateGroupModal from '../../../components/messages/CreateGroupModal'
import AddMembersModal from '../../../components/messages/AddMembersModal'
import ViewGroupMembersModal from '../../../components/messages/ViewGroupMembersModal'
import { 
  IoSend, 
  IoSearch, 
  IoEllipsisVertical, 
  IoCheckmark, 
  IoCheckmarkDone,
  IoPerson,
  IoPeople,
  IoBriefcase,
  IoTrash,
  IoArchive,
  IoVolumeOff,
  IoFlag,
  IoAdd,
  IoCreateOutline,
  IoPersonAdd,
  IoEye
} from 'react-icons/io5'

const Messages = () => {
  const { user } = useAuth()
  const userId = user?.id || localStorage.getItem('userId')
  const companyId = user?.company_id || localStorage.getItem('companyId')
  const userRole = user?.role || localStorage.getItem('userRole')

  const [activeTab, setActiveTab] = useState('clients') // 'clients', 'employees', or 'groups'
  const [conversations, setConversations] = useState([])
  const [groups, setGroups] = useState([])
  const [selectedConversation, setSelectedConversation] = useState(null)
  const [selectedGroup, setSelectedGroup] = useState(null)
  const [messages, setMessages] = useState([])
  const [availableUsers, setAvailableUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [sending, setSending] = useState(false)
  const [newMessageText, setNewMessageText] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [showChatMenu, setShowChatMenu] = useState(false)
  const [showCreateGroupModal, setShowCreateGroupModal] = useState(false)
  const [showAddMembersModal, setShowAddMembersModal] = useState(false)
  const [showViewMembersModal, setShowViewMembersModal] = useState(false)
  const [editingGroupName, setEditingGroupName] = useState(false)
  const [editGroupName, setEditGroupName] = useState('')
  const [groupMembers, setGroupMembers] = useState([])
  const chatMenuRef = useRef(null)

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (chatMenuRef.current && !chatMenuRef.current.contains(event.target)) {
        setShowChatMenu(false)
      }
    }
    if (showChatMenu) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [showChatMenu])

  useEffect(() => {
    if (userId && companyId && userRole) {
      fetchConversations()
      fetchAvailableUsers()
      if (userRole === 'ADMIN') {
        fetchGroups()
      }
    }
  }, [userId, companyId, userRole])

  useEffect(() => {
    if (selectedConversation) {
      fetchConversationMessages(selectedConversation.other_user_id)
      // Auto-refresh messages every 5 seconds
      const interval = setInterval(() => {
        fetchConversationMessages(selectedConversation.other_user_id)
      }, 5000)
      return () => clearInterval(interval)
    } else if (selectedGroup) {
      fetchGroupMessages(selectedGroup.id)
      // Auto-refresh messages every 5 seconds
      const interval = setInterval(() => {
        fetchGroupMessages(selectedGroup.id)
      }, 5000)
      return () => clearInterval(interval)
    }
  }, [selectedConversation, selectedGroup])

  const fetchConversations = useCallback(async () => {
    try {
      setLoading(true)
      const response = await messagesAPI.getAll({ 
        user_id: userId, 
        company_id: companyId 
      })
      if (response.data.success) {
        setConversations(response.data.data || [])
      }
    } catch (error) {
      console.error('Error fetching conversations:', error)
    } finally {
      setLoading(false)
    }
  }, [userId, companyId])

  const fetchAvailableUsers = async () => {
    try {
      console.log('Fetching available users...', { userId, companyId, userRole })
      // Use groups API for better user list (includes all clients and employees)
      const response = await groupsAPI.getAvailableUsers({ 
        user_id: userId, 
        company_id: companyId,
        user_role: userRole 
      })
      console.log('Groups API response:', response.data)
      if (response.data.success) {
        const users = response.data.data || []
        console.log('Available users from groups API:', users.length, users)
        setAvailableUsers(users)
      } else {
        // Fallback to messages API
        console.log('Groups API failed, trying messages API...')
        const fallbackResponse = await messagesAPI.getAvailableUsers({ 
          user_id: userId, 
          company_id: companyId,
          user_role: userRole 
        })
        if (fallbackResponse.data.success) {
          const users = fallbackResponse.data.data || []
          console.log('Available users from messages API:', users.length, users)
          setAvailableUsers(users)
        }
      }
    } catch (error) {
      console.error('Error fetching available users:', error)
      // Fallback to messages API on error
      try {
        const fallbackResponse = await messagesAPI.getAvailableUsers({ 
          user_id: userId, 
          company_id: companyId,
          user_role: userRole 
        })
        if (fallbackResponse.data.success) {
          const users = fallbackResponse.data.data || []
          console.log('Available users from messages API (fallback):', users.length, users)
          setAvailableUsers(users)
        }
      } catch (fallbackError) {
        console.error('Error fetching available users (fallback):', fallbackError)
        setAvailableUsers([])
      }
    }
  }

  const fetchGroups = async () => {
    try {
      const response = await groupsAPI.getAll({
        user_id: userId,
        company_id: companyId
      })
      if (response.data.success) {
        setGroups(response.data.data || [])
      }
    } catch (error) {
      console.error('Error fetching groups:', error)
    }
  }

  const fetchGroupMessages = async (groupId) => {
    try {
      const response = await messagesAPI.getGroupMessages(groupId, {
        user_id: userId,
        company_id: companyId
      })
      if (response.data.success) {
        setMessages(response.data.data || [])
      }
    } catch (error) {
      console.error('Error fetching group messages:', error)
    }
  }

  const fetchConversationMessages = async (otherUserId) => {
    try {
      const response = await messagesAPI.getConversation(otherUserId, { 
        user_id: userId, 
        company_id: companyId 
      })
      if (response.data.success) {
        setMessages(response.data.data || [])
      }
    } catch (error) {
      console.error('Error fetching messages:', error)
    }
  }

  const handleSendMessage = async (e) => {
    e?.preventDefault()
    if (!newMessageText.trim()) return

    try {
      setSending(true)
      let response
      
      if (selectedGroup) {
        // Send group message
        response = await messagesAPI.create({
          group_id: selectedGroup.id,
          subject: 'Group Message',
          message: newMessageText.trim(),
          user_id: userId,
          company_id: companyId
        })
        if (response.data.success) {
          setNewMessageText('')
          fetchGroupMessages(selectedGroup.id)
          fetchGroups()
        }
      } else if (selectedConversation) {
        // Send private message
        response = await messagesAPI.create({
          to_user_id: selectedConversation.other_user_id,
          subject: 'Chat Message',
          message: newMessageText.trim(),
          user_id: userId,
          company_id: companyId
        })
        if (response.data.success) {
          setNewMessageText('')
          fetchConversationMessages(selectedConversation.other_user_id)
          fetchConversations()
        }
      }
    } catch (error) {
      console.error('Error sending message:', error)
      alert(error.response?.data?.error || 'Failed to send message')
    } finally {
      setSending(false)
    }
  }

  const handleSelectUser = (user) => {
    setSelectedGroup(null)
    setSelectedConversation({
      other_user_id: user.id || user.other_user_id,
      other_user_name: user.display_name || user.name || user.other_user_name,
      other_user_email: user.email || user.other_user_email,
      other_user_role: user.role || user.other_user_role,
      unread_count: user.unread_count || 0
    })
  }

  const handleSelectGroup = async (group) => {
    setSelectedConversation(null)
    setSelectedGroup(group)
    // Fetch group details with members
    if (group.id) {
      try {
        const response = await groupsAPI.getById(group.id, {
          user_id: userId,
          company_id: companyId
        })
        if (response.data.success) {
          setSelectedGroup(response.data.data)
          setGroupMembers(response.data.data.members || [])
        }
      } catch (error) {
        console.error('Error fetching group details:', error)
      }
    }
  }

  const handleGroupCreated = (newGroup) => {
    fetchGroups()
    handleSelectGroup(newGroup)
  }

  const handleMembersAdded = async () => {
    // Refresh group details after adding members
    if (selectedGroup?.id) {
      try {
        const response = await groupsAPI.getById(selectedGroup.id, {
          user_id: userId,
          company_id: companyId
        })
        if (response.data.success) {
          setSelectedGroup(response.data.data)
          setGroupMembers(response.data.data.members || [])
        }
        fetchGroups() // Refresh groups list
      } catch (error) {
        console.error('Error refreshing group details:', error)
      }
    }
  }

  const handleMemberRemoved = async () => {
    // Refresh group details after removing a member
    if (selectedGroup?.id) {
      try {
        const response = await groupsAPI.getById(selectedGroup.id, {
          user_id: userId,
          company_id: companyId
        })
        if (response.data.success) {
          setSelectedGroup(response.data.data)
          setGroupMembers(response.data.data.members || [])
        }
        fetchGroups() // Refresh groups list
      } catch (error) {
        console.error('Error refreshing group details:', error)
      }
    }
  }

  const handleUpdateGroupName = async () => {
    if (!selectedGroup || !editGroupName.trim()) return

    try {
      const response = await groupsAPI.update(selectedGroup.id, {
        name: editGroupName.trim(),
        user_id: userId,
        company_id: companyId
      })

      if (response.data.success) {
        setEditingGroupName(false)
        fetchGroups()
        // Update selected group
        const updatedGroups = await groupsAPI.getAll({
          user_id: userId,
          company_id: companyId
        })
        if (updatedGroups.data.success) {
          const updatedGroup = updatedGroups.data.data.find(g => g.id === selectedGroup.id)
          if (updatedGroup) {
            setSelectedGroup(updatedGroup)
          }
        }
      }
    } catch (error) {
      console.error('Error updating group name:', error)
      alert(error.response?.data?.error || 'Failed to update group name')
    }
  }

  // Filter available users based on active tab and search
  const filteredAvailableUsers = availableUsers.filter(user => {
    // Filter by role tab
    if (activeTab === 'clients' && user.role !== 'CLIENT') return false
    if (activeTab === 'employees' && user.role !== 'EMPLOYEE') return false
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      return (
        user.name?.toLowerCase().includes(query) ||
        user.email?.toLowerCase().includes(query) ||
        user.display_name?.toLowerCase().includes(query)
      )
    }
    return true
  })

  // Filter conversations based on active tab and search
  const filteredConversations = conversations.filter(conv => {
    // Filter by role tab
    if (activeTab === 'clients' && conv.other_user_role !== 'CLIENT') return false
    if (activeTab === 'employees' && conv.other_user_role !== 'EMPLOYEE') return false
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      return (
        conv.other_user_name?.toLowerCase().includes(query) ||
        conv.other_user_email?.toLowerCase().includes(query)
      )
    }
    return true
  })

  // Create a map of conversation user IDs for quick lookup
  const conversationUserIds = new Set(filteredConversations.map(c => c.other_user_id))

  // Merge conversations with available users
  // Conversations come first (with message history), then available users without conversations
  const displayUsers = [
    ...filteredConversations,
    ...filteredAvailableUsers
      .filter(u => !conversationUserIds.has(u.id))
      .map(u => ({
        other_user_id: u.id,
        other_user_name: u.display_name || u.name,
        other_user_email: u.email,
        other_user_role: u.role,
        last_message: null,
        last_message_time: null,
        unread_count: 0
      }))
  ]

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-140px)]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-accent mx-auto"></div>
          <p className="mt-4 text-secondary-text">Loading messages...</p>
        </div>
      </div>
    )
  }

  // SuperAdmin has no messaging
  if (userRole === 'SUPERADMIN') {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-primary-text">Messages</h1>
          <p className="text-secondary-text mt-1">Manage conversations</p>
        </div>
        <Card className="p-12 text-center">
          <IoPerson size={64} className="mx-auto mb-4 text-gray-300" />
          <h3 className="text-xl font-semibold text-primary-text mb-2">Messaging Not Available</h3>
          <p className="text-secondary-text">
            SuperAdmin role does not have access to messaging system.
            <br />
            Messaging is only available for Admin, Client, and Employee roles.
          </p>
        </Card>
      </div>
    )
  }

  // Client/Employee only see admins (no tabs needed)
  const showTabs = userRole === 'ADMIN'

  return (
    <div className="space-y-4">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-primary-text">Messages</h1>
        <p className="text-secondary-text mt-1">Manage conversations</p>
      </div>

      {/* WhatsApp-style Layout - Reversed (Chat Left, List Right) */}
      <Card className="overflow-hidden" style={{ height: 'calc(100vh - 180px)' }}>
        <div className="flex h-full">
          {/* LEFT SIDE - Chat Area */}
          <div className="flex-1 flex flex-col bg-gray-50">
            {selectedConversation || selectedGroup ? (
              <>
                {/* Chat Header */}
                <div className="p-4 bg-white border-b border-gray-200 flex items-center justify-between">
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div className="w-10 h-10 rounded-full bg-primary-accent flex items-center justify-center flex-shrink-0">
                      {selectedGroup ? (
                        <IoPeople size={20} className="text-white" />
                      ) : (
                        <span className="text-white font-semibold text-sm">
                          {selectedConversation.other_user_name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                        </span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      {selectedGroup ? (
                        editingGroupName ? (
                          <div className="flex items-center gap-2">
                            <input
                              type="text"
                              value={editGroupName}
                              onChange={(e) => setEditGroupName(e.target.value)}
                              onBlur={handleUpdateGroupName}
                              onKeyPress={(e) => {
                                if (e.key === 'Enter') {
                                  handleUpdateGroupName()
                                } else if (e.key === 'Escape') {
                                  setEditingGroupName(false)
                                  setEditGroupName(selectedGroup.name)
                                }
                              }}
                              className="px-2 py-1 border border-primary-accent rounded text-sm font-semibold text-primary-text focus:outline-none focus:ring-1 focus:ring-primary-accent"
                              autoFocus
                            />
                          </div>
                        ) : (
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold text-primary-text">{selectedGroup.name}</h3>
                            {selectedGroup.created_by === parseInt(userId) && (
                              <button
                                onClick={() => {
                                  setEditGroupName(selectedGroup.name)
                                  setEditingGroupName(true)
                                }}
                                className="p-1 hover:bg-gray-100 rounded"
                                title="Edit group name"
                              >
                                <IoCreateOutline size={14} className="text-gray-500" />
                              </button>
                            )}
                          </div>
                        )
                      ) : (
                        <>
                          <h3 className="font-semibold text-primary-text">{selectedConversation.other_user_name}</h3>
                          <p className="text-xs text-secondary-text flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-green-500"></span>
                            {selectedConversation.other_user_email}
                          </p>
                        </>
                      )}
                      {selectedGroup && (
                        <button
                          onClick={() => setShowViewMembersModal(true)}
                          className="text-xs text-secondary-text hover:text-primary-accent transition-colors cursor-pointer"
                        >
                          {groupMembers.length > 0 ? groupMembers.length : (selectedGroup.member_count || 0)} member{(groupMembers.length > 0 ? groupMembers.length : (selectedGroup.member_count || 0)) !== 1 ? 's' : ''}
                        </button>
                      )}
                    </div>
                  </div>
                  <div className="relative" ref={chatMenuRef}>
                    <button 
                      onClick={() => setShowChatMenu(!showChatMenu)}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <IoEllipsisVertical size={20} />
                    </button>
                    {showChatMenu && (
                      <div className="absolute right-0 top-full mt-1 w-48 bg-white rounded-lg shadow-xl border border-gray-200 py-1 z-50">
                        {selectedGroup && (
                          <>
                            <button
                              onClick={() => {
                                setShowViewMembersModal(true)
                                setShowChatMenu(false)
                              }}
                              className="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3"
                            >
                              <IoEye size={16} className="text-gray-500" />
                              View Members
                            </button>
                            {selectedGroup.created_by === parseInt(userId) && (
                              <>
                                <button
                                  onClick={() => {
                                    setShowAddMembersModal(true)
                                    setShowChatMenu(false)
                                  }}
                                  className="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3"
                                >
                                  <IoPersonAdd size={16} className="text-gray-500" />
                                  Add Members
                                </button>
                              </>
                            )}
                            <div className="border-t border-gray-100 my-1"></div>
                          </>
                        )}
                        <button
                          onClick={() => {
                            alert('Archive conversation feature coming soon!')
                            setShowChatMenu(false)
                          }}
                          className="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3"
                        >
                          <IoArchive size={16} className="text-gray-500" />
                          Archive Chat
                        </button>
                        <button
                          onClick={() => {
                            alert('Mute notifications feature coming soon!')
                            setShowChatMenu(false)
                          }}
                          className="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3"
                        >
                          <IoVolumeOff size={16} className="text-gray-500" />
                          Mute Notifications
                        </button>
                        <button
                          onClick={() => {
                            alert('Mark as important feature coming soon!')
                            setShowChatMenu(false)
                          }}
                          className="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3"
                        >
                          <IoFlag size={16} className="text-yellow-500" />
                          Mark Important
                        </button>
                        <div className="border-t border-gray-100 my-1"></div>
                        <button
                          onClick={() => {
                            if (confirm('Are you sure you want to delete this conversation?')) {
                              alert('Delete conversation feature coming soon!')
                            }
                            setShowChatMenu(false)
                          }}
                          className="w-full px-4 py-2.5 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-3"
                        >
                          <IoTrash size={16} />
                          Delete Conversation
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Messages Area */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {messages.length === 0 ? (
                    <div className="flex items-center justify-center h-full text-secondary-text">
                      <div className="text-center">
                        <IoPerson size={48} className="mx-auto mb-2 text-gray-300" />
                        <p>No messages yet</p>
                        <p className="text-xs mt-1">Start a conversation</p>
                      </div>
                    </div>
                  ) : (
                    messages.map((msg) => {
                      const isMyMessage = msg.from_user_id === parseInt(userId)
                      return (
                        <div
                          key={msg.id}
                          className={`flex ${isMyMessage ? 'justify-end' : 'justify-start'}`}
                        >
                          <div
                            className={`max-w-[70%] rounded-lg px-4 py-2 ${
                              isMyMessage
                                ? 'bg-primary-accent text-white'
                                : 'bg-white text-primary-text border border-gray-200'
                            }`}
                          >
                            {(!isMyMessage || selectedGroup) && (
                              <p className="text-xs opacity-70 mb-1">{msg.from_user_name}</p>
                            )}
                            <p className="text-sm whitespace-pre-wrap break-words">{msg.message}</p>
                            <div className={`flex items-center gap-1 justify-end mt-1 text-xs ${
                              isMyMessage ? 'text-white opacity-70' : 'text-secondary-text'
                            }`}>
                              <span>
                                {new Date(msg.created_at).toLocaleTimeString('en-US', {
                                  hour: '2-digit',
                                  minute: '2-digit'
                                })}
                              </span>
                              {isMyMessage && !selectedGroup && (
                                msg.is_read ? 
                                  <IoCheckmarkDone size={14} className="text-blue-400" /> : 
                                  <IoCheckmark size={14} />
                              )}
                            </div>
                          </div>
                        </div>
                      )
                    })
                  )}
                </div>

                {/* Message Input */}
                <div className="p-4 bg-white border-t border-gray-200">
                  <form onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={newMessageText}
                      onChange={(e) => setNewMessageText(e.target.value)}
                      placeholder={selectedGroup ? "Type a message to group..." : "Type your message..."}
                      className="flex-1 px-4 py-3 rounded-full border border-gray-300 focus:ring-2 focus:ring-primary-accent focus:border-primary-accent outline-none"
                      disabled={sending}
                    />
                    <button
                      type="submit"
                      disabled={sending || !newMessageText.trim()}
                      className="w-12 h-12 rounded-full bg-primary-accent text-white flex items-center justify-center hover:bg-primary-accent/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <IoSend size={20} />
                    </button>
                  </form>
                </div>
              </>
            ) : (
              /* No Conversation Selected */
              <div className="flex-1 flex items-center justify-center text-secondary-text bg-gradient-to-br from-gray-50 to-gray-100">
                <div className="text-center">
                  <div className="w-32 h-32 rounded-full bg-white shadow-lg flex items-center justify-center mx-auto mb-4">
                    <IoPerson size={64} className="text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-primary-text mb-2">Select a conversation to view messages</h3>
                  <p className="text-sm">
                    {userRole === 'ADMIN' && 'Choose a client or employee from the right to start messaging'}
                    {userRole === 'CLIENT' && 'Choose your admin from the right to start messaging'}
                    {userRole === 'EMPLOYEE' && 'Choose your admin from the right to start messaging'}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* RIGHT SIDE - User List with Tabs */}
          <div className="w-full md:w-96 border-l border-gray-200 flex flex-col bg-white">
            {/* Tabs (Only for Admin) */}
            {showTabs && (
              <div className="flex border-b border-gray-200">
                <button
                  onClick={() => {
                    setActiveTab('clients')
                    setSelectedGroup(null)
                    setSelectedConversation(null)
                  }}
                  className={`flex-1 px-4 py-3 font-medium text-sm transition-colors border-b-2 flex items-center justify-center gap-2 ${
                    activeTab === 'clients'
                      ? 'border-primary-accent text-primary-accent bg-blue-50'
                      : 'border-transparent text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <IoPerson size={18} />
                  Clients
                </button>
                <button
                  onClick={() => {
                    setActiveTab('employees')
                    setSelectedGroup(null)
                    setSelectedConversation(null)
                  }}
                  className={`flex-1 px-4 py-3 font-medium text-sm transition-colors border-b-2 flex items-center justify-center gap-2 ${
                    activeTab === 'employees'
                      ? 'border-primary-accent text-primary-accent bg-blue-50'
                      : 'border-transparent text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <IoPeople size={18} />
                  Employees
                </button>
                <button
                  onClick={() => {
                    setActiveTab('groups')
                    setSelectedConversation(null)
                  }}
                  className={`flex-1 px-4 py-3 font-medium text-sm transition-colors border-b-2 flex items-center justify-center gap-2 ${
                    activeTab === 'groups'
                      ? 'border-primary-accent text-primary-accent bg-blue-50'
                      : 'border-transparent text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <IoPeople size={18} />
                  Groups
                </button>
              </div>
            )}

            {/* Search and Create Group Button */}
            <div className="p-4 border-b border-gray-200">
              <div className="relative mb-2">
                <IoSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={`Search ${activeTab}...`}
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-accent focus:border-primary-accent outline-none"
                />
              </div>
              {activeTab === 'groups' && userRole === 'ADMIN' && (
                <button
                  onClick={() => setShowCreateGroupModal(true)}
                  className="w-full mt-2 px-4 py-2 bg-primary-accent text-white rounded-lg hover:bg-primary-accent/90 transition-colors flex items-center justify-center gap-2 text-sm font-medium"
                >
                  <IoAdd size={18} />
                  Create Group
                </button>
              )}
            </div>

            {/* Role Info */}
            {activeTab !== 'groups' && (
              <div className="px-4 py-2 bg-blue-50 border-b border-blue-200 flex items-center justify-between">
                <p className="text-xs text-blue-800 flex items-center gap-1">
                  <IoBriefcase size={14} />
                  {userRole === 'ADMIN' && `${activeTab === 'clients' ? 'Your Clients' : 'Your Employees'}`}
                  {userRole === 'CLIENT' && 'Your Admin'}
                  {userRole === 'EMPLOYEE' && 'Your Admin'}
                </p>
                {userRole === 'ADMIN' && (
                  <span className="text-xs text-blue-600">
                    ({activeTab === 'clients' 
                      ? availableUsers.filter(u => u.role === 'CLIENT').length 
                      : availableUsers.filter(u => u.role === 'EMPLOYEE').length} {activeTab})
                  </span>
                )}
              </div>
            )}

            {/* User/Group List */}
            <div className="flex-1 overflow-y-auto">
              {activeTab === 'groups' ? (
                // Groups List
                groups.filter(group => {
                  if (searchQuery) {
                    const query = searchQuery.toLowerCase()
                    return group.name?.toLowerCase().includes(query)
                  }
                  return true
                }).length === 0 ? (
                  <div className="p-6 text-center text-secondary-text">
                    <IoPeople size={48} className="mx-auto mb-2 text-gray-300" />
                    <p>No groups found</p>
                    <p className="text-xs mt-1">
                      {userRole === 'ADMIN' && 'Create a group to start group messaging'}
                    </p>
                  </div>
                ) : (
                  groups.filter(group => {
                    if (searchQuery) {
                      const query = searchQuery.toLowerCase()
                      return group.name?.toLowerCase().includes(query)
                    }
                    return true
                  }).map((group) => (
                    <div
                      key={group.id}
                      onClick={() => handleSelectGroup(group)}
                      className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                        selectedGroup?.id === group.id ? 'bg-blue-50 border-l-4 border-l-primary-accent' : ''
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        {/* Avatar */}
                        <div className="w-12 h-12 rounded-full bg-primary-accent flex items-center justify-center flex-shrink-0">
                          <IoPeople size={20} className="text-white" />
                        </div>
                        
                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="font-semibold text-primary-text truncate">
                              {group.name}
                            </h4>
                            {group.last_message_time && (
                              <span className="text-xs text-secondary-text">
                                {new Date(group.last_message_time).toLocaleTimeString('en-US', { 
                                  hour: '2-digit', 
                                  minute: '2-digit' 
                                })}
                              </span>
                            )}
                          </div>
                          <div className="flex items-center justify-between">
                            <p className="text-sm text-secondary-text truncate">
                              {group.last_message || `${group.member_count || 0} member${group.member_count !== 1 ? 's' : ''}`}
                            </p>
                            {group.unread_count > 0 && (
                              <span className="bg-primary-accent text-white text-xs rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0 ml-2">
                                {group.unread_count}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )
              ) : (
                // Users List
                displayUsers.length === 0 ? (
                  <div className="p-6 text-center text-secondary-text">
                    <IoPerson size={48} className="mx-auto mb-2 text-gray-300" />
                    <p>No {activeTab} found</p>
                    <p className="text-xs mt-1">
                      {userRole === 'ADMIN' && (
                        availableUsers.length === 0 
                          ? `Add ${activeTab} to your company first` 
                          : `No ${activeTab} match your search`
                      )}
                      {userRole === 'CLIENT' && 'No admin available'}
                      {userRole === 'EMPLOYEE' && 'No admin available'}
                    </p>
                    {availableUsers.length > 0 && searchQuery && (
                      <button
                        onClick={() => setSearchQuery('')}
                        className="mt-2 text-xs text-primary-accent hover:underline"
                      >
                        Clear search
                      </button>
                    )}
                  </div>
                ) : (
                  displayUsers.map((conv) => (
                    <div
                      key={conv.other_user_id}
                      onClick={() => handleSelectUser(conv)}
                      className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                        selectedConversation?.other_user_id === conv.other_user_id ? 'bg-blue-50 border-l-4 border-l-primary-accent' : ''
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        {/* Avatar */}
                        <div className="w-12 h-12 rounded-full bg-primary-accent flex items-center justify-center flex-shrink-0">
                          <span className="text-white font-semibold text-sm">
                            {conv.other_user_name ? conv.other_user_name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() : '?'}
                          </span>
                        </div>
                        
                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="font-semibold text-primary-text truncate">
                              {conv.other_user_name}
                            </h4>
                            {conv.last_message_time && (
                              <span className="text-xs text-secondary-text">
                                {new Date(conv.last_message_time).toLocaleTimeString('en-US', { 
                                  hour: '2-digit', 
                                  minute: '2-digit' 
                                })}
                              </span>
                            )}
                          </div>
                        <div className="flex items-center justify-between">
                          <p className="text-sm text-secondary-text truncate">
                            {conv.last_message || conv.other_user_email || 'No messages yet'}
                          </p>
                          {conv.unread_count > 0 && (
                            <span className="bg-primary-accent text-white text-xs rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0 ml-2">
                              {conv.unread_count}
                            </span>
                          )}
                        </div>
                        {conv.other_user_role && (
                          <Badge 
                            variant="default" 
                            className={`text-xs mt-1 ${
                              conv.other_user_role === 'CLIENT' 
                                ? 'bg-green-100 text-green-700' 
                                : conv.other_user_role === 'EMPLOYEE'
                                ? 'bg-blue-100 text-blue-700'
                                : ''
                            }`}
                          >
                            {conv.other_user_role}
                          </Badge>
                        )}
                        </div>
                      </div>
                    </div>
                  ))
                )
              )}
            </div>
          </div>
        </div>
      </Card>

      {/* Create Group Modal */}
      {showCreateGroupModal && (
        <CreateGroupModal
          isOpen={showCreateGroupModal}
          onClose={() => setShowCreateGroupModal(false)}
          userId={userId}
          companyId={companyId}
          userRole={userRole}
          onGroupCreated={handleGroupCreated}
        />
      )}

      {/* Add Members Modal */}
      {showAddMembersModal && selectedGroup && (
        <AddMembersModal
          isOpen={showAddMembersModal}
          onClose={() => setShowAddMembersModal(false)}
          groupId={selectedGroup.id}
          userId={userId}
          companyId={companyId}
          userRole={userRole}
          existingMemberIds={groupMembers.map(m => m.id)}
          onMembersAdded={handleMembersAdded}
        />
      )}

      {/* View Group Members Modal */}
      {showViewMembersModal && selectedGroup && (
        <ViewGroupMembersModal
          isOpen={showViewMembersModal}
          onClose={() => setShowViewMembersModal(false)}
          groupId={selectedGroup.id}
          userId={userId}
          companyId={companyId}
          userRole={userRole}
          isCreator={selectedGroup.created_by === parseInt(userId)}
          onMemberRemoved={handleMemberRemoved}
        />
      )}
    </div>
  )
}

export default Messages
