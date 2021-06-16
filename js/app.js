const cardWrapper = document.querySelector("#card-wrapper");
const yearsBtn = document.querySelectorAll(".years");
const launch = document.querySelectorAll(".launch");
const landing = document.querySelectorAll(".landing");
// fetch data from data file
fetch("/data.json")
  .then(function (response) {
    return response.json();
  })
  .then(function (json) {
    let missions = json;
    spacex(missions);
    filterByYears(missions);
  })
  .catch(function (err) {
    console.log("Fetch problem: " + err.message);
  });

// show all missions

function spacex(missions) {
  let display = missions.map((mission) => {
    return `
    <div class="card">
    <div class="image-wrapper">
        <img src=${mission.links.mission_patch} alt="" srcset="">
    </div>
    <h2> ${mission.mission_name} # ${mission.flight_number}</h2>
    <div>
        <ul>
            <b>Misson Ids:</b>
            ${mission.mission_id.map((id) => {
              return `<li>${id}</li>`;
            })}
          
        </ul>
        <p><b>Launch Year: </b>${mission.launch_year}</p>
        <p><b>Successful Launch:</b> ${mission.launch_success}</p>
        <p><b>Successful Landing:</b> ${mission.rocket.first_stage.cores.map(
          (land) => {
            console.log(land.land_success);
            return `<span>${
              land.land_success === null || "" ? "" : land.land_success
            }</span>`;
          }
        )} </p>
    </div>
</div>
        `;
  });
  cardWrapper.innerHTML = display.join(" ");
}
//filter by year
function filterByYears(missions) {
  yearsBtn.forEach((button) => {
    button.addEventListener("click", (event) => {
      const launchYear = event.currentTarget.dataset.launch_year;
      const launchYears = missions.map((mission) => {
        if (launchYear === mission.launch_year) {
          return `
          <div class="card">
          <div class="image-wrapper">
              <img src=${mission.links.mission_patch} alt="" srcset="">
          </div>
          <h2> ${mission.mission_name} # ${mission.flight_number}</h2>
          <div>
              <ul>
                  <b>Misson Ids:</b>
                  ${mission.mission_id.map((id) => {
                    return `<li>${id}</li>`;
                  })}
                
              </ul>
              <p><b>Launch Year: </b>${mission.launch_year}</p>
              <p><b>Successful Launch:</b> ${mission.launch_success}</p>
              <p><b>Successful Landing:</b> ${mission.rocket.first_stage.cores.map(
                (land) => {
                  console.log(land.land_success);
                  return `<span>${
                    land.land_success === null || "" ? "" : land.land_success
                  }</span>`;
                }
              )} </p>
          </div>
      </div>
              `;
        }
      });
      cardWrapper.innerHTML = launchYears.join(" ");
    });
  });
}

// function successfulByLaunch(missions) {
//   launch.forEach((btn) => {
//     btn.addEventListener("click", (e) => {
//       const launchSuccessful = e.currentTarget.dataset.launch_success;

//       const launchSuccessfully = missions.filter((mission) => {
//         console.log(mission.launch_success);
//         if (launchSuccessful === mission.launch_success) {
//           return `
//           <div class="card">
//           <div class="image-wrapper">
//               <img src=${mission.links.mission_patch} alt="" srcset="">
//           </div>
//           <h2> ${mission.mission_name} # ${mission.flight_number}</h2>
//           <div>
//               <ul>
//                   <b>Misson Ids:</b>
//                   <li> ${mission.mission_id}</li>
//               </ul>
//               <p><b>Launch Year: </b>${mission.launch_year}</p>
//               <p><b>Successful Launch:</b> ${mission.launch_success}</p>
//               <p><b>Successful Landing:</b> ${mission.landing_intent} </p>
//           </div>
//       </div>
//               `;
//         }
//       });
//       console.log(launchSuccessfully);
//       cardWrapper.innerHTML = launchSuccessfully.join("");
//     });
//   });
// }
