import React from 'react';
import { render } from 'react-dom';
import { slideDown, slideUp } from './anim.js';
import './style.css';


function capitalize(str) {
  return str.split(' ').map(s => {
    return s.charAt(0).toUpperCase() + s.substr(1);
  }).join(' ');
}


class UserTableRow extends React.Component {
  state = { expanded: true }

  toggleExpander = (e) => {
    if (e.target.type === 'checkbox') return;

    if (!this.state.expanded) {
      this.setState(
        { expanded: true },
        () => {
          if (this.refs.expanderBody) {
            slideDown(this.refs.expanderBody);
          }
        }
      );
    } else {
      slideUp(this.refs.expanderBody, {
        onComplete: () => { this.setState({ expanded: false }); }
      });
    }
  }

  render() {
    const { user } = this.props;
    return [
      <tr key="main" onClick={this.toggleExpander}>
        <td><img className="uk-preserve-width " src={user.picture.thumbnail} width={48} alt="avatar" /></td>
        <td>{capitalize("Saint Mary Street Pump Station")}</td>        
      </tr>,
      this.state.expanded && (
        <tr className="expandable" key="tr-expander">
          <td className="uk-background-muted" colSpan={6}>
            <div ref="expanderBody" className="inner uk-grid">
              <div className="uk-width-1-4 uk-text-center">
                <img className="uk-preserve-width " src={user.picture.large} alt="avatar" />
              </div>
              <div className="uk-width-3-4">
                <h3>{capitalize(user.name.first + ' ' + user.name.last)}</h3>
				<table>
					<tr>
						<td>Model Number</td>
						<td>{user.location.model_number}</td>
					</tr>
					<tr>
						<td>Serial Number</td>
						<td>{user.location.serial_number}</td>
					</tr>
					<tr>
						<td>Description</td>
						<td>{user.location.description}</td>
						<tr>
							<td></td>
							<td></td>
							<td></td>
							<td><img className="uk-preserve-width" src={user.location.tick} width={18} alt="tick" /></td>
							<td>{user.location.status}</td>
							
						</tr>
					</tr>
					<tr>
						<td>Location</td>
						<td>{user.location.locations}</td>
						
						<tr>
							<td></td>
							<td></td>
							<td></td>
							<td><img className="uk-preserve-width" src={user.location.bell} width={18} alt="bell" /></td>
							<td><a href={user.location.bell}>Alerts</a> <br></br>Weekly Total<br></br></td>							
						</tr>
					</tr>
					
				</table>
              
              </div>
            </div>
          </td>
        </tr>
      )
    ];
  }
}



class App extends React.Component {
  state = { users: null }

  response = {
	"results": [
	  {
		
		"name": {
		  "first": "Saint Mary Street Pump Station - ",
		  "last": "CNTRF104M82432"
		},
		"location": {
		  "model_number": "CNTRF10",
		  "serial_number": "CNTRF104M",
		  "description": "Pump for station 8675309",
		  "locations": "Needham, MA",
		  "bell":"https://i.ibb.co/M97Q78R/bell1.png",
		  "tick":"https://i.ibb.co/4tGjsGP/tick2.png",
		  "status":"Running"
		},
		"picture": {
			"large": "https://i.ibb.co/CBr2Pkk/1.png",
			"medium": "https://i.ibb.co/CBr2Pkk/1.png",
			"thumbnail": "https://i.ibb.co/CBr2Pkk/1.png"
		  },
		
	  },
	  {
		
		"name": {
		  "first": "Saint Mary Street Pump Station - ",
		  "last": "RTRGRM09177XA432"
		},
		"location": {
			"model_number": "RM091",
			"serial_number": "RTRGRM091",
			"description": "Pump for station 8675309",
			"locations": "Needham, MA",
			"bell":"https://i.ibb.co/M97Q78R/bell1.png",
			"tick":"https://i.ibb.co/4tGjsGP/tick2.png",
			"status":"Running"
		},
		"picture": {
		  "large": "https://i.ibb.co/qFdSPZF/2.png",
		  "medium": "https://i.ibb.co/qFdSPZF/2.png",
		  "thumbnail": "https://i.ibb.co/qFdSPZF/2.png"
		}
	  },
	  {
	
		"name": {
		  "first": "Saint Mary Pump Station",
		  "last": "SBMRSBW1150X890083"
		},
		"location": {
			"model_number": "BW1150",
			"serial_number": "SBMRSBW11",
			"description": "Pump for station 8675309",
			"locations": "Needham, MA",
			"bell":"https://i.ibb.co/M97Q78R/bell1.png",
			"tick":"https://i.ibb.co/4tGjsGP/tick2.png",
			"status":"Running"
		},
		"picture": {
		  "large": "https://i.ibb.co/RSQPTtm/3.png",
		  "medium": "https://i.ibb.co/RSQPTtm/3.png",
		  "thumbnail": "https://i.ibb.co/RSQPTtm/3.png"
		}
	  }
	],
	
  }

  componentDidMount() {
	// Can be written a fetch function to consume an API.
	  this.setState({users: this.response.results})
  }

  render() {
    const { users } = this.state;
    const isLoading = users === null;
    return (
      <main>
        <div className="table-container">
          <div className="">
            <table className="uk-table uk-table-hover uk-table-middle uk-table-divider">
              <thead>
				<tr> 
                  <th className=" bg" />
                  <th className=" bg">Pumps Overview</th>
                  <th className = "bg"></th>
                  <th className = "bg"></th>
				  <th className = "bg"></th>
				 
                </tr> 
              </thead>
              <tbody>
                {isLoading
                  ? <tr><td colSpan={6} className="uk-text-center"><em className="uk-text-muted">Loading...</em></td></tr>
                  : users.map((user, index) =>
                      <UserTableRow key={index} index={index + 1} user={user}/>
                    )
                }
              </tbody>
            </table>
          </div>
        </div>
      </main>
    );
  }
}

render(<App />, document.getElementById('root'));
