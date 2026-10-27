import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Users, FileText, CheckCircle2, MessageSquare, CheckSquare, ArrowRight } from 'lucide-react';
import { Breadcrumb, Button, KPICard, Card, CardHeader, CardBody, Badge, Table, TableHeader, TableBody, TableRow, TableCell } from '../../../components/ui';
import { useOal } from '../../../context/OalContext';

export const OalRepDashboard = () => {
  const navigate = useNavigate();
  const { repTasks, messages, lenderLeads } = useOal();

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <Breadcrumb items={[{ label: 'OAL Network' }, { label: 'Licensed Representative Portal' }]} />
          <h1 style={{ fontSize: 'var(--text-2xl)' }}>Licensed OAL Agent Dashboard</h1>
          <p className="text-xs text-secondary margin-0">
            Agent: Sarah Jenkins — Managing borrower KYC verification, document underwriting, and lender negotiations
          </p>
        </div>

        <Button variant="primary" size="sm" icon={ArrowRight} onClick={() => navigate('/oal/rep/borrowers')}>
          View Borrower Queue
        </Button>
      </div>

      {/* KPI Cards */}
      <div className="grid-responsive-kpi">
        <div onClick={() => navigate('/oal/rep/borrowers')} className="cursor-pointer">
          <KPICard title="Assigned Borrowers" value="12 Borrowers" change="100% Verified" changeType="positive" icon={Users} />
        </div>
        <div onClick={() => navigate('/oal/rep/applications')} className="cursor-pointer">
          <KPICard title="Active Underwriting" value="6 Applications" change="Stage 7: Offers" changeType="positive" icon={FileText} />
        </div>
        <div onClick={() => navigate('/oal/rep/tasks')} className="cursor-pointer">
          <KPICard title="Rep Action Tasks" value={`${repTasks.length} Tasks`} change="1 High Priority" changeType="warning" icon={CheckSquare} />
        </div>
        <div onClick={() => navigate('/oal/rep/messages')} className="cursor-pointer">
          <KPICard title="Borrower Messages" value={`${messages.length} Threads`} change="Direct Channel" changeType="neutral" icon={MessageSquare} />
        </div>
      </div>

      {/* Borrower Underwriting Queue */}
      <Card>
        <CardHeader
          title="Borrower Underwriting Queue"
          subtitle="Review documents, update status, and manage lender term sheets"
          action={<Button variant="ghost" size="sm" onClick={() => navigate('/oal/rep/borrowers')}>View All</Button>}
        />
        <CardBody className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableCell isHeader>Lead ID</TableCell>
                <TableCell isHeader>Borrower Entity</TableCell>
                <TableCell isHeader>Requested Amount</TableCell>
                <TableCell isHeader>AI Credit Score</TableCell>
                <TableCell isHeader>Status</TableCell>
                <TableCell isHeader align="right">Actions</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {lenderLeads.map((b) => (
                <TableRow key={b.id}>
                  <TableCell><span className="font-mono text-xs">{b.id}</span></TableCell>
                  <TableCell><span className="font-semibold text-primary">{b.borrower}</span></TableCell>
                  <TableCell><span className="font-bold text-success">{b.amount}</span></TableCell>
                  <TableCell><Badge variant="success">{b.score} / 850</Badge></TableCell>
                  <TableCell><Badge variant="primary">{b.status}</Badge></TableCell>
                  <TableCell align="right">
                    <Button variant="outline" size="sm" onClick={() => navigate('/oal/rep/borrowers')}>
                      Review Profile & Tasks
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardBody>
      </Card>
    </div>
  );
};
