import React, { useState } from 'react';
import { Landmark, ShieldCheck, FileCheck, Award, ArrowRight } from 'lucide-react';
import {
  Breadcrumb,
  Button,
  KPICard,
  Card,
  CardHeader,
  CardBody,
  Badge,
  ProgressBar,
  Stepper,
  FileUpload,
  Modal
} from '../../components/ui';
import { useToast } from '../../context/ToastContext';

export const OalDashboard = () => {
  const { addToast } = useToast();
  const [isKycModalOpen, setIsKycModalOpen] = useState(false);

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <Breadcrumb items={[{ label: 'OAL Network' }, { label: 'Borrower Portal' }]} />
          <h1 style={{ fontSize: 'var(--text-2xl)' }}>Borrower Overview</h1>
          <p className="text-xs text-secondary margin-0">Manage loan applications, KYC identity verification, and funding offers</p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            icon={ShieldCheck}
            onClick={() => setIsKycModalOpen(true)}
          >
            Verify KYC Documents
          </Button>

          <Button
            variant="primary"
            size="sm"
            icon={Landmark}
            style={{ backgroundColor: 'var(--accent)', borderColor: 'var(--accent)' }}
            onClick={() => addToast({ title: 'New Application', message: 'Loan Application Wizard initialized.', type: 'info' })}
          >
            Apply for Business Loan
          </Button>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid-responsive-kpi">
        <KPICard title="Active Credit Limit" value="$750,000" change="+12%" changeType="positive" icon={Landmark} />
        <KPICard title="AI Risk Score" value="792 / 850" change="Grade A+" changeType="positive" icon={Award} />
        <KPICard title="Pending Offers" value="3 Lenders" change="4.8% APR" changeType="neutral" icon={FileCheck} />
        <KPICard title="KYC Verification" value="90% Complete" change="1 Action Needed" changeType="warning" icon={ShieldCheck} />
      </div>

      {/* Stepper Workflow */}
      <Card className="p-6">
        <h3 className="mb-4">Loan Application Progress</h3>
        <Stepper
          currentStep={2}
          steps={[
            { label: 'Account Created', description: 'Borrower ID verified' },
            { label: 'KYC & Financials', description: 'Docs uploaded' },
            { label: 'AI Score Engine', description: 'Underwriting evaluation' },
            { label: 'Lending Offers', description: 'Matching marketplace' },
            { label: 'Fund Transfer', description: 'Capital disbursement' },
          ]}
        />
      </Card>

      {/* Progress & Upload Card */}
      <div className="grid-responsive-2col">
        <Card>
          <CardHeader title="Marketplace Funding Readiness" subtitle="Complete profile tasks to unlock higher liquidity" />
          <CardBody className="flex flex-col gap-4">
            <ProgressBar value={75} variant="success" showLabel />
            <div className="flex items-center justify-between text-xs border-t border-subtle pt-3">
              <span>Financial Statements Verified</span>
              <Badge variant="success">Passed</Badge>
            </div>
            <div className="flex items-center justify-between text-xs border-t border-subtle pt-2">
              <span>Tax Returns 2025</span>
              <Badge variant="warning">Under Review</Badge>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardHeader title="Secure Document Upload" subtitle="Upload requested files for underwriting" />
          <CardBody>
            <FileUpload
              label="Borrower Document Dropzone"
              maxFiles={3}
              onFilesSelected={(files) => addToast({ title: 'Files Uploaded', message: `Attached ${files.length} document(s).`, type: 'success' })}
            />
          </CardBody>
        </Card>
      </div>

      {/* KYC Modal */}
      <Modal
        isOpen={isKycModalOpen}
        onClose={() => setIsKycModalOpen(false)}
        title="KYC Verification Portal"
        footer={
          <Button variant="primary" size="sm" onClick={() => setIsKycModalOpen(false)}>
            Close Portal
          </Button>
        }
      >
        <p className="text-xs text-secondary mb-4">
          Government-issued photo identity and corporate tax returns are encrypted and securely verified against global compliance databases.
        </p>
        <Badge variant="success" icon={ShieldCheck}>
          256-bit TLS Encrypted API Vault
        </Badge>
      </Modal>
    </div>
  );
};
