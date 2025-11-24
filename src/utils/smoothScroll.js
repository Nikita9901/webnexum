export function smoothScrollTo(e, targetId) {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
        const headerOffset = 80; // Высота хэдера + отступ
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }
}


