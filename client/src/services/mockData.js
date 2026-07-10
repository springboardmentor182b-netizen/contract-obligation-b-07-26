const mockData = {
  renewals: [
    {
      id: 'r1',
      name: 'Commercial Lease — HQ Tower A',
      department: 'Operations',
      renewalDate: '2024-05-31',
      daysRemaining: -3,
      status: 'Expired',
      priority: 'Critical'
    },
    {
      id: 'r2',
      name: 'APAC Distribution Agreement',
      department: 'Procurement',
      renewalDate: '2024-06-30',
      daysRemaining: 27,
      status: 'Due Soon',
      priority: 'High'
    }
  ],
  notifications: [
    { id: 'n1', title: 'New comment on Commercial Lease', time: '10m' },
    { id: 'n2', title: 'Approval requested: APAC Distribution', time: '3h' }
  ]
}

export default mockData
