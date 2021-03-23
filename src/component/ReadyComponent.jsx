import React, { Component } from 'react'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import CardGroup from 'react-bootstrap/CardGroup'
import PendingService from '../service/PendingService'
import Pagination from 'react-bootstrap/Pagination'
import Badge from 'react-bootstrap/Badge';

export default class ReadyComponent extends Component {
    state={
        ready:[],
        currentPage: 1,
        count:0,
        show:false
    }
    // iibahin to
    doneClicked=(pendingId)=>{
        let approved ={
            approved:true
        }
        PendingService.executeReceivedService(pendingId,approved)
        .then(res=>
            {
                alert(res.data);
                this.retrieveReady();
        }).catch(err=>{
            alert("something went Wrong")
        })
    }

    componentDidMount(){
        this.retrieveReady();
    }

    retrieveReady=()=>{
        let page = this.state.currentPage - 1;
        PendingService.executeGetReadyService(page)
        .then(response=>{
            this.setState({ready:response.data.content})
            console.log(response.data.content.receive)
            console.log(response.data);
            this.setState({count:response.data.totalPages})
        })
    }
    pageChange=(value)=>{
        this.setState({
          currentPage: value
        },
        () => {
          this.retrieveReady();
        }
        );
      }
    render() {
        let items = [];
        for (let number = 1; number <= this.state.count; number++) {
          items.push(
            <Pagination.Item key={number} active={number===this.state.currentPage} onClick={()=>this.pageChange(number)}>
              {number}
            </Pagination.Item>,
          );
        }
        return (
            <div className="container"  style={{'marginTop': "5px", 'marginBottom': "5px", 'padding':"10px"}}>
            <CardGroup>
            <Card style={{ width: '18rem' }}>
                
                <Card.Body>
                    
                    <Card.Title>Ready to pick up</Card.Title>
                    {
                        this.state.ready.map(
                            p=>
                    <Jumbotron key={p.id}>
                    {p.received && <h3>This Item is Received</h3>}
                    <h5>{p.email}</h5>
                    <p>
                        Phone number: {"<"}{p.phoneNumber}{">"}
                    </p>
                    <p>
                        TotalPrice: <Badge variant="light">Php {p.totalPrice}</Badge>
                    </p>
                    <p>
                        Reserve Items:
                    </p>
                    <p>
                       {p.product.map(pr=>
                       <>
                       <Badge variant="light">x{pr.quantity}</Badge>
                        <Badge variant="light">{pr.productName}</Badge>
                        <Badge variant="light">Php {pr.price}</Badge>
                        
                        </>
                        )}
                    </p>
                    <p>
                        Type: Pick up
                    </p>
                    <p>
                        {!p.received && <Button variant="success" onClick={()=>this.doneClicked(p.id)}>Received</Button>}{" "}<Button variant="warning">Delete</Button>
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
