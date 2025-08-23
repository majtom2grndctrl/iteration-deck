// Budget dashboard components

export const BudgetSummary = () => (
  <div className="demo-content dashboard-container">
    <h3 className="text-lg font-semibold mb-4">Budget Overview</h3>
    
    <div className="grid grid-cols-3 gap-4 mb-6">
      <div className="text-center">
        <div className="text-2xl font-bold text-green-600">$2,847</div>
        <div className="text-sm text-gray-500">Income</div>
      </div>
      <div className="text-center">
        <div className="text-2xl font-bold text-red-600">$2,156</div>
        <div className="text-sm text-gray-500">Expenses</div>
      </div>
      <div className="text-center">
        <div className="text-2xl font-bold text-blue-600">$691</div>
        <div className="text-sm text-gray-500">Remaining</div>
      </div>
    </div>

    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <span>Housing</span>
        <span className="font-medium">$1,200</span>
      </div>
      <div className="flex justify-between items-center">
        <span>Food</span>
        <span className="font-medium">$450</span>
      </div>
      <div className="flex justify-between items-center">
        <span>Transportation</span>
        <span className="font-medium">$320</span>
      </div>
      <div className="flex justify-between items-center">
        <span>Other</span>
        <span className="font-medium">$186</span>
      </div>
    </div>
  </div>
);

export const BudgetDetailed = () => (
  <div className="demo-content dashboard-container">
    <h3 className="text-lg font-semibold mb-4">Budget Breakdown</h3>
    
    {/* Summary Cards */}
    <div className="grid grid-cols-2 gap-4 mb-6">
      <div className="bg-green-50 p-4 rounded-lg">
        <div className="text-sm text-green-600">Total Income</div>
        <div className="text-xl font-bold text-green-700">$2,847</div>
      </div>
      <div className="bg-red-50 p-4 rounded-lg">
        <div className="text-sm text-red-600">Total Expenses</div>
        <div className="text-xl font-bold text-red-700">$2,156</div>
      </div>
    </div>

    {/* Category Breakdown */}
    <div className="space-y-4">
      <div>
        <div className="flex justify-between items-center mb-1">
          <span className="font-medium">Housing</span>
          <span className="text-sm text-gray-500">$1,200 / $1,300</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div className="bg-blue-600 h-2 rounded-full" style={{width: '92%'}}></div>
        </div>
      </div>
      
      <div>
        <div className="flex justify-between items-center mb-1">
          <span className="font-medium">Food & Dining</span>
          <span className="text-sm text-gray-500">$450 / $500</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div className="bg-green-500 h-2 rounded-full" style={{width: '90%'}}></div>
        </div>
      </div>
      
      <div>
        <div className="flex justify-between items-center mb-1">
          <span className="font-medium">Transportation</span>
          <span className="text-sm text-gray-500">$320 / $400</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div className="bg-yellow-500 h-2 rounded-full" style={{width: '80%'}}></div>
        </div>
      </div>
      
      <div>
        <div className="flex justify-between items-center mb-1">
          <span className="font-medium">Entertainment</span>
          <span className="text-sm text-gray-500">$120 / $200</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div className="bg-purple-500 h-2 rounded-full" style={{width: '60%'}}></div>
        </div>
      </div>
      
      <div>
        <div className="flex justify-between items-center mb-1">
          <span className="font-medium">Utilities</span>
          <span className="text-sm text-gray-500">$66 / $150</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div className="bg-indigo-500 h-2 rounded-full" style={{width: '44%'}}></div>
        </div>
      </div>
    </div>
  </div>
);

export const BudgetVisual = () => (
  <div className="demo-content dashboard-container">
    <h3 className="text-lg font-semibold mb-4">Budget Visualization</h3>
    
    {/* Chart Placeholder */}
    <div className="chart-placeholder mb-6">
      📊 Interactive Budget Chart<br/>
      <small>(Spending trends over time)</small>
    </div>

    {/* Quick Stats */}
    <div className="grid grid-cols-2 gap-4 mb-4">
      <div className="text-center bg-gray-50 p-3 rounded">
        <div className="text-lg font-bold text-green-600">24%</div>
        <div className="text-xs text-gray-500">Savings Rate</div>
      </div>
      <div className="text-center bg-gray-50 p-3 rounded">
        <div className="text-lg font-bold text-blue-600">76%</div>
        <div className="text-xs text-gray-500">Budget Used</div>
      </div>
    </div>

    {/* Visual Category List */}
    <div className="space-y-2">
      <div className="flex items-center">
        <div className="w-4 h-4 bg-blue-500 rounded mr-3"></div>
        <span className="flex-1">Housing</span>
        <span className="font-medium">42%</span>
      </div>
      <div className="flex items-center">
        <div className="w-4 h-4 bg-green-500 rounded mr-3"></div>
        <span className="flex-1">Food</span>
        <span className="font-medium">21%</span>
      </div>
      <div className="flex items-center">
        <div className="w-4 h-4 bg-yellow-500 rounded mr-3"></div>
        <span className="flex-1">Transport</span>
        <span className="font-medium">15%</span>
      </div>
      <div className="flex items-center">
        <div className="w-4 h-4 bg-purple-500 rounded mr-3"></div>
        <span className="flex-1">Other</span>
        <span className="font-medium">22%</span>
      </div>
    </div>
  </div>
);