/* eslint-disable no-console */

// Global test setup
import '@testing-library/jest-dom';

// Mock console methods to reduce noise in tests
const originalConsoleWarn = console.warn;
const originalConsoleError = console.error;

beforeAll(() => {
	// Suppress console warnings and errors during tests unless explicitly needed
	console.warn = jest.fn();
	console.error = jest.fn();
});

afterAll(() => {
	// Restore original console methods
	console.warn = originalConsoleWarn;
	console.error = originalConsoleError;
});

// Global test utilities
global.ResizeObserver = jest.fn().mockImplementation(() => ({
	observe: jest.fn(),
	unobserve: jest.fn(),
	disconnect: jest.fn(),
}));
