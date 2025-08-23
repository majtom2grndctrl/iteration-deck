import React from 'react';

interface BudgetDashboardDemoProps {
  variant: 'summary' | 'detailed' | 'visual';
}

export const BudgetDashboardDemo: React.FC<BudgetDashboardDemoProps> = ({ variant }) => {
  if (variant === 'summary') {
    return (
      <div className="demo-content dashboard-container">
        <h3 className="mb-4">Budget Overview</h3>
        
        <div className="grid-3 mb-6">
          <div className="text-center">
            <div className="text-green" style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>$2,847</div>
            <div className="text-gray">Income</div>
          </div>
          <div className="text-center">
            <div className="text-red" style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>$2,156</div>
            <div className="text-gray">Expenses</div>
          </div>
          <div className="text-center">
            <div className="text-blue" style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>$691</div>
            <div className="text-gray">Remaining</div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>Housing</span>
            <span style={{ fontWeight: '500' }}>$1,200</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>Food</span>
            <span style={{ fontWeight: '500' }}>$450</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>Transportation</span>
            <span style={{ fontWeight: '500' }}>$320</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>Other</span>
            <span style={{ fontWeight: '500' }}>$186</span>
          </div>
        </div>
      </div>
    );
  }

  if (variant === 'detailed') {
    return (
      <div className="demo-content dashboard-container">
        <h3 className="mb-4">Budget Breakdown</h3>
        
        {/* Summary Cards */}
        <div className="grid-2 mb-6">
          <div className="bg-green card">
            <div className="text-green">Total Income</div>
            <div className="text-green" style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>$2,847</div>
          </div>
          <div className="bg-red card">
            <div className="text-red">Total Expenses</div>
            <div className="text-red" style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>$2,156</div>
          </div>
        </div>

        {/* Category Breakdown */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
              <span style={{ fontWeight: '500' }}>Housing</span>
              <span className="text-gray">$1,200 / $1,300</span>
            </div>
            <div className="progress-bar">
              <div className="progress-fill blue" style={{ width: '92%' }}></div>
            </div>
          </div>
          
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
              <span style={{ fontWeight: '500' }}>Food & Dining</span>
              <span className="text-gray">$450 / $500</span>
            </div>
            <div className="progress-bar">
              <div className="progress-fill green" style={{ width: '90%' }}></div>
            </div>
          </div>
          
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
              <span style={{ fontWeight: '500' }}>Transportation</span>
              <span className="text-gray">$320 / $400</span>
            </div>
            <div className="progress-bar">
              <div className="progress-fill yellow" style={{ width: '80%' }}></div>
            </div>
          </div>
          
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
              <span style={{ fontWeight: '500' }}>Entertainment</span>
              <span className="text-gray">$120 / $200</span>
            </div>
            <div className="progress-bar">
              <div className="progress-fill purple" style={{ width: '60%' }}></div>
            </div>
          </div>
          
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
              <span style={{ fontWeight: '500' }}>Utilities</span>
              <span className="text-gray">$66 / $150</span>
            </div>
            <div className="progress-bar">
              <div className="progress-fill indigo" style={{ width: '44%' }}></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (variant === 'visual') {
    return (
      <div className="demo-content dashboard-container">
        <h3 className="mb-4">Budget Visualization</h3>
        
        {/* Chart Placeholder */}
        <div style={{
          height: '200px',
          background: 'linear-gradient(45deg, #f3f4f6, #e5e7eb)',
          borderRadius: '0.375rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#6b7280',
          fontSize: '0.875rem',
          marginBottom: '1.5rem',
          flexDirection: 'column'
        }}>
          <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📊</div>
          <div>Interactive Budget Chart</div>
          <small>(Spending trends over time)</small>
        </div>

        {/* Quick Stats */}
        <div className="grid-2 mb-4">
          <div className="text-center bg-gray card">
            <div className="text-green" style={{ fontSize: '1.125rem', fontWeight: 'bold' }}>24%</div>
            <div style={{ fontSize: '0.75rem' }} className="text-gray">Savings Rate</div>
          </div>
          <div className="text-center bg-gray card">
            <div className="text-blue" style={{ fontSize: '1.125rem', fontWeight: 'bold' }}>76%</div>
            <div style={{ fontSize: '0.75rem' }} className="text-gray">Budget Used</div>
          </div>
        </div>

        {/* Visual Category List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ width: '1rem', height: '1rem', backgroundColor: '#3b82f6', borderRadius: '0.25rem', marginRight: '0.75rem' }}></div>
            <span style={{ flex: 1 }}>Housing</span>
            <span style={{ fontWeight: '500' }}>42%</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ width: '1rem', height: '1rem', backgroundColor: '#10b981', borderRadius: '0.25rem', marginRight: '0.75rem' }}></div>
            <span style={{ flex: 1 }}>Food</span>
            <span style={{ fontWeight: '500' }}>21%</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ width: '1rem', height: '1rem', backgroundColor: '#f59e0b', borderRadius: '0.25rem', marginRight: '0.75rem' }}></div>
            <span style={{ flex: 1 }}>Transport</span>
            <span style={{ fontWeight: '500' }}>15%</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ width: '1rem', height: '1rem', backgroundColor: '#8b5cf6', borderRadius: '0.25rem', marginRight: '0.75rem' }}></div>
            <span style={{ flex: 1 }}>Other</span>
            <span style={{ fontWeight: '500' }}>22%</span>
          </div>
        </div>
      </div>
    );
  }

  return null;
};