document.getElementById('github-form').addEventListener('submit', function (event) {
    event.preventDefault();
  
    // Get the value from the search input
    const searchTerm = document.getElementById('search').value;
  
    // Make a request to the GitHub User Search Endpoint
    fetch(`https://api.github.com/search/users?q=${searchTerm}`, {
      headers: {
        'Accept': 'application/vnd.github.v3+json'
      }
    })
      .then(response => response.json())
      .then(data => {
        // Display user information on the page
        displayUsers(data.items);
      })
      .catch(error => console.error('Error fetching users:', error));
  });
  
  function displayUsers(users) {
    const userList = document.getElementById('user-list');
    userList.innerHTML = '';
  
    users.forEach(user => {
      // Create a list item for each user
      const listItem = document.createElement('li');
  
      // Display username, avatar, and a link to their profile
      listItem.innerHTML = `
        <img src='${user.avatar_url}' alt='${user.login}' width='50' height='50'>
        <span>${user.login}</span>
        <a href='#' onclick='fetchRepos("${user.login}")'>View Repos</a>
      `;
  
      // Append the list item to the user list
      userList.appendChild(listItem);
    });
  }
  
  function fetchRepos(username) {
    // Make a request to the GitHub User Repos Endpoint
    fetch(`https://api.github.com/users/${username}/repos`, {
      headers: {
        'Accept': 'application/vnd.github.v3+json'
      }
    })
      .then(response => response.json())
      .then(data => {
        // Display repositories on the page
        displayRepos(data);
      })
      .catch(error => console.error('Error fetching repos:', error));
  }
  
  function displayRepos(repos) {
    const reposList = document.getElementById('repos-list');
    reposList.innerHTML = '';
  
    repos.forEach(repo => {
      // Create a list item for each repository
      const listItem = document.createElement('li');
  
      // Display repository name and a link to the repository
      listItem.innerHTML = `
        <span>${repo.name}</span>
        <a href='${repo.html_url}' target='_blank'>View Repo</a>
      `;
  
      // Append the list item to the repositories list
      reposList.appendChild(listItem);
    });
  }
  