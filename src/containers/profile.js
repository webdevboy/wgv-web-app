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
import Avatar from '../assets/photo.png'
import img1 from '../assets/img1.png'
import img2 from '../assets/img2.png'
import img3 from '../assets/img3.png'

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
    date: {
      lineHeight: 2,
      fontSize: 25,
      fontWeight: 700,
      color: '#2f2f2f',
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
    userInfo: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      marginTop: 30,
    },
    avatar: {
      width: 150,
      height: 150,
      borderRadius: '50%'
    },
    userName: {
      textAlign: 'center',
      color: '#757575',
      fontSize: 20,
      fontWeight: 300,
      lineHeight: 2,
    },
    grid: {
      marginTop: 50
    },
    tab: {
      fontSize: 15,
      fontWeight: 500,
      textAlign: 'center',
      cursor: 'pointer',
    },
    cont: {
      padding: 20
    },
    img: {
      width: '100%'
    }
})

class Profile extends Component {

    navigate = to => {
      this.props.push(to)
    }

    render() {
      
      const { classes } = this.props
      
      return (
          <div className={classes.root}>
            <div className={classes.contentHeader}>
                <div className={classes.container}>
                    <div className={classes.title}>your next visit</div>
                    <div className={classes.date}>09 / 20 / 2018</div>
                </div>
            </div>
            <div className={classes.contents}>
              <Slide direction="left" in={true} mountOnEnter unmountOnExit>
                <div className={classes.container}>
                
                  <div className={classes.userInfo}>
                    <img src={Avatar} className={classes.avatar} alt=''/>
                    <div className={classes.userName}>Jane Joe</div>
                  </div>

                  <Grid container className={classes.grid} justify="center">
                    <Grid item xs={4}>
                      <div className={classes.tab} onClick={() => this.navigate('/glasses')}>MY GLASSES</div>
                    </Grid>
                    <Grid item xs={4}>
                      <div className={classes.tab} onClick={() => this.navigate('/prescription')}>MY PRESCRIPTION</div>
                    </Grid>
                    <Grid item xs={4}>
                      <div className={classes.tab} onClick={() => this.navigate('/vision')}>MY VISION</div>
                    </Grid>
                  </Grid>

                  <Grid container className={classes.grid} justify="center">
                    <Grid item xs={12} md={4}>
                      <div className={classes.cont}>
                        <img className={classes.img} src={img1} alt='' />
                      </div>
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <div className={classes.cont}>
                        <img className={classes.img} src={img2} alt='' />
                      </div>
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <div className={classes.cont}>
                        <img className={classes.img} src={img3} alt='' />
                      </div>
                    </Grid>
                  </Grid>
                
                </div>
              </Slide>
            </div>
          </div>
      )
	}
}

Profile.propTypes = {
	classes: PropTypes.object.isRequired,
}

const mapStateToProps = () => ({})

const mapDispatchToProps = dispatch => bindActionCreators({
	push,
	replace
}, dispatch)

export default compose(
	withStyles(styles), connect(mapStateToProps, mapDispatchToProps)
)(Profile)
