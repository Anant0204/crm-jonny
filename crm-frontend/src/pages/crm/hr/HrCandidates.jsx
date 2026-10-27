import React, { useState } from 'react';
import {
  Users,
  UserCheck,
  Search,
  Filter,
  Star,
  Sparkles,
  FileText,
  Mail,
  Phone,
  Calendar,
  CheckCircle2,
  Clock,
  ChevronRight,
  Plus,
  Briefcase,
  RefreshCw,
  Trash2
} from 'lucide-react';
import {
  Breadcrumb,
  Card,
  CardHeader,
  CardBody,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  Badge,
  KPICard,
  Button,
  Drawer,
  Input,
  Modal,
  Select
} from '../../../components/ui';
import { useHr } from '../../../context/HrContext';
import { useToast } from '../../../context/ToastContext';

export const HrCandidates = () => {
  const { candidates, addCandidate, updateCandidate, deleteCandidate, isLoading, fetchHrData } = useHr();
  const { addToast } = useToast();

  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [stageFilter, setStageFilter] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: '',
    stage: 'Applied',
    experience: '3+ years',
    score: 88,
  });

  const filteredCandidates = candidates.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStage = stageFilter === 'All' || c.stage === stageFilter;
    return matchesSearch && matchesStage;
  });

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.role) {
      addToast({ title: 'Validation Error', message: 'Candidate name and role are required.', type: 'error' });
      return;
    }

    try {
      const created = await addCandidate(formData);
      addToast({ title: 'Candidate Registered', message: `${created.name} added to recruiting pipeline.`, type: 'success' });
      setIsModalOpen(false);
      setFormData({ name: '', email: '', phone: '', role: '', stage: 'Applied', experience: '3+ years', score: 88 });
    } catch (err) {
      addToast({ title: 'Error', message: err.message || 'Failed to add candidate.', type: 'error' });
    }
  };

  const handleStageChange = async (id, newStage) => {
    try {
      await updateCandidate({ id, stage: newStage });
      addToast({ title: 'Stage Updated', message: `Moved candidate to ${newStage}.`, type: 'success' });
      if (selectedCandidate?.id === id) {
        setSelectedCandidate((prev) => ({ ...prev, stage: newStage }));
      }
    } catch (err) {
      addToast({ title: 'Error', message: err.message || 'Failed to update candidate.', type: 'error' });
    }
  };

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <Breadcrumb items={[{ label: 'CRM nErgy AI' }, { label: 'Human Resources' }, { label: 'Talent Recruiting' }]} />
          <div className="flex items-center gap-3 mt-1">
            <h1 className="text-2xl font-bold font-display tracking-tight text-primary flex items-center gap-2">
              Talent Pipeline & Candidate Screening
            </h1>
            <Badge variant="primary" className="bg-sky-500 text-white font-bold text-xs uppercase tracking-wider">
              AI Scoring Active
            </Badge>
          </div>
          <p className="text-xs text-secondary mt-0.5">
            Recruitment pipeline, resume screening scores, interview stages, and onboarding handoffs.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" icon={RefreshCw} onClick={fetchHrData} disabled={isLoading}>
            Refresh
          </Button>
          <Button variant="primary" size="sm" icon={Plus} onClick={() => setIsModalOpen(true)}>
            Add Candidate
          </Button>
        </div>
      </div>

      {/* KPI Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <KPICard title="Total Applicants" value={String(candidates.length)} change="Active in Pipeline" changeType="positive" icon={Users} />
        <KPICard title="In Interview" value={String(candidates.filter(c => c.stage === 'Interview').length)} change="Active Rounds" changeType="positive" icon={Clock} />
        <KPICard title="Offers Pending" value={String(candidates.filter(c => c.stage === 'Offered').length)} change="Negotiation Desk" changeType="positive" icon={CheckCircle2} />
        <KPICard title="Hired to Date" value={String(candidates.filter(c => c.stage === 'Hired').length)} change="Onboarded in DB" changeType="positive" icon={UserCheck} />
      </div>

      {/* Main Table Card */}
      <Card className="border shadow-sm">
        <CardHeader
          title="Recruiting Pipeline"
          subtitle="All candidates evaluated with screening scores and current lifecycle stage"
        />
        <CardBody className="p-0 overflow-x-auto">
          {isLoading ? (
            <div className="p-12 text-center text-xs text-secondary">Loading applicants from database...</div>
          ) : filteredCandidates.length === 0 ? (
            <div className="p-12 text-center flex flex-col items-center justify-center">
              <Users className="w-12 h-12 text-slate-600 mb-3" />
              <h3 className="text-base font-bold text-primary">No Candidates Found</h3>
              <p className="text-xs text-secondary max-w-sm mt-1 mb-4">
                No candidate applications currently exist in the database. Click 'Add Candidate' to register an applicant.
              </p>
              <Button variant="primary" size="sm" icon={Plus} onClick={() => setIsModalOpen(true)}>
                Add First Candidate
              </Button>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableCell header>Candidate Name</TableCell>
                  <TableCell header>Applied Role</TableCell>
                  <TableCell header>AI Score</TableCell>
                  <TableCell header>Experience</TableCell>
                  <TableCell header>Stage</TableCell>
                  <TableCell header>Actions</TableCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCandidates.map((cand) => (
                  <TableRow key={cand.id}>
                    <TableCell>
                      <div className="font-semibold text-primary">{cand.name}</div>
                      <div className="text-xs text-secondary">{cand.email}</div>
                    </TableCell>
                    <TableCell className="font-medium text-xs text-primary">{cand.role}</TableCell>
                    <TableCell>
                      <Badge variant={cand.score >= 90 ? 'success' : cand.score >= 80 ? 'info' : 'warning'}>
                        {cand.score}% Score
                      </Badge>
                    </TableCell>
                    <TableCell className="text-xs text-secondary">{cand.experience}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          cand.stage === 'Hired'
                            ? 'success'
                            : cand.stage === 'Offered'
                            ? 'info'
                            : cand.stage === 'Interview'
                            ? 'warning'
                            : 'secondary'
                        }
                      >
                        {cand.stage}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1.5">
                        <select
                          className="bg-slate-900 border border-slate-700 text-[11px] rounded px-2 py-1 text-slate-200"
                          value={cand.stage}
                          onChange={(e) => handleStageChange(cand.id, e.target.value)}
                        >
                          <option value="Applied">Applied</option>
                          <option value="Screening">Screening</option>
                          <option value="Interview">Interview</option>
                          <option value="Offered">Offered</option>
                          <option value="Hired">Hired</option>
                          <option value="Rejected">Rejected</option>
                        </select>
                        <Button
                          variant="ghost"
                          size="sm"
                          icon={Trash2}
                          className="text-rose-400 hover:text-rose-300 p-1"
                          onClick={() => deleteCandidate(cand.id)}
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardBody>
      </Card>

      {/* Add Candidate Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Register New Applicant"
        size="md"
      >
        <form onSubmit={handleCreate} className="flex flex-col gap-4">
          <Input
            label="Candidate Name *"
            placeholder="e.g. Sarah Lin"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
          <Input
            label="Email Address"
            type="email"
            placeholder="s.lin@domain.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Applied Job Role *"
              placeholder="e.g. Senior Supply Chain Director"
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              required
            />
            <Select
              label="Initial Stage"
              value={formData.stage}
              onChange={(e) => setFormData({ ...formData, stage: e.target.value })}
              options={[
                { value: 'Applied', label: 'Applied' },
                { value: 'Screening', label: 'Screening' },
                { value: 'Interview', label: 'Interview' },
                { value: 'Offered', label: 'Offered' },
                { value: 'Hired', label: 'Hired' },
              ]}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Experience"
              placeholder="e.g. 5+ Years"
              value={formData.experience}
              onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
            />
            <Input
              label="Screening Score (0-100)"
              type="number"
              placeholder="92"
              value={formData.score}
              onChange={(e) => setFormData({ ...formData, score: e.target.value })}
            />
          </div>
          <div className="flex justify-end gap-3 mt-2">
            <Button variant="outline" type="button" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Save Candidate
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default HrCandidates;
