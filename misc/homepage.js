const waitForDomReady = () =>
  new Promise((resolve) => {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', resolve, { once: true });
    } else {
      resolve();
    }
  });

const fetchJson = async (url) => {
  const response = await fetch(url, { credentials: 'include' });
  if (!response.ok) {
    throw new Error(`HTTP error ${response.status}`);
  }
  return response.json();
};

const getAuthenticatedUserId = () => {
  const meta = document.querySelector('meta[name="user-data"]');
  if (!meta) {
    return null;
  }
  const id = meta.getAttribute('data-userid');
  return id ? Number(id) : null;
};

const fetchFavoriteGames = async (userId, limit = 6) => {
  if (!userId) {
    return [];
  }

  try {
    const data = await fetchJson(
      `https://games.roblox.com/v2/users/${userId}/favorite/games?limit=${limit}`
    );
    if (!data || !Array.isArray(data.data)) {
      return [];
    }

    return data.data.map((entry) => ({
      id: entry.rootPlaceId || entry.placeId,
      name: entry.name,
      universeId: entry.universeId,
    }));
  } catch (error) {
    console.error('Failed to fetch favorite games:', error);
    return [];
  }
};

const fetchFriends = async (userId, limit = 6) => {
  if (!userId) {
    return [];
  }

  try {
    const data = await fetchJson(`https://friends.roblox.com/v1/users/${userId}/friends?limit=${limit}`);
    if (!data || !Array.isArray(data.data)) {
      return [];
    }

    return data.data.map((friend) => ({
      id: friend.id,
      displayName: friend.displayName || friend.name,
      name: friend.name,
      presenceType: friend.presenceType,
    }));
  } catch (error) {
    console.error('Failed to fetch friends list:', error);
    return [];
  }
};

const fetchPlatformNews = async () => {
  try {
    const data = await fetchJson('https://www.roblox.com/home/getmetadata');
    if (data && Array.isArray(data?.newsArticles)) {
      return data.newsArticles.map((article) => ({
        id: article.id || article.articleId,
        title: article.title,
        url: article.link || article.url,
        excerpt: article.description || article.excerpt,
      }));
    }
  } catch (error) {
    console.error('Failed to fetch Roblox news metadata:', error);
  }

  return [];
};

const createSection = (title, items, renderItem) => {
  const section = document.createElement('section');
  section.className = 'rovalra-home-section';

  const heading = document.createElement('h2');
  heading.className = 'rovalra-home-section__title';
  heading.textContent = title;
  section.appendChild(heading);

  const list = document.createElement('div');
  list.className = 'rovalra-home-section__content';

  if (!items || items.length === 0) {
    const emptyState = document.createElement('p');
    emptyState.className = 'rovalra-home-empty';
    emptyState.textContent = 'Nothing to show here yet. Check back soon!';
    list.appendChild(emptyState);
  } else {
    items.forEach((item) => {
      const rendered = renderItem(item);
      if (rendered) {
        list.appendChild(rendered);
      }
    });
  }

  section.appendChild(list);
  return section;
};

const renderGameCard = (game) => {
  const anchor = document.createElement('a');
  anchor.className = 'rovalra-home-card';
  if (game.id) {
    anchor.href = `https://www.roblox.com/games/${game.id}`;
  } else if (game.universeId) {
    anchor.href = `https://www.roblox.com/games/start?universeId=${game.universeId}`;
  }
  anchor.target = '_self';
  anchor.rel = 'noopener';

  const name = document.createElement('span');
  name.className = 'rovalra-home-card__title';
  name.textContent = game.name || 'Unknown experience';
  anchor.appendChild(name);

  return anchor;
};

const renderFriendCard = (friend) => {
  const container = document.createElement('a');
  container.className = 'rovalra-home-card';
  container.href = `https://www.roblox.com/users/${friend.id}/profile`;
  container.target = '_self';
  container.rel = 'noopener';

  const title = document.createElement('span');
  title.className = 'rovalra-home-card__title';
  title.textContent = friend.displayName || friend.name;
  container.appendChild(title);

  const subtitle = document.createElement('span');
  subtitle.className = 'rovalra-home-card__subtitle';
  const presenceMap = {
    0: 'Offline',
    1: 'Online',
    2: 'In Game',
    3: 'In Studio',
  };
  subtitle.textContent = presenceMap[friend.presenceType] || 'Unknown status';
  container.appendChild(subtitle);

  return container;
};

const renderNewsCard = (article) => {
  if (!article || !article.title) {
    return null;
  }

  const container = document.createElement('a');
  container.className = 'rovalra-home-card rovalra-home-card--news';
  container.href = article.url || '#';
  container.target = '_blank';
  container.rel = 'noopener';

  const title = document.createElement('span');
  title.className = 'rovalra-home-card__title';
  title.textContent = article.title;
  container.appendChild(title);

  if (article.excerpt) {
    const excerpt = document.createElement('span');
    excerpt.className = 'rovalra-home-card__subtitle';
    excerpt.textContent = article.excerpt;
    container.appendChild(excerpt);
  }

  return container;
};

