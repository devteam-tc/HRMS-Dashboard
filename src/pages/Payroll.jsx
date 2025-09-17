import { useState } from 'react';
import { FaSearch, FaFilter, FaFileExport, FaMoneyBillWave, FaRegCalendarAlt, FaRegClock, FaRegMoneyBillAlt } from 'react-icons/fa';

const Payroll = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [selectedPeriod, setSelectedPeriod] = useState('current');
  
  // Sample payroll data
  const payrollData = [
    { 
      id: 1, 
      employee: 'John Doee', 
      position: 'Software Engineer', 
      department: 'Engineering',
      basicSalary: 5000, 
      allowances: 1000,
      deductions: 500,
      tax: 750,
      netSalary: 4750,
      status: 'Paid',
      paymentDate: '2025-08-31',
      paymentMethod: 'Bank Transfer',
      period: 'August 2025'
    },
    { 
      id: 2, 
      employee: 'Jane Smith', 
      position: 'HR Manager', 
      department: 'Human Resources',
      basicSalary: 6000, 
      allowances: 1200,
      deductions: 600,
      tax: 900,
      netSalary: 5700,
      status: 'Pending',
      paymentDate: '2025-09-05',
      paymentMethod: 'Bank Transfer',
      period: 'August 2025'
    },
    { 
      id: 3, 
      employee: 'Mike Johnson', 
      position: 'Product Manager', 
      department: 'Product',
      basicSalary: 7000, 
      allowances: 1400,
      deductions: 700,
      tax: 1050,
      netSalary: 6650,
      status: 'Draft',
      paymentDate: '2025-09-10',
      paymentMethod: 'Bank Transfer',
      period: 'August 2025'
    },
    { 
      id: 4, 
      employee: 'Sarah Williams', 
      position: 'UX Designer', 
      department: 'Design',
      basicSalary: 5500, 
      allowances: 1100,
      deductions: 550,
      tax: 825,
      netSalary: 5225,
      status: 'Paid',
      paymentDate: '2025-07-31',
      paymentMethod: 'Bank Transfer',
      period: 'July 2025'
    },
  ];

  const filteredData = activeTab === 'all' 
    ? payrollData 
    : payrollData.filter(item => item.status.toLowerCase() === activeTab.toLowerCase());

  const filteredByPeriod = selectedPeriod === 'all' 
    ? filteredData 
    : filteredData.filter(item => 
        selectedPeriod === 'current' ? item.period === 'August 2025' : item.period === 'July 2025'
      );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Payroll Management</h1>
        <div className="mt-4 sm:mt-0 flex space-x-2">
          <button className="px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
            Process Payroll
          </button>
        </div>
      </div>

      {/* Payroll Summary Cards */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-blue-500 rounded-md p-3">
                <FaMoneyBillWave className="h-6 w-6 text-white" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Total Payroll
                  </dt>
                  <dd>
                    <div className="text-lg font-medium text-gray-900">$22,325</div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-green-500 rounded-md p-3">
                <FaRegClock className="h-6 w-6 text-white" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Current Period
                  </dt>
                  <dd>
                    <div className="text-lg font-medium text-gray-900">August 2025</div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-yellow-500 rounded-md p-3">
                <FaRegCalendarAlt className="h-6 w-6 text-white" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Next Payday
                  </dt>
                  <dd>
                    <div className="text-lg font-medium text-gray-900">Sep 30, 2025</div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-purple-500 rounded-md p-3">
                <FaRegMoneyBillAlt className="h-6 w-6 text-white" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Employees
                  </dt>
                  <dd>
                    <div className="text-lg font-medium text-gray-900">4 Employees</div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white shadow rounded-lg p-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0 md:space-x-4">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
              placeholder="Search payroll records..."
            />
          </div>
          <div className="flex space-x-2">
            <div className="relative">
              <select
                className="appearance-none bg-white border border-gray-300 rounded-md py-2 pl-3 pr-8 text-sm focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
              >
                <option value="current">Current Period (Aug 2025)</option>
                <option value="previous">Previous Period (Jul 2025)</option>
                <option value="all">All Periods</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
            
            <button className="p-2 border border-gray-300 rounded-md text-gray-500 hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-primary-500">
              <FaFilter className="h-4 w-4" />
            </button>
            
            <button className="p-2 border border-gray-300 rounded-md text-gray-500 hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-primary-500 flex items-center">
              <FaFileExport className="h-4 w-4 mr-1" />
              <span className="text-sm">Export</span>
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-4 border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('all')}
              className={`${activeTab === 'all' ? 'border-primary-500 text-primary-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              All
            </button>
            <button
              onClick={() => setActiveTab('paid')}
              className={`${activeTab === 'paid' ? 'border-green-500 text-green-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Paid
            </button>
            <button
              onClick={() => setActiveTab('pending')}
              className={`${activeTab === 'pending' ? 'border-yellow-500 text-yellow-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Pending
            </button>
            <button
              onClick={() => setActiveTab('draft')}
              className={`${activeTab === 'draft' ? 'border-gray-500 text-gray-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Draft
            </button>
          </nav>
        </div>
      </div>

      {/* Payroll Table */}
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Employee
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Period
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Basic Salary
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Allowances
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Deductions
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tax
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Net Salary
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredByPeriod.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-600">
                          {item.employee.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{item.employee}</div>
                        <div className="text-sm text-gray-500">{item.position}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{item.period}</div>
                    <div className="text-sm text-gray-500">{item.paymentDate}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">${item.basicSalary.toLocaleString()}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-green-600">+${item.allowances.toLocaleString()}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-red-600">-${item.deductions.toLocaleString()}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-red-600">-${item.tax.toLocaleString()}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">${item.netSalary.toLocaleString()}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${item.status === 'Paid' ? 'bg-green-100 text-green-800' : 
                        item.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'}`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <button className="text-primary-600 hover:text-primary-900">
                        View
                      </button>
                      <button className="text-gray-600 hover:text-gray-900">
                        <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot className="bg-gray-50">
              <tr>
                <td colSpan="2" className="px-6 py-3 text-sm font-medium text-gray-900">
                  Totals
                </td>
                <td className="px-6 py-3 text-sm font-medium text-gray-900">
                  ${filteredByPeriod.reduce((sum, item) => sum + item.basicSalary, 0).toLocaleString()}
                </td>
                <td className="px-6 py-3 text-sm font-medium text-green-600">
                  +${filteredByPeriod.reduce((sum, item) => sum + item.allowances, 0).toLocaleString()}
                </td>
                <td className="px-6 py-3 text-sm font-medium text-red-600">
                  -${filteredByPeriod.reduce((sum, item) => sum + item.deductions, 0).toLocaleString()}
                </td>
                <td className="px-6 py-3 text-sm font-medium text-red-600">
                  -${filteredByPeriod.reduce((sum, item) => sum + item.tax, 0).toLocaleString()}
                </td>
                <td className="px-6 py-3 text-sm font-bold text-gray-900">
                  ${filteredByPeriod.reduce((sum, item) => sum + item.netSalary, 0).toLocaleString()}
                </td>
                <td colSpan="2" className="px-6 py-3"></td>
              </tr>
            </tfoot>
          </table>
        </div>
        <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
          <div className="flex-1 flex justify-between sm:hidden">
            <a href="#" className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
              Previous
            </a>
            <a href="#" className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
              Next
            </a>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">1</span> to <span className="font-medium">4</span> of{' '}
                <span className="font-medium">4</span> results
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                <a href="#" className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                  <span className="sr-only">Previous</span>
                  <span className="h-5 w-5">«</span>
                </a>
                <a href="#" aria-current="page" className="z-10 bg-primary-50 border-primary-500 text-primary-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium">
                  1
                </a>
                <a href="#" className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                  <span className="sr-only">Next</span>
                  <span className="h-5 w-5">»</span>
                </a>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payroll;
