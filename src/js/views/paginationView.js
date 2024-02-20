import view from './view.js';
import icons from 'url:../../img/icons.svg';

class PaginationView extends view {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (event) {
      const btn = event.target.closest('.btn--inline');
      if (!btn) return;

      const goToPage = +btn.dataset.goto;

      handler(goToPage);
    });
  }

  _generateMarkup() {
    const curPage = this._data.page;
    const numPages = Math.ceil(this._data.results.length / this._data.resultsPerPage);

    // Page1, and there are other pages
    if (curPage === 1 && numPages > 1) {
      return `${this._generateRightbtn(curPage)}`;
    }

    // Last page
    if (curPage === numPages && numPages > 1) {
      return `${this._generateLeftbtn(curPage)}`;
    }

    // Other page
    if (curPage < numPages) {
      return `${this._generateLeftbtn(curPage) + this._generateRightbtn(curPage)}`;
    }
    // Page1, and there are no other pages
    return '';
  }

  _generateLeftbtn(page) {
    return `
    <button class="btn--inline pagination__btn--prev" data-goto="${page - 1}">
        <svg class="search__icon">
            <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span>${page - 1}</span>
   </button>
    `;
  }

  _generateRightbtn(page) {
    return `
    <button class="btn--inline pagination__btn--next" data-goto="${page + 1}">
    <span>${page + 1}</span>
    <svg class="search__icon">
        <use href="${icons}#icon-arrow-right"></use>
    </svg>
  </button>
    `;
  }
}

export default new PaginationView();
