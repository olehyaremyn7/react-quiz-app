import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import classes from './Drawer.module.scss'
import Backdrop from '../../UI/Backdrop/Backdrop'

class Drawer extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    renderLinks(links) {
        return links.map((link, index) => {
            return this.linksTemplate(link, index)
        })
    }

    linksTemplate(link, index) {
        return (
            <li key={index}>
                <NavLink
                    to={link.to}
                    exact={link.exact}
                    activeClassName={classes.active}
                    onClick={this.closeDrawerHandler}
                >
                    {link.label}
                </NavLink>
            </li>
        )
    }

    closeDrawerHandler = () => {
        this.props.onClose()
    }

    render() {
        const cls = [classes.Drawer]
        const links = [{ to: '/', label: 'List of quizzes', exact: true }]

        if (!this.props.isOpen) {
            cls.push(classes.close)
        }

        if (this.props.isAuthenticated) {
            links.push(
                { to: '/quiz-creator', label: 'Create quiz', exact: false },
                { to: '/logout', label: 'Logout', exact: false }
            )
        } else {
            links.push({ to: '/auth', label: 'Auth', exact: false })
        }

        return (
            <>
                <nav className={cls.join(' ')}>
                    <ul>{this.renderLinks(links)}</ul>
                </nav>
                {this.props.isOpen ? (
                    <Backdrop onClick={this.props.onClose} />
                ) : null}
            </>
        )
    }
}

export default Drawer
