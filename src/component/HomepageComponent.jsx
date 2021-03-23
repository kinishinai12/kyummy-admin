import React, { Component } from 'react'
import '../css/style.css'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import CardGroup from 'react-bootstrap/CardGroup'
import PendingService from '../service/PendingService'
import Pagination from 'react-bootstrap/Pagination'
import Badge from 'react-bootstrap/Badge';
// PEnding page to
export default class HomepageComponent extends Component {
    state={
        pending:[],
        pendingproduct:[],
        currentPage: 1,
        count:0,
    }

    approvedClicked=(pendingId)=>{
        let approved ={
            approved:true
        }
        PendingService.executeApprovePendingService(pendingId,approved)
        .then(res=>
            {
                alert(res.data);
                this.retrievePending();
        }).catch(err=>{
            alert("something went Wrong")
        })
    }

    componentDidMount(){
        this.retrievePending();
    }

    retrievePending=()=>{
        let page = this.state.currentPage - 1;
        PendingService.executeGetPendingService(page)
        .then(response=>{
            this.setState({pending:response.data.content})
            console.log(response.data);
            this.setState({count:response.data.totalPages})
        })
    }
    pageChange=(value)=>{
        this.setState({
          currentPage: value
        },
        () => {
          this.retrievePending();
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
                    
                    <Card.Title>Pending</Card.Title>
                    {
                        this.state.pending.map(
                            p=>
                    <Jumbotron key={p.id}>
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
                        <Badge variant="light">x{pr.quantity}, </Badge>
                        <Badge variant="light">{pr.productName}</Badge>
                        <Badge variant="light">Php {pr.price}</Badge>
                       
                        </>
                        )}
                    </p>
                    <p>
                        Type: Pick up
                    </p>
                    <p>
                        <Button variant="success" onClick={()=>this.approvedClicked(p.id)}>Received</Button>{" "}<Button variant="warning">Delete</Button>
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

