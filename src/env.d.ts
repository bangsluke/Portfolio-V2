/// <reference types="astro/client" />
import '../../../.astro/types.d.ts';

declare global {
	interface Window {
		umami?: { track: (name: string, data?: Record<string, string>) => void };
	}
}
