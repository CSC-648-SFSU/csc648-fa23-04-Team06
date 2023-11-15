import React, { useState, useEffect } from 'react';

const AddFriend = ({ BASE_URL, token, setFriends, friends }) => {
  const [addFriendValue, setAddFriendValue] = useState('');
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch(`${BASE_URL}/api/users`, {
      headers: {
        'Authorization': `Bearer ${token}`
      },
    })
      .then(response => response.json())
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
      {users.map(user => (
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

export default AddFriend;