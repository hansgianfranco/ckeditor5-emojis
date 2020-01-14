/**
 * @license Copyright (c) 2003-2017, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

/**
 * @module emoji/ui/emojilistview
 */

import View from '@ckeditor/ckeditor5-ui/src/view';
import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';
import ViewCollection from '@ckeditor/ckeditor5-ui/src/viewcollection';
import Template from '@ckeditor/ckeditor5-ui/src/template';
import FocusTracker from '@ckeditor/ckeditor5-utils/src/focustracker';
import FocusCycler from '@ckeditor/ckeditor5-ui/src/focuscycler';
import KeystrokeHandler from '@ckeditor/ckeditor5-utils/src/keystrokehandler';
import submitHandler from '@ckeditor/ckeditor5-ui/src/bindings/submithandler';

import '../../theme/emojilistview.css';

/**
 * The emoji list view controller class.
 *
 * See {@link module:emoji/ui/emojilistview~EmojiListView}.
 *
 * @extends module:ui/view~View
 */
export default class EmojiListView extends View {
	/**
	 * @inheritDoc
	 */
	constructor( editor ) {
		super( editor.locale );

		/**
		 * Tracks information about DOM focus in the form.
		 *
		 * @readonly
		 * @member {module:utils/focustracker~FocusTracker}
		 */
		this.focusTracker = new FocusTracker();

		/**
		 * An instance of the {@link module:utils/keystrokehandler~KeystrokeHandler}.
		 *
		 * @readonly
		 * @member {module:utils/keystrokehandler~KeystrokeHandler}
		 */
		this.keystrokes = new KeystrokeHandler();
		this.emojiButtonViews = new ViewCollection( editor.locale );
		this.emojiButtonPeopleViews = new ViewCollection( editor.locale );
		this.emojiButtonNatureViews = new ViewCollection( editor.locale );
		//this.emojiButtonFoodViews = new ViewCollection( editor.locale );
		//this.emojiButtonTravelViews = new ViewCollection( editor.locale );
		//this.emojiButtonActivitiesViews = new ViewCollection( editor.locale );
		this.emojiButtonSymbolsViews = new ViewCollection( editor.locale );
		this.emojiButtonObjectsViews = new ViewCollection( editor.locale );
		this.emojiButtonPlacesViews = new ViewCollection( editor.locale );
		//this.emojiButtonFlagsViews = new ViewCollection( editor.locale );
		/**
		 * The Smile button view.
		 *
		 * @member {module:ui/button/buttonview~ButtonView}
		 */
		editor.config.get( 'emoji' ).forEach( emoji => {
			//this.emojiButtonViews.add( this._createButton( emoji.text, 'emoji:' + emoji.name ) );

			if(emoji.group === 'people'){
				this.emojiButtonPeopleViews.add( this._createButton( emoji.image, 'emoji:' + emoji.name ) );
			}

			if(emoji.group === 'nature'){
				this.emojiButtonNatureViews.add( this._createButton( emoji.image, 'emoji:' + emoji.name ) );
			}

			/*if(emoji.group === 'food'){
				this.emojiButtonFoodViews.add( this._createButton( emoji.image, 'emoji:' + emoji.name ) );
			}

			if(emoji.group === 'travel'){
				this.emojiButtonTravelViews.add( this._createButton( emoji.image, 'emoji:' + emoji.name ) );
			}

			if(emoji.group === 'activities'){
				this.emojiButtonActivitiesViews.add( this._createButton( emoji.image, 'emoji:' + emoji.name ) );
			}*/

			if(emoji.group === 'symbols'){
				this.emojiButtonSymbolsViews.add( this._createButton( emoji.image, 'emoji:' + emoji.name ) );
			}

			if(emoji.group === 'places'){
				this.emojiButtonPlacesViews.add( this._createButton( emoji.image, 'emoji:' + emoji.name ) );
			}

			if(emoji.group === 'objects'){
				this.emojiButtonObjectsViews.add( this._createButton( emoji.image, 'emoji:' + emoji.name ) );
			}

			/*if(emoji.group === 'flags'){
				this.emojiButtonFlagsViews.add( this._createButton( emoji.image, 'emoji:' + emoji.name ) );
			}*/
		} );

		/**
		 * A collection of views which can be focused in the form.
		 *
		 * @readonly
		 * @protected
		 * @member {module:ui/viewcollection~ViewCollection}
		 */
		this._focusables = new ViewCollection();

		/**
		 * Helps cycling over {@link #_focusables} in the form.
		 *
		 * @readonly
		 * @protected
		 * @member {module:ui/focuscycler~FocusCycler}
		 */
		this._focusCycler = new FocusCycler( {
			focusables: this._focusables,
			focusTracker: this.focusTracker,
			keystrokeHandler: this.keystrokes,
			actions: {
				// Navigate form fields backwards using the Shift + Tab keystroke.
				focusPrevious: 'shift + tab',

				// Navigate form fields forwards using the Tab key.
				focusNext: 'tab'
			}
		} );

		this.setTemplate( {
			tag: 'form',

			attributes: {
				class: [
					'ck-emoji',
				],

				// https://github.com/ckeditor/ckeditor5-link/issues/90
				tabindex: '-1'
			},

			children: [
				{
					tag: 'nav',

					attributes: {
						class: [
							'ck-emoji__tab',
						]
					},

					children: [
						{
							tag: 'div',

							attributes: {
								class: [
									'nav',
									'nav-tabs'
								],
								id: 'nav-tab',
								role: 'tablist'
							},
							children: [
								{
									tag: 'a',

									attributes: {
										class: [
											'nav-item',
											'nav-link',
											'active'
										],
										href: '#nav-people',
										role: 'tab',
										'data-toggle': 'tab',
										'aria-controls': 'nav-people',
										'aria-selected': true
									},

									children: [
										'😃'
									]


								},
								{
									tag: 'a',

									attributes: {
										class: [
											'nav-item',
											'nav-link'
										],
										href: '#nav-nature',
										role: 'tab',
										'data-toggle': 'tab',
										'aria-controls': 'nav-nature',
										'aria-selected': false
									},
									children: [
										'🐻'
									]

								},
								/*{
									tag: 'a',

									attributes: {
										class: [
											'nav-item',
											'nav-link'
										],
										href: '#nav-food',
										role: 'tab',
										'data-toggle': 'tab',
										'aria-controls': 'nav-food',
										'aria-selected': false
									},
									children: [
										'🍔'
									]

								},
								{
									tag: 'a',

									attributes: {
										class: [
											'nav-item',
											'nav-link'
										],
										href: '#nav-travel',
										role: 'tab',
										'data-toggle': 'tab',
										'aria-controls': 'nav-travel',
										'aria-selected': false
									},

									children: [
										'🌇'
									]

								},
								{
									tag: 'a',

									attributes: {
										class: [
											'nav-item',
											'nav-link'
										],
										href: '#nav-activities',
										role: 'tab',
										'data-toggle': 'tab',
										'aria-controls': 'nav-activities',
										'aria-selected': false
									},

									children: [
										'⚽'
									]

								},*/
								{
									tag: 'a',

									attributes: {
										class: [
											'nav-item',
											'nav-link'
										],
										href: '#nav-objects',
										role: 'tab',
										'data-toggle': 'tab',
										'aria-controls': 'nav-objects',
										'aria-selected': false
									},

									children: [
										'💡'
									]

								},
								/*{
									tag: 'a',

									attributes: {
										class: [
											'nav-item',
											'nav-link'
										],
										href: '#nav-flags',
										role: 'tab',
										'data-toggle': 'tab',
										'aria-controls': 'nav-flags',
										'aria-selected': false
									},

									children: [
										'🎌'
									]

								},*/
								{
									tag: 'a',

									attributes: {
										class: [
											'nav-item',
											'nav-link'
										],
										href: '#nav-places',
										role: 'tab',
										'data-toggle': 'tab',
										'aria-controls': 'nav-places',
										'aria-selected': false
									},

									children: [
										'🎌'
									]

								},

							]
						}
					]
				},
				{
					tag: 'div',

					attributes: {
						class: [
							'tab-content'
						],
						id: 'nav-tabContent'
					},
					children: [
						{
							tag: 'div',

							attributes: {
								class: [
									'tab-pane',
									'fade',
									'in',
									'active'
								],
								id: 'nav-people',
								role: 'tabpanel',
							},
							children: [
								{
									tag: 'div',

									attributes: {
										class: [
											'ck-emoji__actions'
										]
									},
									children: this.emojiButtonPeopleViews
								}
							]
						},
						{
							tag: 'div',

							attributes: {
								class: [
									'tab-pane',
									'fade'
								],
								id: 'nav-nature',
								role: 'tabpanel',
							},
							children: [
								{
									tag: 'div',

									attributes: {
										class: [
											'ck-emoji__actions'
										]
									},
									children: this.emojiButtonNatureViews
								}
							]
						},
						/*{
							tag: 'div',

							attributes: {
								class: [
									'tab-pane',
									'fade'
								],
								id: 'nav-food',
								role: 'tabpanel',
							},
							children: [
								{
									tag: 'div',

									attributes: {
										class: [
											'ck-emoji__actions'
										]
									},
									children: this.emojiButtonFoodViews
								}
							]
						},
						{
							tag: 'div',

							attributes: {
								class: [
									'tab-pane',
									'fade'
								],
								id: 'nav-travel',
								role: 'tabpanel',
							},
							children: [
								{
									tag: 'div',

									attributes: {
										class: [
											'ck-emoji__actions'
										]
									},
									children: this.emojiButtonTravelViews
								}
							]
						},
						{
							tag: 'div',

							attributes: {
								class: [
									'tab-pane',
									'fade'
								],
								id: 'nav-activities',
								role: 'tabpanel',
							},
							children: [
								{
									tag: 'div',

									attributes: {
										class: [
											'ck-emoji__actions'
										]
									},
									children: this.emojiButtonActivitiesViews
								}
							]
						},*/
						{
							tag: 'div',

							attributes: {
								class: [
									'tab-pane',
									'fade'
								],
								id: 'nav-objects',
								role: 'tabpanel',
							},
							children: [
								{
									tag: 'div',

									attributes: {
										class: [
											'ck-emoji__actions'
										]
									},
									children: this.emojiButtonObjectsViews
								}
							]
						},
						/*{
							tag: 'div',

							attributes: {
								class: [
									'tab-pane',
									'fade'
								],
								id: 'nav-flags',
								role: 'tabpanel',
							},
							children: [
								{
									tag: 'div',

									attributes: {
										class: [
											'ck-emoji__actions'
										]
									},
									children: this.emojiButtonFlagsViews
								}
							]
						}*/
						{
							tag: 'div',

							attributes: {
								class: [
									'tab-pane',
									'fade'
								],
								id: 'nav-places',
								role: 'tabpanel',
							},
							children: [
								{
									tag: 'div',

									attributes: {
										class: [
											'ck-emoji__actions'
										]
									},
									children: this.emojiButtonPlacesViews
								}
							]
						}
					]
				}
			]


		} );
	}

