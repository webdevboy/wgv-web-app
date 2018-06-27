import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'
import { bindActionCreators, compose } from 'redux'
import { push, replace } from 'react-router-redux'
import { Creators as Actions } from '../actions'

// Material UI
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Slide from '@material-ui/core/Slide'
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button'
import Checkbox from '@material-ui/core/Checkbox'

// Components

const styles = theme => ({
    root: {
      flexGrow: 1,
      padding: 20,
      width: '100%',
      minHeight: 'calc(100% - 156px)',
      [theme.breakpoints.down('md')]: {
        marginTop: 20,
      },
    },
    container: {
      display: 'flex',
      flexDirection: 'column',
      width: 800,
      position: 'relative',
    },
    contentHeader: {
      display: 'flex',
      justifyContent: 'center',
      width: '100%',
      padding: '30px 0',
      textAlign: 'center',
      borderBottom: '3px solid #cfe1e3',
    },
    title: {
      fontSize: 40,
      fontWeight: 300,
      color: '#757575',
      [theme.breakpoints.down('md')]: {
        fontSize: 30,
      },
    },
    link: {
      lineHeight: 2,
      fontSize: 12,
      color: '#8bb4c2',
      marginTop: 40,
    },
    contents: {
      display: 'flex',
      justifyContent: 'center',
      width: '100%',
      height: '100%',
      minHeight: 'calc(100vh - 370px)',
    },
    grid: {
      margin: '100px 0',
      backgroundColor: '#cfe1e3',
      [theme.breakpoints.down('md')]: {
        margin: '50px 0',
      },
    },
    gridx: {
      padding: '25px',
      [theme.breakpoints.down('md')]: {
        padding: '10px',
      },
    },
    formTitle: {
      width: '100%',
      fontSize: 30,
      fontWeight: 300,
      color: '#717171',
      textAlign: 'center',
    },
    formControl: {
      margin: '10px 0',
      width: '100%',
    },
    formLabel: {
      color: '#717171 !important',
    },
    formInput: {
      color: '#717171',
      "&:before": {
        borderColor: '#717171'
      },
      "&:after": {
        borderColor: '#717171'
      }
    },
    formError: {
      color: 'red',
    },
    buttons: {
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      paddingTop: 20
    },
    button: {
      fontSize: 15,
      backgroundColor: 'black',
      borderRadius: '5px 0 5px 0',
      color: '#bdf7fb',
      '&:hover': {
        backgroundColor: 'black',
      },
    },
    actions: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    action: {
      color: '#717171',
      fontSize: 12,
      cursor: 'pointer',
      '&:hover': {
        color: '#8bb4c2',
      }
    }
})

const validateEmail = (email) => {
  let EMAIL_PATTERN = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return EMAIL_PATTERN.test(String(email).toLowerCase());
}

const validatePassword = (password) => {
  return password.length >= 6;
}

class Account extends Component {
    constructor(props) {
      super(props);

      this.state = {
        email: '',
        password: '',
        regEmail: '',
        regPassword: '',
        regConfirmPassword: '',
        emailError: false,
        passwordError: false,
      };

    }

    handleChange = name => event => {
      const validate = {};

      switch(name) {
        case 'email':
          validate.emailError = !validateEmail(this.state.email)
          break;
        case 'password':
          validate.passwordError = !validatePassword(this.state.password)
          break;
        default:
          break;
      }

      this.setState({
        ...validate,
        [name]: event.target.value,
      })
    }

    handleLoginSubmit() {
      const { email, password, emailError, passwordError } = this.state

      if ( email !== '' && password !== '' && !emailError && !passwordError ) {
        this.props.push('/profile');
        this.props.loginAttempt({ email, password });        
      }
    }

