document.addEventListener('DOMContentLoaded', () => {
	const hamburger = document.querySelector('.hamburger');
	const navLinks = document.querySelector('.nav-links');

	console.log('Menu script loaded');
	console.log('Hamburger element:', hamburger);
	console.log('Nav links element:', navLinks);

	if (!hamburger) {
		console.error('Hamburger button not found');
		return;
	}

	if (!navLinks) {
		console.error('Navigation links not found');
		return;
	}

	hamburger.addEventListener('click', () => {
		console.log('Hamburger clicked');
		
		// Toggle the 'expanded' class to show or hide the menu
		navLinks.classList.toggle('expanded');
		console.log('Nav links expanded:', navLinks.classList.contains('expanded'));

		// Toggle the 'active' class for the hamburger icon
		hamburger.classList.toggle('active');
		console.log('Hamburger active:', hamburger.classList.contains('active'));
	});
});
