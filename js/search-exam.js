import exams from "../data/exam.js";

// Start -> Search exam
function searchExam(exams) {
    exams.forEach(exam => {
        const ul = document.getElementById('exam-search');
        const li = document.createElement('li');

        li.innerHTML = `
            <figure class="flex-shrink-0">
                <a href="${exam.href}"><img class="border-radius-3px" src="${exam.image}" alt="${exam.name}"></a>
            </figure>
            <div class="media-body flex-grow-1">
                <a href="${exam.href}" class="font-weight-500 text-fendi-inovation text-green-longevity-hover d-inline-block margin-five-bottom md-margin-two-bottom"><span class="item-name" title="">${exam.name}</span></a>
                <span class="text-medium d-block line-height-22px">Exame</span>
            </div>
        `
        ul.appendChild(li);
        
        li.addEventListener('click', () => {
            ul.style.display = 'none';
        });
    });
}
// End -> Search exam

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
      ul = document.getElementById('exam-search');

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

document.addEventListener('DOMContentLoaded', () => {
    // Search exam
    searchExam(exams);
});