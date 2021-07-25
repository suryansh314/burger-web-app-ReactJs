import React,{useState} from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/Auxilliary';
import classes from './Layout.css'
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

const Layout = props => {
    const [sideDrawerVisible, setSideDrawerVisible] = useState(false);

    const sideDrawerClosedHandler = () => {
        setSideDrawerVisible(false);
    }

    const sideDrawerToggleHandler = () => {
        setSideDrawerVisible(!sideDrawerVisible);
    }

        return (
            <Aux>
                <Toolbar 
                  isAuth={props.isAuthenticated}
                  drawerToggleClicked={sideDrawerToggleHandler}/>
                <SideDrawer 
                  isAuth={props.isAuthenticated}
                  open={sideDrawerVisible}
                  closed={sideDrawerClosedHandler} />
               <div>Toolbar, SideDrawer, Backdrop</div>
               <main className={classes.Content}>
                   {props.children}
               </main>
            </Aux>
        )
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    };
};

export default connect(mapStateToProps)(Layout);