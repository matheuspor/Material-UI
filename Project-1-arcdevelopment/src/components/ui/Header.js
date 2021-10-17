/* eslint-disable no-magic-numbers */
/* eslint-disable sonarjs/cognitive-complexity */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable max-lines */
/* eslint-disable react/jsx-max-depth */
/* eslint-disable react-func/max-lines-per-function */
import React, { useState, useEffect } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import { makeStyles } from '@material-ui/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import logo from '../../assets/logo.svg';

function ElevationScroll(props) {
  const { children } = props;
  const FOUR = 4;

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return React.cloneElement(children, {
    elevation: trigger ? FOUR : 0,
  });
}

const useStyles = makeStyles((theme) => ({
  toolbarMargin: {
    ...theme.mixins.toolbar,
    marginBottom: '3em',
    [theme.breakpoints.down('md')]: {
      marginBottom: '2em',
    },
    [theme.breakpoints.down('xs')]: {
      marginBottom: '1.25em',
    },
  },
  logo: {
    height: '8em',
    [theme.breakpoints.down('md')]: {
      height: '7em',
    },
    [theme.breakpoints.down('xs')]: {
      height: '5.5em',
    },
  },
  logoContainer: {
    padding: 0,
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
  tabContainer: {
    marginLeft: 'auto',
  },
  tab: {
    ...theme.typography.tab,
    minWidth: 10,
    marginLeft: '25px',
  },
  button: {
    ...theme.typography.estimate,
    borderRadius: '50px',
    marginLeft: '50px',
    marginRight: '25px',
    height: '45px',
    '&:hover': {
      backgroundColor: theme.palette.secondary.light,
    },
  },
  menu: {
    backgroundColor: theme.palette.common.blue,
    color: 'white',
    borderRadius: '0px',
  },
  menuItem: {
    ...theme.typography.tab,
    opacity: 0.7,
    '&:hover': {
      opacity: 1,
    },
  },
}));

export default function Header() {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openMenu, setOpenMenu] = useState(false);

  const handleChange = (e, newValue) => {
    setValue(newValue);
  };

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
    setOpenMenu(true);
  };

  const handleMenuItemClick = (e, i) => {
    setAnchorEl(null);
    setOpenMenu(false);
    setSelectedIndex(i);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setOpenMenu(false);
  };

  const menuOptions = [
    { name: 'Services',
      link: '/services',
      activeIndex: 1,
      selectedIndex: 0 },
    {
      name: 'Custom Software Development',
      link: '/customsoftware',
      activeIndex: 1,
      selectedIndex: 1,
    },
    {
      name: 'iOS/Android App Development',
      link: '/mobileapps',
      activeIndex: 1,
      selectedIndex: 2,
    },
    {
      name: 'Website Development',
      link: '/websites',
      activeIndex: 1,
      selectedIndex: 3,
    },
  ];

  const routes = [
    { name: 'Home',
      link: '/',
      activeIndex: 0 },
    {
      name: 'Services',
      link: '/services',
      activeIndex: 1,
      ariaOwns: anchorEl ? 'simple-menu' : undefined,
      ariaPopup: anchorEl ? 'true' : undefined,
      mouseOver: (event) => handleClick(event),
    },
    { name: 'The Revolution', link: '/revolution', activeIndex: 2 },
    { name: 'About Us', link: '/about', activeIndex: 3 },
    { name: 'Contact Us', link: '/contact', activeIndex: 4 },
  ];

  useEffect(() => {
    [...menuOptions, ...routes].forEach((route) => {
      console.log(route);
      // switch (window.location.pathname) {
      // case `${route.link}`:
      //   if (value !== route.activeIndex) {
      //     setValue(route.activeIndex);
      //     if (
      //       route.selectedIndex
      //         && route.selectedIndex !== selectedIndex
      //     ) {
      //       setSelectedIndex(route.selectedIndex);
      //     }
      //   }
      //   break;
      // case '/estimate':
      //   setValue(5);
      //   break;
      // default:
      //   break;
      // }
    });
  }, [value, menuOptions, selectedIndex, routes]);

  const tabs = (
    <>
      <Tabs
        value={ value }
        onChange={ handleChange }
        className={ classes.tabContainer }
        indicatorColor="primary"
      >
        {routes.map((route, index) => (
          <Tab
            key={ `${route}${index}` }
            className={ classes.tab }
            component={ Link }
            to={ route.link }
            label={ route.name }
            aria-owns={ route.ariaOwns }
            aria-haspopup={ route.ariaPopup }
            onMouseOver={ route.mouseOver }
          />
        ))}
      </Tabs>
      <Button
        component={ Link }
        to="/estimate"
        variant="contained"
        color="secondary"
        className={ classes.button }
        onClick={ () => setValue(5) }
      >
        Free Estimate
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={ anchorEl }
        open={ openMenu }
        onClose={ handleClose }
        classes={ { paper: classes.menu } }
        MenuListProps={ {
          onMouseLeave: handleClose,
        } }
        elevation={ 0 }
        style={ { zIndex: 1302 } }
        keepMounted
      >
        {menuOptions.map((option, i) => (
          <MenuItem
            key={ `${option}${i}` }
            component={ Link }
            to={ option.link }
            classes={ { root: classes.menuItem } }
            onClick={ (event) => {
              handleMenuItemClick(event, i);
              setValue(1);
              handleClose();
            } }
            selected={ i === selectedIndex && value === 1 }
          >
            {option.name}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
  return (
    <>
      <ElevationScroll>
        <AppBar position="fixed" className={ classes.appbar }>
          <Toolbar disableGutters>
            <Button
              component={ Link }
              to="/"
              disableRipple
              onClick={ () => setValue(0) }
              className={ classes.logoContainer }
            >
              <img
                alt="company logo"
                className={ classes.logo }
                src={ logo }
              />
            </Button>
            {tabs}
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <div className={ classes.toolbarMargin } />
    </>
  );
}
