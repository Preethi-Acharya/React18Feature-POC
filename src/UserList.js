import React, { useEffect, useState } from 'react';

const fetchUsers = async (query) => {
  const res = await fetch(`https://reqres.in/api/users`);
  const data = await res.json();

  return data.data.filter((user) =>
    `${user.first_name} ${user.last_name}`.toLowerCase().includes(query.toLowerCase())
  );
};

const UserList = ({ query }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    fetchUsers(query).then((data) => {
      if (isMounted) {
        setUsers(data);
        setLoading(false);
      }
    });
    return () => {
      isMounted = false;
    };
  }, [query]);

  if (loading) return <p>Loading users...</p>;
  if (!users.length) return <p>No users found.</p>;

  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>
          <img
            src={user.avatar}
            alt={`${user.first_name} ${user.last_name}`}
            style={{ borderRadius: '50%', marginRight: '10px' }}
          />
          <strong>
            {user.first_name} {user.last_name}
          </strong>{' '}
          — {user.email}
        </li>
      ))}
    </ul>
  );
};

export default UserList;
