import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'
import { bindActionCreators, compose } from 'redux'
import { push, replace } from 'react-router-redux'

// Material UI
import { withStyles } from '@material-ui/core/styles'
import Slide from '@material-ui/core/Slide'

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
      backgroundColor: '#cfe1e3',
      margin: '100px 0',
      minHeight: 350,
      [theme.breakpoints.down('md')]: {
        margin: '50px 0',
      },
    },
    in: {
      padding: '50px 30px'
    },
    h1: {
      width: '100%',
      fontSize: 30
    },
    p1: {
      paddingTop: 30,
      width: '100%',
      fontSize: 15,
      lineHeight: 1.5
    }
})

class Vision extends Component {

    render() {
      
      const { classes } = this.props
      
      return (
          <div className={classes.root}>
            <div className={classes.contentHeader}>
                <div className={classes.container}>
                    <div className={classes.title}>your vision</div>
                    <div className={classes.link}>believing is seeing</div>
                </div>
            </div>
            <div className={classes.contents}>
                <div className={classes.container}>
                <Slide direction="left" in={true} mountOnEnter unmountOnExit>
                  <div className={classes.grid}>
                    <div className={classes.in}>
                      <div className={classes.h1}>admin final content</div>
                      <div className={classes.p1}>Lorem ipsum has become the industry standard for design mockups and prototypes. By adding a little bit 
of Latin to a mockup, you’re able to show clients a more complete version of your design without actually 
having to invest time and effort drafting copy.
But despite all its benefits, seeing the same random Latin text in every design can get a little boring for you 
and your clients. So if you have a client who’s got a sense of humour or if you’re just tired of going the 
traditional route in your mockups, here are 15 creative and funny lorem ipsum text generators that are 
sure to lighten the mood at any client meeting.</div>
                    </div>
                  </div>
                </Slide>
                </div>
            </div>
          </div>
      )
	}
}

Vision.propTypes = {
	classes: PropTypes.object.isRequired,
}

const mapStateToProps = () => ({})

const mapDispatchToProps = dispatch => bindActionCreators({
	push,
	replace
}, dispatch)

export default compose(
	withStyles(styles), connect(mapStateToProps, mapDispatchToProps)
)(Vision)
