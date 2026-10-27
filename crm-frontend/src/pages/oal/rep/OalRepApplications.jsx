import React, { useState, useRef, useEffect } from 'react';
import { Breadcrumb, Card, CardBody, Table, TableHeader, TableBody, TableRow, TableCell, Badge, Input, Button } from '../../../components/ui';
import { Send, CheckSquare, Plus, Sparkles, ShieldCheck, CheckCircle2, User, Building2, Zap, ArrowRight, Clock, MessageSquare } from 'lucide-react';
import { useOal } from '../../../context/OalContext';
import { useToast } from '../../../context/ToastContext';

export const OalRepApplications = () => {
  const { lenderLeads } = useOal();

  return (
    <div className="flex flex-col gap-6">
      <Breadcrumb items={[{ label: 'OAL Rep' }, { label: 'Applications Underwriting Queue' }]} />
      <h1 style={{ fontSize: 'var(--text-2xl)' }}>Underwriting Applications Queue</h1>
      <Card>
        <CardBody className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableCell isHeader>App ID</TableCell>
                <TableCell isHeader>Borrower Entity</TableCell>
                <TableCell isHeader>Loan Purpose</TableCell>
                <TableCell isHeader>Amount</TableCell>
                <TableCell isHeader>Status</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {lenderLeads.map((l) => (
                <TableRow key={l.id}>
                  <TableCell><span className="font-mono text-xs">{l.id}</span></TableCell>
                  <TableCell><span className="font-semibold text-primary">{l.borrower}</span></TableCell>
                  <TableCell>{l.loanType}</TableCell>
                  <TableCell><span className="font-bold text-success">{l.amount}</span></TableCell>
                  <TableCell><Badge variant="primary">{l.status}</Badge></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardBody>
      </Card>
    </div>
  );
};

export const OalRepDocuments = () => {
  return (
    <div className="flex flex-col gap-6">
      <Breadcrumb items={[{ label: 'OAL Rep' }, { label: 'Document Verification' }]} />
      <h1 style={{ fontSize: 'var(--text-2xl)' }}>Document Verification Desk</h1>
      <Card className="p-6">
        <p className="text-xs text-secondary">Verify tax returns, bank statements, and articles of incorporation for BioGenix Labs and Apex Global.</p>
      </Card>
    </div>
  );
};

export const OalRepMessages = () => {
  const { messages, sendAgentMessage } = useOal();
  const { addToast } = useToast();
  const [msgText, setMsgText] = useState('');
  const messagesEndRef = useRef(null);

  // Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = (e) => {
    if (e) e.preventDefault();
    if (!msgText.trim()) {
      addToast({ title: 'Empty Message', message: 'Please write a message before sending.', type: 'warning' });
      return;
    }
    sendAgentMessage(msgText.trim());
    setMsgText('');
    addToast({ title: 'Message Sent to Borrower', type: 'success' });
  };

  const handleQuickPrompt = (promptText) => {
    sendAgentMessage(promptText);
    addToast({ title: 'Quick Update Sent', message: 'Prompt dispatched to borrower conversation.', type: 'info' });
  };

  const quickPrompts = [
    '📊 Term sheets from 2 institutional lenders are now ready for review.',
    '📋 Please upload your Q2 trailing 12-month P&L statements in KYC Vault.',
    '💰 Vanguard Capital confirmed 4.8% APR. Ready for final wire authorization.',
    '⏱️ Underwriting verification complete. Disbursal target set for 48h.',
  ];

  return (
    <div className="flex flex-col gap-5" style={{ maxWidth: '1000px', margin: '0 auto', width: '100%', boxSizing: 'border-box' }}>
      {/* 1. Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <Breadcrumb items={[{ label: 'OAL Rep' }, { label: 'Borrower Messages' }]} />
          <h1 style={{ fontSize: '22px', fontWeight: 800, margin: '0.25rem 0 0 0', color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
            Borrower Messaging Desk
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <Badge variant="success" icon={ShieldCheck} style={{ fontSize: '11px' }}>
            Encrypted Channel
          </Badge>
        </div>
      </div>

      {/* 2. Active Recipient Info Strip */}
      <Card style={{ padding: '0.85rem 1.15rem', borderRadius: '12px' }}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div style={{ position: 'relative', flexShrink: 0 }}>
              <div
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--accent)',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 800,
                  fontSize: '15px',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
                }}
              >
                DT
              </div>
              <span
                style={{
                  position: 'absolute',
                  bottom: '1px',
                  right: '1px',
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%',
                  backgroundColor: '#16a34a',
                  border: '2px solid var(--surface)',
                }}
                title="Online"
              />
            </div>

            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span style={{ fontSize: '14px', fontWeight: 800, color: 'var(--text-primary)' }}>
                  Dr. Aris Thorne
                </span>
                <span className="text-tertiary" style={{ fontSize: '12px' }}>
                  &bull; CEO, BioGenix Labs Inc.
                </span>
              </div>
              <span className="text-secondary truncate" style={{ fontSize: '11px' }}>
                Facility: <strong style={{ color: 'var(--text-primary)' }}>$750,000</strong> &bull; Score: <strong style={{ color: '#16a34a' }}>792 Grade A+</strong>
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <Badge variant="primary" icon={Sparkles} style={{ fontSize: '11px' }}>
              Ref #OAL-7749
            </Badge>
          </div>
        </div>
      </Card>

      {/* 3. Main Chat Container */}
      <Card style={{ borderRadius: '12px', overflow: 'hidden', display: 'flex', flexDirection: 'column', minHeight: '480px', border: '1px solid var(--border)' }}>
        {/* Messages Stream */}
        <div
          style={{
            flex: 1,
            padding: '1.25rem',
            overflowY: 'auto',
            maxHeight: '420px',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            backgroundColor: 'var(--surface-secondary)',
          }}
        >
          {messages.map((m) => {
            const isAgent = m.sender.includes('Sarah') || m.sender.includes('Agent');

            return (
              <div
                key={m.id}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: isAgent ? 'flex-end' : 'flex-start',
                  width: '100%',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '3px' }}>
                  <span style={{ fontSize: '11px', fontWeight: 700, color: isAgent ? 'var(--accent)' : 'var(--text-primary)' }}>
                    {m.sender}
                  </span>
                  <span className="text-tertiary" style={{ fontSize: '10px' }}>
                    {m.time}
                  </span>
                </div>

                <div
                  style={{
                    maxWidth: '85%',
                    padding: '10px 14px',
                    borderRadius: isAgent ? '14px 14px 2px 14px' : '14px 14px 14px 2px',
                    backgroundColor: isAgent ? 'var(--accent)' : 'var(--surface)',
                    color: isAgent ? '#ffffff' : 'var(--text-primary)',
                    fontSize: '13px',
                    lineHeight: '1.45',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
                    border: isAgent ? 'none' : '1px solid var(--border)',
                    wordBreak: 'break-word',
                  }}
                >
                  {m.text}
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Prompts Horizontal Touch-Scroll Bar */}
        <div
          style={{
            padding: '0.65rem 1rem',
            backgroundColor: 'var(--surface)',
            borderTop: '1px solid var(--border)',
            borderBottom: '1px solid var(--border)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            overflowX: 'auto',
            WebkitOverflowScrolling: 'touch',
            touchAction: 'pan-x',
            scrollbarWidth: 'none',
          }}
        >
          <span className="text-tertiary flex items-center gap-1" style={{ fontSize: '11px', fontWeight: 700, flexShrink: 0, textTransform: 'uppercase' }}>
            <Zap size={12} style={{ color: 'var(--accent)' }} /> Quick Responses:
          </span>
          {quickPrompts.map((p, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleQuickPrompt(p)}
              style={{
                padding: '4px 10px',
                borderRadius: '9999px',
                backgroundColor: 'var(--surface-secondary)',
                border: '1px solid var(--border)',
                color: 'var(--text-secondary)',
                fontSize: '11.5px',
                fontWeight: 500,
                whiteSpace: 'nowrap',
                cursor: 'pointer',
                flexShrink: 0,
                transition: 'all 0.15s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--accent)';
                e.currentTarget.style.color = 'var(--accent)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--border)';
                e.currentTarget.style.color = 'var(--text-secondary)';
              }}
            >
              {p}
            </button>
          ))}
        </div>

        {/* Chat Input Bar */}
        <form
          onSubmit={handleSend}
          style={{
            padding: '0.85rem 1rem',
            backgroundColor: 'var(--surface)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
          }}
        >
          <div style={{ flex: 1 }}>
            <Input
              value={msgText}
              onChange={(e) => setMsgText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend(e);
                }
              }}
              placeholder="Type agent response to borrower... (Press Enter to send)"
              style={{ height: '40px', fontSize: '13px', width: '100%' }}
            />
          </div>

          <Button
            variant="primary"
            size="md"
            type="submit"
            icon={Send}
            onClick={handleSend}
            style={{
              backgroundColor: 'var(--accent)',
              borderColor: 'var(--accent)',
              height: '40px',
              padding: '0 1.25rem',
              fontWeight: 700,
              fontSize: '13px',
              flexShrink: 0,
            }}
          >
            Send
          </Button>
        </form>
      </Card>
    </div>
  );
};

