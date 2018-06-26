import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'
import { bindActionCreators, compose } from 'redux'
import { push, replace } from 'react-router-redux'

// Material UI
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Slide from '@material-ui/core/Slide'

// Components
import glass from '../assets/glass.png'

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
      minHeight: 350,
      [theme.breakpoints.down('md')]: {
        margin: '50px 0',
      },
    },
    item: {
      padding: 10,
    },
    card: {      
      display: 'flex',
      justifyContent: 'center',
      width: '100%',
      height: '100%',
      backgroundColor: '#cfe1e3',
    },
    in1: {
      backgroundColor: 'white',
      margin: '20px 30px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    },
    in2: {
      margin: '20px 30px',
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    },
    img: {
      width: '90%',
    },
    h1: {
      fontSize: 30,
      fontWeight: 300,
      color: '#757575',
      width: '100%',
      textAlign: 'center', 
      paddingBottom: 20,
    },
    h2: {
      fontSize: 15,
      color: '#757575',
      width: '100%',
      textAlign: 'center',
      padding: '5px 0',
    },
    list: {
      width: '100%',
      textAlign: 'center',
      padding: '10px 0',
    },
    info: {
      width: '100%',
      height: 60,
      backgroundColor: 'white',
    }
})

class Glasses extends Component {

    render() {
      
      const { classes } = this.props
      
      return (
          <div className={classes.root}>
            <div className={classes.contentHeader}>
                <div className={classes.container}>
                    <div className={classes.title}>your glasses</div>
                    <div className={classes.link}>'see' more</div>
                </div>
            </div>
            <div className={classes.contents}>
                <div className={classes.container}>
                <Slide direction="left" in={true} mountOnEnter unmountOnExit>
                  <Grid container className={classes.grid} justify="center">
                    <Grid item xs={12} md={6} className={classes.item}>
                      <div className={classes.card}>
                        <div className={classes.in1}>
                          <img className={classes.img} src={glass} alt='' />
                        </div>
                      </div>
                    </Grid>
                    <Grid item xs={12} md={6} className={classes.item}>
                      <div className={classes.card}>
                        <div className={classes.in2}>
                          <div className={classes.h1}>about your glasses</div>
                          <div className={classes.list}>
                            <div className={classes.h2}>LENS</div>
                            <div className={classes.info} />
                          </div>
                          <div className={classes.list}>
                            <div className={classes.h2}>FRAMES</div>
                            <div className={classes.info} />
                          </div>
                          <div className={classes.list}>
                            <div className={classes.h2}>WARRANTY</div>
                            <div className={classes.info} />
                          </div>
                        </div>
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

Glasses.propTypes = {
	classes: PropTypes.object.isRequired,
}

const mapStateToProps = () => ({})

const mapDispatchToProps = dispatch => bindActionCreators({
	push,
	replace
}, dispatch)

export default compose(
	withStyles(styles), connect(mapStateToProps, mapDispatchToProps)
)(Glasses)
