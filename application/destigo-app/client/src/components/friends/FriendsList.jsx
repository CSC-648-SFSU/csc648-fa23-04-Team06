import React, { useState, useEffect } from 'react';

const BASE_URL = 'http://localhost:8800';

const FriendsList = ({ token, setFriends, friends }) => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetch(`${BASE_URL}/api/users`, {
      headers: {
        'Authorization': `Bearer ${token}`
      },
    })
    .then(response => {
      if (response.status === 200) {
        return response.json();
      } else {
        throw new Error('Server response was not ok.');
      }
    })
    .then(data => {
      setUsers(data);
    })
    .catch(error => console.error(error));
  }, []);

  const handleAddFriend = (friendId) => {
    fetch(`${BASE_URL}/api/friends/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ friendId })
    })
      .then(response => response.json())
      .then(data => {
        if (data.message) {
          alert(data.message);
        } else {
          alert('Friend added successfully');
          setFriends([...friends, data]);
        }
      })
      .catch(error => console.error(error));
  };

  return (
    <div>
      <h2>Friends</h2>
      {friends.map(friend => <div key={friend.id}>{friend.name}</div>)}

      <h2>Add Friends</h2>
      <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search users" />
      {users.filter(user => user.name.includes(search)).map(user => (
        <div key={user.id}>
          {user.name}
          {!friends.some(friend => friend.id === user.id) && (
            <button onClick={() => handleAddFriend(user.id)}>+</button>
          )}
        </div>
      ))}
    </div>
  );
};

export default FriendsList;