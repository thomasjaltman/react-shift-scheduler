var React = require("react");
var helpers = require("../utils/helpers");

var ManagerSchedulesCreate = React.createClass({

    getInitialState: function() {
      return {
        firstName:"",
        lastName:"",
        monday:"",
        tuesday:"",
        wednesday:"",
        thursday:"",
        friday:"",
        saturday:"",
        sunday:"",
        selectedEmpSchedule:"",
        empSchedules: [],
      };
    },

    componentDidMount: function() {
        helpers.getEmpSchedules().then(function(response) {
          if (response !== this.state.empSchedules) {
            this.setState({ empSchedules: response.data });
          }
        }.bind(this));
    },

    handleUserChange: function(index, event) {
        let updatedEmpSchedules = this.state.empSchedules.map((empSchedule, i) => {
            if(index === i){
                empSchedule[event.target.name] = event.target.value;
                this.state.selectedEmpSchedule = empSchedule;
            }
            return empSchedule;
        });
        this.setState({ empSchedules: updatedEmpSchedules});
    },

    handleUpdateEmpSchedule: function(event) {
        event.preventDefault();
        helpers.updateEmpSchedule(this.state.selectedEmpSchedule).then(function(response) {
        }.bind(this));
    },

    render: function() {
        return (

                <div className="row">
                    <div className="col m12" >
                        <div className="section">
                            <h5>Schedule Editor</h5>

                            <table className="highlight">
                                <thead>
                                    <tr>
                                        <th data-field="name">Name</th>
                                        <th data-field="name">Mon</th>
                                        <th data-field="name">Tues</th>
                                        <th data-field="name">Wed</th>
                                        <th data-field="name">Thurs</th>
                                        <th data-field="name">Fri</th>
                                        <th data-field="name">Sat</th>
                                        <th data-field="name">Sun</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.empSchedules.map(function(schedules, i) {
                                        return (
                                            <tr key={i}>
                                                <td className="fullName">
                                                {schedules.firstName} {schedules.lastName}
                                                </td>
                                                <td className="schedule">
                                                    <input
                                                    type="text"
                                                    value={schedules.monday}
                                                    name="monday"
                                                    onChange={this.handleUserChange.bind(this, i)}/>
                                                </td>
                                                <td>
                                                    <input
                                                    type="text"
                                                    value={schedules.tuesday}
                                                    name="tuesday"
                                                    onChange={this.handleUserChange.bind(this, i)}/>
                                                </td>
                                                <td>
                                                    <input
                                                    type="text"
                                                    value={schedules.wednesday}
                                                    name="wednesday"
                                                    onChange={this.handleUserChange.bind(this, i)}/>
                                                </td>
                                                <td>
                                                    <input
                                                    type="text"
                                                    value={schedules.thursday}
                                                    name="thursday"
                                                    onChange={this.handleUserChange.bind(this, i)}/>
                                                </td>
                                                <td>
                                                    <input
                                                    type="text"
                                                    value={schedules.friday}
                                                    name="friday"
                                                    onChange={this.handleUserChange.bind(this, i)}/>
                                                </td>
                                                <td>
                                                    <input
                                                    type="text"
                                                    value={schedules.saturday}
                                                    name="saturday"
                                                    onChange={this.handleUserChange.bind(this, i)}/>
                                                </td>
                                                <td>
                                                    <input
                                                    type="text"
                                                    value={schedules.sunday}
                                                    name="sunday"
                                                    onChange={this.handleUserChange.bind(this, i)}/>
                                                </td>
                                                <td>
                                                    <button onClick={this.handleUpdateEmpSchedule} className="btn btn-small waves-effect waves-light green accent-3">Add</button>
                                                </td>
                                            </tr>
                                        );
                                    }, this)}
                                </tbody>
                            </table>
                          </div>
                        </div>
                    </div>

        );
    }
});

module.exports = ManagerSchedulesCreate;
