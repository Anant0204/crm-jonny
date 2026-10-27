import { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAuth } from '../../../context/AuthContext'
import { usePermissions } from '../../../context/PermissionsContext'
import Badge from '../../../components/ui/Badge'
import Button from '../../../components/ui/Button'
import Modal from '../../../components/ui/Modal'
import RichTextEditor from '../../../components/ui/RichTextEditor'
import Input from '../../../components/ui/Input'
import { tasksAPI, timeTrackingAPI, employeesAPI } from '../../../api'
import { 
  IoArrowBack,
  IoPlay,
  IoPause,
  IoStop,
  IoCloudUpload,
  IoDocumentText,
  IoDownload,
  IoAdd,
  IoTime,
  IoList,
  IoChatbubble,
  IoFileTray,
  IoDocument,
  IoArchive,
  IoCodeWorking,
  IoPencil,
  IoTrash,
  IoAttach,
  IoPaperPlaneOutline
} from 'react-icons/io5'

const TaskDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()
  const { canView, canAdd, canEdit, canDelete } = usePermissions()
  const userId = user?.id || localStorage.getItem('userId')
  const companyId = user?.company_id || localStorage.getItem('companyId')
  
  // Check if user can view tasks
  useEffect(() => {
    if (canView && typeof canView === 'function' && !canView('myTasks')) {
      navigate('/app/employee/dashboard')
    }
  }, [canView, navigate])
  
  // Task states
  const [selectedTask, setSelectedTask] = useState(null)
  const [loading, setLoading] = useState(true)
  
  // Detail page states
  const [activeTab, setActiveTab] = useState('details')
  const [comments, setComments] = useState([])
  const [files, setFiles] = useState([])
  const [subTasks, setSubTasks] = useState([])
  const [timesheets, setTimesheets] = useState([])
  const [notes, setNotes] = useState([])
  const [history, setHistory] = useState([])
  const [commentText, setCommentText] = useState('')
  const [uploadFile, setUploadFile] = useState(null)
  
  // Notes modal states
  const [isNoteModalOpen, setIsNoteModalOpen] = useState(false)
  const [noteText, setNoteText] = useState('')
  const [editingNote, setEditingNote] = useState(null)
  
  // Subtask modal states
  const [isSubtaskModalOpen, setIsSubtaskModalOpen] = useState(false)
  const [editingSubtask, setEditingSubtask] = useState(null)
  const [subtaskFormData, setSubtaskFormData] = useState({
    title: '',
    description: '',
    start_date: '',
    due_date: '',
    assign_to: '',
    status: 'Incomplete',
    priority: 'Medium'
  })
  const [subtaskFiles, setSubtaskFiles] = useState([])
  const [subtaskUploadFile, setSubtaskUploadFile] = useState(null)
  const [employees, setEmployees] = useState([])
  
  // Timer states
  const [isTimerRunning, setIsTimerRunning] = useState(false)
  const [timerElapsedTime, setTimerElapsedTime] = useState(0)
  const [timerStartTime, setTimerStartTime] = useState(null)
  const timerIntervalRef = useRef(null)

  useEffect(() => {
    if (id && userId && companyId) {
      fetchTaskDetails()
    }
  }, [id, userId, companyId])

  useEffect(() => {
    if (selectedTask) {
      fetchComments()
      fetchFiles()
      fetchTimesheets()
      fetchNotes()
      fetchHistory()
      fetchSubtasks()
    }
  }, [selectedTask])

  useEffect(() => {
    if (companyId) {
      fetchEmployees()
    }
  }, [companyId])

  useEffect(() => {
    if (companyId) {
      fetchEmployees()
    }
  }, [companyId])

  // Timer effect
  useEffect(() => {
    if (isTimerRunning && timerStartTime) {
      timerIntervalRef.current = setInterval(() => {
        setTimerElapsedTime(Math.floor((Date.now() - timerStartTime) / 1000))
      }, 1000)
    } else {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current)
        timerIntervalRef.current = null
      }
    }
    return () => {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current)
      }
    }
  }, [isTimerRunning, timerStartTime])

  const fetchTaskDetails = async () => {
    try {
      setLoading(true)
      const params = { company_id: companyId, user_id: userId }
      const response = await tasksAPI.getById(id, params)
      if (response.data.success) {
        setSelectedTask(response.data.data)
      } else {
        alert('Task not found')
        navigate('/app/employee/my-tasks')
      }
    } catch (error) {
      console.error('Error fetching task details:', error)
      alert('Failed to fetch task details')
      navigate('/app/employee/my-tasks')
    } finally {
      setLoading(false)
    }
  }

  const fetchComments = async () => {
    if (!id) return
    try {
      const params = { company_id: companyId, user_id: userId }
      const response = await tasksAPI.getComments(id, params)
      if (response.data.success) {
        setComments(response.data.data || [])
      }
    } catch (error) {
      console.error('Error fetching comments:', error)
    }
  }

  const fetchFiles = async () => {
    if (!id) return
    try {
      const params = { company_id: companyId, user_id: userId }
      const response = await tasksAPI.getFiles(id, params)
      if (response.data.success) {
        setFiles(response.data.data || [])
      }
    } catch (error) {
      console.error('Error fetching files:', error)
    }
  }

  const fetchTimesheets = async () => {
    if (!id) return
    try {
      const params = { company_id: companyId, task_id: id }
      const response = await timeTrackingAPI.getAll(params)
      if (response.data.success) {
        setTimesheets(response.data.data || [])
      }
    } catch (error) {
      console.error('Error fetching timesheets:', error)
    }
  }

  const fetchNotes = async () => {
    if (!id) return
    try {
      const params = { company_id: companyId, user_id: userId }
      const response = await tasksAPI.getNotes(id, params)
      if (response.data.success) {
        setNotes(response.data.data || [])
      }
    } catch (error) {
      console.error('Error fetching notes:', error)
    }
  }

  const fetchHistory = async () => {
    if (!id) return
    try {
      setHistory([])
    } catch (error) {
      console.error('Error fetching history:', error)
    }
  }

  const fetchSubtasks = async () => {
    if (!id) return
    try {
      const params = { company_id: companyId }
      const response = await tasksAPI.getSubtasks(id, params)
      if (response.data.success) {
        setSubTasks(response.data.data || [])
      }
    } catch (error) {
      console.error('Error fetching subtasks:', error)
    }
  }

  const fetchEmployees = async () => {
    try {
      const response = await employeesAPI.getAll({ company_id: companyId })
      if (response.data.success) {
        setEmployees(response.data.data || [])
      }
    } catch (error) {
      console.error('Error fetching employees:', error)
    }
  }

  const handleAddComment = async () => {
    if (!commentText.trim()) {
      alert('Please enter a comment')
      return
    }

    try {
      const commentData = { 
        comment: commentText,
        company_id: companyId,
        user_id: userId
      }
      const response = await tasksAPI.addComment(id, commentData, { company_id: companyId })
      if (response.data.success) {
        alert('Comment added successfully!')
        setCommentText('')
        await fetchComments()
      } else {
        alert(response.data.error || 'Failed to add comment')
      }
    } catch (error) {
      console.error('Error adding comment:', error)
      alert(error.response?.data?.error || 'Failed to add comment')
    }
  }

  const handleUploadFile = async () => {
    if (!uploadFile) {
      alert('Please select a file')
      return
    }

    try {
      const formData = new FormData()
      formData.append('file', uploadFile)
      formData.append('company_id', companyId)
      formData.append('user_id', userId)
      
      const response = await tasksAPI.uploadFile(id, formData, { company_id: companyId })
      if (response.data.success) {
        alert('File uploaded successfully!')
        setUploadFile(null)
        await fetchFiles()
      } else {
        alert(response.data.error || 'Failed to upload file')
      }
    } catch (error) {
      console.error('Error uploading file:', error)
      alert(error.response?.data?.error || 'Failed to upload file')
    }
  }

  const handleDownloadFile = async (file) => {
    try {
      window.open(file.file_path, '_blank')
    } catch (error) {
      console.error('Error downloading file:', error)
      alert('Failed to download file')
    }
  }

  const handleStartTimer = () => {
    const now = Date.now()
    setTimerStartTime(now)
    setIsTimerRunning(true)
    setTimerElapsedTime(0)
  }

  const handlePauseTimer = () => {
    setIsTimerRunning(false)
  }

  const handleResumeTimer = () => {
    if (timerStartTime) {
      const pausedTime = timerElapsedTime
      const now = Date.now()
      const newStartTime = now - (pausedTime * 1000)
      setTimerStartTime(newStartTime)
      setIsTimerRunning(true)
    } else {
      handleStartTimer()
    }
  }

  const handleStopTimer = async () => {
    setIsTimerRunning(false)
    const hours = (timerElapsedTime / 3600).toFixed(2)
    
    try {
      if (selectedTask && timerElapsedTime > 0) {
        await timeTrackingAPI.create({
          user_id: userId,
          task_id: selectedTask.id,
          project_id: selectedTask.project_id || null,
          hours: parseFloat(hours),
          date: new Date().toISOString().split('T')[0],
          description: `Timer entry for task: ${selectedTask.title || selectedTask.task}`
        })
        alert(`Timer stopped. ${hours} hours logged.`)
        await fetchTimesheets()
      }
    } catch (error) {
      console.error('Error saving timer:', error)
    }
    
    setTimerElapsedTime(0)
    setTimerStartTime(null)
  }

  const handleAddNote = () => {
    setEditingNote(null)
    setNoteText('')
    setIsNoteModalOpen(true)
  }

  const handleEditNote = (note) => {
    setEditingNote(note)
    setNoteText(note.note || '')
    setIsNoteModalOpen(true)
  }

  const handleSaveNote = async () => {
    const textContent = noteText.replace(/<[^>]*>/g, '').trim()
    if (!textContent) {
      alert('Please enter a note')
      return
    }

    try {
      const noteData = {
        note: noteText,
        company_id: companyId,
        user_id: userId
      }
      const params = { company_id: companyId }

      if (editingNote) {
        const response = await tasksAPI.updateNote(id, editingNote.id, noteData, params)
        if (response.data.success) {
          alert('Note updated successfully!')
          setIsNoteModalOpen(false)
          setNoteText('')
          setEditingNote(null)
          await fetchNotes()
        } else {
          alert(response.data.error || 'Failed to update note')
        }
      } else {
        const response = await tasksAPI.addNote(id, noteData, params)
        if (response.data.success) {
          alert('Note added successfully!')
          setIsNoteModalOpen(false)
          setNoteText('')
          await fetchNotes()
        } else {
          alert(response.data.error || 'Failed to add note')
        }
      }
    } catch (error) {
      console.error('Error saving note:', error)
      alert(error.response?.data?.error || 'Failed to save note')
    }
  }

  const handleDeleteNote = async (noteId) => {
    if (!window.confirm('Are you sure you want to delete this note?')) return

    try {
      const params = { company_id: companyId }
      const response = await tasksAPI.deleteNote(id, noteId, params)
      if (response.data.success) {
        alert('Note deleted successfully!')
        await fetchNotes()
      } else {
        alert(response.data.error || 'Failed to delete note')
      }
    } catch (error) {
      console.error('Error deleting note:', error)
      alert(error.response?.data?.error || 'Failed to delete note')
    }
  }

  const handleAddSubtask = () => {
    setEditingSubtask(null)
    setSubtaskFormData({
      title: '',
      description: '',
      start_date: '',
      due_date: '',
      assign_to: '',
      status: 'Incomplete',
      priority: 'Medium'
    })
    setIsSubtaskModalOpen(true)
  }

  const handleEditSubtask = (subtask) => {
    setEditingSubtask(subtask)
    setSubtaskFormData({
      title: subtask.title || '',
      description: subtask.description || '',
      start_date: subtask.start_date ? subtask.start_date.split('T')[0] : '',
      due_date: subtask.due_date ? subtask.due_date.split('T')[0] : subtask.deadline ? subtask.deadline.split('T')[0] : '',
      assign_to: subtask.assign_to || subtask.assigned_to?.[0]?.id || '',
      status: subtask.status || 'Incomplete',
      priority: subtask.priority || 'Medium'
    })
    setIsSubtaskModalOpen(true)
  }

  const handleUploadSubtaskFile = async () => {
    if (!subtaskUploadFile) {
      alert('Please select a file')
      return
    }

    try {
      const formData = new FormData()
      formData.append('file', subtaskUploadFile)
      formData.append('company_id', companyId)
      formData.append('user_id', userId)
      formData.append('description', `File for subtask: ${subtaskFormData.title || 'Untitled'}`)
      
      const response = await tasksAPI.uploadFile(id, formData, { company_id: companyId })
      if (response.data.success) {
        alert('File uploaded successfully!')
        setSubtaskUploadFile(null)
        await fetchFiles() // Refresh files list
      } else {
        alert(response.data.error || 'Failed to upload file')
      }
    } catch (error) {
      console.error('Error uploading file:', error)
      alert(error.response?.data?.error || 'Failed to upload file')
    }
  }

  const handleSaveSubtask = async () => {
    if (!subtaskFormData.title.trim()) {
      alert('Title is required')
      return
    }

    try {
      // First upload file if selected
      if (subtaskUploadFile) {
        await handleUploadSubtaskFile()
      }

      const subtaskData = {
        title: subtaskFormData.title.trim(),
        description: subtaskFormData.description || null,
        start_date: subtaskFormData.start_date || null,
        due_date: subtaskFormData.due_date || null,
        deadline: subtaskFormData.due_date || null,
        assign_to: subtaskFormData.assign_to || null,
        status: subtaskFormData.status || 'Incomplete',
        priority: subtaskFormData.priority || 'Medium',
        company_id: companyId,
        user_id: userId
      }
      const params = { company_id: companyId }

      if (editingSubtask) {
        const response = await tasksAPI.updateSubtask(id, editingSubtask.id, subtaskData, params)
        if (response.data.success) {
          alert('Subtask updated successfully!')
          setIsSubtaskModalOpen(false)
          setSubtaskFormData({
            title: '',
            description: '',
            start_date: '',
            due_date: '',
            assign_to: '',
            status: 'Incomplete',
            priority: 'Medium'
          })
          setSubtaskUploadFile(null)
          setEditingSubtask(null)
          await fetchSubtasks()
        } else {
          alert(response.data.error || 'Failed to update subtask')
        }
      } else {
        const response = await tasksAPI.addSubtask(id, subtaskData, params)
        if (response.data.success) {
          alert('Subtask added successfully!')
          setIsSubtaskModalOpen(false)
          setSubtaskFormData({
            title: '',
            description: '',
            start_date: '',
            due_date: '',
            assign_to: '',
            status: 'Incomplete',
            priority: 'Medium'
          })
          setSubtaskUploadFile(null)
          await fetchSubtasks()
        } else {
          alert(response.data.error || 'Failed to add subtask')
        }
      }
    } catch (error) {
      console.error('Error saving subtask:', error)
      alert(error.response?.data?.error || 'Failed to save subtask')
    }
  }

  const handleDeleteSubtask = async (subtaskId) => {
    if (!window.confirm('Are you sure you want to delete this subtask?')) return

    try {
      const params = { company_id: companyId }
      const response = await tasksAPI.deleteSubtask(id, subtaskId, params)
      if (response.data.success) {
        alert('Subtask deleted successfully!')
        await fetchSubtasks()
      } else {
        alert(response.data.error || 'Failed to delete subtask')
      }
    } catch (error) {
      console.error('Error deleting subtask:', error)
      alert(error.response?.data?.error || 'Failed to delete subtask')
    }
  }

  const formatTimerTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600)
    const mins = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
  }

  const formatDate = (dateStr) => {
    if (!dateStr) return '--'
    const date = new Date(dateStr)
    const day = String(date.getDate()).padStart(2, '0')
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const year = date.getFullYear()
    return `${day}-${month}-${year}`
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-secondary-text">Loading task details...</p>
      </div>
    )
  }

  if (!selectedTask) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-secondary-text mb-4">Task not found</p>
          <Button onClick={() => navigate('/app/employee/my-tasks')}>
            Go Back
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header with Back Button */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate('/app/employee/my-tasks')}
          className="flex items-center gap-2 px-4 py-2 text-primary-text hover:bg-gray-100 rounded-lg transition-colors"
        >
          <IoArrowBack size={20} />
          <span className="font-medium">Back</span>
        </button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-primary-text">
            {selectedTask.title || selectedTask.task || `Task #${selectedTask.id}`}
          </h1>
          <p className="text-secondary-text mt-1">Task Details</p>
        </div>
      </div>

      {/* Timer Section */}
      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="text-sm font-medium text-secondary-text">Timer</div>
            <div className="text-2xl font-mono font-bold text-primary-text">
              {formatTimerTime(timerElapsedTime)}
            </div>
          </div>
          <div className="flex items-center gap-2">
            {!isTimerRunning ? (
              <button
                onClick={timerElapsedTime > 0 ? handleResumeTimer : handleStartTimer}
                className="flex items-center gap-2 px-4 py-2 bg-primary-accent text-white rounded-lg hover:bg-primary-accent/90 transition-colors font-medium"
              >
                <IoPlay size={18} />
                {timerElapsedTime > 0 ? 'Resume Timer' : 'Start Timer'}
              </button>
            ) : (
              <>
                <button
                  onClick={handlePauseTimer}
                  className="flex items-center gap-2 px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors font-medium"
                >
                  <IoPause size={18} />
                  Pause Timer
                </button>
                <button
                  onClick={handleStopTimer}
                  className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
                >
                  <IoStop size={18} />
                  Stop Timer
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Task Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium text-secondary-text">Project</label>
          <p className="text-primary-text mt-1">{selectedTask.project_name || selectedTask.project || '--'}</p>
        </div>
        <div>
          <label className="text-sm font-medium text-secondary-text">Priority</label>
          <div className="mt-1">
            <Badge
              variant={
                selectedTask.priority === 'High'
                  ? 'danger'
                  : selectedTask.priority === 'Medium'
                  ? 'warning'
                  : 'info'
              }
            >
              {selectedTask.priority || 'Medium'}
            </Badge>
          </div>
        </div>
        <div>
          <label className="text-sm font-medium text-secondary-text">Assigned To</label>
          <p className="text-primary-text mt-1">
            {selectedTask.assigned_to_name || user?.name || '--'}
          </p>
        </div>
        <div>
          <label className="text-sm font-medium text-secondary-text">Short Code</label>
          <p className="text-primary-text mt-1">{selectedTask.code || selectedTask.task_code || '--'}</p>
        </div>
        <div>
          <label className="text-sm font-medium text-secondary-text">Milestones</label>
          <p className="text-primary-text mt-1">{selectedTask.milestone || '--'}</p>
        </div>
        <div>
          <label className="text-sm font-medium text-secondary-text">Assigned By</label>
          <p className="text-primary-text mt-1">{selectedTask.created_by_name || '--'}</p>
        </div>
        <div>
          <label className="text-sm font-medium text-secondary-text">Label</label>
          <p className="text-primary-text mt-1">
            {selectedTask.labels && selectedTask.labels.length > 0 
              ? selectedTask.labels.join(', ') 
              : '--'}
          </p>
        </div>
        <div>
          <label className="text-sm font-medium text-secondary-text">Task Category</label>
          <p className="text-primary-text mt-1">{selectedTask.task_category || '--'}</p>
        </div>
        <div>
          <label className="text-sm font-medium text-secondary-text">Start Date</label>
          <p className="text-primary-text mt-1">
            {selectedTask.start_date ? formatDate(selectedTask.start_date) : '--'}
          </p>
        </div>
        <div>
          <label className="text-sm font-medium text-secondary-text">Due Date</label>
          <p className="text-primary-text mt-1">
            {selectedTask.due_date ? formatDate(selectedTask.due_date) : '--'}
          </p>
        </div>
      </div>

      {selectedTask.description && (
        <div>
          <label className="text-sm font-medium text-secondary-text">Description</label>
          <div 
            className="text-primary-text mt-1 prose prose-sm max-w-none"
            dangerouslySetInnerHTML={{ __html: selectedTask.description }}
          />
        </div>
      )}

      {/* Tabs */}
      <div className="border-t border-gray-200 pt-4">
        <div className="flex gap-1 border-b border-gray-200 overflow-x-auto">
          {[
            { id: 'details', label: 'Details', icon: IoList },
            { id: 'files', label: 'Files', icon: IoFileTray },
            { id: 'subtask', label: 'Sub Task', icon: IoCodeWorking },
            { id: 'comment', label: 'Comment', icon: IoChatbubble },
            { id: 'timesheet', label: 'Timesheet', icon: IoTime },
            { id: 'notes', label: 'Notes', icon: IoDocument },
            { id: 'history', label: 'History', icon: IoArchive }
          ].map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors border-b-2 whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-primary-accent text-primary-accent'
                    : 'border-transparent text-secondary-text hover:text-primary-text'
                }`}
              >
                <Icon size={16} />
                {tab.label}
              </button>
            )
          })}
        </div>

        {/* Tab Content */}
        <div className="mt-4">
          {activeTab === 'details' && (
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-secondary-text">Status</label>
                <div className="mt-1">
                  <Badge
                    variant={
                      selectedTask.status === 'Completed' || selectedTask.status === 'Done'
                        ? 'success'
                        : selectedTask.status === 'In Progress' || selectedTask.status === 'Doing'
                        ? 'info'
                        : 'warning'
                    }
                  >
                    {selectedTask.status || 'Pending'}
                  </Badge>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-secondary-text">Hours Logged</label>
                <p className="text-primary-text mt-1">
                  {timesheets.reduce((sum, ts) => sum + (parseFloat(ts.hours) || 0), 0).toFixed(2)} hours
                </p>
              </div>
            </div>
          )}

          {activeTab === 'files' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-primary-text">Files</h3>
                <div>
                  <input
                    type="file"
                    id="file-upload"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files[0]) {
                        setUploadFile(e.target.files[0])
                        handleUploadFile()
                      }
                    }}
                  />
                  <label
                    htmlFor="file-upload"
                    className="flex items-center gap-2 px-4 py-2 bg-primary-accent text-white rounded-lg hover:bg-primary-accent/90 transition-colors cursor-pointer"
                  >
                    <IoCloudUpload size={18} />
                    Upload File
                  </label>
                </div>
              </div>
              <div className="space-y-2">
                {files.length === 0 ? (
                  <p className="text-secondary-text text-sm">No files uploaded</p>
                ) : (
                  files.map((file) => (
                    <div key={file.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <IoDocumentText size={24} className="text-primary-accent" />
                        <div>
                          <p className="text-sm font-medium text-primary-text">{file.file_name}</p>
                          <p className="text-xs text-secondary-text">
                            {file.file_size ? `${(file.file_size / 1024).toFixed(2)} KB` : ''} • {file.created_at ? new Date(file.created_at).toLocaleDateString() : ''}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => handleDownloadFile(file)}
                        className="p-2 text-primary-accent hover:bg-primary-accent hover:bg-opacity-10 rounded transition-colors"
                        title="Download"
                      >
                        <IoDownload size={18} />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {activeTab === 'subtask' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-primary-text">Sub Tasks</h3>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={handleAddSubtask}
                  className="flex items-center gap-2"
                >
                  <IoAdd size={16} />
                  Add Sub Task
                </Button>
              </div>
              <div>
                {subTasks.length === 0 ? (
                  <p className="text-secondary-text text-sm">No sub tasks</p>
                ) : (
                  <div className="space-y-3">
                    {subTasks.map((subtask) => (
                      <div key={subtask.id} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h4 className="text-base font-semibold text-primary-text">{subtask.title}</h4>
                              <Badge
                                variant={
                                  subtask.status === 'Done' || subtask.status === 'Completed'
                                    ? 'success'
                                    : subtask.status === 'Doing' || subtask.status === 'In Progress'
                                    ? 'info'
                                    : 'warning'
                                }
                              >
                                {subtask.status || 'Incomplete'}
                              </Badge>
                              <Badge
                                variant={
                                  subtask.priority === 'High'
                                    ? 'danger'
                                    : subtask.priority === 'Medium'
                                    ? 'warning'
                                    : 'info'
                                }
                              >
                                {subtask.priority || 'Medium'}
                              </Badge>
                            </div>
                            {subtask.description && (
                              <p className="text-sm text-primary-text mb-2">{subtask.description}</p>
                            )}
                            <div className="flex items-center gap-4 text-xs text-secondary-text">
                              {subtask.start_date && (
                                <span>Start: {new Date(subtask.start_date).toLocaleDateString()}</span>
                              )}
                              {subtask.due_date && (
                                <span>Due: {new Date(subtask.due_date).toLocaleDateString()}</span>
                              )}
                              {subtask.assigned_to_name && (
                                <span>Assigned: {subtask.assigned_to_name}</span>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center gap-2 ml-4">
                            <button
                              onClick={() => handleEditSubtask(subtask)}
                              className="p-2 text-primary-accent hover:bg-primary-accent hover:bg-opacity-10 rounded transition-colors"
                              title="Edit Subtask"
                            >
                              <IoPencil size={18} />
                            </button>
                            <button
                              onClick={() => handleDeleteSubtask(subtask.id)}
                              className="p-2 text-red-600 hover:bg-red-600 hover:bg-opacity-10 rounded transition-colors"
                              title="Delete Subtask"
                            >
                              <IoTrash size={18} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'comment' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-primary-text">Comments</h3>
              </div>
              <div className="space-y-3">
                <div className="flex gap-2">
                  <textarea
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    rows={3}
                    className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-accent focus:border-primary-accent outline-none"
                    placeholder="Add a comment..."
                  />
                  <Button
                    variant="primary"
                    onClick={handleAddComment}
                    className="self-start"
                  >
                    Post
                  </Button>
                </div>
                <div className="space-y-3">
                  {comments.length === 0 ? (
                    <p className="text-secondary-text text-sm">No comments yet</p>
                  ) : (
                    comments.map((comment) => (
                      <div key={comment.id} className="p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <p className="text-sm font-medium text-primary-text">{comment.user_name || 'Unknown'}</p>
                            <p className="text-primary-text mt-1">{comment.comment}</p>
                            <p className="text-xs text-secondary-text mt-1">
                              {comment.created_at ? new Date(comment.created_at).toLocaleString() : ''}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'timesheet' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-primary-text">Timesheet</h3>
              <div className="space-y-2">
                {timesheets.length === 0 ? (
                  <p className="text-secondary-text text-sm">No time entries</p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-2 text-left">Date</th>
                          <th className="px-4 py-2 text-left">Hours</th>
                          <th className="px-4 py-2 text-left">Description</th>
                        </tr>
                      </thead>
                      <tbody>
                        {timesheets.map((ts) => (
                          <tr key={ts.id} className="border-b">
                            <td className="px-4 py-2">{ts.date ? formatDate(ts.date) : '--'}</td>
                            <td className="px-4 py-2">{ts.hours || '0'}</td>
                            <td className="px-4 py-2">{ts.description || '--'}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'notes' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-primary-text">Notes</h3>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={handleAddNote}
                  className="flex items-center gap-2"
                >
                  <IoAdd size={16} />
                  Add Note
                </Button>
              </div>
              <div>
                {notes.length === 0 ? (
                  <p className="text-secondary-text text-sm">No notes</p>
                ) : (
                  <div className="space-y-3">
                    {notes.map((note) => (
                      <div key={note.id} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <p className="text-sm font-medium text-primary-text">{note.user_name || 'Unknown'}</p>
                              <span className="text-xs text-secondary-text">
                                {note.created_at ? new Date(note.created_at).toLocaleString() : ''}
                              </span>
                            </div>
                            <div 
                              className="text-primary-text prose prose-sm max-w-none"
                              dangerouslySetInnerHTML={{ __html: note.note }}
                            />
                          </div>
                          <div className="flex items-center gap-2 ml-4">
                            <button
                              onClick={() => handleEditNote(note)}
                              className="p-2 text-primary-accent hover:bg-primary-accent hover:bg-opacity-10 rounded transition-colors"
                              title="Edit Note"
                            >
                              <IoPencil size={18} />
                            </button>
                            <button
                              onClick={() => handleDeleteNote(note.id)}
                              className="p-2 text-red-600 hover:bg-red-600 hover:bg-opacity-10 rounded transition-colors"
                              title="Delete Note"
                            >
                              <IoTrash size={18} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'history' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-primary-text">History</h3>
              <div>
                {history.length === 0 ? (
                  <p className="text-secondary-text text-sm">No history available</p>
                ) : (
                  <div className="space-y-2">
                    {history.map((item) => (
                      <div key={item.id} className="p-3 bg-gray-50 rounded-lg">
                        <p className="text-primary-text">{item.description}</p>
                        <p className="text-xs text-secondary-text mt-1">
                          {item.created_at ? new Date(item.created_at).toLocaleString() : ''}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Add/Edit Note Modal with Rich Text Editor - Image style */}
      <Modal
        isOpen={isNoteModalOpen}
        onClose={() => {
          setIsNoteModalOpen(false)
          setNoteText('')
          setEditingNote(null)
        }}
        title={editingNote ? 'EDIT NOTE' : 'ADD NOTE'}
        size="lg"
      >
        <div className="space-y-4">
          <div className="mt-2">
            <RichTextEditor
              value={noteText}
              onChange={(value) => setNoteText(value)}
              placeholder="Enter your note..."
            />
          </div>
          <div className="flex gap-3 pt-4 justify-end">
            <Button
              variant="outline"
              onClick={() => {
                setIsNoteModalOpen(false)
                setNoteText('')
                setEditingNote(null)
              }}
              className="px-6"
            >
              Cancel
            </Button>
            <Button 
              variant="primary" 
              onClick={handleSaveNote}
              className="flex items-center justify-center gap-2 px-6 bg-green-600 hover:bg-green-700"
            >
              <IoPaperPlaneOutline size={18} />
              Submit
            </Button>
          </div>
        </div>
      </Modal>

      {/* Add/Edit Subtask Modal - All fields in one row as per image */}
      <Modal
        isOpen={isSubtaskModalOpen}
        onClose={() => {
          setIsSubtaskModalOpen(false)
          setSubtaskFormData({
            title: '',
            description: '',
            start_date: '',
            due_date: '',
            assign_to: '',
            status: 'Incomplete',
            priority: 'Medium'
          })
          setSubtaskUploadFile(null)
          setEditingSubtask(null)
        }}
        title={editingSubtask ? 'Edit Sub Task' : 'Add Sub Task'}
        size="lg"
      >
        <div className="space-y-4">
          {/* Title Field */}
          <div>
            <label className="block text-sm font-medium text-primary-text mb-2">
              Title <span className="text-red-500">*</span>
            </label>
            <Input
              value={subtaskFormData.title}
              onChange={(e) => setSubtaskFormData({ ...subtaskFormData, title: e.target.value })}
              placeholder="Enter a task title"
              required
            />
          </div>

          {/* Start Date, Due Date, and Assigned To in one row */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-primary-text mb-2">
                Start Date
              </label>
              <Input
                type="date"
                value={subtaskFormData.start_date}
                onChange={(e) => setSubtaskFormData({ ...subtaskFormData, start_date: e.target.value })}
                placeholder="Select Date"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-primary-text mb-2">
                Due Date
              </label>
              <Input
                type="date"
                value={subtaskFormData.due_date}
                onChange={(e) => setSubtaskFormData({ ...subtaskFormData, due_date: e.target.value })}
                placeholder="Select Date"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-primary-text mb-2">
                Assigned To
              </label>
              <select
                value={subtaskFormData.assign_to}
                onChange={(e) => setSubtaskFormData({ ...subtaskFormData, assign_to: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-accent focus:border-primary-accent outline-none appearance-none bg-white"
              >
                <option value="">--</option>
                {employees.map((emp) => (
                  <option key={emp.user_id || emp.id} value={emp.user_id || emp.id}>
                    {emp.name || emp.email}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Description Field */}
          <div>
            <label className="block text-sm font-medium text-primary-text mb-2">
              Description
            </label>
            <textarea
              value={subtaskFormData.description}
              onChange={(e) => setSubtaskFormData({ ...subtaskFormData, description: e.target.value })}
              rows={4}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-accent focus:border-primary-accent outline-none resize-none"
              placeholder="Enter description..."
            />
          </div>

          {/* Upload File Option */}
          <div>
            <label className="block text-sm font-medium text-primary-text mb-2">
              Upload File
            </label>
            <div className="flex items-center gap-3">
              <input
                type="file"
                id="subtask-file-upload"
                onChange={(e) => setSubtaskUploadFile(e.target.files[0])}
                className="hidden"
              />
              <label
                htmlFor="subtask-file-upload"
                className="flex items-center gap-2 px-4 py-2 bg-primary-accent text-white rounded-lg hover:bg-primary-accent/90 transition-colors cursor-pointer"
              >
                <IoCloudUpload size={18} />
                {subtaskUploadFile ? subtaskUploadFile.name : 'Choose File'}
              </label>
              {subtaskUploadFile && (
                <button
                  onClick={() => setSubtaskUploadFile(null)}
                  className="p-2 text-red-600 hover:bg-red-600 hover:bg-opacity-10 rounded transition-colors"
                  title="Remove File"
                >
                  <IoTrash size={18} />
                </button>
              )}
            </div>
            {subtaskUploadFile && (
              <p className="text-xs text-secondary-text mt-1">
                Selected: {subtaskUploadFile.name} ({(subtaskUploadFile.size / 1024).toFixed(2)} KB)
              </p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4 justify-end">
            <Button
              variant="outline"
              onClick={() => {
                setIsSubtaskModalOpen(false)
                setSubtaskFormData({
                  title: '',
                  description: '',
                  start_date: '',
                  due_date: '',
                  assign_to: '',
                  status: 'Incomplete',
                  priority: 'Medium'
                })
                setSubtaskUploadFile(null)
                setEditingSubtask(null)
              }}
            >
              Cancel
            </Button>
            <Button 
              variant="primary" 
              onClick={handleSaveSubtask} 
              className="flex items-center justify-center gap-2"
            >
              <IoPaperPlaneOutline size={18} />
              Submit
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default TaskDetail

