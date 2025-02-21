import React from 'react';
import { Shield, Bell, Mail, CreditCard, Settings, LogOut, Search, Plus, ExternalLink, AlertTriangle } from 'lucide-react';

const user = {
  name: 'Jordan Chen',
  email: 'sarah@example.com',
  verificationLevel: 'Advanced',
  connectedServices: 12,
  lastActivity: '2 days ago',
  pendingRequests: 1
};

const services = [
  { name: 'BikeShop.co', status: 'Active', dataShared: 'Full Name, ID' },
  { name: 'RubbishCollector', status: 'Active', dataShared: 'Address Only' },
  { name: 'KiwiInsurance', status: 'Active', dataShared: 'ID, DoB, Email' }
];

const emailAliases = [
  { alias: 'ad8f7@raytio-mail.com', forwardingTo: 'sarah@example.com', status: 'Active' },
  { alias: 'b324d@raytio-mail.com', forwardingTo: 'sarah@example.com', status: 'Active' }
];

const recentActivity = [
  { timestamp: '14-Feb 10:45', event: 'BikeShop Data Share', status: 'Approved' },
  { timestamp: '15-Feb 09:20', event: 'Address Re-Verify', status: 'Success' },
  { timestamp: '16-Feb 13:02', event: 'KiwiInsurance ID', status: 'Pending' }
];

export function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <a href="/" className="flex-shrink-0 flex items-center">
                <Shield className="h-8 w-8 text-indigo-600 hover:text-indigo-500 transition-colors" />
                <span className="ml-2 text-2xl font-bold text-gray-900 hover:text-gray-700 transition-colors">Raytio</span>
              </a>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-400 hover:text-gray-500">
                <Bell className="h-6 w-6" />
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-500">
                <Settings className="h-6 w-6" />
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-500">
                <LogOut className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Welcome Banner */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center">
                <span className="text-2xl font-semibold text-indigo-600">
                  {user.name.charAt(0)}
                </span>
              </div>
              <div className="ml-4">
                <h2 className="text-2xl font-bold text-gray-900">Welcome back, {user.name}!</h2>
                <p className="text-gray-500">Verification Level: {user.verificationLevel}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Connected Services: {user.connectedServices}</p>
              <p className="text-sm text-gray-500">Last Activity: {user.lastActivity}</p>
            </div>
          </div>
          {user.pendingRequests > 0 && (
            <div className="mt-4 p-4 bg-yellow-50 rounded-lg flex items-center">
              <AlertTriangle className="h-5 w-5 text-yellow-400 mr-2" />
              <span className="text-yellow-700">
                You have {user.pendingRequests} new data-sharing request
              </span>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          {['View Services', 'Manage Emails', 'Update Identity', 'Browse Marketplace'].map((action) => (
            <button
              key={action}
              className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow text-left"
            >
              <h3 className="font-semibold text-gray-900">{action}</h3>
            </button>
          ))}
        </div>

        {/* Services Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-900">Your Connected Services</h2>
            <button className="flex items-center text-indigo-600 hover:text-indigo-500">
              <Plus className="h-5 w-5 mr-1" />
              Add New Service
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Service Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Data Shared
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {services.map((service, index) => (
                  <tr key={index} className="border-b border-gray-200">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {service.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        {service.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {service.dataShared}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <button className="text-indigo-600 hover:text-indigo-500">
                        Manage
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Email Aliases Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-900">Email Aliases</h2>
            <button className="flex items-center text-indigo-600 hover:text-indigo-500">
              <Plus className="h-5 w-5 mr-1" />
              Create New Alias
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Alias
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Forwarding To
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {emailAliases.map((alias, index) => (
                  <tr key={index} className="border-b border-gray-200">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {alias.alias}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {alias.forwardingTo}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        {alias.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <button className="text-red-600 hover:text-red-500">
                        Revoke
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Activity Section */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Activity</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Timestamp
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Event
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {recentActivity.map((activity, index) => (
                  <tr key={index} className="border-b border-gray-200">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {activity.timestamp}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {activity.event}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          activity.status === 'Pending'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-green-100 text-green-800'
                        }`}
                      >
                        {activity.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}