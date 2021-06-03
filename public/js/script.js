
{
  const toggle = document.querySelector('.sidebar-toggle');
  const sidebar = document.querySelector('#sidebar');
  const checkbox = document.querySelector('#sidebar-checkbox');
  const accordions = document.querySelectorAll('.accordion');
  // const subjectAccordion = document.querySelectorAll('.subject-accordion');
  // const shownSubjectAccordion = document.querySelectorAll('.shown-subject-accordion');

  document.addEventListener('click', function (e) {
    const target = e.target;

    // if (sidebar.classList.contains("accordion")) console.log("heere");
    if (!checkbox.checked ||
      sidebar.contains(target) ||
      (target === checkbox || target === toggle)) {
      // console.log(target.classList.contains(".sub-accordion"))
      return;
      }

    checkbox.checked = false;
  }, false);

  accordions.forEach(accordion => {
    const notesAccordion = accordion.querySelector(".sub-accordion");
    const subAccordion = accordion.querySelector(".sub-sub-accordion");
    subAccordion.classList.add("w3-hide");

    notesAccordion.addEventListener('click', () => {
      subAccordion.classList.toggle("w3-hide");
    })
  })

}


