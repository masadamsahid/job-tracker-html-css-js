let urlParams = new URLSearchParams(window.location.search);
let selectedCompanyId = Number(urlParams.get('id')) || 1;
// console.log(selectedCompanyId);

momentShorted.locale('en', {
  relativeTime: {
    future: 'in %s',
    past: '%s',
    s: '1s',
    ss: '%ss',
    m: '1m',
    mm: '%dm',
    h: '1h',
    hh: '%dh',
    d: '1d',
    dd: '%dd',
    M: '1m',
    MM: '%dm',
    y: '1y',
    yy: '%dy'
  }
});

const companyCardList = document.getElementById('company-card-list');

let companies = [];
let jobApplications = [];
let selectedCompany;

async function fetchCompanies() {
  companies = await fetch('/assets/data/companies.json').then(response => response.json() || []);
}

async function fetchJobApplications() {
  jobApplications = await fetch('/assets/data/job-applications.json').then(response => response.json()) || [];
}

async function fetchData(params) {
  await fetchCompanies();
  await fetchJobApplications();
}

function displaySelectedCompany(company) {
  const companyDetails = document.getElementById('company-details');
  const drawerContent = document.getElementById('drawer-content');

  let jobApplicationsToTheSelectedCompany = [];

  if (selectedCompanyId && selectedCompanyId >= 1) {
    jobApplicationsToTheSelectedCompany = jobApplications.filter(job => job.company_id === selectedCompanyId).sort((a, b) => {
      return new Date(b.tracked_at) - new Date(a.tracked_at);
    });
  }

  console.log(jobApplicationsToTheSelectedCompany);

  const companyDetailHTMLStr = `
    <div class="content-header">
      <img src="${company.img_url}" alt="" class="company-logo">
      <div class="company-info">
        <h2 class="company-name">
          ${company.name}
        </h2>
        <p>
          ${company.category} • ${company.location}
        </p>
      </div>
      
      <div class="actions">
        <button class="btn">
          <i class="icon" data-lucide="ellipsis"></i>
        </button>
      </div>
    </div>
    <div class="content-body">
      <div class="card">
        ${company.desc}
      </div>

      <div class="card">
        <h3 class="card-title">
          Your Job Applications to ${company.name}
        </h3>
        <div id="your-applications-to-company-table-container">
          <table class="table">
            
            <tbody id="your-applications-to-company-table-body">
              ${jobApplicationsToTheSelectedCompany.map(ja => `
                <tr>
                  <td style="min-width: 150px">
                    <a href="./application-details.html?id=${ja.id}" class="link">
                      ${ja.job_title}
                    </a>
                  </td>
                  <td style="min-width: 100px">
                    <div class="status-badge status-badge-${ja.status}">
                      ${ja.status}
                    </div>
                  </td>
                  <td title="${moment(ja.tracked_at).format("lll")}" class="moment-from-now" style="min-width: 80px">
                    ${moment(ja.tracked_at).fromNow()}
                  </td>
                  <td>
                    <button class="btn" style="margin: auto">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="ellipsis" class="lucide lucide-ellipsis icon">
                        <circle cx="12" cy="12" r="1"></circle>
                        <circle cx="19" cy="12" r="1"></circle>
                        <circle cx="5" cy="12" r="1"></circle>
                      </svg>
                    </button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
  companyDetails.innerHTML = companyDetailHTMLStr;
  drawerContent.innerHTML = companyDetailHTMLStr;
  lucide.createIcons();
}

function selectCompany(company_id) {
  selectedCompany = companies.find(company => company.id === company_id);

  // check if viewport width more than 640px
  if (window.innerWidth < 640) {
    openDrawer();
  }

  displaySelectedCompany(selectedCompany);
}

async function displayData(companies) {
  companies.forEach(company => {
    const companyCard = document.createElement('div');
    companyCard.id = `company-${company.id}`;
    companyCard.classList.add('company-card');
    
    if(company.id === selectedCompanyId) {
      companyCard.classList.add('active');
    }

    companyCard.innerHTML = `
        <img src="${company.img_url}" alt="company">
        <div class="company-info">
          <h3 class="company-name">
            ${company.name}
          </h3>
          <p class="company-category">
          ${company.category}
          </p>
          <p class="company-location">
            ${company.location}
          </p>
        </div>
        <p class="date">
          ${momentShorted(company.created_at).fromNow()}
        </p>
    `;

    companyCard.addEventListener('click', (e) => {
      // selectCompany(company.id);
      history.replaceState({}, '', `?id=${company.id}`);
      window.dispatchEvent(new Event('urlChange'));
    });

    companyCardList.appendChild(companyCard);
  });
}

fetchData().then(() => {
  displayData(companies);
  selectCompany(selectedCompanyId);
});

window.addEventListener('urlChange', (e) => {
  document.getElementById(`company-${selectedCompanyId}`).classList.remove('active');

  urlParams = new URLSearchParams(window.location.search);
  selectedCompanyId = Number(urlParams.get('id'));
  // console.log({selectedCompanyId});

  selectCompany(selectedCompanyId);
  console.log({ selectedCompany });

  document.getElementById(`company-${selectedCompanyId}`).classList.add('active');
});