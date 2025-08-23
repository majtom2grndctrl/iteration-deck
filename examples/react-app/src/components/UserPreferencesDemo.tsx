import React from 'react';

interface UserPreferencesDemoProps {
  variant: 'vertical' | 'horizontal' | 'card';
}

export const UserPreferencesDemo: React.FC<UserPreferencesDemoProps> = ({ variant }) => {
  if (variant === 'vertical') {
    return (
      <div className="demo-content form-container">
        <h3 className="mb-4">Account Preferences</h3>
        <form>
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input 
              type="text" 
              id="name"
              defaultValue="Sarah Johnson" 
            />
          </div>
          
          <div className="form-group">
            <label>Email Notifications</label>
            <div className="checkbox-group">
              <div className="checkbox-item">
                <input type="checkbox" id="updates" defaultChecked />
                <label htmlFor="updates">Product updates</label>
              </div>
              <div className="checkbox-item">
                <input type="checkbox" id="marketing" />
                <label htmlFor="marketing">Marketing emails</label>
              </div>
            </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="theme">Theme Preference</label>
            <select id="theme">
              <option>Light</option>
              <option>Dark</option>
              <option>System</option>
            </select>
          </div>
          
          <button type="submit" className="btn-primary" style={{ width: '100%' }}>
            Save Preferences
          </button>
        </form>
      </div>
    );
  }

  if (variant === 'horizontal') {
    return (
      <div className="demo-content">
        <h3 className="mb-4">Account Preferences</h3>
        <form>
          <div className="form-row mb-4">
            <div className="form-group mb-0">
              <label htmlFor="name-h">Full Name</label>
              <input 
                type="text" 
                id="name-h"
                defaultValue="Sarah Johnson" 
              />
            </div>
            <div className="form-group mb-0">
              <label htmlFor="theme-h">Theme Preference</label>
              <select id="theme-h">
                <option>Light</option>
                <option>Dark</option>
                <option>System</option>
              </select>
            </div>
          </div>
          
          <div className="form-group">
            <label>Email Notifications</label>
            <div className="form-row">
              <div className="checkbox-item">
                <input type="checkbox" id="updates-h" defaultChecked />
                <label htmlFor="updates-h">Product updates</label>
              </div>
              <div className="checkbox-item">
                <input type="checkbox" id="marketing-h" />
                <label htmlFor="marketing-h">Marketing emails</label>
              </div>
            </div>
          </div>
          
          <div className="text-right">
            <button type="submit" className="btn-primary">
              Save Preferences
            </button>
          </div>
        </form>
      </div>
    );
  }

  if (variant === 'card') {
    return (
      <div className="demo-content">
        <h3 className="mb-4">Account Preferences</h3>
        
        {/* Profile Card */}
        <div className="card mb-4">
          <div className="card-header">
            <h4 className="card-title">Profile Information</h4>
          </div>
          <div className="form-group mb-0">
            <label htmlFor="name-c">Full Name</label>
            <input 
              type="text" 
              id="name-c"
              defaultValue="Sarah Johnson" 
            />
          </div>
        </div>

        {/* Notifications Card */}
        <div className="card mb-4">
          <div className="card-header">
            <h4 className="card-title">Email Notifications</h4>
          </div>
          <div className="checkbox-group">
            <div className="checkbox-item">
              <input type="checkbox" id="updates-c" defaultChecked />
              <label htmlFor="updates-c">Product updates</label>
            </div>
            <div className="checkbox-item">
              <input type="checkbox" id="marketing-c" />
              <label htmlFor="marketing-c">Marketing emails</label>
            </div>
          </div>
        </div>

        {/* Appearance Card */}
        <div className="card mb-4">
          <div className="card-header">
            <h4 className="card-title">Appearance</h4>
          </div>
          <div className="form-group mb-0">
            <label htmlFor="theme-c">Theme Preference</label>
            <select id="theme-c">
              <option>Light</option>
              <option>Dark</option>
              <option>System</option>
            </select>
          </div>
        </div>

        <button type="submit" className="btn-primary" style={{ width: '100%' }}>
          Save All Preferences
        </button>
      </div>
    );
  }

  return null;
};