document.addEventListener('DOMContentLoaded', () => {
	const hamburger = document.querySelector('.hamburger');
	const navLinks = document.querySelector('.nav-links');

	if (!hamburger) {
		// eslint-disable-next-line no-console
		console.error('Hamburger button not found');
		return;
	}

	if (!navLinks) {
		// eslint-disable-next-line no-console
		console.error('Navigation links not found');
		return;
	}

	// Function to close the mobile menu
	function closeMobileMenu() {
		navLinks.classList.remove('expanded');
		hamburger.classList.remove('active');
		// Re-enable scrolling
		document.body.style.overflow = '';
		document.documentElement.style.overflow = '';
	}

	// Function to open the mobile menu
	function openMobileMenu() {
		navLinks.classList.add('expanded');
		hamburger.classList.add('active');
		// Freeze scrolling when menu is open
		document.body.style.overflow = 'hidden';
		document.documentElement.style.overflow = 'hidden';
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
		toggleMobileMenu();
	});

	// Close menu when clicking on navigation links
	navLinks.addEventListener('click', e => {
		if (e.target.tagName === 'A') {
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
			closeMobileMenu();
		}
	});

	// Close menu on escape key
	document.addEventListener('keydown', e => {
		if (e.key === 'Escape' && navLinks.classList.contains('expanded')) {
			closeMobileMenu();
		}
	});

	// Cleanup function to ensure scrolling is re-enabled
	function cleanup() {
		document.body.style.overflow = '';
		document.documentElement.style.overflow = '';
	}

	// Re-enable scrolling when page is unloaded or hidden
	window.addEventListener('beforeunload', cleanup);
	window.addEventListener('pagehide', cleanup);
	document.addEventListener('visibilitychange', () => {
		if (document.hidden) {
			cleanup();
		}
	});
});
