import React from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import PropTypes from "prop-types";
import { withStyles } from '@material-ui/core/styles';
import Navigation from "../FrameWorkUnity/DynamicNavBar";
import Search from "../FrameWorkUnity/Search";
import Container from "../FrameWorkUnity/Container";
import InnerNavigationBar from "../FrameWorkUnity/StaticNavBar"
import {connect} from "react-redux";
import {loginAction, logInRequest} from "../../actions/LoginAction/loginAction";
import axios from "axios";


const styles = theme => ({
    button: {
        margin: theme.spacing.unit * 3,
        width: 'auto',
    },
    root: {
        width: '100%',
    },
    bgDiv: {
        position: 'flex',
        outline: 'none',
        textAlign: 'center',
    },
    top:{
        position: 'flex',
        font: 'Helvetica',
        marginBottom: theme.spacing.unit * 5,
        width: '100%',
        height: theme.spacing.unit * 30,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
        outline: 'none',
        textAlign: 'center',
        WebkitBorderRadius:'10px 10px 10px 10px',
    },
    bottom:{
        position: 'flex',
        font: 'Helvetica',
        marginBottom: theme.spacing.unit * 5,
        width: '100%',
        height: theme.spacing.unit * 30,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
        outline: 'none',
        textAlign: 'center',
        WebkitBorderRadius:'10px 10px 10px 10px',
    }
});

class DepositPage extends React.Component{
    state = {
        payAmount_checking: 0,
        payAmount_saving: 0,
        checkingAccountNumber :0,
        savingAccountNumber : 0,
    };


    componentDidMount() {
        this.setState({checkingAccountNumber:  this.props.myInfo.accounts[0].account_number})
        this.setState({savingAccountNumber:  this.props.myInfo.accounts[1].account_number})
    }


    onSubmit1 =(e) => {
        e.preventDefault();

        console.log('it just submit');
        console.log(e);
        console.log(this.state.payAmount_checking);
        console.log(this.props);

        const req_headers = {Authorization: 'Bearer ' + this.props.myKey}

        axios.post('/api/deposit',
            {amount: parseFloat(this.state.payAmount_checking),
                  account_num: this.state.checkingAccountNumber},
            {headers: req_headers}
            )
            .then(response => {
                console.log(response);

            }).catch (error => console.log(error.response.data.msg));

        this.setState({payAmount_checking: 0})

    }

    onSubmit2 =(e) => {
        e.preventDefault();
        console.log('it just submit222');
        const req_headers = {Authorization: 'Bearer ' + this.props.myKey}

        axios.post('/api/deposit',
            {amount: parseFloat(this.state.payAmount_saving),
                account_num: this.state.savingAccountNumber},
            {headers: req_headers}
        )
            .then(response => {
                console.log(response);

            }).catch (error => console.log(error.response.data.msg));

        this.setState({payAmount_saving: 0})

    }

    render() {
        const {classes} = this.props;

        return (
            <div >
                <Navigation/>
                <Search/>
                <Container>
                    <InnerNavigationBar active={activeElement}/>
                    <div className={classes.bgDiv}>
                        <div className={classes.top}>
                            <div style={{float: 'left', width:"50%"}}>
                              <Typography variant="h4" color="secondary"><strong>Deposit to Checking Account</strong></Typography>
                                <Typography variant="subtitle2">Checking Account -{ this.state.checkingAccountNumber}</Typography>
                            </div>
                            <div style={{float: 'right', width:"30%"}}>
                                <form onSubmit={this.onSubmit1}>
                                <Typography variant="h5"><strong>Amount</strong></Typography>
                                <input
                                    type="number"
                                    className="form-control"
                                    name="amount"
                                    //placeholder= {'$' + this.state.payAmount}
                                    value = {this.state.payAmount_checking}
                                    onChange ={e=>this.setState({payAmount_checking:e.target.value})}
                                />
                                <Button
                                    className={classes.button}
                                    type = "submit"
                                    variant="contained"
                                    color="primary"
                                >
                                    Submit
                                </Button>
                                </form>
                            </div>
                        </div>

                        <div className={classes.bottom}>
                            <div style={{float: 'left', width:"50%"}}>
                              <Typography variant="h4" color="secondary"><strong>Deposit to Saving Account</strong></Typography>
                                <Typography variant="subtitle2">Saving Account -{this.state.savingAccountNumber}</Typography>
                            </div>
                            <div style={{float: 'right', width:"30%"}}>
                                <form onSubmit={this.onSubmit2}>
                                <Typography variant="h5"><strong>Amount</strong></Typography>
                                <input
                                    type="number"
                                    className="form-control"
                                    name="amount"
                                    //placeholder= {'$' + this.state.payAmount}
                                    value = {this.state.payAmount_saving}
                                    onChange ={e=>this.setState({payAmount_saving:e.target.value})}
                                />
                                <Button
                                    className={classes.button}
                                    type = "submit"
                                    variant="contained"
                                    color="primary"
                                >
                                    Submit
                                </Button>
                                </form>
                            </div>
                        </div>

                    </div>

                </Container>
            </div>

        );
    }


}

const activeElement = {
    act1: "nav-link ",
    act2: "nav-link ",
    act3: "nav-link ",
    act4: "nav-link active",
}

DepositPage.propTypes = {
    classes: PropTypes.object.isRequired,
};


const mapStateToProps = (state) => {
    console.log("I'm in map State to Props");
    console.log(state);
    return state;
}


export default connect(mapStateToProps)(withStyles(styles)(DepositPage));