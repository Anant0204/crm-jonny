import React, { useState } from 'react';
import {
  Inbox,
  MessageSquare,
  Mail,
  Phone,
  Car,
  Send,
  Sparkles,
  Clock,
  CheckCheck,
  Search,
  Filter,
  Calendar,
  DollarSign,
  Tag,
  User,
  CheckCircle2
} from 'lucide-react';
import { toast } from '../../../utils/ompToast';

export const UnifiedInbox = () => {
  const [activeChannel, setActiveChannel] = useState('all');
  const [selectedThreadId, setSelectedThreadId] = useState('1');
  const [messageText, setMessageText] = useState('');

  const [threads, setThreads] = useState([
    {
      id: '1',
      customerName: 'Derrick Miller',
      channel: 'OfferUp',
      lastMessage: 'Is the 2021 Ford F-150 still available for a test drive today?',
      timestamp: '10 mins ago',
      unread: true,
      vehicle: {
        year: 2021,
        make: 'Ford',
        model: 'F-150 Lariat 4WD',
        vin: '1FTFW1E85MFB19823',
        price: '$34,990',
        stock: 'STK-8492',
      },
      messages: [
        { sender: 'buyer', text: 'Hi! I saw your listing on OfferUp for the 2021 Ford F-150.', time: '11:42 AM' },
        { sender: 'dealer', text: 'Hello Derrick! Yes, it is on the lot and passed our 150-point inspection.', time: '11:45 AM' },
        { sender: 'buyer', text: 'Is the 2021 Ford F-150 still available for a test drive today?', time: '11:52 AM' },
      ],
    },
    {
      id: '2',
      customerName: 'Sarah Jenkins',
      channel: 'SMS',
      lastMessage: 'Can you send me the Carfax report and the lowest monthly payment quote?',
      timestamp: '25 mins ago',
      unread: true,
      vehicle: {
        year: 2022,
        make: 'Honda',
        model: 'CR-V EX-L AWD',
        vin: '7FARW2H84NE029184',
        price: '$27,850',
        stock: 'STK-9102',
      },
      messages: [
        { sender: 'buyer', text: 'Can you send me the Carfax report and the lowest monthly payment quote?', time: '11:30 AM' },
      ],
    },
    {
      id: '3',
      customerName: 'Carlos Rodriguez',
      channel: 'Email',
      lastMessage: 'I submitted my credit application via OAL Network link. Did you get it?',
      timestamp: '2 hours ago',
      unread: false,
      vehicle: {
        year: 2020,
        make: 'Chevrolet',
        model: 'Silverado 1500 RST',
        vin: '3GCUYDED8LG294819',
        price: '$31,400',
        stock: 'STK-7721',
      },
      messages: [
        { sender: 'buyer', text: 'I submitted my credit application via OAL Network link. Did you get it?', time: '09:40 AM' },
        { sender: 'dealer', text: 'Got it Carlos! Our F&I manager is reviewing the lender approvals now.', time: '09:55 AM' },
      ],
    },
    {
      id: '4',
      customerName: 'Ashley Taylor',
      channel: 'Call Log',
      lastMessage: 'Missed Call (Duration: 0:42) - Voice AI recorded interest in Tesla Model 3',
      timestamp: 'Yesterday',
      unread: false,
      vehicle: {
        year: 2021,
        make: 'Tesla',
        model: 'Model 3 Long Range',
        vin: '5YJ3E1EB9MF827391',
        price: '$28,900',
        stock: 'STK-6610',
      },
      messages: [
        { sender: 'buyer', text: 'AI Call Log: Caller asked about battery health and financing options.', time: 'Yesterday 4:15 PM' },
      ],
    },
  ]);

  const activeThread = threads.find((t) => t.id === selectedThreadId) || threads[0];

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!messageText.trim()) return;

    setThreads((prev) =>
      prev.map((t) => {
        if (t.id === selectedThreadId) {
          return {
            ...t,
            lastMessage: messageText,
            timestamp: 'Just now',
            unread: false,
            messages: [...t.messages, { sender: 'dealer', text: messageText, time: 'Just now' }],
          };
        }
        return t;
      })
    );
    setMessageText('');
    toast.success('Message sent via ' + activeThread.channel);
  };

  const handleQuickTemplate = (template) => {
    setMessageText(template);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', height: 'calc(100vh - 120px)' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem', flexShrink: 0 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, padding: '0.15rem 0.5rem', borderRadius: '4px', backgroundColor: 'rgba(56, 189, 248, 0.1)', color: '#0284c7', border: '1px solid rgba(56, 189, 248, 0.2)' }}>
              TASK E-11 • PILLAR 3
            </span>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>Omnichannel Leads & Buyer Messaging</span>
          </div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)', margin: '0.2rem 0 0 0' }}>
            OMP Deals Unified Omnichannel Inbox
          </h1>
        </div>

        {/* Channel Filters */}
        <div style={{ display: 'flex', gap: '0.4rem', backgroundColor: 'var(--surface)', padding: '0.25rem', borderRadius: '8px', border: '1px solid var(--border)' }}>
          {['all', 'OfferUp', 'SMS', 'Email', 'Call Log'].map((ch) => (
            <button
              key={ch}
              onClick={() => setActiveChannel(ch)}
              style={{
                backgroundColor: activeChannel === ch ? '#0284c7' : 'transparent',
                color: activeChannel === ch ? '#ffffff' : 'var(--text-secondary)',
                border: 'none',
                padding: '0.35rem 0.75rem',
                borderRadius: '6px',
                fontSize: '0.75rem',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              {ch.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Main Inbox 3-Column Split */}
      <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '320px 1fr 280px', gap: '1rem', minHeight: 0, overflow: 'hidden' }}>
        {/* Column 1: Conversations List */}
        <div style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '12px', display: 'flex', flexDirection: 'column', overflow: 'hidden', boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ padding: '0.75rem', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: '0.5rem', backgroundColor: 'var(--surface-secondary)' }}>
            <Search size={15} color="var(--text-tertiary)" />
            <input
              placeholder="Search leads, VIN, names..."
              style={{ background: 'transparent', border: 'none', color: 'var(--text-primary)', fontSize: '0.82rem', outline: 'none', width: '100%' }}
            />
          </div>

          <div style={{ flex: 1, overflowY: 'auto', padding: '0.5rem', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
            {threads
              .filter((t) => activeChannel === 'all' || t.channel === activeChannel)
              .map((t) => {
                const isSelected = t.id === selectedThreadId;
                return (
                  <div
                    key={t.id}
                    onClick={() => setSelectedThreadId(t.id)}
                    style={{
                      padding: '0.75rem',
                      borderRadius: '8px',
                      backgroundColor: isSelected ? 'rgba(2, 132, 199, 0.12)' : 'transparent',
                      border: isSelected ? '1px solid rgba(2, 132, 199, 0.3)' : '1px solid transparent',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
                      <span style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: '0.85rem' }}>{t.customerName}</span>
                      <span style={{ fontSize: '0.7rem', color: 'var(--text-tertiary)' }}>{t.timestamp}</span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', marginBottom: '0.35rem' }}>
                      <span style={{ fontSize: '0.65rem', padding: '0.1rem 0.35rem', borderRadius: '4px', backgroundColor: 'rgba(2, 132, 199, 0.15)', color: '#0284c7', fontWeight: 700 }}>
                        {t.channel}
                      </span>
                      <span style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {t.vehicle.year} {t.vehicle.make} {t.vehicle.model}
                      </span>
                    </div>

                    <p style={{ fontSize: '0.75rem', color: isSelected ? 'var(--text-primary)' : 'var(--text-tertiary)', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {t.lastMessage}
                    </p>
                  </div>
                );
              })}
          </div>
        </div>

        {/* Column 2: Active Chat Thread */}
        <div style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '12px', display: 'flex', flexDirection: 'column', overflow: 'hidden', boxShadow: 'var(--shadow-sm)' }}>
          {/* Thread Header */}
          <div style={{ padding: '0.85rem 1.25rem', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'var(--surface-secondary)' }}>
            <div>
              <div style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: '0.95rem' }}>{activeThread.customerName}</div>
              <div style={{ fontSize: '0.75rem', color: '#0284c7', fontWeight: 600 }}>Channel: {activeThread.channel} • Ready to Desk</div>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button style={{ backgroundColor: 'rgba(16, 185, 129, 0.15)', color: '#10b981', border: '1px solid rgba(16, 185, 129, 0.3)', padding: '0.35rem 0.65rem', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.3rem', cursor: 'pointer' }}>
                <Phone size={13} /> Click-to-Call
              </button>
            </div>
          </div>

          {/* Messages Stream */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', backgroundColor: 'var(--background)' }}>
            {activeThread.messages.map((m, idx) => {
              const isDealer = m.sender === 'dealer';
              return (
                <div
                  key={idx}
                  style={{
                    alignSelf: isDealer ? 'flex-end' : 'flex-start',
                    maxWidth: '75%',
                    backgroundColor: isDealer ? '#0284c7' : 'var(--surface)',
                    color: isDealer ? '#ffffff' : 'var(--text-primary)',
                    border: isDealer ? 'none' : '1px solid var(--border)',
                    padding: '0.75rem 1rem',
                    borderRadius: isDealer ? '12px 12px 2px 12px' : '12px 12px 12px 2px',
                    fontSize: '0.85rem',
                    boxShadow: 'var(--shadow-sm)',
                  }}
                >
                  <p style={{ margin: 0, lineHeight: 1.4 }}>{m.text}</p>
                  <span style={{ fontSize: '0.65rem', color: isDealer ? 'rgba(255, 255, 255, 0.8)' : 'var(--text-tertiary)', display: 'block', marginTop: '0.25rem', textAlign: 'right' }}>
                    {m.time}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Quick AI Templates */}
          <div style={{ padding: '0.5rem 1rem', borderTop: '1px solid var(--border)', display: 'flex', gap: '0.5rem', overflowX: 'auto', backgroundColor: 'var(--surface-secondary)' }}>
            <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.25rem', flexShrink: 0 }}>
              <Sparkles size={12} color="#0284c7" /> AI Quick Reply:
            </span>
            {[
              'Yes, it is ready for a test drive today!',
              'Here is the Carfax report link.',
              'Can I send you a 60-second payment quote?',
            ].map((tmpl, i) => (
              <button
                key={i}
                onClick={() => handleQuickTemplate(tmpl)}
                style={{ backgroundColor: 'var(--surface)', color: 'var(--text-primary)', border: '1px solid var(--border)', padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.7rem', cursor: 'pointer', whiteSpace: 'nowrap' }}
              >
                {tmpl}
              </button>
            ))}
          </div>

          {/* Message Input Bar */}
          <form onSubmit={handleSendMessage} style={{ padding: '0.75rem 1rem', borderTop: '1px solid var(--border)', display: 'flex', gap: '0.5rem', backgroundColor: 'var(--surface)' }}>
            <input
              type="text"
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              placeholder={`Type reply to ${activeThread.customerName} (${activeThread.channel})...`}
              style={{ flex: 1, backgroundColor: 'var(--background)', border: '1px solid var(--border)', borderRadius: '8px', padding: '0.55rem 0.85rem', color: 'var(--text-primary)', fontSize: '0.85rem', outline: 'none' }}
            />
            <button
              type="submit"
              style={{ backgroundColor: '#0284c7', color: '#fff', border: 'none', padding: '0 1rem', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <Send size={16} />
            </button>
          </form>
        </div>

        {/* Column 3: Vehicle of Interest Drawer */}
        <div style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '12px', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem', overflowY: 'auto', boxShadow: 'var(--shadow-sm)' }}>
          <div>
            <span style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-tertiary)', fontWeight: 700 }}>
              Vehicle of Interest
            </span>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', margin: '0.25rem 0 0 0' }}>
              {activeThread.vehicle.year} {activeThread.vehicle.make} {activeThread.vehicle.model}
            </h3>
            <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#10b981', marginTop: '0.25rem' }}>
              {activeThread.vehicle.price}
            </div>
          </div>

          <div style={{ backgroundColor: 'var(--surface-secondary)', padding: '0.75rem', borderRadius: '8px', fontSize: '0.78rem', display: 'flex', flexDirection: 'column', gap: '0.4rem', border: '1px solid var(--border)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
              <span>Stock #:</span>
              <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{activeThread.vehicle.stock}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
              <span>VIN:</span>
              <span style={{ color: 'var(--text-primary)', fontWeight: 600, fontSize: '0.7rem' }}>{activeThread.vehicle.vin}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
              <span>Carfax:</span>
              <span style={{ color: '#10b981', fontWeight: 600 }}>Clean 1-Owner</span>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <a
              href="/omp/desking/calculator"
              style={{ display: 'block', textAlign: 'center', backgroundColor: 'rgba(2, 132, 199, 0.1)', color: '#0284c7', border: '1px solid rgba(2, 132, 199, 0.3)', padding: '0.5rem', borderRadius: '6px', fontSize: '0.8rem', fontWeight: 700, textDecoration: 'none' }}
            >
              Desk Deal (60s Calculator)
            </a>
            <button
              onClick={() => toast.success('Carfax link attached to thread')}
              style={{ backgroundColor: 'var(--surface-secondary)', color: 'var(--text-primary)', border: '1px solid var(--border)', padding: '0.5rem', borderRadius: '6px', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer' }}
            >
              Attach Carfax Link
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
