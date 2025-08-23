import React from 'react';

interface ContactsListDemoProps {
  variant: 'compact' | 'detailed' | 'grid';
}

interface ContactItemProps {
  initials: string;
  name: string;
  email: string;
  role: string;
}

interface ContactCardProps {
  initials: string;
  name: string;
  title: string;
  email: string;
  phone: string;
}

interface ContactGridItemProps {
  initials: string;
  name: string;
  role: string;
  email: string;
}

const ContactItem: React.FC<ContactItemProps> = ({ initials, name, email, role }) => (
  <div className="list-item">
    <div className="avatar mr-3">{initials}</div>
    <div style={{ flex: 1 }}>
      <div style={{ fontWeight: '500' }}>{name}</div>
      <div className="text-gray" style={{ fontSize: '0.875rem' }}>{email}</div>
    </div>
    <div className="text-gray-light" style={{ fontSize: '0.875rem' }}>{role}</div>
  </div>
);

const ContactCard: React.FC<ContactCardProps> = ({ initials, name, title, email, phone }) => (
  <div className="card">
    <div style={{ display: 'flex', alignItems: 'flex-start' }}>
      <div className="avatar" style={{ marginRight: '1rem' }}>{initials}</div>
      <div style={{ flex: 1 }}>
        <h4 style={{ fontWeight: '500', margin: '0 0 0.25rem 0' }}>{name}</h4>
        <p className="text-gray" style={{ fontSize: '0.875rem', margin: '0 0 0.25rem 0' }}>{title}</p>
        <p className="text-gray-light" style={{ fontSize: '0.875rem', margin: '0 0 0.25rem 0' }}>{email}</p>
        <p className="text-gray-light" style={{ fontSize: '0.875rem', margin: '0 0 0.75rem 0' }}>{phone}</p>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button className="btn-small btn-primary">Email</button>
          <button className="btn-small btn-outline">Call</button>
        </div>
      </div>
    </div>
  </div>
);

const ContactGridItem: React.FC<ContactGridItemProps> = ({ initials, name, role, email }) => (
  <div className="card text-center">
    <div className="avatar large" style={{ margin: '0 auto 0.75rem auto' }}>
      {initials}
    </div>
    <h4 style={{ fontWeight: '500', margin: '0 0 0.25rem 0' }}>{name}</h4>
    <p className="text-gray" style={{ fontSize: '0.875rem', margin: '0 0 0.25rem 0' }}>{role}</p>
    <p className="text-gray-light" style={{ fontSize: '0.75rem', margin: '0 0 0.5rem 0' }}>{email}</p>
    <button className="btn-small btn-primary">Contact</button>
  </div>
);

export const ContactsListDemo: React.FC<ContactsListDemoProps> = ({ variant }) => {
  if (variant === 'compact') {
    return (
      <div className="demo-content contacts-container">
        <h3 className="mb-4">Contacts</h3>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
          <ContactItem initials="AJ" name="Alice Johnson" email="alice@company.com" role="Designer" />
          <ContactItem initials="BS" name="Bob Smith" email="bob.smith@email.com" role="Developer" />
          <ContactItem initials="CD" name="Carol Davis" email="carol.d@startup.io" role="PM" />
          <ContactItem initials="DW" name="David Wilson" email="d.wilson@tech.com" role="Engineer" />
          <ContactItem initials="EB" name="Emma Brown" email="emma@creative.agency" role="Creative" />
        </div>
      </div>
    );
  }

  if (variant === 'detailed') {
    return (
      <div className="demo-content contacts-container">
        <h3 className="mb-4">Contacts</h3>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
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
  }

  if (variant === 'grid') {
    return (
      <div className="demo-content contacts-container">
        <h3 className="mb-4">Team Directory</h3>
        
        <div className="grid-2">
          <ContactGridItem initials="AJ" name="Alice Johnson" role="Designer" email="alice@company.com" />
          <ContactGridItem initials="BS" name="Bob Smith" role="Developer" email="bob.smith@email.com" />
          <ContactGridItem initials="CD" name="Carol Davis" role="PM" email="carol.d@startup.io" />
          <ContactGridItem initials="DW" name="David Wilson" role="Engineer" email="d.wilson@tech.com" />
        </div>
      </div>
    );
  }

  return null;
};