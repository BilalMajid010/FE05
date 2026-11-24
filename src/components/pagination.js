export function renderPagination(
    totalItems,
    currentPage,
    itemsPerPage,
    onPageChange
) {
    const pagination = document.querySelector("#pagination");

    pagination.replaceChildren();

    const totalPages = Math.ceil(totalItems / itemsPerPage);

    if (totalPages <= 1) {
        return;
    }

    const previousButton = document.createElement("button");
    previousButton.textContent = "Previous";
    previousButton.className = "page-btn";
    previousButton.disabled = currentPage === 1;

    previousButton.addEventListener("click", () => {
        onPageChange(currentPage - 1);
    });

    pagination.appendChild(previousButton);

    for (let page = 1; page <= totalPages; page++) {
        const pageButton = document.createElement("button");

        pageButton.textContent = page;
        pageButton.className = "page-btn";

        if (page === currentPage) {
            pageButton.classList.add("active");
        }

        pageButton.addEventListener("click", () => {
            onPageChange(page);
        });

        pagination.appendChild(pageButton);
    }

    const nextButton = document.createElement("button");
    nextButton.textContent = "Next";
    nextButton.className = "page-btn";
    nextButton.disabled = currentPage === totalPages;

    nextButton.addEventListener("click", () => {
        onPageChange(currentPage + 1);
    });

    pagination.appendChild(nextButton);
}