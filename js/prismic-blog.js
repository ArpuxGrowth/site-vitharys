import { createClient } from "https://cdn.skypack.dev/@prismicio/client";

const repo = 'https://vitharysblog.cdn.prismic.io/api/v2';
const client = createClient(repo);
const blogs = await client.getAllByType('blog_post', {
    orderings: [
      {
        field: "document.first_publication_date",
        direction: "desc"
      }
    ]
});

blogs.forEach((blog, i) => {
    const uid = blog.uid;
    const title = blog.data.title[0].text;
    const truncatedTitle = blog.data.title[0].text.length > 55 ? blog.data.title[0].text.slice(0, 52) + '…' : blog.data.title[0].text;
    const description = blog.data.description.slice(0, 85) + '…';
    const tags = blog.tags[0];
    const date = Intl.DateTimeFormat('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(blog.data.date));
    const image = blog.data.thumb_image?.url;
    const alt = blog.data.thumb_image?.alt;
    const delay = 0.2 * (i + 1);
    
    const posts = document.getElementById('posts');

    const article = document.createElement('li');
    article.className = 'grid-item wow animate__fadeIn';
    article.setAttribute('data-wow-delay', `${delay}s`);
    article.innerHTML = `
        <div class="blog-post border-radius-5px bg-white box-shadow-medium">
            <div class="blog-post-image bg-green-longevity">
                <a href="blog/${uid}" title=""><img src="${image}" alt="${alt}"></a>
                <a href="blog/${uid}" class="blog-category alt-font">${tags}</a>
            </div>
            <div class="post-details padding-3-rem-lr padding-2-half-rem-tb">
                <a href="blog/${uid}" class="alt-font text-small text-green-longevity-hover d-inline-block margin-10px-bottom">${date}</a>
                <a href="blog/${uid}" class="alt-font font-weight-500 text-extra-medium text-fendi-inovation text-green-longevity-hover margin-15px-bottom d-block" title="${title}">${truncatedTitle}</a>
                <p>${description}</p>
                <div class="d-flex align-items-center">
                    <img class="avtar-image" src="images/avatar-vitharys.jpg" alt=""/>
                    <span class="alt-font text-small me-auto">Por <a href="blog/${uid}" class="text-green-longevity-hover">Vitharys</a></span>
                </div>
            </div>
        </div>
    `;
    posts.appendChild(article);

    const $newItem = $(article);

    $newItem.imagesLoaded(() => {
        window.blogGrid
            .isotope('appended', $newItem)
            .isotope('layout');
    });
});