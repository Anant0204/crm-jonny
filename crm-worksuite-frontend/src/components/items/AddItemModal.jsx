import { useState, useEffect } from 'react'
import { itemsAPI } from '../../api'
import Input from '../ui/Input'
import Button from '../ui/Button'
import Modal from '../ui/Modal'
import { 
  IoClose,
  IoCloudUpload,
  IoCamera,
  IoCheckmark,
} from 'react-icons/io5'

const AddItemModal = ({ isOpen, onClose, companyId, onItemCreated, autoAddToDocument = false }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    unit_type: '',
    rate: '',
    show_in_client_portal: false,
    image: null,
  })
  const [imagePreview, setImagePreview] = useState(null)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (!isOpen) {
      resetForm()
    }
  }, [isOpen])

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      category: '',
      unit_type: '',
      rate: '',
      show_in_client_portal: false,
      image: null,
    })
    setImagePreview(null)
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setFormData({ ...formData, image: file })
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setSaving(true)
      const submitData = new FormData()
      submitData.append('company_id', companyId)
      submitData.append('title', formData.title)
      submitData.append('description', formData.description)
      submitData.append('category', formData.category)
      submitData.append('unit_type', formData.unit_type)
      submitData.append('rate', formData.rate)
      submitData.append('show_in_client_portal', formData.show_in_client_portal ? 1 : 0)
      if (formData.image) {
        submitData.append('image', formData.image)
      }

      const response = await itemsAPI.create(submitData)

      if (response.data.success) {
        const newItem = response.data.data
        resetForm()
        if (onItemCreated) {
          onItemCreated(newItem, autoAddToDocument)
        }
        if (!autoAddToDocument) {
          onClose()
        }
      } else {
        alert(response.data.error || 'Failed to save item')
      }
    } catch (error) {
      console.error('Error saving item:', error)
      alert(error.response?.data?.error || 'Failed to save item')
    } finally {
      setSaving(false)
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        resetForm()
        onClose()
      }}
      title="ADD ITEM"
      size="lg"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Left Column */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-primary-text mb-2">
                  Title <span className="text-red-500">*</span>
                </label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Title"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-primary-text mb-2">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Description"
                  rows={4}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-accent focus:border-primary-accent outline-none resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-primary-text mb-2">
                  Category <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-accent focus:border-primary-accent outline-none"
                  required
                >
                  <option value="">Select Category</option>
                  <option value="Design">Design</option>
                  <option value="Development">Development</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Services">Services</option>
                  <option value="Products">Products</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-primary-text mb-2">
                  Unit type <span className="text-red-500">*</span>
                </label>
                <Input
                  value={formData.unit_type}
                  onChange={(e) => setFormData({ ...formData, unit_type: e.target.value })}
                  placeholder="Unit type (Ex: hours, pc, etc.)"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-primary-text mb-2">
                  Rate <span className="text-red-500">*</span>
                </label>
                <Input
                  type="number"
                  step="0.01"
                  value={formData.rate}
                  onChange={(e) => setFormData({ ...formData, rate: e.target.value })}
                  placeholder="Rate"
                  required
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="show_in_client_portal"
                  checked={formData.show_in_client_portal}
                  onChange={(e) => setFormData({ ...formData, show_in_client_portal: e.target.checked })}
                  className="w-4 h-4 text-primary-accent rounded focus:ring-primary-accent"
                />
                <label htmlFor="show_in_client_portal" className="text-sm font-medium text-primary-text">
                  Show in client portal
                </label>
              </div>
            </div>

            {/* Right Column - Image Upload */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-primary-text mb-2">
                  Item Image
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-primary-accent transition-colors">
                  {imagePreview ? (
                    <div className="space-y-2">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="max-w-full h-48 object-contain mx-auto rounded"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setImagePreview(null)
                          setFormData({ ...formData, image: null })
                        }}
                        className="text-sm text-red-600 hover:text-red-700"
                      >
                        Remove Image
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <IoCamera className="mx-auto text-gray-400" size={48} />
                      <p className="text-sm text-secondary-text">No image uploaded</p>
                    </div>
                  )}
                  <label className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-primary-accent text-white rounded-lg cursor-pointer hover:bg-primary-accent/90 transition-colors">
                    <IoCloudUpload size={18} />
                    <span>Upload Image</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200">
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              resetForm()
              onClose()
            }}
            className="flex items-center gap-2"
            disabled={saving}
          >
            <IoClose size={18} />
            Close
          </Button>
          <Button
            type="submit"
            className="flex items-center gap-2"
            disabled={saving}
          >
            {saving ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                Saving...
              </>
            ) : (
              <>
                <IoCheckmark size={18} />
                Save
              </>
            )}
          </Button>
        </div>
      </form>
    </Modal>
  )
}

export default AddItemModal

