import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { LifeBuoy, ArrowLeft, Send } from 'lucide-react';
import { Breadcrumb, Button, Card, CardBody, Badge, Input } from '../../../components/ui';
import { useSupport } from '../../../context/SupportContext';
import { useToast } from '../../../context/ToastContext';

export const SupportTicketDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { tickets, updateTicketStatus } = useSupport();
  const { addToast } = useToast();

  const [response, setResponse] = useState('');

  const tck = tickets.find((t) => t.id === id) || tickets[0];

  const handleSendResponse = (e) => {
    e.preventDefault();
    if (!response.trim()) return;
    addToast({ title: 'Response Dispatched', message: 'Sent support resolution response to customer.', type: 'success' });
    setResponse('');
  };

  return (
    <div className="flex flex-col gap-6" style={{ width: '100%', maxWidth: '100%', boxSizing: 'border-box' }}>
      <div className="page-header-row">
        <div>
          <Breadcrumb items={[{ label: 'Support' }, { label: 'Tickets', href: '/crm/support/tickets' }, { label: tck.id }]} />
          <h1 style={{ fontSize: 'var(--text-2xl)', marginTop: '0.25rem', marginBottom: '0.25rem' }}>{tck.subject}</h1>
        </div>
        <div className="header-actions-right">
          <Button variant="outline" size="sm" icon={ArrowLeft} onClick={() => navigate('/crm/support/tickets')} style={{ borderRadius: '8px' }}>
            Back to Tickets
          </Button>
        </div>
      </div>

      {/* Main Box-Free Detail Section */}
      <div className="flex flex-col gap-6" style={{ width: '100%', boxSizing: 'border-box' }}>
        {/* Ticket Header Metadata Bar (Box-Free Row) */}
        <div className="flex items-center justify-between gap-4 flex-wrap pb-2">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="font-bold text-sm text-primary">Customer: {tck.customer}</span>
            <Badge variant="primary" style={{ fontSize: '11px', padding: '3px 10px' }}>{tck.category}</Badge>
          </div>
          <Badge variant={tck.status === 'Resolved' ? 'success' : 'warning'} style={{ fontSize: '11px', padding: '4px 12px' }}>
            {tck.status}
          </Badge>
        </div>

        {/* Issue Overview Card */}
        <div
          className="p-5 rounded-xl surface-secondary"
          style={{
            backgroundColor: 'var(--surface-secondary)',
            fontSize: '13px',
            lineHeight: 1.6,
            color: 'var(--text-secondary)',
          }}
        >
          Customer reported issue: <strong className="text-primary">{tck.subject}</strong>. System logs show API response latency spikes during hourly batch data synchronization.
        </div>

        {/* Support Response Form with Generous Internal Spacing (Buttons Never Touch Border!) */}
        <form onSubmit={handleSendResponse} className="flex flex-col gap-4 pt-2">
          <Input
            value={response}
            onChange={(e) => setResponse(e.target.value)}
            placeholder="Type technical support response to customer..."
            required
            style={{ height: '44px', fontSize: '13px' }}
          />

          <div
            className="flex items-center justify-between gap-3 flex-wrap pt-2"
            style={{ width: '100%', boxSizing: 'border-box' }}
          >
            <div className="flex items-center gap-3 flex-wrap">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => updateTicketStatus(tck.id, 'Resolved')}
                style={{ borderRadius: '8px', padding: '0.5rem 1rem' }}
              >
                Mark Resolved
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => updateTicketStatus(tck.id, 'Closed')}
                style={{ borderRadius: '8px', padding: '0.5rem 1rem' }}
              >
                Close Ticket
              </Button>
            </div>

            <Button
              variant="primary"
              size="sm"
              type="submit"
              icon={Send}
              style={{ borderRadius: '8px', padding: '0.5rem 1.25rem' }}
            >
              Send Response
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
