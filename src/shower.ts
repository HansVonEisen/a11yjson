import { t } from 'ttag';
import SimpleSchema from 'simpl-schema';

import { createSchemaInstance } from './SimpleSchemaExtensions';
import { Length, LengthSchema, quantityDefinition } from './Units';

export interface Shower {
  // QUESTION could be more than one step
  // QUESTION stairsFormat calls this field stepHeight
  step?: Length;
  /**
   * `true` if the shower is step-free and level with the space in front of it, `false` if not,
   * `undefined` if condition is unknown.
   */
  isLevel?: boolean;
  /**
   * `true` if the shower has support rails, `false` if not, `undefined` if condition is unknown.
   */
  hasSupportRails?: boolean;
  /**
   * Object describing the shower’s support rails
   */
  supportRails?: {
    /**
     * At which height are the support rails? Measured from the top.
     */
    height?: Length;
    /**
     * `true` if the support rails are above and below the controls, `false` if not, `undefined`
     * if condition is unknown.
     */
    aboveAndBelowControls?: boolean;
  };
  /**
   * `true` if the shower has a seat, `false` if not, `undefined` if condition is unknown..
   */
  hasShowerSeat?: boolean;
  /**
   * Object describing the shower’s seat.
   */
  showerSeat?: {
    /**
     * `true` if the shower seat can be removed from the shower easily, `false` if not, `undefined`
     * if condition is unknown.
     */
    isRemovable?: boolean;
    /**
     * `true` if the shower seat can be folded, `false` if not, `undefined` if condition is unknown.
     */
    isFolding?: boolean;
  };
  /**
   * `true` if the shower has an ergonomic handle, `false` if not, `undefined` if condition is
   * unknown.
   */
  hasErgonomicHandle?: boolean;
}

export const ShowerSchema = createSchemaInstance('Shower', {
  step: quantityDefinition(LengthSchema),
  isLevel: {
    type: Boolean,
    optional: true,
    accessibility: {
      question: t`Is the shower step-free and level with the space in front of it?`
    }
  },
  hasSupportRails: {
    type: Boolean,
    optional: true,
    accessibility: {
      question: t`Does the shower have support rails?`
    }
  },
  supportRails: {
    type: Object,
    optional: true,
    accessibility: {
      question: t`Let’s describe the support rails further.`
    }
  },
  'supportRails.height': quantityDefinition(LengthSchema, true, {
    question: t`At which height are the support rails?`
  }),
  'supportRails.aboveAndBelowControls': {
    type: Boolean,
    optional: true,
    accessibility: {
      question: t`Are the support rails above and below the controls?`
    }
  },
  hasShowerSeat: {
    type: Boolean,
    optional: true,
    accessibility: {
      question: t`Is there a shower seat?`
    }
  },
  hasErgonomicHandle: {
    type: Boolean,
    optional: true,
    accessibility: {
      question: t`Is there an ergonomic handle?`
    }
  },
  showerSeat: {
    type: Object,
    optional: true,
    accessibility: {
      question: t`Let’s take a look at the shower seat.`
    }
  },
  'showerSeat.isRemovable': {
    type: Boolean,
    optional: true,
    accessibility: {
      question: t`Is the seat removable from the shower?`
    }
  },
  'showerSeat.isFolding': {
    type: Boolean,
    optional: true,
    accessibility: {
      question: t`Is this a folding seat?`
    }
  }
});
