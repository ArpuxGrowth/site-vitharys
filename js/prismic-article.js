// Start -> Import Prismic Client
import { createClient } from "https://cdn.skypack.dev/@prismicio/client";
// End -> Import Prismic Client

// Start -> Repository and client
const repo = 'https://vitharysblog.cdn.prismic.io/api/v2';
const client = createClient(repo);
// End -> Repository and client

// Start -> Get URL Params
const urlParams = new URLSearchParams(window.location.search);
const uid = urlParams.get("uid");
// End -> Get URL Params

// Start -> Article content
function renderArticle(article) {
  const title = article.data.title[0]?.text || 'Título não encontrado';
  const date = Intl.DateTimeFormat('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(article.data.date));
  const coverImg = article.data.cover_image?.url;
  const content = article.data.content;

  document.title = title + ' – Clínica Vitharys';

  const heroSection = document.getElementById('hero');
  heroSection.style.cssText = `
      background-image: url('${coverImg}');
  `;

  const heroTitle = document.getElementById('hero-title');
  heroTitle.textContent = title || 'Artigo não encontrado';

  const post = document.getElementById('post');

  function renderContent(contentArray) {
    let html = '';
    let inList = false;

    for (const block of contentArray) {
      switch (block.type) {
        case 'list-item':
          if (!inList) {
            html += '<ul class="margin-25px-bottom">';
            inList = true;
          }
          html += `<li>${block.text}</li>`;
          break;

        default:
          if (inList) {
            html += '</ul>';
            inList = false;
          }

          if (block.type === 'paragraph') {
            html += `<p>${block.text}</p>`;
          } else if (block.type.startsWith('heading')) {
            const level = block.type.slice(-1);
            html += `<h${level} class="alt-font font-weight-400 text-extra-dark-gray">${block.text}</h${level}>`;
          }
          break;
      }
    }

    if (inList) {
      html += '</ul>';
    }

    return html;
  }

  post.innerHTML = `
      <ul class="list-unstyled margin-2-rem-bottom">
          <li class="d-inline-block align-middle margin-25px-right"><i class="feather icon-feather-calendar text-fendi-inovation margin-10px-right"></i><a class="text-green-longevity-hover" href="#">${date}</a></li>
          <li class="d-inline-block align-middle margin-25px-right"><i class="feather icon-feather-folder text-fendi-inovation margin-10px-right"></i><a class="text-green-longevity-hover" href="#">Artigo</a></li>
          <li class="d-inline-block align-middle"><i class="feather icon-feather-user text-fendi-inovation margin-10px-right"></i>Por <a class="text-green-longevity-hover" href="#">Clínica Vitharys</a></li>
      </ul>
      <h5 class="alt-font font-weight-500 text-fendi-inovation margin-4-half-rem-bottom">${title}</h5>
      <img src="${coverImg}" alt="${title}" class="w-100 border-radius-6px margin-4-half-rem-bottom">
      ${renderContent(content)}
  `
}
// End -> Article content

// Start -> Latest posts
function renderLatestPosts(slice) {
  slice.forEach((blog, i) => {
      const uid = blog.uid;
      const title = blog.data.title[0]?.text;
      const truncatedTitle = blog.data.title[0]?.text.length > 55 ? blog.data.title[0]?.text.slice(0, 52) + '...' : blog.data.title[0]?.text || 'Título não encontrado';
      const date = Intl.DateTimeFormat('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(blog.data.date));
      const latestImg = blog.data.latest_image?.url;
      const delay = 0.2 * (i + 1);
      
      const latestPosts = document.getElementById('latest-posts');

      const li = document.createElement('li');
      li.classList = 'd-flex wow animate__fadeIn';
      li.setAttribute('data-wow-delay', `${delay}s`);
      li.innerHTML = `
          <figure class="flex-shrink-0">
              <a href="${uid}"><img class="border-radius-3px" src="${latestImg}" alt="${title}"></a>
          </figure>
          <div class="media-body flex-grow-1">
              <a href="${uid}" class="font-weight-500 text-fendi-inovation text-green-longevity-hover d-inline-block margin-five-bottom md-margin-two-bottom" title="${title}">${truncatedTitle}</a>
              <span class="text-medium d-block line-height-22px">${date}</span>
          </div>
      `

      latestPosts.appendChild(li);
  });
}
// End -> Latest posts

// Start -> Related posts
function renderRelatedPosts(slice) {
  slice.forEach((blog, i) => {
      const uid = blog.uid;
      const title = blog.data.title[0]?.text;
      const truncatedTitle = blog.data.title[0]?.text.length > 55 ? blog.data.title[0]?.text.slice(0, 52) + '...' : blog.data.title[0]?.text || 'Título não encontrado';
      const date = Intl.DateTimeFormat('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(blog.data.date));
      const thumbImg = blog.data.thumb_image?.url;
      const delay = 0.2 * (i + 1);

      const relatedPosts = document.getElementById('related-posts');

      const li = document.createElement('li');
      li.classList = 'grid-item wow animate__fadeIn';
      li.setAttribute('data-wow-delay', `${delay}s`);
      li.innerHTML = `
          <div class="blog-post text-center border-radius-6px bg-white box-shadow box-shadow-large-hover">
              <div class="blog-post-image bg-green-longevity">
                  <a href="${uid}"><img src="${thumbImg}" alt="${title}">
                      <div class="blog-rounded-icon bg-white border-color-white absolute-middle-center">
                          <i class="feather icon-feather-arrow-right text-extra-dark-gray icon-extra-small"></i>
                      </div>
                  </a>
              </div>
              <div class="post-details padding-30px-all xl-padding-25px-lr">
                  <a href="${uid}" class="post-author text-medium text-uppercase text-green-longevity-hover">${date}</a>
                  <a href="${uid}" class="text-fendi-inovation text-green-longevity-hover font-weight-500 alt-font d-block" title="${title}">${truncatedTitle}</a>
              </div>
          </div>
      `
      relatedPosts.appendChild(li);
  });
}
// End -> Related posts

// Start -> Search articles
function searchArticles(articles) {
  articles.forEach((article) => {
    const uid = article.uid;
    const title = article.data.title[0]?.text;
    const truncatedTitle = article.data.title[0]?.text.length > 55 ? article.data.title[0]?.text.slice(0, 52) + '...' : article.data.title[0]?.text || 'Título não encontrado';
    const date = Intl.DateTimeFormat('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(article.data.date));
    const latestImg = article.data.latest_image?.url;

    const ul = document.getElementById('article-search');
    const li = document.createElement('li');
    li.innerHTML = `
      <figure class="flex-shrink-0">
          <a href="${uid}"><img class="border-radius-3px" src="${latestImg}" alt="${title}"></a>
      </figure>
      <div class="media-body flex-grow-1">
          <a href="${uid}" class="font-weight-500 text-fendi-inovation text-green-longevity-hover d-inline-block margin-five-bottom md-margin-two-bottom"><span class="item-name" title="${title}">${truncatedTitle}</span></a>
          <span class="text-medium d-block line-height-22px">${date}</span>
      </div>
    `;

    ul.appendChild(li);
  });
}
// End -> Search articles

// Start -> Filter function
function filtrar() {
  let input,
      filter,
      ul,
      li,
      a,
      i,
      span,
      txtValue,
      count = 0;

      // Key elements
      input = document.getElementById('input-search');
      ul = document.getElementById('article-search');

      // Filter
      filter = input.value.toUpperCase();

      // List items
      li = ul.getElementsByTagName('li');

      // Loop through list items
      for (i = 0; i < li.length; i++) {
        // Get 'a' element
        a = li[i].getElementsByTagName('a')[1];
        // Get 'a' text
        txtValue = a.textContent || a.innerText;
        // Compare text with filter
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          li[i].style.display = '';
          count++
          span = li[i].querySelector('.item-name');
          if (span) {
            span.innerHTML = txtValue.replace(new RegExp(filter, 'gi'), (match) => {
              return '<strong>' + match + '</strong>';
            });
          };
        } else {
          li[i].style.display = 'none';
        };
      };

      if (count === 0) {
        ul.style.display = 'none';
      } else {
        ul.style.display = 'block';
      };

      if (filter === '') {
        ul.style.display = 'none';
      } else {
        ul.style.display = 'block';
      }

}
window.filtrar = filtrar;
// End -> Filter function

document.addEventListener('DOMContentLoaded', async () => {
  const pathname = window.location.pathname.replace(/\/$/, '');
  const parts = pathname.split('/');
  const slug = parts[parts.length - 1] || '';
  if (!slug) {
    const post = document.getElementById('post');
    const latestPosts = document.getElementById('latest-posts');
    const relatedPosts = document.getElementById('related-posts');
    if (post) post.innerHTML = '<p>Artigo não encontrado.</p>';
    if (latestPosts) latestPosts.innerHTML = '<p>Posts indisponíveis.</p>';
    if (relatedPosts) relatedPosts.innerHTML = '<p>Posts indisponíveis.</p>';
    return;
  };

  try {
    // Start -> Get 'article', 'latest-posts', 'related-posts' and 'article-search' elements
    const article = await client.getByUID('blog_post', slug);
    const articles = await client.getAllByType('blog_post',  {
        orderings: [
          {
            field: "document.first_publication_date",
            direction: "desc"
          }
        ]
    });
    const slice = articles.slice(0, 3);
    // End -> Get 'article', 'latest-posts',, 'related-posts' and 'article-search' elements
    renderArticle(article);
    renderLatestPosts(slice);
    renderRelatedPosts(slice);
    searchArticles(articles);
  } catch (e) {
    console.error('Erro ao carregar posts:', e);
    const post = document.getElementById('post');
    const latestPosts = document.getElementById('latest-posts');
    const relatedPosts = document.getElementById('related-posts');
    if (post) post.innerHTML = '<p>Artigo não encontrado.</p>';
    if (latestPosts) latestPosts.innerHTML = '<p>Posts indisponíveis.</p>';
    if (relatedPosts) relatedPosts.innerHTML = '<p>Posts indisponíveis.</p>';
  }
});