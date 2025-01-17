exports.seed = function (knex) {
  return knex('vendors')
    .del() // Delete existing entries
    .then(function () {
      return knex('vendors').insert([
        { vendor_id: 1, vendor_name: 'FreshDirect', contact_name: 'John Doe', address: '241 37th St, Brooklyn', city: 'New York', postal_code: '11232', country: 'USA', phone: '9876543210', status: 1 },
        { vendor_id: 2, vendor_name: 'Instacart', contact_name: 'Emily Carter', address: '50 Beale St, San Francisco', city: 'San Francisco', postal_code: '94105', country: 'USA', phone: '1231231234', status: 1 },
        { vendor_id: 3, vendor_name: 'BigBasket', contact_name: 'Ramesh Sharma', address: 'Whitefield, Bangalore', city: 'Bangalore', postal_code: '560066', country: 'India', phone: '9876543123', status: 1 },
        { vendor_id: 4, vendor_name: 'Grofers', contact_name: 'Anita Mehra', address: 'Saket, New Delhi', city: 'New Delhi', postal_code: '110017', country: 'India', phone: '8765432109', status: 1 },
        { vendor_id: 5, vendor_name: 'Zepto', contact_name: 'Nikhil Reddy', address: 'Koregaon Park, Pune', city: 'Pune', postal_code: '411001', country: 'India', phone: '9988778899', status: 1 },
        { vendor_id: 6, vendor_name: 'Foodpanda', contact_name: 'Alice Wong', address: 'Central, Hong Kong', city: 'Hong Kong', postal_code: '999077', country: 'Hong Kong', phone: '85212345678', status: 1 },
        { vendor_id: 7, vendor_name: 'Deliveroo', contact_name: 'Tom Brown', address: 'Cannon Street, London', city: 'London', postal_code: 'EC4N 6AP', country: 'UK', phone: '441234567890', status: 1 },
        { vendor_id: 8, vendor_name: 'UberEats', contact_name: 'Mike Johnson', address: 'Fitzroy St, Melbourne', city: 'Melbourne', postal_code: '3065', country: 'Australia', phone: '6123456789', status: 1 },
        { vendor_id: 9, vendor_name: 'Tesco', contact_name: 'David Lewis', address: 'Welwyn Garden City', city: 'Hertfordshire', postal_code: 'AL7 1GA', country: 'UK', phone: '441708777100', status: 1 },
        { vendor_id: 10, vendor_name: 'Walmart', contact_name: 'Doug McMillon', address: 'Bentonville, AR', city: 'Bentonville', postal_code: '72716', country: 'USA', phone: '14794508900', status: 1 }
      ]);
    });
};
