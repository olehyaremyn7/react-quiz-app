import React, { Component } from 'react'
import { connect } from 'react-redux'
import MenuToggle from '../../../shared/components/Navigatioon/MenuToggle/MenuToggle'
import Drawer from '../../../shared/components/Navigatioon/Drawer/Drawer'
import classes from './Layout.module.scss'

class Layout extends Component {
    constructor(props) {
        super(props)
        this.state = {
            menu: false,
        }
    }

    toggleMenuHandler = () => {
        this.setState({
            menu: !this.state.menu,
        })
    }

    menuCloseHandler = () => {
        this.setState({
            menu: false,
        })
    }

    render() {
        return (
            <div className={classes.Layout}>
                <Drawer
                    isOpen={this.state.menu}
                    onClose={this.menuCloseHandler}
                    isAuthenticated={this.props.isAuthenticated}
                />

                <MenuToggle
                    onToggle={this.toggleMenuHandler}
                    isOpen={this.state.menu}
                />

                <main>{this.props.children}</main>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        isAuthenticated: !!state.auth.token,
    }
}

export default connect(mapStateToProps)(Layout)
