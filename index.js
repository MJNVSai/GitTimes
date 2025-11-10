// Animate containers with staggered delay
const containers = document.querySelectorAll('.container');
containers.forEach((container, index) => {
  container.style.animationDelay = `${index * 0.8}s`;
});

// Search functionality
const searchInput = document.getElementById('searchInput');
const suggestions = document.getElementById('suggestions');

// Collect all commands
const commands = Array.from(document.querySelectorAll('.text-box h2')).map(h2 => {
  const cmd = h2.textContent.replace('Command :', '').trim();
  return { command: cmd, element: h2.closest('.container') };
});

searchInput.addEventListener('input', () => {
  const query = searchInput.value.toLowerCase();
  suggestions.innerHTML = '';

  if (query === '') {
    suggestions.style.display = 'none';
    return;
  }

  const matched = commands.filter(c => c.command.toLowerCase().includes(query));

  if (matched.length === 0) {
    const li = document.createElement('li');
    li.textContent = 'No results found';
    li.style.color = 'gray';
    li.style.cursor = 'default';
    suggestions.appendChild(li);
    suggestions.style.display = 'block';
    setTimeout(() => (suggestions.style.display = 'none'), 2000);
    return;
  }

  matched.forEach(c => {
    const li = document.createElement('li');
    li.textContent = c.command;
    li.addEventListener('click', () => {
      c.element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      searchInput.value = '';
      suggestions.innerHTML = '';
      suggestions.style.display = 'none';
    });
    suggestions.appendChild(li);
  });

  suggestions.style.display = 'block';
});

// Hide suggestions when clicking outside
document.addEventListener('click', (e) => {
  if (!e.target.closest('.search-bar')) {
    suggestions.style.display = 'none';
  }
});

// Set current year in footer automatically
document.getElementById('year').textContent = new Date().getFullYear();

