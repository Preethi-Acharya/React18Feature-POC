import React, { useState, useTransition, Suspense } from 'react';
const UserList = React.lazy(() => import('./UserList'));

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [query, setQuery] = useState('');
  const [isPending, startTransition] = useTransition();

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    startTransition(() => {
      setQuery(value);
    });
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>React 18: User Search</h1>
      <input
        type="text"
        value={searchTerm}
        onChange={handleChange}
        placeholder="Search users..."
      />
      {isPending && <p>Loading results...</p>}
      <Suspense fallback={<p>Loading users...</p>}>
        <UserList query={query} />
      </Suspense>
    </div>
  );
};

export default App;
