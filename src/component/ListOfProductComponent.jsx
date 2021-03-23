import React, { Component } from 'react'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'

export default class ListOfProductComponent extends Component {
    render() {
        return (
            <div className="container">
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Product Name</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Username</th>
                            <th>Update</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td>@mdo</td>
                            <td><Button variant="success">Update</Button></td>
                            <td><Button variant="warning">Delete</Button></td>
                        </tr>
                        
                    </tbody>
                </Table>
            </div>
        )
    }
}
