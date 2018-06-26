import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'
import { bindActionCreators, compose } from 'redux'
import { push, replace } from 'react-router-redux'

// Material UI
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Grow from '@material-ui/core/Grow'

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
      justifyContent: 'center',
      flexDirection: 'column',
      width: 880,
      position: 'relative',
    },
    contentHeader: {
      display: 'flex',
      justifyContent: 'center',
      width: '100%',
      padding: '30px 0',
      borderBottom: '3px solid #cfe1e3',
      textAlign: 'center',
    },    
    miniContainer: {
		  display: 'flex',
      justifyContent: 'center',
      flexDirection: 'column',
      width: 420,
      position: 'relative',
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
    content: {
      lineHeight: 2,
      fontSize: 12,
      color: '#949494',
    },
    contents: {
      display: 'flex',
      width: '100%',
      justifyContent: 'center',
    },
    contentsTitle: {
      fontSize: 40,
      fontWeight: 300,
      color: '#757575',
      textAlign: 'center',
      padding: '40px 0',
      [theme.breakpoints.down('md')]: {
        fontSize: 30,
        padding: '20px 0'
      },
    },
    grid: {
      paddingBottom: 40,
    },
    item: {
      height: 400,
      backgroundColor: '#cfe1e3',
      margin: '10px 30px',
      [theme.breakpoints.down('md')]: {
        margin: 5,
      },
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      cursor: 'pointer',
    },
    h1: {
      fontSize: 26,
      fontWeight: 100,
      color: '#757575', 
      padding: '10px 0',
    },
    h2: {
      fontSize: 17,
      fontWeight: 700,
      color: 'white', 
      padding: '10px 0',
    }
})

class Intro extends Component {

    navigate = to => () => {
      this.props.push(to)
    }

    render() {
      
      const { classes } = this.props
      
      return (
          <div className={classes.root}>
            <div className={classes.contentHeader}>
                <div className={classes.miniContainer}>
                    <div className={classes.title}>hello</div>
                    <div className={classes.link}>CLICK HERE IF YOU NEED AN EYE EXAM FOR FREE></div>
                    <div className={classes.content}>We are fresh & innovative in our approach but we are a non-profit organization & our mission to give vision, needs your support. All proceeds from on demand care go directly to Will Grant Vision Foundation program services.</div>
                </div>
            </div>
            <div className={classes.contents}>
                <div className={classes.container}>
                    <div className={classes.contentsTitle}>where would you like your eye exam?</div>
                    <Grid container className={classes.grid} justify="center" spacing={16}>
                      <Grid item xs={12} md={6}>
                        <Grow in={true}>
                          <div className={classes.item} onClick={this.navigate('coolspot')}>
                            <div className={classes.h1}>In a Really Cool Spot</div>
                            <div className={classes.h2}>NEARBY</div>
                          </div>
                        </Grow>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Grow
                          in={true}
                          style={{ transformOrigin: '0 0 0' }}
                          {...({ timeout: 1000 })}
                        >
                          <div className={classes.item} onClick={this.navigate('delivered')}>
                          <div className={classes.h1}>Delivered</div>
                            <div className={classes.h2}>TO YOU</div>
                          </div>
                        </Grow>
                      </Grid>
                    </Grid>
                </div>
            </div>
          </div>
      )
	}
}

Intro.propTypes = {
	classes: PropTypes.object.isRequired,
}

const mapStateToProps = () => ({})

const mapDispatchToProps = dispatch => bindActionCreators({
	push,
	replace
}, dispatch)

export default compose(
	withStyles(styles), connect(mapStateToProps, mapDispatchToProps)
)(Intro)
