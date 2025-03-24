let companies = [];
let applications = [];

async function fetchData() {
  await fetch('./assets/data/companies.json').then((res) => {
    return res.json();
  }).then((data) => {
    companies = data;
    console.log({ companies, applications });
  });

  await fetch('./assets/data/job-applications.json').then((res) => {
    return res.json();
  }).then((data) => {
    applications = data;
    console.log({ companies, applications });
  });
}

const tableBody = document.getElementById("application-table-body");

/**
 * @param {Array} jobApplications
 */
function displayJobApplicationsData(jobApplications) {
  tableBody.innerHTML = jobApplications.map(({ id, company_id, job_title, status, tracked_at, job_link_url }) => {
    const company = companies.find(c => c.id === company_id);

    return `
      <tr>
        <td>
          <p class="text-center">
            ${id}
          </p>
        </td>
        <td class="text-left">
          <a href="./companies.html?id=${company_id}" class="link">
            ${company.name}
          </a>
        </td>
        <td>
          <a href="./application-details.html?id=${id}" class="link">
            ${job_title}
          </a>
        </td>
        <td>
          <div class="status-badge status-badge-${status || "listed"}">
            ${status}
          </div>
        </td>
        <td title="${moment(tracked_at).format("DD, MMM YYYY [at] HH:mm:ss")}" class="moment-from-now">
          ${moment(tracked_at).fromNow()}
        </td>
        <td>
          <button class="btn" style="margin: auto">
            <i class="icon" data-lucide="ellipsis"></i>
          </button>
        </td>
      </tr>
    `;
  }).join("");
}

fetchData().then(() => {
  displayJobApplicationsData(applications);
  lucide.createIcons();
});

