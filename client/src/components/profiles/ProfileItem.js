// import React, { Component } from "react";
// import PropTypes from "prop-types";
// import Moment from "react-moment";

// //import isEmpty from '../../validation/is-empty';

// class ProfileItem extends Component {
//   render() {
//     const { profile } = this.props;
//     const onlineservices = profile.onlineservices
//       .slice(0, 4)
//       .map(onservices => (
//         <tr key={onservices._id}>
//           <td>
//             <Moment format="YYYY/MM/DD">{onservices.date}</Moment>
//           </td>
//           <td>{onservices.description}</td>
//           <td>{onservices.onlinecategory}</td>
//           <td>{onservices.cost}</td>
//         </tr>
//       ));
//     const logistics = profile.logistics.slice(0, 4).map(logts => (
//       <tr key={logts._id}>
//         <td>
//           <Moment format="YYYY/MM/DD">{logts.date}</Moment>
//         </td>
//         <td>{logts.description}</td>
//         <td>{logts.logisticscategory}</td>
//         <td>{logts.cost}</td>
//       </tr>
//     ));
//     const travelling = profile.travelling.slice(0, 4).map(travg => (
//       <tr key={travg._id}>
//         <td>
//           <Moment format="YYYY/MM/DD">{travg.date}</Moment>
//         </td>
//         <td>{travg.description}</td>
//         <td>{travg.travellingcategory}</td>
//         <td>{travg.cost}</td>
//       </tr>
//     ));

//     return (
//       <div className="card card-body bg-light mb-3">
//         <div className="row">
//           <div className="col-lg-6 col-md-4 col-8">
//             <h3>{profile.user.name}</h3>

//             <div>
//               <table className="table">
//                 <thead>
//                   <tr>
//                     <th>Date</th>
//                     <th>Description</th>
//                     <th>Category</th>
//                     <th>Cost</th>
//                     <th />
//                   </tr>
//                   {onlineservices}
//                   {logistics}
//                   {travelling}
//                 </thead>
//               </table>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }
// }
// ProfileItem.propTypes = {
//   profile: PropTypes.object.isRequired
// };

// export default ProfileItem;


import React, { Component } from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";

//import isEmpty from '../../validation/is-empty';

class ProfileItem extends Component {
  render() {
    const { profile } = this.props;
    const onlineservices = profile.onlineservices
      .slice(0, 4)
      .map(onservices => (
        <tr key={onservices._id}>
          <td>
            <Moment format="YYYY/MM/DD">{onservices.date}</Moment>
          </td>
          <td>{onservices.description}</td>
          <td>{onservices.onlinecategory}</td>
          <td>{onservices.cost}</td>
        </tr>
      ));
    const logistics = profile.logistics.slice(0, 4).map(logts => (
      <tr key={logts._id}>
        <td>
          <Moment format="YYYY/MM/DD">{logts.date}</Moment>
        </td>
        <td>{logts.description}</td>
        <td>{logts.logisticscategory}</td>
        <td>{logts.cost}</td>
      </tr>
    ));
    const travelling = profile.travelling.slice(0, 4).map(travg => (
      <tr key={travg._id}>
        <td>
          <Moment format="YYYY/MM/DD">{travg.date}</Moment>
        </td>
        <td>{travg.description}</td>
        <td>{travg.travellingcategory}</td>
        <td>{travg.cost}</td>
      </tr>
    ));

    return (
      <div className="card card-body bg-light mb-3">
        <div className="row">
          <div className="col-lg-6 col-md-4 col-8">
            {/* <h3>{profile.user.name}</h3> */}

            <div>
              <table className="table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Description</th>
                    <th>Category</th>
                    <th>Cost</th>
                    <th />
                  </tr>
                  {onlineservices}
                  {logistics}
                  {travelling}
                </thead>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileItem;
