import React from 'react';
import { Link } from 'react-router-dom';
import RevLogo from '../../assets/rev-logo.png';
import { IState } from '../../reducers';
import { connect } from 'react-redux';
import User from '../../models/user';

interface INavProps {
  user?: User
}

export class NavComponent extends React.Component<INavProps> {

  getReimAdminOption = () => {
    let curent = this.props.user && this.props.user.roleID.id;
    if (curent === 1 || curent === 3) {
      return (
        <li className="nav-item active dropdown">
          <div className="nav-link dropdown-toggle pointer" id="examples-dropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Reimbursements</div>
          <div className="dropdown-menu" aria-labelledby="examples-dropdown">
            <div className="dropdown-item"><Link to="/reims" className="unset-anchor nav-link active">All Reimbursements</Link></div>
            <div className="dropdown-item"><Link to="/reims-status" className="unset-anchor nav-link active">Reimbursements by Status</Link></div>
            <div className="dropdown-item"><Link to="/reims-author" className="unset-anchor nav-link active">Reimbursements by Author</Link></div>
            <div className="dropdown-item"><Link to="/reims-type" className="unset-anchor nav-link active">Reimbursements by Type</Link></div>
            <div className="dropdown-item"><Link to="/reims-curent-user" className="unset-anchor nav-link active">Your Reimbursements</Link></div>
            <div className="dropdown-item"><Link to="/reims" className="unset-anchor nav-link active">Request Reimbursements</Link></div>
          </div>
        </li>
      )

    }
    else {
      return (
        <li className="nav-item active dropdown">
          <div className="nav-link dropdown-toggle pointer" id="examples-dropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Reimbursements</div>
          <div className="dropdown-menu" aria-labelledby="examples-dropdown">
            <div className="dropdown-item"><Link to="/reims-curent-user" className="unset-anchor nav-link active">Your Reimbursements</Link></div>
            <div className="dropdown-item"><Link to="/reims" className="unset-anchor nav-link active">Request Reimbursements</Link></div>
          </div>
        </li>
      )
    }
  }

  render() {
    return (
      <nav className="navbar navbar-toggleable-md navbar-expand-lg navbar-light bg-light display-front nav-pad">
        <div className="navbar-header c-pointer shift-left">
          <Link to="/home" className="unset-anchor">
            <img className="img-adjust-position rev-logo" src={RevLogo} alt="revature" />
          </Link>
          <div className="nav-item active">
            {this.props.user && this.props.user.roleID.role}:{this.props.user && this.props.user.id}
          </div>
        </div>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample04" aria-controls="navbarsExample04" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarsExample04">
          <ul className="navbar-nav ml-auto margin-nav">
            <li className="nav-item active">
              <Link to="/home" className="unset-anchor nav-link">Home</Link>
            </li>
            <li className="nav-item active">
              <Link to="/user" className="unset-anchor nav-link">Users</Link>
            </li>
            {this.getReimAdminOption()}
            <li className="nav-item active dropdown">
              <div className="nav-link dropdown-toggle pointer" id="examples-dropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Sign</div>
              <div className="dropdown-menu" aria-labelledby="examples-dropdown">
                <Link to="/sign-in" className="unset-anchor nav-link">Sign In</Link>
                <Link to="/sign-in" className="unset-anchor nav-link">Sign Out</Link>
              </div>
            </li>
            <li className="nav-item active">
              {this.props.user && this.props.user.roleID.role}:{this.props.user && this.props.user.username}
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = (state: IState) => ({
  user: state.auth.currentUser
})

export default connect(mapStateToProps)(NavComponent);


