const status = ['pending', 'cancel', 'complete']; // in delivery, in progress, complete
//request = true -> request from procurement
//sentRequest = true -> sent request to procurement
export const orders = [
  {
    item_code: 'I0001',
    name: 'Soap',
    brand: 'Dettol',
    quantity: 100,
    status: 'Pending',
    required_by: '2022-09-01',
    requested_date: '2022-08-01',
    requested_by: 'S0001',
    request: true,
    sentRequest: false,
    warehouse_id: '',
  },
  {
    item_code: 'I0002',
    name: 'Noodles',
    brand: 'Prima',
    quantity: 50,
    status: 'Pending',
    required_by: '2022-09-15',
    requested_date: '2022-08-01',
    requested_by: 'S0002',
    request: false,
    sentRequest: false,
    warehouse_id: '',
  },
  {
    item_code: 'I0003',
    name: 'Ice Cream',
    brand: 'Elephant House',
    quantity: 100,
    status: 'Pending',
    required_by: '2022-09-01',
    requested_date: '2022-08-01',
    requested_by: 'S0001',
    request: false,
    sentRequest: false,
    warehouse_id: '',
  },
  {
    item_code: 'I0004',
    name: 'Shampoo',
    brand: 'Loreal',
    quantity: 25,
    status: 'Pending',
    required_by: '2022-09-10',
    requested_date: '2022-08-01',
    requested_by: 'S0001',
    request: true,
    sentRequest: false,
    warehouse_id: '',
  },
  {
    item_code: 'I0005',
    name: 'Wheat Flour',
    brand: 'Grandmas',
    quantity: 50,
    status: 'Pending',
    required_by: '2022-09-15',
    requested_date: '2022-08-10',
    requested_by: 'S0002',
    request: true,
    sentRequest: true,
    warehouse_id: 'W0001',
  },
];
