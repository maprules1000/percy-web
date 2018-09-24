import Component from '@ember/component';
import {task, timeout} from 'ember-concurrency';

export default Component.extend({
  carosel: null,
  currentSlide: 0,

  didInsertElement() {
    // Siema is imported in ember-cli-build.js
    const carosel = new Siema({ // eslint-disable-line
      loop: true,
      onChange: this._setCurrentSlide.bind(this),
    });

    this.set('carosel', carosel);
    this._autoAdvanceSlide.perform();
  },

  actions: {
    next() {
      this.get('carosel').next();
      this._setCurrentSlide();
      this._stopAutoAdvanceSlide();
    },

    previous() {
      this.get('carosel').prev();
      this._setCurrentSlide();
      this._stopAutoAdvanceSlide();
    },

    switchToSlide(index) {
      this.get('carosel').goTo(index);
      this._setCurrentSlide();
    },
  },

  _setCurrentSlide() {
    this.set('currentSlide', this.get('carosel').currentSlide);
  },

  _stopAutoAdvanceSlide() {
    this._autoAdvanceSlide.cancelAll();
  },

  _autoAdvanceSlide: task(function*() {
    while (true) {
      yield timeout(6000);
      this.get('carosel').next();
    }
  }),
});
