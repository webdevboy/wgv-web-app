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
      width: 600,
      position: 'relative',
    },
    contentHeader: {
      display: 'flex',
      justifyContent: 'center',
      width: '100%',
      padding: '30px 0',
      textAlign: 'center',
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
      minHeight: 'calc(100vh - 366px)',
      backgroundColor: '#cfe1e3',
    },
    grid: {
      margin: '100px 0',
      [theme.breakpoints.down('md')]: {
        margin: '50px 0',
      },
    },
    grid1: {
      display: 'flex',
      justifyContent: 'flex-start',
      flexDirection: 'column',
      borderRight: '1px solid #2f2f2f',
      [theme.breakpoints.down('md')]: {
        justifyContent: 'center',
        textAlign: 'center',
        border: 'none',
      },
    },
    grid2: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-end',
      [theme.breakpoints.down('md')]: {
        alignItems: 'center',
      },
    },
    item: {
      marginBottom: 10,
      cursor: 'pointer',
    },
    h1: {
      fontSize: 12,
      fontWeight: 500,
      color: '#2f2f2f',
      lineHeight: 1.5
    },
    h2: {
      fontSize: 10,
      fontWeight: 300,
      color: '#2f2f2f', 
    },
    box: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      width: 170,
      height: 120,
      border: '1px solid white',
      margin: '20px 0',
      cursor: 'pointer',
    },
    dollar: {
      fontSize: 18,
      padding: 0,
      margin: 0,
    },
    date: {
      fontSize: 14,
      paddingTop: 7,
      margin: 0,
    },
    number: {
      fontSize: 22,
      paddingTop: 0,
      margin: 0,
    },
    or: {
      width: 170,
      textAlign: 'center',
      padding: '15px 0',
      color: '#2f2f2f',
    },
    p1: {
      display: 'flex',
      fontSize: 18,
      textAlign: 'center',
      color: '#2f2f2f',
      padding: '5px 0', 
      fontWeight: 300,
    },
    p2: {
      display: 'flex',
      fontSize: 11,
      textAlign: 'center',
      color: '#2f2f2f',
      fontWeight: 100,
    },
})

class CoolSport extends Component {

    navigate = to => () => {
      this.props.push(to)
    }

    render() {
      
      const { classes } = this.props
      
      return (
          <div className={classes.root}>
            <div className={classes.contentHeader}>
                <div className={classes.container}>
                    <div className={classes.title}>in a really cool sport nearby</div>
                    <div className={classes.link}>you gotta 'see'</div>
                </div>
            </div>
            <div className={classes.contents}>
                <div className={classes.container}>
                <Slide direction="left" in={true} mountOnEnter unmountOnExit>
                  <Grid container className={classes.grid} justify="center">
                    <Grid item xs={12} md={6} className={classes.grid1}>
                      <div className={classes.item}>
                        <div className={classes.h1}>downtown LA</div>
                        <div className={classes.h2}>555 West 5th Street, 34th floor</div>
                      </div>
                      <div className={classes.item}>
                        <div className={classes.h1}>Long Beach</div>
                        <div className={classes.h2}>100 W Broadway</div>
                      </div>
                      <div className={classes.item}>
                        <div className={classes.h1}>Santa Monica</div>
                        <div className={classes.h2}>520 BroadWay 312 Arizona Ave</div>
                      </div>
                      <div className={classes.item}>
                        <div className={classes.h1}>Manhattan Beach</div>
                        <div className={classes.h2}>1240 Rosecrans Ave</div>
                      </div>
                      <div className={classes.item}>
                        <div className={classes.h1}>Hollywood</div>
                        <div className={classes.h2}>7083 Hollywood Blvd</div>
                      </div>
                      <div className={classes.item}>
                        <div className={classes.h1}>Culver City</div>
                        <div className={classes.h2}>5792 West Jefferson Blvd</div>
                      </div>
                      <div className={classes.item}>
                        <div className={classes.h1}>Playa Vista</div>
                        <div className={classes.h2}>12655 W. Jefferson Blvd</div>
                      </div>
                      <div className={classes.item}>
                        <div className={classes.h1}>La Brea</div>
                        <div className={classes.h2}>925 N La Brea Ave, 4th floor</div>
                      </div>
                      <div className={classes.item}>
                        <div className={classes.h1}>Burbank</div>
                        <div className={classes.h2}>3900 W Alameda Ave</div>
                      </div>
                      <div className={classes.item}>
                        <div className={classes.h1}>Pasadena</div>
                        <div className={classes.h2}>177 E Colorado Blvd</div>
                      </div>
                    </Grid>
                    <Grid item xs={12} md={6} className={classes.grid2}>
                      <div className={classes.box}>
                        <div className={classes.p1}>SINGLE EXAM</div>
                        <div className={classes.p1}>
                          <p className={classes.dollar}>$</p>
                          <p className={classes.number}>80</p>
                        </div>
                      </div>
                      <div className={classes.or}>
                        or
                      </div>
                      <div className={classes.box}>
                        <div className={classes.p1}>VISIONAIRE</div>
                        <div className={classes.p2}>( subscription )</div>
                        <div className={classes.p1}>
                          <p className={classes.dollar}>$</p>
                          <p className={classes.number}>14.</p>
                          <p className={classes.dollar}>00</p>
                          <p className={classes.date}>/month</p>                          
                        </div>
                        <div className={classes.p2}>Exam(annual) + Classes(cool)</div>
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

CoolSport.propTypes = {
	classes: PropTypes.object.isRequired,
}

const mapStateToProps = () => ({})

const mapDispatchToProps = dispatch => bindActionCreators({
	push,
	replace
}, dispatch)

export default compose(
	withStyles(styles), connect(mapStateToProps, mapDispatchToProps)
)(CoolSport)
