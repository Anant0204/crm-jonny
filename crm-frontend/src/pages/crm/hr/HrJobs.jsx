import React from 'react';
import { Breadcrumb, Card, CardBody, Table, TableHeader, TableBody, TableRow, TableCell, Badge } from '../../../components/ui';

export const HrJobs = () => {
  const jobs = [
    { id: 'JOB-301', title: 'Senior Full Stack Engineer', dept: 'Engineering', location: 'Austin, TX (Hybrid)', status: 'Active', applicants: 24 },
    { id: 'JOB-302', title: 'Financial Controller', dept: 'Finance', location: 'Austin, TX (On-site)', status: 'Active', applicants: 12 },
  ];

  return (
    <div className="flex flex-col gap-6">
      <Breadcrumb items={[{ label: 'HR' }, { label: 'Job Openings' }]} />
      <h1 style={{ fontSize: 'var(--text-2xl)' }}>Active Job Postings</h1>

      <Card>
        <CardBody className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableCell isHeader>Job ID</TableCell>
                <TableCell isHeader>Role Title</TableCell>
                <TableCell isHeader>Department</TableCell>
                <TableCell isHeader>Location</TableCell>
                <TableCell isHeader>Applicants</TableCell>
                <TableCell isHeader>Status</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {jobs.map((j) => (
                <TableRow key={j.id}>
                  <TableCell><span className="font-mono text-xs">{j.id}</span></TableCell>
                  <TableCell><span className="font-semibold">{j.title}</span></TableCell>
                  <TableCell>{j.dept}</TableCell>
                  <TableCell>{j.location}</TableCell>
                  <TableCell><Badge variant="primary">{j.applicants} Applicants</Badge></TableCell>
                  <TableCell><Badge variant="success">{j.status}</Badge></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardBody>
      </Card>
    </div>
  );
};

export const HrInterviews = () => {
  const interviews = [
    { id: 'INT-401', candidate: 'Marcus Vance', position: 'Senior Full Stack Engineer', interviewer: 'Alexander Wright', date: '2026-03-02', time: '10:00 AM', status: 'Scheduled' },
  ];

  return (
    <div className="flex flex-col gap-6">
      <Breadcrumb items={[{ label: 'HR' }, { label: 'Interview Schedule' }]} />
      <h1 style={{ fontSize: 'var(--text-2xl)' }}>Recruitment Interviews</h1>

      <Card>
        <CardBody className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableCell isHeader>ID</TableCell>
                <TableCell isHeader>Candidate</TableCell>
                <TableCell isHeader>Position</TableCell>
                <TableCell isHeader>Interviewer</TableCell>
                <TableCell isHeader>Date & Time</TableCell>
                <TableCell isHeader>Status</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {interviews.map((i) => (
                <TableRow key={i.id}>
                  <TableCell><span className="font-mono text-xs">{i.id}</span></TableCell>
                  <TableCell><span className="font-semibold">{i.candidate}</span></TableCell>
                  <TableCell>{i.position}</TableCell>
                  <TableCell>{i.interviewer}</TableCell>
                  <TableCell>{i.date} at {i.time}</TableCell>
                  <TableCell><Badge variant="success">{i.status}</Badge></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardBody>
      </Card>
    </div>
  );
};

export const HrReports = () => {
  return (
    <div className="flex flex-col gap-6">
      <Breadcrumb items={[{ label: 'HR' }, { label: 'HR Analytics Reports' }]} />
      <h1 style={{ fontSize: 'var(--text-2xl)' }}>HR Executive Reports</h1>
      <Card className="p-6">
        <p className="text-xs text-secondary">Workforce retention report, payroll distribution summary, and recruitment cost per hire reports.</p>
      </Card>
    </div>
  );
};