const renderHomeEnhancements = (container, { favoriteGames, friends, news }) => {
  container.innerHTML = '';

  const intro = document.createElement('header');
  intro.className = 'rovalra-home-intro';
  intro.innerHTML = `
    <h1 class="rovalra-home-intro__title">Welcome back!</h1>
    <p class="rovalra-home-intro__subtitle">
      Here is a quick snapshot of your Roblox world. Jump back in with a single click.
    </p>
  `;
  container.appendChild(intro);

  container.appendChild(createSection('Favourite Experiences', favoriteGames, renderGameCard));
  container.appendChild(createSection('Friends', friends, renderFriendCard));
  container.appendChild(createSection('News from Roblox', news, renderNewsCard));
};

const ensureContainer = (parent) => {
  const existing = parent.querySelector('#rovalra-home-enhancements');
  if (existing) {
    return existing;
  }

  const container = document.createElement('div');
  container.id = 'rovalra-home-enhancements';
  container.className = 'rovalra-home-root';
  parent.prepend(container);
  return container;
};

const attachMutationGuard = (parent, container, render) => {
  const observer = new MutationObserver(() => {
    if (!parent.contains(container)) {
      parent.prepend(container);
      render();
    }
  });

  observer.observe(parent, { childList: true });
};

const findHomeParent = () => {
  const candidates = ['#container-main', '#home-container', 'main', '#content'];
  for (const selector of candidates) {
    const element = document.querySelector(selector);
    if (element) {
      return element;
    }
  }
  return null;
};

const waitForHomeParent = async (timeout = 5000) => {
  const existing = findHomeParent();
  if (existing) {
    return existing;
  }

  return new Promise((resolve) => {
    const observer = new MutationObserver(() => {
      const found = findHomeParent();
      if (found) {
        observer.disconnect();
        resolve(found);
      }
    });

    observer.observe(document.documentElement, {
      childList: true,
      subtree: true,
    });

    if (timeout > 0) {
      setTimeout(() => {
        observer.disconnect();
        resolve(document.body);
      }, timeout);
    }
  });
};

const loadHomeData = async () => {
  const userId = getAuthenticatedUserId();

  const [favoriteGames, friends, news] = await Promise.all([
    fetchFavoriteGames(userId),
    fetchFriends(userId),
    fetchPlatformNews(),
  ]);

  return { favoriteGames, friends, news };
};

const applyBaseStyles = () => {
  if (document.getElementById('rovalra-home-styles')) {
    return;
  }

  const style = document.createElement('style');
  style.id = 'rovalra-home-styles';
  style.textContent = `
    #rovalra-home-enhancements {
      background: var(--theme-secondary, rgba(255, 255, 255, 0.9));
      border-radius: 12px;
      padding: 16px 20px;
      margin-bottom: 16px;
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .rovalra-home-intro__title {
      font-size: 1.5rem;
      margin: 0;
    }

    .rovalra-home-intro__subtitle {
      margin: 4px 0 0;
      color: var(--text-secondary, #6c6f73);
    }

    .rovalra-home-section {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .rovalra-home-section__title {
      margin: 0;
      font-size: 1.2rem;
    }

    .rovalra-home-section__content {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
      gap: 12px;
    }

    .rovalra-home-card {
      display: flex;
      flex-direction: column;
      padding: 12px;
      border-radius: 10px;
      background: var(--theme-tertiary, rgba(255, 255, 255, 0.6));
      text-decoration: none;
      color: inherit;
      border: 1px solid rgba(0, 0, 0, 0.05);
      transition: transform 0.15s ease, box-shadow 0.15s ease;
      gap: 6px;
    }

    .rovalra-home-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 12px 20px rgba(0, 0, 0, 0.12);
    }

    .rovalra-home-card__title {
      font-weight: 600;
      font-size: 0.95rem;
      line-height: 1.25rem;
    }

    .rovalra-home-card__subtitle {
      font-size: 0.85rem;
      color: var(--text-secondary, #6c6f73);
    }

    .rovalra-home-card--news .rovalra-home-card__subtitle {
      line-height: 1.2rem;
    }

    .rovalra-home-empty {
      margin: 0;
      color: var(--text-secondary, #6c6f73);
    }

    .rovalra-home-loading {
      margin: 0;
      color: var(--text-secondary, #6c6f73);
    }
  `;

  document.head.appendChild(style);
};

export const initHomePageEnhancements = async () => {
  try {
    await waitForDomReady();
    applyBaseStyles();

    const parent = await waitForHomeParent(5000);

    const container = ensureContainer(parent);
    container.innerHTML = '<p class="rovalra-home-loading">Loading your personalised home...</p>';

    const render = async () => {
      try {
        const data = await loadHomeData();
        renderHomeEnhancements(container, data);
      } catch (error) {
        console.error('Failed to render Roblox home enhancements:', error);
        container.innerHTML =
          '<p class="rovalra-home-empty">We could not load your data right now. Please refresh the page.</p>';
      }
    };

    await render();
    attachMutationGuard(parent, container, render);
  } catch (error) {
    console.error('Failed to initialise home page enhancements:', error);
  }
};

export default initHomePageEnhancements;