export const OalRepOffers = () => {
  const { offers } = useOal();

  return (
    <div className="flex flex-col gap-6">
      <Breadcrumb items={[{ label: 'OAL Rep' }, { label: 'Offers Marketplace Review' }]} />
      <h1 style={{ fontSize: 'var(--text-2xl)' }}>Marketplace Offers Review</h1>
      <Card>
        <CardBody className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableCell isHeader>Offer ID</TableCell>
                <TableCell isHeader>Lender Entity</TableCell>
                <TableCell isHeader>Amount</TableCell>
                <TableCell isHeader>Rate</TableCell>
                <TableCell isHeader>Status</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {offers.map((o) => (
                <TableRow key={o.id}>
                  <TableCell><span className="font-mono text-xs">{o.id}</span></TableCell>
                  <TableCell><span className="font-semibold">{o.lender}</span></TableCell>
                  <TableCell><span className="font-bold text-success">{o.amount}</span></TableCell>
                  <TableCell>{o.rate}</TableCell>
                  <TableCell><Badge variant="primary">{o.status}</Badge></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardBody>
      </Card>
    </div>
  );
};

export const OalRepTasks = () => {
  const { repTasks } = useOal();

  return (
    <div className="flex flex-col gap-6">
      <Breadcrumb items={[{ label: 'OAL Rep' }, { label: 'Rep Action Tasks' }]} />
      <h1 style={{ fontSize: 'var(--text-2xl)' }}>Agent Action Tasks</h1>
      <Card>
        <CardBody className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableCell isHeader>Task ID</TableCell>
                <TableCell isHeader>Task Title</TableCell>
                <TableCell isHeader>Borrower Entity</TableCell>
                <TableCell isHeader>Priority</TableCell>
                <TableCell isHeader>Status</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {repTasks.map((t) => (
                <TableRow key={t.id}>
                  <TableCell><span className="font-mono text-xs">{t.id}</span></TableCell>
                  <TableCell><span className="font-semibold text-primary">{t.title}</span></TableCell>
                  <TableCell>{t.borrower}</TableCell>
                  <TableCell><Badge variant={t.priority === 'High' ? 'error' : 'warning'}>{t.priority}</Badge></TableCell>
                  <TableCell><Badge variant={t.status === 'Completed' ? 'success' : 'primary'}>{t.status}</Badge></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardBody>
      </Card>
    </div>
  );
};
