import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '../../../../users/infra/http/middlewares/ensureAuthenticated';
import ProvidersController from '../controllers/ProvidersController';
import ProviderMonthAvailabilityController from '../controllers/ProviderMonthAvailabilityController';
import ProviderDayAvailabilityController from '../controllers/ProviderDayAvailabilityController';

const providerRouter = Router();
const providerController = new ProvidersController();
const providerMonthAvailabilityController =
	new ProviderMonthAvailabilityController();
const providerDayAvailabilityController =
	new ProviderDayAvailabilityController();

providerRouter.use(ensureAuthenticated);

providerRouter.get('/', providerController.index);

providerRouter.get(
	'/:provider_id/month-availability',
	celebrate({
		[Segments.PARAMS]: {
			provider_id: Joi.string().uuid().required(),
		},
	}),
	providerMonthAvailabilityController.index,
);

providerRouter.get(
	'/:provider_id/day-availability',
	celebrate({
		[Segments.PARAMS]: {
			provider_id: Joi.string().uuid().required(),
		},
	}),
	providerDayAvailabilityController.index,
);

export default providerRouter;
