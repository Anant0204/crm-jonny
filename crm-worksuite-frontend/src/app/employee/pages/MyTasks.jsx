import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../../context/AuthContext'
import { usePermissions } from '../../../context/PermissionsContext'
import DataTable from '../../../components/ui/DataTable'
import RightSideModal from '../../../components/ui/RightSideModal'
import Modal from '../../../components/ui/Modal'
import Badge from '../../../components/ui/Badge'
import Input from '../../../components/ui/Input'
import Button from '../../../components/ui/Button'
import RichTextEditor from '../../../components/ui/RichTextEditor'
import { tasksAPI, projectsAPI } from '../../../api'
import { 
  IoEye, 
  IoCreate, 
  IoAdd
} from 'react-icons/io5'

const MyTasks = () => {
  const navigate = useNavigate()
  const { user } = useAuth()
  const { canView, canAdd, canEdit, canDelete } = usePermissions()
  const userId = user?.id || localStorage.getItem('userId')
  const companyId = user?.company_id || localStorage.getItem('companyId')
  
  // Check if user can view tasks
  if (!canView('myTasks')) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-primary-text mb-2">Access Denied</h2>
          <p className="text-secondary-text">You don't have permission to view tasks.</p>
        </div>
      </div>
    )
  }
  
  // Modal states
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  
  // Task states
  const [selectedTask, setSelectedTask] = useState(null)
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [newStatus, setNewStatus] = useState('')
  
  // Add Task form
  const [taskFormData, setTaskFormData] = useState({
    title: '',
    project_id: '',
    description: '',
    priority: 'Medium',
    status: 'Incomplete',
    start_date: '',
    due_date: '',
    task_category: ''
  })
  const [projects, setProjects] = useState([])
  const [selectedProject, setSelectedProject] = useState(null)

  useEffect(() => {
    if (userId && companyId) {
      fetchTasks()
      fetchProjects()
    }
  }, [userId, companyId])

  const fetchTasks = async () => {
    try {
      setLoading(true)
      const response = await tasksAPI.getAll({ 
        assigned_to: userId,
        company_id: companyId 
      })
      if (response.data.success) {
        const fetchedTasks = response.data.data || []
        const transformedTasks = fetchedTasks.map(task => ({
          id: task.id,
          task: task.title || `Task #${task.id}`,
          project: task.project_name || task.projectName || 'N/A',
          priority: task.priority || 'Medium',
          status: task.status || 'Pending',
          dueDate: task.due_date ? new Date(task.due_date).toLocaleDateString() : 'N/A',
          ...task
        }))
        setTasks(transformedTasks)
      }
    } catch (error) {
      console.error('Error fetching tasks:', error)
      alert(error.response?.data?.error || 'Failed to fetch tasks')
    } finally {
      setLoading(false)
    }
  }

  const fetchProjects = async () => {
    try {
      const response = await projectsAPI.getAll({ company_id: companyId })
      if (response.data.success) {
        // Filter projects where employee is assigned
        const allProjects = response.data.data || []
        const userTasks = tasks.length > 0 ? tasks : await (async () => {
          const taskRes = await tasksAPI.getAll({ assigned_to: userId, company_id: companyId })
          return taskRes.data.success ? taskRes.data.data || [] : []
        })()
        const projectIds = [...new Set(userTasks.map(t => t.project_id).filter(Boolean))]
        const assignedProjects = allProjects.filter(p => projectIds.includes(p.id))
        setProjects(assignedProjects.length > 0 ? assignedProjects : allProjects)
      }
    } catch (error) {
      console.error('Error fetching projects:', error)
    }
  }


  const handleProjectChange = async (projectId) => {
    setTaskFormData({ ...taskFormData, project_id: projectId })
    if (projectId) {
      try {
        const response = await projectsAPI.getById(projectId, { company_id: companyId })
        if (response.data.success) {
          const project = response.data.data
          setSelectedProject(project)
          // Auto-fill based on project defaults
          setTaskFormData(prev => ({
            ...prev,
            project_id: projectId,
            priority: project.default_priority || prev.priority,
            status: 'Incomplete',
            task_category: project.default_category || prev.task_category
          }))
        }
      } catch (error) {
        console.error('Error fetching project:', error)
      }
    }
  }

  const handleAddTask = async () => {
    // Check permission
    if (!canAdd('myTasks')) {
      alert('You do not have permission to add tasks.')
      return
    }
    if (!taskFormData.title.trim()) {
      alert('Task title is required')
      return
    }

    try {
      const taskData = {
        company_id: companyId,
        title: taskFormData.title.trim(),
        description: taskFormData.description || null,
        project_id: taskFormData.project_id || null,
        assign_to: userId,
        status: taskFormData.status || 'Incomplete',
        priority: taskFormData.priority || 'Medium',
        start_date: taskFormData.start_date || null,
        due_date: taskFormData.due_date || null,
        deadline: taskFormData.due_date || null,
        task_category: taskFormData.task_category || null
      }

      const response = await tasksAPI.create(taskData)
      if (response.data.success) {
        alert('Task created successfully!')
        setIsAddTaskModalOpen(false)
        setTaskFormData({
          title: '',
          project_id: '',
          description: '',
          priority: 'Medium',
          status: 'Incomplete',
          start_date: '',
          due_date: '',
          task_category: ''
        })
        setSelectedProject(null)
        await fetchTasks()
      } else {
        alert(response.data.error || 'Failed to create task')
      }
    } catch (error) {
      console.error('Error creating task:', error)
      alert(error.response?.data?.error || 'Failed to create task')
    }
  }

  const handleView = (task) => {
    navigate(`/app/employee/my-tasks/${task.id}`)
  }

  const handleEdit = (task) => {
    setSelectedTask(task)
    setNewStatus(task.status || '')
    setIsEditModalOpen(true)
  }

  const handleUpdateStatus = async () => {
    if (!selectedTask || !newStatus) {
      alert('Please select a status')
      return
    }

    try {
      const response = await tasksAPI.update(selectedTask.id, { status: newStatus }, { company_id: companyId })
      if (response.data.success) {
        alert('Task status updated successfully!')
        await fetchTasks()
        setIsEditModalOpen(false)
        setSelectedTask(null)
      } else {
        alert(response.data.error || 'Failed to update task status')
      }
    } catch (error) {
      console.error('Error updating task:', error)
      alert(error.response?.data?.error || 'Failed to update task status')
    }
  }


  const formatDate = (dateStr) => {
    if (!dateStr) return '--'
    const date = new Date(dateStr)
    const day = String(date.getDate()).padStart(2, '0')
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const year = date.getFullYear()
    return `${day}-${month}-${year}`
  }

  const columns = [
    { 
      key: 'task', 
      label: 'Task',
      render: (value, row) => (
        <button
          onClick={() => handleView(row)}
          className="text-left text-primary-accent hover:underline font-medium"
        >
          {value}
        </button>
      )
    },
    { key: 'project', label: 'Project' },
    {
      key: 'priority',
      label: 'Priority',
      render: (value) => {
        const priorityColors = {
          High: 'danger',
          Medium: 'warning',
          Low: 'info',
        }
        return <Badge variant={priorityColors[value] || 'default'}>{value}</Badge>
      },
    },
    {
      key: 'status',
      label: 'Status',
      render: (value) => {
        const statusColors = {
          Pending: 'warning',
          'In Progress': 'info',
          Completed: 'success',
          'Incomplete': 'warning',
          'Doing': 'info',
          'Done': 'success',
        }
        return <Badge variant={statusColors[value] || 'default'}>{value}</Badge>
      },
    },
    { key: 'dueDate', label: 'Due Date' },
  ]

  const actions = (row) => (
    <div className="flex items-center justify-end gap-2">
      <button
        onClick={(e) => {
          e.stopPropagation()
          handleView(row)
        }}
        className="p-2 text-primary-accent hover:bg-primary-accent hover:bg-opacity-10 rounded transition-colors"
        title="View Details"
      >
        <IoEye size={18} />
      </button>
      {canEdit('myTasks') && (
        <button
          onClick={(e) => {
            e.stopPropagation()
            handleEdit(row)
          }}
          className="p-2 text-warning hover:bg-warning hover:bg-opacity-10 rounded transition-colors"
          title="Update Status"
        >
          <IoCreate size={18} />
        </button>
      )}
    </div>
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary-text">My Tasks</h1>
          <p className="text-secondary-text mt-1">View and manage your assigned tasks</p>
        </div>
        {canAdd('myTasks') && (
          <Button
            variant="primary"
            onClick={() => {
              setIsAddTaskModalOpen(true)
              fetchProjects()
            }}
            className="flex items-center gap-2"
          >
            <IoAdd size={20} />
            Add Task
          </Button>
        )}
      </div>

      {loading ? (
        <div className="text-center py-8">
          <p className="text-secondary-text">Loading tasks...</p>
        </div>
      ) : (
        <DataTable
          columns={columns}
          data={tasks}
          searchPlaceholder="Search tasks..."
          filters={true}
          filterConfig={[
            { key: 'status', label: 'Status', type: 'select', options: ['Pending', 'In Progress', 'Completed', 'Incomplete', 'Doing', 'Done'] },
            { key: 'priority', label: 'Priority', type: 'select', options: ['High', 'Medium', 'Low'] },
            { key: 'project', label: 'Project', type: 'text' },
          ]}
          actions={actions}
          bulkActions={false}
        />
      )}

      {/* Add Task Modal */}
      <Modal
        isOpen={isAddTaskModalOpen}
        onClose={() => {
          setIsAddTaskModalOpen(false)
          setTaskFormData({
            title: '',
            project_id: '',
            description: '',
            priority: 'Medium',
            status: 'Incomplete',
            start_date: '',
            due_date: '',
            task_category: ''
          })
          setSelectedProject(null)
        }}
        title="Add Task"
        size="lg"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-primary-text mb-2">
              Task Title <span className="text-red-500">*</span>
            </label>
            <Input
              value={taskFormData.title}
              onChange={(e) => setTaskFormData({ ...taskFormData, title: e.target.value })}
              placeholder="Enter task title"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-primary-text mb-2">
              Project
            </label>
            <select
              value={taskFormData.project_id}
              onChange={(e) => handleProjectChange(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-accent focus:border-primary-accent outline-none"
            >
              <option value="">-- Select Project --</option>
              {projects.map(project => (
                <option key={project.id} value={project.id}>
                  {project.project_name || project.name || `Project #${project.id}`}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-primary-text mb-2">
                Priority
              </label>
              <select
                value={taskFormData.priority}
                onChange={(e) => setTaskFormData({ ...taskFormData, priority: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-accent focus:border-primary-accent outline-none"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-primary-text mb-2">
                Task Category
              </label>
              <Input
                value={taskFormData.task_category}
                onChange={(e) => setTaskFormData({ ...taskFormData, task_category: e.target.value })}
                placeholder="Category"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-primary-text mb-2">
                Start Date
              </label>
              <Input
                type="date"
                value={taskFormData.start_date}
                onChange={(e) => setTaskFormData({ ...taskFormData, start_date: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-primary-text mb-2">
                Due Date
              </label>
              <Input
                type="date"
                value={taskFormData.due_date}
                onChange={(e) => setTaskFormData({ ...taskFormData, due_date: e.target.value })}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-primary-text mb-2">
              Description
            </label>
            <RichTextEditor
              value={taskFormData.description}
              onChange={(value) => setTaskFormData({ ...taskFormData, description: value })}
              placeholder="Enter task description..."
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              variant="outline"
              onClick={() => {
                setIsAddTaskModalOpen(false)
                setTaskFormData({
                  title: '',
                  project_id: '',
                  description: '',
                  priority: 'Medium',
                  status: 'Incomplete',
                  start_date: '',
                  due_date: '',
                  task_category: ''
                })
                setSelectedProject(null)
              }}
              className="flex-1"
            >
              Cancel
            </Button>
            {canAdd('myTasks') && (
              <Button variant="primary" onClick={handleAddTask} className="flex-1">
                Create Task
              </Button>
            )}
          </div>
        </div>
      </Modal>


      {/* Edit Status Modal */}
      <RightSideModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false)
          setSelectedTask(null)
          setNewStatus('')
        }}
        title="Update Task Status"
        width="max-w-md"
      >
        {selectedTask && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-primary-text mb-2">Task</label>
              <p className="text-primary-text">{selectedTask.task || selectedTask.title}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-primary-text mb-2">Status</label>
              <select
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-accent focus:border-primary-accent outline-none"
              >
                <option value="Incomplete">Incomplete</option>
                <option value="Doing">Doing</option>
                <option value="Done">Done</option>
              </select>
            </div>
            <div className="flex gap-3 pt-4">
              <Button
                variant="outline"
                onClick={() => {
                  setIsEditModalOpen(false)
                  setSelectedTask(null)
                  setNewStatus('')
                }}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button variant="primary" onClick={handleUpdateStatus} className="flex-1">
                Update Status
              </Button>
            </div>
          </div>
        )}
      </RightSideModal>
    </div>
  )
}

export default MyTasks