	/**
	 * @inheritDoc
	 */
	render() {
		super.render();

		submitHandler( {
			view: this
		} );

		this.emojiButtonViews.map( v => {
			// Register the view as focusable.
			this._focusables.add( v );

			// Register the view in the focus tracker.
			this.focusTracker.add( v.element );
		} );

		// Start listening for the keystrokes coming from #element.
		this.keystrokes.listenTo( this.element );
	}

	/**
	 * Focuses the fist {@link #_focusables} in the form.
	 */
	focus() {
		this._focusCycler.focusFirst();
	}

	/**
	 * Creates a button view.
	 *
	 * @private
	 * @param {String} label The button label
	 * @param {String} [eventName] An event name that the `ButtonView#execute` event will be delegated to.
	 * @returns {module:ui/button/buttonview~ButtonView} The button view instance.
	 */
	_createButton( label, eventName ) {
		const button = new ButtonView( this.locale );
		const buttonImg = new ButtonView( this.locale );
		buttonImg.setTemplate({
			tag: 'img',
			attributes: {
				src: label
			}
		});

		button.withText = false;
		button.children.add(buttonImg);
		//collection.setParent( parentView.element );

		if ( eventName ) {
			button.delegate( 'execute' ).to( this, eventName );
		}

		return button;
	}
}

/**
 * Fired when the emoji button is clicked ({module:emoji/emoji~EmojiListView}).
 *
 * @event emoji:{type}
 * @param {String} type The emoji type.
 */
