import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, FileCheck, MessageSquare, CheckSquare, Plus, Save, Sparkles, ShieldCheck } from 'lucide-react';
import { Breadcrumb, Button, Card, CardHeader, CardBody, Badge, Select, Input, Modal } from '../../../components/ui';
import { useOal } from '../../../context/OalContext';
import { useToast } from '../../../context/ToastContext';

export const OalRepBorrowers = () => {
  const navigate = useNavigate();
  const { applicationStage, setApplicationStage, stageNames, addRepTask, messages, sendAgentMessage } = useOal();
  const { addToast } = useToast();

  const [selectedStatus, setSelectedStatus] = useState(applicationStage);
  const [internalNote, setInternalNote] = useState('');
  const [notesList, setNotesList] = useState([
    { id: '1', author: 'Sarah Jenkins (OAL Rep)', note: 'Bank statements verified against Plaid telemetry. Outstanding cashflow.', date: 'Today at 09:15 AM' },
    { id: '2', author: 'Sarah Jenkins (OAL Rep)', note: 'Vanguard Capital matched 4.8% APR. Term sheet pending borrower review.', date: 'Yesterday at 04:30 PM' }
  ]);

  // Create Task Modal State
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [taskTitle, setTaskTitle] = useState('');

  const handleUpdateStatus = (e) => {
    e.preventDefault();
    setApplicationStage(Number(selectedStatus));
    addToast({ title: 'Application Status Updated', message: `Stage changed to ${stageNames[selectedStatus]}`, type: 'success' });
  };

  const handleAddNote = (e) => {
    if (e) e.preventDefault();
    if (!internalNote.trim()) {
      addToast({
        title: 'Empty Note',
        message: 'Please write a note before submitting.',
        type: 'warning',
      });
      return;
    }

    const newEntry = {
      id: Date.now().toString(),
      author: 'Sarah Jenkins (OAL Rep)',
      note: internalNote.trim(),
      date: 'Just now',
    };

    setNotesList((prev) => [newEntry, ...prev]);
    setInternalNote('');
    addToast({
      title: 'Internal Note Added',
      message: 'Note saved successfully to borrower audit ledger.',
      type: 'success',
    });
  };

  const handleCreateTask = (e) => {
    e.preventDefault();
    if (!taskTitle.trim()) return;
    addRepTask({ title: taskTitle, borrower: 'BioGenix Labs Inc.', priority: 'High' });
    setTaskTitle('');
    setIsTaskModalOpen(false);
    addToast({ title: 'Task Created', message: `Added rep task: ${taskTitle}`, type: 'success' });
  };

  return (
    <div className="flex flex-col gap-6" style={{ maxWidth: '1400px', margin: '0 auto', width: '100%', boxSizing: 'border-box' }}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <Breadcrumb items={[{ label: 'OAL Rep' }, { label: 'Borrower Profile Management' }]} />
          <h1 style={{ fontSize: '22px', fontWeight: 800, margin: '0.25rem 0 0 0', color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
            BioGenix Labs Inc. — Borrower Profile
          </h1>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <Button
            variant="outline"
            size="sm"
            icon={Plus}
            onClick={() => setIsTaskModalOpen(true)}
            style={{ fontSize: '12px' }}
          >
            Create Rep Task
          </Button>
          <Button
            variant="primary"
            size="sm"
            icon={MessageSquare}
            onClick={() => navigate('/oal/rep/messages')}
            style={{ backgroundColor: 'var(--accent)', borderColor: 'var(--accent)', fontSize: '12px' }}
          >
            Message Borrower
          </Button>
        </div>
      </div>

      {/* Internal Underwriting Notes Feed */}
      <div className="flex flex-col gap-4">
        <div>
          <h3 style={{ fontSize: '18px', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>
            Rep Internal Underwriting Notes
          </h3>
        </div>

        <form onSubmit={handleAddNote} className="flex flex-col gap-2.5">
          <Input
            value={internalNote}
            onChange={(e) => setInternalNote(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleAddNote(e);
              }
            }}
            placeholder="Add confidential agent note regarding DSCR or lender negotiation..."
            style={{ height: '38px', fontSize: '13px' }}
          />
          <div className="flex justify-end">
            <Button
              variant="outline"
              size="sm"
              type="submit"
              icon={Plus}
              onClick={handleAddNote}
              style={{ height: '34px', fontWeight: 600, fontSize: '12px', padding: '0 14px' }}
            >
              Add Internal Note
            </Button>
          </div>
        </form>

        <div className="flex flex-col gap-2.5 mt-1 overflow-y-auto" style={{ maxHeight: '400px' }}>
          {notesList.map((n) => (
            <div
              key={n.id}
              style={{
                padding: '12px 14px',
                backgroundColor: 'var(--surface)',
                borderRadius: '10px',
                border: '1px solid var(--border)',
                display: 'flex',
                flexDirection: 'column',
                gap: '4px',
                fontSize: '12px',
              }}
            >
              <div className="flex justify-between items-center font-bold text-primary">
                <span>{n.author}</span>
                <span className="text-tertiary font-normal" style={{ fontSize: '11px' }}>{n.date}</span>
              </div>
              <p className="margin-0 text-secondary" style={{ lineHeight: 1.45 }}>{n.note}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Create Task Modal */}
      <Modal isOpen={isTaskModalOpen} onClose={() => setIsTaskModalOpen(false)} title="Create New Agent Action Task">
        <form onSubmit={handleCreateTask} className="flex flex-col gap-4">
          <Input
            label="Task Action Title"
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
            placeholder="e.g. Schedule Underwriting Call with Lender"
            style={{ height: '38px', fontSize: '13px' }}
            required
          />
          <Button
            variant="primary"
            type="submit"
            style={{ backgroundColor: 'var(--accent)', borderColor: 'var(--accent)' }}
          >
            Create Task
          </Button>
        </form>
      </Modal>
    </div>
  );
};
