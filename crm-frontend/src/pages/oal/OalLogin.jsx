import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, Landmark, ShieldCheck, UserCheck, Building2, User } from 'lucide-react';
import { Input, Button, Checkbox, Card, Tabs, Badge } from '../../components/ui';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';

export const OalLogin = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { addToast } = useToast();

  const [selectedRole, setSelectedRole] = useState('Borrower');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleRoleTabChange = (role) => {
    setSelectedRole(role);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      login({
        name: selectedRole === 'Borrower' ? 'Dr. Aris Thorne' : selectedRole === 'Lender' ? 'Marcus Sterling' : 'Sarah Jenkins',
        email,
        role: `${selectedRole} Account`,
        company: selectedRole === 'Borrower' ? 'BioGenix Labs' : 'Vanguard Capital',
        tenantId: `OAL-${selectedRole.toUpperCase()}-9910`,
      }, 'oal');

      addToast({
        title: `OAL ${selectedRole} Portal`,
        message: `Signed into ${selectedRole} workspace cleanly.`,
        type: 'success',
      });
      setIsLoading(false);
      navigate('/oal/dashboard');
    }, 500);
  };

  return (
    <Card className="p-6">
      <div className="flex flex-col items-center text-center mb-6">
        <div
          style={{
            width: '48px',
            height: '48px',
            borderRadius: 'var(--radius-md)',
            backgroundColor: 'var(--accent)',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 800,
            fontSize: '20px',
            fontFamily: 'var(--font-display)',
            marginBottom: '0.75rem',
          }}
        >
          OA
        </div>
        <h2 style={{ fontSize: 'var(--text-xl)', marginBottom: '0.25rem' }}>OAL Network</h2>
        <p className="text-xs text-secondary margin-0">Select role & sign in to lending marketplace portal</p>
      </div>

      {/* Role Selection Tabs */}
      <Tabs
        tabs={[
          { id: 'Borrower', label: 'Borrower' },
          { id: 'Lender', label: 'Lender' },
          { id: 'OAL Rep', label: 'OAL Rep' },
          { id: 'Admin', label: 'Admin' },
        ]}
        activeTab={selectedRole}
        onChange={handleRoleTabChange}
        className="mb-4"
      />

      <div className="flex items-center justify-between p-2 surface-secondary rounded-sm border-subtle mb-4 text-xs">
        <span className="text-tertiary">Selected Access Level:</span>
        <Badge variant="success" icon={ShieldCheck}>{selectedRole} Role</Badge>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input
          label={`${selectedRole} Corporate Email`}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          startIcon={Mail}
          required
        />

        <Input
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          startIcon={Lock}
          required
        />

        <div className="flex items-center justify-between text-xs">
          <Checkbox
            label="Remember me"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
          />
          <a href="#forgot" className="font-semibold text-accent" onClick={(e) => { e.preventDefault(); addToast({ title: 'OAL Recovery', message: 'Password recovery email sent.', type: 'info' }); }}>
            Forgot password?
          </a>
        </div>

        <Button
          variant="primary"
          size="lg"
          type="submit"
          isLoading={isLoading}
          className="w-full mt-2"
          style={{ backgroundColor: 'var(--accent)', borderColor: 'var(--accent)' }}
        >
          Sign In as {selectedRole}
        </Button>
      </form>

      <div className="mt-4 pt-4 border-t border-subtle flex flex-col gap-2 text-center text-xs text-secondary">
        <div>
          Need an account?{' '}
          <Link to="/oal/borrower/signup" className="font-semibold text-accent mr-2">
            Borrower Signup
          </Link>
          |
          <Link to="/oal/lender/signup" className="font-semibold text-accent ml-2">
            Lender Signup
          </Link>
        </div>
      </div>
    </Card>
  );
};
