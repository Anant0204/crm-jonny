import React, { useState } from 'react';
import { LifeBuoy, Search, Sparkles, Send, Plus, CheckCircle2, BookOpen } from 'lucide-react';
import { Breadcrumb, Button, Card, CardHeader, CardBody, Input, Badge, Table, TableHeader, TableBody, TableRow, TableCell } from '../../../components/ui';
import { useToast } from '../../../context/ToastContext';

export const OalAdminSupport = () => {
  const { addToast } = useToast();

  const [question, setQuestion] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [aiAnswer, setAiAnswer] = useState(null);

  const [tickets, setTickets] = useState([
    { id: 'TCK-901', user: 'BioGenix Labs', subject: 'Plaid Bank Telemetry Sync Delay', priority: 'Medium', status: 'In Progress' },
    { id: 'TCK-902', user: 'Vanguard Capital', subject: 'ACH Wire Settlement Confirmation', priority: 'High', status: 'Resolved' },
  ]);

  const handleAskAI = (e) => {
    e.preventDefault();
    if (!question.trim()) return;

    setIsSearching(true);
    setAiAnswer(null);

    setTimeout(() => {
      setIsSearching(false);
      setAiAnswer({
        query: question,
        matchedArticle: 'KB-102: Connecting OAL Network Marketplace API & Plaid Telemetry',
        answer: `AI Knowledge Base Answer: Regarding "${question}" — OAL Network uses isolated 256-bit bank telemetry bridges. If a Plaid sync delay occurs during underwriting, your assigned OAL Agent can manually refresh bank statements from the document vault within 5 minutes.`,
      });
      addToast({ title: 'AI Knowledge Base Searched', type: 'info' });
    }, 800);
  };

  const handleCreateTicketFromAI = () => {
    const newTck = {
      id: `TCK-${Math.floor(900 + Math.random() * 90)}`,
      user: 'Dr. Aris Thorne (BioGenix)',
      subject: question || 'Escalated Support Ticket',
      priority: 'High',
      status: 'Open',
    };
    setTickets([newTck, ...tickets]);
    addToast({ title: 'Support Ticket Created', message: 'Escalated to OAL Human Help Desk.', type: 'success' });
    setAiAnswer(null);
    setQuestion('');
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <Breadcrumb items={[{ label: 'OAL Admin' }, { label: 'AI Help Desk & Tickets' }]} />
          <h1 style={{ fontSize: 'var(--text-2xl)' }}>OAL Support & AI Help Desk</h1>
        </div>
      </div>

      {/* INTERACTIVE AI HELP DESK FLOW */}
      <Card className="p-6 flex flex-col gap-4 border-accent">
        <div className="flex items-center gap-2">
          <Sparkles className="text-accent" size={24} />
          <h3 className="text-base font-semibold">AI Interactive Support Assistant</h3>
        </div>

        <form onSubmit={handleAskAI} className="flex gap-2">
          <Input
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Type your question (e.g. Plaid telemetry, APR rate calculation, wire transfer fees)..."
            required
          />
          <Button variant="primary" type="submit" isLoading={isSearching} icon={Search} style={{ backgroundColor: 'var(--accent)', borderColor: 'var(--accent)' }}>
            Ask AI
          </Button>
        </form>

        {/* AI Answer & Escalation Card */}
        {aiAnswer && (
          <div className="p-4 surface-secondary rounded-md border-subtle flex flex-col gap-3 text-xs">
            <div className="flex items-center justify-between font-bold text-accent">
              <span className="flex items-center gap-1.5"><BookOpen size={16} /> Matched: {aiAnswer.matchedArticle}</span>
              <Badge variant="success">98% Match Confidence</Badge>
            </div>
            <p className="margin-0 text-secondary">{aiAnswer.answer}</p>

            <div className="flex items-center justify-between border-t border-subtle pt-3 mt-1">
              <span className="text-tertiary">Was this AI answer helpful?</span>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => addToast({ title: 'Feedback Recorded', type: 'success' })}>
                  Yes, Resolved
                </Button>
                <Button variant="primary" size="sm" icon={Plus} onClick={handleCreateTicketFromAI}>
                  No, Create Support Ticket
                </Button>
              </div>
            </div>
          </div>
        )}
      </Card>

      {/* TICKETS DIRECTORY */}
      <Card>
        <CardHeader title="Open Marketplace Support Tickets" />
        <CardBody className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableCell isHeader>Ticket ID</TableCell>
                <TableCell isHeader>User Account</TableCell>
                <TableCell isHeader>Issue Subject</TableCell>
                <TableCell isHeader>Priority</TableCell>
                <TableCell isHeader>Status</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tickets.map((t) => (
                <TableRow key={t.id}>
                  <TableCell><span className="font-mono text-xs">{t.id}</span></TableCell>
                  <TableCell><span className="font-semibold text-primary">{t.user}</span></TableCell>
                  <TableCell>{t.subject}</TableCell>
                  <TableCell><Badge variant={t.priority === 'High' ? 'error' : 'warning'}>{t.priority}</Badge></TableCell>
                  <TableCell><Badge variant={t.status === 'Resolved' ? 'success' : 'primary'}>{t.status}</Badge></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardBody>
      </Card>
    </div>
  );
};
