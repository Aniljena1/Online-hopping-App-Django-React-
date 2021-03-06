import React, { useState, useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import Loader from '../components/Loader'
import Message from '../components/Message'
import { useDispatch, useSelector } from 'react-redux';
import { listUsers, deleteUsers } from '../actions/userAction';
import { Table, Button } from 'react-bootstrap';
import { HiCheck, HiTrash } from "react-icons/hi";
import { MdEdit } from "react-icons/md";

const UserListScreen = ({ history }) => {
    const dispatch = useDispatch()

    const userList = useSelector(state => state.userList)
    const { Loading, error, alluser } = userList

    const [users, setUsers] = useState(alluser)

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin

    const userDelete = useSelector(state => state.userDelete);
    const { success: successDelete } = userDelete

    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            dispatch(listUsers())
        } else {
            history.push('/login')
        }

    }, [dispatch, history, successDelete, userInfo])

    const deleteHandler = (id) => {
        if (window.confirm('Are you Sure you want to delete this User?')) {
            dispatch(deleteUsers(id))
        }

    }

    return (
        <div>
            {
                Loading ? <Loader />
                    : error
                        ? <Message variant='danger'>{error}</Message>
                        : (
                            <Table striped bordered hover responsive className='table-sm'>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>NAME</th>
                                        <th>EMAIL</th>
                                        <th>ADMIN</th>
                                        <th></th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {
                                        users.map((user) => (
                                            <tr key={user._id}>
                                                <td>{user._id}</td>
                                                <td>{user.name}</td>
                                                <td>{user.email}</td>
                                                <td>{user.isAdmin ? (
                                                    <HiCheck style={{ color: 'green' }} />
                                                ) : (
                                                    <HiCheck style={{ color: 'red' }} />
                                                )}</td>
                                                <td>
                                                    <LinkContainer to={`/admin/user/${user._id}/edit`}>
                                                        <Button variant='light' className='btn-sm'>
                                                            <MdEdit />
                                                        </Button>
                                                    </LinkContainer>

                                                    <Button variant='danger' className='btn-sm' onClick={() => deleteHandler(user._id)}>
                                                        <HiTrash />
                                                    </Button>

                                                </td>
                                            </tr>
                                        )
                                        )
                                    }
                                </tbody>
                            </Table>
                        )
            }
        </div>
    )
}

export default UserListScreen