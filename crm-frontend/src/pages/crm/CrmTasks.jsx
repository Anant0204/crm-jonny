import React, { useState, useEffect } from 'react';
import {
  Plus,
  Calendar,
  List,
  CheckSquare,
  Square,
  Clock,
  User,
  Trash2,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  CalendarDays,
  CheckCircle2,
  Filter,
  AlertTriangle,
  Search,
  Sparkles
} from 'lucide-react';
import {
  Breadcrumb,
  Button,
  Card,
  CardHeader,
  CardBody,
  Badge,
  Modal,
  Input,
  Select,
  KPICard,
  Table,
  TableHeader,
  TableRow,
  TableCell,
  TableBody
} from '../../components/ui';
import { useCrm } from '../../context/CrmContext';
import { useToast } from '../../context/ToastContext';
import { useLanguage } from '../../context/LanguageContext';

export const CrmTasks = () => {
  const { t, language } = useLanguage();
  const { tasks, addTask, toggleTaskCompletion, deleteTask, refreshTasks } = useCrm();
  const { addToast } = useToast();

  useEffect(() => {
    if (refreshTasks) {
      refreshTasks();
    }
  }, [refreshTasks]);

  const [viewMode, setViewMode] = useState('calendar'); // 'calendar' or 'list'
  const [filterPriority, setFilterPriority] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDate, setSelectedDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Calendar Date State - Default to real current date
  const [currentDate, setCurrentDate] = useState(() => new Date());

  const [formData, setFormData] = useState(() => ({
    title: '',
    contact: '',
    priority: 'Medium',
    dueDate: new Date().toISOString().split('T')[0],
    reminder: '9:00 AM',
    assignedTo: 'Alexander Wright',
  }));

  const filteredTasks = tasks.filter((t) => {
    const matchPriority = filterPriority === 'all' || t.priority === filterPriority;
    const matchSearch =
      (t.title || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (t.contact && String(t.contact).toLowerCase().includes(searchQuery.toLowerCase()));
    return matchPriority && matchSearch;
  });

  // Month navigation helpers
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth + 1, 1));
  };

  const handleToday = () => {
    setCurrentDate(new Date());
  };

  // Calendar Calculation Logic
  const firstDayIndex = new Date(currentYear, currentMonth, 1).getDay();
  const daysInCurrentMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const daysInPrevMonth = new Date(currentYear, currentMonth, 0).getDate();

  const prevMonthCells = [];
  for (let i = firstDayIndex - 1; i >= 0; i--) {
    const dayNum = daysInPrevMonth - i;
    const m = currentMonth === 0 ? 12 : currentMonth;
    const y = currentMonth === 0 ? currentYear - 1 : currentYear;
    const dateStr = `${y}-${String(m).padStart(2, '0')}-${String(dayNum).padStart(2, '0')}`;
    prevMonthCells.push({
      dayNum,
      dateStr,
      isCurrentMonth: false,
    });
  }

  const currentMonthCells = [];
  for (let d = 1; d <= daysInCurrentMonth; d++) {
    const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
    currentMonthCells.push({
      dayNum: d,
      dateStr,
      isCurrentMonth: true,
    });
  }

  const totalCellsSoFar = prevMonthCells.length + currentMonthCells.length;
  const totalGridSlots = totalCellsSoFar > 35 ? 42 : 35;
  const nextMonthCells = [];
  const remainingSlots = totalGridSlots - totalCellsSoFar;
  for (let d = 1; d <= remainingSlots; d++) {
    const m = currentMonth === 11 ? 1 : currentMonth + 2;
    const y = currentMonth === 11 ? currentYear + 1 : currentYear;
    const dateStr = `${y}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
    nextMonthCells.push({
      dayNum,
      dateStr,
      isCurrentMonth: false,
    });
  }

  const allCalendarGridCells = [...prevMonthCells, ...currentMonthCells, ...nextMonthCells];
  const monthName = currentDate.toLocaleString(language === 'ES' ? 'es-ES' : 'en-US', { month: 'long' });
  const monthYearLabel = `${monthName.charAt(0).toUpperCase() + monthName.slice(1)} ${currentYear}`;
  const DAYS_OF_WEEK = language === 'ES'
    ? ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb']
    : ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const handleOpenAddModalForDate = (dateStr) => {
    setFormData({
      title: '',
      contact: '',
      priority: 'Medium',
      dueDate: dateStr || '2026-02-18',
      reminder: '9:00 AM',
      assignedTo: 'Alexander Wright',
    });
    setIsAddModalOpen(true);
  };

  const handleCreateTask = (e) => {
    e.preventDefault();
    if (!formData.title) {
      addToast({ title: 'Validation Error', message: 'Task title is required.', type: 'error' });
      return;
    }
    addTask(formData);
    if (formData.dueDate) {
      setSelectedDate(formData.dueDate);
    }
    addToast({ title: 'Task Scheduled', message: `Added "${formData.title}" for ${formData.dueDate}`, type: 'success' });
    setIsAddModalOpen(false);
  };

  // Selected date tasks
  const selectedDateTasks = filteredTasks.filter((t) => t.dueDate === selectedDate);

  return (
    <div className="flex flex-col gap-6" style={{ width: '100%', maxWidth: '100%', boxSizing: 'border-box' }}>
      {/* 1. Header */}
      <div className="page-header-row">
        <div>
          <Breadcrumb items={[{ label: 'CRM nErgy AI' }, { label: t('Tasks & Reminders') }]} />
          <h1 style={{ fontSize: 'var(--text-2xl)', marginTop: '0.25rem', marginBottom: '0.25rem' }}>{t('Tasks & Calendar Reminders')}</h1>
        </div>

        <div className="header-actions-right">
          {/* View Switcher Controls */}
          <div
            style={{
              display: 'inline-flex',
              padding: '3px',
              borderRadius: '8px',
              backgroundColor: 'var(--surface-secondary)',
              border: '1px solid var(--border)',
            }}
          >
            <button
              type="button"
              onClick={() => setViewMode('calendar')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '0.35rem 0.75rem',
                borderRadius: '6px',
                fontSize: '12px',
                fontWeight: 600,
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
                backgroundColor: viewMode === 'calendar' ? 'var(--primary)' : 'transparent',
                color: viewMode === 'calendar' ? '#ffffff' : 'var(--text-secondary)',
              }}
            >
              <Calendar size={14} />
              {t('Calendar View')}
            </button>
            <button
              type="button"
              onClick={() => setViewMode('list')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '0.35rem 0.75rem',
                borderRadius: '6px',
                fontSize: '12px',
                fontWeight: 600,
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
                backgroundColor: viewMode === 'list' ? 'var(--primary)' : 'transparent',
                color: viewMode === 'list' ? '#ffffff' : 'var(--text-secondary)',
              }}
            >
              <List size={14} />
              {t('List View')}
            </button>
          </div>

          <Button
            variant="primary"
            size="sm"
            icon={Plus}
            className="w-full md:w-auto justify-center"
            onClick={() => handleOpenAddModalForDate(selectedDate)}
          >
            {t('Create Task')}
          </Button>
        </div>
      </div>

      {/* 2. KPI Cards Strip */}
      <div className="grid-responsive-kpi">
        <KPICard
          title={t('TOTAL TASKS')}
          value={`${tasks.length}`}
          change={t("Live Sync")}
          changeType="positive"
          icon={CheckSquare}
        />
        <KPICard
          title={t('PENDING TASKS')}
          value={`${tasks.filter((t) => t.status === 'Pending').length}`}
          change={t("Action Required")}
          changeType="warning"
          icon={Clock}
        />
        <KPICard
          title={t('HIGH PRIORITY')}
          value={`${tasks.filter((t) => t.priority === 'High' && t.status === 'Pending').length}`}
          change={t("Due Soon")}
          changeType="error"
          icon={AlertCircle}
        />
        <KPICard
          title={t('COMPLETED RATE')}
          value={`${tasks.length > 0 ? Math.round((tasks.filter((t) => t.status === 'Completed').length / tasks.length) * 100) : 0}%`}
          change={t("Sprint Progress")}
          changeType="positive"
          icon={CheckCircle2}
        />
      </div>

      {/* 3. Filter Bar */}
      <div className="table-toolbar">
        <div className="table-toolbar-search">
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t("Search tasks by title or contact...")}
            startIcon={Search}
            style={{ height: '36px' }}
          />
        </div>

        <div className="table-toolbar-actions">
          <Select
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
            options={[
              { label: t('All Priorities'), value: 'all' },
              { label: t('High Priority'), value: 'High' },
              { label: t('Medium Priority'), value: 'Medium' },
              { label: t('Low Priority'), value: 'Low' },
            ]}
            style={{ height: '36px', fontSize: '13px' }}
          />
        </div>
      </div>

      {/* 4. CALENDAR VIEW */}
      {viewMode === 'calendar' ? (
        <div className="flex flex-col gap-5" style={{ width: '100%', boxSizing: 'border-box' }}>
          <Card style={{ padding: '1rem', borderRadius: '16px', border: '1px solid var(--border)', overflow: 'hidden', width: '100%', boxSizing: 'border-box' }}>
            {/* Calendar Month Header */}
            <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
              <div className="flex items-center gap-3">
                <h2 style={{ fontSize: '17px', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>
                  {monthYearLabel}
                </h2>
                <Button variant="outline" size="sm" onClick={handleToday} style={{ fontSize: '11px', padding: '2px 8px' }}>
                  {t('Today')}
                </Button>
              </div>

              <div className="flex items-center gap-1">
                <Button variant="ghost" size="sm" icon={ChevronLeft} onClick={handlePrevMonth} title={t("Previous Month")} />
                <Button variant="ghost" size="sm" icon={ChevronRight} onClick={handleNextMonth} title="Next Month" />
              </div>
            </div>

            {/* Weekday Columns (7 minmax columns) */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(7, minmax(0, 1fr))',
                textAlign: 'center',
                fontWeight: 700,
                fontSize: '11px',
                color: 'var(--text-tertiary)',
                paddingBottom: '0.5rem',
                borderBottom: '1px solid var(--border)',
                width: '100%',
              }}
            >
              {DAYS_OF_WEEK.map((day) => (
                <div key={day} style={{ padding: '2px' }}>{day}</div>
              ))}
            </div>

            {/* Calendar Days Grid */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(7, minmax(0, 1fr))',
                gap: '3px',
                marginTop: '4px',
                width: '100%',
              }}
            >
              {allCalendarGridCells.map((cell, idx) => {
                const isSelected = selectedDate === cell.dateStr;
                const cellTasks = filteredTasks.filter((t) => t.dueDate === cell.dateStr);

                return (
                  <div
                    key={idx}
                    onClick={() => setSelectedDate(cell.dateStr)}
                    style={{
                      minHeight: '46px',
                      padding: '3px 4px',
                      borderRadius: '6px',
                      backgroundColor: isSelected
                        ? 'rgba(37, 99, 235, 0.08)'
                        : cell.isCurrentMonth
                        ? 'var(--surface)'
                        : 'var(--surface-secondary)',
                      border: isSelected
                        ? '2px solid var(--accent)'
                        : '1px solid var(--border)',
                      opacity: cell.isCurrentMonth ? 1 : 0.45,
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      transition: 'all 0.15s ease',
                      minWidth: 0,
                      boxSizing: 'border-box',
                      overflow: 'hidden',
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <span
                        style={{
                          fontSize: '11px',
                          fontWeight: isSelected ? 800 : cell.isCurrentMonth ? 600 : 400,
                          color: isSelected ? 'var(--accent)' : 'var(--text-primary)',
                        }}
                      >
                        {cell.dayNum}
                      </span>
                      {cellTasks.length > 0 && (
                        <span
                          style={{
                            fontSize: '9px',
                            fontWeight: 700,
                            padding: '0 4px',
                            borderRadius: '10px',
                            backgroundColor: 'var(--accent)',
                            color: '#ffffff',
                            lineHeight: '14px',
                          }}
                        >
                          {cellTasks.length}
                        </span>
                      )}
                    </div>

                    {/* Task Pills in Date Cell */}
                    <div className="flex flex-col gap-0.5 mt-0.5 overflow-hidden">
                      {cellTasks.slice(0, 2).map((t) => (
                        <div
                          key={t.id}
                          style={{
                            fontSize: '9px',
                            padding: '1px 2px',
                            borderRadius: '3px',
                            backgroundColor: t.status === 'Completed'
                              ? 'rgba(34, 197, 94, 0.15)'
                              : t.priority === 'High'
                              ? 'rgba(239, 68, 68, 0.15)'
                              : 'rgba(37, 99, 235, 0.15)',
                            color: t.status === 'Completed'
                              ? 'var(--success)'
                              : t.priority === 'High'
                              ? 'var(--error)'
                              : 'var(--accent)',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            fontWeight: 600,
                          }}
                        >
                          {t.title}
                        </div>
                      ))}
                      {cellTasks.length > 2 && (
                        <span style={{ fontSize: '8px', color: 'var(--text-tertiary)', fontWeight: 600 }}>
                          +{cellTasks.length - 2}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>

          {/* Selected Date Detail Section */}
          <div className="flex flex-col gap-3 mt-2" style={{ width: '100%', boxSizing: 'border-box' }}>
            <div className="flex flex-col gap-0.5">
              <h3 style={{ fontSize: '15px', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>
                Tasks Scheduled for {selectedDate}
              </h3>
              <span className="text-xs text-tertiary font-medium">{selectedDateTasks.length} action items on this date</span>
            </div>

            {selectedDateTasks.length === 0 ? (
              <div className="py-4 text-xs text-tertiary font-medium">
                No tasks scheduled for {selectedDate}. Use "+ Create Task" button above to schedule a task.
              </div>
            ) : (
              <div className="flex flex-col gap-2.5" style={{ width: '100%', maxWidth: '100%', minWidth: 0, boxSizing: 'border-box' }}>
                {selectedDateTasks.map((t) => (
                  <div
                    key={t.id}
                    className="p-3 surface-secondary rounded-lg flex items-center justify-between gap-2"
                    style={{
                      backgroundColor: 'var(--surface-secondary)',
                      borderRadius: '12px',
                      border: '1px solid var(--border)',
                      width: '100%',
                      maxWidth: '100%',
                      minWidth: 0,
                      boxSizing: 'border-box',
                      overflow: 'hidden',
                    }}
                  >
                    <button
                      type="button"
                      onClick={() => toggleTaskCompletion(t.id)}
                      className="text-secondary hover:text-primary cursor-pointer p-0 bg-transparent border-0 flex-shrink-0"
                    >
                      {t.status === 'Completed' ? (
                        <CheckSquare size={18} className="text-success" />
                      ) : (
                        <Square size={18} />
                      )}
                    </button>

                    <div className="flex flex-col min-w-0 flex-1" style={{ gap: '2px', minWidth: 0, overflow: 'hidden' }}>
                      <span
                        className="font-bold text-xs text-primary truncate"
                        style={{
                          textDecoration: t.status === 'Completed' ? 'line-through' : 'none',
                          fontSize: '13px',
                          display: 'block',
                          maxWidth: '100%',
                          minWidth: 0,
                        }}
                      >
                        {t.title}
                      </span>
                      <div
                        className="text-xs text-tertiary truncate"
                        style={{ fontSize: '11px', display: 'block', maxWidth: '100%', minWidth: 0 }}
                      >
                        {t.contact && <span>Contact: <strong className="text-secondary">{typeof t.contact === 'object' && t.contact !== null ? t.contact.name : t.contact}</strong></span>}
                        {t.reminder && <span> · At {t.reminder}</span>}
                        {t.assignedTo && <span> · Owner: {t.assignedTo}</span>}
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 flex-shrink-0" style={{ flexShrink: 0 }}>
                      <Badge
                        variant={t.priority === 'High' ? 'error' : t.priority === 'Medium' ? 'warning' : 'primary'}
                        style={{ fontSize: '10px', padding: '1px 6px', whiteSpace: 'nowrap', flexShrink: 0 }}
                      >
                        {t.priority}
                      </Badge>
                      <Button
                        variant="ghost"
                        size="sm"
                        isIconOnly
                        icon={Trash2}
                        onClick={() => deleteTask(t.id)}
                        className="text-error"
                        style={{ height: '26px', width: '26px', padding: 0, flexShrink: 0 }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      ) : (
        /* 5. LIST VIEW */
        <Card>
          <CardBody className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableCell isHeader>Status</TableCell>
                  <TableCell isHeader>Task Title</TableCell>
                  <TableCell isHeader>Due Date</TableCell>
                  <TableCell isHeader>Related Contact</TableCell>
                  <TableCell isHeader>Priority</TableCell>
                  <TableCell isHeader>Assigned To</TableCell>
                  <TableCell isHeader align="right">Actions</TableCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTasks.map((t) => (
                  <TableRow key={t.id}>
                    <TableCell>
                      <button
                        type="button"
                        onClick={() => toggleTaskCompletion(t.id)}
                        className="cursor-pointer bg-transparent border-0 p-0"
                      >
                        {t.status === 'Completed' ? (
                          <CheckSquare size={16} className="text-success" />
                        ) : (
                          <Square size={16} className="text-tertiary" />
                        )}
                      </button>
                    </TableCell>
                    <TableCell>
                      <span
                        className="font-bold text-xs text-primary"
                        style={{ textDecoration: t.status === 'Completed' ? 'line-through' : 'none' }}
                      >
                        {t.title}
                      </span>
                    </TableCell>
                    <TableCell><span className="text-xs font-mono text-secondary">{t.dueDate}</span></TableCell>
                    <TableCell><span className="text-xs text-secondary">{t.contact || '—'}</span></TableCell>
                    <TableCell>
                      <Badge variant={t.priority === 'High' ? 'error' : t.priority === 'Medium' ? 'warning' : 'primary'}>
                        {t.priority}
                      </Badge>
                    </TableCell>
                    <TableCell><span className="text-xs text-tertiary">{t.assignedTo || 'Alexander Wright'}</span></TableCell>
                    <TableCell align="right">
                      <Button
                        variant="ghost"
                        size="sm"
                        icon={Trash2}
                        onClick={() => deleteTask(t.id)}
                        className="text-error"
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardBody>
        </Card>
      )}

      {/* 6. Modal: Create Task */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Schedule New CRM Task"
        footer={
          <>
            <Button variant="outline" size="sm" onClick={() => setIsAddModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" onClick={handleCreateTask}>
              Schedule Task
            </Button>
          </>
        }
      >
        <form onSubmit={handleCreateTask} className="flex flex-col gap-4">
          <Input
            label="Task Title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="e.g. Follow-up on debt term sheet with CFO"
            required
          />
          <Input
            label="Related Contact / Company"
            value={formData.contact}
            onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
            placeholder="e.g. Dr. Aris Thorne (BioGenix Labs)"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Due Date"
              type="date"
              value={formData.dueDate}
              onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
              required
            />
            <Select
              label="Priority Level"
              value={formData.priority}
              onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
              options={['High', 'Medium', 'Low']}
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Reminder Time"
              value={formData.reminder}
              onChange={(e) => setFormData({ ...formData, reminder: e.target.value })}
              placeholder="e.g. 10:30 AM"
            />
            <Input
              label="Assigned Owner"
              value={formData.assignedTo}
              onChange={(e) => setFormData({ ...formData, assignedTo: e.target.value })}
              placeholder="e.g. Alexander Wright"
            />
          </div>
        </form>
      </Modal>
    </div>
  );
};
