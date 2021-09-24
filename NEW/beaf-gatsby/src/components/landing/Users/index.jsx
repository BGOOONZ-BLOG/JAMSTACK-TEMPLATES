import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Container from 'components/common/Container';
import Button from 'components/common/Button';
import { Wrapper, Join } from './styles';

export const Users = () => {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await axios.post(
          `${process.env.GATSBY_API}/api/user/users/total`
        );
        setUsers(data);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUsers();
  }, []);
  return (
    <Wrapper>
      <Container>
        {loading ? (
          <h4>Loading...</h4>
        ) : (
          <>
            <h4>
              Join over {users.length} users and help everyone make better
              decisions!
            </h4>
            <p>Including yourself ;)</p>
            <Join>
              <Button as="a" href="https://app.beafapp.com/register">
                Join Now
              </Button>
            </Join>
          </>
        )}
      </Container>
    </Wrapper>
  );
};
