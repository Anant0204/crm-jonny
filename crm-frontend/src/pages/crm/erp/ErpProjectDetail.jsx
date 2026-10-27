import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  FolderGit2,
  ArrowLeft,
  CheckCircle2,
  Building2,
  DollarSign,
  Calendar,
  Clock,
  TrendingUp,
  ShieldCheck,
  Layers
} from 'lucide-react';
import { Breadcrumb, Button, Card, Badge, ProgressBar, Timeline } from '../../../components/ui';
import { useErp } from '../../../context/ErpContext';

export const ErpProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { projects } = useErp();

  const project = projects.find((p) => p.id === id) || projects[0];

  return (
    <div className="flex flex-col gap-6" style={{ width: '100%', maxWidth: '100%', boxSizing: 'border-box' }}>
      {/* 1. Header */}
      <div className="page-header-row">
        <div>
          <Breadcrumb items={[{ label: 'ERP' }, { label: 'Projects', href: '/crm/erp/projects' }, { label: project.name }]} />
          <h1 style={{ fontSize: 'var(--text-2xl)', marginTop: '0.25rem', marginBottom: '0.25rem' }}>
            {project.name}
          </h1>
          <p className="text-xs text-secondary margin-0">
            ERP Project milestones tracking, financial metrics, and delivery timeline status
          </p>
        </div>
        <div className="header-actions-right">
          <Button
            variant="outline"
            size="sm"
            icon={ArrowLeft}
            onClick={() => navigate('/crm/erp/projects')}
            style={{ borderRadius: '8px', padding: '0.5rem 1rem' }}
          >
            Back to Projects
          </Button>
        </div>
      </div>

      {/* 2. Main 2-Column Dashboard Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Left Card: Project Overview & Key Financial Metrics */}
        <Card className="p-6 flex flex-col gap-6" style={{ borderRadius: '16px', backgroundColor: 'var(--surface)' }}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '10px',
                  backgroundColor: 'rgba(29, 78, 216, 0.1)',
                  color: '#1d4ed8',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Layers size={18} />
              </div>
              <h3 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
                Project Overview
              </h3>
            </div>

            <Badge variant="primary" style={{ fontSize: '11px', padding: '4px 10px' }}>
              {project.status || 'In Progress'}
            </Badge>
          </div>

          {/* Box-Free Key-Value Details */}
          <div className="flex flex-col gap-3">
            {/* Detail 1: Client */}
            <div className="flex items-center justify-between py-1.5">
              <span className="text-xs text-tertiary font-semibold flex items-center gap-2">
                <Building2 size={15} className="text-primary" /> Client Enterprise:
              </span>
              <span className="text-sm font-bold text-primary">{project.client}</span>
            </div>

            {/* Detail 2: Budget */}
            <div className="flex items-center justify-between py-1.5">
              <span className="text-xs text-tertiary font-semibold flex items-center gap-2">
                <DollarSign size={15} className="text-success" /> Total Allocated Budget:
              </span>
              <span className="text-sm font-extrabold text-success">{project.budget}</span>
            </div>

            {/* Detail 3: Capital Spent */}
            <div className="flex items-center justify-between py-1.5">
              <span className="text-xs text-tertiary font-semibold flex items-center gap-2">
                <TrendingUp size={15} className="text-primary" /> Capital Disbursed / Spent:
              </span>
              <span className="text-sm font-bold text-secondary">{project.spent || '$180,000'}</span>
            </div>

            {/* Detail 4: Target Deadline */}
            <div className="flex items-center justify-between py-1.5">
              <span className="text-xs text-tertiary font-semibold flex items-center gap-2">
                <Calendar size={15} className="text-tertiary" /> Target Delivery Deadline:
              </span>
              <span className="text-sm font-bold text-primary">{project.deadline || '2026-08-30'}</span>
            </div>
          </div>

          {/* Progress Bar Container */}
          <div className="flex flex-col gap-2 pt-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-secondary uppercase tracking-wider">Overall Completion Progress</span>
              <span className="font-extrabold text-primary" style={{ fontSize: '13px' }}>
                {project.progress}% Complete
              </span>
            </div>
            <ProgressBar value={project.progress} variant="success" />
          </div>
        </Card>

        {/* Right Card: Milestone Timeline */}
        <Card className="p-6 flex flex-col gap-6" style={{ borderRadius: '16px', backgroundColor: 'var(--surface)' }}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '10px',
                  backgroundColor: 'rgba(22, 163, 74, 0.1)',
                  color: '#16a34a',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <CheckCircle2 size={18} />
              </div>
              <h3 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
                Milestone Execution Timeline
              </h3>
            </div>
            <span className="text-xs text-tertiary font-medium">3 Phases</span>
          </div>

          <div className="pt-1">
            <Timeline
              items={[
                {
                  title: 'Project Kickoff & Requirements',
                  description: 'SLA parameters baseline approved by client executive committee.',
                  time: 'Milestone 1 - Complete',
                  color: 'var(--success)',
                },
                {
                  title: 'Infrastructure Deployment',
                  description: 'Server hardware delivered, configured, and network nodes installed.',
                  time: 'Milestone 2 - Complete',
                  color: 'var(--success)',
                },
                {
                  title: 'User Acceptance Testing (UAT)',
                  description: 'Final staging regression testing and end-user onboarding in progress.',
                  time: 'Milestone 3 - In Progress',
                  color: 'var(--primary)',
                },
              ]}
            />
          </div>
        </Card>

      </div>
    </div>
  );
};
