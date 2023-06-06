const Options = () => {
  return (
    <nav class="navbar sticky-top bg-body-tertiary">
      <div class="container-fluid">
      <ul class="nav nav-underline">
  <li class="nav-item">
    <h6>**LOGO**</h6>
  </li>
  <li class="nav-item dropdown">
    <a class="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-expanded="false">Settings</a>
    <ul class="dropdown-menu">
      <li><a class="dropdown-item" href="#">Profile</a></li>
      <li><a class="dropdown-item" href="#">Advanced Settings</a></li>
      <li><a class="dropdown-item" href="#">Hand History</a></li>
      <li><a class="dropdown-item" href="#">Account History</a></li>
      <li><a class="dropdown-item" href="#">Log Out</a></li>

    </ul>
  </li>
</ul>
        <button>About</button>
        <button>Promotions</button>
        <button>Tables</button>
        <button>Register</button>
        <a class="navbar-brand">**Player Name and Avatar**</a>
      </div>
    </nav>
  );
};

export default Options;
