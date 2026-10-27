import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { UserCheck, Users, Briefcase, Calendar, Plus, Search, Eye, Filter, CheckCircle2 } from 'lucide-react';
import { Breadcrumb, Button, KPICard, Card, CardBody, Table, TableHeader, TableBody, TableRow, TableCell, Badge, Modal, Input, Select, Avatar } from '../../../components/ui';
import { useHr } from '../../../context/HrContext';
import { useToast } from '../../../context/ToastContext';
import { useLanguage } from '../../../context/LanguageContext';

export const HrDashboard = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { employees, addEmployee, candidates, fetchHrData } = useHr();
  const { addToast } = useToast();

  useEffect(() => {
    if (fetchHrData) {
      fetchHrData();
    }
  }, [fetchHrData]);

  const [activeTab, setActiveTab] = useState('employees'); // 'employees' | 'candidates' | 'jobs' | 'interviews'
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('all');

  // Form State for Add Employee Modal
  const [formData, setFormData] = useState({
    name: '',
    role: 'Software Engineer',
    dept: 'Engineering',
    email: '',
    salary: '$130,000',
  });

  const handleCreateEmployee = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      addToast({ title: 'Validation Error', message: 'Please enter employee name and email.', type: 'error' });
      return;
    }

    addEmployee(formData);
    addToast({
      title: 'Employee Added Successfully',
      message: `${formData.name} has been added to the HR directory.`,
      type: 'success',
    });

    // Reset form & close modal
    setFormData({ name: '', role: 'Software Engineer', dept: 'Engineering', email: '', salary: '$130,000' });
    setIsModalOpen(false);
    setActiveTab('employees'); // Switch to employees directory tab to view newly added employee
  };

  // Filter Employees
  const filteredEmployees = employees.filter((emp) => {
    const matchesSearch =
      emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDept = departmentFilter === 'all' || emp.dept === departmentFilter;
    return matchesSearch && matchesDept;
  });

  // Mock Jobs & Interviews data for tabs
  const jobsList = [
    { id: 'JOB-401', title: 'Senior Full Stack Engineer', dept: 'Engineering', type: 'Full-Time', applicants: 18, status: 'Active' },
    { id: 'JOB-402', title: 'Enterprise Account Executive', dept: 'Sales', type: 'Full-Time', applicants: 24, status: 'Active' },
    { id: 'JOB-403', title: 'Financial Analyst & Controller', dept: 'Finance', type: 'Full-Time', applicants: 9, status: 'Active' },
    { id: 'JOB-404', title: 'HR Generalist / Specialist', dept: 'Human Resources', type: 'Full-Time', applicants: 12, status: 'Active' },
  ];

  const interviewsList = [
    { id: 'INT-301', candidate: 'Marcus Vance', position: 'Senior Full Stack Engineer', interviewer: 'Alexander Wright', time: '10:30 AM Today', status: 'Scheduled' },
    { id: 'INT-302', candidate: 'Laura Lin', position: 'Financial Controller', interviewer: 'David Chen', time: '02:00 PM Today', status: 'Scheduled' },
    { id: 'INT-303', candidate: 'Robert Thorne', position: 'Account Executive', interviewer: 'Sarah Jenkins', time: '04:15 PM Today', status: 'Completed' },
  ];

  return (
    <div className="flex flex-col gap-6">
      {/* Page Header Row: Title on Left, Add Employee Button on Top Right */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="flex flex-col gap-1">
          <Breadcrumb items={[{ label: 'CRM nErgy AI' }, { label: t('HR & Recruiting') }]} />
          <h1 style={{ fontSize: 'var(--text-2xl)', marginTop: '0.25rem', marginBottom: '0.25rem' }}>{t('HR & Recruiting Platform')}</h1>
        </div>

        <Button
          variant="primary"
          size="sm"
          icon={Plus}
          onClick={() => setIsModalOpen(true)}
          style={{ borderRadius: '8px', padding: '0.6rem 1.25rem' }}
        >
          {t('Add Employee')}
        </Button>
      </div>

      {/* Row 1: 4 Equal Height KPI Cards */}
      <div className="grid-responsive-kpi">
        <div onClick={() => setActiveTab('employees')} className="cursor-pointer">
          <KPICard
            title={t('TOTAL WORKFORCE')}
            value={String(employees.length)}
            change={t('100% Active')}
            changeType="positive"
            changePeriod={t('vs last 7 days')}
            icon={Users}
            iconBg="rgba(22, 163, 74, 0.1)"
            iconColor="#16a34a"
          />
        </div>
        <div onClick={() => setActiveTab('candidates')} className="cursor-pointer">
          <KPICard
            title={t('ACTIVE CANDIDATES')}
            value={String(candidates.length)}
            change={t('2 Scheduled')}
            changeType="positive"
            changePeriod={t('Interview Stage')}
            icon={UserCheck}
            iconBg="rgba(29, 78, 216, 0.1)"
            iconColor="#1d4ed8"
          />
        </div>
        <div onClick={() => setActiveTab('jobs')} className="cursor-pointer">
          <KPICard
            title={t('OPEN ROLES')}
            value={`${jobsList.length} ${t('Postings')}`}
            change={t('Engineering & Sales')}
            changeType="neutral"
            changePeriod={t('Active Recruiting')}
            icon={Briefcase}
            iconBg="rgba(147, 51, 234, 0.1)"
            iconColor="#9333ea"
          />
        </div>
        <div onClick={() => setActiveTab('interviews')} className="cursor-pointer">
          <KPICard
            title={t('SCHEDULED INTERVIEWS')}
            value={`${interviewsList.length} ${t('Today')}`}
            change={t('100% Attendance')}
            changeType="positive"
            changePeriod={t('On Schedule')}
            icon={Calendar}
            iconBg="rgba(234, 88, 12, 0.1)"
            iconColor="#ea580c"
          />
        </div>
      </div>

      {/* Module Navigation Tabs Bar (Compact Natural Width Pills) */}
      <div className="flex items-center gap-2 flex-wrap">
        <button
          type="button"
          onClick={() => setActiveTab('employees')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold cursor-pointer transition-all ${
            activeTab === 'employees'
              ? 'bg-primary text-white shadow-sm'
              : 'text-secondary hover:bg-surface-hover'
          }`}
          style={{
            border: activeTab === 'employees' ? 'none' : '1px solid var(--border)',
            backgroundColor: activeTab === 'employees' ? undefined : 'var(--surface)',
          }}
        >
          <Users size={15} />
          <span>{t('Employees Directory')} ({employees.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('candidates')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold cursor-pointer transition-all ${
            activeTab === 'candidates'
              ? 'bg-primary text-white shadow-sm'
              : 'text-secondary hover:bg-surface-hover'
          }`}
          style={{
            border: activeTab === 'candidates' ? 'none' : '1px solid var(--border)',
            backgroundColor: activeTab === 'candidates' ? undefined : 'var(--surface)',
          }}
        >
          <UserCheck size={15} />
          <span>{t('Candidates Pool')} ({candidates.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('jobs')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold cursor-pointer transition-all ${
            activeTab === 'jobs'
              ? 'bg-primary text-white shadow-sm'
              : 'text-secondary hover:bg-surface-hover'
          }`}
          style={{
            border: activeTab === 'jobs' ? 'none' : '1px solid var(--border)',
            backgroundColor: activeTab === 'jobs' ? undefined : 'var(--surface)',
          }}
        >
          <Briefcase size={15} />
          <span>{t('Job Openings')} ({jobsList.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('interviews')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold cursor-pointer transition-all ${
            activeTab === 'interviews'
              ? 'bg-primary text-white shadow-sm'
              : 'text-secondary hover:bg-surface-hover'
          }`}
          style={{
            border: activeTab === 'interviews' ? 'none' : '1px solid var(--border)',
            backgroundColor: activeTab === 'interviews' ? undefined : 'var(--surface)',
          }}
        >
          <Calendar size={15} />
          <span>{t('Interview Schedule')} ({interviewsList.length})</span>
        </button>
      </div>

      {/* Active Tab Content Area */}
      {activeTab === 'employees' && (
        <Card style={{ borderRadius: '16px', boxShadow: 'var(--shadow-sm)' }}>
          {/* Responsive Search & Filter Toolbar */}
          <div className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-subtle">
            <div className="w-full md:w-80 flex-1 max-w-md">
              <Input
                type="text"
                placeholder={t('Search employees by name, role, email, ID...')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                startIcon={Search}
                style={{ height: '38px', fontSize: '13px' }}
              />
            </div>

            <div className="flex items-center gap-3 w-full md:w-auto justify-start md:justify-end">
              <div className="flex items-center gap-1.5 whitespace-nowrap">
                <Filter size={14} className="text-tertiary" />
                <span className="text-xs text-tertiary font-bold">{t('Department:')}</span>
              </div>
              <Select
                value={departmentFilter}
                onChange={(e) => setDepartmentFilter(e.target.value)}
                options={[
                  { value: 'all', label: t('All Departments') },
                  { value: 'Executive', label: t('Executive') },
                  { value: 'Sales', label: t('Sales') },
                  { value: 'Finance', label: t('Finance') },
                  { value: 'Human Resources', label: t('Human Resources') },
                  { value: 'Engineering', label: t('Engineering') },
                  { value: 'Operations', label: t('Operations') },
                ]}
                style={{ minWidth: '170px', height: '38px' }}
              />
            </div>
          </div>

          <CardBody className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableCell isHeader>{t('Employee ID')}</TableCell>
                  <TableCell isHeader>{t('Full Name')}</TableCell>
                  <TableCell isHeader>{t('Department')}</TableCell>
                  <TableCell isHeader>{t('Job Title')}</TableCell>
                  <TableCell isHeader>{t('Corporate Email')}</TableCell>
                  <TableCell isHeader>{t('Salary')}</TableCell>
                  <TableCell isHeader>{t('Status')}</TableCell>
                  <TableCell isHeader align="right">{t('Actions')}</TableCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredEmployees.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} align="center">
                      <div className="py-8 text-center text-tertiary text-xs">
                        {t('No employees found matching filter criteria.')}
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredEmployees.map((emp) => (
                    <TableRow key={emp.id} className="hover:bg-surface-hover transition-colors">
                      <TableCell>
                        <span className="font-mono text-xs font-bold text-primary">{emp.id}</span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar name={emp.name} size="sm" status="online" />
                          <div className="flex flex-col">
                            <Link
                              to={`/crm/hr/employees/${emp.id}`}
                              className="font-bold text-xs text-primary hover:underline"
                              style={{ color: '#1d4ed8' }}
                            >
                              {emp.name}
                            </Link>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="text-xs text-secondary font-medium">{emp.dept}</span>
                      </TableCell>
                      <TableCell>
                        <span className="text-xs font-semibold text-primary">{emp.role}</span>
                      </TableCell>
                      <TableCell>
                        <span className="text-xs text-tertiary font-mono">{emp.email}</span>
                      </TableCell>
                      <TableCell>
                        <span className="text-xs font-bold text-primary">{emp.salary || '$130,000'}</span>
                      </TableCell>
                      <TableCell>
                        <Badge variant="success">{t('Active')}</Badge>
                      </TableCell>
                      <TableCell align="right">
                        <Button
                          variant="ghost"
                          size="sm"
                          icon={Eye}
                          onClick={() => navigate(`/crm/hr/employees/${emp.id}`)}
                          title="View Employee Profile"
                        >
                          View Profile
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardBody>
        </Card>
      )}

      {/* Candidates Tab */}
      {activeTab === 'candidates' && (
        <Card style={{ borderRadius: '16px', boxShadow: 'var(--shadow-sm)' }}>
          <CardBody className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableCell isHeader>Candidate ID</TableCell>
                  <TableCell isHeader>Applicant Name</TableCell>
                  <TableCell isHeader>Target Position</TableCell>
                  <TableCell isHeader>Recruiting Stage</TableCell>
                  <TableCell isHeader>Match Score</TableCell>
                  <TableCell isHeader>Applied Date</TableCell>
                  <TableCell isHeader align="right">Actions</TableCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                {candidates.map((cnd) => (
                  <TableRow key={cnd.id}>
                    <TableCell><span className="font-mono text-xs font-bold">{cnd.id}</span></TableCell>
                    <TableCell><span className="font-bold text-xs text-primary">{cnd.name}</span></TableCell>
                    <TableCell><span className="text-xs text-secondary">{cnd.position}</span></TableCell>
                    <TableCell><Badge variant="info">{cnd.stage}</Badge></TableCell>
                    <TableCell><strong className="text-xs text-success">{cnd.score}</strong></TableCell>
                    <TableCell><span className="text-xs text-tertiary">{cnd.appliedDate}</span></TableCell>
                    <TableCell align="right">
                      <Button variant="outline" size="sm" icon={Eye} onClick={() => navigate('/crm/hr/candidates')}>Review Applicant</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardBody>
        </Card>
      )}

      {/* Job Openings Tab */}
      {activeTab === 'jobs' && (
        <Card style={{ borderRadius: '16px', boxShadow: 'var(--shadow-sm)' }}>
          <CardBody className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableCell isHeader>Job ID</TableCell>
                  <TableCell isHeader>Position Title</TableCell>
                  <TableCell isHeader>Department</TableCell>
                  <TableCell isHeader>Job Type</TableCell>
                  <TableCell isHeader>Applicant Volume</TableCell>
                  <TableCell isHeader>Status</TableCell>
                  <TableCell isHeader align="right">Actions</TableCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                {jobsList.map((job) => (
                  <TableRow key={job.id}>
                    <TableCell><span className="font-mono text-xs font-bold">{job.id}</span></TableCell>
                    <TableCell><span className="font-bold text-xs text-primary">{job.title}</span></TableCell>
                    <TableCell><span className="text-xs text-secondary">{job.dept}</span></TableCell>
                    <TableCell><span className="text-xs text-tertiary">{job.type}</span></TableCell>
                    <TableCell><strong className="text-xs text-primary">{job.applicants} Applicants</strong></TableCell>
                    <TableCell><Badge variant="success">{job.status}</Badge></TableCell>
                    <TableCell align="right">
                      <Button variant="outline" size="sm" onClick={() => navigate('/crm/hr/jobs')}>Manage Job</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardBody>
        </Card>
      )}

      {/* Interview Schedule Tab */}
      {activeTab === 'interviews' && (
        <Card style={{ borderRadius: '16px', boxShadow: 'var(--shadow-sm)' }}>
          <CardBody className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableCell isHeader>Interview ID</TableCell>
                  <TableCell isHeader>Candidate</TableCell>
                  <TableCell isHeader>Position</TableCell>
                  <TableCell isHeader>Assigned Interviewer</TableCell>
                  <TableCell isHeader>Scheduled Time</TableCell>
                  <TableCell isHeader>Status</TableCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                {interviewsList.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell><span className="font-mono text-xs font-bold">{item.id}</span></TableCell>
                    <TableCell><span className="font-bold text-xs text-primary">{item.candidate}</span></TableCell>
                    <TableCell><span className="text-xs text-secondary">{item.position}</span></TableCell>
                    <TableCell><span className="text-xs text-primary font-medium">{item.interviewer}</span></TableCell>
                    <TableCell><span className="text-xs text-tertiary font-bold">{item.time}</span></TableCell>
                    <TableCell>
                      <Badge variant={item.status === 'Completed' ? 'success' : 'warning'}>{item.status}</Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardBody>
        </Card>
      )}

      {/* Add Employee Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add New Employee"
      >
        <form onSubmit={handleCreateEmployee} className="flex flex-col gap-4">
          <Input
            label="Full Name *"
            placeholder="e.g. Michael Scott"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />

          <Input
            label="Corporate Email *"
            type="email"
            placeholder="e.g. m.scott@nergy.io"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />

          <Input
            label="Job Title"
            placeholder="e.g. Regional Manager"
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
          />

          <Select
            label="Department"
            value={formData.dept}
            onChange={(e) => setFormData({ ...formData, dept: e.target.value })}
            options={[
              { value: 'Engineering', label: 'Engineering' },
              { value: 'Sales', label: 'Sales' },
              { value: 'Finance', label: 'Finance' },
              { value: 'Human Resources', label: 'Human Resources' },
              { value: 'Executive', label: 'Executive' },
              { value: 'Operations', label: 'Operations' },
            ]}
          />

          <Input
            label="Annual Salary"
            placeholder="e.g. $140,000"
            value={formData.salary}
            onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
          />

          <div className="flex justify-end gap-2 mt-4 pt-3 border-t border-subtle">
            <Button variant="outline" size="sm" type="button" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" type="submit">
              Save Employee
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

