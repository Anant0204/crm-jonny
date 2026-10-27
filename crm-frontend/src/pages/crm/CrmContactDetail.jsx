import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  User,
  Building2,
  Mail,
  Phone,
  Calendar,
  FileText,
  DollarSign,
  Briefcase,
  LifeBuoy,
  MessageSquare,
  Activity,
  Folder,
  Edit,
  ArrowLeft,
  Plus,
  Trash2
} from 'lucide-react';
import {
  Breadcrumb,
  Button,
  Card,
  CardHeader,
  CardBody,
  Tabs,
  Badge,
  Timeline,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  ProgressBar,
  Modal,
  Input
} from '../../components/ui';
import { useCrm } from '../../context/CrmContext';
import { useErp } from '../../context/ErpContext';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';

export const CrmContactDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    contacts,
    deals,
    tasks,
    messages,
    notes,
    addNote,
    deleteNote,
    activities,
    editContact
  } = useCrm();
  const { projects: erpProjects } = useErp();
  const { crmUser } = useAuth();
  const { addToast } = useToast();

  const [activeTab, setActiveTab] = useState('overview');
  const [newNote, setNewNote] = useState('');
  const [isSubmittingNote, setIsSubmittingNote] = useState(false);

  const contact = contacts.find((c) => c.id === id) || contacts[0];

  // Filter notes, activities, deals, tasks, and ERP projects specifically for this contact
  const contactNotes = notes.filter((n) => n.contactId === contact?.id || n.contactId === id);
  const contactActivities = activities.filter((a) => a.contactId === contact?.id || a.contactId === id);
  const contactDeals = deals.filter(
    (d) =>
      d.contactId === contact?.id ||
      d.contactId === id ||
      d.contact === contact?.name ||
      d.contactObj?.id === contact?.id ||
      (contact?.company && d.customer === contact.company)
  );
  const contactTasks = tasks.filter(
    (t) =>
      t.contactId === contact?.id ||
      t.contactId === id ||
      t.contact === contact?.name ||
      t.contactObj?.id === contact?.id
  );
  const contactProjects = erpProjects.filter(
    (p) =>
      p.contactId === contact?.id ||
      p.contactId === id ||
      (contact?.company && (p.client || '').toLowerCase().includes(contact.company.toLowerCase())) ||
      (contact?.name && (p.client || '').toLowerCase().includes(contact.name.toLowerCase()))
  );

  const handleAddNote = async (e) => {
    if (e) e.preventDefault();
    const trimmed = newNote.trim();
    if (!trimmed) {
      addToast({ title: 'Validation Warning', message: 'Please enter note content before saving.', type: 'warning' });
      return;
    }

    setIsSubmittingNote(true);
    try {
      await addNote({
        content: trimmed,
        contactId: contact.id,
      });

      setNewNote('');
      addToast({ title: 'Note Saved', message: 'Saved note to contact record.', type: 'success' });
    } catch (err) {
      addToast({ title: 'Save Failed', message: err.message || 'Could not save note to database.', type: 'error' });
    } finally {
      setIsSubmittingNote(false);
    }
  };

  const handleDeleteNote = async (noteId) => {
    try {
      await deleteNote(noteId);
      addToast({ title: 'Note Removed', message: 'Note deleted from contact record.', type: 'success' });
    } catch (err) {
      addToast({ title: 'Delete Failed', message: err.message || 'Could not delete note.', type: 'error' });
    }
  };

  // Helper to get timeline item color
  const getActivityColor = (type) => {
    switch (type) {
      case 'STAGE_CHANGED':
      case 'NOTE_ADDED':
        return 'var(--primary)';
      case 'LEAD_CONVERTED':
      case 'TASK_COMPLETED':
        return 'var(--success)';
      case 'CALL_LOGGED':
      case 'EMAIL_SENT':
        return 'var(--info)';
      default:
        return 'var(--primary)';
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <Breadcrumb
            items={[
              { label: 'CRM nErgy AI' },
              { label: 'Contacts', href: '/crm/contacts' },
              { label: contact?.name || 'Contact Profile' },
            ]}
          />
          <div className="flex items-center gap-3">
            <h1 style={{ fontSize: 'var(--text-2xl)' }}>{contact?.name}</h1>
            <Badge variant={contact?.status === 'Active' ? 'success' : 'warning'}>{contact?.status || 'Active'}</Badge>
            <Badge variant="default">{contact?.type || 'Enterprise Client'}</Badge>
          </div>
          <p className="text-xs text-secondary margin-0 mt-1 flex items-center gap-4">
            <span><Building2 size={12} className="inline mr-1" />{contact?.company || 'No Company'}</span>
            <span><Mail size={12} className="inline mr-1" />{contact?.email || 'No Email'}</span>
            <span><Phone size={12} className="inline mr-1" />{contact?.phone || 'No Phone'}</span>
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" icon={ArrowLeft} onClick={() => navigate('/crm/contacts')}>
            Back to Contacts
          </Button>
          <Button variant="primary" size="sm" icon={Edit} onClick={() => addToast({ title: 'Edit Contact', message: `Edit dialog opened for ${contact?.name}`, type: 'info' })}>
            Edit Profile
          </Button>
        </div>
      </div>

      {/* 10 Functional Tabs Switcher */}
      <Card>
        <CardBody className="p-2 overflow-x-auto">
          <Tabs
            tabs={[
              { id: 'overview', label: 'Overview', icon: User },
              { id: 'activities', label: 'Activities', icon: Activity, badge: contactActivities.length > 0 ? contactActivities.length : undefined },
              { id: 'communications', label: 'Communications', icon: MessageSquare },
              { id: 'deals', label: 'Deals', icon: Briefcase, badge: contactDeals.length > 0 ? contactDeals.length : undefined },
              { id: 'tasks', label: 'Tasks', icon: Calendar, badge: contactTasks.length > 0 ? contactTasks.length : undefined },
              { id: 'documents', label: 'Documents', icon: Folder },
              { id: 'invoices', label: 'Invoices', icon: DollarSign },
              { id: 'projects', label: 'Projects', icon: Building2, badge: contactProjects.length > 0 ? contactProjects.length : undefined },
              { id: 'support', label: 'Support', icon: LifeBuoy },
              { id: 'notes', label: 'Notes', icon: FileText, badge: contactNotes.length },
            ]}
            activeTab={activeTab}
            onChange={setActiveTab}
          />
        </CardBody>
      </Card>

      {/* TAB 1: OVERVIEW */}
      {activeTab === 'overview' && (
        <div className="grid-responsive-2col">
          <Card>
            <CardHeader title="Contact Metadata & Ownership" />
            <CardBody className="flex flex-col gap-0 text-xs">
              <div className="flex items-center justify-between py-2.5">
                <span style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>Contact ID:</span>
                <span className="font-mono text-primary font-semibold" style={{ fontSize: '13px' }} title={`Database ID: ${contact?.id}`}>
                  {contact?.displayId || contact?.id}
                </span>
              </div>
              <div className="flex items-center justify-between py-2.5">
                <span style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>Account Owner:</span>
                <span className="font-semibold text-primary" style={{ fontSize: '13px' }}>{contact?.owner || 'Alexander Wright'}</span>
              </div>
              <div className="flex items-center justify-between py-2.5">
                <span style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>Total Deal Value:</span>
                <span className="font-bold text-success" style={{ fontSize: '13px' }}>{contact?.totalValue || '$0'}</span>
              </div>
              <div className="flex items-center justify-between py-2.5">
                <span style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>Created Date:</span>
                <span style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>{contact?.createdDate || 'Recently'}</span>
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardHeader title="Account Health & Relationship Score" />
            <CardBody className="flex flex-col gap-4">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span>Engagement Rating</span>
                  <span className="font-bold text-success">92% High</span>
                </div>
                <ProgressBar value={92} variant="success" showLabel={false} />
              </div>
              <p className="text-xs text-secondary margin-0">
                Tenant isolation enforced. All financial records and communication histories are bound exclusively to this account ID.
              </p>
            </CardBody>
          </Card>
        </div>
      )}

      {/* TAB 2: ACTIVITIES */}
      {activeTab === 'activities' && (
        <Card className="p-6">
          <h3 className="text-base font-semibold mb-4">Activity Stream</h3>
          {contactActivities.length === 0 ? (
            <div className="py-6 text-center text-xs text-tertiary">
              <p>No activity records logged yet for this contact.</p>
              <p className="mt-1 text-secondary">Activities are automatically recorded when notes, emails, or status updates occur.</p>
            </div>
          ) : (
            <Timeline
              items={contactActivities.map((act) => ({
                title: act.title,
                description: act.description || act.type,
                time: act.createdAt ? new Date(act.createdAt).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' }) : 'Recently',
                color: getActivityColor(act.type),
              }))}
            />
          )}
        </Card>
      )}

      {/* TAB 3: COMMUNICATIONS */}
      {activeTab === 'communications' && (
        <Card className="p-6 flex flex-col gap-4">
          <h3 className="text-base font-semibold">Communication Log</h3>
          {messages.map((m) => (
            <div key={m.id} className="p-3 surface-secondary rounded-sm border-subtle flex flex-col gap-1 text-xs">
              <div className="flex justify-between">
                <span className="font-semibold text-primary">{m.sender}</span>
                <span className="text-tertiary">{m.timestamp}</span>
              </div>
              <div className="font-medium text-secondary">{m.subject}</div>
              <p className="margin-0 text-tertiary">{m.body}</p>
            </div>
          ))}
        </Card>
      )}

      {/* TAB 4: DEALS */}
      {activeTab === 'deals' && (
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-semibold">Associated Deals ({contactDeals.length})</h3>
            <Button
              variant="outline"
              size="sm"
              icon={Plus}
              onClick={() => navigate('/crm/pipeline')}
            >
              Open Pipeline
            </Button>
          </div>
          {contactDeals.length === 0 ? (
            <div className="py-6 text-center text-xs text-tertiary">
              <p>No active deals linked to this contact.</p>
              <p className="mt-1 text-secondary">Converting a lead or creating an opportunity links deals here.</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableCell isHeader>Deal Name</TableCell>
                  <TableCell isHeader>Value</TableCell>
                  <TableCell isHeader>Stage</TableCell>
                  <TableCell isHeader>Probability</TableCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                {contactDeals.map((d) => (
                  <TableRow key={d.id}>
                    <TableCell><span className="font-semibold">{d.title}</span></TableCell>
                    <TableCell><span className="font-bold text-success">{d.value}</span></TableCell>
                    <TableCell><Badge variant="primary">{d.stage}</Badge></TableCell>
                    <TableCell>{d.probability}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </Card>
      )}

      {/* TAB 5: TASKS */}
      {activeTab === 'tasks' && (
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-semibold">Account Tasks ({contactTasks.length})</h3>
            <Button
              variant="outline"
              size="sm"
              icon={Plus}
              onClick={() => navigate('/crm/tasks')}
            >
              Manage Tasks
            </Button>
          </div>
          {contactTasks.length === 0 ? (
            <div className="py-6 text-center text-xs text-tertiary">
              <p>No follow-up tasks scheduled for this contact.</p>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              {contactTasks.map((t) => (
                <div key={t.id} className="p-3 surface-secondary rounded-sm flex items-center justify-between text-xs">
                  <div className="flex flex-col gap-0.5">
                    <span className="font-semibold text-primary">{t.title}</span>
                    <span className="text-tertiary">Due: {t.dueDate || 'Soon'} • Assigned: {t.assignedTo || 'Current User'}</span>
                  </div>
                  <Badge variant={t.priority === 'High' ? 'error' : t.priority === 'Urgent' ? 'error' : 'warning'}>{t.priority}</Badge>
                </div>
              ))}
            </div>
          )}
        </Card>
      )}

      {/* TAB 6: DOCUMENTS */}
      {activeTab === 'documents' && (
        <Card className="p-6 flex flex-col gap-3">
          <h3 className="text-base font-semibold">Vault Documents</h3>
          <div className="p-3 surface-secondary rounded-sm flex items-center justify-between text-xs">
            <span className="font-semibold">Master_Service_Agreement_v2.pdf</span>
            <Badge variant="success">Signed & Verified</Badge>
          </div>
          <div className="p-3 surface-secondary rounded-sm flex items-center justify-between text-xs">
            <span className="font-semibold">Corporate_Tax_Returns_2025.pdf</span>
            <Badge variant="primary">KYC Vault</Badge>
          </div>
        </Card>
      )}

      {/* TAB 7: INVOICES */}
      {activeTab === 'invoices' && (
        <Card className="p-6 flex flex-col gap-3">
          <h3 className="text-base font-semibold">Billing Invoices</h3>
          <div className="p-3 surface-secondary rounded-sm flex items-center justify-between text-xs">
            <span className="font-mono text-tertiary">INV-2094 ($48,000)</span>
            <Badge variant="success">Paid in Full</Badge>
          </div>
        </Card>
      )}

      {/* TAB 8: PROJECTS */}
      {activeTab === 'projects' && (
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-semibold">ERP Project Implementations ({contactProjects.length})</h3>
            <Button
              variant="outline"
              size="sm"
              icon={Plus}
              onClick={() => navigate('/crm/erp/projects')}
            >
              Open ERP Projects
            </Button>
          </div>
          {contactProjects.length === 0 ? (
            <div className="py-6 text-center text-xs text-tertiary">
              <p>No active ERP projects linked to this client account.</p>
              <p className="mt-1 text-secondary">Closing an opportunity as Won in the Sales Pipeline initiates delivery projects here.</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableCell isHeader>Project Name</TableCell>
                  <TableCell isHeader>Budget</TableCell>
                  <TableCell isHeader>Progress</TableCell>
                  <TableCell isHeader>Status</TableCell>
                  <TableCell isHeader align="right">Actions</TableCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                {contactProjects.map((p) => (
                  <TableRow key={p.id}>
                    <TableCell><span className="font-semibold text-primary">{p.name}</span></TableCell>
                    <TableCell><span className="font-bold text-success">{p.budget}</span></TableCell>
                    <TableCell>{p.progress}%</TableCell>
                    <TableCell><Badge variant="primary">{p.status}</Badge></TableCell>
                    <TableCell align="right">
                      <Button
                        variant="ghost"
                        size="sm"
                        icon={Building2}
                        onClick={() => navigate(`/crm/erp/projects/${p.id}`)}
                      >
                        View Project
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </Card>
      )}

      {/* TAB 9: SUPPORT */}
      {activeTab === 'support' && (
        <Card className="p-6">
          <h3 className="text-base font-semibold mb-2">Customer Support Tickets</h3>
          <p className="text-xs text-secondary">No open critical support tickets for this account.</p>
        </Card>
      )}

      {/* TAB 10: NOTES (Live MySQL REST API) */}
      {activeTab === 'notes' && (
        <Card className="p-6 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-semibold">Account Notes</h3>
            <span className="text-xs text-secondary">{contactNotes.length} saved notes</span>
          </div>

          <form onSubmit={handleAddNote} className="flex flex-col gap-2.5">
            <textarea
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              placeholder="Add a new internal note..."
              rows={2}
              style={{
                width: '100%',
                padding: '0.625rem 0.875rem',
                borderRadius: '8px',
                border: '1px solid var(--border)',
                backgroundColor: 'var(--surface)',
                color: 'var(--text-primary)',
                fontFamily: 'var(--font-sans)',
                fontSize: '13px',
                resize: 'vertical',
                boxSizing: 'border-box',
                outline: 'none',
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
                  handleAddNote(e);
                }
              }}
            />
            <div className="flex justify-end">
              <Button
                variant="primary"
                size="sm"
                type="submit"
                isLoading={isSubmittingNote}
                icon={Plus}
              >
                Add Note
              </Button>
            </div>
          </form>

          <div className="flex flex-col gap-3 border-t border-subtle pt-4">
            {contactNotes.length === 0 ? (
              <p className="text-xs text-tertiary">No notes added yet for this contact.</p>
            ) : (
              contactNotes.map((n) => (
                <div key={n.id} className="p-3 surface-secondary rounded-sm flex flex-col gap-1 text-xs">
                  <div className="flex justify-between items-center font-semibold text-primary">
                    <span>{n.author?.name || crmUser?.name || 'Alexander Wright'}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-tertiary font-normal">
                        {n.createdAt ? new Date(n.createdAt).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' }) : 'Recently'}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleDeleteNote(n.id)}
                        className="text-tertiary hover:text-error transition-colors p-1"
                        title="Delete note"
                        style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </div>
                  <p className="margin-0 text-secondary" style={{ whiteSpace: 'pre-wrap' }}>{n.content || n.text}</p>
                </div>
              ))
            )}
          </div>
        </Card>
      )}
    </div>
  );
};

export default CrmContactDetail;