    render() {
      
      const { classes } = this.props
      const { emailError, passwordError } = this.state
      
      return (
          <div className={classes.root}>
            <div className={classes.contentHeader}>
                <div className={classes.container}>
                    <div className={classes.title}>access your account</div>
                    <div className={classes.link}>fill in your information below</div>
                </div>
            </div>
            <div className={classes.contents}>
                <div className={classes.container}>
                <Slide direction="left" in={true} mountOnEnter unmountOnExit>
                  <Grid container className={classes.grid} justify="center">
                    <Grid item xs={12} md={6} className={classes.gridx}>
                      <div className={classes.formTitle}>Login</div>

                      <FormControl className={classes.formControl} aria-describedby="email-helper-text">
                        <InputLabel htmlFor="email-helper" className={classes.formLabel}>Email</InputLabel>
                        <Input id="email-helper" className={classes.formInput} value={this.state.email} type="email" onChange={this.handleChange('email')} />
                        {emailError &&
                          <FormHelperText id="email-error-text" className={classes.formError}>Invalid Email!</FormHelperText>
                        }
                      </FormControl>

                      <FormControl className={classes.formControl} aria-describedby="password-helper-text">
                        <InputLabel htmlFor="password-helper" className={classes.formLabel}>Password</InputLabel>
                        <Input id="password-helper" className={classes.formInput} value={this.state.password} type="password" onChange={this.handleChange('password')} />
                        {passwordError &&
                          <FormHelperText id="password-error-text" className={classes.formError}>Invalid Password!</FormHelperText>
                        }
                      </FormControl>

                      <div className={classes.actions}>
                        <div className={classes.action}>
                          <Checkbox defaultChecked color="primary" value="checkedG" />
                          Remomber Me
                        </div>
                        <div className={classes.action}>Forgot Password?</div>
                      </div>

                      <div className={classes.buttons}>
                        <Button className={classes.button} onClick={() => this.handleLoginSubmit()}>LOGIN</Button>
                      </div>

                    </Grid>
                    <Grid item xs={12} md={6} className={classes.gridx}>
                      <div className={classes.formTitle}>Register</div>

                      <FormControl className={classes.formControl} aria-describedby="reg-email-helper-text">
                        <InputLabel htmlFor="reg-email-helper" className={classes.formLabel}>Email</InputLabel>
                        <Input id="reg-email-helper" className={classes.formInput} value={this.state.regEmail} type="email" onChange={this.handleChange('regEmail')} />
                        {/* <FormHelperText id="reg-email-error-text" className={classes.formError}>Invalid Email!</FormHelperText> */}
                      </FormControl>

                      <FormControl className={classes.formControl} aria-describedby="reg-password-helper-text">
                        <InputLabel htmlFor="reg-password-helper" className={classes.formLabel}>Password</InputLabel>
                        <Input id="reg-password-helper" className={classes.formInput} value={this.state.regPassword} type="password" onChange={this.handleChange('regPassword')} />
                        {/* <FormHelperText id="reg-password-error-text" className={classes.formError}>Invalid Password!</FormHelperText> */}
                      </FormControl>

                      <FormControl className={classes.formControl} aria-describedby="reg-confirm-password-helper-text">
                        <InputLabel htmlFor="reg-confirm-password-helper" className={classes.formLabel}>Confirm Password</InputLabel>
                        <Input id="reg-confirm-password-helper" className={classes.formInput} value={this.state.regConfirmPassword} type="password" onChange={this.handleChange('regConfirmPassword')} />
                        {/* <FormHelperText id="reg-confirm-password-error-text" className={classes.formError}>Invalid Password!</FormHelperText> */}
                      </FormControl>

                       <div className={classes.buttons}>
                        <Button className={classes.button}>REGISTER</Button>
                      </div>
                    </Grid>
                  </Grid>
                </Slide>
                </div>
            </div>
          </div>
      )
	}
}

Account.propTypes = {
	classes: PropTypes.object.isRequired,
}

const {
  loginAttempt,
} = Actions;

const mapStateToProps = () => ({})

const mapDispatchToProps = dispatch => bindActionCreators({
	push,
  replace,
  loginAttempt
}, dispatch)

export default compose(
	withStyles(styles), connect(mapStateToProps, mapDispatchToProps)
)(Account)
