import React, { Component } from 'react'

import Jumbotron from 'react-bootstrap/Jumbotron'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import CardGroup from 'react-bootstrap/CardGroup'
import PendingService from '../service/PendingService'
import Pagination from 'react-bootstrap/Pagination'
import Badge from 'react-bootstrap/Badge';

export default class ReceivedComponent extends Component {
    state={
        received:[],
        currentPage: 1,
        count:0,
    }
    // iibahin to
    deleteClicked=(pendingId)=>{
        PendingService.executeDeleteService(pendingId)
        .then(res=>
            {
                alert(res.data);
                this.retrieveReceived();
        }).catch(err=>{
            alert("something went Wrong")
        })
    }

    componentDidMount(){
        this.retrieveReceived();
    }

    retrieveReceived=()=>{
        let page = this.state.currentPage - 1;
        PendingService.executeGetAllReceivedService(page)
        .then(response=>{
            this.setState({received:response.data.content})
            console.log(response.data.content)
            this.setState({count:response.data.totalPages})
        })
    }
    pageChange=(value)=>{
        this.setState({
          currentPage: value
        },
        () => {
          this.retrieveReceived();
        }
        );
      }
    render() {
        const date=(instant)=>{
            return new Date(instant * 1000).toDateString()
        }
        let items = [];
        for (let number = 1; number <= this.state.count; number++) {
          items.push(
            <Pagination.Item key={number} active={number===this.state.currentPage} onClick={()=>this.pageChange(number)}>
              {number}
            </Pagination.Item>,
          );
        }
        return (
            <div className="container" style={{'marginTop': "5px", 'marginBottom': "5px", 'padding':"10px"}}>
            <CardGroup>
            <Card style={{ width: '18rem' }}>
                
                <Card.Body>
                    <Card.Title>Received</Card.Title>
                    {
                        this.state.received.map(
                            p=>
                    <Jumbotron key={p.id}>
                    <h5>{p.email}</h5>
                    <p>
                        Phone number: {"<"}{p.phoneNumber}{">"}
                    </p>
                    <p>
                        Date Received: {"<"}{date(p.date)}{">"}
                    </p>
                    <p>
                        TotalPrice: <Badge variant="light">Php {p.totalPrice}</Badge>
                    </p>
                    <p>
                        Type: Pick up
                    </p>
                    <p>
                        <Button variant="warning" onClick={()=>this.deleteClicked(p.id)}>Delete</Button>
                    </p>
                </Jumbotron>
                        )
                    }
                </Card.Body>
                    <Card.Link><Pagination >
                        {items}
                    </Pagination></Card.Link>
                </Card>
                </CardGroup> 
                </div>
        )
    }
}
