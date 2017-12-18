import { Restroom, RestroomSchema } from '../src/restroom';
import { entranceMinimumFixture } from './entrance.test';
import { FormatVersion } from '../src/version';
import { toiletMinimumFixture } from './toilet.test';
import { showerMinimumFixture } from './shower.test';

export const restroomMinimumFixture: Restroom = {
  toilet: toiletMinimumFixture
};

const restroomWithOptionalsFixture: Restroom = {
  name: 'Room name',
  isAccessibleWithWheelchair: true,
  signage: {
    unisex: true,
    male: true,
    female: true
  },
  mirror: {
    isAccessibleWhileSeated: true,
    heightFromGround: '100cm'
  },
  ratingForWheelchair: 0.3,
  turningSpaceInside: '>150cm',
  hasSupportRails: true,
  shampooAccessibleWithWheelchair: true,
  toilet: {},
  hasBathTub: true,
  hasShower: true,
  entrance: entranceMinimumFixture,
  shower: showerMinimumFixture,
  heightOfSoapAndDrier: '100 .. 120cm',
  washBasin: {
    accessibleWithWheelchair: true,
    height: '>80cm',
    spaceBelow: {
      height: '> 67cm',
      depth: '30cm'
    }
  }
};

const allValidFixtures = Object.freeze([
  restroomMinimumFixture,
  restroomWithOptionalsFixture
]);

const invalidRestroomFixture = {
  bar: []
};

const allInvalidFixtures = Object.freeze([invalidRestroomFixture, {}]);

describe('RestroomSchema Schema', () => {
  it('schema is tagged', () => {
    expect(RestroomSchema.__schemaType).toBe('Restroom');
    expect(RestroomSchema.__schemaVersion).toBe(FormatVersion);
  });
  it('tests field as invalid', () => {
    allInvalidFixtures.forEach(value => {
      const context = RestroomSchema.newContext();
      context.validate(value);
      expect(context.validationErrors()).not.toHaveLength(0);
      expect(context.isValid()).toBeFalsy();
    });
  });
  it('tests field as valid', () => {
    allValidFixtures.forEach(value => {
      const context = RestroomSchema.newContext();
      context.validate(value);
      expect(context.validationErrors()).toHaveLength(0);
      expect(context.isValid()).toBeTruthy();
    });
  });
});
