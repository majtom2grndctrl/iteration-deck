import { type FC } from 'react';

interface ContactItemProps {
  initials: string;
  name: string;
  email: string;
  role: string;
}

const ContactItem: FC<ContactItemProps> = ({ initials, name, email, role }) => (
  <div className="flex items-center py-2 px-3 hover:bg-gray-50 rounded">
    <div className="contact-avatar mr-3">{initials}</div>
    <div className="flex-1">
      <div className="font-medium">{name}</div>
      <div className="text-sm text-gray-500">{email}</div>
    </div>
    <div className="text-sm text-gray-400">{role}</div>
  </div>
);

export const ContactsCompact = () => (
  <div className="demo-content contacts-container">
    <h3 className="text-lg font-semibold mb-4">Contacts</h3>
    
    <div className="space-y-1">
      <ContactItem initials="AJ" name="Alice Johnson" email="alice@company.com" role="Designer" />
      <ContactItem initials="BS" name="Bob Smith" email="bob.smith@email.com" role="Developer" />
      <ContactItem initials="CD" name="Carol Davis" email="carol.d@startup.io" role="PM" />
      <ContactItem initials="DW" name="David Wilson" email="d.wilson@tech.com" role="Engineer" />
      <ContactItem initials="EB" name="Emma Brown" email="emma@creative.agency" role="Creative" />
    </div>
  </div>
);

interface ContactCardProps {
  initials: string;
  name: string;
  title: string;
  email: string;
  phone: string;
}

const ContactCard: FC<ContactCardProps> = ({ initials, name, title, email, phone }) => (
  <div className="border border-gray-200 rounded-lg p-4">
    <div className="flex items-start">
      <div className="contact-avatar mr-4">{initials}</div>
      <div className="flex-1">
        <h4 className="font-medium">{name}</h4>
        <p className="text-sm text-gray-600">{title}</p>
        <p className="text-sm text-gray-500 mt-1">{email}</p>
        <p className="text-sm text-gray-500">{phone}</p>
        <div className="flex mt-3 space-x-2">
          <button className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">Email</button>
          <button className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">Call</button>
        </div>
      </div>
    </div>
  </div>
);

export const ContactsDetailed = () => (
  <div className="demo-content contacts-container">
    <h3 className="text-lg font-semibold mb-4">Contacts</h3>
    
    <div className="space-y-4">
      <ContactCard 
        initials="AJ" 
        name="Alice Johnson" 
        title="Senior Product Designer" 
        email="alice@company.com" 
        phone="+1 (555) 123-4567" 
      />
      <ContactCard 
        initials="BS" 
        name="Bob Smith" 
        title="Full Stack Developer" 
        email="bob.smith@email.com" 
        phone="+1 (555) 987-6543" 
      />
      <ContactCard 
        initials="CD" 
        name="Carol Davis" 
        title="Product Manager" 
        email="carol.d@startup.io" 
        phone="+1 (555) 456-7890" 
      />
    </div>
  </div>
);

interface ContactGridItemProps {
  initials: string;
  name: string;
  role: string;
  email: string;
}

const ContactGridItem: FC<ContactGridItemProps> = ({ initials, name, role, email }) => (
  <div className="text-center border border-gray-200 rounded-lg p-4">
    <div 
      className="contact-avatar mx-auto mb-3" 
      style={{width: '60px', height: '60px', fontSize: '1.2rem'}}
    >
      {initials}
    </div>
    <h4 className="font-medium">{name}</h4>
    <p className="text-sm text-gray-600">{role}</p>
    <p className="text-xs text-gray-500 mt-1">{email}</p>
    <button className="mt-2 text-xs bg-blue-600 text-white px-3 py-1 rounded">Contact</button>
  </div>
);

export const ContactsGrid = () => (
  <div className="demo-content contacts-container">
    <h3 className="text-lg font-semibold mb-4">Team Directory</h3>
    
    <div className="grid grid-cols-2 gap-4">
      <ContactGridItem initials="AJ" name="Alice Johnson" role="Designer" email="alice@company.com" />
      <ContactGridItem initials="BS" name="Bob Smith" role="Developer" email="bob.smith@email.com" />
      <ContactGridItem initials="CD" name="Carol Davis" role="PM" email="carol.d@startup.io" />
      <ContactGridItem initials="DW" name="David Wilson" role="Engineer" email="d.wilson@tech.com" />
    </div>
  </div>
);