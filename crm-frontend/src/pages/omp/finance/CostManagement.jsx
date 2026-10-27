import React, { useState } from 'react';
import {
  Receipt,
  Camera,
  Upload,
  Plus,
  Car,
  DollarSign,
  FileText,
  CheckCircle,
  Trash2,
  Tag,
  Search,
  AlertCircle
} from 'lucide-react';
import { toast } from '../../../utils/ompToast';

export const CostManagement = () => {
  const [selectedStock, setSelectedStock] = useState('STK-8492');
  const [expenseDesc, setExpenseDesc] = useState('');
  const [expenseAmount, setExpenseAmount] = useState('');
  const [expenseCategory, setExpenseCategory] = useState('Parts & Recon');

  const [expenses, setExpenses] = useState([
    { id: 1, stock: 'STK-8492', vehicle: '2021 Ford F-150 Lariat', category: 'Auction Acquisition', desc: 'Manheim Dallas Auction Hammer Price', amount: 26500, date: 'Sep 02, 2026', receipt: 'receipt_auction_8492.pdf' },
    { id: 2, stock: 'STK-8492', vehicle: '2021 Ford F-150 Lariat', category: 'Transport', desc: 'Flatbed Tow from Auction to Lot', amount: 350, date: 'Sep 03, 2026', receipt: 'tow_invoice.jpg' },
    { id: 3, stock: 'STK-8492', vehicle: '2021 Ford F-150 Lariat', category: 'Parts & Recon', desc: 'New Front Brake Rotors & Pads + Oil Change', amount: 680, date: 'Sep 05, 2026', receipt: 'brakes_parts.png' },
    { id: 4, stock: 'STK-8492', vehicle: '2021 Ford F-150 Lariat', category: 'Detailing', desc: 'Full Interior Ceramic Clean & Buff', amount: 220, date: 'Sep 06, 2026', receipt: 'detail_slip.jpg' },
    
    { id: 5, stock: 'STK-9102', vehicle: '2022 Honda CR-V EX-L', category: 'Trade-in ACV', desc: 'Customer Trade-in Allowance', amount: 23000, date: 'Sep 08, 2026', receipt: 'trade_acv_form.pdf' },
    { id: 6, stock: 'STK-9102', vehicle: '2022 Honda CR-V EX-L', category: 'Parts & Recon', desc: 'Cabin Filter & 2 New Tires', amount: 480, date: 'Sep 09, 2026', receipt: 'tires_receipt.jpg' },
  ]);

  const currentVehicleExpenses = expenses.filter((e) => e.stock === selectedStock);
  const totalCost = currentVehicleExpenses.reduce((sum, item) => sum + item.amount, 0);

  const handleAddExpense = (e) => {
    e.preventDefault();
    if (!expenseDesc || !expenseAmount) return;

    const newExp = {
      id: Date.now(),
      stock: selectedStock,
      vehicle: selectedStock === 'STK-8492' ? '2021 Ford F-150 Lariat' : '2022 Honda CR-V EX-L',
      category: expenseCategory,
      desc: expenseDesc,
      amount: Number(expenseAmount),
      date: 'Today',
      receipt: 'manual_receipt_upload.jpg',
    };

    setExpenses([newExp, ...expenses]);
    setExpenseDesc('');
    setExpenseAmount('');
    toast.success('Cost line-item added to ' + selectedStock);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, padding: '0.15rem 0.5rem', borderRadius: '4px', backgroundColor: 'var(--primary-subtle, rgba(56, 189, 248, 0.1))', color: 'var(--primary)', border: '1px solid var(--border)' }}>
              TASK E-17 • PILLAR 4
            </span>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>VIN-Linked Expense & Receipt Ledger</span>
          </div>
          <h1 style={{ fontSize: '1.65rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0, letterSpacing: '-0.02em' }}>
            Receipt & Vehicle Cost Management
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', margin: '0.25rem 0 0 0' }}>
            Capture repair orders, parts receipts, and acquisition costs directly linked to vehicle VIN# to maintain true profit margins.
          </p>
        </div>
      </div>

      {/* Vehicle Selector Bar */}
      <div style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '12px', padding: '1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', boxShadow: 'var(--shadow-sm)' }}>
        <div>
          <span style={{ fontSize: '0.72rem', color: 'var(--primary)', fontWeight: 700, textTransform: 'uppercase' }}>
            Select Vehicle Stock Ledger
          </span>
          <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.35rem' }}>
            {[
              { stock: 'STK-8492', label: '2021 Ford F-150 Lariat ($34,990 List)' },
              { stock: 'STK-9102', label: '2022 Honda CR-V EX-L ($27,850 List)' },
            ].map((v) => (
              <button
                key={v.stock}
                onClick={() => setSelectedStock(v.stock)}
                style={{
                  backgroundColor: selectedStock === v.stock ? 'var(--primary-subtle, rgba(56, 189, 248, 0.15))' : 'var(--background)',
                  color: selectedStock === v.stock ? 'var(--primary)' : 'var(--text-secondary)',
                  border: selectedStock === v.stock ? '1px solid var(--primary)' : '1px solid var(--border)',
                  padding: '0.5rem 0.9rem',
                  borderRadius: '8px',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                {v.label}
              </button>
            ))}
          </div>
        </div>

        <div style={{ textAlign: 'right' }}>
          <span style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>Accumulated True Cost Basis:</span>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#f59e0b' }}>
            ${totalCost.toLocaleString()}
          </div>
        </div>
      </div>

      {/* Main 2-Column Split: Add Cost Form vs Expense Ledger */}
      <div style={{ display: 'grid', gridTemplateColumns: '360px 1fr', gap: '1.5rem' }}>
        {/* Form Column */}
        <div style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '12px', padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1rem', boxShadow: 'var(--shadow-sm)' }}>
          <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
            Snap / Attach Vehicle Expense
          </h3>

          <form onSubmit={handleAddExpense} style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>Expense Category</label>
              <select
                value={expenseCategory}
                onChange={(e) => setExpenseCategory(e.target.value)}
                style={{ width: '100%', backgroundColor: 'var(--background)', border: '1px solid var(--border)', borderRadius: '6px', padding: '0.5rem', color: 'var(--text-primary)', fontSize: '0.85rem', outline: 'none' }}
              >
                <option value="Parts & Recon">Parts & Recon Repair</option>
                <option value="Auction Acquisition">Auction Acquisition Price</option>
                <option value="Transport">Vehicle Transport / Towing</option>
                <option value="Detailing">Detailing & Cosmetic</option>
                <option value="Flooring Interest">Flooring Plan Interest</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>Description / Vendor</label>
              <input
                type="text"
                placeholder="e.g., O'Reilly Auto Parts - Brake pads"
                value={expenseDesc}
                onChange={(e) => setExpenseDesc(e.target.value)}
                style={{ width: '100%', backgroundColor: 'var(--background)', border: '1px solid var(--border)', borderRadius: '6px', padding: '0.5rem', color: 'var(--text-primary)', fontSize: '0.85rem', outline: 'none' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>Amount ($)</label>
              <input
                type="number"
                placeholder="0.00"
                value={expenseAmount}
                onChange={(e) => setExpenseAmount(e.target.value)}
                style={{ width: '100%', backgroundColor: 'var(--background)', border: '1px solid var(--border)', borderRadius: '6px', padding: '0.5rem', color: 'var(--text-primary)', fontSize: '0.85rem', outline: 'none' }}
              />
            </div>

            {/* Simulated Mobile Receipt Photo Drag */}
            <div style={{ border: '2px dashed var(--border)', borderRadius: '8px', padding: '1rem', textAlign: 'center', backgroundColor: 'var(--surface-secondary)', cursor: 'pointer' }}>
              <Camera size={24} color="var(--primary)" style={{ margin: '0 auto 0.35rem auto', display: 'block' }} />
              <div style={{ fontSize: '0.75rem', color: 'var(--text-primary)', fontWeight: 600 }}>Snap Receipt Photo or Drag PDF</div>
              <div style={{ fontSize: '0.65rem', color: 'var(--text-tertiary)' }}>OCR will auto-extract dollar amount</div>
            </div>

            <button
              type="submit"
              style={{
                backgroundColor: 'var(--primary)',
                color: 'var(--text-on-primary, #fff)',
                border: 'none',
                padding: '0.65rem',
                borderRadius: '8px',
                fontSize: '0.85rem',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.4rem',
                boxShadow: 'var(--shadow-sm)',
              }}
            >
              <Plus size={16} /> Link Cost to Stock #{selectedStock}
            </button>
          </form>
        </div>

        {/* Expenses List Column */}
        <div style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '12px', overflow: 'hidden', boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ padding: '1rem 1.25rem', borderBottom: '1px solid var(--border)', backgroundColor: 'var(--surface-secondary)' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
              Itemized Cost Ledger for {selectedStock}
            </h3>
          </div>

          <div style={{ padding: '0.5rem 1.25rem' }}>
            {currentVehicleExpenses.map((item) => (
              <div
                key={item.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.85rem 0',
                  borderBottom: '1px solid var(--border)',
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <span style={{ fontSize: '0.68rem', padding: '0.1rem 0.35rem', borderRadius: '4px', backgroundColor: 'var(--primary-subtle, rgba(56, 189, 248, 0.15))', color: 'var(--primary)', fontWeight: 700 }}>
                      {item.category}
                    </span>
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-tertiary)' }}>{item.date}</span>
                  </div>
                  <div style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '0.88rem', marginTop: '0.2rem' }}>{item.desc}</div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>Attachment: <code>{item.receipt}</code></div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#f59e0b' }}>
                    ${item.amount.toLocaleString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CostManagement;
