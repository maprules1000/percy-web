import {describe, it, beforeEach} from 'mocha';
import {setupComponentTest} from 'ember-mocha';
import {percySnapshot} from 'ember-percy';
import hbs from 'htmlbars-inline-precompile';
import setupFactoryGuy from 'percy-web/tests/helpers/setup-factory-guy';
import faker from 'faker';

describe('Integration | Component | Marketing/Content-block', function() {
  setupComponentTest('marketing/content-block', {
    integration: true,
  });

  const header = 'This is my awesome header';
  const superHeader = 'super header';
  const subHeader = 'Review relevant, high-impact visual changes with every product update.';
  const mainImagePath = '/images/test/marketing-1.jpg';

  let twoSupportingContents;
  let threeSupportingContents;
  let fourSupportingContents;

  beforeEach(function() {
    setupFactoryGuy(this.container);

    const supportingContent1 = {
      header: faker.lorem.words(),
      bodyText: faker.lorem.sentences(),
      supportingContentIcon: '/marketing/eye',
    };
    const supportingContent2 = {
      header: faker.lorem.words(),
      bodyText: faker.lorem.sentences(),
      supportingContentIcon: '/marketing/git',
    };
    const supportingContent3 = {
      header: faker.lorem.words(),
      bodyText: faker.lorem.sentences(),
      supportingContentIcon: '/marketing/funnel',
    };
    const supportingContent4 = {
      header: faker.lorem.words(),
      bodyText: faker.lorem.sentences(),
      supportingContentIcon: '/marketing/conveyor',
    };

    twoSupportingContents = [supportingContent1, supportingContent2];
    threeSupportingContents = twoSupportingContents.concat(supportingContent3);
    fourSupportingContents = threeSupportingContents.concat(supportingContent4);

    this.setProperties({
      twoSupportingContents,
      threeSupportingContents,
      fourSupportingContents,
      header,
      superHeader,
      subHeader,
      mainImagePath,
    });
  });

  describe('content-block rendering', function() {
    it('renders correctly', async function() {
      this.render(hbs`
        <div>General case</div>
        {{marketing/content-block
          header=header
          superHeader=superHeader
          subHeader=subHeader
          mainImage=mainImagePath
          supportingContents=threeSupportingContents
          imagePosition=left
        }}

        <div>No header</div>
        {{marketing/content-block
          superHeader=superHeader
          subHeader=subHeader
          mainImage=mainImagePath
          supportingContents=threeSupportingContents
          imagePosition=left
        }}

        <div>No superheader</div>
        {{marketing/content-block
          header=header
          subHeader=subHeader
          mainImage=mainImagePath
          supportingContents=threeSupportingContents
          imagePosition=left
        }}

        <div>No subheader</div>
        {{marketing/content-block
          header=header
          superHeader=superHeader
          mainImage=mainImagePath
          supportingContents=threeSupportingContents
          imagePosition=left
        }}

        <div>No main image</div>
        {{marketing/content-block
          header=header
          superHeader=superHeader
          subHeader=subHeader
          supportingContents=threeSupportingContents
          imagePosition=left
        }}

        <div>No supporting contents</div>
        {{marketing/content-block
          header=header
          superHeader=superHeader
          subHeader=subHeader
          mainImage=mainImagePath
          imagePosition=left
        }}

        <div>Two supporting contents</div>
        {{marketing/content-block
          header=header
          superHeader=superHeader
          subHeader=subHeader
          mainImage=mainImagePath
          supportingContents=twoSupportingContents
          imagePosition=left
        }}

        <div>Four supporting contents</div>
        {{marketing/content-block
          header=header
          superHeader=superHeader
          subHeader=subHeader
          mainImage=mainImagePath
          supportingContents=fourSupportingContents
          imagePosition=left
        }}

        <div>image position right</div>
        {{marketing/content-block
          header=header
          superHeader=superHeader
          subHeader=subHeader
          mainImage=mainImagePath
          supportingContents=threeSupportingContents
          imagePosition=right
        }}
      `);

      percySnapshot(this.test);
    });
  });
});
