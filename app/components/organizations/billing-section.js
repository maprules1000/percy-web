import {computed} from '@ember/object';
import {inject as service} from '@ember/service';
import Component from '@ember/component';
import AdminMode from 'percy-web/lib/admin-mode';

let monthStart = 1;
let monthEnd = 30;
let chartLabels = Array(monthEnd - monthStart + 1)
  .fill()
  .map(() => monthStart++);

let barDataSet = Array.from({length: 30}, () => Math.floor(Math.random() * 100000));

let setUnusedDays = function() {
  let findLargestNumber = Math.max.apply(Math, barDataSet);
  return 0.02 * findLargestNumber;
};

export default Component.extend({
  organization: null,
  classes: null,

  isSaving: null,
  isSaveSuccessful: null,

  CHARTDATA: {
    labels: chartLabels,
    datasets: [
      {
        data: barDataSet.fill(setUnusedDays(), 18),
        backgroundColor: [
          'rgba(158, 102, 191, 1.00)',
          'rgba(158, 102, 191, 1.00)',
          'rgba(158, 102, 191, 1.00)',
          'rgba(158, 102, 191, 1.00)',
          'rgba(158, 102, 191, 1.00)',
          'rgba(158, 102, 191, 1.00)',
          'rgba(158, 102, 191, 1.00)',
          'rgba(158, 102, 191, 1.00)',
          'rgba(158, 102, 191, 1.00)',
          'rgba(158, 102, 191, 1.00)',
          'rgba(158, 102, 191, 1.00)',
          'rgba(158, 102, 191, 1.00)',
          'rgba(158, 102, 191, 1.00)',
          'rgba(158, 102, 191, 1.00)',
          'rgba(158, 102, 191, 1.00)',
          'rgba(158, 102, 191, 1.00)',
          'rgba(158, 102, 191, 1.00)',
          'rgba(158, 102, 191, 1.00)',
          'rgba(240, 238, 241, 1.00)',
          'rgba(240, 238, 241, 1.00)',
          'rgba(240, 238, 241, 1.00)',
          'rgba(240, 238, 241, 1.00)',
          'rgba(240, 238, 241, 1.00)',
          'rgba(240, 238, 241, 1.00)',
          'rgba(240, 238, 241, 1.00)',
          'rgba(240, 238, 241, 1.00)',
          'rgba(240, 238, 241, 1.00)',
          'rgba(240, 238, 241, 1.00)',
          'rgba(240, 238, 241, 1.00)',
          'rgba(240, 238, 241, 1.00)',
          'rgba(240, 238, 241, 1.00)',
        ],
      },
    ],
  },

  CHARTOPTIONS: {
    layout: {
      padding: {
        left: 500,
        right: 0,
        top: 0,
        bottom: 0,
      },
    },
    tooltips: {
      enabled: false,
    },
    labels: {
      fontColor: 'black',
      defaultFontFamily: 'proxima-nova',
    },
    legend: {
      display: false,
    },
    scales: {
      xAxes: [
        {
          gridLines: {display: false},
          ticks: {
            fontSize: 12,
            fontFamily: "'proxima-nova', sans-serif",
            fontColor: '#CAC5CC',
            fontStyle: '900',
          },
        },
      ],
      yAxes: [
        {
          gridLines: {
            color: 'rgba(251, 250, 252, 1.00)',
            zeroLineColor: 'rgba(231, 231, 232, 1.00)',
          },
          ticks: {
            beginAtZero: true,
            fontSize: 12,
            fontFamily: "'proxima-nova', sans-serif",
            fontColor: '#CAC5CC',
            fontStyle: '900',
          },
        },
      ],
    },
  },

  subscriptionData: service(),
  classNames: ['OrganizationsBillingSection'],
  classNameBindings: ['classes'],
  showCancel: computed('organization.subscription.isCustomer', function() {
    let isCustomer = this.get('organization.subscription.isCustomer');
    return isCustomer && AdminMode.isAdmin();
  }),

  actions: {
    changingSubscription(savingPromise) {
      this.set('isSaveSuccessful', null);
      this.set('isSaving', true);
      savingPromise.then(
        () => {
          this.set('isSaving', false);
          this.set('isSaveSuccessful', true);
        },
        () => {
          this.set('isSaving', false);
          this.set('isSaveSuccessful', false);
        },
      );
    },
    showSupport() {
      this.sendAction('showSupport');
    },
  },
});
