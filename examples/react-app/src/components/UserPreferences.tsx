// User preferences form components

export const UserPreferencesVertical = () => (
  <div className="demo-content form-container">
    <h3 className="text-lg font-semibold mb-4">Account Preferences</h3>
    <form className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
        <input 
          type="text" 
          defaultValue="Sarah Johnson" 
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Email Notifications</label>
        <div className="space-y-2">
          <label className="flex items-center">
            <input type="checkbox" defaultChecked className="mr-2" />
            <span className="text-sm">Product updates</span>
          </label>
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" />
            <span className="text-sm">Marketing emails</span>
          </label>
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Theme Preference</label>
        <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option>Light</option>
          <option>Dark</option>
          <option>System</option>
        </select>
      </div>
      <button 
        type="submit" 
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
      >
        Save Preferences
      </button>
    </form>
  </div>
);

export const UserPreferencesHorizontal = () => (
  <div className="demo-content">
    <h3 className="text-lg font-semibold mb-4">Account Preferences</h3>
    <form className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
          <input 
            type="text" 
            defaultValue="Sarah Johnson" 
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Theme Preference</label>
          <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>Light</option>
            <option>Dark</option>
            <option>System</option>
          </select>
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Email Notifications</label>
        <div className="grid grid-cols-2 gap-4">
          <label className="flex items-center">
            <input type="checkbox" defaultChecked className="mr-2" />
            <span className="text-sm">Product updates</span>
          </label>
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" />
            <span className="text-sm">Marketing emails</span>
          </label>
        </div>
      </div>
      <div className="flex justify-end">
        <button 
          type="submit" 
          className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 transition-colors"
        >
          Save Preferences
        </button>
      </div>
    </form>
  </div>
);

export const UserPreferencesCard = () => (
  <div className="demo-content space-y-4">
    <h3 className="text-lg font-semibold mb-4">Account Preferences</h3>
    
    {/* Profile Card */}
    <div className="bg-gray-50 p-4 rounded-lg">
      <h4 className="font-medium mb-3">Profile Information</h4>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
        <input 
          type="text" 
          defaultValue="Sarah Johnson" 
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>

    {/* Notifications Card */}
    <div className="bg-gray-50 p-4 rounded-lg">
      <h4 className="font-medium mb-3">Email Notifications</h4>
      <div className="space-y-2">
        <label className="flex items-center">
          <input type="checkbox" defaultChecked className="mr-2" />
          <span className="text-sm">Product updates</span>
        </label>
        <label className="flex items-center">
          <input type="checkbox" className="mr-2" />
          <span className="text-sm">Marketing emails</span>
        </label>
      </div>
    </div>

    {/* Appearance Card */}
    <div className="bg-gray-50 p-4 rounded-lg">
      <h4 className="font-medium mb-3">Appearance</h4>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Theme Preference</label>
        <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option>Light</option>
          <option>Dark</option>
          <option>System</option>
        </select>
      </div>
    </div>

    <button 
      type="submit" 
      className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
    >
      Save All Preferences
    </button>
  </div>
);