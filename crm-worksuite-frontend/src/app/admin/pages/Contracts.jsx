import { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "../../../components/ui/Modal";
import Input from "../../../components/ui/Input";
import Button from "../../../components/ui/Button";
import Card from "../../../components/ui/Card";
import AddButton from "../../../components/ui/AddButton";
import {
  contractsAPI,
  contractTemplatesAPI,
  clientsAPI,
  projectsAPI,
  leadsAPI,
  itemsAPI,
} from "../../../api";
import RichTextEditor from "../../../components/ui/RichTextEditor";
import {
  IoAdd,
  IoClose,
  IoSearch,
  IoFilter,
  IoDownload,
  IoChevronDown,
  IoChevronUp,
  IoEllipsisVertical,
  IoCheckmarkCircle,
  IoTrash,
  IoCreate,
  IoEye,
  IoPrint,
  IoGrid,
  IoCheckmark,
  IoChevronBack,
  IoChevronForward,
  IoDocumentText,
  IoCopy,
  IoAttach,
  IoMic,
} from "react-icons/io5";

const Contracts = ({ leadId = null, clientId = null, embedded = false, companyId: propCompanyId = null }) => {
  const navigate = useNavigate();
  const companyId = propCompanyId || parseInt(localStorage.getItem("companyId") || 1, 10);
  const userId = parseInt(localStorage.getItem("userId") || 1, 10);

  // Modal states
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [showFilterPanel, setShowFilterPanel] = useState(false);

  // Data states
  const [contracts, setContracts] = useState([]);
  const [clients, setClients] = useState([]);
  const [leads, setLeads] = useState([]);
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedContract, setSelectedContract] = useState(null);
  const [catalogItems, setCatalogItems] = useState([]);
  const [contractTemplates, setContractTemplates] = useState([]);
  const [selectedTemplateId, setSelectedTemplateId] = useState("");
  const [templateContent, setTemplateContent] = useState("");
  const [isLoadingTemplate, setIsLoadingTemplate] = useState(false);
  const [isChangeTemplateModalOpen, setIsChangeTemplateModalOpen] = useState(false);
  const [templateSearchQuery, setTemplateSearchQuery] = useState("");
  const [templatePage, setTemplatePage] = useState(1);
  const [templatesPerPage, setTemplatesPerPage] = useState(10);

  // Filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [periodFilter, setPeriodFilter] = useState("yearly");
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [customDateStart, setCustomDateStart] = useState("");
  const [customDateEnd, setCustomDateEnd] = useState("");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Form state
  const [formData, setFormData] = useState({
    title: "",
    contract_date: new Date().toISOString().split("T")[0],
    valid_until: "",
    client_id: "",
    lead_id: "",
    project_id: "",
    tax: "",
    second_tax: "",
    note: "",
    amount: 0,
    status: "Draft",
    items: [],
    discount: 0,
    discount_type: "%",
    sub_total: 0,
    tax_amount: 0,
    discount_amount: 0,
  });

  // File upload state
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);

  // Calculate totals helper - includes sub_total, tax, discount, and total
  const calculateTotals = (items, discount = 0, discountType = '%') => {
    let subTotal = 0
    let taxAmount = 0

    if (items && Array.isArray(items) && items.length > 0) {
      items.forEach(item => {
        const quantity = parseFloat(item.quantity) || 0
        const unitPrice = parseFloat(item.unit_price) || 0
        const amount = parseFloat(item.amount) || (quantity * unitPrice)
        const taxRate = parseFloat(item.tax_rate) || 0

        subTotal += amount
        // If tax_rate is provided, calculate tax separately
        if (taxRate > 0 && !item.amount) {
          const itemSubtotal = quantity * unitPrice
          taxAmount += (itemSubtotal * taxRate / 100)
        }
      })
    }

    // Calculate discount
    let discountAmount = 0
    const discountValue = parseFloat(discount) || 0
    if (discountType === '%') {
      discountAmount = (subTotal * discountValue) / 100
    } else {
      discountAmount = discountValue
    }

    // Calculate total: subTotal + tax - discount
    const total = subTotal + taxAmount - discountAmount

    return {
      sub_total: Math.round(subTotal * 100) / 100,
      tax_amount: Math.round(taxAmount * 100) / 100,
      discount_amount: Math.round(discountAmount * 100) / 100,
      total: Math.round(total * 100) / 100
    }
  }

  // Recalculate totals when items or discount change
  const recalculateAllTotals = (items, discount, discountType) => {
    return calculateTotals(items, discount, discountType)
  }

  const handleAddItem = () => {
    const newItem = {
      item_name: "",
      description: "",
      quantity: 1,
        unit: "Pcs", // Default to valid ENUM value
      unit_price: 0,
      amount: 0,
    };
    setFormData((prev) => {
      const updatedItems = [...(prev.items || []), newItem];
      const totals = recalculateAllTotals(updatedItems, prev.discount || 0, prev.discount_type || '%');
      return {
        ...prev,
        items: updatedItems,
        amount: totals.total,
        sub_total: totals.sub_total,
        tax_amount: totals.tax_amount,
        discount_amount: totals.discount_amount,
      };
    });
  };

  const handleRemoveItem = (index) => {
    setFormData((prev) => {
      const updatedItems = [...prev.items];
      updatedItems.splice(index, 1);
      const totals = recalculateAllTotals(updatedItems, prev.discount || 0, prev.discount_type || '%');
      return {
        ...prev,
        items: updatedItems,
        amount: totals.total,
        sub_total: totals.sub_total,
        tax_amount: totals.tax_amount,
        discount_amount: totals.discount_amount,
      };
    });
  };

  const handleItemChange = (index, field, value) => {
    setFormData((prev) => {
      const updatedItems = [...prev.items];
      const item = { ...updatedItems[index], [field]: value };

      // Auto-calculate amount
      if (field === "quantity" || field === "unit_price") {
        const qty = parseFloat(field === "quantity" ? value : item.quantity) || 0;
        const price = parseFloat(field === "unit_price" ? value : item.unit_price) || 0;
        item.amount = qty * price;
      }

      updatedItems[index] = item;
      const totals = recalculateAllTotals(updatedItems, prev.discount || 0, prev.discount_type || '%');
      return {
        ...prev,
        items: updatedItems,
        amount: totals.total,
        sub_total: totals.sub_total,
        tax_amount: totals.tax_amount,
        discount_amount: totals.discount_amount,
      };
    });
  };

  // Handle discount change
  const handleDiscountChange = (discount, discountType) => {
    setFormData((prev) => {
      const totals = recalculateAllTotals(prev.items || [], discount, discountType);
      return {
        ...prev,
        discount: discount,
        discount_type: discountType,
        amount: totals.total,
        sub_total: totals.sub_total,
        tax_amount: totals.tax_amount,
        discount_amount: totals.discount_amount,
      };
    });
  };

  // Status options
  const statusOptions = ["Draft", "Sent", "Accepted", "Declined", "Expired"];

  // Tax options
  const taxOptions = [
    { value: "", label: "-" },
    { value: "GST: 10%", label: "GST: 10%", rate: 10 },
    { value: "CGST: 18%", label: "CGST: 18%", rate: 18 },
    { value: "VAT: 10%", label: "VAT: 10%", rate: 10 },
  ];

  // Month names
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  // Fetch functions
  const fetchContracts = useCallback(async () => {
    try {
      setLoading(true);
      const params = { company_id: companyId };
      // Add leadId filter if provided
      if (leadId) {
        params.lead_id = leadId;
      }
      // Add clientId filter if provided
      if (clientId) {
        params.client_id = clientId;
      }
      const response = await contractsAPI.getAll(params);
      if (response.data.success) {
        const fetchedContracts = response.data.data || [];
        const transformedContracts = fetchedContracts.map((contract) => {
          const contractNum = contract.contract_number || `CONTRACT #${contract.id}`;
          return {
            id: contract.id,
            contractNumber: contractNum,
            title: contract.title || contract.subject || "-",
            client_id: contract.client_id,
            client_name: contract.client_name || "-",
            project_id: contract.project_id,
            project_name: contract.project_name || "-",
            contract_date: contract.contract_date || contract.start_date || "",
            valid_until: contract.valid_until || contract.end_date || "",
            amount: parseFloat(contract.amount || contract.total || 0),
            status: contract.status || "Draft",
            note: contract.note || contract.description || "",
            items: contract.items || [],
          };
        });
        setContracts(transformedContracts);
      }
    } catch (error) {
      console.error("Error fetching contracts:", error);
    } finally {
      setLoading(false);
    }
  }, [companyId, leadId, clientId]);

  const fetchClients = useCallback(async () => {
    try {
      const response = await clientsAPI.getAll({ company_id: companyId });
      if (response.data.success) {
        setClients(response.data.data || []);
      }
    } catch (error) {
      console.error("Error fetching clients:", error);
    }
  }, [companyId]);

  const fetchLeads = useCallback(async () => {
    try {
      const response = await leadsAPI.getAll({ company_id: companyId });
      if (response.data.success) {
        setLeads(response.data.data || []);
      }
    } catch (error) {
      console.error("Error fetching leads:", error);
    }
  }, [companyId]);

  const fetchProjects = useCallback(async () => {
    try {
      const response = await projectsAPI.getAll({ company_id: companyId });
      if (response.data.success) {
        setProjects(response.data.data || []);
      }
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  }, [companyId]);

  const fetchCatalogItems = useCallback(async () => {
    try {
      const response = await itemsAPI.getAll({ company_id: companyId });
      if (response.data.success) {
        setCatalogItems(response.data.data || []);
      }
    } catch (error) {
      console.error("Error fetching catalog items:", error);
      setCatalogItems([]);
    }
  }, [companyId]);

  const fetchContractTemplates = useCallback(async () => {
    try {
      const response = await contractTemplatesAPI.getAll({ company_id: companyId });
      if (response.data.success) {
        setContractTemplates(response.data.data || []);
      }
    } catch (error) {
      console.error("Error fetching contract templates:", error);
      setContractTemplates([]);
    }
  }, [companyId]);

  useEffect(() => {
    fetchContracts();
    fetchClients();
    fetchLeads();
    fetchProjects();
    fetchCatalogItems();
    fetchContractTemplates();
  }, [fetchContracts, fetchClients, fetchLeads, fetchProjects, fetchCatalogItems, fetchContractTemplates, leadId, clientId]);

  // Filter projects by client
  useEffect(() => {
    if (formData.client_id) {
      const clientId = parseInt(formData.client_id);
      const filtered = projects.filter((p) => p.client_id === clientId);
      setFilteredProjects(filtered);
    } else {
      setFilteredProjects([]);
    }
  }, [formData.client_id, projects]);

  // Auto-render template when client, items, or dates change (if template is selected)
  useEffect(() => {
    if (selectedTemplateId && formData.client_id) {
      // Small delay to avoid too many API calls
      const timer = setTimeout(() => {
        handleTemplateSelect(selectedTemplateId);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [selectedTemplateId, formData.client_id, formData.items, formData.contract_date, formData.valid_until]);

  // Reset form
  const resetForm = () => {
    const today = new Date();
    const validUntil = new Date(today);
    validUntil.setMonth(validUntil.getMonth() + 1);

    setFormData({
      title: "",
      contract_date: today.toISOString().split("T")[0],
      valid_until: validUntil.toISOString().split("T")[0],
      client_id: "",
      lead_id: "",
      project_id: "",
      tax: "",
      second_tax: "",
      note: "",
      amount: 0,
      status: "Draft",
      items: [],
      discount: 0,
      discount_type: "%",
      sub_total: 0,
      tax_amount: 0,
      discount_amount: 0,
    });
    setSelectedTemplateId("");
    setTemplateContent("");
  };

  // Handle template selection
  const handleTemplateSelect = async (templateId, showWarning = false) => {
    if (!templateId) {
      setSelectedTemplateId("");
      setTemplateContent("");
      return;
    }

    // Show warning if there's existing content
    if (showWarning && (formData.note || templateContent)) {
      const hasUnsavedChanges = formData.note && formData.note.trim() !== '';
      if (hasUnsavedChanges) {
        const confirmed = window.confirm(
          "Changing template will replace the current contract content. Are you sure you want to continue?"
        );
        if (!confirmed) {
          return;
        }
      }
    }

    setSelectedTemplateId(templateId);
    
    // If no client selected, just set the template ID and show message
    if (!formData.client_id) {
      // Try to get template content directly without rendering
      try {
        const templateResponse = await contractTemplatesAPI.getById(templateId, { company_id: companyId });
        if (templateResponse.data.success) {
          const template = templateResponse.data.data;
          setTemplateContent(template.content || '');
          setFormData(prev => ({ ...prev, note: template.content || '' }));
        }
      } catch (error) {
        console.error("Error loading template:", error);
      }
      return;
    }

    setIsLoadingTemplate(true);

    try {
      // Get selected client for template rendering
      const selectedClient = clients.find(c => c.id === parseInt(formData.client_id));
      
      // Calculate totals for amount
      const totals = recalculateAllTotals(formData.items || [], formData.discount || 0, formData.discount_type || '%');
      const contractAmount = totals.total || formData.amount || 0;

      // Generate contract number
      const contractNumber = isEditModalOpen && selectedContract 
        ? selectedContract.contractNumber 
        : `CONTRACT #${contracts.length + 1}`;

      const contractData = {
        contract_number: contractNumber,
        contract_date: formData.contract_date || new Date().toISOString().split("T")[0],
        valid_until: formData.valid_until || "",
        client_id: formData.client_id ? parseInt(formData.client_id) : null,
        client_name: selectedClient?.company_name || selectedClient?.client_name || selectedClient?.name || "",
        client_address: selectedClient?.address || "",
        amount: contractAmount,
        items: formData.items || [],
        note: formData.note || "",
        payment_terms: "Net 30",
        delivery_terms: "Standard delivery",
        warranty_terms: "Standard warranty",
        position_description: ""
      };

      const response = await contractTemplatesAPI.renderTemplate(templateId, { contractData }, { company_id: companyId });
      if (response.data.success) {
        const renderedContent = response.data.data.rendered_content;
        setTemplateContent(renderedContent);
        setFormData(prev => ({ ...prev, note: renderedContent }));
      }
    } catch (error) {
      console.error("Error rendering template:", error);
      alert("Failed to load template. Please try again.");
    } finally {
      setIsLoadingTemplate(false);
    }
  };

  // Handle save
  const handleSave = async () => {
    if (!formData.title) {
      alert("Title is required");
      return;
    }
    if (!formData.client_id && !formData.lead_id) {
      alert("Please select a client or lead");
      return;
    }

    try {
      // Create FormData if file is selected, otherwise use regular object
      const contractData = new FormData();
      
      // Add all contract data to FormData
      contractData.append('company_id', companyId);
      contractData.append('user_id', userId);
      contractData.append('created_by', userId);
      contractData.append('title', formData.title);
      contractData.append('subject', formData.title);
      contractData.append('contract_date', formData.contract_date);
      contractData.append('start_date', formData.contract_date);
      contractData.append('valid_until', formData.valid_until);
      contractData.append('end_date', formData.valid_until);
      if (formData.client_id) contractData.append('client_id', parseInt(formData.client_id));
      // Add leadId from prop if provided, otherwise use formData
      if (leadId) {
        contractData.append('lead_id', leadId);
      } else if (formData.lead_id) {
        contractData.append('lead_id', parseInt(formData.lead_id));
      }
      if (formData.project_id) contractData.append('project_id', parseInt(formData.project_id));
      if (formData.tax) contractData.append('tax', formData.tax);
      if (formData.second_tax) contractData.append('second_tax', formData.second_tax);
      if (formData.note) contractData.append('note', formData.note);
      if (formData.note) contractData.append('description', formData.note);
      
      // Calculate totals
      const totals = recalculateAllTotals(formData.items || [], formData.discount || 0, formData.discount_type || '%');
      
      contractData.append('amount', totals.total || formData.amount || 0);
      contractData.append('discount', formData.discount || 0);
      contractData.append('discount_type', formData.discount_type || '%');
      contractData.append('sub_total', totals.sub_total);
      contractData.append('tax_amount', totals.tax_amount);
      contractData.append('discount_amount', totals.discount_amount);
      contractData.append('status', formData.status || "Draft");
      contractData.append('items', JSON.stringify(formData.items || []));
      
      // Add file if selected
      if (selectedFile) {
        contractData.append('file', selectedFile);
      }

      if (isEditModalOpen && selectedContract) {
        const response = await contractsAPI.update(selectedContract.id, contractData, { company_id: companyId });
        if (response.data.success) {
          alert("Contract updated successfully!");
          await fetchContracts();
          setIsEditModalOpen(false);
          setSelectedContract(null);
          resetForm();
        }
      } else {
        const response = await contractsAPI.create(contractData);
        if (response.data.success) {
          const contractId = response.data.data?.id ?? response.data.data;
          setIsAddModalOpen(false);
          resetForm();
          if (contractId) {
            navigate(`/app/admin/contracts/${contractId}`);
          } else {
            await fetchContracts();
          }
        }
      }
    } catch (error) {
      console.error("Error saving contract:", error);
      alert(error.response?.data?.error || "Failed to save contract");
    }
  };

  // Handle edit
  const handleEdit = async (contract) => {
    try {
      const response = await contractsAPI.getById(contract.id, { company_id: companyId });
      if (response.data.success) {
        const data = response.data.data;
        setSelectedContract(contract);
        // Recalculate totals when loading for edit
        const items = data.items || []
        const discount = parseFloat(data.discount) || 0
        const discountType = data.discount_type || '%'
        const totals = recalculateAllTotals(items, discount, discountType)
        
        setFormData({
          title: data.title || data.subject || "",
          contract_date: data.contract_date ? data.contract_date.split("T")[0] : "",
          valid_until: data.valid_until ? data.valid_until.split("T")[0] : "",
          client_id: data.client_id?.toString() || "",
          lead_id: data.lead_id?.toString() || "",
          project_id: data.project_id?.toString() || "",
          tax: data.tax || "",
          second_tax: data.second_tax || "",
          note: data.note || data.description || "",
          amount: data.amount || data.total || 0,
          status: data.status || "Draft",
          items: items,
          amount: totals.total || data.amount || 0,
          discount: discount,
          discount_type: discountType,
          sub_total: totals.sub_total || data.sub_total || 0,
          tax_amount: totals.tax_amount || data.tax_amount || 0,
          discount_amount: totals.discount_amount || data.discount_amount || 0,
        });
        
        // Set template content if contract has note/description
        if (data.note || data.description) {
          setTemplateContent(data.note || data.description || "");
        }
        
        // If contract has a template_id, set it (optional - for future use)
        if (data.template_id) {
          setSelectedTemplateId(data.template_id.toString());
        }
        
        setIsEditModalOpen(true);
      }
    } catch (error) {
      console.error("Error fetching contract:", error);
      alert("Failed to load contract details");
    }
  };

  // Handle delete
  const handleDelete = async (contract) => {
    if (window.confirm(`Are you sure you want to delete ${contract.contractNumber}?`)) {
      try {
        const response = await contractsAPI.delete(contract.id, { company_id: companyId });
        if (response.data.success) {
          alert("Contract deleted successfully!");
          await fetchContracts();
        }
      } catch (error) {
        console.error("Error deleting contract:", error);
        alert(error.response?.data?.error || "Failed to delete contract");
      }
    }
  };

  // Handle view
  const handleView = (contract) => {
    navigate(`/app/admin/contracts/${contract.id}`);
  };

  // Handle copy
  const handleCopy = async (contract) => {
    try {
      const response = await contractsAPI.getById(contract.id, { company_id: companyId });
      if (response.data.success) {
        const data = response.data.data;
        const copyData = {
          ...data,
          title: `${data.title || data.subject} (Copy)`,
          status: "Draft",
        };
        delete copyData.id;
        delete copyData.created_at;
        delete copyData.updated_at;
        copyData.company_id = companyId;

        const createResponse = await contractsAPI.create(copyData);
        if (createResponse.data.success) {
          alert("Contract copied successfully!");
          await fetchContracts();
        }
      }
    } catch (error) {
      console.error("Error copying contract:", error);
      alert("Failed to copy contract");
    }
  };

  // Handle print
  const handlePrint = () => {
    const printWindow = window.open("", "_blank");
    const tableHTML = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Contracts List</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            h1 { text-align: center; margin-bottom: 20px; }
            table { width: 100%; border-collapse: collapse; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; font-size: 12px; }
            th { background-color: #f5f5f5; font-weight: bold; }
            tr:nth-child(even) { background-color: #fafafa; }
            .total-row { font-weight: bold; background-color: #f0f0f0; }
            @media print { button { display: none; } }
          </style>
        </head>
        <body>
          <h1>Contracts List</h1>
          <table>
            <thead>
              <tr>
                <th>Contract</th>
                <th>Title</th>
                <th>Client</th>
                <th>Project</th>
                <th>Contract date</th>
                <th>Valid until</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              ${filteredContracts.map((contract) => `
                <tr>
                  <td>${contract.contractNumber}</td>
                  <td>${contract.title}</td>
                  <td>${contract.client_name}</td>
                  <td>${contract.project_name || "-"}</td>
                  <td>${formatDate(contract.contract_date)}</td>
                  <td>${formatDate(contract.valid_until)}</td>
                  <td>$${parseFloat(contract.amount || 0).toFixed(2)}</td>
                  <td>${contract.status}</td>
                </tr>
              `).join("")}
              <tr class="total-row">
                <td colspan="6" style="text-align: right;">Total:</td>
                <td>$${totalAmount.toFixed(2)}</td>
                <td></td>
              </tr>
            </tbody>
          </table>
          <script>window.onload = function() { window.print(); }</script>
        </body>
      </html>
    `;
    printWindow.document.write(tableHTML);
    printWindow.document.close();
  };

  // Handle export Excel
  const handleExportExcel = () => {
    const csvData = filteredContracts.map((contract) => ({
      "Contract": contract.contractNumber,
      "Title": contract.title,
      "Client": contract.client_name,
      "Project": contract.project_name || "-",
      "Contract date": formatDate(contract.contract_date),
      "Valid until": formatDate(contract.valid_until),
      "Amount": contract.amount,
      "Status": contract.status,
    }));

    const headers = Object.keys(csvData[0] || {});
    const csvContent = [
      headers.join(","),
      ...csvData.map((row) => headers.map((h) => `"${row[h] || ""}"`).join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `contracts_${new Date().toISOString().split("T")[0]}.csv`;
    link.click();
  };

  // Filter handlers
  const handleApplyFilters = () => {
    fetchContracts();
  };

  const handleResetFilters = () => {
    setStatusFilter("All");
    setPeriodFilter("yearly");
    setSelectedYear(new Date().getFullYear());
    setSelectedMonth(new Date().getMonth() + 1);
    setCustomDateStart("");
    setCustomDateEnd("");
    setSearchQuery("");
    setShowFilterPanel(false);
    fetchContracts();
  };

  // Format helpers
  const formatDate = (dateString) => {
    if (!dateString) return "--";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).replace(/\//g, "-");
  };

  const formatCurrency = (amount) => {
    return `$${parseFloat(amount || 0).toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  // Status styles
  const getStatusStyle = (status) => {
    const s = status?.toLowerCase() || "";
    switch (s) {
      case "accepted":
        return "bg-blue-500 text-white";
      case "sent":
        return "bg-sky-400 text-white";
      case "draft":
        return "bg-gray-500 text-white";
      case "declined":
        return "bg-red-500 text-white";
      case "expired":
        return "bg-orange-500 text-white";
      default:
        return "bg-gray-400 text-white";
    }
  };

  // Filtered contracts
  const filteredContracts = contracts.filter((contract) => {
    if (!contract) return false;

    // Search filter
    if (searchQuery) {
      const searchLower = searchQuery.toLowerCase();
      if (
        !contract.contractNumber?.toLowerCase().includes(searchLower) &&
        !contract.title?.toLowerCase().includes(searchLower) &&
        !contract.client_name?.toLowerCase().includes(searchLower)
      ) {
        return false;
      }
    }

    // Status filter
    if (statusFilter !== "All" && contract.status?.toLowerCase() !== statusFilter.toLowerCase()) {
      return false;
    }

    // Date filters
    const contractDate = contract.contract_date ? new Date(contract.contract_date) : null;

    if (periodFilter === "monthly" && contractDate) {
      if (contractDate.getFullYear() !== selectedYear || contractDate.getMonth() + 1 !== selectedMonth) {
        return false;
      }
    }

    if (periodFilter === "yearly" && contractDate) {
      if (contractDate.getFullYear() !== selectedYear) {
        return false;
      }
    }

    if (customDateStart && contractDate) {
      if (contractDate < new Date(customDateStart)) return false;
    }

    if (customDateEnd && contractDate) {
      const endDate = new Date(customDateEnd);
      endDate.setHours(23, 59, 59, 999);
      if (contractDate > endDate) return false;
    }

    return true;
  });

  // Pagination
  const totalPages = Math.ceil(filteredContracts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedContracts = filteredContracts.slice(startIndex, endIndex);

  // Total amount
  const totalAmount = filteredContracts.reduce((sum, contract) => sum + (parseFloat(contract.amount) || 0), 0);

  return (
    <div className="space-y-4 bg-gray-100 min-h-screen p-4">
      {/* Top Navigation */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="flex items-center justify-between p-4">
          {/* Left Side - Title */}
          <h1 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
            <IoDocumentText className="text-gray-600" size={24} />
            Contracts
          </h1>

          {/* Right Side - Add Button */}
          <AddButton
            onClick={() => {
              resetForm();
              setIsAddModalOpen(true);
            }}
            label="+ Add contract"
            className="bg-green-500 hover:bg-green-600"
          />
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white rounded-lg shadow-sm p-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          {/* Left Side */}
          <div className="flex items-center gap-3">
            <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              <IoGrid size={18} className="text-gray-500" />
            </button>
            <button
              onClick={() => setShowFilterPanel(!showFilterPanel)}
              className={`flex items-center gap-2 px-4 py-2 text-sm border rounded-lg transition-colors ${
                showFilterPanel ? "border-blue-500 bg-blue-50 text-blue-600" : "border-gray-300 hover:bg-gray-50 text-gray-600"
              }`}
            >
              <IoAdd size={16} />
              + Add new filter
            </button>
          </div>

          {/* Right Side - Filters */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Status Dropdown */}
            <div className="relative">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="appearance-none px-4 py-2 pr-8 text-sm border border-gray-300 rounded-lg outline-none bg-white"
              >
                <option value="All">- Status -</option>
                {statusOptions.map((status) => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
              <IoChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
            </div>

            {/* Period Buttons */}
            <div className="flex items-center bg-gray-100 rounded-lg p-1">
              {["monthly", "yearly", "custom", "dynamic"].map((period) => (
                <button
                  key={period}
                  onClick={() => setPeriodFilter(period)}
                  className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                    periodFilter === period ? "bg-white shadow text-gray-800" : "text-gray-600 hover:text-gray-800"
                  }`}
                >
                  {period.charAt(0).toUpperCase() + period.slice(1)}
                </button>
              ))}
            </div>

            {/* Year Selector */}
            <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
              <button
                onClick={() => setSelectedYear(y => y - 1)}
                className="px-2 py-2 hover:bg-gray-100 border-r border-gray-300"
              >
                <IoChevronBack size={16} />
              </button>
              <span className="px-4 py-2 text-sm font-medium min-w-[80px] text-center">
                {selectedYear}
              </span>
              <button
                onClick={() => setSelectedYear(y => y + 1)}
                className="px-2 py-2 hover:bg-gray-100 border-l border-gray-300"
              >
                <IoChevronForward size={16} />
              </button>
            </div>

            {/* Apply & Reset Buttons */}
            <button onClick={handleApplyFilters} className="p-2 bg-green-500 text-white rounded-lg hover:bg-green-600" title="Apply filters">
              <IoCheckmark size={18} />
            </button>
            <button onClick={handleResetFilters} className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600" title="Reset filters">
              <IoClose size={18} />
            </button>
          </div>
        </div>

        {/* Expandable Filter Panel */}
        {showFilterPanel && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search contracts..."
                    className="w-full px-3 py-2 pl-9 text-sm border border-gray-300 rounded-lg outline-none"
                  />
                  <IoSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">From Date</label>
                <input
                  type="date"
                  value={customDateStart}
                  onChange={(e) => setCustomDateStart(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">To Date</label>
                <input
                  type="date"
                  value={customDateEnd}
                  onChange={(e) => setCustomDateEnd(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg outline-none"
                />
              </div>
              <div className="flex items-end gap-2">
                <button
                  onClick={() => { setCustomDateStart(""); setCustomDateEnd(""); setSearchQuery(""); }}
                  className="flex-1 px-4 py-2 text-sm text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Clear
                </button>
                <button
                  onClick={() => { handleApplyFilters(); setShowFilterPanel(false); }}
                  className="flex-1 px-4 py-2 text-sm text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                >
                  Apply
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Contracts Table */}
      <Card className="p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Contract</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Title</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Client</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Project</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Contract date</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Valid until</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Amount</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase"></th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan={9} className="px-4 py-8 text-center text-gray-500">Loading contracts...</td>
                </tr>
              ) : paginatedContracts.length === 0 ? (
                <tr>
                  <td colSpan={9} className="px-4 py-8 text-center text-gray-500">No contracts found</td>
                </tr>
              ) : (
                paginatedContracts.map((contract) => (
                  <tr key={contract.id} className="hover:bg-gray-50">
                    <td className="px-4 py-4 whitespace-nowrap">
                      <button
                        onClick={() => handleView(contract)}
                        className="text-blue-600 hover:text-blue-800 hover:underline font-medium"
                      >
                        {contract.contractNumber}
                      </button>
                    </td>
                    <td className="px-4 py-4 text-gray-700 max-w-xs truncate" title={contract.title}>
                      {contract.title}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-gray-700">
                      {contract.client_name}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-gray-600">
                      {contract.project_name || "-"}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-gray-600">
                      {formatDate(contract.contract_date)}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-gray-600">
                      {formatDate(contract.valid_until)}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-gray-800 font-medium">
                      {formatCurrency(contract.amount)}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${getStatusStyle(contract.status)}`}>
                        {contract.status}
                      </span>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-1">
                        <button onClick={() => handleCopy(contract)} className="p-1.5 text-gray-500 hover:bg-gray-100 rounded" title="Copy">
                          <IoCopy size={16} />
                        </button>
                        <button onClick={() => handleEdit(contract)} className="p-1.5 text-gray-500 hover:bg-gray-100 rounded" title="Edit">
                          <IoCreate size={16} />
                        </button>
                        <button onClick={() => handleDelete(contract)} className="p-1.5 text-red-500 hover:bg-red-50 rounded" title="Delete">
                          <IoClose size={16} />
                        </button>
                        <button onClick={() => handleView(contract)} className="p-1.5 text-gray-500 hover:bg-gray-100 rounded" title="More">
                          <IoEllipsisVertical size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Footer with Pagination and Total */}
        <div className="px-4 py-3 border-t border-gray-200 flex items-center justify-between bg-gray-50">
          <div className="flex items-center gap-4">
            <select
              value={itemsPerPage}
              onChange={(e) => { setItemsPerPage(parseInt(e.target.value)); setCurrentPage(1); }}
              className="px-2 py-1 text-sm border border-gray-300 rounded"
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </select>
            <span className="text-sm text-gray-600">
              {filteredContracts.length > 0 ? `${startIndex + 1}-${Math.min(endIndex, filteredContracts.length)}` : "0"} / {filteredContracts.length}
            </span>
          </div>
          <div className="text-sm font-bold text-gray-700">
            Total: {formatCurrency(totalAmount)}
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className={`p-1.5 border border-gray-300 rounded ${currentPage === 1 ? 'text-gray-400 cursor-not-allowed' : 'hover:bg-gray-100'}`}
            >
              <IoChevronBack size={16} />
            </button>
            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages || totalPages === 0}
              className={`p-1.5 border border-gray-300 rounded ${currentPage === totalPages || totalPages === 0 ? 'text-gray-400 cursor-not-allowed' : 'hover:bg-gray-100'}`}
            >
              <IoChevronForward size={16} />
            </button>
          </div>
        </div>
      </Card>

      {/* Add/Edit Contract Modal */}
      <Modal
        isOpen={isAddModalOpen || isEditModalOpen}
        onClose={() => { setIsAddModalOpen(false); setIsEditModalOpen(false); setSelectedContract(null); resetForm(); }}
        title={isEditModalOpen ? "Edit contract" : "Add contract"}
      >
        <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
          {/* Title */}
          <div className="flex items-center">
            <label className="w-32 text-sm font-medium text-gray-700">Title</label>
            <Input
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Enter contract title"
              className="flex-1"
            />
          </div>

          {/* Contract date */}
          <div className="flex items-center">
            <label className="w-32 text-sm font-medium text-gray-700">Contract date</label>
            <Input
              type="date"
              value={formData.contract_date}
              onChange={(e) => setFormData({ ...formData, contract_date: e.target.value })}
              className="flex-1"
            />
          </div>

          {/* Valid until */}
          <div className="flex items-center">
            <label className="w-32 text-sm font-medium text-gray-700">Valid until</label>
            <Input
              type="date"
              value={formData.valid_until}
              onChange={(e) => setFormData({ ...formData, valid_until: e.target.value })}
              className="flex-1"
            />
          </div>

          {/* Client/Lead */}
          <div className="flex items-center">
            <label className="w-32 text-sm font-medium text-gray-700">Client/Lead</label>
            <select
              value={formData.client_id || formData.lead_id}
              onChange={(e) => {
                const value = e.target.value;
                const isLead = value.startsWith("lead_");
                if (isLead) {
                  setFormData({ ...formData, lead_id: value.replace("lead_", ""), client_id: "", project_id: "" });
                } else {
                  setFormData({ ...formData, client_id: value, lead_id: "", project_id: "" });
                }
              }}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg outline-none"
            >
              <option value="">Select Client or Lead</option>
              <optgroup label="Clients">
                {clients.map((client) => (
                  <option key={client.id} value={client.id}>
                    {client.client_name || client.name}
                  </option>
                ))}
              </optgroup>
              <optgroup label="Leads">
                {leads.map((lead) => (
                  <option key={`lead_${lead.id}`} value={`lead_${lead.id}`}>
                    {lead.name || lead.company_name}
                  </option>
                ))}
              </optgroup>
            </select>
          </div>

          {/* Project */}
          <div className="flex items-center">
            <label className="w-32 text-sm font-medium text-gray-700">Project</label>
            <select
              value={formData.project_id}
              onChange={(e) => setFormData({ ...formData, project_id: e.target.value })}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg outline-none"
              disabled={!formData.client_id}
            >
              <option value="">Select Project</option>
              {filteredProjects.map((project) => (
                <option key={project.id} value={project.id}>
                  {project.project_name || project.name}
                </option>
              ))}
            </select>
          </div>

          {/* TAX */}
          <div className="flex items-center">
            <label className="w-32 text-sm font-medium text-gray-700">TAX</label>
            <select
              value={formData.tax}
              onChange={(e) => setFormData({ ...formData, tax: e.target.value })}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg outline-none"
            >
              {taxOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>

          {/* Second TAX */}
          <div className="flex items-center">
            <label className="w-32 text-sm font-medium text-gray-700">Second TAX</label>
            <select
              value={formData.second_tax}
              onChange={(e) => setFormData({ ...formData, second_tax: e.target.value })}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg outline-none"
            >
              {taxOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>

          {/* Contract Template Selection */}
          <div className="flex items-start border-t border-gray-200 pt-4">
            <label className="w-32 text-sm font-medium text-gray-700 pt-2">
              Select Template <span className="text-gray-400 text-xs font-normal">(Optional)</span>
            </label>
            <div className="flex-1">
              {contractTemplates.length === 0 ? (
                <div className="border border-gray-300 rounded-lg p-4 bg-blue-50">
                  <p className="text-sm text-blue-800 mb-2">
                    <strong>No templates available.</strong> Create contract templates in Settings to use them here.
                  </p>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => window.open('/app/admin/contract-templates', '_blank')}
                      className="text-sm text-blue-600 hover:text-blue-700 hover:underline font-medium"
                    >
                      Go to Contract Templates →
                    </button>
                    <span className="text-gray-400">|</span>
                    <button
                      type="button"
                      onClick={() => {
                        window.open('/app/admin/contract-templates', '_blank')
                        setTimeout(() => {
                          setIsAddModalOpen(false)
                          setIsEditModalOpen(false)
                        }, 100)
                      }}
                      className="text-sm text-green-600 hover:text-green-700 hover:underline font-medium"
                    >
                      Create Template Now
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <select
                    value={selectedTemplateId}
                    onChange={(e) => handleTemplateSelect(e.target.value)}
                    className="w-full px-3 py-2 border-2 border-blue-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white font-medium"
                  >
                    <option value="">-- Select Template to Auto-fill Content --</option>
                    {contractTemplates.map((template) => (
                      <option key={template.id} value={template.id}>
                        {template.template_name} {template.is_default ? "⭐ (Default)" : ""}
                      </option>
                    ))}
                  </select>
                  <p className="text-xs text-gray-600 mt-2 flex items-center gap-2">
                    <IoDocumentText size={14} className="text-blue-500" />
                    <span>
                      Select a template to automatically load contract content with dynamic fields (Client Name, Project Name, Amount, etc.)
                    </span>
                  </p>
                  {selectedTemplateId && (
                    <div className="mt-2 p-2 bg-green-50 border border-green-200 rounded text-xs text-green-700">
                      ✓ Template selected. Content will auto-load when you select a client.
                    </div>
                  )}
                </>
              )}
            </div>
          </div>

          {/* Contract Content / Note */}
          <div className="flex items-start border-t border-gray-200 pt-4">
            <label className="w-32 text-sm font-medium text-gray-700 pt-2">
              Contract Content <span className="text-red-500">*</span>
            </label>
            <div className="flex-1">
              {isLoadingTemplate ? (
                <div className="px-4 py-8 border-2 border-blue-300 rounded-lg bg-blue-50 text-center">
                  <div className="inline-block animate-spin rounded-full h-6 w-6 border-2 border-blue-600 border-t-transparent mb-2"></div>
                  <p className="text-sm text-blue-700 font-medium">Loading template content...</p>
                </div>
              ) : (
                <div className="border-2 border-gray-300 rounded-lg overflow-hidden">
                  <div className="flex items-center justify-between p-3 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-gray-50">
                    <div className="flex items-center gap-2">
                      <IoDocumentText size={18} className="text-blue-600" />
                      <span className="text-sm font-semibold text-gray-700">Contract Content Editor</span>
                      {selectedTemplateId && (
                        <span className="px-2 py-0.5 text-xs font-medium bg-blue-100 text-blue-700 rounded">
                          Template: {contractTemplates.find(t => t.id.toString() === selectedTemplateId)?.template_name}
                        </span>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => setIsChangeTemplateModalOpen(true)}
                      className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-white bg-blue-600 hover:bg-blue-700 rounded transition-colors shadow-sm"
                    >
                      <IoDocumentText size={14} />
                      {selectedTemplateId ? 'Change Template' : 'Select Template'}
                    </button>
                  </div>
                  <RichTextEditor
                    value={templateContent || formData.note}
                    onChange={(content) => {
                      setTemplateContent(content);
                      setFormData({ ...formData, note: content });
                    }}
                    placeholder={selectedTemplateId 
                      ? "Template content loaded. You can edit it here..." 
                      : "Enter contract terms and conditions, or select a template above to auto-fill content..."}
                  />
                </div>
              )}
              <div className="mt-2 space-y-1">
                <p className="text-xs text-gray-600">
                  <strong>Tip:</strong> {selectedTemplateId 
                    ? "Template content is loaded. Dynamic fields (Client Name, Project Name, Amount, etc.) will be replaced automatically."
                    : "Select a template from the dropdown above to auto-fill contract content with dynamic fields."}
                </p>
                {selectedTemplateId && (
                  <p className="text-xs text-blue-600">
                    💡 Template will auto-update when you change Client, Project, or Contract Items.
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Items Section */}
          <div className="mt-4 border-t border-gray-200 pt-4">
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-gray-700">
                Contract Items
              </label>
              <button
                type="button"
                onClick={handleAddItem}
                className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                <IoAdd size={16} />
                Add Item
              </button>
            </div>

            <div className="overflow-x-auto border border-gray-200 rounded-lg mb-4">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-3 py-2 text-left w-1/4">Item Name</th>
                    <th className="px-3 py-2 text-left w-1/3">Description</th>
                    <th className="px-3 py-2 text-right w-20">Qty</th>
                    <th className="px-3 py-2 text-right w-24">Unit Price</th>
                    <th className="px-3 py-2 text-right w-24">Amount</th>
                    <th className="px-3 py-2 text-center w-10"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {formData.items && formData.items.map((item, index) => (
                    <tr key={index}>
                      <td className="p-2 align-top">
                        <select
                          value={item.item_name}
                          onChange={(e) => {
                            const selectedItem = catalogItems.find((ci) => ci.title === e.target.value);
                            if (selectedItem) {
                              const updatedItems = [...formData.items];
                              // Normalize unit to valid ENUM value
                              const normalizeUnit = (unit) => {
                                if (!unit) return 'Pcs';
                                const validUnits = ['Pcs', 'Kg', 'Hours', 'Days'];
                                if (validUnits.includes(unit)) return unit;
                                const unitLower = String(unit).toLowerCase().trim();
                                if (unitLower.includes('pc') || unitLower.includes('piece')) return 'Pcs';
                                if (unitLower.includes('kg') || unitLower.includes('kilogram')) return 'Kg';
                                if (unitLower.includes('hour')) return 'Hours';
                                if (unitLower.includes('day')) return 'Days';
                                return 'Pcs'; // Default fallback
                              };
                              
                              updatedItems[index] = {
                                ...updatedItems[index],
                                item_name: selectedItem.title,
                                description: selectedItem.description || "",
                                unit_price: parseFloat(selectedItem.rate) || 0,
                                unit: normalizeUnit(selectedItem.unit_type || ""),
                                amount: (updatedItems[index].quantity || 1) * (parseFloat(selectedItem.rate) || 0),
                              };
                              const totals = recalculateAllTotals(updatedItems, formData.discount || 0, formData.discount_type || '%');
                              setFormData({
                                ...formData,
                                items: updatedItems,
                                amount: totals.total,
                                sub_total: totals.sub_total,
                                tax_amount: totals.tax_amount,
                                discount_amount: totals.discount_amount,
                              });
                            } else {
                              handleItemChange(index, "item_name", e.target.value);
                            }
                          }}
                          className="w-full px-2 py-1.5 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 outline-none bg-white"
                        >
                          <option value="">-- Select Item --</option>
                          {catalogItems.map((ci) => (
                            <option key={ci.id} value={ci.title}>{ci.title}</option>
                          ))}
                        </select>
                      </td>
                      <td className="p-2 align-top">
                        <textarea
                          value={item.description}
                          onChange={(e) => handleItemChange(index, "description", e.target.value)}
                          placeholder="Description"
                          rows={1}
                          className="w-full px-2 py-1.5 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 outline-none resize-y"
                        />
                      </td>
                      <td className="p-2 align-top">
                        <input
                          type="number"
                          min="0"
                          value={item.quantity}
                          onChange={(e) => handleItemChange(index, "quantity", e.target.value)}
                          className="w-full px-2 py-1.5 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 outline-none text-right"
                        />
                      </td>
                      <td className="p-2 align-top">
                        <input
                          type="number"
                          min="0"
                          step="0.01"
                          value={item.unit_price}
                          onChange={(e) => handleItemChange(index, "unit_price", e.target.value)}
                          className="w-full px-2 py-1.5 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 outline-none text-right"
                        />
                      </td>
                      <td className="p-2 align-top text-right font-medium pt-3">
                        {parseFloat(item.amount || 0).toFixed(2)}
                      </td>
                      <td className="p-2 align-top text-center pt-2">
                        <button
                          type="button"
                          onClick={() => handleRemoveItem(index)}
                          className="text-red-500 hover:text-red-700 transition-colors"
                        >
                          <IoTrash size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {(!formData.items || formData.items.length === 0) && (
                    <tr>
                      <td colSpan={6} className="px-4 py-8 text-center text-gray-500 italic">
                        No items added yet. Click "Add Item" to start.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Discount Section */}
            <div className="flex justify-end mb-4">
              <div className="w-80 bg-gray-50 p-4 rounded-lg border border-gray-200 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Sub Total:</span>
                  <span className="font-semibold text-gray-800">${(formData.sub_total || 0).toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Tax:</span>
                  <span className="font-semibold text-gray-800">${(formData.tax_amount || 0).toFixed(2)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex-1">
                    <label className="text-xs text-gray-600 mb-1 block">Discount:</label>
                    <div className="flex gap-2">
                      <input
                        type="number"
                        value={formData.discount || 0}
                        onChange={(e) => handleDiscountChange(parseFloat(e.target.value) || 0, formData.discount_type || '%')}
                        className="w-20 px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-primary-accent focus:border-primary-accent outline-none"
                        min="0"
                        step="0.01"
                      />
                      <select
                        value={formData.discount_type || '%'}
                        onChange={(e) => handleDiscountChange(formData.discount || 0, e.target.value)}
                        className="w-16 px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-primary-accent focus:border-primary-accent outline-none"
                      >
                        <option value="%">%</option>
                        <option value="fixed">$</option>
                      </select>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-gray-600 block mb-1">Discount Amount:</span>
                    <span className="font-semibold text-red-600">-${(formData.discount_amount || 0).toFixed(2)}</span>
                  </div>
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-gray-300">
                  <span className="text-lg font-bold text-gray-800">Total:</span>
                  <span className="text-lg font-bold text-primary-accent">${(formData.amount || formData.total || 0).toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Actions */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-200">
            <div className="flex items-center gap-2">
              <label className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg cursor-pointer transition-colors">
                <IoAttach size={16} /> Upload File
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      setSelectedFile(e.target.files[0]);
                    }
                  }}
                  className="hidden"
                  accept="*/*"
                />
              </label>
              {selectedFile && (
                <span className="text-xs text-gray-500 truncate max-w-[150px]" title={selectedFile.name}>
                  {selectedFile.name}
                </span>
              )}
              <button className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg">
                <IoMic size={16} />
              </button>
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                onClick={() => { setIsAddModalOpen(false); setIsEditModalOpen(false); setSelectedContract(null); resetForm(); }}
              >
                Close
              </Button>
              <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700 text-white">
                <IoCheckmark size={18} className="mr-1" /> Save
              </Button>
            </div>
          </div>
        </div>
      </Modal>

      {/* Change Template Modal */}
      <Modal
        isOpen={isChangeTemplateModalOpen}
        onClose={() => {
          setIsChangeTemplateModalOpen(false);
          setTemplateSearchQuery("");
          setTemplatePage(1);
        }}
        title="Change Template"
      >
        <div className="space-y-4">
          {/* Warning Message */}
          <div className="bg-red-50 border border-red-200 rounded-lg p-3">
            <p className="text-sm text-red-800 font-medium">
              ⚠️ You'll lose all unsaved changes by inserting a template.
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <IoSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search templates..."
              value={templateSearchQuery}
              onChange={(e) => {
                setTemplateSearchQuery(e.target.value);
                setTemplatePage(1);
              }}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>

          {/* Template List */}
          <div className="border border-gray-200 rounded-lg max-h-[400px] overflow-y-auto">
            {contractTemplates
              .filter(template => {
                if (!templateSearchQuery) return true;
                const searchLower = templateSearchQuery.toLowerCase();
                return (
                  template.template_name?.toLowerCase().includes(searchLower) ||
                  template.template_type?.toLowerCase().includes(searchLower) ||
                  template.description?.toLowerCase().includes(searchLower)
                );
              })
              .slice((templatePage - 1) * templatesPerPage, templatePage * templatesPerPage)
              .map((template) => (
                <div
                  key={template.id}
                  onClick={() => {
                    handleTemplateSelect(template.id.toString(), true);
                    setIsChangeTemplateModalOpen(false);
                    setTemplateSearchQuery("");
                    setTemplatePage(1);
                  }}
                  className={`p-4 border-b border-gray-200 cursor-pointer hover:bg-blue-50 transition-colors ${
                    selectedTemplateId === template.id.toString() ? 'bg-blue-50 border-l-4 border-l-blue-500' : ''
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-gray-900">{template.template_name}</h3>
                        {template.is_default && (
                          <span className="px-2 py-0.5 text-xs font-medium bg-blue-100 text-blue-700 rounded">
                            Default
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-gray-500 mb-1">
                        Type: <span className="font-medium">{template.template_type}</span>
                      </p>
                      {template.description && (
                        <p className="text-sm text-gray-600 line-clamp-2">{template.description}</p>
                      )}
                    </div>
                    {selectedTemplateId === template.id.toString() && (
                      <IoCheckmarkCircle className="text-blue-600 flex-shrink-0 ml-2" size={20} />
                    )}
                  </div>
                </div>
              ))}
            
            {contractTemplates.filter(template => {
              if (!templateSearchQuery) return true;
              const searchLower = templateSearchQuery.toLowerCase();
              return (
                template.template_name?.toLowerCase().includes(searchLower) ||
                template.template_type?.toLowerCase().includes(searchLower) ||
                template.description?.toLowerCase().includes(searchLower)
              );
            }).length === 0 && (
              <div className="p-8 text-center text-gray-500">
                <IoDocumentText size={48} className="mx-auto mb-3 text-gray-300" />
                <p>No templates found</p>
                {templateSearchQuery && (
                  <p className="text-xs mt-1">Try a different search term</p>
                )}
              </div>
            )}
          </div>

          {/* Pagination */}
          {contractTemplates.filter(template => {
            if (!templateSearchQuery) return true;
            const searchLower = templateSearchQuery.toLowerCase();
            return (
              template.template_name?.toLowerCase().includes(searchLower) ||
              template.template_type?.toLowerCase().includes(searchLower) ||
              template.description?.toLowerCase().includes(searchLower)
            );
          }).length > 0 && (
            <div className="flex items-center justify-between pt-2 border-t border-gray-200">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Show:</span>
                <select
                  value={templatesPerPage}
                  onChange={(e) => {
                    setTemplatesPerPage(parseInt(e.target.value));
                    setTemplatePage(1);
                  }}
                  className="px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                >
                  <option value={10}>10</option>
                  <option value={25}>25</option>
                  <option value={50}>50</option>
                </select>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">
                  {((templatePage - 1) * templatesPerPage) + 1}-
                  {Math.min(templatePage * templatesPerPage, contractTemplates.filter(template => {
                    if (!templateSearchQuery) return true;
                    const searchLower = templateSearchQuery.toLowerCase();
                    return (
                      template.template_name?.toLowerCase().includes(searchLower) ||
                      template.template_type?.toLowerCase().includes(searchLower) ||
                      template.description?.toLowerCase().includes(searchLower)
                    );
                  }).length)} / {contractTemplates.filter(template => {
                    if (!templateSearchQuery) return true;
                    const searchLower = templateSearchQuery.toLowerCase();
                    return (
                      template.template_name?.toLowerCase().includes(searchLower) ||
                      template.template_type?.toLowerCase().includes(searchLower) ||
                      template.description?.toLowerCase().includes(searchLower)
                    );
                  }).length}
                </span>
                <button
                  onClick={() => setTemplatePage(p => Math.max(1, p - 1))}
                  disabled={templatePage === 1}
                  className={`p-1.5 border border-gray-300 rounded ${templatePage === 1 ? 'text-gray-400 cursor-not-allowed' : 'hover:bg-gray-100'}`}
                >
                  <IoChevronBack size={16} />
                </button>
                <span className="px-2 py-1 text-sm border border-gray-300 rounded bg-gray-50">
                  {templatePage}
                </span>
                <button
                  onClick={() => setTemplatePage(p => p + 1)}
                  disabled={templatePage * templatesPerPage >= contractTemplates.filter(template => {
                    if (!templateSearchQuery) return true;
                    const searchLower = templateSearchQuery.toLowerCase();
                    return (
                      template.template_name?.toLowerCase().includes(searchLower) ||
                      template.template_type?.toLowerCase().includes(searchLower) ||
                      template.description?.toLowerCase().includes(searchLower)
                    );
                  }).length}
                  className={`p-1.5 border border-gray-300 rounded ${templatePage * templatesPerPage >= contractTemplates.filter(template => {
                    if (!templateSearchQuery) return true;
                    const searchLower = templateSearchQuery.toLowerCase();
                    return (
                      template.template_name?.toLowerCase().includes(searchLower) ||
                      template.template_type?.toLowerCase().includes(searchLower) ||
                      template.description?.toLowerCase().includes(searchLower)
                    );
                  }).length ? 'text-gray-400 cursor-not-allowed' : 'hover:bg-gray-100'}`}
                >
                  <IoChevronForward size={16} />
                </button>
              </div>
            </div>
          )}

          {/* Close Button */}
          <div className="flex justify-end pt-4 border-t border-gray-200">
            <Button
              variant="outline"
              onClick={() => {
                setIsChangeTemplateModalOpen(false);
                setTemplateSearchQuery("");
                setTemplatePage(1);
              }}
            >
              <IoClose size={16} className="mr-1" />
              Close
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Contracts;
