document.addEventListener('DOMContentLoaded', () => {
	const hamburger = document.querySelector('.hamburger');
	const navLinks = document.querySelector('.nav-links');

	if (!hamburger) {
		console.error('Hamburger button not found');
		return;
	}

	if (!navLinks) {
		console.error('Navigation links not found');
		return;
	}

	// Function to close the mobile menu
	function closeMobileMenu() {
		navLinks.classList.remove('expanded');
		hamburger.classList.remove('active');
		console.log('Mobile menu closed');
	}

	// Function to open the mobile menu
	function openMobileMenu() {
		navLinks.classList.add('expanded');
		hamburger.classList.add('active');
		console.log('Mobile menu opened');
	}

	// Function to toggle the mobile menu
	function toggleMobileMenu() {
		if (navLinks.classList.contains('expanded')) {
			closeMobileMenu();
		} else {
			openMobileMenu();
		}
	}

	hamburger.addEventListener('click', e => {
		e.stopPropagation(); // Prevent event from bubbling to document
		console.log('Hamburger clicked');
		toggleMobileMenu();
	});

	// Close menu when clicking on navigation links
	navLinks.addEventListener('click', e => {
		if (e.target.tagName === 'A') {
			console.log('Navigation link clicked, closing menu');
			closeMobileMenu();
		}
	});

	// Close menu when clicking outside
	document.addEventListener('click', e => {
		if (
			navLinks.classList.contains('expanded') &&
			!hamburger.contains(e.target) &&
			!navLinks.contains(e.target)
		) {
			console.log('Clicked outside menu, closing');
			closeMobileMenu();
		}
	});

	// Close menu on escape key
	document.addEventListener('keydown', e => {
		if (e.key === 'Escape' && navLinks.classList.contains('expanded')) {
			console.log('Escape key pressed, closing menu');
			closeMobileMenu();
		}
	});
});
