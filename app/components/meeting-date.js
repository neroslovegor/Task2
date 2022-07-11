import Component from '@ember/component';
import { get } from '@ember/object';
import $ from 'jquery';
import moment from 'moment';

export default Component.extend({
  didInsertElement() {
    this._super(...arguments);

    this.$('.datepicker').datepicker({
      clearBtn: true,
      format: "dd.mm.yyyy",
      //format: "mm.dd.yyyy",
      language: "ru",
      autoclose: true,
      orientation: 'bottom'
    });

    const self = this;

    this.$('.datepicker').datepicker().on("change", function() {
      moment.fn.toJSON = function() { return this.format(); }
      let selectedDate = moment($(this).datepicker('getDate')).toJSON();
      if (selectedDate === 'Invalid date') { selectedDate = ''}
      get(self, 'changeDate')(selectedDate);
    });
  }
});
