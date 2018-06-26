import React from 'react'
import PropTypes from 'prop-types'

// Material UI
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button';
import Hidden from '@material-ui/core/Hidden';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

const styles = theme => ({
	flex: {
		flex: 1,
	},
  root: {
		width: '100%',
		display: 'flex',
		justifyContent: 'center',
		[theme.breakpoints.down('md')]: {
			position: 'absolute',
		},
	},
	container: {
		display: 'flex',
		justifyContent: 'center',
		width: '100%',
		maxWidth: 1100,
		marginTop: 25,
		position: 'relative',
		[theme.breakpoints.down('md')]: {
			marginTop: 5,
		},		
  },
	logo: {
		padding: '15px 0',
		backgroundColor: 'black',
		color: 'white',
		fontSize: 14,
		textAlign: 'center',
		wordSpacing: 3,
		letterSpacing: 2,
		width: 240,
		cursor: 'pointer',
	},
	first: {
		color: '#bdf7fb'
	},
	buttons: {
		position: 'absolute',
		bottom: 0,
		right: 0,
	},
	button: {
		color: '#a6ccd0',
		textTransform: 'none',
		fontSize: 15,
		minHeight: 15,
		fontWeight: 300,
		padding: 0
	}
})


class Header extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			anchorEl: null,
		};

		this.goProfile = this.goProfile.bind(this);
	}

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
	}
	
	handleClose = () => {
    this.setState({ anchorEl: null });
  };

	logout = () => {
		this.setState({ anchorEl: null });
		this.props.logout();
		this.props.navigate('/account');
	}

	goProfile(){
		this.setState({ anchorEl: null });
		this.props.navigate('/profile');
	}

	render() {
		const { classes, navigate, isAuthenticated } = this.props
    const { anchorEl } = this.state

    return (
			<div className={classes.root}>
				<div className={classes.container}>
					<div className={classes.logo} onClick={() => navigate('/')}>
						<span className={classes.first}>ON DEMAND</span>
						<span> EYE EXAM</span>
					</div>
					<Hidden xsDown>
						<div className={classes.buttons}>
							{isAuthenticated
								? <div>
										<Button
											aria-owns={anchorEl ? 'simple-menu' : null}
											aria-haspopup="true"
											className={classes.button}
											onClick={this.handleClick}
										>
											Jane Joe
										</Button>
										<Menu
											id="simple-menu"
											anchorEl={anchorEl}
											open={Boolean(anchorEl)}
											onClose={this.handleClose}
										>
											<MenuItem onClick={this.goProfile}>Profile</MenuItem>
											<MenuItem onClick={this.logout}>Logout</MenuItem>
										</Menu>
									</div>
								:	<Button className={classes.button} onClick={() => navigate('/account')}>Login</Button>
							}
						</div>
					</Hidden>
				</div>
			</div>
		)}
}

Header.propTypes = {
	classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Header)
