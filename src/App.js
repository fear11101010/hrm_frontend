import './App.css';
import Navbar from "./layout/navbar/navbar";
import Navbar1 from "./layout/navbar/navbar1";
function App() {
    return (
        <div>
            <Navbar/>
            <Navbar1/>
            <div className="main-content">
                <div className="header">
                    <div className="container-fluid">


                        <div className="header-body">
                            <div className="row align-items-end">
                                <div className="col">


                                    <h6 className="header-pretitle">
                                        Overview
                                    </h6>


                                    <h1 className="header-title">
                                        Dashboard
                                    </h1>

                                </div>
                                <div className="col-auto">


                                    <a href="#!" className="btn btn-primary lift">
                                        Create Report
                                    </a>

                                </div>
                            </div>

                        </div>


                    </div>
                </div>


                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12 col-lg-6 col-xl">


                            <div className="card">
                                <div className="card-body">
                                    <div className="row align-items-center gx-0">
                                        <div className="col">


                                            <h6 className="text-uppercase text-muted mb-2">
                                                Value
                                            </h6>


                                            <span className="h2 mb-0">
                      $24,500
                    </span>


                                            <span className="badge bg-success-soft mt-n1">
                      +3.5%
                    </span>
                                        </div>
                                        <div className="col-auto">


                                            <span className="h2 fe fe-dollar-sign text-muted mb-0"></span>

                                        </div>
                                    </div>

                                </div>
                            </div>

                        </div>
                        <div className="col-12 col-lg-6 col-xl">


                            <div className="card">
                                <div className="card-body">
                                    <div className="row align-items-center gx-0">
                                        <div className="col">


                                            <h6 className="text-uppercase text-muted mb-2">
                                                Total hours
                                            </h6>


                                            <span className="h2 mb-0">
                      763.5
                    </span>

                                        </div>
                                        <div className="col-auto">


                                            <span className="h2 fe fe-briefcase text-muted mb-0"></span>

                                        </div>
                                    </div>

                                </div>
                            </div>

                        </div>
                        <div className="col-12 col-lg-6 col-xl">


                            <div className="card">
                                <div className="card-body">
                                    <div className="row align-items-center gx-0">
                                        <div className="col">


                                            <h6 className="text-uppercase text-muted mb-2">
                                                Exit %
                                            </h6>


                                            <span className="h2 mb-0">
                      35.5%
                    </span>

                                        </div>
                                        <div className="col-auto">


                                            <div className="chart chart-sparkline">
                                                <canvas className="chart-canvas" id="sparklineChart"></canvas>
                                            </div>

                                        </div>
                                    </div>

                                </div>
                            </div>

                        </div>
                        <div className="col-12 col-lg-6 col-xl">


                            <div className="card">
                                <div className="card-body">
                                    <div className="row align-items-center gx-0">
                                        <div className="col">


                                            <h6 className="text-uppercase text-muted mb-2">
                                                Avg. Time
                                            </h6>


                                            <span className="h2 mb-0">
                      2:37
                    </span>

                                        </div>
                                        <div className="col-auto">


                                            <span className="h2 fe fe-clock text-muted mb-0"></span>

                                        </div>
                                    </div>

                                </div>
                            </div>

                        </div>
                    </div>

                    <div className="row">
                        <div className="col-12 col-xl-8">


                            <div className="card">
                                <div className="card-header">


                                    <h4 className="card-header-title">
                                        Conversions
                                    </h4>


                                    <span className="text-muted me-3">
                  Last year comparision:
                </span>


                                    <div className="form-check form-switch">
                                        <input className="form-check-input" type="checkbox" id="cardToggle"
                                               data-toggle="chart"
                                               data-target="#conversionsChart" data-trigger="change" data-action="add"
                                               data-dataset="1"/>
                                        <label className="form-check-label" htmlFor="cardToggle"></label>
                                    </div>

                                </div>
                                <div className="card-body">


                                    <div className="chart">
                                        <canvas id="conversionsChart" className="chart-canvas"></canvas>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-xl-4">


                            <div className="card">
                                <div className="card-header">


                                    <h4 className="card-header-title">
                                        Traffic Channels
                                    </h4>


                                    <ul className="nav nav-tabs nav-tabs-sm card-header-tabs">
                                        <li className="nav-item" data-toggle="chart" data-target="#trafficChart"
                                            data-trigger="click"
                                            data-action="toggle" data-dataset="0">
                                            <a href="#" className="nav-link active" data-bs-toggle="tab">
                                                All
                                            </a>
                                        </li>
                                        <li className="nav-item" data-toggle="chart" data-target="#trafficChart"
                                            data-trigger="click"
                                            data-action="toggle" data-dataset="1">
                                            <a href="#" className="nav-link" data-bs-toggle="tab">
                                                Direct
                                            </a>
                                        </li>
                                    </ul>

                                </div>
                                <div className="card-body">


                                    <div className="chart chart-appended">
                                        <canvas id="trafficChart" className="chart-canvas" data-toggle="legend"
                                                data-target="#trafficChartLegend"></canvas>
                                    </div>


                                    <div id="trafficChartLegend" className="chart-legend"></div>

                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-12 col-xl-4">


                            <div className="card card-fill">
                                <div className="card-header">


                                    <h4 className="card-header-title">
                                        Projects
                                    </h4>


                                    <a href="project-overview.html" className="small">View all</a>

                                </div>
                                <div className="card-body">


                                    <div className="list-group list-group-flush my-n3">
                                        <div className="list-group-item">
                                            <div className="row align-items-center">
                                                <div className="col-auto">


                                                    <a href="project-overview.html" className="avatar avatar-4by3">
                                                        <img src="/img/avatars/projects/project-1.jpg" alt="..."
                                                             className="avatar-img rounded"/>
                                                    </a>

                                                </div>
                                                <div className="col ms-n2">


                                                    <h4 className="mb-1">
                                                        <a href="project-overview.html">Homepage Redesign</a>
                                                    </h4>


                                                    <p className="card-text small text-muted">
                                                        <time dateTime="2018-05-24">Updated 4hr ago</time>
                                                    </p>

                                                </div>
                                                <div className="col-auto">


                                                    <div className="dropdown">
                                                        <a href="#" className="dropdown-ellipses dropdown-toggle"
                                                           role="button"
                                                           data-bs-toggle="dropdown" aria-haspopup="true"
                                                           aria-expanded="false">
                                                            <i className="fe fe-more-vertical"></i>
                                                        </a>
                                                        <div className="dropdown-menu dropdown-menu-end">
                                                            <a href="#!" className="dropdown-item">
                                                                Action
                                                            </a>
                                                            <a href="#!" className="dropdown-item">
                                                                Another action
                                                            </a>
                                                            <a href="#!" className="dropdown-item">
                                                                Something else here
                                                            </a>
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>

                                        </div>
                                        <div className="list-group-item">
                                            <div className="row align-items-center">
                                                <div className="col-auto">


                                                    <a href="project-overview.html" className="avatar avatar-4by3">
                                                        <img src="/img/avatars/projects/project-2.jpg" alt="..."
                                                             className="avatar-img rounded"/>
                                                    </a>

                                                </div>
                                                <div className="col ms-n2">


                                                    <h4 className="mb-1">
                                                        <a href="project-overview.html">Travels & Time</a>
                                                    </h4>


                                                    <p className="card-text small text-muted">
                                                        <time dateTime="2018-05-24">Updated 4hr ago</time>
                                                    </p>

                                                </div>
                                                <div className="col-auto">


                                                    <div className="dropdown">
                                                        <a href="#" className="dropdown-ellipses dropdown-toggle"
                                                           role="button"
                                                           data-bs-toggle="dropdown" aria-haspopup="true"
                                                           aria-expanded="false">
                                                            <i className="fe fe-more-vertical"></i>
                                                        </a>
                                                        <div className="dropdown-menu dropdown-menu-end">
                                                            <a href="#!" className="dropdown-item">
                                                                Action
                                                            </a>
                                                            <a href="#!" className="dropdown-item">
                                                                Another action
                                                            </a>
                                                            <a href="#!" className="dropdown-item">
                                                                Something else here
                                                            </a>
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>

                                        </div>
                                        <div className="list-group-item">
                                            <div className="row align-items-center">
                                                <div className="col-auto">


                                                    <a href="project-overview.html" className="avatar avatar-4by3">
                                                        <img src="/img/avatars/projects/project-3.jpg" alt="..."
                                                             className="avatar-img rounded"/>
                                                    </a>

                                                </div>
                                                <div className="col ms-n2">


                                                    <h4 className="mb-1">
                                                        <a href="project-overview.html">Safari Exploration</a>
                                                    </h4>


                                                    <p className="card-text small text-muted">
                                                        <time dateTime="2018-05-24">Updated 4hr ago</time>
                                                    </p>

                                                </div>
                                                <div className="col-auto">


                                                    <div className="dropdown">
                                                        <a href="#" className="dropdown-ellipses dropdown-toggle"
                                                           role="button"
                                                           data-bs-toggle="dropdown" aria-haspopup="true"
                                                           aria-expanded="false">
                                                            <i className="fe fe-more-vertical"></i>
                                                        </a>
                                                        <div className="dropdown-menu dropdown-menu-end">
                                                            <a href="#!" className="dropdown-item">
                                                                Action
                                                            </a>
                                                            <a href="#!" className="dropdown-item">
                                                                Another action
                                                            </a>
                                                            <a href="#!" className="dropdown-item">
                                                                Something else here
                                                            </a>
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>

                                        </div>
                                        <div className="list-group-item">
                                            <div className="row align-items-center">
                                                <div className="col-auto">


                                                    <a href="project-overview.html" className="avatar avatar-4by3">
                                                        <img src="/img/avatars/projects/project-5.jpg" alt="..."
                                                             className="avatar-img rounded"/>
                                                    </a>

                                                </div>
                                                <div className="col ms-n2">


                                                    <h4 className="mb-1">
                                                        <a href="project-overview.html">Personal Site</a>
                                                    </h4>


                                                    <p className="card-text small text-muted">
                                                        <time dateTime="2018-05-24">Updated 4hr ago</time>
                                                    </p>

                                                </div>
                                                <div className="col-auto">


                                                    <div className="dropdown">
                                                        <a href="#" className="dropdown-ellipses dropdown-toggle"
                                                           role="button"
                                                           data-bs-toggle="dropdown" aria-haspopup="true"
                                                           aria-expanded="false">
                                                            <i className="fe fe-more-vertical"></i>
                                                        </a>
                                                        <div className="dropdown-menu dropdown-menu-end">
                                                            <a href="#!" className="dropdown-item">
                                                                Action
                                                            </a>
                                                            <a href="#!" className="dropdown-item">
                                                                Another action
                                                            </a>
                                                            <a href="#!" className="dropdown-item">
                                                                Something else here
                                                            </a>
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>

                                        </div>
                                    </div>

                                </div>

                            </div>

                        </div>
                        <div className="col-12 col-xl-8">


                            <div className="card">
                                <div className="card-header">


                                    <h4 className="card-header-title">
                                        Sales
                                    </h4>


                                    <ul className="nav nav-tabs nav-tabs-sm card-header-tabs">
                                        <li className="nav-item" data-toggle="chart" data-target="#salesChart"
                                            data-trigger="click"
                                            data-action="toggle" data-dataset="0">
                                            <a className="nav-link active" href="#" data-bs-toggle="tab">
                                                All
                                            </a>
                                        </li>
                                        <li className="nav-item" data-toggle="chart" data-target="#salesChart"
                                            data-trigger="click"
                                            data-action="toggle" data-dataset="1">
                                            <a className="nav-link" href="#" data-bs-toggle="tab">
                                                Direct
                                            </a>
                                        </li>
                                        <li className="nav-item" data-toggle="chart" data-target="#salesChart"
                                            data-trigger="click"
                                            data-action="toggle" data-dataset="2">
                                            <a className="nav-link" href="#" data-bs-toggle="tab">
                                                Organic
                                            </a>
                                        </li>
                                    </ul>

                                </div>
                                <div className="card-body">


                                    <div className="chart">
                                        <canvas id="salesChart" className="chart-canvas"></canvas>
                                    </div>

                                </div>
                            </div>

                        </div>
                    </div>

                    <div className="row">
                        <div className="col-12">


                            <div className="card">
                                <div className="card-header">
                                    <div className="row align-items-center">
                                        <div className="col">


                                            <h4 className="card-header-title">
                                                Goals
                                            </h4>

                                        </div>
                                        <div className="col-auto">


                                            <a href="#!" className="btn btn-sm btn-white">
                                                Export
                                            </a>

                                        </div>
                                    </div>

                                </div>
                                <div className="table-responsive mb-0"
                                     data-list="{&quot;valueNames&quot;: [&quot;goal-project&quot;, &quot;goal-status&quot;, &quot;goal-progress&quot;, &quot;goal-date&quot;]}">
                                    <table className="table table-sm table-nowrap card-table">
                                        <thead>
                                        <tr>
                                            <th>
                                                <a href="#" className="text-muted list-sort" data-sort="goal-project">
                                                    Goal
                                                </a>
                                            </th>
                                            <th>
                                                <a href="#" className="text-muted list-sort" data-sort="goal-status">
                                                    Status
                                                </a>
                                            </th>
                                            <th>
                                                <a href="#" className="text-muted list-sort" data-sort="goal-progress">
                                                    Progress
                                                </a>
                                            </th>
                                            <th>
                                                <a href="#" className="text-muted list-sort" data-sort="goal-date">
                                                    Due date
                                                </a>
                                            </th>
                                            <th className="text-end">
                                                Team
                                            </th>
                                            <th></th>
                                        </tr>
                                        </thead>
                                        <tbody className="list">
                                        <tr>
                                            <td className="goal-project">
                                                Update the API
                                            </td>
                                            <td className="goal-status">
                                                <span className="text-warning">●</span> In progress
                                            </td>
                                            <td className="goal-progress">
                                                55%
                                            </td>
                                            <td className="goal-date">
                                                <time dateTime="2018-10-24">07/24/18</time>
                                            </td>
                                            <td className="text-end">
                                                <div className="avatar-group">
                                                    <a href="#" className="avatar avatar-xs" data-bs-toggle="tooltip"
                                                       title="Dianna Smiley">
                                                        <img src="/img/avatars/profiles/avatar-1.jpg"
                                                             className="avatar-img rounded-circle"
                                                             alt="..."/>
                                                    </a>
                                                    <a href="profile-posts.html" className="avatar avatar-xs"
                                                       data-bs-toggle="tooltip"
                                                       title="Ab Hadley">
                                                        <img src="/img/avatars/profiles/avatar-2.jpg"
                                                             className="avatar-img rounded-circle"
                                                             alt="..."/>
                                                    </a>
                                                    <a href="profile-posts.html" className="avatar avatar-xs"
                                                       data-bs-toggle="tooltip"
                                                       title="Adolfo Hess">
                                                        <img src="/img/avatars/profiles/avatar-3.jpg"
                                                             className="avatar-img rounded-circle"
                                                             alt="..."/>
                                                    </a>
                                                    <a href="profile-posts.html" className="avatar avatar-xs"
                                                       data-bs-toggle="tooltip"
                                                       title="Daniela Dewitt">
                                                        <img src="/img/avatars/profiles/avatar-4.jpg"
                                                             className="avatar-img rounded-circle"
                                                             alt="..."/>
                                                    </a>
                                                </div>
                                            </td>
                                            <td className="text-end">
                                                <div className="dropdown">
                                                    <a href="#" className="dropdown-ellipses dropdown-toggle"
                                                       role="button"
                                                       data-bs-toggle="dropdown" aria-haspopup="true"
                                                       aria-expanded="false">
                                                        <i className="fe fe-more-vertical"></i>
                                                    </a>
                                                    <div className="dropdown-menu dropdown-menu-end">
                                                        <a href="#!" className="dropdown-item">
                                                            Action
                                                        </a>
                                                        <a href="#!" className="dropdown-item">
                                                            Another action
                                                        </a>
                                                        <a href="#!" className="dropdown-item">
                                                            Something else here
                                                        </a>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="goal-project">
                                                Release v1.2-Beta
                                            </td>
                                            <td className="goal-status">
                                                <span className="text-warning">●</span> In progress
                                            </td>
                                            <td className="goal-progress">
                                                25%
                                            </td>
                                            <td className="goal-date">
                                                <time dateTime="2018-10-24">08/26/18</time>
                                            </td>
                                            <td className="text-end">
                                                <div className="avatar-group justify-content-end">
                                                    <a href="#!" className="avatar avatar-xs" data-bs-toggle="tooltip"
                                                       title="Dianna Smiley">
                                                        <img src="/img/avatars/profiles/avatar-1.jpg"
                                                             className="avatar-img rounded-circle"
                                                             alt="..."/>
                                                    </a>
                                                    <a href="#!" className="avatar avatar-xs" data-bs-toggle="tooltip"
                                                       title="Ab Hadley">
                                                        <img src="/img/avatars/profiles/avatar-2.jpg"
                                                             className="avatar-img rounded-circle"
                                                             alt="..."/>
                                                    </a>
                                                    <a href="#!" className="avatar avatar-xs" data-bs-toggle="tooltip"
                                                       title="Adolfo Hess">
                                                        <img src="/img/avatars/profiles/avatar-3.jpg"
                                                             className="avatar-img rounded-circle"
                                                             alt="..."/>
                                                    </a>
                                                </div>
                                            </td>
                                            <td className="text-end">
                                                <div className="dropdown">
                                                    <a href="#" className="dropdown-ellipses dropdown-toggle"
                                                       role="button"
                                                       data-bs-toggle="dropdown" aria-haspopup="true"
                                                       aria-expanded="false">
                                                        <i className="fe fe-more-vertical"></i>
                                                    </a>
                                                    <div className="dropdown-menu dropdown-menu-end">
                                                        <a href="#!" className="dropdown-item">
                                                            Action
                                                        </a>
                                                        <a href="#!" className="dropdown-item">
                                                            Another action
                                                        </a>
                                                        <a href="#!" className="dropdown-item">
                                                            Something else here
                                                        </a>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="goal-project">
                                                GDPR Compliance
                                            </td>
                                            <td className="goal-status">
                                                <span className="text-success">●</span> Completed
                                            </td>
                                            <td className="goal-progress">
                                                100%
                                            </td>
                                            <td className="goal-date">
                                                <time dateTime="2018-10-24">06/19/18</time>
                                            </td>
                                            <td className="text-end">
                                                <div className="avatar-group justify-content-end">
                                                    <a href="#!" className="avatar avatar-xs" data-bs-toggle="tooltip"
                                                       title="Dianna Smiley">
                                                        <img src="/img/avatars/profiles/avatar-1.jpg"
                                                             className="avatar-img rounded-circle"
                                                             alt="..."/>
                                                    </a>
                                                    <a href="#!" className="avatar avatar-xs" data-bs-toggle="tooltip"
                                                       title="Ab Hadley">
                                                        <img src="/img/avatars/profiles/avatar-2.jpg"
                                                             className="avatar-img rounded-circle"
                                                             alt="..."/>
                                                    </a>
                                                    <a href="#!" className="avatar avatar-xs" data-bs-toggle="tooltip"
                                                       title="Adolfo Hess">
                                                        <img src="/img/avatars/profiles/avatar-3.jpg"
                                                             className="avatar-img rounded-circle"
                                                             alt="..."/>
                                                    </a>
                                                </div>
                                            </td>
                                            <td className="text-end">
                                                <div className="dropdown">
                                                    <a href="#" className="dropdown-ellipses dropdown-toggle"
                                                       role="button"
                                                       data-bs-toggle="dropdown" aria-haspopup="true"
                                                       aria-expanded="false">
                                                        <i className="fe fe-more-vertical"></i>
                                                    </a>
                                                    <div className="dropdown-menu dropdown-menu-end">
                                                        <a href="#!" className="dropdown-item">
                                                            Action
                                                        </a>
                                                        <a href="#!" className="dropdown-item">
                                                            Another action
                                                        </a>
                                                        <a href="#!" className="dropdown-item">
                                                            Something else here
                                                        </a>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="goal-project">
                                                v1.2 Documentation
                                            </td>
                                            <td className="goal-status">
                                                <span className="text-danger">●</span> Cancelled
                                            </td>
                                            <td className="goal-progress">
                                                0%
                                            </td>
                                            <td className="goal-date">
                                                <time dateTime="2018-10-24">06/25/18</time>
                                            </td>
                                            <td className="text-end">
                                                <div className="avatar-group justify-content-end">
                                                    <a href="#!" className="avatar avatar-xs" data-bs-toggle="tooltip"
                                                       title="Dianna Smiley">
                                                        <img src="/img/avatars/profiles/avatar-1.jpg"
                                                             className="avatar-img rounded-circle"
                                                             alt="..."/>
                                                    </a>
                                                    <a href="#!" className="avatar avatar-xs" data-bs-toggle="tooltip"
                                                       title="Ab Hadley">
                                                        <img src="/img/avatars/profiles/avatar-2.jpg"
                                                             className="avatar-img rounded-circle"
                                                             alt="..."/>
                                                    </a>
                                                </div>
                                            </td>
                                            <td className="text-end">
                                                <div className="dropdown">
                                                    <a href="#" className="dropdown-ellipses dropdown-toggle"
                                                       role="button"
                                                       data-bs-toggle="dropdown" aria-haspopup="true"
                                                       aria-expanded="false">
                                                        <span className="fe fe-more-vertical"></span>
                                                    </a>
                                                    <div className="dropdown-menu dropdown-menu-end">
                                                        <a href="#!" className="dropdown-item">
                                                            Action
                                                        </a>
                                                        <a href="#!" className="dropdown-item">
                                                            Another action
                                                        </a>
                                                        <a href="#!" className="dropdown-item">
                                                            Something else here
                                                        </a>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="goal-project">
                                                Plan design offsite
                                            </td>
                                            <td className="goal-status">
                                                <span className="text-success">●</span> Completed
                                            </td>
                                            <td className="goal-progress">
                                                100%
                                            </td>
                                            <td className="goal-date">
                                                <time dateTime="2018-10-24">06/30/18</time>
                                            </td>
                                            <td className="text-end">
                                                <div className="avatar-group justify-content-end">
                                                    <a href="#!" className="avatar avatar-xs" data-bs-toggle="tooltip"
                                                       title="Dianna Smiley">
                                                        <img src="/img/avatars/profiles/avatar-1.jpg"
                                                             className="avatar-img rounded-circle"
                                                             alt="..."/>
                                                    </a>
                                                    <a href="#!" className="avatar avatar-xs" data-bs-toggle="tooltip"
                                                       title="Ab Hadley">
                                                        <img src="/img/avatars/profiles/avatar-2.jpg"
                                                             className="avatar-img rounded-circle"
                                                             alt="..."/>
                                                    </a>
                                                    <a href="#!" className="avatar avatar-xs" data-bs-toggle="tooltip"
                                                       title="Adolfo Hess">
                                                        <img src="/img/avatars/profiles/avatar-3.jpg"
                                                             className="avatar-img rounded-circle"
                                                             alt="..."/>
                                                    </a>
                                                    <a href="#!" className="avatar avatar-xs" data-bs-toggle="tooltip"
                                                       title="Daniela Dewitt">
                                                        <img src="/img/avatars/profiles/avatar-4.jpg"
                                                             className="avatar-img rounded-circle"
                                                             alt="..."/>
                                                    </a>
                                                </div>
                                            </td>
                                            <td className="text-end">
                                                <div className="dropdown">
                                                    <a href="#" className="dropdown-ellipses dropdown-toggle"
                                                       role="button"
                                                       data-bs-toggle="dropdown" aria-haspopup="true"
                                                       aria-expanded="false">
                                                        <i className="fe fe-more-vertical"></i>
                                                    </a>
                                                    <div className="dropdown-menu dropdown-menu-end">
                                                        <a href="#!" className="dropdown-item">
                                                            Action
                                                        </a>
                                                        <a href="#!" className="dropdown-item">
                                                            Another action
                                                        </a>
                                                        <a href="#!" className="dropdown-item">
                                                            Something else here
                                                        </a>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                        </div>
                    </div>

                    <div className="row">
                        <div className="col-12 col-xl-5">


                            <div className="card card-fill">
                                <div className="card-header">


                                    <h4 className="card-header-title">
                                        Recent Activity
                                    </h4>


                                    <a className="small" href="#!">View all</a>

                                </div>
                                <div className="card-body">


                                    <div className="list-group list-group-flush list-group-activity my-n3">
                                        <div className="list-group-item">
                                            <div className="row">
                                                <div className="col-auto">


                                                    <div className="avatar avatar-sm avatar-online">
                                                        <img className="avatar-img rounded-circle"
                                                             src="/img/avatars/profiles/avatar-1.jpg"
                                                             alt="..."/>
                                                    </div>

                                                </div>
                                                <div className="col ms-n2">


                                                    <h5 className="mb-1">
                                                        Dianna Smiley
                                                    </h5>


                                                    <p className="small text-gray-700 mb-0">
                                                        Uploaded the files "Launchday Logo" and "New Design".
                                                    </p>


                                                    <small className="text-muted">
                                                        2m ago
                                                    </small>

                                                </div>
                                            </div>

                                        </div>
                                        <div className="list-group-item">
                                            <div className="row">
                                                <div className="col-auto">


                                                    <div className="avatar avatar-sm avatar-online">
                                                        <img className="avatar-img rounded-circle"
                                                             src="/img/avatars/profiles/avatar-2.jpg"
                                                             alt="..."/>
                                                    </div>

                                                </div>
                                                <div className="col ms-n2">


                                                    <h5 className="mb-1">
                                                        Ab Hadley
                                                    </h5>


                                                    <p className="small text-gray-700 mb-0">
                                                        Shared the "Why Dashkit?" post with 124 subscribers.
                                                    </p>


                                                    <small className="text-muted">
                                                        1h ago
                                                    </small>

                                                </div>
                                            </div>

                                        </div>
                                        <div className="list-group-item">
                                            <div className="row">
                                                <div className="col-auto">


                                                    <div className="avatar avatar-sm avatar-offline">
                                                        <img className="avatar-img rounded-circle"
                                                             src="/img/avatars/profiles/avatar-3.jpg"
                                                             alt="..."/>
                                                    </div>

                                                </div>
                                                <div className="col ms-n2">


                                                    <h5 className="mb-1">
                                                        Adolfo Hess
                                                    </h5>


                                                    <p className="small text-gray-700 mb-0">
                                                        Exported sales data from Launchday's subscriber data.
                                                    </p>


                                                    <small className="text-muted">
                                                        3h ago
                                                    </small>

                                                </div>
                                            </div>

                                        </div>
                                    </div>

                                </div>
                            </div>

                        </div>
                        <div className="col-12 col-xl-7">


                            <div className="card">
                                <div className="card-header">


                                    <h4 className="card-header-title">
                                        Scratchpad Checklist
                                    </h4>


                                    <span className="badge bg-secondary-soft">
                  23 Archived
                </span>

                                </div>
                                <div className="card-body">

                                    {/*Checklist*/}
                                    <div className="checklist">
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" id="checklistOne"/>
                                            <label className="form-check-label">Delete the old mess in functions
                                                files.</label>
                                        </div>
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" id="checklistTwo"/>
                                            <label className="form-check-label">Refactor the core social sharing
                                                modules.</label>
                                        </div>
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" id="checklistThree"/>
                                            <label className="form-check-label">Create the release notes for the new
                                                pages so customers get
                                                psyched.</label>
                                        </div>
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" id="checklistFour"/>
                                            <label className="form-check-label">Send Dianna those meeting notes.</label>
                                        </div>
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" id="checklistFive"/>
                                            <label className="form-check-label">Share the documentation for the new
                                                unified API.</label>
                                        </div>
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" id="checklistSix"
                                                   checked/>
                                            <label className="form-check-label">Clean up the Figma file with all of the
                                                avatars, buttons,
                                                and other
                                                components.</label>
                                        </div>
                                    </div>

                                </div>
                                <div className="card-footer">
                                    <div className="row align-items-center">
                                        <div className="col">

                      
                      <textarea className="form-control form-control-flush form-control-auto" data-autosize rows="1"
                                placeholder="Create a task"></textarea>

                                        </div>
                                        <div className="col-auto">


                                            <button className="btn btn-sm btn-primary">
                                                Add
                                            </button>

                                        </div>
                                    </div>

                                </div>
                            </div>

                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
}

export default App;
