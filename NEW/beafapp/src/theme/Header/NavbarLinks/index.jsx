import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import Select from 'react-select'
import { Button } from '../../../components/common'
import { Links, Avatar } from './styles'
import categories from './categories.json'

const NavbarLinks = ({ desktop, logout, auth, history }) => (
  <Links desktop={desktop}>
    <NavLink to="/" exact activeStyle={{ color: '#FF6347' }}>
      Feed
    </NavLink>
    {auth && auth.isLoggedIn && (
      <NavLink to="/add-post" activeStyle={{ color: '#FF6347' }}>
        New Post
      </NavLink>
    )}
    <Select
      placeholder="Categories"
      component={Select}
      options={categories}
      onChange={({ value }) => history.push(`/category/${value}`)}
      name="category"
    />
    {auth && auth.isLoggedIn && (
      <Avatar
        as={NavLink}
        to="/profile"
        exact
        activeStyle={{ borderColor: '#FF6347' }}
      >
        <img src={auth.user.avatar} alt={auth.user.username} />
      </Avatar>
    )}
    {auth && auth.isLoggedIn ? (
      <Button type="button" onClick={logout}>
        Logout
      </Button>
    ) : (
      <>
        <Button as={Link} to="/login">
          Login
        </Button>
        <Button as={Link} to="/register" outlined="true">
          Register
        </Button>
      </>
    )}
  </Links>
)

export default NavbarLinks
