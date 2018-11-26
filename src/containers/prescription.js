import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { connect } from 'react-redux'
import { bindActionCreators, compose } from 'redux'
import { push, replace } from 'react-router-redux'
import { Link, withRouter } from 'react-router-dom';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
// Material UI
import { withStyles } from '@material-ui/core/styles'
import Slide from '@material-ui/core/Slide'
import Button from '@material-ui/core/Button'
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
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
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#cfe1e3',
    minHeight: 350,
    [theme.breakpoints.down('xs')]: {
      minHeight: 200,
    },
  },
  between: {
    padding: '0 5px',
  },
  filterBar: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
    padding: '10px 0',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
    },
  },
  option: {
    display: 'flex',
    width: '40%',
    [theme.breakpoints.down('xs')]: {
      padding: '5px 0',
      width: '100%',
    },
  },
  justifyLeft: {
    justifyContent: 'flex-start',
  },
  justifyRight: {
    justifyContent: 'flex-end',
  },
  label: {
    height: 35,
    lineHeight: '35px',
    paddingRight: 5,
    flex: 2
  },
  input: {
    height: 35,
    border: '1px solid #757575',
    flex: 6,
    display: 'flex',
    alignItems: 'center',
    'justify-content': 'center'
  },
  tables: {
    width: 600,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
  },
  tableIn: {
    padding: 20,
    width: '100%',
    backgroundColor: '#e8f1f2',
    [theme.breakpoints.down('xs')]: {
      padding: 5
    },
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  td: {
    border: '1px solid #757575',
    textAlign: 'center',
    verticalAlign: 'middle',
    padding: '15px 0',
    fontSize: 15,
    [theme.breakpoints.down('xs')]: {
      padding: '10px 0',
      fontSize: 10
    },
  },
  button: {
    fontSize: 15,
    backgroundColor: 'black',
    borderRadius: '5px 0 5px 0',
    color: '#bdf7fb',
    '&:hover': {
      backgroundColor: 'black',
    },
    marginTop: 20
  },
  back: {
    marginTop: 30,
    marginBottom: 30,
    backgroundColor: '#757575',
    '&:hover': {
      backgroundColor: '#757575',
    },
  }
})

class Prescription extends Component {

  constructor(props) {
    super(props);

    this.state = {
      value: 0,
    }
  }

  printPDF = () => {
    const table = document.getElementById('printTable');
    html2canvas(table)
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        pdf.addImage(imgData, 'JPEG', 30, 20);
        pdf.save("download.pdf");
      })
    ;
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };

  gotoBack = () => {
    console.log(123)
    this.props.push('/profile')
  }

  render() {

    const { classes, user } = this.props
    const { value } = this.state
    return (
      <div className={classes.root}>
        <div className={classes.contentHeader}>
          <div className={classes.container}>
            <div className={classes.title}>your prescription</div>
            <div className={classes.link}>focused on details</div>
          </div>
        </div>
        <div className={classes.contents}>
          <div className={classes.container}>
            <Slide direction="left" in={true} mountOnEnter unmountOnExit>
              <React.Fragment>
                <IconButton
                  onClick={this.gotoBack}
                  className={classes.back}
                  >
                  <ChevronLeftIcon />
                </IconButton>
                <AppBar position="static" color="default">
                  <Tabs
                      value={this.state.value}
                      onChange={this.handleChange}
                      indicatorColor="primary"
                      textColor="primary"
                      fullWidth
                    >
                    <Tab label="glasses" />
                    <Tab label="contacts" />
                  </Tabs>
                </AppBar>
                { value === 0 &&
                  <React.Fragment>
                    {/* <div className={classes.tabs}>
                      <span className={classes.tab}>glasses</span>
                      <span className={classes.between}>|</span>
                      <span className={classes.tab}>contacts</span>
                    </div> */}
                    <div className={classes.grid}>
                      <div className={classes.tables}>
                        <div className={classes.tableIn}>
                          <table className={classes.table} id="printTable">
                            <tbody>
                              <tr>
                                <td className={classes.td}></td>
                                <td className={classes.td}>SPHERE</td>
                                <td className={classes.td}>CYLINDER</td>
                                <td className={classes.td}>AXIS</td>
                                <td className={classes.td}>BASE</td>
                                <td className={classes.td}>ADD.</td>
                                <td className={classes.td}>DIA</td>
                              </tr>
                              <tr>
                                <td className={classes.td}>RIGHT O.D.</td>
                                <td className={classes.td}>{user.rightSphere}</td>
                                <td className={classes.td}>{user.rightCylinder}</td>
                                <td className={classes.td}>{user.rightAxis}</td>
                                <td className={classes.td}>{user.rightBase}</td>
                                <td className={classes.td}>{user.rightAdd}</td>
                                <td className={classes.td}>{user.rightDia}</td>
                              </tr>
                              <tr>
                                <td className={classes.td}>LEFT O.S.</td>
                                <td className={classes.td}>{user.leftSphere}</td>
                                <td className={classes.td}>{user.leftCylinder}</td>
                                <td className={classes.td}>{user.leftAxis}</td>
                                <td className={classes.td}>{user.leftBase}</td>
                                <td className={classes.td}>{user.leftAdd}</td>
                                <td className={classes.td}>{user.leftDia}</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>

                        <Button className={classes.button} onClick={this.printPDF}>PRINT</Button>
                      </div>
                    </div>
                    <div className={classes.filterBar}>
                      <div className={classNames(classes.option, classes.justifyLeft)}>
                        <label htmlFor="doctor" className={classes.label}>doctor</label>
                        <div className={classes.input}>{user.doctorName}</div>
                      </div>
                      <div className={classNames(classes.option, classes.justifyRight)}>
                        <label htmlFor="license" className={classes.label}>license #</label>
                        <div className={classes.input}>{user._id}</div>
                      </div>
                    </div>
                  </React.Fragment>
                }
                {value === 1 && <React.Fragment>
                  <h1>Contact page</h1>
                  </React.Fragment>}

              </React.Fragment>
            </Slide>
          </div>
        </div>
      </div>
    )
  }
}

Prescription.propTypes = {
  classes: PropTypes.object.isRequired,
}

const mapStateToProps = ({
  auth: { user },
}) => ({
  user
})

const mapDispatchToProps = dispatch => bindActionCreators({
  push,
  replace
}, dispatch)

export default compose(
  withStyles(styles), connect(mapStateToProps, mapDispatchToProps)
)(Prescription)
