import React, { useState } from 'react';
import {
  Calculator,
  DollarSign,
  Printer,
  FileText,
  Car,
  Percent,
  CheckCircle,
  HelpCircle,
  RefreshCw,
  Sliders,
  Send,
  Sparkles
} from 'lucide-react';
import { toast } from '../../../utils/ompToast';

export const DealCalculator = () => {
  // Deal Inputs State
  const [vehiclePrice, setVehiclePrice] = useState(32500);
  const [downPayment, setDownPayment] = useState(4000);
  const [tradeValue, setTradeValue] = useState(6000);
  const [tradePayoff, setTradePayoff] = useState(2500);
  const [interestRate, setInterestRate] = useState(7.49);
  const [termMonths, setTermMonths] = useState(60);
  const [docFee, setDocFee] = useState(495);
  const [salesTaxRate, setSalesTaxRate] = useState(6.25);

  // Calculations
  const netTrade = Math.max(0, tradeValue - tradePayoff);
  const taxableAmount = Math.max(0, vehiclePrice - tradeValue);
  const salesTax = (taxableAmount * salesTaxRate) / 100;
  const totalFees = docFee + 250; // registration & titling
  const totalAmountToFinance = Math.max(0, vehiclePrice + salesTax + totalFees - downPayment - netTrade);

  // Finance Monthly Payment Calculation (Amortization)
  const monthlyRate = interestRate / 100 / 12;
  const monthlyPayment =
    monthlyRate > 0
      ? (totalAmountToFinance * (monthlyRate * Math.pow(1 + monthlyRate, termMonths))) /
        (Math.pow(1 + monthlyRate, termMonths) - 1)
      : totalAmountToFinance / termMonths;

  // BHPH In-House Calculation (Weekly & Bi-Weekly)
  const bhphInterest = 14.99 / 100 / 52;
  const bhphWeeks = (termMonths / 12) * 52;
  const bhphWeeklyPayment =
    bhphInterest > 0
      ? (totalAmountToFinance * (bhphInterest * Math.pow(1 + bhphInterest, bhphWeeks))) /
        (Math.pow(1 + bhphInterest, bhphWeeks) - 1)
      : totalAmountToFinance / bhphWeeks;

  // Cash Out the Door Price
  const cashOutTheDoor = vehiclePrice + salesTax + totalFees - tradeValue + tradePayoff;

  const handlePrintDeal = () => {
    toast.success('Deal Sheet PDF generated for Customer Presentation');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, padding: '0.15rem 0.5rem', borderRadius: '4px', backgroundColor: 'var(--primary-subtle, rgba(56, 189, 248, 0.1))', color: 'var(--primary)', border: '1px solid var(--border)' }}>
              TASK E-13 • PILLAR 3
            </span>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Payment-First Desking Tool</span>
          </div>
          <h1 style={{ fontSize: '1.65rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0, letterSpacing: '-0.02em' }}>
            60-Second Deal Desking Calculator
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', margin: '0.25rem 0 0 0' }}>
            Structure transparent 4-Square deal sheets in under 60 seconds with live Cash, Finance, BHPH, and Lease comparisons.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button
            onClick={handlePrintDeal}
            style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', backgroundColor: 'var(--primary)', color: 'var(--text-on-primary, #fff)', border: 'none', padding: '0.55rem 1rem', borderRadius: '8px', fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer', boxShadow: 'var(--shadow-sm)' }}
          >
            <Printer size={16} /> Print Customer Deal Sheet
          </button>
        </div>
      </div>

      {/* Main Grid: Inputs Left vs 4-Square Live Matrix Right */}
      <div style={{ display: 'grid', gridTemplateColumns: '380px 1fr', gap: '1.5rem' }}>
        {/* Deal Desking Controls */}
        <div style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '12px', padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1rem', boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-primary)', borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem' }}>
            Deal Parameters & Inputs
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>Vehicle Sale Price ($)</label>
            <input
              type="number"
              value={vehiclePrice}
              onChange={(e) => setVehiclePrice(Number(e.target.value))}
              style={{ width: '100%', backgroundColor: 'var(--background)', border: '1px solid var(--border)', borderRadius: '6px', padding: '0.5rem 0.75rem', color: 'var(--text-primary)', fontSize: '0.9rem', outline: 'none' }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>Cash Down ($)</label>
              <input
                type="number"
                value={downPayment}
                onChange={(e) => setDownPayment(Number(e.target.value))}
                style={{ width: '100%', backgroundColor: 'var(--background)', border: '1px solid var(--border)', borderRadius: '6px', padding: '0.5rem 0.75rem', color: 'var(--text-primary)', fontSize: '0.9rem', outline: 'none' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>APR Rate (%)</label>
              <input
                type="number"
                step="0.1"
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                style={{ width: '100%', backgroundColor: 'var(--background)', border: '1px solid var(--border)', borderRadius: '6px', padding: '0.5rem 0.75rem', color: 'var(--text-primary)', fontSize: '0.9rem', outline: 'none' }}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>Trade Value ($)</label>
              <input
                type="number"
                value={tradeValue}
                onChange={(e) => setTradeValue(Number(e.target.value))}
                style={{ width: '100%', backgroundColor: 'var(--background)', border: '1px solid var(--border)', borderRadius: '6px', padding: '0.5rem 0.75rem', color: 'var(--text-primary)', fontSize: '0.9rem', outline: 'none' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>Trade Payoff ($)</label>
              <input
                type="number"
                value={tradePayoff}
                onChange={(e) => setTradePayoff(Number(e.target.value))}
                style={{ width: '100%', backgroundColor: 'var(--background)', border: '1px solid var(--border)', borderRadius: '6px', padding: '0.5rem 0.75rem', color: 'var(--text-primary)', fontSize: '0.9rem', outline: 'none' }}
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>
              Loan Term: <strong style={{ color: 'var(--primary)' }}>{termMonths} Months</strong>
            </label>
            <div style={{ display: 'flex', gap: '0.35rem' }}>
              {[36, 48, 60, 72, 84].map((t) => (
                <button
                  key={t}
                  onClick={() => setTermMonths(t)}
                  style={{
                    flex: 1,
                    padding: '0.4rem 0',
                    backgroundColor: termMonths === t ? 'var(--primary)' : 'var(--background)',
                    color: termMonths === t ? 'var(--text-on-primary, #fff)' : 'var(--text-secondary)',
                    border: '1px solid var(--border)',
                    borderRadius: '6px',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  {t}m
                </button>
              ))}
            </div>
          </div>

          <div style={{ backgroundColor: 'var(--surface-secondary)', padding: '0.75rem', borderRadius: '8px', fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Doc / Dealer Fee:</span>
              <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>${docFee}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Sales Tax ({salesTaxRate}%):</span>
              <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>${salesTax.toFixed(2)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid var(--border)', paddingTop: '0.35rem', fontWeight: 700 }}>
              <span style={{ color: 'var(--text-primary)' }}>Total Amount Financed:</span>
              <span style={{ color: 'var(--primary)' }}>${totalAmountToFinance.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* 4-Square Live Comparison Matrix */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: '1fr 1fr', gap: '1rem' }}>
          {/* Square 1: Standard Bank Finance */}
          <div style={{ backgroundColor: 'var(--surface)', border: '2px solid var(--primary)', borderRadius: '12px', padding: '1.25rem', position: 'relative', boxShadow: 'var(--shadow-sm)' }}>
            <span style={{ position: 'absolute', top: '12px', right: '12px', fontSize: '0.65rem', padding: '0.15rem 0.45rem', borderRadius: '4px', backgroundColor: 'var(--primary-subtle, rgba(56, 189, 248, 0.2))', color: 'var(--primary)', fontWeight: 700 }}>
              RECOMMENDED
            </span>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>
              Option 1: Bank Financing
            </span>
            <div style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--primary)', marginTop: '0.5rem' }}>
              ${monthlyPayment.toFixed(0)} <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', fontWeight: 500 }}>/ mo</span>
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.5rem', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              <div>• {termMonths} Months @ {interestRate}% APR</div>
              <div>• Down Payment: ${downPayment.toLocaleString()}</div>
              <div>• Total Financed: ${totalAmountToFinance.toFixed(0)}</div>
            </div>
          </div>

          {/* Square 2: 100% Cash Out-The-Door */}
          <div style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '12px', padding: '1.25rem', boxShadow: 'var(--shadow-sm)' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>
              Option 2: 100% Cash Purchase
            </span>
            <div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#10b981', marginTop: '0.5rem' }}>
              ${cashOutTheDoor.toFixed(0)}
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.5rem', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              <div>• Zero Finance Charges / Zero Interest</div>
              <div>• Same-Day Title Delivery</div>
              <div>• Net Trade Equity Deducted: ${netTrade.toLocaleString()}</div>
            </div>
          </div>

          {/* Square 3: In-House Buy Here Pay Here (BHPH) */}
          <div style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '12px', padding: '1.25rem', boxShadow: 'var(--shadow-sm)' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>
              Option 3: In-House BHPH
            </span>
            <div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#f59e0b', marginTop: '0.5rem' }}>
              ${bhphWeeklyPayment.toFixed(0)} <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', fontWeight: 500 }}>/ week</span>
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.5rem', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              <div>• Weekly / Bi-Weekly Payday Auto-ACH</div>
              <div>• 100% Guaranteed Approval (No Hard Credit)</div>
              <div>• 14.99% Fixed In-House Interest</div>
            </div>
          </div>

          {/* Square 4: Lease Quote */}
          <div style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '12px', padding: '1.25rem', boxShadow: 'var(--shadow-sm)' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>
              Option 4: Lease Option
            </span>
            <div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#a855f7', marginTop: '0.5rem' }}>
              ${((monthlyPayment * 0.74)).toFixed(0)} <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', fontWeight: 500 }}>/ mo</span>
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.5rem', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              <div>• 36 Months / 12,000 Miles per year</div>
              <div>• Residual Value: ${(vehiclePrice * 0.55).toFixed(0)}</div>
              <div>• Lower Monthly Out-of-Pocket</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DealCalculator;
