import { trigger, state, style, animate, transition } from '@angular/animations';

export const animation = trigger('toggleModal', [
	state('open', style({ opacity : 1, transform : 'scale(1)' })),
	transition('void => open', [
		style({ opacity : 0, transform : 'scale(0.75)' }),
		animate(200)
	]),
	transition('* => void', [
		animate(200, style({ opacity : 0, transform : 'scale(0.75)' }))
	])
]);
