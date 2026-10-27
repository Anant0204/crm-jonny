import { useState, useEffect, useCallback } from 'react'
import { contractTemplatesAPI } from '../../../api'
import AddButton from '../../../components/ui/AddButton'
import Modal from '../../../components/ui/Modal'
import Input from '../../../components/ui/Input'
import Button from '../../../components/ui/Button'
import Card from '../../../components/ui/Card'
import Badge from '../../../components/ui/Badge'
import RichTextEditor from '../../../components/ui/RichTextEditor'
import { 
  IoCreate, 
  IoTrash, 
  IoEye, 
  IoDocumentText, 
  IoClose,
  IoCheckmark,
  IoStar,
  IoAdd
} from 'react-icons/io5'

const ContractTemplates = () => {
  const companyId = parseInt(localStorage.getItem('companyId') || 1, 10)
  const userId = parseInt(localStorage.getItem('userId') || 1, 10)
  
  const [templates, setTemplates] = useState([])
  const [loading, setLoading] = useState(true)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [selectedTemplate, setSelectedTemplate] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  
  const [formData, setFormData] = useState({
    template_name: '',
    template_type: 'General',
    description: '',
    content: '',
    is_default: false,
    is_active: true
  })

  useEffect(() => {
    fetchTemplates()
  }, [])

  const fetchTemplates = async () => {
    try {
      setLoading(true)
      const response = await contractTemplatesAPI.getAll({ company_id: companyId })
      if (response.data.success) {
        setTemplates(response.data.data || [])
      }
    } catch (error) {
      console.error('Error fetching templates:', error)
      setTemplates([])
    } finally {
      setLoading(false)
    }
  }

  const handleAdd = () => {
    setFormData({
      template_name: '',
      template_type: 'General',
      description: '',
      content: '',
      is_default: false,
      is_active: true
    })
    setSelectedTemplate(null)
    setIsAddModalOpen(true)
  }

  const handleEdit = (template) => {
    setSelectedTemplate(template)
    setFormData({
      template_name: template.template_name || '',
      template_type: template.template_type || 'General',
      description: template.description || '',
      content: template.content || '',
      is_default: template.is_default || false,
      is_active: template.is_active !== undefined ? template.is_active : true
    })
    setIsEditModalOpen(true)
  }

  const handleView = (template) => {
    setSelectedTemplate(template)
    setIsViewModalOpen(true)
  }

  const handleDelete = async (template) => {
    if (!window.confirm(`Are you sure you want to delete "${template.template_name}"?`)) {
      return
    }
    try {
      const response = await contractTemplatesAPI.delete(template.id, { company_id: companyId })
      if (response.data.success) {
        alert('Template deleted successfully!')
        await fetchTemplates()
      } else {
        alert(response.data.error || 'Failed to delete template')
      }
    } catch (error) {
      console.error('Error deleting template:', error)
      alert(error.response?.data?.error || 'Failed to delete template')
    }
  }

  const handleSave = async () => {
    if (!formData.template_name.trim()) {
      alert('Template name is required')
      return
    }
    if (!formData.content.trim()) {
      alert('Template content is required')
      return
    }

    try {
      const templateData = {
        ...formData,
        company_id: companyId,
        user_id: userId
      }

      if (isEditModalOpen && selectedTemplate) {
        const response = await contractTemplatesAPI.update(selectedTemplate.id, templateData, { company_id: companyId })
        if (response.data.success) {
          alert('Template updated successfully!')
          setIsEditModalOpen(false)
          setSelectedTemplate(null)
          await fetchTemplates()
        } else {
          alert(response.data.error || 'Failed to update template')
        }
      } else {
        const response = await contractTemplatesAPI.create(templateData)
        if (response.data.success) {
          alert('Template created successfully!')
          setIsAddModalOpen(false)
          await fetchTemplates()
        } else {
          alert(response.data.error || 'Failed to create template')
        }
      }
    } catch (error) {
      console.error('Error saving template:', error)
      alert(error.response?.data?.error || 'Failed to save template')
    }
  }

  const filteredTemplates = templates.filter(template => {
    if (!searchQuery) return true
    const query = searchQuery.toLowerCase()
    return (
      template.template_name?.toLowerCase().includes(query) ||
      template.template_type?.toLowerCase().includes(query) ||
      template.description?.toLowerCase().includes(query)
    )
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary-text">Contract Templates</h1>
          <p className="text-secondary-text mt-1">Create and manage contract templates with dynamic fields</p>
        </div>
        <AddButton onClick={handleAdd}>Add Template</AddButton>
      </div>

      {/* Search */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <IoDocumentText className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search templates..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          />
        </div>
      </div>

      {/* Templates Grid */}
      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-primary-accent border-t-transparent"></div>
          <p className="text-secondary-text mt-4">Loading templates...</p>
        </div>
      ) : filteredTemplates.length === 0 ? (
        <Card className="p-12 text-center">
          <IoDocumentText size={64} className="mx-auto mb-4 text-gray-300" />
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            {searchQuery ? 'No templates found' : 'No templates yet'}
          </h3>
          <p className="text-secondary-text mb-4">
            {searchQuery 
              ? 'Try a different search term' 
              : 'Create your first contract template to get started'}
          </p>
          {!searchQuery && (
            <Button onClick={handleAdd} className="bg-primary-accent hover:opacity-90 text-white">
              <IoAdd size={18} className="mr-2" />
              Create First Template
            </Button>
          )}
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTemplates.map((template) => (
            <Card key={template.id} className="p-4 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-lg font-semibold text-primary-text">{template.template_name}</h3>
                    {template.is_default && (
                      <Badge variant="success" className="flex items-center gap-1">
                        <IoStar size={12} />
                        Default
                      </Badge>
                    )}
                  </div>
                  <Badge variant="info" className="text-xs">
                    {template.template_type || 'General'}
                  </Badge>
                </div>
              </div>
              
              {template.description && (
                <p className="text-sm text-secondary-text mb-3 line-clamp-2">{template.description}</p>
              )}
              
              <div className="flex items-center gap-2 pt-3 border-t border-gray-200">
                <button
                  onClick={() => handleView(template)}
                  className="flex items-center gap-1 px-3 py-1.5 text-sm text-blue-600 hover:bg-blue-50 rounded transition-colors"
                >
                  <IoEye size={16} />
                  View
                </button>
                <button
                  onClick={() => handleEdit(template)}
                  className="flex items-center gap-1 px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-50 rounded transition-colors"
                >
                  <IoCreate size={16} />
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(template)}
                  className="flex items-center gap-1 px-3 py-1.5 text-sm text-red-600 hover:bg-red-50 rounded transition-colors ml-auto"
                >
                  <IoTrash size={16} />
                  Delete
                </button>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Add/Edit Template Modal */}
      <Modal
        isOpen={isAddModalOpen || isEditModalOpen}
        onClose={() => {
          setIsAddModalOpen(false)
          setIsEditModalOpen(false)
          setSelectedTemplate(null)
          setFormData({
            template_name: '',
            template_type: 'General',
            description: '',
            content: '',
            is_default: false,
            is_active: true
          })
        }}
        title={isEditModalOpen ? 'Edit Template' : 'Add Template'}
        size="lg"
      >
        <div className="space-y-4">
          <Input
            label="Template Name"
            value={formData.template_name}
            onChange={(e) => setFormData({ ...formData, template_name: e.target.value })}
            placeholder="e.g., Service Agreement Template"
            required
          />
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Template Type</label>
            <select
              value={formData.template_type}
              onChange={(e) => setFormData({ ...formData, template_type: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            >
              <option value="General">General</option>
              <option value="Service Agreement">Service Agreement</option>
              <option value="NDA">NDA (Non-Disclosure Agreement)</option>
              <option value="Employment">Employment Contract</option>
              <option value="Consulting">Consulting Agreement</option>
              <option value="Sales">Sales Contract</option>
              <option value="Custom">Custom</option>
            </select>
          </div>

          <Input
            label="Description (Optional)"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Brief description of this template"
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Template Content <span className="text-red-500">*</span>
            </label>
            <div className="mb-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-xs text-blue-800 font-medium mb-1">Available Dynamic Fields:</p>
              <div className="text-xs text-blue-700 space-y-1">
                <p><code>{'{CLIENT_NAME}'}</code> - Client/Company Name</p>
                <p><code>{'{PROJECT_NAME}'}</code> - Project Name</p>
                <p><code>{'{CONTRACT_NUMBER}'}</code> - Contract Number</p>
                <p><code>{'{CONTRACT_DATE}'}</code> - Contract Date</p>
                <p><code>{'{VALID_UNTIL}'}</code> - Valid Until Date</p>
                <p><code>{'{CONTRACT_AMOUNT}'}</code> - Total Contract Amount</p>
                <p><code>{'{CLIENT_ADDRESS}'}</code> - Client Address</p>
                <p><code>{'{ITEMS_LIST}'}</code> - Contract Items List</p>
              </div>
            </div>
            <RichTextEditor
              value={formData.content}
              onChange={(content) => setFormData({ ...formData, content })}
              placeholder="Enter template content. Use {CLIENT_NAME}, {PROJECT_NAME}, {CONTRACT_AMOUNT}, etc. for dynamic fields..."
            />
          </div>

          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.is_default}
                onChange={(e) => setFormData({ ...formData, is_default: e.target.checked })}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">Set as Default Template</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.is_active}
                onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">Active</span>
            </label>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200">
            <Button
              variant="outline"
              onClick={() => {
                setIsAddModalOpen(false)
                setIsEditModalOpen(false)
                setSelectedTemplate(null)
              }}
            >
              <IoClose size={16} className="mr-1" />
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              className="bg-primary-accent hover:opacity-90 text-white"
            >
              <IoCheckmark size={18} className="mr-1" />
              {isEditModalOpen ? 'Update' : 'Create'} Template
            </Button>
          </div>
        </div>
      </Modal>

      {/* View Template Modal */}
      <Modal
        isOpen={isViewModalOpen}
        onClose={() => {
          setIsViewModalOpen(false)
          setSelectedTemplate(null)
        }}
        title={selectedTemplate?.template_name || 'Template Preview'}
        size="lg"
      >
        {selectedTemplate && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Type</label>
                <p className="text-sm font-medium text-gray-900">{selectedTemplate.template_type || 'General'}</p>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Status</label>
                <div>
                  {selectedTemplate.is_default && (
                    <Badge variant="success" className="mr-2">
                      <IoStar size={12} className="mr-1" />
                      Default
                    </Badge>
                  )}
                  <Badge variant={selectedTemplate.is_active ? 'success' : 'warning'}>
                    {selectedTemplate.is_active ? 'Active' : 'Inactive'}
                  </Badge>
                </div>
              </div>
            </div>
            
            {selectedTemplate.description && (
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Description</label>
                <p className="text-sm text-gray-700">{selectedTemplate.description}</p>
              </div>
            )}

            <div>
              <label className="block text-xs font-medium text-gray-500 mb-2">Template Content</label>
              <div className="border border-gray-200 rounded-lg p-4 bg-gray-50 max-h-96 overflow-y-auto">
                <div 
                  className="prose max-w-none"
                  dangerouslySetInnerHTML={{ __html: selectedTemplate.content || '' }}
                />
              </div>
            </div>

            <div className="flex justify-end pt-4 border-t border-gray-200">
              <Button
                variant="outline"
                onClick={() => {
                  setIsViewModalOpen(false)
                  setSelectedTemplate(null)
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

export default ContractTemplates

